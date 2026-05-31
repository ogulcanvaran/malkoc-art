import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Hakkımızda — Stüdyo ve Süreç',
  description: 'Malkoç Dizayn stüdyosu hakkında bilgi edinin. El yapımı lüks sanat eserlerinin üretim süreci, kullandığımız malzemeler ve tasarım felsefemiz.',
  alternates: { canonical: 'https://malkocdizayn.com/hakkimizda' },
};

const steps = [
  { n: '01', title: 'Kavram',      body: 'Mekânı, renk paletini ve formu birlikte keşfediyoruz. Her projeye özgü bir brief hazırlıyoruz.' },
  { n: '02', title: 'Tasarım',     body: 'Analog eskizlerden dijital 3D modellemelere kadar formu keşfediyoruz.' },
  { n: '03', title: 'Üretim',      body: 'Seçilen malzemeleri stüdyomuzda işliyor, katman katman renk ve doku uyguluyoruz.' },
  { n: '04', title: 'Son Rötuş',   body: 'Cila, vernik ve ışık testi ile eseri son halinin mükemmelliğine taşıyoruz.' },
  { n: '05', title: 'Teslimat',    body: 'Özel paketleme ve beyaz eldiven teslimat ile eseri mekânına ulaştırıyoruz.' },
];

export default function HakkimizdaPage() {
  return (
    <div className="pt-28 min-h-screen" style={{ background: 'var(--black)' }}>

      {/* Hero */}
      <div className="relative h-[50vh] overflow-hidden">
        <Image src="https://picsum.photos/seed/about1/1600/800" alt="Malkoç Dizayn stüdyosu — el yapımı lüks sanat üretimi" fill className="object-cover" />
        <div className="absolute inset-0" style={{ background: 'rgba(10,10,10,0.65)' }} />
        <div className="absolute inset-0 flex items-center justify-center text-center px-6">
          <div>
            <span className="block font-script text-3xl mb-3" style={{ fontFamily: 'var(--font-great-vibes)', color: 'var(--gold)' }}>Biz Kimiz</span>
            <h1 className="text-5xl md:text-7xl font-light" style={{ fontFamily: 'var(--font-cormorant)', color: 'var(--white)' }}>Stüdyo</h1>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-20">

        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-12">
          <ol className="flex items-center gap-2 text-[11px] tracking-wider" style={{ color: 'var(--white-muted)' }}>
            <li><Link href="/" className="hover:text-[#C9A84C] transition-colors">Anasayfa</Link></li>
            <li style={{ color: 'var(--gold)' }}>›</li>
            <li style={{ color: 'var(--white)' }}>Hakkımızda</li>
          </ol>
        </nav>

        {/* Intro */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24 items-center">
          <div>
            <span className="gold-line mb-6 block" />
            <h2 className="text-4xl font-light mb-6" style={{ fontFamily: 'var(--font-cormorant)', color: 'var(--white)' }}>
              Her Eser, Bir <em style={{ color: 'var(--gold)' }}>Hikâye</em>
            </h2>
            <p className="text-[15px] leading-relaxed mb-4" style={{ color: 'var(--white-muted)' }}>
              Malkoç Dizayn olarak organik formları, premium malzemeleri ve modern tasarımı bir araya getirerek lüks mekânlar için özgün sanat eserleri üretiyoruz.
            </p>
            <p className="text-[15px] leading-relaxed" style={{ color: 'var(--white-muted)' }}>
              Reçine, metal varak, alçı ve özel pigmentler kullanarak her esere kendine özgü bir karakter kazandırıyoruz. Duvar panellerimizden dekoratif heykellere, lamba tasarımlarından özel sipariş projelere kadar geniş bir koleksiyon sunuyoruz.
            </p>
          </div>
          <div className="relative h-80 md:h-96 overflow-hidden">
            <Image src="https://picsum.photos/seed/about2/700/600" alt="Malkoç Dizayn sanatçı çalışma stüdyosu" fill className="object-cover" />
          </div>
        </div>

        {/* Process */}
        <div id="surec" className="mb-24">
          <div className="text-center mb-14">
            <span className="block font-script text-2xl mb-3" style={{ fontFamily: 'var(--font-great-vibes)', color: 'var(--gold)' }}>Nasıl Çalışıyoruz</span>
            <h2 className="text-4xl font-light" style={{ fontFamily: 'var(--font-cormorant)', color: 'var(--white)' }}>Üretim Süreci</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {steps.map((s) => (
              <div key={s.n} className="flex flex-col gap-3 p-6" style={{ border: '1px solid rgba(201,168,76,0.12)', background: 'var(--black-surface)' }}>
                <span className="text-3xl font-light" style={{ fontFamily: 'var(--font-cormorant)', color: 'var(--gold)' }}>{s.n}</span>
                <h3 className="text-lg font-light" style={{ fontFamily: 'var(--font-cormorant)', color: 'var(--white)' }}>{s.title}</h3>
                <p className="text-[12px] leading-relaxed" style={{ color: 'var(--white-muted)' }}>{s.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link href="/ozel-siparis" className="inline-flex items-center gap-3 px-10 py-4 text-[11px] tracking-[0.22em] uppercase transition-all hover:bg-[#9A7A30]" style={{ background: 'var(--gold)', color: 'var(--black)' }}>
            Proje Başlat
          </Link>
        </div>
      </div>
    </div>
  );
}
