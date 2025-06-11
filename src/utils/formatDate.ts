import moment from 'moment';

export const formatSmartDate = (
    date?: string | Date | null,
    locale: string = 'en-US',
    fallbackText: string = 'Not specified'
): string => {
    if (!date) return fallbackText;

    moment.locale(locale);
    const dateObj = typeof date === 'string' ? moment(date) : moment(date);
    return dateObj.format('DD/MM/YYYY');
};
