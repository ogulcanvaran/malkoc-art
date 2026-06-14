import Link from 'next/link';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface Props {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className = '' }: Props) {
  const all = [{ label: 'Anasayfa', href: '/' }, ...items];

  const schema = {
    '@context': 'https://schema.org',
    '@type':    'BreadcrumbList',
    itemListElement: all.map((item, i) => ({
      '@type':    'ListItem',
      position:   i + 1,
      name:       item.label,
      item:       item.href ? `https://malkocdizayn.com${item.href}` : undefined,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <nav aria-label="Breadcrumb" className={`mb-10 ${className}`}>
        <ol className="flex items-center flex-wrap gap-1.5 text-[10px] tracking-[0.15em] uppercase">
          {all.map((item, i) => {
            const isLast = i === all.length - 1;
            return (
              <li key={i} className="flex items-center gap-1.5">
                {i > 0 && (
                  <span style={{ color: 'var(--gold)', opacity: 0.5 }}>›</span>
                )}
                {!isLast && item.href ? (
                  <Link
                    href={item.href}
                    className="transition-colors duration-200 hover:text-[#C9A84C]"
                    style={{ color: 'var(--white-muted)' }}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span style={{ color: isLast ? 'var(--white)' : 'var(--white-muted)' }}>
                    {item.label}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
