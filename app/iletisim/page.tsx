import type { Metadata } from 'next';
import Link from 'next/link';
import { ContactForm } from './ContactForm';

export const metadata: Metadata = {
  title: 'İletişim',
  description: 'Malkoç Dizayn ile iletişime geçin. Özel sipariş, kurumsal proje ve koleksiyon hakkında bilgi alın.',
  alternates: { canonical: 'https://malkocdizayn.com/iletisim' },
};

export default function IletisimPage() {
  return (
    <div className="pt-28 min-h-screen" style={{ background: 'var(--black)' }}>
      <div className="max-w-5xl mx-auto px-6 py-16">
        <nav aria-label="Breadcrumb" className="mb-10">
          <ol className="flex items-center gap-2 text-[11px] tracking-wider" style={{ color: 'var(--white-muted)' }}>
            <li><Link href="/" className="hover:text-[#C9A84C] transition-colors">Anasayfa</Link></li>
            <li style={{ color: 'var(--gold)' }}>›</li>
            <li style={{ color: 'var(--white)' }}>İletişim</li>
          </ol>
        </nav>
        <div className="text-center mb-16">
          <span className="block font-script text-2xl mb-3" style={{ fontFamily: 'var(--font-great-vibes)', color: 'var(--gold)' }}>Bize Yazın</span>
          <h1 className="text-5xl md:text-6xl font-light" style={{ fontFamily: 'var(--font-cormorant)', color: 'var(--white)' }}>İletişim</h1>
          <span className="gold-line mx-auto mt-5 block" />
        </div>
        <ContactForm />
      </div>
    </div>
  );
}
