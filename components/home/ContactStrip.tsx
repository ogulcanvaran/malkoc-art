'use client';

import { useState } from 'react';
import Image from 'next/image';
import { images } from '@/lib/images';

const photo = images.find(i => i.category === 'ozel-uretim' && i.featured) ?? images[0];

export function ContactStrip() {
  const [form, setForm]   = useState({ ad: '', soyad: '', telefon: '', mesaj: '' });
  const [sent, setSent]   = useState(false);
  const [error, setError] = useState('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.ad.trim() || !form.soyad.trim() || !form.telefon.trim()) {
      setError('Lütfen tüm alanları doldurun.');
      return;
    }
    setError('');
    setSent(true);
  };

  return (
    <section
      aria-label="İletişim"
      style={{ position: 'relative', background: '#FFFFFF', borderTop: '1px solid var(--border)', minHeight: '440px' }}
    >
      <style>{`
        .contact-photo-bg {
          position: absolute;
          top: 0; bottom: 0;
          left: 50%; right: 0;
          overflow: hidden;
        }
        @media (max-width: 767px) {
          .contact-photo-bg { display: none; }
        }
        .contact-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid var(--border);
          padding: 0.75rem 0;
          font-size: 15px;
          letter-spacing: 0.02em;
          color: var(--text);
          outline: none;
          transition: border-color 0.25s;
        }
        .contact-input::placeholder { color: var(--text-3); font-size: 14px; }
        .contact-input:focus { border-bottom-color: var(--gold); }
        .contact-textarea {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid var(--border);
          padding: 0.75rem 0;
          font-size: 15px;
          letter-spacing: 0.02em;
          color: var(--text);
          outline: none;
          resize: none;
          font-family: inherit;
          transition: border-color 0.25s;
        }
        .contact-textarea::placeholder { color: var(--text-3); font-size: 14px; }
        .contact-textarea:focus { border-bottom-color: var(--gold); }
        .contact-form-inner { max-width: 46%; }
        @media (max-width: 767px) {
          .contact-form-inner { max-width: 100%; }
        }
      `}</style>

      {/* Fotoğraf — sağ yarı, section'a absolute */}
      <div className="contact-photo-bg">
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes="50vw"
          className="object-cover"
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, #FFFFFF 0%, transparent 22%)' }} />
      </div>

      {/* Form — site-container, sol yarı */}
      <div className="site-container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="contact-form-inner" style={{ padding: 'clamp(2.5rem, 6vw, 5rem) 0', display: 'flex', flexDirection: 'column' }}>

          <p style={{ fontSize: '9px', letterSpacing: '0.30em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 700, marginBottom: '0.6rem' }}>
            İletişim
          </p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 300, color: 'var(--text)', lineHeight: 1.15, marginBottom: '0.5rem' }}>
            Projenizi Konuşalım
          </h2>
          <span style={{ fontFamily: 'var(--font-script)', fontSize: 'clamp(1rem, 1.8vw, 1.3rem)', color: 'var(--gold)', display: 'block', marginBottom: 'clamp(1.5rem, 3vw, 2.5rem)' }}>
            size en kısa sürede dönelim
          </span>

          {sent ? (
            <p style={{ fontSize: '13px', color: 'var(--text)', lineHeight: 1.6 }}>
              Teşekkürler, <span style={{ color: 'var(--gold)' }}>{form.ad}</span>. En kısa sürede sizi arayacağız.
            </p>
          ) : (
            <form onSubmit={onSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div>
                  <label style={{ fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 600, display: 'block', marginBottom: '0.25rem' }}>
                    Ad *
                  </label>
                  <input className="contact-input" name="ad" value={form.ad} onChange={onChange} placeholder="Adınız" autoComplete="given-name" />
                </div>
                <div>
                  <label style={{ fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 600, display: 'block', marginBottom: '0.25rem' }}>
                    Soyad *
                  </label>
                  <input className="contact-input" name="soyad" value={form.soyad} onChange={onChange} placeholder="Soyadınız" autoComplete="family-name" />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 600, display: 'block', marginBottom: '0.25rem' }}>
                  Telefon *
                </label>
                <input className="contact-input" name="telefon" type="tel" value={form.telefon} onChange={onChange} placeholder="+90 5__ ___ __ __" autoComplete="tel" />
              </div>

              <div>
                <label style={{ fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 600, display: 'block', marginBottom: '0.25rem' }}>
                  Mesaj
                </label>
                <textarea
                  className="contact-textarea"
                  name="mesaj"
                  value={form.mesaj}
                  onChange={onChange}
                  placeholder="Projeniz hakkında kısaca bilgi verin…"
                  rows={3}
                />
              </div>

              {error && (
                <p style={{ fontSize: '11px', color: '#C9543C', letterSpacing: '0.04em', marginTop: '-0.5rem' }}>{error}</p>
              )}

              <button
                type="submit"
                style={{
                  alignSelf: 'flex-start',
                  padding: '0.5rem 1.3rem',
                  fontSize: '11px',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  color: 'var(--gold)',
                  background: 'var(--bg)',
                  border: '1.5px solid var(--gold)',
                  borderRadius: '999px',
                  cursor: 'pointer',
                  transition: 'all 0.25s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--gold)'; e.currentTarget.style.color = '#0A0908'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'var(--bg)'; e.currentTarget.style.color = 'var(--gold)'; }}
              >
                Gönder
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
