'use client';

import { useState } from 'react';

const inputBase = `
  w-full px-4 py-3.5 bg-transparent text-[13px]
  text-[var(--cream)] placeholder:text-[rgba(168,159,140,0.35)]
  outline-none transition-all duration-300
  focus:border-[rgba(201,168,76,0.55)]
`;

const eserTipleri = [
  { label: 'Duvar Sanatı',   value: 'duvar-sanati' },
  { label: 'Heykel',         value: 'heykel' },
  { label: 'Dekoratif Lamba',value: 'lamba' },
  { label: 'Büyük Format',   value: 'buyuk-format' },
  { label: 'Çoklu Parça',    value: 'coklu-parca' },
  { label: 'Diğer',          value: 'diger' },
];

const mekanTipleri = [
  { label: 'Konut',          value: 'konut' },
  { label: 'Ofis / Kurumsal',value: 'kurumsal' },
  { label: 'Otel',           value: 'otel' },
  { label: 'Restoran',       value: 'restoran' },
  { label: 'Showroom',       value: 'showroom' },
  { label: 'Diğer',          value: 'diger' },
];

export function BespokeForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div
        className="flex flex-col items-center justify-center text-center py-20"
        style={{ border: '1px solid rgba(201,168,76,0.15)', background: 'var(--black-surface)' }}
      >
        <span className="text-4xl mb-5" style={{ color: 'var(--gold)' }}>✦</span>
        <p
          className="font-light mb-3"
          style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--cream)' }}
        >
          Talebiniz Alındı
        </p>
        <p className="text-[14px] max-w-md" style={{ color: 'var(--taupe)' }}>
          24 saat içinde projeniz hakkında sizinle iletişime geçeceğiz.
          WhatsApp üzerinden daha hızlı yanıt alabilirsiniz.
        </p>
        <a
          href="https://wa.me/905000000000?text=Merhaba%2C%20%C3%B6zel%20sipari%C5%9F%20talebim%20var."
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 text-[10px] tracking-[0.22em] uppercase transition-colors hover:text-[#C9A84C]"
          style={{ color: 'var(--taupe)', border: '1px solid rgba(201,168,76,0.20)', padding: '0.85rem 2rem' }}
        >
          WhatsApp ile Takip Edin
        </a>
      </div>
    );
  }

  return (
    <form
      className="flex flex-col gap-5"
      aria-label="Özel sipariş formu"
      onSubmit={(e) => { e.preventDefault(); setSent(true); }}
    >
      {/* Ad + E-posta */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          { id: 'name',  label: 'Ad Soyad', type: 'text',  placeholder: 'Adınız Soyadınız', req: true },
          { id: 'email', label: 'E-posta',  type: 'email', placeholder: 'ornek@email.com',  req: true },
        ].map(f => (
          <div key={f.id} className="flex flex-col gap-1.5">
            <label htmlFor={f.id} className="text-[9px] tracking-[0.24em] uppercase" style={{ color: 'var(--gold)' }}>
              {f.label} {f.req && <span style={{ color: 'rgba(201,168,76,0.50)' }}>*</span>}
            </label>
            <input
              id={f.id} type={f.type} placeholder={f.placeholder} required={f.req}
              className={inputBase}
              style={{ border: '1px solid rgba(201,168,76,0.18)' }}
            />
          </div>
        ))}
      </div>

      {/* Telefon + Şehir */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          { id: 'phone', label: 'Telefon',  type: 'tel',  placeholder: '+90 5XX XXX XX XX', req: true },
          { id: 'city',  label: 'Şehir',    type: 'text', placeholder: 'İstanbul',           req: false },
        ].map(f => (
          <div key={f.id} className="flex flex-col gap-1.5">
            <label htmlFor={f.id} className="text-[9px] tracking-[0.24em] uppercase" style={{ color: 'var(--gold)' }}>
              {f.label} {f.req && <span style={{ color: 'rgba(201,168,76,0.50)' }}>*</span>}
            </label>
            <input
              id={f.id} type={f.type} placeholder={f.placeholder} required={f.req}
              className={inputBase}
              style={{ border: '1px solid rgba(201,168,76,0.18)' }}
            />
          </div>
        ))}
      </div>

      {/* Eser türü + Mekân tipi */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          { id: 'eser-tipi', label: 'Eser Türü',  opts: eserTipleri },
          { id: 'mekan-tipi', label: 'Mekân Tipi', opts: mekanTipleri },
        ].map(f => (
          <div key={f.id} className="flex flex-col gap-1.5">
            <label htmlFor={f.id} className="text-[9px] tracking-[0.24em] uppercase" style={{ color: 'var(--gold)' }}>
              {f.label}
            </label>
            <select
              id={f.id}
              className={inputBase + ' cursor-pointer'}
              style={{ border: '1px solid rgba(201,168,76,0.18)', appearance: 'none' }}
            >
              <option value="" style={{ background: '#141210' }}>Seçiniz...</option>
              {f.opts.map(o => <option key={o.value} value={o.value} style={{ background: '#141210' }}>{o.label}</option>)}
            </select>
          </div>
        ))}
      </div>

      {/* Boyut + Bütçe */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          { id: 'size',   label: 'Tahmini Boyut', placeholder: 'ör. 100 × 80 cm' },
          { id: 'budget', label: 'Bütçe Aralığı', placeholder: 'ör. 5.000 – 20.000 ₺' },
        ].map(f => (
          <div key={f.id} className="flex flex-col gap-1.5">
            <label htmlFor={f.id} className="text-[9px] tracking-[0.24em] uppercase" style={{ color: 'var(--gold)' }}>
              {f.label}
            </label>
            <input
              id={f.id} type="text" placeholder={f.placeholder}
              className={inputBase}
              style={{ border: '1px solid rgba(201,168,76,0.18)' }}
            />
          </div>
        ))}
      </div>

      {/* Proje açıklaması */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="desc" className="text-[9px] tracking-[0.24em] uppercase" style={{ color: 'var(--gold)' }}>
          Projeyi Anlatın <span style={{ color: 'rgba(201,168,76,0.50)' }}>*</span>
        </label>
        <textarea
          id="desc"
          rows={6}
          required
          placeholder="Mekânınız, renk tercihiniz, stil ve varsa referans görseller..."
          className={inputBase + ' resize-none'}
          style={{ border: '1px solid rgba(201,168,76,0.18)' }}
        />
      </div>

      <button
        type="submit"
        className="py-4 text-[10px] tracking-[0.26em] uppercase font-semibold text-[#0C0B09] hover:brightness-110 hover:shadow-[0_0_28px_rgba(201,168,76,0.25)] transition-all duration-300 mt-2"
        style={{ background: 'linear-gradient(135deg, #E8D49A 0%, #C9A84C 50%, #8A6E2C 100%)' }}
      >
        Projeyi Gönder →
      </button>

      <p className="text-[11px] text-center" style={{ color: 'var(--taupe-muted)' }}>
        Veya doğrudan{' '}
        <a
          href="https://wa.me/905000000000?text=Merhaba%2C%20%C3%B6zel%20sipari%C5%9F%20teklifi%20almak%20istiyorum."
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-[#C9A84C] transition-colors"
          style={{ color: 'var(--gold)' }}
        >
          WhatsApp ile yazın
        </a>
      </p>
    </form>
  );
}
