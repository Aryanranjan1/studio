
'use client';

import { useEffect } from 'react';
import { useAuth } from '@/firebase';
import { signInAnonymously } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useUser } from '@/firebase/auth/use-user';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import './page.css';

export default function LoginPage() {
  const auth = useAuth();
  const router = useRouter();
  const { user, loading } = useUser();

  useEffect(() => {
    document.title = "Login — Ampire Studio";
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
    <div className="auth-page">
        <div className="auth-container">
            <div className="auth-header">
                <div className="auth-header-meta">// SECURE_ACCESS</div>
                <h1 className="auth-title">Admin Login</h1>
            </div>
            <div className="auth-content">
                <div className="auth-form">
                    <button onClick={handleAnonymousLogin} className="auth-button" disabled={loading}>
                        {loading ? 'Authenticating...' : 'Enter Secure Area'}
                        {!loading && <ArrowRight size={16} />}
                    </button>
                </div>
                <div className="auth-footer">
                    <span>Don&apos;t have an account? </span>
                    <Link href="/signup">
                        Request Access
                    </Link>
                </div>
            </div>
        </div>
    </div>
  );
}
