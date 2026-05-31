import type { MetadataRoute } from 'next';

const BASE = 'https://malkocdizayn.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: BASE,                               lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE}/koleksiyon`,               lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE}/koleksiyon/duvar-sanati`,  lastModified: now, changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE}/koleksiyon/heykeller`,     lastModified: now, changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE}/koleksiyon/lambalar`,      lastModified: now, changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE}/koleksiyon/ozel-uretim`,   lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/hakkimizda`,               lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/projeler`,                 lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/ozel-siparis`,             lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/iletisim`,                 lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
  ];
}
