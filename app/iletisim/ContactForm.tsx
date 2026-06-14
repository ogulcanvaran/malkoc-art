'use client';

import { useState } from 'react';

const inputBase = `
  w-full px-4 py-3.5 bg-transparent text-[13px]
  text-[var(--cream)] placeholder:text-[rgba(168,159,140,0.35)]
  outline-none transition-all duration-300
  focus:border-[rgba(201,168,76,0.55)]
`;

export function ContactForm() {
  const [sent, setSent] = useState(false);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">

      {/* Form */}
      {sent ? (
        <div
          className="flex flex-col items-center justify-center text-center py-16"
          style={{ border: '1px solid rgba(201,168,76,0.15)', background: 'var(--black-surface)' }}
        >
          <span className="text-3xl mb-4" style={{ color: 'var(--gold)' }}>✦</span>
          <p
            className="font-light mb-2"
            style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: 'var(--cream)' }}
          >
            Mesajınız Alındı
          </p>
          <p className="text-[13px]" style={{ color: 'var(--taupe)' }}>
            En kısa sürede, genellikle 24 saat içinde, geri dönüş yapacağız.
          </p>
        </div>
      ) : (
        <form
          className="flex flex-col gap-4"
          aria-label="İletişim formu"
          onSubmit={(e) => { e.preventDefault(); setSent(true); }}
        >
          {/* Ad Soyad + E-posta yan yana */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { id: 'name',  label: 'Ad Soyad', type: 'text',  placeholder: 'Adınız Soyadınız', required: true },
              { id: 'email', label: 'E-posta',  type: 'email', placeholder: 'ornek@email.com',  required: true },
            ].map(f => (
              <div key={f.id} className="flex flex-col gap-1.5">
                <label htmlFor={f.id} className="text-[9px] tracking-[0.24em] uppercase" style={{ color: 'var(--gold)' }}>
                  {f.label}
                  {f.required && <span style={{ color: 'rgba(201,168,76,0.50)' }}> *</span>}
                </label>
                <input
                  id={f.id}
                  type={f.type}
                  placeholder={f.placeholder}
                  required={f.required}
                  className={inputBase}
                  style={{ border: '1px solid rgba(201,168,76,0.18)' }}
                />
              </div>
            ))}
          </div>

          {/* Telefon */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="phone" className="text-[9px] tracking-[0.24em] uppercase" style={{ color: 'var(--gold)' }}>
              Telefon
            </label>
            <input
              id="phone"
              type="tel"
              placeholder="+90 5XX XXX XX XX"
              className={inputBase}
              style={{ border: '1px solid rgba(201,168,76,0.18)' }}
            />
          </div>

          {/* Konu */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="konu" className="text-[9px] tracking-[0.24em] uppercase" style={{ color: 'var(--gold)' }}>
              Konu
            </label>
            <select
              id="konu"
              className={inputBase + ' cursor-pointer'}
              style={{ border: '1px solid rgba(201,168,76,0.18)', appearance: 'none' }}
            >
              <option value="" style={{ background: '#141210' }}>Seçiniz...</option>
              <option value="koleksiyon" style={{ background: '#141210' }}>Koleksiyon Hakkında</option>
              <option value="ozel-siparis" style={{ background: '#141210' }}>Özel Sipariş</option>
              <option value="kurumsal" style={{ background: '#141210' }}>Kurumsal Proje</option>
              <option value="fiyat" style={{ background: '#141210' }}>Fiyat Teklifi</option>
              <option value="diger" style={{ background: '#141210' }}>Diğer</option>
            </select>
          </div>

          {/* Mesaj */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="message" className="text-[9px] tracking-[0.24em] uppercase" style={{ color: 'var(--gold)' }}>
              Mesajınız <span style={{ color: 'rgba(201,168,76,0.50)' }}>*</span>
            </label>
            <textarea
              id="message"
              rows={5}
              required
              placeholder="Projenizi veya sorunuzu kısaca anlatın..."
              className={inputBase + ' resize-none'}
              style={{ border: '1px solid rgba(201,168,76,0.18)' }}
            />
          </div>

          <button
            type="submit"
            className="mt-2 py-4 text-[10px] tracking-[0.26em] uppercase font-semibold text-[#0C0B09] hover:brightness-110 hover:shadow-[0_0_28px_rgba(201,168,76,0.25)] transition-all duration-300"
            style={{ background: 'linear-gradient(135deg, #E8D49A 0%, #C9A84C 50%, #8A6E2C 100%)' }}
          >
            Gönder →
          </button>
        </form>
      )}

      {/* Sağ taraf — iletişim bilgileri */}
      <div className="flex flex-col gap-8 pt-2">
        {[
          {
            label: 'Telefon',
            value: '+90 500 000 00 00',
            href:  'tel:+905000000000',
            icon:  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>,
          },
          {
            label: 'E-posta',
            value: 'info@malkocdizayn.com',
            href:  'mailto:info@malkocdizayn.com',
            icon:  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>,
          },
          {
            label: 'WhatsApp',
            value: '+90 500 000 00 00',
            href:  'https://wa.me/905000000000?text=Merhaba%2C%20bilgi%20almak%20istiyorum.',
            icon:  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.119.554 4.107 1.523 5.832L.057 23.522a.5.5 0 00.611.625l5.797-1.522A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.667-.524-5.188-1.437l-.372-.22-3.847 1.01 1.029-3.745-.242-.386A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>,
          },
          {
            label: 'Instagram',
            value: '@busemalkocart',
            href:  'https://instagram.com/busemalkocart',
            icon:  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" /></svg>,
          },
        ].map(item => (
          <div key={item.label}>
            <p className="text-[9px] tracking-[0.24em] uppercase mb-2" style={{ color: 'var(--gold)' }}>
              {item.label}
            </p>
            <a
              href={item.href}
              target={item.href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 text-[14px] transition-colors duration-200 hover:text-[#C9A84C]"
              style={{ color: 'var(--taupe)', fontFamily: 'var(--font-display)' }}
            >
              <span style={{ color: 'var(--gold)', flexShrink: 0 }}>{item.icon}</span>
              {item.value}
            </a>
          </div>
        ))}

        {/* Yanıt süresi */}
        <div
          className="p-6 mt-4"
          style={{ border: '1px solid rgba(201,168,76,0.10)', background: 'var(--black-surface)' }}
        >
          <p className="text-[9px] tracking-[0.22em] uppercase mb-2" style={{ color: 'var(--gold)' }}>
            Yanıt Süresi
          </p>
          <p className="text-[13px] leading-relaxed" style={{ color: 'var(--taupe)' }}>
            Özel sipariş ve kurumsal projeler için genellikle{' '}
            <strong style={{ color: 'var(--cream)' }}>24 saat</strong> içinde geri dönüş yapıyoruz.
            WhatsApp üzerinden daha hızlı yanıt alabilirsiniz.
          </p>
        </div>

        {/* Konum */}
        <div>
          <p className="text-[9px] tracking-[0.24em] uppercase mb-2" style={{ color: 'var(--gold)' }}>
            Konum
          </p>
          <p className="text-[14px]" style={{ color: 'var(--taupe)', fontFamily: 'var(--font-display)' }}>
            İstanbul, Türkiye
          </p>
          <p className="text-[11px] mt-1" style={{ color: 'rgba(168,159,140,0.45)' }}>
            Atölye ziyaretleri randevu ile gerçekleşmektedir.
          </p>
        </div>
      </div>
    </div>
  );
}
