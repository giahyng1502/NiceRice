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

export const AvatarDefault = 'https://pub-0f02951565a14603816f4ca468c73608.r2.dev/defaul_avt.jpg'
