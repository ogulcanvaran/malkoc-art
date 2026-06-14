import type { Metadata } from 'next';
import { FeaturedWorks }   from '@/components/home/FeaturedWorks';
import { Categories }      from '@/components/home/Categories';
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
      <FeaturedWorks />
      <Categories />
      <StudioTeaser />
      <BespokeSection />
      <NewsletterBanner />
    </>
  );
}
