
'use client';

import { useState } from 'react';
import { useFirestore } from '@/firebase';
import { collection, writeBatch, doc, getDocs, serverTimestamp } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Database, Trash2 } from 'lucide-react';
import type { Article, PortfolioProject, FaqItem, Template } from '@/lib/data';
import { getProjects, getTemplates } from '@/lib/data';
import { slugify } from '@/lib/slugify';
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
            featured: i < 3,
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

function generateSampleProjects(): Omit<PortfolioProject, 'id'>[] {
    const projects = getProjects();

    return projects.map((p, i) => {
        const now = new Date();
        now.setDate(now.getDate() - (projects.length - i));

        return {
            title: p.title,
            slug: slugify(p.title),
            summary: p.description,
            category: p.category || 'Uncategorized',
            technologies: p.technologies,
            projectYear: '2024',
            projectUrl: p.url,
            longDescription: p.longDescription,
            featuredImage: {
                url: p.image,
                alt: p.imageAlt,
            },
            cardImage: {
                url: p.image,
                alt: p.imageAlt,
            },
            galleryImages: p.images.map(img => ({ url: img.src, alt: img.alt })),
            published: true,
            publishDate: now.toISOString(),
            lastUpdated: now.toISOString(),
            metaTitle: p.title,
            metaDescription: p.description,
            robotsMeta: 'index',
        };
    });
}

function generateSampleFaqs(): Omit<FaqItem, 'id' | 'createdAt' | 'updatedAt'>[] {
    const faqs: Omit<FaqItem, 'id' | 'createdAt' | 'updatedAt'>[] = [
        {
            question: 'What is your revision policy?',
            answer: '<p>We offer <strong>one full revision round</strong> on the prototype and <strong>one final revision round</strong> on the staging build. Additional revisions are billed at our hourly rate. This ensures the project stays on track and within scope.</p>',
            preview: 'We offer one revision on the prototype and one on the final build. Additional revisions are billed hourly.',
            category: 'Revisions & Support',
            order: 1,
            published: true,
        },
        {
            question: 'What are your payment terms?',
            answer: '<p>We require a <strong>50% down payment</strong> to begin work, with the remaining 50% due upon project completion and before final asset delivery or site launch.</p>',
            preview: '50% upfront, 50% on completion before launch.',
            category: 'Pricing & Payments',
            order: 2,
            published: true,
        },
        {
            question: 'How long does a typical project take?',
            answer: '<p>A standard custom website build typically takes <strong>4-6 weeks</strong> from start to finish. Timelines can vary depending on project complexity and client feedback speed.</p>',
            preview: 'A standard custom website build usually takes 4-6 weeks.',
            category: 'Onboarding & Process',
            order: 3,
            published: true,
        },
        {
            question: 'Do you provide hosting and domain services?',
            answer: '<p>Yes, for our Custom Website and Enterprise plans, we include <strong>1 year of basic hosting</strong> and a <strong>free domain name registration</strong> (up to RM50 value) to get you started without any extra hassle.</p>',
            preview: 'Yes, our Custom and Enterprise plans include 1 year of basic hosting and a free domain name.',
            category: 'Pricing & Payments',
            order: 4,
            published: true,
        },
        {
            question: 'Can I update the website myself after it\'s built?',
            answer: '<p>Absolutely. All our custom builds come with a <strong>full Content Management System (CMS)</strong> that allows you to easily update text, images, blog posts, and other content without needing any coding knowledge.</p>',
            preview: 'Yes, all our custom sites include a full CMS so you can easily manage your content.',
            category: 'Development & Integrations',
            order: 5,
            published: true,
        }
    ];
    return faqs;
}

function generateSampleTemplates(): Omit<Template, 'id'>[] {
    const templates = getTemplates(); // The original static data function

    return templates.map(t => {
        return {
            title: t.title,
            slug: slugify(t.title),
            shortDescription: t.description,
            longDescription: t.longDescription,
            price: t.price,
            category: t.category || 'uncategorized',
            tags: t.tags,
            technologies: t.technologies,
            specs: t.specs,
            features: t.features,
            previewUrl: t.url,
            cardImage: { url: t.image, alt: t.imageAlt },
            galleryImages: t.images.map(img => ({ url: img.src, alt: img.alt })),
            bestSeller: t.bestSeller || false,
            isNew: t.isNew || false,
            version: t.version || '1.0.0',
            published: true,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        }
    });
}


