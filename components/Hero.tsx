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

      {/* Gradient vignette overlay — keeps text legible */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 50%, transparent 20%, rgba(5,5,5,0.55) 100%)',
        }}
      />

      {/* Hero content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.18, delayChildren: 0.3 } },
          }}
          className="flex flex-col items-center gap-6 max-w-5xl w-full"
        >
          {/* Eyebrow label */}
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.9, ease }}
            className="text-[11px] tracking-[0.28em] uppercase font-medium"
            style={{ color: 'rgba(255,255,255,0.38)' }}
          >
            Digital Agency
          </motion.p>

          {/* Main headline */}
          <motion.h1
            variants={fadeUp}
            transition={{ duration: 1.1, ease }}
            className="font-bold leading-[1.05] tracking-[-0.03em] select-none"
            style={{
              fontSize: 'clamp(2.6rem, 6.5vw, 5.6rem)',
              color: '#FFFFFF',
              textShadow: '0 0 80px rgba(255,255,255,0.06)',
            }}
          >
            Building digital products
            <br />
            <span style={{ color: 'rgba(255,255,255,0.82)' }}>
              people remember.
            </span>
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            variants={fadeUp}
            transition={{ duration: 1.0, ease }}
            className="text-base md:text-lg leading-relaxed max-w-xl font-light tracking-wide"
            style={{ color: 'rgba(255,255,255,0.52)' }}
          >
            Design, development, AI and growth
            <br className="hidden sm:block" />
            for ambitious companies.
          </motion.p>

          {/* CTA row */}
          <motion.div
            variants={fadeUp}
            transition={{ duration: 1.0, ease }}
            className="flex flex-col sm:flex-row items-center gap-3 mt-4"
          >
            <Button primary>Start a Project</Button>
            <Button>View Work</Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span
          className="text-[10px] tracking-[0.22em] uppercase"
          style={{ color: 'rgba(255,255,255,0.25)' }}
        >
          Scroll
        </span>
        <ScrollLine />
      </motion.div>
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
