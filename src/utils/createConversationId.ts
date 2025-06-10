
export const createConversationId = (userIds: string[], isGroup: boolean): string => {
    if (isGroup) {
        const uniqueId = Math.random().toString(36).substring(2, 10); // random 8 ký tự
        return `cvg-${uniqueId}`;
    } else {
        const sortedIds = [...userIds].sort();
        return `cv-${sortedIds[0]}-${sortedIds[1]}`;
    }
};


export function parseUserIdsFromString(cvId: string): [string, string] {
    const parts = cvId.split('-'); // ['cv', 'user1', 'user2']
    if (parts.length !== 3 || parts[0] !== 'cv') {
        throw new Error('Invalid cvId format. Expected format: "cv-user1-user2"');
    }
    return [parts[1], parts[2]];
}
