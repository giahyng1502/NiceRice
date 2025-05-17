// types.ts
export interface Message {
    messageId: string;
    conversationId: string;
    senderId: string;
    content: string;
    timestamp: string;
    type: 'text' | 'image' | 'video' | 'audio' | 'file';
    status: 'sent' | 'delivered' | 'read';
}

export interface Participant {
    userId: string;
    username: string;
    avatarUrl?: string;
}

export interface Types {
    conversationId: string;
    participantIds: string[];
    lastUpdated: string;
    unreadCount: number;
    lastMessagePreview?: string;
}
