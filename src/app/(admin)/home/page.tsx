'use client';

import { useUser, useFirestore, useDoc, useMemoFirebase, useCollection } from '@/firebase';
import { useIsAdmin } from '@/hooks/useIsAdmin';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    AlertTriangle,
    CheckCircle,
    Newspaper,
    Briefcase,
    LayoutTemplate,
    HelpCircle,
    MessageSquare,
    Users,
    Settings,
    PlusCircle,
    Rss,
    Shield,
    Bot,
    Link as LinkIcon,
    Loader2
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { collection, query, where, orderBy, limit } from 'firebase/firestore';
import type { Article, PortfolioProject, Template, FaqItem, Message } from '@/lib/data';
import { usePublicSettings } from '@/hooks/use-settings';

// --- Stat Card ---
type StatCardProps = {
    title: string;
    value: string;
    description: string;
    icon: React.ElementType;
    href: string;
}
const StatCard = ({ title, value, description, icon: Icon, href }: StatCardProps) => (
    <Link href={href}>
        <Card className="hover:bg-muted/50 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                <p className="text-xs text-muted-foreground">{description}</p>
            </CardContent>
        </Card>
    </Link>
);


export default function AdminDashboardPage() {
    const { isAdmin, isLoading: isAdminLoading } = useIsAdmin();
    const firestore = useFirestore();

    // Data queries
    const { data: blogs, isLoading: blogsLoading } = useCollection<Article>(useMemoFirebase(() => isAdmin ? query(collection(firestore, 'blogs')) : null, [isAdmin, firestore]));
    const { data: projects, isLoading: projectsLoading } = useCollection<PortfolioProject>(useMemoFirebase(() => isAdmin ? query(collection(firestore, 'projects')) : null, [isAdmin, firestore]));
    const { data: templates, isLoading: templatesLoading } = useCollection<Template>(useMemoFirebase(() => isAdmin ? query(collection(firestore, 'templates')) : null, [isAdmin, firestore]));
    const { data: faqs, isLoading: faqsLoading } = useCollection<FaqItem>(useMemoFirebase(() => isAdmin ? query(collection(firestore, 'faqs')) : null, [isAdmin, firestore]));
    const { data: messages, isLoading: messagesLoading } = useCollection<Message>(useMemoFirebase(() => isAdmin ? query(collection(firestore, 'messages'), where('isArchived', '==', false)) : null, [isAdmin, firestore]));

    const { settings, isLoading: settingsLoading } = usePublicSettings();

    const isLoading = isAdminLoading || blogsLoading || projectsLoading || templatesLoading || faqsLoading || messagesLoading || settingsLoading;

    if (isLoading) {
        return (
            <div className="flex items-center justify-center p-8">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
        );
    }
    
    if (!isAdmin) {
        return (
            <div className="text-center p-8">
                <h2 className="text-xl font-bold">Access Denied</h2>
                <p className="text-muted-foreground">You do not have permission to view this page.</p>
            </div>
        );
    }
    
    // Process data for stats
    const blogStats = {
        published: blogs?.filter(b => b.status === 'published').length || 0,
        drafts: blogs?.filter(b => b.status === 'draft').length || 0,
    }
    const projectStats = {
        published: projects?.filter(p => p.published).length || 0,
        drafts: projects?.filter(p => !p.published).length || 0,
    }
    const templateStats = {
        published: templates?.filter(t => t.published).length || 0,
        drafts: templates?.filter(t => !t.published).length || 0,
    }
    const unreadMessages = messages?.filter(m => m.status === 'unread').length || 0;

    // Content Health
    const blogsMissingMeta = blogs?.filter(b => !b.metaTitle || !b.metaDescription) || [];
    const projectsMissingImage = projects?.filter(p => !p.featuredImage?.url) || [];

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
            </div>

            {/* 1. High-Level Stats */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                <StatCard title="Total Blogs" value={`${(blogs?.length || 0)}`} description={`${blogStats.published} published / ${blogStats.drafts} drafts`} icon={Newspaper} href="/admin/blog" />
                <StatCard title="Total Projects" value={`${(projects?.length || 0)}`} description={`${projectStats.published} published / ${projectStats.drafts} drafts`} icon={Briefcase} href="/admin/portfolio" />
                <StatCard title="Total Templates" value={`${(templates?.length || 0)}`} description={`${templateStats.published} published / ${templateStats.drafts} drafts`} icon={LayoutTemplate} href="/admin/templates" />
                <StatCard title="Total FAQs" value={`${faqs?.length || 0}`} description="Published & Draft" icon={HelpCircle} href="/admin/faq" />
                <StatCard title="Unread Messages" value={`${unreadMessages}`} description="In Inbox" icon={MessageSquare} href="/admin/messages" />
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                {/* 2. SEO Status */}
                <Card className="col-span-12 lg:col-span-4">
                    <CardHeader>
                        <CardTitle>SEO & Crawling Status</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-sm">
                        <div className="flex items-center justify-between">
                            <span className="flex items-center"><Rss className="mr-2 h-4 w-4" /> Global Indexing</span>
                            {settings?.seoConfig?.globalIndexingEnabled ? (
                                <span className="text-green-500 flex items-center"><CheckCircle className="mr-1 h-4 w-4" /> Enabled</span>
                            ) : (
                                <span className="text-yellow-500 flex items-center"><AlertTriangle className="mr-1 h-4 w-4" /> Disabled</span>
                            )}
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="flex items-center"><LinkIcon className="mr-2 h-4 w-4" /> Sitemap</span>
                            <Button asChild variant="link" size="sm" className="p-0 h-auto">
                                <a href="/sitemap.xml" target="_blank">View Live</a>
                            </Button>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="flex items-center"><Bot className="mr-2 h-4 w-4" /> robots.txt</span>
                            <Button asChild variant="link" size="sm" className="p-0 h-auto">
                                <a href="/robots.txt" target="_blank">View Live</a>
                             </Button>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="flex items-center"><Shield className="mr-2 h-4 w-4" /> llms.txt</span>
                             <Button asChild variant="link" size="sm" className="p-0 h-auto">
                                <a href="/llms.txt" target="_blank">View Live</a>
                             </Button>
                        </div>
                         <Button asChild variant="secondary" className="w-full mt-4">
                            <Link href="/admin/settings">Go to SEO Settings</Link>
                         </Button>
                    </CardContent>
                </Card>

                {/* 3. Quick Actions */}
                <Card className="col-span-12 lg:col-span-3">
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 gap-2 text-sm">
                       <Button asChild variant="outline"><Link href="/admin/blog/new"><PlusCircle className="mr-2 h-4 w-4"/> New Blog Post</Link></Button>
                       <Button asChild variant="outline"><Link href="/admin/portfolio/new"><PlusCircle className="mr-2 h-4 w-4"/> New Project</Link></Button>
                       <Button asChild variant="outline"><Link href="/admin/templates/new"><PlusCircle className="mr-2 h-4 w-4"/> New Template</Link></Button>
                       <Button asChild variant="outline"><Link href="/admin/faq/new"><PlusCircle className="mr-2 h-4 w-4"/> New FAQ</Link></Button>
                       <Button asChild variant="outline"><Link href="/admin/messages"><MessageSquare className="mr-2 h-4 w-4"/> View Inbox</Link></Button>
                       <Button asChild variant="outline"><Link href="/admin/settings"><Settings className="mr-2 h-4 w-4"/> Site Settings</Link></Button>
                    </CardContent>
                </Card>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2">
                 {/* 4. Content Health */}
                 <Card>
                    <CardHeader>
                        <CardTitle>Content Health Check</CardTitle>
                        <CardDescription>Items that may require your attention.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {blogsMissingMeta.length === 0 && projectsMissingImage.length === 0 && (
                            <div className="text-green-500 flex items-center text-sm"><CheckCircle className="mr-2 h-4 w-4" /> Everything looks good!</div>
                        )}
                        {blogsMissingMeta.map(blog => (
                             <div key={blog.id} className="flex items-center text-yellow-500 text-sm"><AlertTriangle className="mr-2 h-4 w-4" /> Blog post <Button variant="link" asChild className="p-1 h-auto text-yellow-500"><Link href={`/admin/blog/edit/${blog.id}`}>"{blog.title}"</Link></Button> is missing meta info.</div>
                        ))}
                         {projectsMissingImage.map(project => (
                             <div key={project.id} className="flex items-center text-yellow-500 text-sm"><AlertTriangle className="mr-2 h-4 w-4" /> Project <Button variant="link" asChild className="p-1 h-auto text-yellow-500"><Link href={`/admin/portfolio/edit/${project.id}`}>"{project.title}"</Link></Button> is missing a featured image.</div>
                        ))}
                    </CardContent>
                </Card>
                
                 {/* 5. Inbox Preview */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Recent Messages</CardTitle>
                        <Button asChild variant="secondary" size="sm">
                            <Link href="/admin/messages">View All</Link>
                        </Button>
                    </CardHeader>
                    <CardContent>
                         {messages?.slice(0, 5).map(msg => (
                            <div key={msg.id} className="flex items-start justify-between border-b last:border-b-0 py-3">
                                <div>
                                    <p className="font-semibold">{msg.senderName}</p>
                                    <p className="text-sm text-muted-foreground line-clamp-1">{msg.subject}</p>
                                </div>
                                {msg.status === 'unread' && (
                                    <Badge variant="default" className="flex-shrink-0">New</Badge>
                                )}
                            </div>
                        ))}
                        {messages?.length === 0 && (
                            <p className="text-sm text-muted-foreground text-center py-4">No recent messages.</p>
                        )}
                    </CardContent>
                </Card>

            </div>

             {/* Recent Activity - Placeholder */}
             <Card>
                <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">Recent activity log is under development. A dedicated 'activity_log' collection is recommended for a robust implementation.</p>
                </CardContent>
             </Card>
        </div>
    );
}
