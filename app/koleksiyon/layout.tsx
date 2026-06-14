import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Koleksiyon — El Yapımı Lüks Sanat Eserleri',
  description:
    'Malkoç Design koleksiyonu: el yapımı lüks duvar sanatı, özgün heykeller, dekoratif lambalar ve özel üretim eserler. İstanbul\'da premium sanat.',
  alternates: { canonical: 'https://malkocdizayn.com/koleksiyon' },
  openGraph: {
    title:       'Koleksiyon | Malkoç Design',
    description: 'El yapımı lüks duvar sanatı ve özgün heykel koleksiyonu.',
    images:      [{ url: '/og-koleksiyon.jpg', width: 1200, height: 630 }],
  },
};

export default function KoleksiyonLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
