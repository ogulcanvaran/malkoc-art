'use client';

import { useState } from 'react';

export function NewsletterBanner() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSent(true);
  };

  return (
    <section
      aria-label="Bülten"
      className="w-full py-20 border-t-[3px] border-b-[3px] border-[#C9A84C]"
      style={{
        background: 'linear-gradient(135deg, #1a1508 0%, #0f0e0a 40%, #12100a 100%)',
      }}
    >
      <div className="site-container flex flex-col md:flex-row items-center justify-between gap-10">

        {/* Text */}
        <div className="text-center md:text-left">
          <span
            className="block mb-2"
            style={{
              fontFamily: 'var(--font-great-vibes), cursive',
              fontSize: 'clamp(1.4rem, 2.5vw, 1.8rem)',
              color: 'var(--gold)',
            }}
          >
            Koleksiyondan Haberdar Olun
          </span>
          <h2
            className="text-2xl md:text-3xl font-light mb-2"
            style={{ fontFamily: 'var(--font-cormorant)', color: 'var(--white)' }}
          >
            Yeni eserlerden ilk siz haberdar olun
          </h2>
          <p className="text-[13px] leading-relaxed" style={{ color: 'var(--white-muted)' }}>
            Koleksiyon güncellemeleri, özel davetler ve lansman haberleri için bültenimize katılın.
          </p>
        </div>

        {/* Form */}
        {sent ? (
          <div className="text-center md:text-left">
            <p
              className="text-lg font-light"
              style={{ fontFamily: 'var(--font-cormorant)', color: 'var(--gold)' }}
            >
              Teşekkürler, sizi haberdar edeceğiz.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex w-full md:w-auto min-w-[340px]"
            aria-label="Bülten formu"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-posta adresiniz"
              required
              aria-label="E-posta adresi"
              className="flex-1 px-5 py-4 text-[13px] bg-transparent outline-none placeholder:opacity-40"
              style={{
                border: '1px solid rgba(201,168,76,0.35)',
                borderRight: 'none',
                color: 'var(--white)',
              }}
            />
            <button
              type="submit"
              className="px-7 py-4 text-[10px] tracking-[0.20em] uppercase font-medium transition-colors duration-300 hover:bg-[#9A7A30] whitespace-nowrap"
              style={{ background: 'var(--gold)', color: 'var(--black)' }}
            >
              Katıl
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
