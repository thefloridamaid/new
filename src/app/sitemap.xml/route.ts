import { ALL_NEIGHBORHOODS } from '@/lib/seo/locations'
import { AREAS } from '@/lib/seo/data/areas'
import { SERVICES } from '@/lib/seo/services'
import { BLOG_POSTS } from '@/lib/seo/blog-data'

const BASE_URL = 'https://www.thefloridamaid.com'

export async function GET() {
  const now = new Date().toISOString()

  const urls: { loc: string; lastmod: string; changefreq: string; priority: string }[] = []

  // Homepage
  urls.push({ loc: BASE_URL, lastmod: now, changefreq: 'weekly', priority: '1.0' })

  // Static pages
  const staticPages = [
    { path: '/florida-maid-service-services-offered-by-the-florida-maid', freq: 'weekly', pri: '0.9' },
    { path: '/service-areas-served-by-the-florida-maid', freq: 'weekly', pri: '0.9' },
    { path: '/about-the-florida-maid-service-company', freq: 'monthly', pri: '0.7' },
    { path: '/contact-the-florida-maid-service-today', freq: 'monthly', pri: '0.8' },
    { path: '/updated-florida-maid-service-industry-pricing', freq: 'weekly', pri: '0.9' },
    { path: '/florida-cleaning-service-frequently-asked-questions', freq: 'monthly', pri: '0.8' },
    { path: '/florida-customer-reviews-for-the-florida-maid', freq: 'weekly', pri: '0.8' },
    { path: '/available-florida-maid-jobs', freq: 'daily', pri: '0.8' },
    { path: '/florida-maid-service-blog', freq: 'weekly', pri: '0.7' },
    { path: '/florida-maid-cleaning-tips-and-advice-by-the-florida-maid', freq: 'weekly', pri: '0.7' },
    { path: '/service/florida-emergency-cleaning-service', freq: 'monthly', pri: '0.7' },
    { path: '/get-paid-for-cleaning-referrals-every-time-they-are-serviced', freq: 'monthly', pri: '0.5' },
    { path: '/privacy-policy', freq: 'yearly', pri: '0.3' },
    { path: '/terms-conditions', freq: 'yearly', pri: '0.3' },
    { path: '/legal', freq: 'yearly', pri: '0.3' },
    { path: '/refund-policy', freq: 'yearly', pri: '0.3' },
    { path: '/do-not-share-policy', freq: 'yearly', pri: '0.3' },
  ]
  for (const p of staticPages) {
    urls.push({ loc: `${BASE_URL}${p.path}`, lastmod: now, changefreq: p.freq, priority: p.pri })
  }

  // Area pages
  for (const area of AREAS) {
    urls.push({ loc: `${BASE_URL}/${area.urlSlug}`, lastmod: now, changefreq: 'weekly', priority: '0.9' })
  }

  // Service pages
  for (const service of SERVICES) {
    urls.push({ loc: `${BASE_URL}/services/${service.urlSlug}`, lastmod: now, changefreq: 'weekly', priority: '0.8' })
  }

  // Neighborhood pages
  for (const n of ALL_NEIGHBORHOODS) {
    urls.push({ loc: `${BASE_URL}/${n.urlSlug}`, lastmod: now, changefreq: 'weekly', priority: '0.8' })
  }

  // Blog posts
  for (const post of BLOG_POSTS) {
    urls.push({ loc: `${BASE_URL}/florida-maid-service-blog/${post.slug}`, lastmod: post.date, changefreq: 'monthly', priority: '0.7' })
  }

  // Neighborhood job pages
  for (const n of ALL_NEIGHBORHOODS) {
    urls.push({ loc: `${BASE_URL}/available-florida-maid-jobs/${n.slug}`, lastmod: now, changefreq: 'daily', priority: '0.8' })
  }

  // Neighborhood × Service cross pages
  for (const n of ALL_NEIGHBORHOODS) {
    for (const s of SERVICES) {
      urls.push({ loc: `${BASE_URL}/${n.urlSlug}/${s.slug}`, lastmod: now, changefreq: 'monthly', priority: '0.6' })
    }
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
