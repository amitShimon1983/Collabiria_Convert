import { Conversation, ConversationModel } from '@harmonie/server-db';

export const createConversation = async (conversation: Conversation) => {
  return await ConversationModel.create(conversation);
};

export const getConversation = async (conversationObjectId: string) => {
  return ConversationModel.findById(conversationObjectId);
};

export const updateConversation = async (conversationObjectId: string, conversation: Conversation) => {
  return ConversationModel.findOneAndUpdate({ _id: conversationObjectId }, conversation, { new: true });
};
