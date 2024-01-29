/** @type {import('next').NextConfig} */
import config from './next-i18next.config.mjs';

const i18n = config.i18n;

const nextConfig = {
  reactStrictMode: true,
  i18n,
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
