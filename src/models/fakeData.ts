// fakeData.ts

// Fake participants
import {Types, Message, Participant} from "./types";

export const fakeParticipants: Participant[] = [
    {
        userId: 'u1',
        username: 'Gia Hy',
        avatarUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
    {
        userId: 'u2',
        username: 'Minh Anh',
        avatarUrl: 'https://randomuser.me/api/portraits/women/2.jpg',
    },
    {
        userId: 'u3',
        username: 'Hồng Nhung',
        avatarUrl: 'https://randomuser.me/api/portraits/women/3.jpg',
    },
];

// Fake conversations
export const fakeConversations: Types[] = [
    {
        conversationId: 'c1',
        participantIds: ['u1', 'u2'],
        lastUpdated: '2025-05-17T08:02:00Z',
        unreadCount: 0,
        lastMessagePreview: 'https://example.com/image.jpg',
    },
    {
        conversationId: 'c2',
        participantIds: ['u1', 'u3'],
        lastUpdated: '2025-05-17T07:00:00Z',
        unreadCount: 3,
        lastMessagePreview: "Let's meet this afternoon!",
    },
];

// Fake messages
export const fakeMessages: Message[] = [
    {
        messageId: 'm1',
        conversationId: 'c1',
        senderId: 'u1',
        content: 'Hello, how are you?',
        timestamp: '2025-05-17T08:00:00Z',
        type: 'text',
        status: 'read',
    },
    {
        messageId: 'm2',
        conversationId: 'c1',
        senderId: 'u2',
        content: "I'm good, thanks! And you?",
        timestamp: '2025-05-17T08:01:00Z',
        type: 'text',
        status: 'read',
    },
    {
        messageId: 'm3',
        conversationId: 'c1',
        senderId: 'u1',
        content: 'https://example.com/image.jpg',
        timestamp: '2025-05-17T08:02:00Z',
        type: 'image',
        status: 'delivered',
    },
];

// utils.ts
export const getParticipantsByIds = (ids: string[]): Participant[] => {
    // @ts-ignore
    return fakeParticipants.filter(p => ids.includes(p.userId));
};

