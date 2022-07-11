import { MessagePoolModel, MessageRuleModel, PredicateTypes } from '../src';
import {
  createGeography,
  createMessageRule,
  createTaskBoard,
  createUser,
  createMessage,
  generateMessage,
} from './setup/dbHelper';

const testMailboxId = 'amittr@harmon.ie';
let user: any;
let taskBoard1: any;
let taskBoard2: any;

beforeAll(async () => {
  const geographyIsrael = await createGeography({});
  user = await createUser({ geography: geographyIsrael._id, upn: testMailboxId });
  taskBoard1 = await createTaskBoard({ users: [user._id], channelId: 'channelId1', mailboxId: testMailboxId });
  taskBoard2 = await createTaskBoard({ users: [user._id], channelId: 'channelId2', mailboxId: testMailboxId });
});

it('MessagePoolModel::create', async () => {
  // prepare
  const message = generateMessage(taskBoard1._id, testMailboxId);

  // act
  const res = await MessagePoolModel.create({
    ...message,
    parentFolder: 'inbox',
    taskBoard: taskBoard1._id,
    mailboxId: testMailboxId,
  });

  // assert
  expect(res).toBeDefined();
  expect(res.toObject()).toMatchObject(message);

  await res.delete();
});

it('MessagePoolModel::search (by taskBoard)', async () => {
  // prepare
  const message1 = await createMessage(taskBoard1._id.toString(), testMailboxId);
  const message2 = await createMessage(taskBoard1._id.toString(), testMailboxId);

  // act
  const { results: res } = await MessagePoolModel.search(taskBoard1._id.toString());

  // assert
  expect(res).toBeDefined();
  expect(res).toHaveLength(2);

  await MessagePoolModel.deleteMany({
    _id: { $in: [message1, message2].map(({ _id }) => _id) },
  });
});

it('MessagePoolModel::search (by search terms)', async () => {
  // prepare
  const message1 = await createMessage(
    taskBoard1._id.toString(),
    testMailboxId,
    generateMessage(taskBoard1._id, testMailboxId, {
      subject: 'subject 1',
      from: { emailAddress: { address: 'email1@harmon.ie' } },
    })
  );
  const message2 = await createMessage(
    taskBoard1._id.toString(),
    testMailboxId,
    generateMessage(taskBoard1._id, testMailboxId, {
      subject: 'subject 2',
      from: { emailAddress: { address: 'email2@harmon.ie' } },
    })
  );
  const message3 = await createMessage(
    taskBoard1._id.toString(),
    testMailboxId,
    generateMessage(taskBoard1._id, testMailboxId, {
      subject: 'subject 3',
      from: { emailAddress: { address: 'email2@domnain.com' } },
    })
  );

  // act
  const { results: res1 } = await MessagePoolModel.search(taskBoard1._id.toString(), { from: 'email1@harmon.ie' });
  const { results: res2 } = await MessagePoolModel.search(taskBoard1._id.toString(), { from: '@harmon.ie' });
  const { results: res3 } = await MessagePoolModel.search(taskBoard1._id.toString(), { subject: 'subject 1' });
  const { results: res4 } = await MessagePoolModel.search(taskBoard1._id.toString(), {
    from: '@harmon.ie',
    subject: 'subject',
  });

  // assert
  expect(res1).toHaveLength(1);
  expect(res1[0].from.emailAddress.address).toEqual('email1@harmon.ie');
  expect(res2).toHaveLength(2);
  expect(res2[0].from.emailAddress.address).toContain('@harmon.ie');
  expect(res2[1].from.emailAddress.address).toContain('@harmon.ie');
  expect(res3).toHaveLength(1);
  expect(res3[0].subject).toEqual('subject 1');
  expect(res4).toHaveLength(2);

  await MessagePoolModel.deleteMany({
    _id: { $in: [message1, message2, message3].map(({ _id }) => _id) },
  });
});

it('MessageRuleModel::groupRulesByTaskBoard', async () => {
  const createRule = async (id: any) =>
    await createMessageRule({
      mailboxId: user.upn.toString(),
      taskBoard: id,
      predicate: {
        type: PredicateTypes.toAddressIn,
        input: `['${user.upn.toString()}']`,
      },
    });

  // prepare
  const rule1 = await createRule(taskBoard1._id);
  const rule2 = await createRule(taskBoard2._id);
  const rule3 = await createRule(taskBoard2._id);

  // act
  const res = await MessageRuleModel.groupRulesByTaskBoard('amittr@harmon.ie');

  //assert
  expect(res).toBeDefined();
  expect(res).toHaveLength(2);

  const find = (id: any) => res.find(({ _id }) => _id.toString() === id.toString());

  expect(find(taskBoard1._id)?.rules).toHaveLength(1);
  expect(find(taskBoard2._id)?.rules).toHaveLength(2);

  await MessageRuleModel.deleteMany({
    _id: { $in: [rule1, rule2, rule3].map(({ _id }) => _id) },
  });
});
