
import { getSiteSettings } from '@/lib/firestore/settings.server';
import { getAllPublicBlogs } from '@/lib/firestore/blog.server';
import { getAllPublicPortfolioProjects } from '@/lib/firestore/portfolio.server';
import { getAllPublicTemplates } from '@/lib/firestore/templates.server';

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
 * @param {string} base_url - The base URL of the site.
 * @param {{ url: string, lastModified: Date }[]} paths - Array of path objects.
 * @returns {string} The complete sitemap XML as a string.
 */
function generateSiteMap(base_url: string, paths: { url: string, lastModified: Date }[]): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     ${paths
       .map(({ url, lastModified }) => {
         return `
       <url>
           <loc>${`${base_url}${url}`}</loc>
           <lastmod>${lastModified.toISOString()}</lastmod>
           <changefreq>weekly</changefreq>
           <priority>0.8</priority>
       </url>
     `;
       })
       .join('')}
   </urlset>
 `;
}

export async function GET() {
  const settings = await getSiteSettings();
  
  // Immediately return empty sitemap if global indexing is disabled.
  if (!settings?.seoConfig?.globalIndexingEnabled) {
      return new Response(generateSiteMap(settings?.seoConfig?.baseSiteUrl || '', []), {
        headers: { 'Content-Type': 'application/xml' },
      });
  }

  const BASE_URL = settings?.seoConfig?.baseSiteUrl || 'https://www.ampire.studio';
  const rules = settings?.seoConfig?.pageTypeRules;

  const allPaths: { url: string, lastModified: Date }[] = [];

  // 1. Add root path unconditionally
  allPaths.push({ url: '/', lastModified: new Date() });
  
  // 2. Add static paths if they are indexable according to settings
  const staticPaths = [
    { type: 'about', url: '/about' },
    { type: 'services', url: '/services' },
    { type: 'portfolio', url: '/portfolio' },
    { type: 'blog', url: '/blog' },
    { type: 'store', url: '/store' },
    { type: 'faq', url: '/faq' },
    { type: 'contact', url: '/contact' },
  ];

  staticPaths.forEach(path => {
    if (rules && rules[path.type as keyof typeof rules]?.index) {
      allPaths.push({ url: path.url, lastModified: new Date() });
    }
  });


  // 3. Add dynamic paths from Firestore if their type is indexable
  if (rules?.blog?.index) {
    const blogPosts = await getAllPublicBlogs();
    const blogPaths = blogPosts.map(post => ({
      url: `/blog/${post.slug}`,
      lastModified: toDate(post.lastModified),
    }));
    allPaths.push(...blogPaths);
  }

  if (rules?.portfolio?.index) {
    const portfolioProjects = await getAllPublicPortfolioProjects();
    const portfolioPaths = portfolioProjects.map(project => ({
      url: `/portfolio/${project.slug}`,
      lastModified: toDate(project.lastModified),
    }));
    allPaths.push(...portfolioPaths);
  }
  
  if (rules?.store?.index) {
    const templates = await getAllPublicTemplates();
    const templatePaths = templates.map(template => ({
        url: `/store/${template.slug}`,
        lastModified: toDate(template.lastModified),
    }));
    allPaths.push(...templatePaths);
  }

  // 4. Generate the final XML
  const sitemap = generateSiteMap(BASE_URL, allPaths);

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
