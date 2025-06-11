import moment from 'moment';
import 'moment/locale/vi';
import 'moment/locale/en-gb';
import {Messages} from "../store/reducers/messageSlice";

type GroupedMessage = {
    type: 'header' | 'message';
    date?: string;
    message?: Messages;
};

export const getDisplayDate = (dateStr: string, lang: string): string => {
    moment.locale(lang);
    const date = moment(dateStr);

    if (date.isSame(moment(), 'day')) return lang === 'vi' ? 'Hôm nay' : 'Today';
    if (date.isSame(moment().subtract(1, 'day'), 'day'))
        return lang === 'vi' ? 'Hôm qua' : 'Yesterday';

    return date.format('LL'); // ví dụ: "10 tháng 6, 2025"
};

export const groupMessagesByDate = (
    messages: Messages[],
    lang: string
): GroupedMessage[] => {
    const result: GroupedMessage[] = [];
    let lastDate = '';

    moment.locale(lang);

    messages.forEach(msg => {
        const displayDate = getDisplayDate(msg.createdAt, lang);

        if (displayDate !== lastDate) {
            lastDate = displayDate;

            result.push({type: 'message', message: msg});
            result.push({type: 'header', date: displayDate});
        } else {
            result.push({type: 'message', message: msg});
        }
    });

    return result;
};
