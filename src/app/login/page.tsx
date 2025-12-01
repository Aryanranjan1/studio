'use client';

import { useEffect } from 'react';
import { useAuth } from '@/firebase';
import { signInAnonymously } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useUser } from '@/firebase/auth/use-user';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function LoginPage() {
  const auth = useAuth();
  const router = useRouter();
  const { user, loading } = useUser();

  useEffect(() => {
    if (!loading && user) {
      router.push('/admin');
    }
  }, [user, loading, router]);

  const handleAnonymousLogin = async () => {
    if (auth) {
      try {
        await signInAnonymously(auth);
        router.push('/admin');
      } catch (error) {
        console.error('Anonymous sign-in failed', error);
      }
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center">
        <Card className="w-full max-w-sm">
            <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold">Admin Login</CardTitle>
                <CardDescription>
                Sign in to manage your website content.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                <Button onClick={handleAnonymousLogin} className="w-full" disabled={loading}>
                    {loading ? 'Authenticating...' : 'Sign In Anonymously'}
                </Button>
                <p className="px-8 text-center text-sm text-muted-foreground">
                    This is a placeholder login. In a real app, you'd have email/password or social logins here.
                </p>
                </div>
            </CardContent>
        </Card>
    </div>
  );
}
