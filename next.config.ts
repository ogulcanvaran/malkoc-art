import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'picsum.photos' },
    ],
  },
  turbopack: {
    rules: {
      '*.glsl':      { loaders: ['raw-loader'], as: '*.js' },
      '*.vert.glsl': { loaders: ['raw-loader'], as: '*.js' },
      '*.frag.glsl': { loaders: ['raw-loader'], as: '*.js' },
      '*.vert':      { loaders: ['raw-loader'], as: '*.js' },
      '*.frag':      { loaders: ['raw-loader'], as: '*.js' },
    },
  },
};

export default nextConfig;
