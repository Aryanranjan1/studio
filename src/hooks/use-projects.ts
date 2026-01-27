'use client';

import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, where, orderBy } from 'firebase/firestore';
import type { PortfolioProject } from '@/lib/data';

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

/**
 * Fetches ALL portfolio projects (published and drafts) for the admin panel.
 */
export function useAdminProjects() {
  const firestore = useFirestore();

  const projectsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'projects'), orderBy('publishDate', 'desc'));
  }, [firestore]);

  return useCollection<PortfolioProject>(projectsQuery);
}
