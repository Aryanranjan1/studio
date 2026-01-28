
import { Suspense } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Newspaper, Briefcase, FileText, MessageSquare, Users, AlertTriangle, CheckCircle, Settings, PlusCircle, Rss, Shield, Bot, Link2 } from 'lucide-react';
import { AdminDashboardShell } from '@/components/admin/admin-dashboard-shell';

const AdminDashboardPage = () => {
    return (
        <AdminDashboardShell
            title="Admin Dashboard"
            description="Operational command center for the digital agency."
        >
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Blogs</CardTitle>
                        <Newspaper className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">12 / 3</div>
                        <p className="text-xs text-muted-foreground">Published / Draft</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
                        <Briefcase className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">8 / 2</div>
                        <p className="text-xs text-muted-foreground">Published / Draft</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Templates</CardTitle>
                        <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">5 / 1</div>
                        <p className="text-xs text-muted-foreground">Published / Draft</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Unread Messages</CardTitle>
                        <MessageSquare className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">5</div>
                        <p className="text-xs text-muted-foreground">in Inbox</p>
                    </CardContent>
                </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {/* Placeholder for recent activity log */}
                    </CardContent>
                </Card>
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>SEO & Crawling Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="flex items-center"><Rss className="mr-2 h-4 w-4" /> Global Indexing</span>
                                <span className="text-green-500 flex items-center"><CheckCircle className="mr-1 h-4 w-4" /> Enabled</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="flex items-center"><Link2 className="mr-2 h-4 w-4" /> Sitemap Status</span>
                                <a href="/sitemap.xml" className="text-blue-500">View</a>
                            </div>
                             <div className="flex items-center justify-between">
                                <span className="flex items-center"><Bot className="mr-2 h-4 w-4" /> robots.txt</span>
                                <a href="/robots.txt" className="text-blue-500">View</a>
                            </div>
                             <div className="flex items-center justify-between">
                                <span className="flex items-center"><Shield className="mr-2 h-4 w-4" /> llms.txt</span>
                                <a href="/llms.txt" className="text-blue-500">View</a>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
                <Card>
                    <CardHeader>
                        <CardTitle>Content Health Check</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <div className="flex items-center text-yellow-500"><AlertTriangle className="mr-2 h-4 w-4" /> Blog post "The future of AI" is missing a meta description.</div>
                            <div className="flex items-center text-yellow-500"><AlertTriangle className="mr-2 h-4 w-4" /> Project "Internal CRM" is missing a featured image.</div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AdminDashboardShell>
    );
};

export default AdminDashboardPage;
