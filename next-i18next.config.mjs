import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

i18next
  .use(initReactI18next)
  .init({
    defaultLocale: 'ru',
    localeDetection: false,
    locales: ['ru', 'en', 'ch'],
    domains: [
      {
        domain: 'example.com',
        defaultLocale: 'ru'
      },
      {
        domain: 'example.com/en',
        defaultLocale: 'en'
      },
      {
        domain: 'example.com/ch',
        defaultLocale: 'ch'
      }
    ],
    localePath: './public/locales'
  });

export default i18next;