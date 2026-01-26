
'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/admin/home');
  }, [router]);

  return (
    <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold font-headline">Redirecting...</h1>
    </main>
  )
}
