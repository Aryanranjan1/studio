
import { getSiteSettings } from '@/lib/firestore/settings.server';
import { getAllPublicBlogs } from '@/lib/firestore/blog.server';
import { getAllPublicPortfolioProjects } from '@/lib/firestore/portfolio.server';
import { getAllPublicTemplates } from '@/lib/firestore/templates.server';
import { getAllPublicFaqs } from '@/lib/firestore/faq.server';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

function toDate(value: any): Date {
  if (!value) return new Date();
  if (value.toDate && typeof value.toDate === 'function') return value.toDate();
  const d = new Date(value);
  if (!isNaN(d.getTime())) return d;
  return new Date();
}

function generateSiteMap(base_url: string, paths: { url: string, lastModified: Date }[], reason?: string): string {
    const stylesheet = '<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>';
    
    if (paths.length === 0) {
        return `<?xml version="1.0" encoding="UTF-8"?>\n${stylesheet}\n<!-- \n  Sitemap is empty. \n  Reason: ${reason || "No indexable content found or all page types are set to 'noindex' in SEO settings."}\n  Check your admin panel under Settings > SEO & Crawling to enable indexing.\n-->\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n</urlset>`;
    }
  
  const urlEntries = paths
    .map(({ url, lastModified }) => {
      if (!url || !lastModified?.toISOString) return '';
      const finalUrl = new URL(url, base_url).href;
      return `
  <url>
    <loc>${finalUrl}</loc>
    <lastmod>${lastModified.toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
    })
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>\n${stylesheet}\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urlEntries}\n</urlset>`;
}

export async function GET() {
  const settings = await getSiteSettings();
  
  if (!settings?.seoConfig?.globalIndexingEnabled) {
      const reason = "Global site indexing is disabled in SEO settings.";
      const sitemap = generateSiteMap(settings?.seoConfig?.baseSiteUrl || '', [], reason);
      return new NextResponse(sitemap, { headers: { 'Content-Type': 'application/xml' } });
  }

  const BASE_URL = settings?.seoConfig?.baseSiteUrl || 'https://www.ampire.studio';
  const rules = settings?.seoConfig?.pageTypeRules;

  const allPaths: { url: string, lastModified: Date }[] = [];

  const [blogPosts, portfolioProjects, templates, faqs] = await Promise.all([
    getAllPublicBlogs(),
    getAllPublicPortfolioProjects(),
    getAllPublicTemplates(),
    getAllPublicFaqs(),
  ]);

  allPaths.push({ url: '/', lastModified: new Date() });
  
  // CORRECTED: Use the most recent FAQ update timestamp for the /faq page.
  let faqLastModified = new Date();
  if (faqs.length > 0) {
      const faqTimestamps = faqs.map(faq => toDate(faq.updatedAt).getTime());
      faqLastModified = new Date(Math.max(...faqTimestamps));
  }

  const staticPages = [
    { type: 'about', url: '/about', lastModified: new Date() },
    { type: 'services', url: '/services', lastModified: new Date() },
    { type: 'portfolio', url: '/portfolio', lastModified: new Date() },
    { type: 'blog', url: '/blog', lastModified: new Date() },
    { type: 'store', url: '/store', lastModified: new Date() },
    { type: 'faq', url: '/faq', lastModified: faqLastModified }, // CORRECTED: Use dynamic lastModified
    { type: 'contact', url: '/contact', lastModified: new Date() },
  ];

  for (const page of staticPages) {
    if (rules && rules[page.type as keyof typeof rules]?.index) {
        allPaths.push({ url: page.url, lastModified: page.lastModified });
    }
  }

  if (rules?.blog?.index && blogPosts.length > 0) {
    const blogPaths = blogPosts.map(post => ({ url: `/blog/${post.slug}`, lastModified: toDate(post.lastModified) }));
    allPaths.push(...blogPaths);
  }

  if (rules?.projectDetail?.index && portfolioProjects.length > 0) {
    const portfolioPaths = portfolioProjects.map(project => ({ url: `/portfolio/${project.slug}`, lastModified: toDate(project.lastModified) }));
    allPaths.push(...portfolioPaths);
  }
  
  if (rules?.templateDetail?.index && templates.length > 0) {
    const templatePaths = templates.map(template => ({ url: `/store/${template.slug}`, lastModified: toDate(template.lastModified) }));
    allPaths.push(...templatePaths);
  }

  const sitemap = generateSiteMap(BASE_URL, allPaths);

  return new NextResponse(sitemap, { headers: { 'Content-Type': 'application/xml' } });
}
