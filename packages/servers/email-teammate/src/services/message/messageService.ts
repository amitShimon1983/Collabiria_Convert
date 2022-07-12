import { Message, MessageModel } from '@harmonie/server-db';
import { Types } from 'mongoose';
import { teamService } from '../team';

export const createMessage = async (teamObjectId: string, message: Message) => {
  const team = await teamService.getTeam(teamObjectId);
  if (!team) {
    throw new Error('team does not exist');
  }

  const isRoot = await MessageModel.exists({ conversationId: message.conversationId });
  return await MessageModel.create({
    ...message,
    team,
    isRoot: !isRoot,
  });
};

export const getMessage = async (messageObjectId: string) => {
  return MessageModel.findById(messageObjectId);
};

const createFiltersQuery = (filters: any) => {
  const { from, to, subject } = filters;
  return {
    ...(subject && { subject: { $regex: subject, $options: 'i' } }),
    ...(from && {
      $or: [
        { 'from.emailAddress.address': { $regex: from, $options: 'i' } },
        { 'from.emailAddress.name': { $regex: from, $options: 'i' } },
      ],
    }),
    ...(to && {
      $or: [
        { 'toRecipients.emailAddress.address': { $regex: to, $options: 'i' } },
        { 'toRecipients.emailAddress.name': { $regex: to, $options: 'i' } },
      ],
    }),
  };
};

const createSearchTextQuery = (searchText: string) => {
  return {
    $or: [
      { subject: { $regex: searchText, $options: 'i' } },
      { 'body.content': { $regex: searchText, $options: 'i' } },
      { 'from.emailAddress.address': { $regex: searchText, $options: 'i' } },
      { 'from.emailAddress.name': { $regex: searchText, $options: 'i' } },
      { 'toRecipients.emailAddress.address': { $regex: searchText, $options: 'i' } },
      { 'toRecipients.emailAddress.name': { $regex: searchText, $options: 'i' } },
    ],
  };
};

export const getTeamRootMessages = async (
  teamObjectId: string,
  searchText: string,
  filters: any,
  skip = 0,
  limit = 50
) => {
  const query = {
    dismissed: false,
    isRoot: true,
    team: new Types.ObjectId(teamObjectId),
    ...(searchText ? createSearchTextQuery(searchText) : filters ? createFiltersQuery(filters) : {}),
  };

  const execCountQuery = MessageModel.count(query).exec();
  const execDocumentsQuery = MessageModel.find(query).sort({ receivedDateTime: 'desc' }).skip(skip).limit(limit).lean();

  return Promise.all([execCountQuery, execDocumentsQuery]).then(values => {
    const [total, records] = values;
    const page = Math.ceil((skip + 1) / limit);
    const pages = limit > 0 ? Math.ceil(total / limit) || 1 : 0;

    return {
      records,
      total,
      page,
      endCursor: limit * page,
      hasNextPage: page < pages,
    };
  });
};
