
'use client';

import { useFirestore } from '@/firebase';
import { collection, query, where, onSnapshot, Unsubscribe, FirestoreError, orderBy } from 'firebase/firestore';
import type { Template } from '@/lib/data';
import { useState, useEffect } from 'react';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

/**
 * Fetches only PUBLISHED templates for public-facing pages.
 */
export function usePublicTemplates() {
  const firestore = useFirestore();
  const [data, setData] = useState<Template[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!firestore) {
      setIsLoading(false);
      return;
    }
    
    setIsLoading(true);
    const templatesQuery = query(
      collection(firestore, 'templates'),
      where('published', '==', true),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe: Unsubscribe = onSnapshot(
      templatesQuery,
      (snapshot) => {
        const templatesData = snapshot.docs.map(doc => ({ ...doc.data() as Template, id: doc.id }));
        setData(templatesData);
        setError(null);
        setIsLoading(false);
      },
      (firestoreError: FirestoreError) => {
        console.error("Public template fetch error:", firestoreError);
        const contextualError = new FirestorePermissionError({
          path: 'templates',
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
 * Fetches all templates for the admin dashboard.
 * @param isAdmin - A boolean indicating if the user has admin privileges.
 */
export function useAdminTemplates(isAdmin: boolean) {
  const firestore = useFirestore();
  const [data, setData] = useState<Template[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!isAdmin || !firestore) {
      setIsLoading(false);
      setData(null);
      return;
    }

    setIsLoading(true);
    const templatesQuery = query(collection(firestore, 'templates'), orderBy('createdAt', 'desc'));
    
    const unsubscribe: Unsubscribe = onSnapshot(
        templatesQuery,
        (snapshot) => {
            const templatesData = snapshot.docs.map(doc => ({ ...doc.data() as Template, id: doc.id }));
            setData(templatesData);
            setError(null);
            setIsLoading(false);
        },
        (firestoreError: FirestoreError) => {
            console.error("Admin template fetch error:", firestoreError);
            const contextualError = new FirestorePermissionError({
                path: 'templates',
                operation: 'list',
            });
            setError(contextualError);
            setData(null);
            setIsLoading(false);
            errorEmitter.emit('permission-error', contextualError);
        }
    );
    
    return () => unsubscribe();

  }, [firestore, isAdmin]);

  return { data, isLoading, error };
}

    