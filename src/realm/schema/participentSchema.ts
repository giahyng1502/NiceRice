export const ParticipantConversationSchema = {
  name: 'ParticipantConversation',
  primaryKey: 'participantId',
  properties: {
    participantId: 'int',
    seenDateTime: 'string?',
    joinedAt: 'string',
    isAdmin: 'bool',
    conversationId: 'int',
    fullName : 'string',
    avatarUrl: 'string',
    userId : 'int',
  },
};
