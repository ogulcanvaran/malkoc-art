'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { images } from '@/lib/images';

/* Dikey fotoğraflar için en uygun görseller */
const stripImages = [
  images[0], images[2], images[4], images[6],
  images[8], images[9], images[10], images[12],
  images[14], images[16], images[18], images[20],
].filter(Boolean);

const ITEM_WIDTH  = 220; // px
const ITEM_GAP    = 12;  // px
const SPEED       = 0.4; // px per frame — çok yavaş

export function PhotoStrip() {
  const trackRef   = useRef<HTMLDivElement>(null);
  const rafRef     = useRef<number>(0);
  const posRef     = useRef(0);          // current translate X (negative = left)
  const dragRef    = useRef({ active: false, startX: 0, startPos: 0 });
  const pauseRef   = useRef(false);
  const [, forceRender] = useState(0);

  const totalW = (ITEM_WIDTH + ITEM_GAP) * stripImages.length;

  /* Auto-scroll loop */
  useEffect(() => {
    const tick = () => {
      if (!pauseRef.current) {
        posRef.current -= SPEED;
        if (Math.abs(posRef.current) >= totalW) posRef.current = 0;
        if (trackRef.current)
          trackRef.current.style.transform = `translateX(${posRef.current}px)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [totalW]);

  /* --- Mouse drag --- */
  const onMouseDown = (e: React.MouseEvent) => {
    pauseRef.current = true;
    dragRef.current  = { active: true, startX: e.clientX, startPos: posRef.current };
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragRef.current.active) return;
    const delta = e.clientX - dragRef.current.startX;
    posRef.current = dragRef.current.startPos + delta;
    if (trackRef.current)
      trackRef.current.style.transform = `translateX(${posRef.current}px)`;
  };

  const onMouseUp = () => {
    dragRef.current.active = false;
    pauseRef.current = false;
  };

  /* --- Touch drag --- */
  const onTouchStart = (e: React.TouchEvent) => {
    pauseRef.current = true;
    dragRef.current  = { active: true, startX: e.touches[0].clientX, startPos: posRef.current };
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!dragRef.current.active) return;
    const delta = e.touches[0].clientX - dragRef.current.startX;
    posRef.current = dragRef.current.startPos + delta;
    if (trackRef.current)
      trackRef.current.style.transform = `translateX(${posRef.current}px)`;
  };

  const onTouchEnd = () => {
    dragRef.current.active = false;
    pauseRef.current = false;
  };

  /* Doubled for seamless loop */
  const doubled = [...stripImages, ...stripImages];

  return (
    <section
      aria-label="Eser galerisi"
      style={{ paddingBlock: 'clamp(4rem, 7vw, 7rem)', background: 'var(--bg-surface)' }}
    >
      {/* Header */}
      <div className="site-container text-center mb-10">
        <span
          className="block mb-3 text-gold-gradient"
          style={{ fontFamily: 'var(--font-script)', fontSize: 'clamp(1.4rem, 2vw, 1.8rem)' }}
        >
          Atölyeden
        </span>
        <h2
          className="font-light mb-4"
          style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: 'var(--text)' }}
        >
          Her Eser Bir Hikâye
        </h2>
        <span className="gold-line" style={{ margin: '0 auto' }} />
      </div>

      {/* Slider */}
      <div className="relative">
        {/* Sol fade */}
        <div className="absolute left-0 top-0 bottom-0 z-10 pointer-events-none" style={{ width: 'clamp(30px, 8vw, 160px)', background: 'linear-gradient(to right, var(--bg-surface) 0%, transparent 100%)' }} />
        {/* Sağ fade */}
        <div className="absolute right-0 top-0 bottom-0 z-10 pointer-events-none" style={{ width: 'clamp(30px, 8vw, 160px)', background: 'linear-gradient(to left, var(--bg-surface) 0%, transparent 100%)' }} />

      <div
        className="overflow-hidden select-none"
        style={{ cursor: 'grab' }}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div
        ref={trackRef}
        className="flex will-change-transform"
        style={{ gap: `${ITEM_GAP}px`, width: 'max-content' }}
      >
        {doubled.map((img, i) => (
          <div
            key={i}
            className="relative flex-shrink-0 overflow-hidden"
            style={{ width: `${ITEM_WIDTH}px`, aspectRatio: '2/3' }}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="220px"
              className="object-cover pointer-events-none"
              draggable={false}
            />
          </div>
        ))}
      </div>
      </div>
      </div>

      {/* Footer desc */}
      <div style={{ textAlign: 'center', marginTop: '2.5rem', paddingInline: 'clamp(1.25rem, 5vw, 5rem)' }}>
        <p
          style={{ color: 'var(--text-2)', fontSize: '14px', lineHeight: 1.8, maxWidth: '560px', margin: '0 auto' }}
        >
          Reçine, metal varak, alçı ve özel pigmentlerle el emeğiyle üretilen her eser;<br className="hidden sm:block" />
          mekânınıza özgün bir kimlik katmak için tasarlanır.
        </p>
      </div>
    </section>
  );
}
