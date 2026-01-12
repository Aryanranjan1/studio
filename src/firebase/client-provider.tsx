
'use client';

import React, { useState, useEffect, type ReactNode } from 'react';
import { FirebaseProvider } from '@/firebase/provider';
import { initializeFirebase } from '@/firebase';

interface FirebaseClientProviderProps {
  children: ReactNode;
}

// A variable to hold the server-side initialized services.
let serverInitializedServices: any = null;

export function FirebaseClientProvider({ children }: FirebaseClientProviderProps) {
  const [services, setServices] = useState(() => {
    // If we're on the server, initialize Firebase immediately.
    if (typeof window === 'undefined') {
      if (!serverInitializedServices) {
        serverInitializedServices = initializeFirebase();
      }
      return serverInitializedServices;
    }
    // On the client, we'll wait for the component to mount.
    return null;
  });

  useEffect(() => {
    // This effect runs only on the client.
    if (typeof window !== 'undefined' && !services) {
        const loadFirebase = () => {
            console.log("Window loaded, initializing Firebase on client...");
            setServices(initializeFirebase());
        };

        if (document.readyState === 'complete') {
            loadFirebase();
        } else {
            window.addEventListener('load', loadFirebase, { once: true });
            return () => window.removeEventListener('load', loadFirebase);
        }
    }
  }, [services]); // Depend on services to avoid re-running.

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
