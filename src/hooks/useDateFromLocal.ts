import {useTranslation} from 'react-i18next';
import {useCallback} from 'react';
import moment from 'moment';
import 'moment/locale/vi';
import 'moment/locale/en-gb';

export const useLocalizedDate = () => {
  const {t, i18n} = useTranslation();
  const locale = i18n.language || 'en-US';

  const formatDate = useCallback(
    (date?: string | Date | null): string => {
      if (!date) return t('except.Not specified');
      moment.locale(locale);

      const dateObj = typeof date === 'string' ? moment(date) : moment(date);
      const now = moment();

      if (dateObj.isSame(now, 'day')) {
        // Cùng ngày → chỉ hiển thị giờ:phút
        return dateObj.format('HH:mm');
      }

      if (dateObj.isSame(now, 'week')) {
        // Cùng tuần → hiển thị thứ
        return dateObj.format('dddd'); // VD: "Thứ hai", "Monday"
      }

      if (dateObj.isSame(now, 'month') && dateObj.isSame(now, 'year')) {
        // Cùng tháng cùng năm → chỉ hiển thị ngày/tháng
        return dateObj.format('DD/MM');
      }

      // Khác năm → hiển thị đầy đủ
      return dateObj.format('DD/MM/YYYY');
    },
    [locale, t],
  );

  const formatTime = useCallback(
    (date?: string | Date | null): string => {
      if (!date) return t('except.Not specified');
      moment.locale(locale);

      const dateObj = typeof date === 'string' ? moment(date) : moment(date);
      return dateObj.format('HH:mm'); // chỉ hiển thị giờ:phút
    },
    [locale, t],
  );

  return {formatDate, formatTime};
};
