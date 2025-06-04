
export const conversationSchema = {
    name: 'Conversation',
    primaryKey: 'conversationId',
    properties: {
        conversationId: 'int',
        createdAt: 'date',
        unreadCount: 'int',
        groupName: 'string?',
        groupAvatar: 'string?',
        isGroup: 'bool',
        participants: 'ParticipantConversation[]',
        lastMessagePreview: 'string',
        lastUpdatedAt: 'date',
    },
};
