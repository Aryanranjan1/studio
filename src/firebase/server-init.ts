import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { firebaseConfig } from './config';

// Singleton pattern to ensure we only initialize once per server instance.
let firestoreInstance: Firestore | null = null;

function initializeForServer(): Firestore {
    if (getApps().length === 0) {
        // When running in a Firebase Hosting environment, the config is automatically provided.
        if (process.env.FIREBASE_CONFIG) {
            initializeApp();
        } else {
            // For local development and other environments, use the explicit config.
            initializeApp(firebaseConfig);
        }
    }
    const app = getApp();
    return getFirestore(app);
}

/**
 * Returns a server-safe, singleton Firestore instance.
 */
export function getFirestoreServer(): Firestore {
    if (!firestoreInstance) {
        firestoreInstance = initializeForServer();
    }
    return firestoreInstance;
}
