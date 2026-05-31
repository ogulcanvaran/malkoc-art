'use client';

export function ContactForm() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
      <form className="flex flex-col gap-5" aria-label="İletişim formu" onSubmit={(e) => e.preventDefault()}>
        {[
          { id: 'name',  label: 'Ad Soyad', type: 'text',  placeholder: 'Adınız' },
          { id: 'email', label: 'E-posta',  type: 'email', placeholder: 'ornek@email.com' },
          { id: 'phone', label: 'Telefon',  type: 'tel',   placeholder: '+90 5XX XXX XX XX' },
        ].map((f) => (
          <div key={f.id} className="flex flex-col gap-1.5">
            <label htmlFor={f.id} className="text-[10px] tracking-[0.20em] uppercase" style={{ color: 'var(--gold)' }}>{f.label}</label>
            <input id={f.id} type={f.type} placeholder={f.placeholder} className="px-4 py-3 bg-transparent outline-none text-[13px] placeholder:opacity-30" style={{ border: '1px solid rgba(201,168,76,0.25)', color: 'var(--white)' }} />
          </div>
        ))}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="message" className="text-[10px] tracking-[0.20em] uppercase" style={{ color: 'var(--gold)' }}>Mesajınız</label>
          <textarea id="message" rows={5} placeholder="Projenizi veya sorunuzu kısaca anlatın..." className="px-4 py-3 bg-transparent outline-none text-[13px] placeholder:opacity-30 resize-none" style={{ border: '1px solid rgba(201,168,76,0.25)', color: 'var(--white)' }} />
        </div>
        <button type="submit" className="py-4 text-[11px] tracking-[0.22em] uppercase font-medium transition-all hover:bg-[#9A7A30] mt-2" style={{ background: 'var(--gold)', color: 'var(--black)' }}>
          Gönder
        </button>
      </form>
      <div className="flex flex-col gap-8 pt-2">
        {[
          { label: 'E-posta', value: 'info@malkocdizayn.com', href: 'mailto:info@malkocdizayn.com' },
          { label: 'WhatsApp', value: '+90 5XX XXX XX XX', href: 'https://wa.me/905000000000' },
          { label: 'Instagram', value: '@malkocdizayn', href: 'https://instagram.com/malkocdizayn' },
        ].map((item) => (
          <div key={item.label}>
            <p className="text-[10px] tracking-[0.20em] uppercase mb-1" style={{ color: 'var(--gold)' }}>{item.label}</p>
            <a href={item.href} className="text-[15px] transition-colors hover:text-[#C9A84C]" style={{ color: 'var(--white-muted)', fontFamily: 'var(--font-cormorant)' }} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
              {item.value}
            </a>
          </div>
        ))}
        <div className="mt-4 p-6" style={{ border: '1px solid rgba(201,168,76,0.12)', background: 'var(--black-surface)' }}>
          <p className="text-[13px] leading-relaxed" style={{ color: 'var(--white-muted)' }}>
            Özel sipariş ve kurumsal projeler için genellikle <strong style={{ color: 'var(--white)' }}>24 saat içinde</strong> geri dönüş yapıyoruz.
          </p>
        </div>
      </div>
    </div>
  );
}
