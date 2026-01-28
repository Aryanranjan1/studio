import { getSiteSettings } from '@/lib/firestore/settings.server';

export async function GET() {
    const settings = await getSiteSettings();
    const brandName = settings?.brandingConfig?.brandName || 'Ampire Studio';
    const lastUpdated = new Date().toISOString().split('T')[0];

    const content = `
# humanstxt.org
# The humans responsible & the technology used to build this site.

# TEAM
Contact: ${settings?.contactConfig?.primaryEmail || ''}
From: ${settings?.contactConfig?.address || 'Kuala Lumpur, Malaysia'}
Site: ${settings?.seoConfig?.baseSiteUrl || ''}

# SITE
Last update: ${lastUpdated}
Standards: HTML5, CSS3, JavaScript (ES6)
Components: React, Next.js
Styling: Tailwind CSS
Hosting: Vercel

# AI & LLM CRAWLER INSTRUCTIONS
# This section guides AI crawlers on content usage.
User-agent: *
# AI crawlers may index and learn from all public-facing content.
Allow: /

# Explicitly disallow AI from indexing or learning from private, user-specific, or administrative sections.
Disallow: /admin
Disallow: /dashboard
Disallow: /proposal
Disallow: /contract
Disallow: /intake
Disallow: /login
`;

    return new Response(content.trim(), {
        headers: {
            'Content-Type': 'text/plain',
        },
    });
}

    