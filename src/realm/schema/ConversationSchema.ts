
export const conversationSchema = {
    name: 'Conversation',
    primaryKey: 'conversationId',
    properties: {
        conversationId: 'string',
        createdAt: 'string?',
        unreadCount: 'int?',
        groupName: 'string?',
        groupAvatar: 'string?',
        isGroup: 'bool',
        participants: 'ParticipantConversation[]',
        lastMessagePreview: 'string',
        lastUpdatedAt: 'string?',
    },
};
