'use client';

import { useState } from 'react';

const faqs = [
  {
    q: 'Eserler tamamen el yapımı mı?',
    a: 'Evet, atölyemizdeki tüm eserler hammaddeden son rötuşa kadar ustalarımız tarafından elle üretilmektedir. Seri üretim kullanmıyoruz.',
  },
  {
    q: 'Özel ölçü ve renkte üretim yapıyor musunuz?',
    a: 'Evet. Mekânınıza özel boyut, renk paleti ve form tasarlıyoruz. Bunun için önce ücretsiz bir danışma görüşmesi yapıyoruz.',
  },
  {
    q: 'Üretim süreci ne kadar sürer?',
    a: 'Standart koleksiyon eserleri için 2–3 hafta, özel üretim projeler için ise kapsama bağlı olarak 4–8 hafta arasında değişmektedir.',
  },
  {
    q: 'Türkiye genelinde teslimat yapıyor musunuz?',
    a: 'Evet, tüm Türkiye\'ye güvenli paketleme ile kargo yapıyoruz. İstanbul içi siparişlerde kurulum desteği de sunulmaktadır.',
  },
  {
    q: 'Fiyatlar nasıl belirleniyor?',
    a: 'Fiyatlar; kullanılan malzeme, boyut ve işçilik süresine göre değişir. Özel projeler için formu doldurmanız yeterli, size özel teklif hazırlıyoruz.',
  },
  {
    q: 'Hangi malzemeler kullanılıyor?',
    a: 'Reçine, metal varak, alçı, pigment, akrilik boya ve doğal mineraller başta olmak üzere her esere özel seçilmiş malzemeler kullanıyoruz.',
  },
  {
    q: 'Kurumsal projeler için çalışıyor musunuz?',
    a: 'Evet, otel, ofis, restoran ve ticari mekânlar için büyük ölçekli özel üretim projeler gerçekleştiriyoruz.',
  },
  {
    q: 'Eserlerin bakımı nasıl yapılmalı?',
    a: 'Kuru ve nemden uzak tutulması yeterlidir. Yüzey temizliği için yalnızca kuru veya hafif nemli bez kullanılmasını öneririz.',
  },
  {
    q: 'Numune veya katalog gönderimi yapıyor musunuz?',
    a: 'Malzeme ve renk numunesi talep edebilirsiniz. Dijital katalog için iletişim formunu doldurmanız yeterli.',
  },
  {
    q: 'İade ve değişim koşullarınız nelerdir?',
    a: 'Standart koleksiyon ürünleri 14 gün içinde iade edilebilir. Özel üretim siparişler kişiselleştirildiği için iade kapsamı dışındadır.',
  },
];

function FAQItem({ faq, idx, open, setOpen }: {
  faq: { q: string; a: string };
  idx: number;
  open: number | null;
  setOpen: (i: number | null) => void;
}) {
  const isOpen = open === idx;
  return (
    <li style={{ borderBottom: '1px solid var(--border)' }}>
      <button
        onClick={() => setOpen(isOpen ? null : idx)}
        aria-expanded={isOpen}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          padding: '1.1rem 0',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
        }}
      >
        <span style={{ fontSize: '13px', letterSpacing: '0.02em', color: isOpen ? 'var(--gold)' : 'var(--text)', fontWeight: 500, transition: 'color 0.2s', lineHeight: 1.4 }}>
          {faq.q}
        </span>
        <span style={{
          flexShrink: 0,
          width: '20px', height: '20px',
          borderRadius: '50%',
          border: '1px solid var(--gold)',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'transform 0.25s',
          transform: isOpen ? 'rotate(45deg)' : 'none',
        }}>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="5" y1="0" x2="5" y2="10" stroke="var(--gold)" strokeWidth="1.2" strokeLinecap="round"/>
            <line x1="0" y1="5" x2="10" y2="5" stroke="var(--gold)" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
        </span>
      </button>

      <div style={{
        overflow: 'hidden',
        maxHeight: isOpen ? '200px' : '0',
        transition: 'max-height 0.35s cubic-bezier(0.16,1,0.3,1)',
      }}>
        <p style={{ fontSize: '13px', lineHeight: 1.75, color: 'var(--text-2)', paddingBottom: '1.1rem', letterSpacing: '0.02em' }}>
          {faq.a}
        </p>
      </div>
    </li>
  );
}

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  const left  = faqs.slice(0, 5);
  const right = faqs.slice(5, 10);

  return (
    <section aria-label="Sıkça Sorulan Sorular" style={{ background: 'var(--bg)', borderTop: '1px solid var(--border)', padding: 'clamp(3rem, 7vw, 6rem) 0' }}>
      <style>{`
        .faq-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0 clamp(2rem, 5vw, 5rem);
        }
        @media (max-width: 767px) {
          .faq-grid { grid-template-columns: 1fr; }
        }
      `}</style>
      <div className="site-container">
        {/* Başlık */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 4vw, 3.5rem)' }}>
          <p style={{ fontSize: '9px', letterSpacing: '0.30em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 700, marginBottom: '0.6rem' }}>
            SSS
          </p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 300, color: 'var(--text)', lineHeight: 1.2 }}>
            Sıkça Sorulan Sorular
          </h2>
        </div>

        <div className="faq-grid">
          <ul style={{ display: 'flex', flexDirection: 'column' }}>
            {left.map((faq, i) => (
              <FAQItem key={i} faq={faq} idx={i} open={open} setOpen={setOpen} />
            ))}
          </ul>
          <ul style={{ display: 'flex', flexDirection: 'column' }}>
            {right.map((faq, i) => (
              <FAQItem key={i + 5} faq={faq} idx={i + 5} open={open} setOpen={setOpen} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
