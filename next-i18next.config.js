/** @type {import('next-i18next').UserConfig} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

module.exports = {
  i18n: {
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
    ]
  },
  localePath:
    typeof window === 'undefined'
      ? path.resolve('./public/locales')
      : '/locales',
  reloadOnPrerender: process.env.NODE_ENV === 'development'
}