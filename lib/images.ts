/* ═══════════════════════════════════════════════════════
   Malkoç Design — Fotoğraf Kataloğu
   public/busemalkocart/ altındaki gerçek görseller
   SEO optimizasyonlu alt tag ve kategoriler
═══════════════════════════════════════════════════════ */

const BASE = '/busemalkocart';

export type ImageItem = {
  src:      string;
  alt:      string;
  category: 'duvar-sanati' | 'heykel' | 'lamba' | 'ozel-uretim' | 'studyo' | 'detay';
  featured?: boolean;
};

export const images: ImageItem[] = [
  /* ── Öne çıkan eserler (featured works) ── */
  {
    src:      `${BASE}/busemalkocart_1769530313_3819418110911113732_75789262008.jpg`,
    alt:      'El yapımı premium duvar sanatı eseri — Malkoç Design, İstanbul',
    category: 'duvar-sanati',
    featured: true,
  },
  {
    src:      `${BASE}/busemalkocart_1769530313_3819418116892137630_75789262008.jpg`,
    alt:      'Altın varak ve reçine duvar paneli — lüks iç mekan sanatı, Malkoç Design',
    category: 'duvar-sanati',
    featured: true,
  },
  {
    src:      `${BASE}/busemalkocart_1769530313_3819418123930182462_75789262008.jpg`,
    alt:      'Premium el yapımı duvar sanat eseri detay — Malkoç Design atölye',
    category: 'detay',
    featured: true,
  },
  {
    src:      `${BASE}/busemalkocart_1769705345_3820887349371084690_75789262008.jpg`,
    alt:      'Organik form duvar sanatı, özgün tasarım — Malkoç Design İstanbul',
    category: 'duvar-sanati',
    featured: true,
  },
  {
    src:      `${BASE}/busemalkocart_1769705345_3820887350587472594_75789262008.jpg`,
    alt:      'Lüks dekoratif sanat eseri — özel üretim, Malkoç Design',
    category: 'duvar-sanati',
    featured: true,
  },
  {
    src:      `${BASE}/busemalkocart_1769852904_3822121632886713549_75789262008.jpg`,
    alt:      'Premium reçine duvar paneli, soyut form — Malkoç Design',
    category: 'duvar-sanati',
  },
  {
    src:      `${BASE}/busemalkocart_1769852904_3822121636904830760_75789262008.jpg`,
    alt:      'El yapımı soyut duvar sanatı yakın çekim detay — Malkoç Design atölye',
    category: 'detay',
  },
  {
    src:      `${BASE}/busemalkocart_1769937176_3822831415809852396_75789262008.jpg`,
    alt:      'Özgün tasarım duvar sanatı eseri — lüks konut dekorasyonu, Malkoç Design',
    category: 'duvar-sanati',
  },
  {
    src:      `${BASE}/busemalkocart_1769937176_3822831416665445519_75789262008.jpg`,
    alt:      'Dekoratif duvar paneli yan açı — Malkoç Design premium koleksiyon',
    category: 'duvar-sanati',
  },
  {
    src:      `${BASE}/busemalkocart_1770129436_3824442924717601766_75789262008.jpg`,
    alt:      'Lüks iç mekan sanatı, duvar heykeli — Malkoç Design özel üretim',
    category: 'heykel',
    featured: true,
  },
  {
    src:      `${BASE}/busemalkocart_1770136573_3824505221053834409_75789262008.png`,
    alt:      'Malkoç Design stüdyo — el yapımı sanat eseri üretim süreci',
    category: 'studyo',
    featured: true,
  },
  {
    src:      `${BASE}/busemalkocart_1770235321_3825331950760806251_75789262008.jpg`,
    alt:      'Premium dekoratif obje, altın detay — Malkoç Design koleksiyon',
    category: 'detay',
  },
  {
    src:      `${BASE}/busemalkocart_1770235321_3825331953159909917_75789262008.jpg`,
    alt:      'El yapımı dekoratif sanat formu — lüks mekân uygulaması, Malkoç Design',
    category: 'ozel-uretim',
  },
  {
    src:      `${BASE}/busemalkocart_1770296635_3825847533088574014_75789262008.jpg`,
    alt:      'Soyut reçine duvar sanatı, parlak yüzey — Malkoç Design',
    category: 'duvar-sanati',
  },
  {
    src:      `${BASE}/busemalkocart_1770558808_3828044692437351314_75789262008.jpg`,
    alt:      'Premium duvar sanatı uygulaması, iç mekan — Malkoç Design İstanbul',
    category: 'ozel-uretim',
    featured: true,
  },
  {
    src:      `${BASE}/busemalkocart_1770558808_3828045420031701866_75789262008.jpg`,
    alt:      'Özel üretim dekoratif panel, mekân uygulaması — Malkoç Design',
    category: 'ozel-uretim',
  },
  {
    src:      `${BASE}/busemalkocart_1770558808_3828045429108173592_75789262008.jpg`,
    alt:      'Lüks dekorasyon uygulaması detay — Malkoç Design el yapımı',
    category: 'detay',
  },
  {
    src:      `${BASE}/busemalkocart_1770631288_3828655034100105884_75789262008.jpg`,
    alt:      'Özgün tasarım duvar sanatı koleksiyon parçası — Malkoç Design',
    category: 'duvar-sanati',
  },
  {
    src:      `${BASE}/busemalkocart_1770974594_3831533783669805919_75789262008.jpg`,
    alt:      'Lüks heykel, organik form — Malkoç Design premium koleksiyon',
    category: 'heykel',
  },
  {
    src:      `${BASE}/busemalkocart_1770974594_3831533785163008878_75789262008.jpg`,
    alt:      'Dekoratif heykel yan profil — Malkoç Design özgün tasarım',
    category: 'heykel',
  },
  {
    src:      `${BASE}/busemalkocart_1771148877_3832996257740891787_75789262008.jpg`,
    alt:      'El yapımı premium sanat eseri, atölye üretimi — Malkoç Design İstanbul',
    category: 'studyo',
  },
  {
    src:      `${BASE}/busemalkocart_1772630492_3845425161122386547_75789262008.jpg`,
    alt:      'Özel üretim duvar sanatı — kurumsal mekân uygulaması, Malkoç Design',
    category: 'ozel-uretim',
    featured: true,
  },
  {
    src:      `${BASE}/busemalkocart_1772630492_3845425162858838651_75789262008.jpg`,
    alt:      'Kurumsal dekorasyon uygulaması, lüks ofis — Malkoç Design',
    category: 'ozel-uretim',
  },
  {
    src:      `${BASE}/busemalkocart_1776428976_3877288932304288615_75789262008.jpg`,
    alt:      'Premium duvar paneli koleksiyon — Malkoç Design el yapımı sanat',
    category: 'duvar-sanati',
  },
  {
    src:      `${BASE}/busemalkocart_1776428976_3877288934116186604_75789262008.jpg`,
    alt:      'Lüks duvar sanatı ikiz parça — Malkoç Design',
    category: 'duvar-sanati',
  },
  {
    src:      `${BASE}/busemalkocart_1776442826_3877404916251906994_75789262008.jpg`,
    alt:      'El yapımı dekoratif obje, altın-siyah — Malkoç Design premium',
    category: 'detay',
  },
  {
    src:      `${BASE}/busemalkocart_1776720489_3879735123755439904_75789262008.jpg`,
    alt:      'Özgün form sanat eseri, mekân uygulaması — Malkoç Design',
    category: 'ozel-uretim',
  },
  {
    src:      `${BASE}/busemalkocart_1777387018_3885326370507389888_75789262008.jpg`,
    alt:      'Premium dekoratif heykel, lüks iç mekan — Malkoç Design koleksiyon',
    category: 'heykel',
    featured: true,
  },
  {
    src:      `${BASE}/busemalkocart_1777387018_3885326370532507906_75789262008.jpg`,
    alt:      'Lüks dekoratif heykel detay yakın çekim — Malkoç Design atölye',
    category: 'detay',
  },
  {
    src:      `${BASE}/busemalkocart_1777917921_3889779915092692480_75789262008.jpg`,
    alt:      'El yapımı lüks dekorasyon, organik doku — Malkoç Design',
    category: 'duvar-sanati',
  },
  {
    src:      `${BASE}/busemalkocart_1777917921_3889779915101092653_75789262008.jpg`,
    alt:      'Premium reçine sanat eseri detay — Malkoç Design İstanbul',
    category: 'detay',
  },
  {
    src:      `${BASE}/busemalkocart_1777917921_3889779915109466551_75789262008.jpg`,
    alt:      'Özgün duvar sanatı eseri — Malkoç Design premium koleksiyon',
    category: 'duvar-sanati',
  },
  {
    src:      `${BASE}/busemalkocart_1778443366_3894187667139346027_75789262008.jpg`,
    alt:      'Lüks duvar dekorasyonu, altın aksanlı — Malkoç Design',
    category: 'duvar-sanati',
  },
  {
    src:      `${BASE}/busemalkocart_1778443366_3894187667139382718_75789262008.jpg`,
    alt:      'El yapımı duvar sanatı çift parça — Malkoç Design premium',
    category: 'duvar-sanati',
  },
  {
    src:      `${BASE}/busemalkocart_1779534724_3903341928282865287_75789262008.jpg`,
    alt:      'Özel tasarım sanat eseri, stüdyo çekimi — Malkoç Design',
    category: 'studyo',
  },
  {
    src:      `${BASE}/busemalkocart_1779534724_3903341933106344596_75789262008.jpg`,
    alt:      'Malkoç Design stüdyo, üretim süreci — el yapımı premium sanat',
    category: 'studyo',
    featured: true,
  },
  {
    src:      `${BASE}/busemalkocart_1779534724_3903341933114902896_75789262008.jpg`,
    alt:      'Atölye üretim detayı — Malkoç Design el yapımı lüks sanat eseri',
    category: 'studyo',
  },
  {
    src:      `${BASE}/busemalkocart_1780345266_3910140784630931182_75789262008.jpg`,
    alt:      'Premium dekoratif panel, kurumsal uygulama — Malkoç Design',
    category: 'ozel-uretim',
  },
  {
    src:      `${BASE}/busemalkocart_1780480165_3911271320468371684_75789262008.jpg`,
    alt:      'Lüks duvar sanatı koleksiyon parçası — Malkoç Design özgün tasarım',
    category: 'duvar-sanati',
  },
  {
    src:      `${BASE}/busemalkocart_1780480165_3911271323429736615_75789262008.jpg`,
    alt:      'El yapımı dekoratif sanat detay — Malkoç Design',
    category: 'detay',
  },
  {
    src:      `${BASE}/busemalkocart_1780480165_3911271325359000448_75789262008.jpg`,
    alt:      'Premium sanat eseri, iç mekan dekorasyon — Malkoç Design İstanbul',
    category: 'ozel-uretim',
  },
  {
    src:      `${BASE}/busemalkocart_1780934971_3915085459666075323_75789262008.jpg`,
    alt:      'Lüks heykel koleksiyon, özgün form — Malkoç Design',
    category: 'heykel',
  },
  {
    src:      `${BASE}/busemalkocart_1780934971_3915085461142490830_75789262008.jpg`,
    alt:      'Dekoratif heykel, organik yapı — Malkoç Design premium sanat',
    category: 'heykel',
  },
  {
    src:      `${BASE}/busemalkocart_1780934971_3915085463382301410_75789262008.jpg`,
    alt:      'Özgün form heykel yakın çekim — Malkoç Design atölye üretimi',
    category: 'detay',
  },
  {
    src:      `${BASE}/busemalkocart_1781282650_3918004780319106652_75789262008.jpg`,
    alt:      'Premium duvar sanatı mekân uygulaması — Malkoç Design İstanbul',
    category: 'ozel-uretim',
    featured: true,
  },
  {
    src:      `${BASE}/busemalkocart_1776425773_3877262269071804406_75789262008.jpg`,
    alt:      'El yapımı dekoratif lamba tasarımı — Malkoç Design',
    category: 'lamba',
    featured: true,
  },
  {
    src:      `${BASE}/busemalkocart_1764779733_3779568799637590814_75789262008.jpg`,
    alt:      'Malkoç Design özel üretim sanat eseri — kurumsal dekorasyon',
    category: 'ozel-uretim',
  },
  {
    src:      `${BASE}/busemalkocart_1764779733_3779568799645991960_75789262008.jpg`,
    alt:      'Lüks iç mekan sanatı — Malkoç Design koleksiyon',
    category: 'duvar-sanati',
  },
  {
    src:      `${BASE}/busemalkocart_1780480165_3911271325359000448_75789262008.jpg`,
    alt:      'Premium el yapımı duvar paneli — Malkoç Design',
    category: 'duvar-sanati',
  },
];

