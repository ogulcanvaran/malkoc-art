import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Breadcrumb }  from '@/components/Breadcrumb';
import { studyoImages, duvarSanatiImages, ozelUretimImages } from '@/lib/images';

export const metadata: Metadata = {
  title: 'Stüdyo — Malkoç Design Hakkında',
  description:
    'Malkoç Design stüdyosu hakkında bilgi edinin. El yapımı lüks sanat eserlerinin üretim süreci, kullandığımız premium malzemeler ve tasarım felsefemiz. İstanbul.',
  alternates: { canonical: 'https://malkocdizayn.com/hakkimizda' },
  openGraph: {
    title:       'Stüdyo | Malkoç Design',
    description: 'El yapımı lüks sanat ve tasarım stüdyosu.',
    images:      [{ url: '/og-hakkimizda.jpg', width: 1200, height: 630 }],
  },
};

const steps = [
  { n: '01', title: 'Kavram',     body: 'Mekânı, renk paletini ve formu birlikte keşfediyoruz. Projeye özgü bir brief ve ön taslak hazırlıyoruz.' },
  { n: '02', title: 'Tasarım',    body: 'Analog eskizlerden dijital 3D modellemelere kadar formu keşfediyoruz. Renk ve malzeme sunumu yapıyoruz.' },
  { n: '03', title: 'Üretim',     body: 'Seçilen malzemeleri atölyemizde el işçiliğiyle işliyor, katman katman renk ve doku uyguluyoruz.' },
  { n: '04', title: 'Son Rötuş',  body: 'Cila, vernik ve ışık testi ile eseri son halinin mükemmelliğine taşıyoruz. Kalite kontrolü yapıyoruz.' },
  { n: '05', title: 'Teslimat',   body: 'Özel paketleme ve beyaz eldiven teslimat ile eseri mekânına ulaştırıyoruz. Montajı biz yapıyoruz.' },
];

const testimonials = [
  {
    text:   'Oturma odamız için sipariş ettiğimiz eser harika oldu. Üretim sürecinde her aşamada bilgilendirildik, teslimat ve montaj profesyonel ekip tarafından yapıldı.',
    author: 'Ayşe K.',
    role:   'Özel Konut, İstanbul',
  },
  {
    text:   'Genel merkez lobi projemiz için tam istediğimiz çözümü ürettiler. Kurumsal kimliğimizi mekâna çok güzel taşıdılar. Kesinlikle tekrar çalışacağız.',
    author: 'Mehmet B.',
    role:   'Holding CEO\'su, İstanbul',
  },
  {
    text:   'Restoranımız için tasarlanan aydınlatma ve duvar sanatı kombinasyonu ambiyansı komple değiştirdi. Misafirlerimizden çok olumlu geri dönüşler alıyoruz.',
    author: 'Leyla S.',
    role:   'Restoran İşletmecisi, İstanbul',
  },
];

