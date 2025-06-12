    export const guessTimeZoneFromLocale = (locale: string): string => {
    if (locale.startsWith('vi')) return 'Asia/Ho_Chi_Minh';
    if (locale.startsWith('en')) return 'America/New_York';
    return 'UTC';
};
    export const guessLangFromLocale = (locale: string): string => {
        if (locale.startsWith('vi')) return 'vi';
        if (locale.startsWith('en')) return 'en';
        return 'en';
    };
