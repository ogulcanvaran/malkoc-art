'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Scene } from './Scene';

const ease = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0 },
};

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-[#050505]"
    >
      {/* WebGL canvas — fills entire viewport */}
      <Scene />

      {/* içerik geçici olarak gizlendi */}
    </section>
  );
}

/* ── Primitive sub-components ────────────────────────────────────────── */

function Button({
  children,
  primary = false,
}: {
  children: React.ReactNode;
  primary?: boolean;
}) {
  if (primary) {
    return (
      <button
        className="relative px-8 py-3.5 text-sm font-medium tracking-wider uppercase transition-all duration-300 group overflow-hidden"
        style={{
          background: 'rgba(255,255,255,0.94)',
          color: '#0a0a0a',
          borderRadius: '2px',
          letterSpacing: '0.1em',
        }}
      >
        <span className="relative z-10">{children}</span>
        <span
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: 'rgba(255,255,255,1)' }}
        />
      </button>
    );
  }

  return (
    <button
      className="px-8 py-3.5 text-sm font-medium tracking-wider uppercase transition-all duration-300"
      style={{
        background: 'transparent',
        color: 'rgba(255,255,255,0.6)',
        border: '1px solid rgba(255,255,255,0.14)',
        borderRadius: '2px',
        letterSpacing: '0.1em',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.borderColor =
          'rgba(255,255,255,0.38)';
        (e.currentTarget as HTMLButtonElement).style.color =
          'rgba(255,255,255,0.88)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.borderColor =
          'rgba(255,255,255,0.14)';
        (e.currentTarget as HTMLButtonElement).style.color =
          'rgba(255,255,255,0.6)';
      }}
    >
      {children}
    </button>
  );
}

function ScrollLine() {
  return (
    <div
      className="w-px overflow-hidden"
      style={{ height: '40px', background: 'rgba(255,255,255,0.08)' }}
    >
      <motion.div
        className="w-full"
        style={{ height: '40px', background: 'rgba(255,255,255,0.3)' }}
        animate={{ y: ['-100%', '100%'] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  );
}
