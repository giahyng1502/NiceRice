export const ParticipantConversationSchema = {
  name: 'ParticipantConversation',
  primaryKey: '_id',
  properties: {
    _id: 'string',
    userId: 'int',
    fullName: 'string',
    avatarUrl: 'string',
    seenDateTime: 'date?',
    isAdmin: 'bool',
    conversationId: 'int',
  },
};
