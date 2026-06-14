'use client';

import { useState } from 'react';

export function NewsletterBanner() {
  const [email, setEmail] = useState('');
  const [sent,  setSent]  = useState(false);

  return (
    <section
      aria-label="Bülten"
      style={{
        background:   'linear-gradient(135deg, #181409 0%, #0E0D0B 50%, #141109 100%)',
        borderTop:    '1px solid rgba(201,168,76,0.15)',
        borderBottom: '1px solid rgba(201,168,76,0.15)',
        paddingBlock: 'clamp(4rem, 7vw, 7rem)',
      }}
    >
      <div className="site-container flex flex-col md:flex-row items-center justify-between gap-10">

        <div className="text-center md:text-left max-w-lg">
          <span
            className="block mb-3 text-gold-gradient"
            style={{ fontFamily: 'var(--font-script)', fontSize: 'clamp(1.4rem, 2.5vw, 1.8rem)' }}
          >
            Koleksiyondan Haberdar Olun
          </span>
          <h2
            className="font-light mb-3"
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', color: '#F5F0E8' }}
          >
            Yeni eserlerden ilk siz haberdar olun
          </h2>
          <p className="text-[13px] leading-relaxed" style={{ color: '#A89F8C' }}>
            Koleksiyon güncellemeleri, özel davetler ve lansmanlar için bültenimize katılın.
          </p>
        </div>

        {sent ? (
          <p
            className="font-light"
            style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--gold)' }}
          >
            Teşekkürler, sizi haberdar edeceğiz. ✦
          </p>
        ) : (
          <form
            onSubmit={(e) => { e.preventDefault(); if (email) setSent(true); }}
            className="flex w-full md:w-auto"
            style={{ minWidth: 'min(340px, 100%)' }}
            aria-label="Bülten formu"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-posta adresiniz"
              required
              aria-label="E-posta adresi"
              className="flex-1 px-5 py-4 text-[13px] bg-transparent outline-none placeholder:opacity-30 focus:border-[rgba(201,168,76,0.55)] transition-colors"
              style={{
                border:      '1px solid rgba(201,168,76,0.25)',
                borderRight: 'none',
                color:       '#F5F0E8',
              }}
            />
            <button
              type="submit"
              className="px-7 py-4 text-[9px] tracking-[0.24em] uppercase font-semibold whitespace-nowrap text-[#0C0B09] hover:brightness-110 transition-all duration-300"
              style={{ background: 'linear-gradient(135deg, #E8D49A 0%, #C9A84C 50%, #8A6E2C 100%)' }}
            >
              Katıl
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
