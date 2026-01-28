import { getSiteSettings } from '@/lib/firestore/settings.server';
import { getAllPublicBlogs } from '@/lib/firestore/blog.server';
import { getAllPublicPortfolioProjects } from '@/lib/firestore/portfolio.server';
import { getAllPublicTemplates } from '@/lib/firestore/templates.server';

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

  const staticPaths = [
    { url: '/', lastModified: new Date() },
    { url: '/about', lastModified: new Date() },
    { url: '/services', lastModified: new Date() },
    { url: '/portfolio', lastModified: new Date() },
    { url: '/blog', lastModified: new Date() },
    { url: '/store', lastModified: new Date() },
    { url: '/faq', lastModified: new Date() },
    { url: '/contact', lastModified: new Date() },
  ];

  const blogPosts = await getAllPublicBlogs();
  const blogPaths = blogPosts.map(post => ({
    url: `/blog/${post.slug}`,
    lastModified: post.lastUpdated ? new Date(post.lastUpdated) : new Date(),
  }));

  const portfolioProjects = await getAllPublicPortfolioProjects();
  const portfolioPaths = portfolioProjects.map(project => ({
    url: `/portfolio/${project.slug}`,
    lastModified: project.lastUpdated ? new Date(project.lastUpdated) : new Date(),
  }));
  
  const templates = await getAllPublicTemplates();
  const templatePaths = templates.map(template => ({
      url: `/store/${template.slug}`,
      lastModified: template.updatedAt?.toDate ? template.updatedAt.toDate() : new Date(),
  }));


  const allPaths = [...staticPaths, ...blogPaths, ...portfolioPaths, ...templatePaths];

  const sitemap = generateSiteMap(BASE_URL, allPaths);

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
