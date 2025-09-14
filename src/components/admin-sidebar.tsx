"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AmpireLogo } from "./logo";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { getAuth, signOut } from "firebase/auth";
import { useToast } from "@/hooks/use-toast";
import { app } from "@/lib/firebase";
import { LayoutDashboard, Newspaper, FileText, MessageSquare, Star, Settings, LogOut, ClipboardList, Briefcase } from "lucide-react";

export const navLinks = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Intake", href: "/admin/intake", icon: ClipboardList },
    { name: "Projects", href: "/admin/projects", icon: FileText },
    { name: "Services", href: "/admin/services", icon: Briefcase },
    { name: "Articles", href: "/admin/articles", icon: Newspaper },
    { name: "Messages", href: "/admin/messages", icon: MessageSquare },
    { name: "Testimonials", href: "/admin/testimonials", icon: Star },
    { name: "Settings", href: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const auth = getAuth(app);
    const { toast } = useToast();


    const handleLogout = async () => {
        try {
            await signOut(auth);
            toast({
                title: "Logged Out",
                description: "You have been successfully logged out.",
            });
            router.push("/login");
        } catch (error: any) {
            toast({
                title: "Logout Failed",
                description: error.message,
                variant: "destructive",
            });
        }
    };

    return (
        <aside className="hidden lg:block w-64 flex-col border-r bg-background">
            <div className="flex h-16 items-center border-b px-6">
                <Link href="/" className="flex items-center gap-2">
                    <AmpireLogo className="text-primary" />
                    <span className="font-headline text-xl font-bold">Ampire Studios</span>
                </Link>
            </div>
            <div className="flex h-[calc(100vh-4rem)] flex-col justify-between">
                <nav className="flex-1 space-y-2 p-4">
                    {navLinks.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                        pathname === link.href && "bg-muted text-primary"
                        )}
                    >
                        <link.icon className="h-4 w-4" />
                        {link.name}
                    </Link>
                    ))}
                </nav>
                <div className="mt-auto p-4 border-t">
                    <Button variant="ghost" className="w-full justify-start" onClick={handleLogout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                    </Button>
                </div>
            </div>
        </aside>
    )
}
