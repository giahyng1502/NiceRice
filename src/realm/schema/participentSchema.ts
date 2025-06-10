export const ParticipantConversationSchema = {
  name: 'ParticipantConversation',
  primaryKey: 'participantId',
  properties: {
    participantId: 'int',
    seenDateTime: 'string?',
    joinedAt: 'string',
    isAdmin: 'bool',
    conversationId: 'string',
    fullName : 'string',
    avatarUrl: 'string',
    userId : 'int',
  },
};
