// fakeData.ts

// Fake participants
import {Conversation, Message, Participant, ParticipantStatus} from './types';

export const fakeParticipants: Participant[] = [
  {
    userId: 'u1',
    username: 'Gia Hy',
    avatarUrl: 'https://randomuser.me/api/portraits/women/3.jpg',
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
  {
    userId: 'u4',
    username: 'Hồng Nhung',
    avatarUrl: 'https://randomuser.me/api/portraits/women/4.jpg',
  },
];

// Fake conversations
export let fakeConversations: Conversation[];
fakeConversations = [
  {
    conversationId: 'c1',
    isGroup: false,
    lastMessagePreview: 'https://example.com/image.jpg',
    lastUpdated: '2025-05-17T08:02:00Z',
    participantIds: ['u1', 'u2'],
    unreadCount: 0,
  },
  {
    conversationId: 'c2',
    participantIds: ['u1', 'u3'],
    lastUpdated: '2025-05-17T07:00:00Z',
    unreadCount: 3,
    lastMessagePreview: "Let's meet this afternoon!",
    isGroup: false,
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
    link: [
      'https://pub-0f02951565a14603816f4ca468c73608.r2.dev/giahyng.jpg',
      'https://pub-0f02951565a14603816f4ca468c73608.r2.dev/giahyng.jpg',
      'https://pub-0f02951565a14603816f4ca468c73608.r2.dev/giahyng.jpg',
      'https://pub-0f02951565a14603816f4ca468c73608.r2.dev/giahyng.jpg',
      'https://pub-0f02951565a14603816f4ca468c73608.r2.dev/giahyng.jpg',
      'https://pub-0f02951565a14603816f4ca468c73608.r2.dev/giahyng.jpg',
      'https://pub-0f02951565a14603816f4ca468c73608.r2.dev/giahyng.jpg',
      'https://pub-0f02951565a14603816f4ca468c73608.r2.dev/giahyng.jpg',
      'https://pub-0f02951565a14603816f4ca468c73608.r2.dev/giahyng.jpg',
      'https://pub-0f02951565a14603816f4ca468c73608.r2.dev/giahyng.jpg',
    ],
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

export const messages: Message[] = [
  {
    messageId: 'm1',
    conversationId: 'c1',
    sender: fakeParticipants[0],
    content: 'Hello everyone!',
    timestamp: '2025-05-19T10:00:00Z',
    type: 'text',
    status: 'sent',
    isEdited: false,
  },
  {
    messageId: 'm2',
    conversationId: 'c1',
    sender: fakeParticipants[1],
    content: 'Check out this image',
    timestamp: '2025-05-19T10:05:00Z',
    type: 'image',
    link: ['https://placekitten.com/200/300'],
    status: 'received',
  },
];

export const conversations: Conversation[] = [
  {
    conversationId: 'c1',
    participantIds: ['u1', 'u2', 'u3', 'u4'],
    lastUpdated: '2025-05-19T10:05:00Z',
    unreadCount: 2,
    lastMessagePreview: 'Check out this image',
    groupName: 'React Native Devs',
    groupAvatar: 'https://i.pravatar.cc/150?u=group1',
    isGroup: true,
    lastSenderName: 'Bob',
  },
  {
    conversationId: 'c2',
    participantIds: ['u1', 'u2'],
    lastUpdated: '2025-05-19T09:50:00Z',
    unreadCount: 0,
    lastMessagePreview: 'Hey!',
    groupName: 'Tòa nhà hạnh phúc',
    isGroup: false,
    lastSenderName: 'Alice',
  },
];

export const participantStatuses: ParticipantStatus[] = [
  {userId: 'u1', isOnline: true, lastSeen: '2025-05-19T09:00:00Z'},
  {userId: 'u2', isOnline: false, lastSeen: '2025-05-19T08:45:00Z'},
  {userId: 'u3', isOnline: true, lastSeen: '2025-05-19T10:10:00Z'},
];
