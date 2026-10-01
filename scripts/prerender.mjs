// Build-time pre-rendering for SEO.
// 1. Renders <App/> to static HTML and injects it into dist/index.html (crawlers + link previews see real content)
// 2. Injects JSON-LD structured data (Organization, WebSite, MobileApplication, FAQPage)
// 3. Writes robots.txt and sitemap.xml using the canonical URL from site.json
import { readFileSync, rmSync, writeFileSync } from 'node:fs'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = new URL('..', import.meta.url)
const dist = new URL('dist/', root)
const ssrEntry = new URL('dist-ssr/entry-server.js', root)

const site = JSON.parse(readFileSync(new URL('site.json', root), 'utf8'))
const base = site.url.replace(/\/$/, '')
const playStoreUrl = `https://play.google.com/store/apps/details?id=${site.playStoreId}`

const { render, faqs } = await import(pathToFileURL(fileURLToPath(ssrEntry)).href)
const appHtml = render()

const jsonLd = [
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

// Escape "<" so no string inside the JSON can close the <script> tag.
const ldScript = `<script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</script>`

const indexPath = new URL('index.html', dist)
let html = readFileSync(indexPath, 'utf8')
if (!html.includes('<div id="root"></div>')) throw new Error('prerender: #root placeholder not found in dist/index.html')
html = html.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)
html = html.replace('</head>', `    ${ldScript}\n  </head>`)
writeFileSync(indexPath, html)

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
</urlset>
`,
)
writeFileSync(new URL('robots.txt', dist), `User-agent: *\nAllow: /\n\nSitemap: ${base}/sitemap.xml\n`)

rmSync(new URL('dist-ssr/', root), { recursive: true, force: true })
console.log(`prerender: ${(appHtml.length / 1024).toFixed(1)} kB of HTML, ${faqs.length} FAQs, sitemap + robots for ${base}`)
