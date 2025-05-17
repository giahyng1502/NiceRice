import moment from 'moment';

export function formatDateOrTime(dateInput: Date | string): string {
    const date = moment(dateInput);
    const now = moment();

    if (date.isSame(now, 'day')) {
        // Cùng ngày, trả về giờ phút
        return date.format('HH:mm');
    } else {
        // Khác ngày, trả về dd/MM
        return date.format('DD/MM');
    }
}
