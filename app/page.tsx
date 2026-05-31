import type { Metadata } from 'next';
import { Hero } from '@/components/Hero';
import { FeaturedWorks } from '@/components/home/FeaturedWorks';
import { Categories } from '@/components/home/Categories';
import { StudioTeaser } from '@/components/home/StudioTeaser';
import { BespokeSection } from '@/components/home/BespokeSection';

export const metadata: Metadata = {
  title: 'Malkoç Dizayn | Lüks Duvar Sanatı ve Özgün Heykel',
  alternates: { canonical: 'https://malkocdizayn.com' },
};

export default function HomePage() {
  return (
    <main>
      {/* Hero — fullscreen shader, kendi h-screen'i var */}
      <Hero />

      {/* Öne çıkan eserler */}
      <FeaturedWorks />

      {/* Kategori grid */}
      <Categories />

      {/* Stüdyo teaser */}
      <StudioTeaser />

      {/* Özel sipariş CTA */}
      <BespokeSection />

      {/* Footer ayırıcı — gold çizgi + boşluk */}
      <div className="border-t-[3px] border-[#C9A84C] mt-0 h-16" />
    </main>
  );
}
