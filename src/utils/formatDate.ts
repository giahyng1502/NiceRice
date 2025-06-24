import moment from 'moment';
import 'moment/locale/vi';
import 'moment/locale/ja';
const SUPPORTED_LOCALES = ['en', 'vi'];
export const formatSmartDate = (
  date?: string | Date | null,
  locale: string = 'en',
  fallbackText: string = 'Not specified',
): string => {
  if (!date) return fallbackText;
  const safeLocale = SUPPORTED_LOCALES.includes(locale || '') ? locale : 'en';
  moment.locale(safeLocale);
  const dateObj = typeof date === 'string' ? moment(date) : moment(date);
  return dateObj.format('DD/MM/YYYY');
};

export const AvatarDefault =
  'https://pub-0f02951565a14603816f4ca468c73608.r2.dev/defaul_avt.jpg';
