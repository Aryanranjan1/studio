"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { useRouter, usePathname } from 'next/navigation';
import { app } from '@/lib/firebase'; // Ensure firebase is initialized
import { Skeleton } from '@/components/ui/skeleton';

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

  const isAdminRoute = pathname.startsWith('/admin');

  if (loading && isAdminRoute) {
    return (
        <div className="flex min-h-screen w-full bg-muted/40">
            <div className="hidden lg:block w-64 flex-col border-r bg-background p-4 space-y-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
            </div>
            <div className="flex flex-col flex-1 p-8">
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-64 w-full mt-8" />
            </div>
        </div>
    )
  }

  if (!user && isAdminRoute) {
    return null; // Don't render admin pages if not logged in
  }

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
