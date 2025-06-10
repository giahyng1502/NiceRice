import { useTranslation } from 'react-i18next';

export const guessTimeZoneFromLocale = (locale: string): string => {
    if (locale.startsWith('vi')) return 'Asia/Ho_Chi_Minh';
    if (locale.startsWith('en')) return 'America/New_York';
    return 'UTC';
};

export const useLocalizedDate = () => {
    const { t, i18n } = useTranslation();
    const locale = i18n.language || 'en-US';
    const timeZone = guessTimeZoneFromLocale(locale);

    const formatDate = (date?: string | Date | null): string => {
        if (!date) return t('except.Not specified');

        const dateObj = typeof date === 'string' ? new Date(date) : date;

        return dateObj.toLocaleString(locale, {
            timeZone,
            hour12: false,
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        });
    };

    return { formatDate };
};
