import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as RNLocalize from 'react-native-localize';

import vi from './language/vi.json';
import en from './language/en.json';
import AsyncStorage from "@react-native-async-storage/async-storage";

const resources = {
    vi: { translation: vi },
    en: { translation: en },
};

const languageDetector = {
    type: 'languageDetector',
    async: true,
    detect: async (callback: (lang: string) => void) => {
        try {
            const savedLang = await AsyncStorage.getItem('user-language');
            if (savedLang) {
                callback(savedLang);
                return;
            }
        } catch (e) {
            // lỗi thì bỏ qua, sẽ lấy locale hệ thống
        }
        const locales = RNLocalize.getLocales();
        callback(locales[0]?.languageCode || 'en');
    },
    init: () => {},
    cacheUserLanguage: async (lang: string) => {
        try {
            await AsyncStorage.setItem('user-language', lang);
        } catch (e) {
            // handle error if needed
        }
    },
};

i18n
    .use(languageDetector as any)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;

export const changeLanguage = async (lang: string) => {
    await i18n.changeLanguage(lang);
    if (i18n.services.languageDetector?.cacheUserLanguage) {
        await i18n.services.languageDetector.cacheUserLanguage(lang);
    }
};
