
export const MessageSchema = {
    name: 'Message',
    primaryKey: 'messageId',
    properties: {
        messageId: 'string',
        senderId: 'int',
        conversationId: 'int',
        content: 'string',
        createdAt: 'string',
        updatedAt: 'string',
        type: 'string',
        link: 'string?'
    },
};
