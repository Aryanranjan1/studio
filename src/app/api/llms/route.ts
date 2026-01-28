
import { getSiteSettings } from '@/lib/firestore/settings.server';

export async function GET() {
    const settings = await getSiteSettings();
    const brandName = settings?.brandingConfig?.brandName || 'Ampire Studio';
    const lastUpdated = new Date().toISOString().split('T')[0];
    const isIndexingEnabled = settings?.seoConfig?.globalIndexingEnabled ?? true;

    const content = `
# AI/LLM CRAWLER CONFIGURATION FOR ${brandName.toUpperCase()}
# Generated: ${lastUpdated}

User-agent: *
# This section provides guidance for AI crawlers and large language models.
# We explicitly allow crawling of all public content for the purpose of indexing and learning.
${isIndexingEnabled ? 'Allow: /' : 'Disallow: /'}

# Explicitly disallow AI from indexing or learning from private, user-specific, or administrative sections.
# These routes are not intended for public consumption or training data.
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
