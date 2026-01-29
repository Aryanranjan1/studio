
'use client';

import { useState } from 'react';
import { useFirestore } from '@/firebase';
import { collection, writeBatch, doc, getDocs, serverTimestamp } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Database, Trash2 } from 'lucide-react';
import type { Article, PortfolioProject, FaqItem, Template, Testimonial } from '@/lib/data';
import { updateSiteSettings, type SiteConfiguration } from '@/lib/firestore/settings';
import { getProjects, getTemplates, getTestimonials } from '@/lib/data';
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
            question: 'How long does it take to build a small business website in Malaysia?',
            answer: '<p>The timeline for a small business website in Malaysia typically ranges from two to six weeks, depending on the scope, content readiness, and approval speed. A simple informational site moves faster, while custom features, integrations, or automation add time.</p><p>As a web agency, Ampire Studio plans timelines around business goals rather than rushing delivery, ensuring the site is structured to generate enquiries and support growth instead of just going live quickly.</p>',
            preview: 'Typical timelines for small business website development in Malaysia.',
            category: 'Website Development',
            order: 1,
            published: true,
        },
        {
            question: 'What is the difference between a template website and a custom website?',
            answer: '<p>A template website uses pre-designed layouts with limited flexibility, making it faster and cheaper to launch but often restrictive in branding, performance, and conversion optimisation.</p><p>A custom website is built around a business’s specific goals, user journey, and content structure. Ampire Studio, a digital agency in Malaysia, typically recommends custom builds for businesses that want stronger SEO, better lead quality, and room to scale.</p>',
            preview: 'Understanding template versus custom website development approaches.',
            category: 'Website Development',
            order: 2,
            published: true,
        },
        {
            question: 'Do local businesses in Malaysia really need a website in 2026?',
            answer: '<p>In 2026, a website acts as a credibility checkpoint for local businesses in Malaysia, even when customers first discover brands through social media or marketplaces.</p><p>Without a website, businesses lose control over messaging, search visibility, and lead capture. Ampire Studio works with local businesses to ensure their websites support trust, discovery, and enquiries rather than existing as static brochures.</p>',
            preview: 'Why websites still matter for Malaysian local businesses.',
            category: 'Website Development',
            order: 3,
            published: true,
            link: {
                href: 'https://www.ampirestudio.com/blog/do-local-businesses-in-malaysia-really-need-a-website-in-2026',
                text: 'do local businesses in Malaysia really need a website'
            }
        },
        {
            question: 'Why does my website get traffic but no enquiries?',
            answer: '<p>Traffic without enquiries usually means the website is attracting the wrong audience or failing to guide visitors toward action. Common issues include unclear messaging, weak calls-to-action, or slow performance.</p><p>As a web agency, Ampire Studio audits user flow, content intent, and technical setup to align traffic with business goals, turning visits into qualified leads instead of empty metrics.</p>',
            preview: 'Common reasons websites fail to convert visitors into leads.',
            category: 'Website Development',
            order: 4,
            published: true,
            link: {
                href: 'https://www.ampirestudio.com/blog/why-your-website-gets-traffic-but-no-leads-small-business-edition',
                text: 'why websites get traffic but no leads'
            }
        },
        {
            question: 'Can an existing website be improved without rebuilding it from scratch?',
            answer: '<p>Many websites can be improved through targeted changes such as speed optimisation, content restructuring, SEO fixes, and conversion improvements without a full rebuild.</p><p>Ampire Studio, a digital agency in Malaysia, typically evaluates whether incremental improvements will deliver measurable impact before recommending a complete redesign, saving businesses time and cost where possible.</p>',
            preview: 'When optimisation is better than a full website rebuild.',
            category: 'Website Development',
            order: 5,
            published: true,
        },
        {
            question: 'What pages are essential for a small business website?',
            answer: '<p>Most small business websites need a clear homepage, services or offerings page, about page, contact page, and basic trust elements such as testimonials or case examples.</p><p>As a web agency, Ampire Studio structures these pages around user intent so visitors quickly understand what the business does, who it is for, and how to make contact.</p>',
            preview: 'Core website pages every small business should have.',
            category: 'Website Development',
            order: 6,
            published: true,
        },
        {
            question: 'How does website speed affect SEO and lead generation?',
            answer: '<p>Slow websites increase bounce rates, reduce search rankings, and frustrate users, directly impacting both visibility and conversions.</p><p>Ampire Studio focuses on performance optimisation because faster websites not only rank better on Google but also keep visitors engaged long enough to enquire or purchase.</p>',
            preview: 'Why website speed directly impacts rankings and enquiries.',
            category: 'Website Development',
            order: 7,
            published: true,
        },
        {
            question: 'What happens after a business website goes live?',
            answer: '<p>After launch, a website should be monitored for performance, user behaviour, and technical issues. Launch is the starting point, not the finish line.</p><p>As a digital agency in Malaysia, Ampire Studio supports post-launch optimisation so businesses can improve SEO, refine messaging, and increase lead quality over time.</p>',
            preview: 'What businesses should expect after website launch.',
            category: 'Website Development',
            order: 8,
            published: true,
        },
        {
            question: 'What is website automation and how does it help small businesses?',
            answer: '<p>Website automation uses software logic to handle repetitive tasks such as form responses, lead routing, appointment bookings, or follow-ups without manual effort.</p><p>Ampire Studio, a digital agency in Malaysia, implements automation to save time, reduce errors, and help small businesses respond faster to opportunities.</p>',
            preview: 'An overview of website automation for small businesses.',
            category: 'Web Automation',
            order: 1,
            published: true,
            link: {
                href: 'https://www.ampirestudio.com/blog/what-is-website-automation-practical-examples-for-small-businesses',
                text: 'what website automation is and how it works'
            }
        },
        {
            question: 'What business tasks can be automated through a website?',
            answer: '<p>Common tasks include enquiry handling, email notifications, lead qualification, booking confirmations, and basic customer onboarding.</p><p>As a web agency, Ampire Studio prioritises automating tasks that directly impact response time and operational efficiency rather than adding unnecessary complexity.</p>',
            preview: 'Examples of tasks websites can automate.',
            category: 'Web Automation',
            order: 2,
            published: true,
        },
        {
            question: 'Is website automation suitable for small businesses or only large companies?',
            answer: '<p>Website automation is often more valuable for small businesses because it reduces manual workload without hiring additional staff.</p><p>Ampire Studio designs automation systems scaled to business size, ensuring small teams benefit from efficiency without enterprise-level overhead.</p>',
            preview: 'Why small businesses benefit from website automation.',
            category: 'Web Automation',
            order: 3,
            published: true,
        },
        {
            question: 'How much does website automation cost in Malaysia?',
            answer: '<p>The cost of website automation in Malaysia depends on complexity, integrations, and ongoing maintenance needs. Simple automations cost significantly less than custom workflows.</p><p>Ampire Studio assesses automation ROI before implementation so businesses invest in systems that actually save time or increase lead value.</p>',
            preview: 'What influences website automation costs in Malaysia.',
            category: 'Web Automation',
            order: 4,
            published: true,
        },
        {
            question: 'Can website automation improve lead quality, not just response speed?',
            answer: '<p>Automation can filter, tag, and prioritise leads based on behaviour or input, improving quality before human follow-up.</p><p>As a digital agency in Malaysia, Ampire Studio uses automation to ensure businesses focus on serious prospects instead of chasing every enquiry equally.</p>',
            preview: 'How automation helps qualify better leads.',
            category: 'Web Automation',
            order: 5,
            published: true,
        },
        {
            question: 'Will website automation slow down or break my website?',
            answer: '<p>Poorly implemented automation can cause performance issues, but well-built systems operate in the background without affecting user experience.</p><p>Ampire Studio ensures automation is technically sound and tested so websites remain fast, stable, and secure.</p>',
            preview: 'Addressing performance concerns around automation.',
            category: 'Web Automation',
            order: 6,
            published: true,
        },
        {
            question: 'When should a business consider adding website automation?',
            answer: '<p>Businesses should consider automation once enquiries, bookings, or internal tasks start consuming significant time or causing delays.</p><p>Ampire Studio typically recommends automation when manual processes begin limiting growth rather than waiting until problems escalate.</p>',
            preview: 'Signs it’s time to automate website workflows.',
            category: 'Web Automation',
            order: 7,
            published: true,
        },
        {
            question: 'Do startups need a mobile app or should they start with a website?',
            answer: '<p>Most startups should begin with a website to validate demand, messaging, and conversions before investing in a mobile app.</p><p>Ampire Studio, a digital agency in Malaysia, helps startups decide based on user behaviour, not trends, ensuring resources are allocated effectively.</p>',
            preview: 'Choosing between a website and a mobile app.',
            category: 'Mobile App Development',
            order: 1,
            published: true,
            link: {
                href: 'https://www.ampirestudio.com/blog/website-vs-mobile-app-what-should-startups-build-first',
                text: 'website vs mobile app for startups'
            }
        },
        {
            question: 'What types of businesses benefit most from mobile app development?',
            answer: '<p>Businesses with repeat usage, memberships, bookings, or personalised experiences benefit most from mobile apps.</p><p>As a web agency, Ampire Studio evaluates whether an app will genuinely improve customer retention or operational efficiency before recommending development.</p>',
            preview: 'Which businesses gain the most value from mobile apps.',
            category: 'Mobile App Development',
            order: 2,
            published: true,
        },
        {
            question: 'How long does it take to develop a mobile app for a small business?',
            answer: '<p>Mobile app development usually takes three to six months depending on features, platforms, and testing requirements.</p><p>Ampire Studio structures app development timelines to balance speed with stability, ensuring the app supports long-term business use.</p>',
            preview: 'Typical timelines for small business mobile apps.',
            category: 'Mobile App Development',
            order: 3,
            published: true,
        },
        {
            question: 'Is it better to build a cross-platform app or native iOS and Android apps?',
            answer: '<p>Cross-platform apps reduce cost and development time, while native apps offer deeper performance and platform-specific features.</p><p>Ampire Studio, a digital agency in Malaysia, recommends the approach based on user needs, budget, and long-term growth plans.</p>',
            preview: 'Comparing cross-platform and native mobile apps.',
            category: 'Mobile App Development',
            order: 4,
            published: true,
        },
        {
            question: 'How do mobile apps support business growth beyond a website?',
            answer: '<p>Mobile apps enable direct engagement through notifications, saved preferences, and faster access, increasing retention and repeat usage.</p><p>As a web agency, Ampire Studio integrates apps with existing websites and systems so they complement, not replace, the broader digital strategy.</p>',
            preview: 'The growth role of mobile apps.',
            category: 'Mobile App Development',
            order: 5,
            published: true,
        },
        {
            question: 'How much does it cost to build a business website in Malaysia?',
            answer: '<p>Website costs in Malaysia vary based on design complexity, features, and long-term goals, ranging from basic builds to fully custom solutions.</p><p>Ampire Studio focuses on aligning cost with business outcomes so clients invest in websites that generate leads rather than just look good.</p>',
            preview: 'Understanding website development costs in Malaysia.',
            category: 'Pricing, Process & Trust',
            order: 1,
            published: true,
            link: {
                href: 'https://www.ampirestudio.com/blog/how-much-does-a-small-business-website-cost-in-malaysia-full-breakdown',
                text: 'small business website cost in Malaysia'
            }
        },
        {
            question: 'Why do different digital agencies quote very different prices for the same project?',
            answer: '<p>Price differences often reflect variations in process, expertise, scope definition, and post-launch support.</p><p>As a digital agency in Malaysia, Ampire Studio encourages businesses to compare deliverables and outcomes, not just headline prices.</p>',
            preview: 'Why agency pricing varies so widely.',
            category: 'Pricing, Process & Trust',
            order: 2,
            published: true,
        },
        {
            question: 'What does a typical website or app development process look like?',
            answer: '<p>A structured process includes discovery, planning, design, development, testing, and post-launch optimisation.</p><p>Ampire Studio follows a clear development workflow so clients understand progress, timelines, and responsibilities at every stage.</p>',
            preview: 'An overview of the development process.',
            category: 'Pricing, Process & Trust',
            order: 3,
            published: true,
        },
        {
            question: 'How can a business evaluate whether a digital agency is trustworthy?',
            answer: '<p>Trustworthy agencies demonstrate clear communication, documented processes, realistic timelines, and relevant past work.</p><p>Ampire Studio, a web agency in Malaysia, advises businesses to look beyond promises and evaluate how an agency approaches problem-solving.</p>',
            preview: 'How to assess a digital agency’s credibility.',
            category: 'Pricing, Process & Trust',
            order: 4,
            published: true,
        },
        {
            question: 'What ongoing costs should businesses expect after a website or app goes live?',
            answer: '<p>Ongoing costs may include hosting, maintenance, updates, security, and occasional feature improvements.</p><p>As a digital agency in Malaysia, Ampire Studio helps businesses plan for sustainable ongoing costs so digital assets continue delivering value.</p>',
            preview: 'Post-launch costs businesses should plan for.',
            category: 'Pricing, Process & Trust',
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

function generateSampleTestimonials(): Omit<Testimonial, 'id'>[] {
    return getTestimonials();
}

function generateSampleSettings(): SiteConfiguration {
    return {
        brandingConfig: {
            websiteName: 'Ampire Studio',
            brandName: 'Ampire',
            logoUrl: 'https://picsum.photos/seed/logo/200/50',
            squareLogoUrl: 'https://picsum.photos/seed/squarelogo/100/100',
            faviconUrl: 'https://picsum.photos/seed/favicon/32/32',
            defaultOgImageUrl: 'https://picsum.photos/seed/ogimage/1200/630',
        },
        contactConfig: {
            primaryEmail: 'contact@ampire.studio',
            phone: '+60 12-345 6789',
            address: 'Kuala Lumpur, Malaysia',
            businessHours: 'Mon-Fri, 9am-6pm',
            socialLinks: {
                linkedin: 'https://linkedin.com/company/ampire-studio',
                instagram: 'https://instagram.com/ampire_studio',
                pinterest: 'https://pinterest.com/ampire_studio',
                dribbble: 'https://dribbble.com/ampire_studio',
            }
        },
        seoConfig: {
            baseSiteUrl: 'https://www.ampirestudio.com',
            defaultMetaTitleTemplate: '%s | Affordable Web Design & Development Agency in Malaysia',
            defaultMetaDescription: 'Ampire Studio helps small businesses and startups grow with affordable custom websites, automation, and SEO. Agency-level support without big-agency pricing.',
            globalIndexingEnabled: true,
            pageTypeRules: {
              blog: { index: true, follow: true },
              portfolio: { index: true, follow: true },
              projectDetail: { index: true, follow: true },
              services: { index: true, follow: true },
              about: { index: true, follow: true },
              contact: { index: true, follow: true },
              faq: { index: true, follow: true },
              store: { index: true, follow: true },
              templateDetail: { index: true, follow: true },
              offerLetter: { index: false, follow: false },
              contract: { index: false, follow: false },
              timeline: { index: false, follow: false },
            },
        },
        emailConfig: {
            enabled: false,
            senderName: 'Ampire Studio',
            senderEmail: 'noreply@ampire.studio',
        },
        aiConfig: {
            enabled: false,
            provider: 'gemini',
        },
    }
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
    const [isSeedingTestimonials, setIsSeedingTestimonials] = useState(false);
    const [isClearingTestimonials, setIsClearingTestimonials] = useState(false);
    const [isSeedingSettings, setIsSeedingSettings] = useState(false);
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

    const handleSeedSettings = async () => {
        if (!firestore) return;
        setIsSeedingSettings(true);
        try {
            const settingsToSeed = generateSampleSettings();
            await updateSiteSettings(firestore, settingsToSeed);
            toast({ title: "Success!", description: `Site settings have been seeded.` });
        } catch (error: any) {
            handleFirestoreError(error, "Could not seed site settings.");
        } finally {
            setIsSeedingSettings(false);
        }
    };

    const handleSeedTestimonials = async () => {
        if (!firestore) return;
        setIsSeedingTestimonials(true);
        try {
            const batch = writeBatch(firestore);
            const testimonialsToSeed = generateSampleTestimonials();
            const testimonialsCollection = collection(firestore, 'testimonials');
            testimonialsToSeed.forEach(testimonial => batch.set(doc(testimonialsCollection), testimonial));
            await batch.commit();
            toast({ title: "Success!", description: `${testimonialsToSeed.length} sample testimonials seeded.` });
        } catch (error: any) {
            handleFirestoreError(error, "Could not seed testimonial data.");
        } finally {
            setIsSeedingTestimonials(false);
        }
    };

    const handleClearTestimonials = async () => {
        if (!firestore) return;
        setIsClearingTestimonials(true);
        try {
            const testimonialsCollection = collection(firestore, 'testimonials');
            const snapshot = await getDocs(testimonialsCollection);
            if (snapshot.empty) {
                toast({ title: "Info", description: "Testimonials collection is already empty." });
                return;
            }
            const batch = writeBatch(firestore);
            snapshot.forEach(doc => batch.delete(doc.ref));
            await batch.commit();
            toast({ title: "Success!", description: `Cleared ${snapshot.size} testimonials.` });
        } catch (error: any) {
            handleFirestoreError(error, "Could not clear testimonial data.");
        } finally {
            setIsClearingTestimonials(false);
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
    
    const isActionInProgress = isSeedingBlogs || isClearingBlogs || isSeedingProjects || isClearingProjects || isSeedingFaqs || isClearingFaqs || isSeedingTemplates || isClearingTemplates || isSeedingSettings || isSeedingTestimonials || isClearingTestimonials;

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
             <div className="mt-12 pt-8 border-t">
                <h2 className="text-xl font-semibold mb-4">Testimonials</h2>
                <div className="grid md:grid-cols-2 gap-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Seed Sample Testimonials</CardTitle>
                            <CardDescription>
                                Adds sample testimonials from your static data file to the 'testimonials' collection.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button onClick={handleSeedTestimonials} disabled={isActionInProgress} className="w-full">
                            {isSeedingTestimonials ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Database className="mr-2 h-4 w-4" />}
                            {isSeedingTestimonials ? 'Seeding...' : 'Seed Sample Testimonials'}
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="border-destructive">
                        <CardHeader>
                            <CardTitle className="text-destructive">Clear Testimonial Data</CardTitle>
                            <CardDescription>
                            Permanently deletes all documents from the 'testimonials' collection. This cannot be undone.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="destructive" className="w-full" disabled={isActionInProgress}>
                                    {isClearingTestimonials ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Trash2 className="mr-2 h-4 w-4" />}
                                    Clear All Testimonials
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This will permanently delete all testimonials from the 'testimonials' collection.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={handleClearTestimonials} className="bg-destructive hover:bg-destructive/90">
                                    Yes, delete all testimonials
                                </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                            </AlertDialog>
                        </CardContent>
                    </Card>
                </div>
            </div>
            <div className="mt-12 pt-8 border-t">
                <h2 className="text-xl font-semibold mb-4">Site Configuration</h2>
                <div className="grid md:grid-cols-2 gap-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Seed Site Settings</CardTitle>
                            <CardDescription>
                                Populates the site with default branding, contact info, and SEO settings. This will overwrite existing settings.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button onClick={handleSeedSettings} disabled={isActionInProgress} className="w-full">
                            {isSeedingSettings ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Database className="mr-2 h-4 w-4" />}
                            {isSeedingSettings ? 'Seeding...' : 'Seed Site Settings'}
                            </Button>
                        </CardContent>
                    </Card>
                    <Card className="border-border/50 bg-muted/20">
                        <CardHeader>
                            <CardTitle className="text-muted-foreground">Clear Site Settings</CardTitle>
                            <CardDescription>
                            Clearing settings is not recommended. Instead, seed new settings to overwrite the existing configuration.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button variant="outline" className="w-full" disabled={true}>
                                <Trash2 className="mr-2 h-4 w-4" />
                                Clearing Disabled
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}

    

    