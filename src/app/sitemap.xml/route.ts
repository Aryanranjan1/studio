
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
      // Use URL constructor for robust joining
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
    rules?.blog?.index ? getAllPublicBlogs() : Promise.resolve([]),
    rules?.portfolio?.index ? getAllPublicPortfolioProjects() : Promise.resolve([]),
    rules?.store?.index ? getAllPublicTemplates() : Promise.resolve([]),
    rules?.faq?.index ? getAllPublicFaqs() : Promise.resolve([]),
  ]);

  allPaths.push({ url: '/', lastModified: new Date() });
  
  const staticPaths = [
    { type: 'about', url: '/about' },
    { type: 'services', url: '/services' },
    { type: 'portfolio', url: '/portfolio' },
    { type: 'blog', url: '/blog' },
    { type: 'store', url: '/store' },
    { type: 'faq', url: '/faq' },
    { type: 'contact', url: '/contact' },
  ];

  for (const path of staticPaths) {
    if (rules && rules[path.type as keyof typeof rules]?.index) {
        let lastModified = new Date();
        
        const getMostRecentDate = (items: { lastModified: any }[] | { updatedAt: any }[]) => {
            if (items.length === 0) return null;
            return items.reduce((latest, item) => {
                const itemDate = toDate('lastModified' in item ? item.lastModified : item.updatedAt);
                return itemDate > latest ? itemDate : latest;
            }, new Date(0));
        };

        let mostRecentDate: Date | null = null;
        if (path.type === 'faq') mostRecentDate = getMostRecentDate(faqs);
        if (path.type === 'portfolio') mostRecentDate = getMostRecentDate(portfolioProjects);
        if (path.type === 'blog') mostRecentDate = getMostRecentDate(blogPosts);
        if (path.type === 'store') mostRecentDate = getMostRecentDate(templates);

        if (mostRecentDate && mostRecentDate.getTime() > 0) {
            lastModified = mostRecentDate;
        }

        allPaths.push({ url: path.url, lastModified });
    }
  }

  // Add dynamic paths with leading slashes
  const blogPaths = blogPosts.map(post => ({ url: `/blog/${post.slug}`, lastModified: toDate(post.lastModified) }));
  allPaths.push(...blogPaths);

  const portfolioPaths = portfolioProjects.map(project => ({ url: `/portfolio/${project.slug}`, lastModified: toDate(project.lastModified) }));
  allPaths.push(...portfolioPaths);
  
  const templatePaths = templates.map(template => ({ url: `/store/${template.slug}`, lastModified: toDate(template.lastModified) }));
  allPaths.push(...templatePaths);

  const sitemap = generateSiteMap(BASE_URL, allPaths);

  return new NextResponse(sitemap, { headers: { 'Content-Type': 'application/xml' } });
}
