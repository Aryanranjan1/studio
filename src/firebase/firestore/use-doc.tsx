// src/firebase/firestore/use-doc.tsx
'use client';

import { useEffect, useState, useRef } from 'react';
import { onSnapshot, type DocumentReference, type DocumentData } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import { errorEmitter } from '../error-emitter';
import { FirestorePermissionError } from '../errors';

interface UseDocOptions<T> {
  // Add any options here
}

export function useDoc<T extends DocumentData>(
  docRef: DocumentReference<T> | null,
  options?: UseDocOptions<T>
) {
  const firestore = useFirestore();
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Use a ref to store the reference, and only update it when it has actually
  // changed. This is to prevent re-running the effect on every render.
  const ref = useRef(docRef);
  if (ref.current?.isEqual(docRef) === false) {
    ref.current = docRef;
  }
  
  useEffect(() => {
    if (!firestore || !ref.current) {
      setLoading(false);
      return;
    }

    setLoading(true);

    const unsubscribe = onSnapshot(
      ref.current,
      (snapshot) => {
        if (snapshot.exists()) {
          const docData = { id: snapshot.id, ...snapshot.data() } as T;
          setData(docData);
        } else {
          setData(null);
        }
        setLoading(false);
      },
      (err) => {
        const permissionError = new FirestorePermissionError({
          path: ref.current ? ref.current.path : 'unknown',
          operation: 'get',
        });
        errorEmitter.emit('permission-error', permissionError);
        setError(err);
        setLoading(false);
        console.error('Listen to document failed:', err);
      }
    );

    return () => unsubscribe();
  }, [firestore, ref.current]);

  return { data, loading, error };
}
