import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
      {
        // Google Image bot — tüm sayfaya erişim
        userAgent: 'Googlebot-Image',
        allow: '/',
      },
    ],
    sitemap: 'https://malkocdizayn.com/sitemap.xml',
    host: 'https://malkocdizayn.com',
  };
}
