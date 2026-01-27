'use client';

import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, where, orderBy } from 'firebase/firestore';
import type { PortfolioProject } from '@/lib/data';

/**
 * Fetches all portfolio projects for the admin dashboard.
 * This hook is guarded and will only execute the query if `isAdmin` is true.
 * @param isAdmin - A boolean indicating if the user has admin privileges.
 */
export function useAdminProjects(isAdmin: boolean) {
  const firestore = useFirestore();

  const projectsQuery = useMemoFirebase(() => {
    // Only construct the query if the user is a verified admin.
    if (!firestore || !isAdmin) return null;
    // The query for admins fetches all projects, ordered by date.
    return query(collection(firestore, 'projects'), orderBy('publishDate', 'desc'));
  }, [firestore, isAdmin]);

  // useCollection will return { data: null, isLoading: false } if the query is null.
  return useCollection<PortfolioProject>(projectsQuery);
}

/**
 * Fetches only PUBLISHED portfolio projects for public-facing pages.
 * This query is allowed by Firestore security rules for all users.
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
