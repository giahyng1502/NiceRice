
export const createConversationId = (userIds : any[], isGroup : boolean) => {
    if (isGroup) {
        return `cvg-${Math.random().toString(36).substring(2, 8)}`; // lấy 8 kí tự UUID đầu
    } else {
        const sortedIds = userIds.sort();
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
