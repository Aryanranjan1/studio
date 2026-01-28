
import { getSiteSettings } from '@/lib/firestore/settings.server';

export async function GET() {
    const settings = await getSiteSettings();
    
    // Default content to serve if nothing is configured in the database.
    const defaultContent = `User-agent: *
# This section provides guidance for AI crawlers and large language models.
# We explicitly allow crawling of all public content for the purpose of indexing and learning.
Allow: /

# Explicitly disallow AI from indexing or learning from private, user-specific, or administrative sections.
# These routes are not intended for public consumption or training data.
Disallow: /admin
Disallow: /dashboard
Disallow: /proposal/
Disallow: /contract/
Disallow: /intake/
Disallow: /login
`;

    // Use the content from settings if available, otherwise fall back to the default.
    const content = settings?.seoConfig?.llmsTxtContent || defaultContent;

    return new Response(content.trim(), {
        headers: {
            'Content-Type': 'text/plain',
        },
    });
}
