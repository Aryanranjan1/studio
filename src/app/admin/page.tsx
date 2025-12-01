'use client';
import { useUser } from '@/firebase/auth/use-user';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminPage() {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
        <main className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold font-headline">Loading...</h1>
        </main>
    )
  }

  if (!user) {
    return null; // or a login prompt
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold font-headline">Admin Panel</h1>
      <p className="mt-4 text-lg">Welcome, {user.isAnonymous ? 'Anonymous User' : user.email}!</p>
      <p>This is where you'll manage your website content.</p>
    </main>
  );
}
