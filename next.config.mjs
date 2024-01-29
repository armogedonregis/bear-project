/** @type {import('next').NextConfig} */
import i18n from './next-i18next.config.js';

const nextConfig = {
  reactStrictMode: true,
  i18n: i18n.i18n,
  env: {
    API_KEY: process.env.API_KEY,
    DADATA_API_KEY: process.env.DADATA_API_KEY
  },
  images: {
    unoptimized: false,
    remotePatterns: [
      {
        hostname: '*',
      },
    ],
    formats: ['image/avif', 'image/webp']
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: { and: [/\.(js|ts|md)x?$/] },

      use: ['@svgr/webpack']
    })

    return config
  },
};

export default nextConfig;