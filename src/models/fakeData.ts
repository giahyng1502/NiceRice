// fakeData.ts

// Fake participants
import {Conversation, Message, Participant} from "./types";

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
export const fakeConversations: Conversation[] = [
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
        sender: {
            userId: 'u1',
            username: 'Alice',
            avatarUrl: 'https://i.pravatar.cc/150?img=1',
        },
        content: 'Hello, how are you?',
        timestamp: '2025-05-17T08:00:00Z',
        type: 'text',
        status: 'received',
    },
    {
        messageId: 'm2',
        conversationId: 'c1',
        sender: {
            userId: 'u2',
            username: 'Bob',
            avatarUrl: 'https://i.pravatar.cc/150?img=2',
        },
        content: "I'm good, thanks! And you?",
        timestamp: '2025-05-17T08:01:00Z',
        type: 'text',
        status: 'sent',
    },
    {
        messageId: 'm21',
        conversationId: 'c1',
        sender: {
            userId: 'u2',
            username: 'Bob',
            avatarUrl: 'https://i.pravatar.cc/150?img=2',
        },
        content: "I'm good, thanks! And you?",
        timestamp: '2025-05-17T08:01:00Z',
        type: 'text',
        status: 'sent',
    },
    {
        messageId: 'm22',
        conversationId: 'c1',
        sender: {
            userId: 'u2',
            username: 'Bob',
            avatarUrl: 'https://i.pravatar.cc/150?img=2',
        },
        content: "I'm good, thanks! And you?",
        timestamp: '2025-05-17T08:01:00Z',
        type: 'text',
        status: 'sent',
    },
    {
        messageId: 'm23',
        conversationId: 'c1',
        sender: {
            userId: 'u2',
            username: 'Bob',
            avatarUrl: 'https://i.pravatar.cc/150?img=2',
        },
        content: "I'm good, thanks! And you?",
        timestamp: '2025-05-17T08:01:00Z',
        type: 'text',
        status: 'sent',
    },
    {
        messageId: 'm24',
        conversationId: 'c1',
        sender: {
            userId: 'u2',
            username: 'Bob',
            avatarUrl: 'https://i.pravatar.cc/150?img=2',
        },
        content: "I'm good, thanks! And you?",
        timestamp: '2025-05-17T08:01:00Z',
        type: 'text',
        status: 'sent',
    },
    {
        messageId: 'm35',
        conversationId: 'c1',
        sender: {
            userId: 'u2',
            username: 'Bob',
            avatarUrl: 'https://i.pravatar.cc/150?img=2',
        },
        content: "I'm good, thanks! And you?",
        timestamp: '2025-05-17T08:01:00Z',
        type: 'text',
        status: 'sent',
    },
    {
        messageId: 'm46',
        conversationId: 'c1',
        sender: {
            userId: 'u2',
            username: 'Bob',
            avatarUrl: 'https://i.pravatar.cc/150?img=2',
        },
        content: "I'm good, thanks! And you?",
        timestamp: '2025-05-17T08:01:00Z',
        type: 'text',
        status: 'sent',
    },
    {
        messageId: 'm57',
        conversationId: 'c1',
        sender: {
            userId: 'u6',
            username: 'Bob',
            avatarUrl: 'https://i.pravatar.cc/150?img=2',
        },
        content: "I'm good, thanks! And you?",
        timestamp: '2025-05-17T08:01:00Z',
        type: 'text',
        status: 'sent',
    },
    {
        messageId: 'm7',
        conversationId: 'c1',
        sender: {
            userId: 'u8',
            username: 'Bob',
            avatarUrl: 'https://i.pravatar.cc/150?img=2',
        },
        content: "I'm good, thanks! And you?",
        timestamp: '2025-05-17T08:01:00Z',
        type: 'text',
        status: 'sent',
    },
    {
        messageId: 'm9',
        conversationId: 'c1',
        sender: {
            userId: 'u1',
            username: 'Alice',
            avatarUrl: 'https://i.pravatar.cc/150?img=1',
        },
        content: 'Dep qua shop oi',
        timestamp: '2025-05-17T08:02:00Z',
        type: 'image',
        link : ['https://pub-0f02951565a14603816f4ca468c73608.r2.dev/giahyng.jpg','https://pub-0f02951565a14603816f4ca468c73608.r2.dev/giahyng.jpg','https://pub-0f02951565a14603816f4ca468c73608.r2.dev/giahyng.jpg','https://pub-0f02951565a14603816f4ca468c73608.r2.dev/giahyng.jpg','https://pub-0f02951565a14603816f4ca468c73608.r2.dev/giahyng.jpg','https://pub-0f02951565a14603816f4ca468c73608.r2.dev/giahyng.jpg','https://pub-0f02951565a14603816f4ca468c73608.r2.dev/giahyng.jpg','https://pub-0f02951565a14603816f4ca468c73608.r2.dev/giahyng.jpg','https://pub-0f02951565a14603816f4ca468c73608.r2.dev/giahyng.jpg','https://pub-0f02951565a14603816f4ca468c73608.r2.dev/giahyng.jpg',],
        status: 'sent',
    },
    {
        messageId: 'm10',
        conversationId: 'c1',
        sender: {
            userId: 'u2',
            username: 'Bob',
            avatarUrl: 'https://i.pravatar.cc/150?img=2',
        },
        content: "I'm good, thanks! And you?",
        timestamp: '2025-05-17T08:03:00Z',
        type: 'text',
        status: 'pending',
    },
];


// utils.ts
export const getParticipantsByIds = (ids: string[]): Participant[] => {
    // @ts-ignore
    return fakeParticipants.filter(p => ids.includes(p.userId));
};

