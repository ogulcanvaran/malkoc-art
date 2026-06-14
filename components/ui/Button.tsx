'use client';

import Link from 'next/link';
import { forwardRef } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'text';
type Size    = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?:    Size;
  arrow?:   boolean;
  href?:    string;
  external?: boolean;
}

const variants: Record<Variant, string> = {
  primary: `
    inline-flex items-center justify-center gap-3
    bg-gradient-to-r from-[#E8D49A] via-[#C9A84C] to-[#8A6E2C]
    text-[#0C0B09] font-semibold
    hover:shadow-[0_0_40px_rgba(201,168,76,0.28)]
    hover:brightness-110
    active:scale-[0.98]
  `,
  secondary: `
    inline-flex items-center justify-center gap-3
    border border-[rgba(201,168,76,0.30)] text-[rgba(201,168,76,0.75)]
    hover:border-[#C9A84C] hover:text-[#C9A84C]
    hover:bg-[rgba(201,168,76,0.04)]
    active:scale-[0.98]
  `,
  ghost: `
    inline-flex items-center justify-center gap-3
    border border-[rgba(245,240,232,0.18)] text-[rgba(245,240,232,0.60)]
    hover:border-[rgba(245,240,232,0.40)] hover:text-[rgba(245,240,232,0.90)]
    active:scale-[0.98]
  `,
  text: `
    inline-flex items-center gap-2
    text-[rgba(245,240,232,0.55)]
    hover:text-[#C9A84C]
    group
  `,
};

const sizes: Record<Size, string> = {
  sm: 'px-6 py-2.5 text-[9px] tracking-[0.24em]',
  md: 'px-8 py-3.5 text-[10px] tracking-[0.26em]',
  lg: 'px-12 py-4.5 text-[11px] tracking-[0.28em]',
};

const Arrow = ({ className = '' }: { className?: string }) => (
  <span
    className={`inline-block transition-transform duration-300 group-hover:translate-x-1 ${className}`}
    aria-hidden="true"
  >
    →
  </span>
);

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', arrow = false, href, external, children, className = '', ...props }, ref) => {
    const base    = 'uppercase font-medium transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C9A84C]';
    const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`.replace(/\s+/g, ' ').trim();

    const content = (
      <>
        {children}
        {arrow && <Arrow />}
      </>
    );

    if (href) {
      return (
        <Link
          href={href}
          className={classes}
          target={external ? '_blank' : undefined}
          rel={external ? 'noopener noreferrer' : undefined}
        >
          {content}
        </Link>
      );
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {content}
      </button>
    );
  }
);

Button.displayName = 'Button';
