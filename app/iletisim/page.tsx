import type { Metadata } from 'next';
import { Breadcrumb }   from '@/components/Breadcrumb';
import { ContactForm }  from './ContactForm';

export const metadata: Metadata = {
  title: 'İletişim — Proje Teklifi ve Bilgi',
  description:
    'Malkoç Design ile iletişime geçin. Özel sipariş, kurumsal proje teklifi ve koleksiyon hakkında bilgi almak için bize ulaşın. İstanbul.',
  alternates: { canonical: 'https://malkocdizayn.com/iletisim' },
};

export default function IletisimPage() {
  return (
    <div className="pt-28 min-h-screen" style={{ background: 'var(--black)' }}>
      <div className="site-container py-14">
        <Breadcrumb items={[{ label: 'İletişim' }]} />

        <div className="text-center mb-14">
          <span
            className="block mb-3 text-gold-gradient"
            style={{ fontFamily: 'var(--font-script)', fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)' }}
          >
            Bize Yazın
          </span>
          <h1
            className="font-light mb-5"
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', color: 'var(--cream)' }}
          >
            İletişim
          </h1>
          <span className="gold-line mx-auto block" />
        </div>

        <ContactForm />
      </div>
    </div>
  );
}
