import type { Metadata } from 'next';
import { CollectionStories }  from '@/components/home/CollectionStories';
import { FeaturedWorks }    from '@/components/home/FeaturedWorks';
import { ProductShowcase }  from '@/components/home/ProductShowcase';
import { Categories }      from '@/components/home/Categories';
import { PhotoStrip }      from '@/components/home/PhotoStrip';
import { StudioTeaser }    from '@/components/home/StudioTeaser';
import { BespokeSection }  from '@/components/home/BespokeSection';
import { NewsletterBanner } from '@/components/NewsletterBanner';

export const metadata: Metadata = {
  title: 'Malkoç Design | İstanbul Lüks Duvar Sanatı & Özel Üretim',
  description:
    'El yapımı lüks duvar sanatı, özgün heykeller ve premium dekoratif tasarım. İstanbul\'da kurumsal ve bireysel projeler için özel üretim sanat eserleri.',
  alternates: { canonical: 'https://malkocdizayn.com' },
};

export default function Home() {
  return (
    <>
      <CollectionStories />
      <FeaturedWorks />
      <ProductShowcase />
      <Categories />
      <PhotoStrip />
      <StudioTeaser />
      <BespokeSection />
      <NewsletterBanner />
    </>
  );
}
