export function SchemaOrg() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type':       'LocalBusiness',
        '@id':         'https://malkocdizayn.com/#business',
        name:          'Malkoç Design',
        alternateName: 'Malkoç Dizayn',
        description:
          'İstanbul\'da el yapımı lüks duvar sanatı, özgün heykeller ve premium dekoratif tasarım. Kurumsal, konut ve ticari projeler için özel üretim.',
        url:           'https://malkocdizayn.com',
        logo:          'https://malkocdizayn.com/logo.png',
        image:         'https://malkocdizayn.com/og-default.jpg',
        telephone:     '+905000000000',
        email:         'info@malkocdizayn.com',
        address: {
          '@type':           'PostalAddress',
          addressLocality:   'İstanbul',
          addressCountry:    'TR',
        },
        geo: {
          '@type':    'GeoCoordinates',
          latitude:   41.0082,
          longitude:  28.9784,
        },
        openingHoursSpecification: [
          {
            '@type':     'OpeningHoursSpecification',
            dayOfWeek:   ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            opens:       '09:00',
            closes:      '18:00',
          },
        ],
        priceRange:        '₺₺₺₺',
        currenciesAccepted: 'TRY',
        paymentAccepted:   'Cash, Credit Card, Bank Transfer',
        areaServed:        ['İstanbul', 'Türkiye'],
        sameAs: [
          'https://instagram.com/busemalkocart',
          'https://pinterest.com/malkocdizayn',
        ],
      },
      {
        '@type':     'WebSite',
        '@id':       'https://malkocdizayn.com/#website',
        url:         'https://malkocdizayn.com',
        name:        'Malkoç Design',
        description: 'El yapımı lüks duvar sanatı ve özel üretim dekoratif eserler.',
        publisher: { '@id': 'https://malkocdizayn.com/#business' },
        inLanguage: 'tr-TR',
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
