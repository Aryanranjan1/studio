
import { getSiteSettings } from '@/lib/firestore/settings.server';
import { getAllPublicBlogs } from '@/lib/firestore/blog.server';
import { getAllPublicPortfolioProjects } from '@/lib/firestore/portfolio.server';
import { getAllPublicTemplates } from '@/lib/firestore/templates.server';
import { getAllPublicFaqs } from '@/lib/firestore/faq.server';

export const dynamic = 'force-dynamic';

/**
 * Helper function to safely convert a maybe-timestamp to a Date object.
 * Handles Firestore Timestamps, ISO strings, and undefined/null values.
 * @param {any} value - The value to convert.
 * @returns {Date} A valid Date object.
 */
function toDate(value: any): Date {
  if (!value) {
    // Return a recent date if value is missing to avoid sitemap errors.
    return new Date(); 
  }
  // Firestore Timestamps have a toDate method
  if (value.toDate && typeof value.toDate === 'function') {
    return value.toDate();
  }
  // Handle ISO strings or other date-parseable formats
  const d = new Date(value);
  if (!isNaN(d.getTime())) {
    return d;
  }
  // Fallback for unexpected formats
  return new Date();
}

/**
 * Generates the sitemap XML string from an array of paths.
 * If the paths array is empty, it includes a comment explaining why.
 * @param {string} base_url - The base URL of the site.
 * @param {{ url: string, lastModified: Date }[]} paths - Array of path objects.
 * @param {string} [reason] - An optional reason for why the sitemap might be empty.
 * @returns {string} The complete sitemap XML as a string.
 */
function generateSiteMap(base_url: string, paths: { url: string, lastModified: Date }[], reason?: string): string {
    if (paths.length === 0) {
        return `<?xml version="1.0" encoding="UTF-8"?>
<!-- 
  Sitemap is empty. 
  Reason: ${reason || "No indexable content found or all page types are set to 'noindex' in SEO settings."}
  Check your admin panel under Settings > SEO & Crawling to enable indexing.
-->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
</urlset>`;
    }
  
  const urlEntries = paths
    .map(({ url, lastModified }) => {
      // Basic validation to prevent errors with malformed data
      if (!url || !lastModified?.toISOString) {
        return '';
      }
      return `
  <url>
    <loc>${`${base_url}${url}`}</loc>
    <lastmod>${lastModified.toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
    })
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urlEntries}
</urlset>`;
}

export async function GET() {
  const settings = await getSiteSettings();
  
  // Immediately return empty sitemap if global indexing is disabled.
  if (!settings?.seoConfig?.globalIndexingEnabled) {
      const reason = "Global site indexing is disabled in SEO settings.";
      const sitemap = generateSiteMap(settings?.seoConfig?.baseSiteUrl || '', [], reason);
      return new Response(sitemap, {
        headers: { 'Content-Type': 'application/xml' },
      });
  }

  const BASE_URL = settings?.seoConfig?.baseSiteUrl || 'https://www.ampire.studio';
  const rules = settings?.seoConfig?.pageTypeRules;

  const allPaths: { url: string, lastModified: Date }[] = [];

  // 1. Fetch all data in parallel based on indexing rules
  const [blogPosts, portfolioProjects, templates, faqs] = await Promise.all([
    rules?.blog?.index ? getAllPublicBlogs() : Promise.resolve([]),
    rules?.portfolio?.index ? getAllPublicPortfolioProjects() : Promise.resolve([]),
    rules?.store?.index ? getAllPublicTemplates() : Promise.resolve([]),
    rules?.faq?.index ? getAllPublicFaqs() : Promise.resolve([]),
  ]);

  // 2. Add root path
  allPaths.push({ url: '/', lastModified: new Date() });
  
  // 3. Add static paths if they are indexable according to settings
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
        let lastModified = new Date(); // Default
        
        if (path.type === 'faq' && faqs.length > 0) {
             const mostRecentFaqDate = faqs.reduce((latest, faq) => {
                const faqDate = toDate(faq.updatedAt);
                return faqDate > latest ? faqDate : latest;
            }, new Date(0));
            if (mostRecentFaqDate.getTime() > 0) {
               lastModified = mostRecentFaqDate;
            }
        }

        allPaths.push({ url: path.url, lastModified });
    }
  }

  // 4. Add dynamic paths from the fetched data
  const blogPaths = blogPosts.map(post => ({
    url: `/blog/${post.slug}`,
    lastModified: toDate(post.lastModified),
  }));
  allPaths.push(...blogPaths);

  const portfolioPaths = portfolioProjects.map(project => ({
    url: `/portfolio/${project.slug}`,
    lastModified: toDate(project.lastModified),
  }));
  allPaths.push(...portfolioPaths);
  
  const templatePaths = templates.map(template => ({
      url: `/store/${template.slug}`,
      lastModified: toDate(template.lastModified),
  }));
  allPaths.push(...templatePaths);

  // 5. Generate the final XML
  const sitemap = generateSiteMap(BASE_URL, allPaths);

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
