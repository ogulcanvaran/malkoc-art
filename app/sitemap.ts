import type { MetadataRoute } from 'next';

const BASE = 'https://malkocdizayn.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE,                                          lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE}/koleksiyon`,                          lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE}/koleksiyon/duvar-sanati`,             lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE}/koleksiyon/heykeller`,                lastModified: now, changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE}/koleksiyon/lambalar`,                 lastModified: now, changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE}/koleksiyon/ozel-uretim`,              lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/projeler`,                            lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE}/projeler/nisantasi-rezidans`,         lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/projeler/kurumsal-lobi-projesi`,      lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/projeler/boutique-otel-uygulamasi`,   lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/hizmetler`,                           lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/hizmetler/ic-mekan-danismanligi`,     lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/hizmetler/ozel-proje`,                lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/hizmetler/kurumsal`,                  lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/hakkimizda`,                          lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/ozel-siparis`,                        lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/iletisim`,                            lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/gizlilik`,                            lastModified: now, changeFrequency: 'yearly',  priority: 0.2 },
    { url: `${BASE}/kvkk`,                                lastModified: now, changeFrequency: 'yearly',  priority: 0.2 },
    { url: `${BASE}/cerez-politikasi`,                    lastModified: now, changeFrequency: 'yearly',  priority: 0.2 },
  ];

  return staticPages;
}
