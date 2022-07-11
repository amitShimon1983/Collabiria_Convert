import mongoose from 'mongoose';
import { Arg, Query, Resolver } from 'type-graphql';
import { AttachmentModel, Attachment } from '@harmonie/server-db';
import { getAttachmentsInput } from './types';

@Resolver()
export default class AttachmentResolver {
  @Query(() => [Attachment])
  async getAttachments(@Arg('args') args: getAttachmentsInput) {
    const { messageId } = args;
    return AttachmentModel.find({ message: new mongoose.Types.ObjectId(messageId) });
  }
}