export default function SeedingPage() {
    const [isSeedingBlogs, setIsSeedingBlogs] = useState(false);
    const [isClearingBlogs, setIsClearingBlogs] = useState(false);
    const [isSeedingProjects, setIsSeedingProjects] = useState(false);
    const [isClearingProjects, setIsClearingProjects] = useState(false);
    const [isSeedingFaqs, setIsSeedingFaqs] = useState(false);
    const [isClearingFaqs, setIsClearingFaqs] = useState(false);
    const [isSeedingTemplates, setIsSeedingTemplates] = useState(false);
    const [isClearingTemplates, setIsClearingTemplates] = useState(false);
    const firestore = useFirestore();
    const { toast } = useToast();

    const handleSeedBlogs = async () => {
        if (!firestore) return;
        setIsSeedingBlogs(true);
        try {
            const batch = writeBatch(firestore);
            const articlesToSeed = generateSampleArticles();
            const articlesCollection = collection(firestore, 'blogs');
            articlesToSeed.forEach(article => batch.set(doc(articlesCollection), article));
            await batch.commit();
            toast({ title: "Success!", description: `${articlesToSeed.length} sample blog posts seeded.` });
        } catch (error: any) {
            handleFirestoreError(error, "Could not seed blog data.");
        } finally {
            setIsSeedingBlogs(false);
        }
    };
    
    const handleClearBlogs = async () => {
        if (!firestore) return;
        setIsClearingBlogs(true);
        try {
            const blogsCollection = collection(firestore, 'blogs');
            const snapshot = await getDocs(blogsCollection);
            if (snapshot.empty) {
                toast({ title: "Info", description: "Blog collection is already empty." });
                setIsClearingBlogs(false);
                return;
            }
            const batch = writeBatch(firestore);
            snapshot.forEach(doc => batch.delete(doc.ref));
            await batch.commit();
            toast({ title: "Success!", description: `Cleared ${snapshot.size} blog posts.` });
        } catch (error: any) {
            handleFirestoreError(error, "Could not clear blog data.");
        } finally {
            setIsClearingBlogs(false);
        }
    };
    
    const handleSeedProjects = async () => {
        if (!firestore) return;
        setIsSeedingProjects(true);
        try {
            const batch = writeBatch(firestore);
            const projectsToSeed = generateSampleProjects();
            const projectsCollection = collection(firestore, 'projects');
            projectsToSeed.forEach(project => batch.set(doc(projectsCollection), project));
            await batch.commit();
            toast({ title: "Success!", description: `${projectsToSeed.length} sample projects seeded.` });
        } catch (error: any) {
            handleFirestoreError(error, "Could not seed project data.");
        } finally {
            setIsSeedingProjects(false);
        }
    };
    
    const handleClearProjects = async () => {
        if (!firestore) return;
        setIsClearingProjects(true);
        try {
            const projectsCollection = collection(firestore, 'projects');
            const snapshot = await getDocs(projectsCollection);
            if (snapshot.empty) {
                toast({ title: "Info", description: "Projects collection is already empty." });
                setIsClearingProjects(false);
                return;
            }
            const batch = writeBatch(firestore);
            snapshot.forEach(doc => batch.delete(doc.ref));
            await batch.commit();
            toast({ title: "Success!", description: `Cleared ${snapshot.size} projects.` });
        } catch (error: any) {
            handleFirestoreError(error, "Could not clear project data.");
        } finally {
            setIsClearingProjects(false);
        }
    };
    
    const handleSeedFaqs = async () => {
        if (!firestore) return;
        setIsSeedingFaqs(true);
        try {
            const batch = writeBatch(firestore);
            const faqsToSeed = generateSampleFaqs();
            const faqsCollection = collection(firestore, 'faqs');
            faqsToSeed.forEach(faq => {
                const docRef = doc(faqsCollection);
                batch.set(docRef, {
                    ...faq,
                    createdAt: serverTimestamp(),
                    updatedAt: serverTimestamp(),
                });
            });
            await batch.commit();
            toast({ title: "Success!", description: `${faqsToSeed.length} sample FAQs seeded.` });
        } catch (error: any) {
            handleFirestoreError(error, "Could not seed FAQ data.");
        } finally {
            setIsSeedingFaqs(false);
        }
    };

    const handleClearFaqs = async () => {
        if (!firestore) return;
        setIsClearingFaqs(true);
        try {
            const faqsCollection = collection(firestore, 'faqs');
            const snapshot = await getDocs(faqsCollection);
            if (snapshot.empty) {
                toast({ title: "Info", description: "FAQ collection is already empty." });
                setIsClearingFaqs(false);
                return;
            }
            const batch = writeBatch(firestore);
            snapshot.forEach(doc => batch.delete(doc.ref));
            await batch.commit();
            toast({ title: "Success!", description: `Cleared ${snapshot.size} FAQs.` });
        } catch (error: any) {
            handleFirestoreError(error, "Could not clear FAQ data.");
        } finally {
            setIsClearingFaqs(false);
        }
    };

    const handleSeedTemplates = async () => {
        if (!firestore) return;
        setIsSeedingTemplates(true);
        try {
            const batch = writeBatch(firestore);
            const templatesToSeed = generateSampleTemplates();
            const templatesCollection = collection(firestore, 'templates');
            templatesToSeed.forEach(template => batch.set(doc(templatesCollection), template));
            await batch.commit();
            toast({ title: "Success!", description: `${templatesToSeed.length} sample templates seeded.` });
        } catch (error: any) {
            handleFirestoreError(error, "Could not seed template data.");
        } finally {
            setIsSeedingTemplates(false);
        }
    };

    const handleClearTemplates = async () => {
        if (!firestore) return;
        setIsClearingTemplates(true);
        try {
            const templatesCollection = collection(firestore, 'templates');
            const snapshot = await getDocs(templatesCollection);
            if (snapshot.empty) {
                toast({ title: "Info", description: "Templates collection is already empty." });
                setIsClearingTemplates(false);
                return;
            }
            const batch = writeBatch(firestore);
            snapshot.forEach(doc => batch.delete(doc.ref));
            await batch.commit();
            toast({ title: "Success!", description: `Cleared ${snapshot.size} templates.` });
        } catch (error: any) {
            handleFirestoreError(error, "Could not clear template data.");
        } finally {
            setIsClearingTemplates(false);
        }
    };

    const handleFirestoreError = (error: any, defaultMessage: string) => {
        console.error("Firestore operation error: ", error);
        if (error.code === 'permission-denied') {
            toast({
                variant: "destructive",
                title: "Authorization Error",
                description: "You do not have permission to perform this action. Ensure you are an admin.",
                duration: 9000,
            });
        } else {
             toast({ variant: "destructive", title: "Uh oh! Something went wrong.", description: defaultMessage });
        }
    };
    
    const isActionInProgress = isSeedingBlogs || isClearingBlogs || isSeedingProjects || isClearingProjects || isSeedingFaqs || isClearingFaqs || isSeedingTemplates || isClearingTemplates;

    return (
        <>
            <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold md:text-2xl">Data Management</h1>
            </div>

            <div className="mt-6">
                <h2 className="text-xl font-semibold mb-4">Blog Posts</h2>
                <div className="grid md:grid-cols-2 gap-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Seed Sample Blog Posts</CardTitle>
                            <CardDescription>
                            Adds 10 sample posts to the 'blogs' collection. Useful for development and testing.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button onClick={handleSeedBlogs} disabled={isActionInProgress} className="w-full">
                            {isSeedingBlogs ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Database className="mr-2 h-4 w-4" />}
                            {isSeedingBlogs ? 'Seeding...' : 'Seed 10 Blog Posts'}
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="border-destructive">
                        <CardHeader>
                            <CardTitle className="text-destructive">Clear Blog Data</CardTitle>
                            <CardDescription>
                            Permanently deletes all documents from the 'blogs' collection. This cannot be undone.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="destructive" className="w-full" disabled={isActionInProgress}>
                                    {isClearingBlogs ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Trash2 className="mr-2 h-4 w-4" />}
                                    Clear All Posts
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This will permanently delete all posts from the 'blogs' collection.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={handleClearBlogs} className="bg-destructive hover:bg-destructive/90">
                                    Yes, delete all blog posts
                                </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                            </AlertDialog>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <div className="mt-12 pt-8 border-t">
                <h2 className="text-xl font-semibold mb-4">Portfolio Projects</h2>
                <div className="grid md:grid-cols-2 gap-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Seed Sample Projects</CardTitle>
                            <CardDescription>
                                Adds sample projects from your static data file to the 'projects' collection.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button onClick={handleSeedProjects} disabled={isActionInProgress} className="w-full">
                            {isSeedingProjects ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Database className="mr-2 h-4 w-4" />}
                            {isSeedingProjects ? 'Seeding...' : 'Seed All Projects'}
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="border-destructive">
                        <CardHeader>
                            <CardTitle className="text-destructive">Clear Project Data</CardTitle>
                            <CardDescription>
                            Permanently deletes all documents from the 'projects' collection. This cannot be undone.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="destructive" className="w-full" disabled={isActionInProgress}>
                                    {isClearingProjects ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Trash2 className="mr-2 h-4 w-4" />}
                                    Clear All Projects
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This will permanently delete all projects from the 'projects' collection.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={handleClearProjects} className="bg-destructive hover:bg-destructive/90">
                                    Yes, delete all projects
                                </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                            </AlertDialog>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <div className="mt-12 pt-8 border-t">
                <h2 className="text-xl font-semibold mb-4">FAQs</h2>
                <div className="grid md:grid-cols-2 gap-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Seed Sample FAQs</CardTitle>
                            <CardDescription>
                                Adds sample FAQs to the 'faqs' collection. Useful for development and testing.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button onClick={handleSeedFaqs} disabled={isActionInProgress} className="w-full">
                            {isSeedingFaqs ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Database className="mr-2 h-4 w-4" />}
                            {isSeedingFaqs ? 'Seeding...' : 'Seed Sample FAQs'}
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="border-destructive">
                        <CardHeader>
                            <CardTitle className="text-destructive">Clear FAQ Data</CardTitle>
                            <CardDescription>
                            Permanently deletes all documents from the 'faqs' collection. This cannot be undone.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="destructive" className="w-full" disabled={isActionInProgress}>
                                    {isClearingFaqs ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Trash2 className="mr-2 h-4 w-4" />}
                                    Clear All FAQs
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This will permanently delete all FAQs from the 'faqs' collection.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={handleClearFaqs} className="bg-destructive hover:bg-destructive/90">
                                    Yes, delete all FAQs
                                </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                            </AlertDialog>
                        </CardContent>
                    </Card>
                </div>
            </div>
            <div className="mt-12 pt-8 border-t">
                <h2 className="text-xl font-semibold mb-4">Templates</h2>
                <div className="grid md:grid-cols-2 gap-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Seed Sample Templates</CardTitle>
                            <CardDescription>
                                Adds sample templates from your static data file to the 'templates' collection.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button onClick={handleSeedTemplates} disabled={isActionInProgress} className="w-full">
                            {isSeedingTemplates ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Database className="mr-2 h-4 w-4" />}
                            {isSeedingTemplates ? 'Seeding...' : 'Seed Sample Templates'}
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="border-destructive">
                        <CardHeader>
                            <CardTitle className="text-destructive">Clear Template Data</CardTitle>
                            <CardDescription>
                            Permanently deletes all documents from the 'templates' collection. This cannot be undone.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="destructive" className="w-full" disabled={isActionInProgress}>
                                    {isClearingTemplates ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Trash2 className="mr-2 h-4 w-4" />}
                                    Clear All Templates
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This will permanently delete all templates from the 'templates' collection.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={handleClearTemplates} className="bg-destructive hover:bg-destructive/90">
                                    Yes, delete all templates
                                </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                            </AlertDialog>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}

    