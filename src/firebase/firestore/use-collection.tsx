// src/firebase/firestore/use-collection.tsx
'use client';

import { useEffect, useState, useRef } from 'react';
import { onSnapshot, query, type Query, type DocumentData } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import { errorEmitter } from '../error-emitter';
import { FirestorePermissionError } from '../errors';

interface UseCollectionOptions<T> {
  // Add any options here, like filtering or sorting
}

export function useCollection<T extends DocumentData>(
  collectionQuery: Query<T> | null,
  options?: UseCollectionOptions<T>
) {
  const firestore = useFirestore();
  const [data, setData] = useState<T[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Use a ref to store the query, and only update it when it has actually
  // changed. This is to prevent re-running the effect on every render.
  const queryRef = useRef(collectionQuery);
  if (queryRef.current?.isEqual(collectionQuery) === false) {
    queryRef.current = collectionQuery;
  }

  useEffect(() => {
    if (!firestore || !queryRef.current) {
      setLoading(false);
      return;
    }

    setLoading(true);

    const unsubscribe = onSnapshot(
      queryRef.current,
      (snapshot) => {
        const docs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as T[];
        setData(docs);
        setLoading(false);
      },
      (err) => {
        const permissionError = new FirestorePermissionError({
          path: queryRef.current ? (queryRef.current as any)._path.path.join('/') : 'unknown',
          operation: 'list',
        });
        errorEmitter.emit('permission-error', permissionError);
        setError(err);
        setLoading(false);
        console.error('Listen to collection failed:', err);
      }
    );

    return () => unsubscribe();
  }, [firestore, queryRef.current]);

  return { data, loading, error };
}
