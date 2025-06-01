export const MessageSchema = {
    name: 'Message',
    primaryKey: 'messageId',
    properties: {
        messageId: 'string',
        senderId: 'int',
        conversationId: 'int',
        content: 'string',
        timestamp: 'date',
        type: 'string',
        link: 'string[]'
    },
};
