'use client';

import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/firebase/provider';
import { 
    Crown, 
    PanelLeft,
    LayoutDashboard,
    Newspaper,
    Briefcase,
    LayoutTemplate,
    HelpCircle,
    Mails,
    Settings,
    FileText,
    FileSignature,
    GanttChartSquare,
    Users,
    Database
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const navItems = [
    { href: '/admin/home', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/blog', label: 'Blog', icon: Newspaper },
    { href: '/admin/portfolio', label: 'Portfolio', icon: Briefcase },
    { href: '/admin/templates', label: 'Templates', icon: LayoutTemplate },
    { href: '/admin/faq', label: 'FAQ', icon: HelpCircle },
    { href: '/admin/messages', label: 'Messages', icon: Mails },
    { href: '/admin/offerletter', label: 'Offer Letter', icon: FileText },
    { href: '/admin/contract', label: 'Contract', icon: FileSignature },
    { href: '/admin/timeline', label: 'Timeline', icon: GanttChartSquare },
    { href: '/admin/management', label: 'Management', icon: Users },
    { href: '/admin/seeding', label: 'Data Seeding', icon: Database },
    { href: '/admin/settings', label: 'Settings', icon: Settings },
];

function AdminNav() {
    return (
        <div className="hidden border-r bg-muted/40 md:block sticky top-0 h-screen">
            <div className="flex h-full flex-col gap-2">
                <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                    <Link href="/" className="flex items-center gap-2 font-semibold">
                        <Crown className="h-6 w-6 text-primary" />
                        <span className="">Ampire Admin</span>
                    </Link>
                </div>
                <div className="flex-1 overflow-y-auto">
                    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                        {navItems.map(item => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                            >
                                <item.icon className="h-4 w-4" />
                                {item.label}
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  const { user, isUserLoading: loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <AdminNav />
        <div className="flex flex-col">
            {/* Mobile Header */}
            <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6 md:hidden sticky top-0 z-10 bg-background">
                 <Sheet>
                    <SheetTrigger asChild>
                    <Button
                        variant="outline"
                        size="icon"
                        className="shrink-0 md:hidden"
                    >
                        <PanelLeft className="h-5 w-5" />
                        <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="flex flex-col">
                    <nav className="grid gap-2 text-lg font-medium">
                        <Link
                            href="#"
                            className="flex items-center gap-2 text-lg font-semibold mb-4"
                        >
                            <Crown className="h-6 w-6 text-primary" />
                            <span className="sr-only">Ampire Admin</span>
                        </Link>
                         {navItems.map(item => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                            >
                                <item.icon className="h-5 w-5" />
                                {item.label}
                            </Link>
                        ))}
                    </nav>
                    </SheetContent>
                </Sheet>
                 <div className="w-full flex-1">
                 </div>
            </header>
            <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                {children}
            </main>
        </div>
    </div>
  );
}
