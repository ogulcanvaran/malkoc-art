'use client';

const options = [
  { label: 'Duvar Sanatı', value: 'duvar-sanati' },
  { label: 'Heykel',       value: 'heykel' },
  { label: 'Lamba',        value: 'lamba' },
  { label: 'Tablo',        value: 'tablo' },
  { label: 'Diğer',        value: 'diger' },
];

export function BespokeForm() {
  return (
    <form className="flex flex-col gap-6" aria-label="Özel sipariş formu" onSubmit={(e) => e.preventDefault()}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {[
          { id: 'name',  label: 'Ad Soyad', type: 'text',  placeholder: 'Adınız' },
          { id: 'email', label: 'E-posta',  type: 'email', placeholder: 'ornek@email.com' },
        ].map((f) => (
          <div key={f.id} className="flex flex-col gap-1.5">
            <label htmlFor={f.id} className="text-[10px] tracking-[0.20em] uppercase" style={{ color: 'var(--gold)' }}>{f.label}</label>
            <input id={f.id} type={f.type} placeholder={f.placeholder} className="px-4 py-3 bg-transparent outline-none text-[13px] placeholder:opacity-30" style={{ border: '1px solid rgba(201,168,76,0.25)', color: 'var(--white)' }} />
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="type" className="text-[10px] tracking-[0.20em] uppercase" style={{ color: 'var(--gold)' }}>Eser Türü</label>
        <select id="type" className="px-4 py-3 outline-none text-[13px] appearance-none" style={{ border: '1px solid rgba(201,168,76,0.25)', color: 'var(--white)', background: 'var(--black-surface)' }}>
          <option value="">Seçiniz</option>
          {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {[
          { id: 'size',   label: 'Tahmini Boyut (cm)', placeholder: 'ör. 80×80' },
          { id: 'budget', label: 'Bütçe Aralığı',      placeholder: 'ör. 5.000 - 15.000 ₺' },
        ].map((f) => (
          <div key={f.id} className="flex flex-col gap-1.5">
            <label htmlFor={f.id} className="text-[10px] tracking-[0.20em] uppercase" style={{ color: 'var(--gold)' }}>{f.label}</label>
            <input id={f.id} type="text" placeholder={f.placeholder} className="px-4 py-3 bg-transparent outline-none text-[13px] placeholder:opacity-30" style={{ border: '1px solid rgba(201,168,76,0.25)', color: 'var(--white)' }} />
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="desc" className="text-[10px] tracking-[0.20em] uppercase" style={{ color: 'var(--gold)' }}>Projeyi Anlatın</label>
        <textarea id="desc" rows={6} placeholder="Mekânınız, renk tercihiniz, tarz ve referans görseller..." className="px-4 py-3 bg-transparent outline-none text-[13px] placeholder:opacity-30 resize-none" style={{ border: '1px solid rgba(201,168,76,0.25)', color: 'var(--white)' }} />
      </div>
      <button type="submit" className="py-4 text-[11px] tracking-[0.22em] uppercase font-medium transition-all hover:bg-[#9A7A30]" style={{ background: 'var(--gold)', color: 'var(--black)' }}>
        Projeyi Gönder
      </button>
    </form>
  );
}
