"use client";

import Link from "next/link";
import { AmpireLogo } from "./logo";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Menu, LogOut } from "lucide-react";
import { navLinks } from "./admin-sidebar";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { getAuth, signOut } from "firebase/auth";
import { useToast } from "@/hooks/use-toast";
import { app } from "@/lib/firebase";


export function AdminHeader() {
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
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button size="icon" variant="outline" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="lg:hidden w-64 p-0">
                <div className="flex h-16 items-center border-b px-6">
                    <Link href="/" className="flex items-center gap-2">
                        <AmpireLogo className="text-primary" />
                        <span className="font-headline text-xl font-bold">AMpire Studio</span>
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
              </SheetContent>
            </Sheet>
        </header>
    );
}
