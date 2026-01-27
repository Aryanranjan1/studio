'use client';

import { useFirestore } from '@/firebase';
import { collection, query, where, orderBy, onSnapshot, Unsubscribe, FirestoreError } from 'firebase/firestore';
import type { PortfolioProject } from '@/lib/data';
import { useState, useEffect } from 'react';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

/**
 * Fetches only PUBLISHED portfolio projects for public-facing pages.
 * This hook uses onSnapshot directly with a filter, which is safe for public use.
 */
export function usePublicProjects() {
  const firestore = useFirestore();
  const [data, setData] = useState<PortfolioProject[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!firestore) {
      setIsLoading(false);
      return;
    }
    
    setIsLoading(true);
    const projectsQuery = query(
      collection(firestore, 'projects'),
      where('published', '==', true),
      orderBy('publishDate', 'desc')
    );

    const unsubscribe: Unsubscribe = onSnapshot(
      projectsQuery,
      (snapshot) => {
        const projectsData = snapshot.docs.map(doc => ({ ...doc.data() as PortfolioProject, id: doc.id }));
        setData(projectsData);
        setError(null);
        setIsLoading(false);
      },
      (firestoreError: FirestoreError) => {
        console.error("Public project fetch error:", firestoreError);
        const contextualError = new FirestorePermissionError({
          path: 'projects',
          operation: 'list',
        });
        setError(contextualError);
        setData(null);
        setIsLoading(false);
        errorEmitter.emit('permission-error', contextualError);
      }
    );

    return () => unsubscribe();
  }, [firestore]);
  
  return { data, isLoading, error };
}


/**
 * Fetches all portfolio projects for the admin dashboard.
 * This hook is guarded and will only execute the query if `isAdmin` is true.
 * It uses onSnapshot directly.
 * @param isAdmin - A boolean indicating if the user has admin privileges.
 */
export function useAdminProjects(isAdmin: boolean) {
  const firestore = useFirestore();
  const [data, setData] = useState<PortfolioProject[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // If the user isn't an admin or firestore isn't ready, do nothing.
    if (!isAdmin || !firestore) {
      setIsLoading(false);
      setData(null);
      return;
    }

    setIsLoading(true);
    const projectsQuery = query(collection(firestore, 'projects'), orderBy('publishDate', 'desc'));
    
    const unsubscribe: Unsubscribe = onSnapshot(
        projectsQuery,
        (snapshot) => {
            const projectsData = snapshot.docs.map(doc => ({ ...doc.data() as PortfolioProject, id: doc.id }));
            setData(projectsData);
            setError(null);
            setIsLoading(false);
        },
        (firestoreError: FirestoreError) => {
            console.error("Admin project fetch error:", firestoreError);
            const contextualError = new FirestorePermissionError({
                path: 'projects',
                operation: 'list',
            });
            setError(contextualError);
            setData(null);
            setIsLoading(false);
            errorEmitter.emit('permission-error', contextualError);
        }
    );
    
    // Cleanup subscription on unmount
    return () => unsubscribe();

  }, [firestore, isAdmin]); // Rerun effect if firestore or isAdmin status changes.

  return { data, isLoading, error };
}
