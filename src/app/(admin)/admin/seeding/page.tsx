'use client';

import { useState } from 'react';
import { useFirestore } from '@/firebase';
import { collection, writeBatch, doc } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Database } from 'lucide-react';
import type { Article } from '@/lib/data';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

function generateSampleArticles(): Omit<Article, 'id'>[] {
    const articles: Omit<Article, 'id'>[] = [];
    const articleCategories = ['Web Design', 'Development', 'Automation', 'Templates', 'Branding', 'Business Strategy', 'Case Studies'];
    
    for (let i = 0; i < 10; i++) {
        const title = [
            'The 5 Pillars of a Successful Website Redesign',
            'From Zero to Hero: A Guide to Business Automation',
            'Why Your Brand Needs a Style Guide, Yesterday',
            'Unlocking Growth: A Case Study in E-commerce SEO',
            '10 Essential Tips for Aspiring Digital Creators',
            'The Developer\'s Guide to Client Communication',
            'Mastering Dark Mode: A Guide to Premium UI',
            'The Future of Headless CMS',
            'Building Performant Web Apps with Next.js',
            'AI in Modern Web Development'
        ][i];
        const slug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
        const date = new Date(2024, i % 12, (i % 28) + 1);

        articles.push({
            title,
            slug,
            date: date.toISOString(),
            lastUpdated: date.toISOString(),
            author: ['Alex Doe', 'Jane Smith', 'Sam Wilson'][i % 3],
            authorImage: `https://picsum.photos/seed/author-img${i % 3}/40/40`,
            excerpt: `A brief look into article number ${i + 1}. This piece explores key concepts and provides actionable advice.`,
            content: `<h1>${title}</h1><p>An introduction to the topic of ${title}. This piece explores key concepts and provides actionable advice.</p><h2 id="section-one">Understanding the Core Concepts</h2><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.</p><h2 id="section-two">Practical Applications</h2><p>Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta.</p><h2 id="conclusion">Final Thoughts</h2><p>Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>`,
            tags: [['Web Dev', 'Future Tech', 'AI'], ['JavaScript', 'React', 'Vue'], ['Performance', 'UX', 'Design']][i % 3],
            category: articleCategories[i % articleCategories.length],
            status: 'published',
            readingTime: Math.floor(Math.random() * 10) + 3,
            featured: i === 0,
            popular: i < 3,
            metaTitle: `${title} | Ampire Studio`,
            metaDescription: `A brief look into article number ${i + 1}. This piece explores key concepts and provides actionable advice.`,
            focusKeyword: ['Redesign', 'Automation', 'Branding', 'SEO', 'Creators', 'Communication', 'UI', 'Headless', 'Next.js', 'AI'][i],
            canonicalUrl: `https://ampire.studio/blog/${slug}`,
            robotsMeta: 'index',
            featuredImage: {
                url: `https://picsum.photos/seed/ablog-cover-${i + 1}/1200/800`,
                alt: `Abstract image for article ${i + 1}`,
            },
            cardImage: {
                url: `https://picsum.photos/seed/ablog-card-${i + 1}/600/400`,
                alt: `Card image for article ${i + 1}`,
            },
            ogImage: {
                url: `https://picsum.photos/seed/ablog-og-${i + 1}/1200/630`,
                alt: `Open Graph image for article ${i + 1}`,
            },
        });
    }
    return articles;
}


export default function SeedingPage() {
    const [isSeeding, setIsSeeding] = useState(false);
    const firestore = useFirestore();
    const { toast } = useToast();

    const handleSeedData = async () => {
        if (!firestore) {
            toast({
                title: "Error",
                description: "Firestore not available.",
                variant: "destructive",
            });
            return;
        }

        setIsSeeding(true);
        try {
            const batch = writeBatch(firestore);
            const articlesToSeed = generateSampleArticles();
            const articlesCollection = collection(firestore, 'blogs');

            articlesToSeed.forEach(article => {
                const docRef = doc(articlesCollection); // Firestore will generate an ID
                batch.set(docRef, article);
            });

            await batch.commit();

            toast({
                title: "Success!",
                description: `${articlesToSeed.length} sample blog posts have been seeded.`,
            });
        } catch (error: any) {
            console.error("Error seeding data: ", error);
            
            // Create a detailed, contextual error log for debugging permissions.
            const permissionError = new FirestorePermissionError({
                path: 'blogs', // The collection path where the batch write occurs.
                operation: 'write', // The operation is a batch write.
                requestResourceData: { info: `Attempted to seed ${generateSampleArticles().length} articles.` }
            });
            
            // Emit the error globally. This will be caught by the FirebaseErrorListener
            // and displayed in the Next.js error overlay for clear debugging.
            errorEmitter.emit('permission-error', permissionError);

        } finally {
            setIsSeeding(false);
        }
    };

    return (
        <>
            <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold md:text-2xl">Data Seeding</h1>
            </div>

            <div className="mt-6 rounded-lg border border-dashed shadow-sm p-8 flex flex-col items-center gap-4 text-center">
                 <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                    <Database className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-2xl font-bold tracking-tight">
                    Seed Sample Data
                </h3>
                <p className="text-sm text-muted-foreground max-w-md">
                    This action will add 10 sample blog posts to your Firestore database. This is useful for development and testing the blog functionality.
                </p>
                <Button onClick={handleSeedData} disabled={isSeeding} size="lg">
                    {isSeeding ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Database className="mr-2 h-4 w-4" />}
                    {isSeeding ? 'Seeding Data...' : 'Seed 10 Blog Posts'}
                </Button>
            </div>
        </>
    );
}
