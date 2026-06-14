import type { Metadata } from 'next';
import { CollectionStories }  from '@/components/home/CollectionStories';
import { ProductShowcase }  from '@/components/home/ProductShowcase';
import { PhotoStrip }      from '@/components/home/PhotoStrip';
import { ContactStrip }    from '@/components/home/ContactStrip';
import { FAQ }             from '@/components/home/FAQ';
import { SpaceGallery }   from '@/components/home/SpaceGallery';
import { TrustStats }       from '@/components/home/TrustStats';
import { ProcessTimeline }  from '@/components/home/ProcessTimeline';
import { Manifesto }        from '@/components/home/Manifesto';

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
      <Manifesto />
      <ProductShowcase />
      <PhotoStrip />
      <ProcessTimeline />
      <SpaceGallery />
      <TrustStats />
      <FAQ />
      <ContactStrip />
    </>
  );
}
