import type { Metadata } from 'next';
import Link from 'next/link';
import { BespokeForm } from './BespokeForm';

export const metadata: Metadata = {
  title: 'Özel Sipariş — Mekânınıza Özel Eser',
  description: 'Malkoç Dizayn ile mekânınıza özel lüks sanat eseri siparişi verin. Boyut, renk ve malzeme seçimi tamamen size özel.',
  alternates: { canonical: 'https://malkocdizayn.com/ozel-siparis' },
};

export default function OzelSiparisPage() {
  return (
    <div className="pt-28 min-h-screen" style={{ background: 'var(--black)' }}>
      <div className="site-container max-w-2xl py-16">
        <nav aria-label="Breadcrumb" className="mb-10">
          <ol className="flex items-center gap-2 text-[11px] tracking-wider" style={{ color: 'var(--white-muted)' }}>
            <li><Link href="/" className="hover:text-[#C9A84C] transition-colors">Anasayfa</Link></li>
            <li style={{ color: 'var(--gold)' }}>›</li>
            <li style={{ color: 'var(--white)' }}>Özel Sipariş</li>
          </ol>
        </nav>
        <div className="text-center mb-14">
          <span className="block font-script text-2xl mb-3" style={{ fontFamily: 'var(--font-great-vibes)', color: 'var(--gold)' }}>Sizin İçin</span>
          <h1 className="text-5xl md:text-6xl font-light mb-4" style={{ fontFamily: 'var(--font-cormorant)', color: 'var(--white)' }}>Özel Sipariş</h1>
          <span className="gold-line mx-auto block" />
          <p className="mt-6 text-[14px] leading-relaxed max-w-lg mx-auto" style={{ color: 'var(--white-muted)' }}>
            Her detayı sizinle birlikte tasarlıyoruz. Boyut, renk, malzeme ve form — mekânınıza tam uyum sağlayan özgün bir eser.
          </p>
        </div>
        <BespokeForm />
      </div>
    </div>
  );
}
