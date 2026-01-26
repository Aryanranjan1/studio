'use client';

import React, { useState, useEffect, type ReactNode } from 'react';
import { FirebaseProvider } from '@/firebase/provider';
import { initializeFirebase } from '@/firebase';

interface FirebaseClientProviderProps {
  children: ReactNode;
}

// A variable to hold the initialized services to prevent re-initialization.
let servicesInstance: any = null;

export function FirebaseClientProvider({ children }: FirebaseClientProviderProps) {
  const [services, setServices] = useState<ReturnType<typeof initializeFirebase> | null>(null);

  useEffect(() => {
    // This effect runs only on the client, after the component has mounted.
    if (!servicesInstance) {
      servicesInstance = initializeFirebase();
    }
    setServices(servicesInstance);
  }, []); // Empty dependency array ensures this runs once on mount.

  // If services are not yet initialized, show a loading state.
  // This prevents children from trying to access Firebase before it's ready.
  if (!services) {
    return (
        <div className="flex min-h-screen items-center justify-center bg-background">
            <p>Loading...</p>
        </div>
    );
  }

  return (
    <FirebaseProvider
      firebaseApp={services.firebaseApp}
      auth={services.auth}
      firestore={services.firestore}
    >
      {children}
    </FirebaseProvider>
  );
}
