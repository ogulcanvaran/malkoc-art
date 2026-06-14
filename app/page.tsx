import type { Metadata } from 'next';
import { CollectionStories }  from '@/components/home/CollectionStories';
import { ProductShowcase }  from '@/components/home/ProductShowcase';
import { PhotoStrip }      from '@/components/home/PhotoStrip';

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
      <ProductShowcase />
      <PhotoStrip />
    </>
  );
}
