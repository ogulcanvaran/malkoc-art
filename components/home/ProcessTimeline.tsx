const steps = [
  {
    num:   '01',
    title: 'Tasarım',
    desc:  'Mekânınızın ölçüleri, renk paleti ve stiline göre konsept geliştiriyoruz.',
  },
  {
    num:   '02',
    title: 'Eskiz',
    desc:  'Dijital ve el çizimi taslaklar ile eserin nihai formu netleştirilir.',
  },
  {
    num:   '03',
    title: 'Malzeme Seçimi',
    desc:  'Reçine, metal varak, pigment ve özel mineraller projeye özel seçilir.',
  },
  {
    num:   '04',
    title: 'El İşçiliği',
    desc:  'Atölyemizde ustalarımız tarafından her katman elle uygulanır ve kurutulur.',
  },
  {
    num:   '05',
    title: 'Montaj',
    desc:  'Güvenli paketleme ve profesyonel uygulama ekibiyle mekânınıza teslim edilir.',
  },
];

export function ProcessTimeline() {
  return (
    <section aria-label="Üretim Süreci" style={{ background: 'var(--bg-card)', borderTop: '1px solid var(--border)', padding: 'clamp(3rem, 7vw, 6rem) 0' }}>
      <style>{`
        .pt-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 0;
          position: relative;
        }
        /* Bağlantı çizgisi */
        .pt-grid::before {
          content: '';
          position: absolute;
          top: 20px;
          left: calc(10% + 1px);
          right: calc(10% + 1px);
          height: 1px;
          background: linear-gradient(90deg, var(--gold) 0%, rgba(201,168,76,0.2) 100%);
        }
        @media (max-width: 767px) {
          .pt-grid {
            grid-template-columns: 1fr;
            gap: 0;
          }
          .pt-grid::before { display: none; }
        }
        .pt-step {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 0 1rem 0;
          position: relative;
        }
        @media (max-width: 767px) {
          .pt-step {
            flex-direction: row;
            text-align: left;
            align-items: flex-start;
            padding: 1.25rem 0;
            gap: 1.25rem;
            border-bottom: 1px solid var(--border);
          }
          .pt-step:last-child { border-bottom: none; }
          .pt-mobile-line {
            display: flex;
            flex-direction: column;
            align-items: center;
            flex-shrink: 0;
          }
          .pt-mobile-line::after {
            content: '';
            width: 1px;
            flex: 1;
            min-height: 2.5rem;
            background: linear-gradient(180deg, var(--gold), transparent);
            margin-top: 0.5rem;
          }
          .pt-step:last-child .pt-mobile-line::after { display: none; }
        }
        .pt-circle {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 1.5px solid var(--gold);
          background: var(--bg-card);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          z-index: 1;
          flex-shrink: 0;
        }
        .pt-num {
          font-size: 10px;
          letter-spacing: 0.08em;
          color: var(--gold);
          font-weight: 700;
        }
        .pt-body {
          padding-top: 1.25rem;
        }
        @media (max-width: 767px) {
          .pt-body { padding-top: 0; }
        }
        .pt-title {
          font-family: var(--font-display);
          font-size: 15px;
          font-weight: 400;
          color: var(--text);
          letter-spacing: 0.03em;
          margin-bottom: 0.5rem;
        }
        .pt-desc {
          font-size: 11px;
          line-height: 1.7;
          color: var(--text-3);
          letter-spacing: 0.02em;
        }
      `}</style>

      <div className="site-container">
        {/* Başlık */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
          <p style={{ fontSize: '9px', letterSpacing: '0.30em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 700, marginBottom: '0.6rem' }}>
            Nasıl Çalışıyoruz
          </p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 300, color: 'var(--text)', lineHeight: 1.2 }}>
            Üretim Süreci
          </h2>
          <span style={{ fontFamily: 'var(--font-script)', fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)', color: 'var(--gold)', display: 'block', marginTop: '0.4rem' }}>
            hammaddeden mekânınıza
          </span>
        </div>

        <div className="pt-grid">
          {steps.map((step, i) => (
            <div key={i} className="pt-step">
              {/* Mobil için sarmalayıcı */}
              <div className="pt-mobile-line">
                <div className="pt-circle">
                  <span className="pt-num">{step.num}</span>
                </div>
              </div>

              <div className="pt-body">
                <p className="pt-title">{step.title}</p>
                <p className="pt-desc">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
