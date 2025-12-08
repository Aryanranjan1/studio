
'use client';

import { useEffect } from 'react';
import { useAuth } from '@/firebase';
import { signInAnonymously } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useUser } from '@/firebase/auth/use-user';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

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
    <div className="flex min-h-screen items-center justify-center">
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
                <div className="mt-4 text-center text-sm">
                    Don&apos;t have an account?{' '}
                    <Link href="/signup" className="underline">
                        Sign up
                    </Link>
                </div>
                </div>
            </CardContent>
        </Card>
    </div>
  );
}
