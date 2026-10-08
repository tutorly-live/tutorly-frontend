// Build-time pre-rendering for SEO.
// Renders <App/> to static HTML for all pages and writes sitemap + robots.txt
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = new URL('..', import.meta.url)
const dist = new URL('dist/', root)
const ssrEntry = new URL('dist-ssr/entry-server.js', root)

const site = JSON.parse(readFileSync(new URL('site.json', root), 'utf8'))
const base = site.url.replace(/\/$/, '')
const playStoreUrl = `https://play.google.com/store/apps/details?id=${site.playStoreId}`

const { render, faqs } = await import(pathToFileURL(fileURLToPath(ssrEntry)).href)

// --- 1. Pre-render Home Page (/) ---
const appHtml = render('/')

const homeJsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${base}/#organization`,
    name: site.name,
    url: `${base}/`,
    logo: `${base}/tutorly-logo.png`,
    email: site.email,
    telephone: site.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address,
      addressCountry: 'BD',
    },
    areaServed: { '@type': 'Country', name: 'Bangladesh' },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${base}/#website`,
    name: site.name,
    url: `${base}/`,
    inLanguage: 'en',
    publisher: { '@id': `${base}/#organization` },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'MobileApplication',
    name: site.name,
    description: site.description,
    operatingSystem: 'ANDROID',
    applicationCategory: 'EducationalApplication',
    installUrl: playStoreUrl,
    url: `${base}/`,
    image: `${base}/og-image.png`,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'BDT' },
    publisher: { '@id': `${base}/#organization` },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  },
]

const homeLdScript = `<script type="application/ld+json">${JSON.stringify(homeJsonLd).replace(/</g, '\\u003c')}</script>`

const indexPath = new URL('index.html', dist)
const rawTemplate = readFileSync(indexPath, 'utf8')
if (!rawTemplate.includes('<div id="root"></div>')) {
  throw new Error('prerender: #root placeholder not found in dist/index.html')
}

// Generate Home dist/index.html
let homeHtml = rawTemplate.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)
homeHtml = homeHtml.replace('</head>', `    ${homeLdScript}\n  </head>`)
writeFileSync(indexPath, homeHtml)

// --- Helper: render a legal/static page and write to dist ---
function renderLegalPage(slug, aliases, title, description) {
  const html = render(`/${slug}`)

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${base}/` },
        { '@type': 'ListItem', position: 2, name: title, item: `${base}/${slug}` },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: `${title} – ${site.name}`,
      description,
      url: `${base}/${slug}`,
      publisher: { '@id': `${base}/#organization` },
    },
  ]

  const ldScript = `<script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</script>`

  let doc = rawTemplate
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`)
    .replace(/<title>.*?<\/title>/, `<title>${title} – ${site.name}</title>`)
    .replace(
      /<meta name="description" content=".*?" \/>/,
      `<meta name="description" content="${description}" />`,
    )
    .replace(/<link rel="canonical" href=".*?" \/>/, `<link rel="canonical" href="${base}/${slug}" />`)
    .replace(/<meta property="og:title" content=".*?" \/>/, `<meta property="og:title" content="${title} – ${site.name}" />`)
    .replace(
      /<meta property="og:description" content=".*?" \/>/,
      `<meta property="og:description" content="${description}" />`,
    )
    .replace(/<meta property="og:url" content=".*?" \/>/, `<meta property="og:url" content="${base}/${slug}" />`)
    .replace(/<meta name="twitter:title" content=".*?" \/>/, `<meta name="twitter:title" content="${title} – ${site.name}" />`)
    .replace(
      /<meta name="twitter:description" content=".*?" \/>/,
      `<meta name="twitter:description" content="${description}" />`,
    )
    .replace('</head>', `    ${ldScript}\n  </head>`)

  // Write primary slug directory
  const primaryDir = new URL(`${slug}/`, dist)
  mkdirSync(primaryDir, { recursive: true })
  writeFileSync(new URL('index.html', primaryDir), doc)

  // Write alias directories
  for (const alias of aliases) {
    const aliasDir = new URL(`${alias}/`, dist)
    mkdirSync(aliasDir, { recursive: true })
    writeFileSync(new URL('index.html', aliasDir), doc)
  }

  return html.length
}

// --- 2. Pre-render all pages ---
const privacyLen = renderLegalPage(
  'privacy-policy',
  ['privacy'],
  'Privacy Policy',
  "Privacy Policy for Tutorly (Tutor Lagbe): Learn how we protect student, guardian, and tutor personal data on Bangladesh's trusted tuition platform.",
)

const termsLen = renderLegalPage(
  'terms',
  ['terms-and-conditions'],
  'Terms & Conditions',
  "Terms and Conditions for using Tutorly (Tutor Lagbe) – Bangladesh's trusted home tutor matchmaking platform. Read before activating your tutor account.",
)

const refundLen = renderLegalPage(
  'refund',
  ['refund-policy'],
  'Return & Refund Policy',
  'Return and Refund Policy for Tutorly (Tutor Lagbe). Understand our refund process for activation fees, credit top-ups, and exceptional circumstances.',
)

const deliveryLen = renderLegalPage(
  'delivery',
  ['delivery-policy'],
  'Delivery Policy',
  'Delivery Policy for Tutorly digital services. Learn how and when tutor profile activation, credit top-ups, and other digital services are delivered.',
)

const aboutLen = renderLegalPage(
  'about',
  [],
  'About Us',
  `About Tutor Lagbe (Tutorly) – Bangladesh's trusted home tutor matchmaking platform. Trade License: ${site.tradeLicense}. Address: ${site.address}.`,
)

// --- 3. Sitemap & Robots.txt ---
const today = new Date().toISOString().slice(0, 10)
writeFileSync(
  new URL('sitemap.xml', dist),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${base}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${base}/about</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${base}/privacy-policy</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${base}/terms</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${base}/refund</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>${base}/delivery</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
</urlset>
`,
)
writeFileSync(new URL('robots.txt', dist), `User-agent: *\nAllow: /\n\nSitemap: ${base}/sitemap.xml\n`)

rmSync(new URL('dist-ssr/', root), { recursive: true, force: true })
console.log(
  `prerender: Home ${(appHtml.length / 1024).toFixed(1)} kB` +
  ` | Privacy ${(privacyLen / 1024).toFixed(1)} kB` +
  ` | Terms ${(termsLen / 1024).toFixed(1)} kB` +
  ` | Refund ${(refundLen / 1024).toFixed(1)} kB` +
  ` | Delivery ${(deliveryLen / 1024).toFixed(1)} kB` +
  ` | About ${(aboutLen / 1024).toFixed(1)} kB` +
  ` | sitemap + robots for ${base}`,
)
