"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AmpireLogo } from "@/components/logo";
import { useRouter } from "next/navigation";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useToast } from "@/hooks/use-toast";
import { app } from "@/lib/firebase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const auth = getAuth(app);
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/admin/dashboard");
    } catch (error: any) {
        toast({
            title: "Login Failed",
            description: error.message,
            variant: "destructive"
        })
      console.error("Error signing in: ", error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4 relative">
       <div className="w-full absolute inset-0 h-screen z-0 bg-muted/40">
       </div>
       <div className="relative z-10 w-full max-w-sm">
        <Card>
            <CardHeader className="text-center">
            <div className="mb-4 inline-block">
                <AmpireLogo className="mx-auto text-primary" />
            </div>
            <CardTitle className="text-2xl font-headline">Admin Login</CardTitle>
            <CardDescription>Enter your credentials to access the dashboard.</CardDescription>
            </CardHeader>
            <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    type="email"
                    placeholder="admin@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                </div>
                <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                </div>
                <Button type="submit" className="w-full">
                Sign In
                </Button>
            </form>
            </CardContent>
            <CardFooter>
                <p className="text-xs text-muted-foreground text-center w-full">
                    &copy; {new Date().getFullYear()} Ampire Studios
                </p>
            </CardFooter>
        </Card>
       </div>
    </div>
  );
}