/* ── Yardımcı filtreleme fonksiyonları ── */
export const featuredImages      = images.filter(i => i.featured);
export const duvarSanatiImages   = images.filter(i => i.category === 'duvar-sanati');
export const heykelImages        = images.filter(i => i.category === 'heykel');
export const lambaImages         = images.filter(i => i.category === 'lamba');
export const ozelUretimImages    = images.filter(i => i.category === 'ozel-uretim');
export const studyoImages        = images.filter(i => i.category === 'studyo');

/* ── Öne çıkan eserler (ana sayfa) ── */
export const homeFeaturedWorks = [
  {
    slug:     'organik-form-duvar-paneli',
    title:    'Organik Form',
    material: 'Reçine · Altın Detay',
    size:     '90 × 100 cm',
    src:      images[0].src,
    alt:      images[0].alt,
  },
  {
    slug:     'premium-altin-panel',
    title:    'Altın Kompozisyon',
    material: 'Altın Varak · Alçı',
    size:     '80 × 80 cm',
    src:      images[1].src,
    alt:      images[1].alt,
  },
  {
    slug:     'lüks-heykel-form',
    title:    'Asimetrik Form',
    material: 'Reçine · Lak · Metal',
    size:     '60 × 120 cm',
    src:      images[9].src,
    alt:      images[9].alt,
  },
];

/* ── Kategoriler (ana sayfa Categories bölümü) ── */
export const homeCategories = [
  {
    title: 'Duvar Sanatı',
    sub:   'Organik form, premium yüzey',
    href:  '/koleksiyon/duvar-sanati',
    src:   duvarSanatiImages[3].src,
    alt:   duvarSanatiImages[3].alt,
    wide:  true,
  },
  {
    title: 'Heykeller',
    sub:   'Üç boyutlu özgün formlar',
    href:  '/koleksiyon/heykeller',
    src:   heykelImages[0].src,
    alt:   heykelImages[0].alt,
    wide:  false,
  },
  {
    title: 'Dekoratif Lambalar',
    sub:   'Sanat ve ışık bir arada',
    href:  '/koleksiyon/lambalar',
    src:   lambaImages[0]?.src ?? images[11].src,
    alt:   lambaImages[0]?.alt ?? images[11].alt,
    wide:  false,
  },
  {
    title: 'Özel Üretim',
    sub:   'Sizin için tasarlandı',
    href:  '/koleksiyon/ozel-uretim',
    src:   ozelUretimImages[0].src,
    alt:   ozelUretimImages[0].alt,
    wide:  true,
  },
];
