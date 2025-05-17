// types.ts
export interface Message {
    messageId: string;
    conversationId: string;
    sender: Participant;
    content: string;
    timestamp: string;
    type: 'text' | 'image' | 'video' | 'audio' | 'file';
    link? : string[];
    status: 'pending' | 'received' | 'sent';
}

export interface Participant {
    userId: string;
    username: string;
    avatarUrl?: string;
}

export interface Conversation {
    conversationId: string;
    participantIds: string[];
    lastUpdated: string;
    unreadCount: number;
    lastMessagePreview?: string;
}
