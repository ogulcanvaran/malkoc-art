import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 85, 90],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        poll:        30000, // 30 saniyede bir kontrol
        aggregateTimeout: 500,
        ignored:     /node_modules|public\/busemalkocart/,
      };
    }
    return config;
  },
};

export default nextConfig;
