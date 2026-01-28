
import { getSiteSettings } from '@/lib/firestore/settings.server';
import { getAllPublicBlogs } from '@/lib/firestore/blog.server';
import { getAllPublicPortfolioProjects } from '@/lib/firestore/portfolio.server';
import { getAllPublicTemplates } from '@/lib/firestore/templates.server';

export const dynamic = 'force-dynamic';

// Helper function to safely convert a maybe-timestamp to a Date
function toDate(value: any): Date {
  if (!value) {
    // Return a recent date if value is missing
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
  const BASE_URL = settings?.seoConfig?.baseSiteUrl || 'https://www.ampire.studio';
  const rules = settings?.seoConfig?.pageTypeRules;

  const allPaths: { url: string, lastModified: Date }[] = [];

  // Static paths (add only if their type is indexable)
  const staticPaths = [
    { type: 'about', url: '/about', lastModified: new Date() },
    { type: 'services', url: '/services', lastModified: new Date() },
    { type: 'portfolio', url: '/portfolio', lastModified: new Date() },
    { type: 'blog', url: '/blog', lastModified: new Date() },
    { type: 'store', url: '/store', lastModified: new Date() },
    { type: 'faq', url: '/faq', lastModified: new Date() },
    { type: 'contact', url: '/contact', lastModified: new Date() },
  ];
  
  // Add root path always
  allPaths.push({ url: '/', lastModified: new Date() });

  staticPaths.forEach(path => {
    if (rules && rules[path.type as keyof typeof rules]?.index) {
      allPaths.push({ url: path.url, lastModified: path.lastModified });
    }
  });


  // Dynamic paths from Firestore
  if (rules?.blog?.index) {
    const blogPosts = await getAllPublicBlogs();
    const blogPaths = blogPosts.map(post => ({
      url: `/blog/${post.slug}`,
      lastModified: toDate(post.lastUpdated),
    }));
    allPaths.push(...blogPaths);
  }

  if (rules?.portfolio?.index) {
    const portfolioProjects = await getAllPublicPortfolioProjects();
    const portfolioPaths = portfolioProjects.map(project => ({
      url: `/portfolio/${project.slug}`,
      lastModified: toDate(project.lastUpdated),
    }));
    allPaths.push(...portfolioPaths);
  }
  
  if (rules?.store?.index) {
    const templates = await getAllPublicTemplates();
    const templatePaths = templates.map(template => ({
        url: `/store/${template.slug}`,
        lastModified: toDate(template.updatedAt),
    }));
    allPaths.push(...templatePaths);
  }

  const sitemap = generateSiteMap(BASE_URL, allPaths);

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
