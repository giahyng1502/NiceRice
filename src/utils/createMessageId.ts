export const createMessageId = () : string => {
    return 'm-' + Math.random().toString(36).substring(2, 8);
};
