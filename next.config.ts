import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  allowedDevOrigins: ['192.168.0.212'],
  images: {
    remotePatterns: [{ protocol: 'https', hostname: '**' }]
  }
};

export default withNextIntl(nextConfig);
