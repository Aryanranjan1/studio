// src/firebase/client-provider.tsx
'use client';

import { useMemo } from 'react';
import { FirebaseProvider, initializeFirebase, type FirebaseServices } from '@/firebase';
import { FirebaseErrorListener } from '@/components/FirebaseErrorListener';

type FirebaseClientProviderProps = {
  children: React.ReactNode;
};

// This provider is a client component. It ensures that Firebase is initialized
// only once on the client and that the same instance is used across all child
// components.
export function FirebaseClientProvider({ children }: FirebaseClientProviderProps) {
  // useMemo will ensure that initializeFirebase is only called once.
  const firebaseServices = useMemo<FirebaseServices | null>(() => {
    if (typeof window !== 'undefined') {
      return initializeFirebase();
    }
    return null;
  }, []);

  const providerProps = firebaseServices || { app: null, auth: null, firestore: null };

  return (
    <FirebaseProvider {...providerProps}>
      {children}
      {firebaseServices && <FirebaseErrorListener />}
    </FirebaseProvider>
  );
}
