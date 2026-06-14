import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Plus_Jakarta_Sans, Great_Vibes } from 'next/font/google';
import './globals.css';
import { ThemeProvider }   from '@/components/ThemeProvider';
import { Navbar }          from '@/components/Navbar';
import { Footer }          from '@/components/Footer';
import { WhatsAppButton }  from '@/components/WhatsAppButton';
import { StickyCtaBar }    from '@/components/StickyCtaBar';
import { SchemaOrg }       from '@/components/SchemaOrg';

const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets:  ['latin'],
  weight:   ['300', '400', '500', '600'],
  style:    ['normal', 'italic'],
  display:  'swap',
});

const jakarta = Plus_Jakarta_Sans({
  variable: '--font-jakarta',
  subsets:  ['latin'],
  weight:   ['300', '400', '500', '600'],
  display:  'swap',
});

const greatVibes = Great_Vibes({
  variable: '--font-great-vibes',
  subsets:  ['latin'],
  weight:   ['400'],
  display:  'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://malkocdizayn.com'),
  title: {
    default:  'Malkoç Design | İstanbul Lüks Duvar Sanatı & İç Mekan',
    template: '%s | Malkoç Design',
  },
  description:
    'İstanbul\'da el yapımı lüks duvar sanatı, özgün heykeller ve premium dekoratif tasarım. Kurumsal ve bireysel projeler için özel üretim sanat eserleri.',
  keywords: [
    'lüks duvar sanatı', 'interior art istanbul', 'özel sanat eseri', 'kurumsal dekorasyon',
    'malkoç design', 'özel üretim dekorasyon', 'ofis dekorasyon istanbul',
  ],
  authors:  [{ name: 'Malkoç Design' }],
  openGraph: {
    type:     'website',
    locale:   'tr_TR',
    siteName: 'Malkoç Design',
    images:   [{ url: '/og-default.jpg', width: 1200, height: 630 }],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width:        'device-width',
  initialScale: 1,
  themeColor:   [
    { media: '(prefers-color-scheme: light)', color: '#F7F4EF' },
    { media: '(prefers-color-scheme: dark)',  color: '#141210' },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={`${cormorant.variable} ${jakarta.variable} ${greatVibes.variable}`}>
      <body>
        <ThemeProvider>
          <SchemaOrg />
          <Navbar />
          <main>{children}</main>
          <Footer />
          <WhatsAppButton />
          <StickyCtaBar />
        </ThemeProvider>
      </body>
    </html>
  );
}
