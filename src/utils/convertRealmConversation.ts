import {Conversation} from "../store/reducers/conversationSlice";

export function convertRealmConversation(conv: any): Conversation {
    return {
        conversationId: conv.conversationId,
        createdAt: conv.createdAt instanceof Date ? conv.createdAt.toISOString() : conv.createdAt,
        unreadCount: conv.unreadCount,
        groupName: conv.groupName ?? undefined,
        groupAvatar: conv.groupAvatar ?? undefined,
        isGroup: conv.isGroup,
        lastMessagePreview: conv.lastMessagePreview, // là string, ko cần convert
        lastUpdatedAt: conv.lastUpdatedAt instanceof Date ? conv.lastUpdatedAt.toISOString() : conv.lastUpdatedAt,
        participants: conv.participants
            ? conv.participants.map((p: any) => ({
                fullName: p.fullName ?? undefined,
                avatarUrl: p.avatarUrl ?? undefined,
                seenDateTime: p.seenDateTime instanceof Date ? p.seenDateTime.toISOString() : p.seenDateTime,
                isAdmin: p.isAdmin ?? undefined,
                conversationId: p.conversationId ?? undefined,
                joinedAt: p.joinedAt instanceof Date ? p.joinedAt.toISOString() : p.joinedAt,
            }))
            : undefined,
    };
}
