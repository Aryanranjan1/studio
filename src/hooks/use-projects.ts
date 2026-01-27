'use client';

import { useCollection, useFirestore, useMemoFirebase, useUser } from '@/firebase';
import { collection, query, where, orderBy } from 'firebase/firestore';
import type { PortfolioProject } from '@/lib/data';

/**
 * Fetches all portfolio projects for the admin dashboard.
 * This hook is intended for use in authenticated admin routes.
 */
export function useAdminProjects() {
  const firestore = useFirestore();
  const { user } = useUser();

  const projectsQuery = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return collection(firestore, 'projects');
  }, [firestore, user]);

  return useCollection<PortfolioProject>(projectsQuery);
}

/**
 * Fetches only PUBLISHED portfolio projects for public-facing pages.
 */
export function usePublicProjects() {
  const firestore = useFirestore();

  const projectsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    const coll = collection(firestore, 'projects');
    return query(coll, where('published', '==', true), orderBy('publishDate', 'desc'));
  }, [firestore]);

  return useCollection<PortfolioProject>(projectsQuery);
}
