
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
  const [services, setServices] = useState(() => {
    if (typeof window !== 'undefined') {
      if (!servicesInstance) {
        servicesInstance = initializeFirebase();
      }
      return servicesInstance;
    }
    return null;
  });

  useEffect(() => {
    // This effect handles the case where the component might be server-rendered
    // initially and then hydrated on the client.
    if (!services) {
      if (!servicesInstance) {
        servicesInstance = initializeFirebase();
      }
      setServices(servicesInstance);
    }
  }, [services]);

  return (
    <FirebaseProvider
      firebaseApp={services?.firebaseApp}
      auth={services?.auth}
      firestore={services?.firestore}
    >
      {children}
    </FirebaseProvider>
  );
}
