"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ArrowRight, FileText, MessageSquare, ClipboardList, Clock, Zap, CheckCircle, DollarSign } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getProjects, getMessages, getIntakes, Project, Message, Intake, ProjectStatus } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

type StatCardProps = {
    title: string;
    value: number;
    icon: React.ElementType;
    color: string;
}

const StatCard = ({ title, value, icon: Icon, color }: StatCardProps) => (
    <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
            <Icon className={`h-4 w-4 text-muted-foreground ${color}`} />
        </CardHeader>
        <CardContent>
            <div className="text-2xl font-bold">{value}</div>
        </CardContent>
    </Card>
);

type Activity = {
    type: 'intake' | 'message' | 'project';
    text: string;
    timestamp: Date;
    href: string;
}

export default function DashboardPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [messages, setMessages] = useState<Message[]>([]);
    const [intakes, setIntakes] = useState<Intake[]>([]);
    const [activities, setActivities] = useState<Activity[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let loadedDataCount = 0;
        const totalDataSources = 3;

        const handleDataLoad = () => {
            loadedDataCount++;
            if (loadedDataCount === totalDataSources) {
                setLoading(false);
            }
        };

        const unsubProjects = getProjects((data) => { setProjects(data); handleDataLoad(); });
        const unsubMessages = getMessages((data) => { setMessages(data); handleDataLoad(); });
        const unsubIntakes = getIntakes((data) => { setIntakes(data); handleDataLoad(); });

        return () => {
            unsubProjects();
            unsubMessages();
            unsubIntakes();
        }
    }, []);

    useEffect(() => {
        if (!loading) {
            const combinedActivities: Activity[] = [
                ...intakes.map(i => ({ type: 'intake', text: `New intake from ${i.fullName}`, timestamp: i.submittedAt, href: '/admin/intake' } as Activity)),
                ...messages.map(m => ({ type: 'message', text: `New message from ${m.name}`, timestamp: m.submittedAt, href: '/admin/messages' } as Activity)),
                ...projects.map(p => ({ type: 'project', text: `Project added: ${p.title}`, timestamp: p.createdAt || new Date(), href: '/admin/projects' } as Activity)),
            ].filter(a => a.timestamp);

            combinedActivities.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
            
            setActivities(combinedActivities.slice(0, 10)); // Limit to 10 recent activities
        }
    }, [projects, messages, intakes, loading]);

    const getProjectCountByStatus = (status: ProjectStatus) => {
        return projects.filter(p => p.status === status).length;
    };
    
    if (loading) {
        return (
            <div className="space-y-6">
                <Skeleton className="h-10 w-1/3" />
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Skeleton className="h-28" />
                    <Skeleton className="h-28" />
                    <Skeleton className="h-28" />
                    <Skeleton className="h-28" />
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                    <div className="col-span-4"><Skeleton className="h-96" /></div>
                    <div className="col-span-3"><Skeleton className="h-96" /></div>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
                 <Card className="bg-primary/10 border-primary/50">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><ClipboardList className="text-primary"/> New Project Intakes</CardTitle>
                        <CardDescription>You have {intakes.length} new client inquiries waiting for review.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button asChild>
                            <Link href="/admin/intake">Review Intakes <ArrowRight className="ml-2 h-4 w-4" /></Link>
                        </Button>
                    </CardContent>
                </Card>
                <Card className="bg-primary/10 border-primary/50">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><MessageSquare className="text-primary" /> New Contact Messages</CardTitle>
                        <CardDescription>You have {messages.length} new messages from your contact form.</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <Button asChild>
                            <Link href="/admin/messages">View Messages <ArrowRight className="ml-2 h-4 w-4" /></Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatCard title="Pending Projects" value={getProjectCountByStatus('Pending')} icon={Clock} color="text-yellow-500" />
                <StatCard title="In Progress" value={getProjectCountByStatus('In Progress')} icon={Zap} color="text-blue-500" />
                <StatCard title="Completed" value={getProjectCountByStatus('Completed')} icon={CheckCircle} color="text-green-500" />
                <StatCard title="Billed" value={getProjectCountByStatus('Billed')} icon={DollarSign} color="text-purple-500" />
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>A log of the most recent events in your admin panel.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {activities.length > 0 ? (
                            activities.map((activity, index) => (
                                <div key={index} className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center">
                                            {activity.type === 'intake' && <ClipboardList className="h-4 w-4 text-muted-foreground" />}
                                            {activity.type === 'message' && <MessageSquare className="h-4 w-4 text-muted-foreground" />}
                                            {activity.type === 'project' && <FileText className="h-4 w-4 text-muted-foreground" />}
                                        </div>
                                    </div>
                                    <div className="ml-4 flex-1">
                                        <p className="text-sm">{activity.text}</p>
                                        <p className="text-xs text-muted-foreground">
                                            {activity.timestamp.toLocaleDateString()} {activity.timestamp.toLocaleTimeString()}
                                        </p>
                                    </div>
                                    <Button variant="ghost" size="sm" asChild>
                                        <Link href={activity.href}>View</Link>
                                    </Button>
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-muted-foreground">No recent activity.</p>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
