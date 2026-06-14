'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export function StickyCtaBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className={`
        fixed bottom-0 left-0 right-0 z-40 md:hidden
        transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
        ${visible ? 'translate-y-0' : 'translate-y-full'}
      `}
      style={{ background: '#0C0B09', borderTop: '1px solid rgba(201,168,76,0.20)' }}
    >
      <div className="flex items-stretch h-16">
        <Link
          href="/ozel-siparis"
          className="flex-1 flex items-center justify-center text-[10px] tracking-[0.22em] uppercase font-semibold text-[#0C0B09]"
          style={{ background: 'linear-gradient(135deg, #E8D49A 0%, #C9A84C 50%, #8A6E2C 100%)' }}
        >
          Teklif Al
        </Link>
        <a
          href="https://wa.me/905000000000?text=Merhaba%2C%20bilgi%20almak%20istiyorum."
          target="_blank"
          rel="noopener noreferrer"
          className="w-16 flex items-center justify-center"
          style={{ background: '#1A1814', borderLeft: '1px solid rgba(201,168,76,0.15)' }}
          aria-label="WhatsApp"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#25D366">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.119.554 4.107 1.523 5.832L.057 23.522a.5.5 0 00.611.625l5.797-1.522A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.667-.524-5.188-1.437l-.372-.22-3.847 1.01 1.029-3.745-.242-.386A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
          </svg>
        </a>
        <Link
          href="/iletisim"
          className="w-16 flex items-center justify-center text-[9px] tracking-[0.15em] uppercase"
          style={{ color: 'var(--taupe)', borderLeft: '1px solid rgba(201,168,76,0.15)' }}
        >
          <span className="flex flex-col items-center gap-0.5">
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
            Mail
          </span>
        </Link>
      </div>
    </div>
  );
}
