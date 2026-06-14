const stats = [
  { number: '150+', label: 'Tamamlanan Eser' },
  { number: '50+',  label: 'Referans Proje' },
  { number: '14',   label: 'Şehirde Uygulama' },
  { number: '8+',   label: 'Yıl Deneyim' },
];

export function TrustStats() {
  return (
    <section aria-label="Rakamlarla Malkoç Design" style={{ background: 'var(--bg)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
      <div className="site-container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
          {stats.map((s, i) => (
            <div
              key={s.label}
              style={{
                display:        'flex',
                flexDirection:  'column',
                alignItems:     'center',
                justifyContent: 'center',
                padding:        'clamp(2rem, 4vw, 3rem) 1rem',
                borderRight:    i < stats.length - 1 ? '1px solid var(--border)' : 'none',
                gap:            '0.4rem',
                textAlign:      'center',
              }}
            >
              <span style={{
                fontFamily: 'var(--font-display)',
                fontSize:   'clamp(2rem, 4vw, 3.2rem)',
                fontWeight: 300,
                color:      'var(--gold)',
                lineHeight: 1,
              }}>
                {s.number}
              </span>
              <span style={{
                fontSize:      '9px',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color:         'var(--text-2)',
                fontWeight:    600,
              }}>
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
