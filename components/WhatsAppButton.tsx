'use client';

import { useState, useEffect } from 'react';

const WA_NUMBER = '905000000000';

export function WhatsAppButton() {
  const [visible, setVisible] = useState(false);
  const [pulse,   setPulse]   = useState(false);

  useEffect(() => {
    const show = () => setVisible(window.scrollY > 200);
    window.addEventListener('scroll', show, { passive: true });
    show();

    const t = setTimeout(() => setPulse(true), 3000);
    const t2 = setInterval(() => {
      setPulse(true);
      setTimeout(() => setPulse(false), 1500);
    }, 8000);

    return () => {
      window.removeEventListener('scroll', show);
      clearTimeout(t);
      clearInterval(t2);
    };
  }, []);

  return (
    <a
      href={`https://wa.me/${WA_NUMBER}?text=Merhaba%2C%20Malko%C3%A7%20Design%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum.`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp ile iletişime geçin"
      className={`
        hidden md:flex fixed bottom-6 right-6 z-50
        flex items-center gap-2
        h-14 rounded-full
        bg-[#25D366] text-white
        shadow-[0_4px_24px_rgba(37,211,102,0.40)]
        transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
        hover:shadow-[0_4px_32px_rgba(37,211,102,0.60)]
        hover:scale-105
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}
      `}
      style={{ paddingInline: '1.25rem' }}
    >
      {/* Pulse ring */}
      {pulse && (
        <span
          className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30"
          style={{ animationDuration: '1.2s' }}
        />
      )}

      {/* WA Icon */}
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="flex-shrink-0">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.119.554 4.107 1.523 5.832L.057 23.522a.5.5 0 00.611.625l5.797-1.522A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.667-.524-5.188-1.437l-.372-.22-3.847 1.01 1.029-3.745-.242-.386A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
      </svg>

      <span className="text-[11px] font-semibold tracking-[0.10em] uppercase whitespace-nowrap">
        WhatsApp
      </span>
    </a>
  );
}
