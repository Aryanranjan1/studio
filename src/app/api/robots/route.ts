
import { getSiteSettings } from '@/lib/firestore/settings.server';

export const dynamic = 'force-dynamic';

export async function GET() {
    const settings = await getSiteSettings();
    const BASE_URL = settings?.seoConfig?.baseSiteUrl || 'http://localhost:9003'; // Fallback for local dev

    // Default content if nothing is set in the database.
    // The {SITEMAP_URL} placeholder will be replaced.
    const defaultContent = `User-agent: *
Allow: /

# Disallowed admin and private paths
Disallow: /admin/
Disallow: /dashboard/
Disallow: /proposal/
Disallow: /contract/
Disallow: /intake/
Disallow: /login

Sitemap: {SITEMAP_URL}
`;

    // Use content from settings if available, otherwise use default.
    let content = settings?.seoConfig?.robotsTxtContent || defaultContent;
    
    // Dynamically and correctly replace the placeholder with the full sitemap URL.
    content = content.replace(/{SITEMAP_URL}/g, `${BASE_URL}/sitemap.xml`);

    return new Response(content.trim(), {
        headers: {
            'Content-Type': 'text/plain',
        },
    });
}
