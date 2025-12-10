
'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/firebase';
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useUser } from '@/firebase/auth/use-user';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { FaGoogle } from 'react-icons/fa6';
import './page.css';
import { useToast } from '@/hooks/use-toast';

export default function LoginPage() {
  const auth = useAuth();
  const router = useRouter();
  const { user, loading: userLoading } = useUser();
  const { toast } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = 'Login — Ampire Studio';
    if (!userLoading && user) {
      router.push('/admin/dashboard');
    }
  }, [user, userLoading, router]);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth) return;
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/admin/dashboard');
    } catch (error: any) {
      console.error('Email sign-in failed', error);
      toast({
        variant: 'destructive',
        title: 'Login Failed',
        description: error.message || 'Please check your credentials and try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    if (!auth) return;
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push('/admin/dashboard');
    } catch (error: any) {
      console.error('Google sign-in failed', error);
       toast({
        variant: 'destructive',
        title: 'Login Failed',
        description: error.message || 'Could not sign in with Google.',
      });
    } finally {
      setLoading(false);
    }
  };

  const isLoading = userLoading || loading;

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <div className="auth-header-meta">// SECURE_ACCESS</div>
          <h1 className="auth-title">Login</h1>
        </div>
        <div className="auth-content">
          <form onSubmit={handleEmailLogin} className="auth-form">
             <div className="input-group">
                <label htmlFor="email" className="input-label">Email Address</label>
                <input 
                    id="email" 
                    type="email" 
                    placeholder="INPUT_EMAIL" 
                    required 
                    className="auth-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
             <div className="input-group">
                <label htmlFor="password" className="input-label">Password</label>
                <input 
                    id="password" 
                    type="password" 
                    placeholder="INPUT_SECURE_PASSWORD" 
                    required 
                    className="auth-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button type="submit" className="auth-button" disabled={isLoading}>
              {isLoading ? 'Authenticating...' : 'Login'}
              {!isLoading && <ArrowRight size={16} />}
            </button>
          </form>

          <div className="separator">OR</div>

          <button onClick={handleGoogleLogin} className="auth-button google-button" disabled={isLoading}>
             <FaGoogle />
             <span>Continue with Google</span>
          </button>
          
          <div className="auth-footer">
            <span>Don&apos;t have an account? </span>
            <Link href="/signup">Request Access</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
