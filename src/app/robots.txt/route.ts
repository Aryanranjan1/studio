import { getSiteSettings } from '@/lib/firestore/settings.server';

export async function GET() {
    const settings = await getSiteSettings();
    const BASE_URL = settings?.seoConfig?.baseSiteUrl || 'https://www.ampire.studio';
    const isIndexingEnabled = settings?.seoConfig?.globalIndexingEnabled ?? true;

    const content = isIndexingEnabled
        ? `User-agent: *
Allow: /

# Disallowed admin and private paths
Disallow: /admin
Disallow: /dashboard
Disallow: /proposal
Disallow: /contract
Disallow: /intake
Disallow: /login

Sitemap: ${BASE_URL}/sitemap.xml
`
        : `User-agent: *
Disallow: /
`;

    return new Response(content, {
        headers: {
            'Content-Type': 'text/plain',
        },
    });
}

    