export default function HakkimizdaPage() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--black)' }}>

      {/* Hero — tam genişlik görsel */}
      <div className="relative overflow-hidden flex items-end" style={{ minHeight: 'clamp(320px, 50vw, 580px)' }}>
        <Image
          src={studyoImages[1].src}
          alt="Malkoç Design stüdyosu — el yapımı lüks sanat üretimi"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(12,11,9,0.95) 0%, rgba(12,11,9,0.40) 60%, transparent 100%)' }} />
        <div className="relative site-container pb-12 pt-28">
          <span
            className="block mb-2 text-gold-gradient"
            style={{ fontFamily: 'var(--font-script)', fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)' }}
          >
            Biz Kimiz
          </span>
          <h1
            className="font-light"
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.8rem, 6vw, 5.5rem)', color: 'var(--cream)' }}
          >
            Stüdyo
          </h1>
        </div>
      </div>

      <div className="site-container py-14">
        <Breadcrumb items={[{ label: 'Hakkımızda' }]} />

        {/* Sayaçlar */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-0 mb-20"
          style={{ border: '1px solid rgba(201,168,76,0.10)' }}
        >
          {[
            { n: '500+',  label: 'Tamamlanan Eser' },
            { n: '8+',    label: 'Yıl Deneyim' },
            { n: '100%',  label: 'El Yapımı' },
            { n: '24s',   label: 'Yanıt Süresi' },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className="flex flex-col items-center text-center py-10 px-6"
              style={{ borderRight: i < 3 ? '1px solid rgba(201,168,76,0.08)' : 'none' }}
            >
              <span
                className="font-light mb-1"
                style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--gold)' }}
              >
                {stat.n}
              </span>
              <span className="text-[9px] tracking-[0.20em] uppercase" style={{ color: 'var(--taupe-muted)' }}>
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Intro — 2 kolon */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 lg:gap-24 mb-24 items-center">
          <div>
            <span className="gold-line mb-6 block" />
            <h2
              className="font-light leading-tight mb-6"
              style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', color: 'var(--cream)' }}
            >
              Her Eser, Bir <em style={{ color: 'var(--gold)' }}>Hikâye</em>
            </h2>
            <p className="text-[14px] leading-relaxed mb-5" style={{ color: 'var(--taupe)' }}>
              Malkoç Design olarak organik formları, premium malzemeleri ve modern tasarımı bir araya getirerek lüks mekânlar için özgün sanat eserleri üretiyoruz.
            </p>
            <p className="text-[14px] leading-relaxed mb-5" style={{ color: 'var(--taupe)' }}>
              Reçine, metal varak, alçı ve özel pigmentler kullanarak her esere kendine özgü bir karakter kazandırıyoruz.
            </p>
            <p className="text-[14px] leading-relaxed" style={{ color: 'var(--taupe)' }}>
              Duvar panellerimizden dekoratif heykellere, lamba tasarımlarından özel sipariş projelere kadar geniş bir koleksiyon sunuyoruz.
            </p>
          </div>

          {/* Görsel grid */}
          <div className="grid grid-cols-2 gap-2.5">
            {[studyoImages[0], duvarSanatiImages[0], ozelUretimImages[0], studyoImages[2]].map((img, i) => (
              <div key={i} className="relative overflow-hidden" style={{ aspectRatio: '1/1' }}>
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="25vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Üretim süreci */}
        <div id="surec" className="mb-24">
          <div className="text-center mb-14">
            <span
              className="block mb-3 text-gold-gradient"
              style={{ fontFamily: 'var(--font-script)', fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)' }}
            >
              Nasıl Çalışıyoruz
            </span>
            <h2
              className="font-light"
              style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: 'var(--cream)' }}
            >
              Üretim Süreci
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {steps.map((s) => (
              <div
                key={s.n}
                className="flex flex-col gap-4 p-6"
                style={{ border: '1px solid rgba(201,168,76,0.10)', background: 'var(--black-surface)' }}
              >
                <span
                  className="font-light"
                  style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', color: 'var(--gold)', opacity: 0.6 }}
                >
                  {s.n}
                </span>
                <h3
                  className="font-light"
                  style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: 'var(--cream)' }}
                >
                  {s.title}
                </h3>
                <p className="text-[12px] leading-relaxed" style={{ color: 'var(--taupe)' }}>
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-24">
          <div className="text-center mb-14">
            <h2
              className="font-light"
              style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--cream)' }}
            >
              Müşterilerimiz Ne Diyor?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="flex flex-col gap-5 p-7"
                style={{ border: '1px solid rgba(201,168,76,0.10)', background: 'var(--black-surface)' }}
              >
                <span className="text-2xl" style={{ color: 'var(--gold)', opacity: 0.5 }}>"</span>
                <p className="text-[13px] leading-relaxed flex-1" style={{ color: 'var(--taupe)' }}>
                  {t.text}
                </p>
                <div style={{ borderTop: '1px solid rgba(201,168,76,0.08)', paddingTop: '1rem' }}>
                  <p className="text-[13px] font-medium" style={{ color: 'var(--cream)' }}>{t.author}</p>
                  <p className="text-[11px] mt-0.5" style={{ color: 'var(--taupe-muted)' }}>{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/ozel-siparis"
            className="inline-flex items-center gap-2 text-[10px] tracking-[0.26em] uppercase font-semibold text-[#0C0B09] hover:brightness-110 hover:shadow-[0_0_28px_rgba(201,168,76,0.25)] transition-all duration-300"
            style={{ padding: '1rem 3rem', background: 'linear-gradient(135deg, #E8D49A 0%, #C9A84C 50%, #8A6E2C 100%)' }}
          >
            Proje Başlat →
          </Link>
        </div>
      </div>
    </div>
  );
}
