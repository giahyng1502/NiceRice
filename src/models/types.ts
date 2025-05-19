export interface Participant {
    userId: string;
    username: string;
    avatarUrl?: string;
    isAdmin?: boolean;
}

export interface Reaction {
    userId: string;
    emoji: string;
}

export type MessageType = 'text' | 'image' | 'video' | 'audio' | 'file' | 'system';

export type MessageStatus = 'pending' | 'received' | 'sent' | 'seen';

export interface Message {
    messageId: string;
    conversationId: string;
    sender: Participant;
    content: string;
    timestamp: string;
    type: MessageType;
    link?: string[];
    status: MessageStatus;
    replyToMessageId?: string;
    reactions?: Reaction[];
    isEdited?: boolean;
}

export interface Conversation {
    conversationId: string;
    participantIds: string[];
    lastUpdated: string;
    unreadCount: number;
    lastMessagePreview?: string;
    groupName?: string;
    groupAvatar?: string;
    isGroup: boolean;
    lastSenderName?: string;
}

export interface ParticipantStatus {
    userId: string;
    isOnline: boolean;
    lastSeen: string;
}
