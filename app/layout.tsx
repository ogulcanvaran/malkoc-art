import type { Metadata } from 'next';
import { Inter, Cormorant_Garamond, Great_Vibes } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const greatVibes = Great_Vibes({
  subsets: ['latin'],
  variable: '--font-great-vibes',
  weight: '400',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://malkocdizayn.com'),
  title: {
    default: 'Malkoç Dizayn | Lüks Duvar Sanatı ve Özgün Heykel',
    template: '%s | Malkoç Dizayn',
  },
  description:
    'El yapımı lüks duvar sanatı, özgün heykeller ve premium dekoratif tasarım eserleri. Lüks mekanlar ve kurumsal projeler için özel üretim.',
  keywords: [
    'lüks duvar sanatı',
    'özgün heykel',
    'el yapımı sanat eseri',
    'altın dekor',
    'reçine heykel',
    'sıvı metal sanat',
    'dekoratif duvar heykeli',
    'özel üretim sanat',
    'iç mekan dekorasyon',
    'lüks iç mimari aksesuar',
    'Malkoç Dizayn',
  ],
  authors: [{ name: 'Malkoç Dizayn' }],
  creator: 'Malkoç Dizayn',
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: 'https://malkocdizayn.com',
    siteName: 'Malkoç Dizayn',
    title: 'Malkoç Dizayn | Lüks Duvar Sanatı ve Özgün Heykel',
    description:
      'El yapımı lüks duvar sanatı, özgün heykeller ve premium dekoratif tasarım eserleri.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Malkoç Dizayn' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Malkoç Dizayn | Lüks Duvar Sanatı',
    description: 'El yapımı lüks duvar sanatı ve özgün heykel eserleri.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  alternates: { canonical: 'https://malkocdizayn.com' },
};

// Schema.org Organization — Google Business markup
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Malkoç Dizayn',
  url: 'https://malkocdizayn.com',
  logo: 'https://malkocdizayn.com/logo.png',
  description: 'El yapımı lüks duvar sanatı, özgün heykeller ve premium dekoratif tasarım eserleri.',
  sameAs: [
    'https://www.instagram.com/malkocdizayn',
    'https://www.pinterest.com/malkocdizayn',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    availableLanguage: ['Turkish', 'English'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="tr"
      className={`${inter.variable} ${cormorant.variable} ${greatVibes.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
