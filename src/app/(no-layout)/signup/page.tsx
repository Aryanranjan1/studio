
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import './../login/page.css';

export default function SignUpPage() {
    const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Sign Up — Ampire Studio";
  }, []);


  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Sign up logic will go here
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
    alert('Sign up functionality coming soon!');
    setLoading(false);
  };

  return (
    <div className="auth-page">
        <div className="auth-container">
            <div className="auth-header">
                <div className="auth-header-meta">// AUTHORIZATION_REQUEST</div>
                <h1 className="auth-title">Create Account</h1>
            </div>
            <div className="auth-content">
                <form onSubmit={handleSignUp} className="auth-form">
                    <div className="input-group">
                        <label htmlFor="name" className="input-label">Full Name</label>
                        <input id="name" type="text" placeholder="INPUT_NAME" required className="auth-input"/>
                    </div>
                     <div className="input-group">
                        <label htmlFor="email" className="input-label">Email Address</label>
                        <input id="email" type="email" placeholder="INPUT_EMAIL" required className="auth-input"/>
                    </div>
                     <div className="input-group">
                        <label htmlFor="password" className="input-label">Password</label>
                        <input id="password" type="password" placeholder="INPUT_SECURE_PASSWORD" required className="auth-input" />
                    </div>
                    <button type="submit" className="auth-button" disabled={loading}>
                        {loading ? 'Processing...' : 'Request Access'}
                         {!loading && <ArrowRight size={16} />}
                    </button>
                </form>
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
