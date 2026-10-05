// Build-time pre-rendering for SEO.
// 1. Renders <App/> to static HTML for both "/" and "/privacy"
// 2. Injects JSON-LD structured data
// 3. Writes robots.txt and sitemap.xml using the canonical URL from site.json
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

// --- 2. Pre-render Privacy Policy Page (/privacy & /privacy-policy) ---
const privacyHtml = render('/privacy')

const privacyJsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${base}/`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Privacy Policy',
        item: `${base}/privacy`,
      },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `Privacy Policy – ${site.name}`,
    description: `Privacy Policy and data protection disclosures for the Tutorly Android application and tuition platform in Bangladesh.`,
    url: `${base}/privacy`,
    publisher: { '@id': `${base}/#organization` },
  },
]

const privacyLdScript = `<script type="application/ld+json">${JSON.stringify(privacyJsonLd).replace(/</g, '\\u003c')}</script>`

let privacyDoc = rawTemplate
  .replace('<div id="root"></div>', `<div id="root">${privacyHtml}</div>`)
  .replace(/<title>.*?<\/title>/, `<title>Privacy Policy – ${site.name}</title>`)
  .replace(
    /<meta name="description" content=".*?" \/>/,
    `<meta name="description" content="Privacy Policy for Tutorly: Learn how we protect student, guardian, and tutor personal data on Bangladesh's trusted tuition platform." />`,
  )
  .replace(/<link rel="canonical" href=".*?" \/>/, `<link rel="canonical" href="${base}/privacy" />`)
  .replace(/<meta property="og:title" content=".*?" \/>/, `<meta property="og:title" content="Privacy Policy – ${site.name}" />`)
  .replace(
    /<meta property="og:description" content=".*?" \/>/,
    `<meta property="og:description" content="Official Privacy Policy and data safety disclosures for Tutorly." />`,
  )
  .replace(/<meta property="og:url" content=".*?" \/>/, `<meta property="og:url" content="${base}/privacy" />`)
  .replace(/<meta name="twitter:title" content=".*?" \/>/, `<meta name="twitter:title" content="Privacy Policy – ${site.name}" />`)
  .replace(
    /<meta name="twitter:description" content=".*?" \/>/,
    `<meta name="twitter:description" content="Official Privacy Policy and data safety disclosures for Tutorly." />`,
  )
  .replace('</head>', `    ${privacyLdScript}\n  </head>`)

// Write /privacy/index.html
const privacyDir = new URL('privacy/', dist)
mkdirSync(privacyDir, { recursive: true })
writeFileSync(new URL('index.html', privacyDir), privacyDoc)

// Write /privacy-policy/index.html alias
const privacyPolicyDir = new URL('privacy-policy/', dist)
mkdirSync(privacyPolicyDir, { recursive: true })
writeFileSync(new URL('index.html', privacyPolicyDir), privacyDoc)

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
    <loc>${base}/privacy</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
`,
)
writeFileSync(new URL('robots.txt', dist), `User-agent: *\nAllow: /\n\nSitemap: ${base}/sitemap.xml\n`)

rmSync(new URL('dist-ssr/', root), { recursive: true, force: true })
console.log(
  `prerender: Home ${(appHtml.length / 1024).toFixed(1)} kB, Privacy ${(privacyHtml.length / 1024).toFixed(1)} kB, sitemap + robots for ${base}`,
)
