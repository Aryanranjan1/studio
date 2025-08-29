"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { useRouter, usePathname } from 'next/navigation';
import { app } from '@/lib/firebase'; // Ensure firebase is initialized

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({ user: null, loading: true });

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);

  useEffect(() => {
    if (!loading && !user && pathname.startsWith('/admin')) {
      router.push('/login');
    }
  }, [user, loading, router, pathname]);

  if (loading) {
    return <div>Loading...</div>; // Or a proper loading spinner component
  }

  if (!user && pathname.startsWith('/admin')) {
    return null; // Don't render admin pages if not logged in
  }

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
