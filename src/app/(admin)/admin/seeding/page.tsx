'use client';

import { useState } from 'react';
import { useFirestore } from '@/firebase';
import { collection, writeBatch, doc, getDocs } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Database, Trash2 } from 'lucide-react';
import type { Article } from '@/lib/data';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

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
            featured: i < 3, // Make first 3 articles featured
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
    const [isClearing, setIsClearing] = useState(false);
    const firestore = useFirestore();
    const { toast } = useToast();

    const handleSeedData = async () => {
        if (!firestore) {
            toast({ title: "Error", description: "Firestore not available.", variant: "destructive" });
            return;
        }

        setIsSeeding(true);
        try {
            const batch = writeBatch(firestore);
            const articlesToSeed = generateSampleArticles();
            const articlesCollection = collection(firestore, 'blogs');

            articlesToSeed.forEach(article => {
                const docRef = doc(articlesCollection);
                batch.set(docRef, article);
            });

            await batch.commit();

            toast({
                title: "Success!",
                description: `${articlesToSeed.length} sample blog posts have been seeded.`,
            });
        } catch (error: any) {
            console.error("Error seeding data: ", error);
            if (error.code === 'permission-denied') {
                toast({
                    variant: "destructive",
                    title: "Authorization Error",
                    description: "You do not have permission to perform this action. Ensure your user account has an 'admin' role in the '/admin_profiles' collection in Firestore.",
                    duration: 9000,
                });
            } else {
                 toast({ variant: "destructive", title: "Uh oh! Something went wrong.", description: "Could not seed data. Check the console for more details." });
            }
        } finally {
            setIsSeeding(false);
        }
    };
    
    const handleClearData = async () => {
        if (!firestore) {
            toast({ title: "Error", description: "Firestore not available.", variant: "destructive" });
            return;
        }

        setIsClearing(true);
        try {
            const blogsCollection = collection(firestore, 'blogs');
            const blogsSnapshot = await getDocs(blogsCollection);
            
            if (blogsSnapshot.empty) {
                toast({ title: "Info", description: "Blog collection is already empty." });
                setIsClearing(false);
                return;
            }

            const batch = writeBatch(firestore);
            blogsSnapshot.forEach(doc => {
                batch.delete(doc.ref);
            });
            await batch.commit();

            toast({
                title: "Success!",
                description: `Cleared ${blogsSnapshot.size} blog posts.`,
            });

        } catch (error: any) {
            console.error("Error clearing data: ", error);
             if (error.code === 'permission-denied') {
                toast({
                    variant: "destructive",
                    title: "Authorization Error",
                    description: "You do not have permission to perform this action. Ensure you are an admin.",
                    duration: 9000,
                });
            } else {
                 toast({ variant: "destructive", title: "Uh oh! Something went wrong.", description: "Could not clear data. Check the console." });
            }
        } finally {
            setIsClearing(false);
        }
    };

    return (
        <>
            <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold md:text-2xl">Data Management</h1>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mt-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Seed Sample Data</CardTitle>
                        <CardDescription>
                        This will add 10 sample blog posts to your Firestore database. Useful for development and testing.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button onClick={handleSeedData} disabled={isSeeding || isClearing} className="w-full">
                        {isSeeding ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Database className="mr-2 h-4 w-4" />}
                        {isSeeding ? 'Seeding...' : 'Seed 10 Blog Posts'}
                        </Button>
                    </CardContent>
                </Card>

                <Card className="border-destructive">
                    <CardHeader>
                        <CardTitle className="text-destructive">Clear Blog Data</CardTitle>
                        <CardDescription>
                        This will permanently delete all blog posts from your database. This action cannot be undone.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="destructive" className="w-full" disabled={isClearing || isSeeding}>
                                {isClearing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Trash2 className="mr-2 h-4 w-4" />}
                                Clear All Posts
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete all {`blog`} posts from the database.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                                onClick={handleClearData}
                                className="bg-destructive hover:bg-destructive/90"
                            >
                                Yes, delete everything
                            </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                        </AlertDialog>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
