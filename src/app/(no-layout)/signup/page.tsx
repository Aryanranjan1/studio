'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { FaGoogle } from 'react-icons/fa6';
import './../login/page.css';
import { useAuth } from '@/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useUser } from '@/firebase/auth/use-user';
import { useToast } from '@/hooks/use-toast';

export default function SignUpPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    
    const auth = useAuth();
    const router = useRouter();
    const { user, loading: userLoading } = useUser();
    const { toast } = useToast();

    useEffect(() => {
        document.title = "Sign Up — Ampire Studio";
        if (!userLoading && user) {
            router.push('/admin/dashboard');
        }
    }, [user, userLoading, router]);

    const handleEmailSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!auth) return;
        setLoading(true);
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            router.push('/admin/dashboard');
        } catch (error: any) {
            console.error('Email sign-up failed', error);
            toast({
                variant: 'destructive',
                title: 'Sign Up Failed',
                description: error.message || 'Could not create an account.',
            });
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignUp = async () => {
        if (!auth) return;
        setLoading(true);
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            router.push('/admin/dashboard');
        } catch (error: any) {
            console.error('Google sign-up failed', error);
            toast({
                variant: 'destructive',
                title: 'Sign Up Failed',
                description: error.message || 'Could not sign up with Google.',
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
                    <div className="auth-header-meta">// AUTHORIZATION_REQUEST</div>
                    <h1 className="auth-title">Create Account</h1>
                </div>
                <div className="auth-content">
                    <form onSubmit={handleEmailSignUp} className="auth-form">
                        <div className="input-group">
                            <label htmlFor="name" className="input-label">Full Name</label>
                            <input 
                                id="name" 
                                type="text" 
                                placeholder="INPUT_NAME" 
                                required 
                                className="auth-input"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
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
                            {isLoading ? 'Processing...' : 'Create Account'}
                            {!isLoading && <ArrowRight size={16} />}
                        </button>
                    </form>

                    <div className="separator">OR</div>

                    <button onClick={handleGoogleSignUp} className="auth-button google-button" disabled={isLoading}>
                        <FaGoogle />
                        <span>Sign Up with Google</span>
                    </button>
                    
                    <div className="auth-footer">
                        <span>Already have an account? </span>
                        <Link href="/login">
                            Sign In
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
