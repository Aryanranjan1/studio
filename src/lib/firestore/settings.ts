
'use client';

import {
  doc,
  setDoc,
  getDoc,
  Firestore,
} from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import { initializeFirebase } from '@/firebase';

export type IndexingRule = {
  index: boolean;
  follow: boolean;
};

export type PageTypeRules = {
  blog: IndexingRule;
  portfolio: IndexingRule;
  services: IndexingRule;
  about: IndexingRule;
  contact: IndexingRule;
  faq: IndexingRule;
  store: IndexingRule;
  offerLetter: IndexingRule;
  contract: IndexingRule;
  timeline: IndexingRule;
};

export type SiteConfiguration = {
  emailConfig: {
    enabled: boolean;
    senderName: string;
    senderEmail: string;
  };
  aiConfig: {
    enabled: boolean;
    provider: 'gemini' | 'openai';
  };
  indexingConfig?: {
    globalIndexingEnabled: boolean;
    pageTypeRules: PageTypeRules;
  };
};

// --- WRITE OPERATIONS (FOR ADMIN) ---

/**
 * Creates or updates the site configuration document.
 * This is a non-blocking operation intended for admin use.
 * @param firestore - The Firestore instance.
 * @param data - The complete configuration data.
 */
export async function updateSiteSettings(firestore: Firestore, data: Partial<SiteConfiguration>): Promise<void> {
  const docRef = doc(firestore, 'site_settings', 'config');
  
  try {
    // Using setDoc with merge: true is like an upsert operation.
    await setDoc(docRef, data, { merge: true });
  } catch (error) {
    console.error("Error updating site settings: ", error);
    const permissionError = new FirestorePermissionError({
      path: docRef.path,
      operation: 'write',
      requestResourceData: data,
    });
    errorEmitter.emit('permission-error', permissionError);
    throw error;
  }
}


// --- READ OPERATIONS (FOR SERVER & CLIENT) ---

let settingsCache: SiteConfiguration | null = null;
let lastFetchTimestamp = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

/**
 * Fetches site settings with caching.
 * Can be used in both server and client components.
 * @returns {Promise<SiteConfiguration | null>} The site configuration.
 */
export async function getSiteSettings(): Promise<SiteConfiguration | null> {
  const now = Date.now();
  if (settingsCache && (now - lastFetchTimestamp < CACHE_DURATION)) {
    return settingsCache;
  }

  try {
    const { firestore } = initializeFirebase();
    const docRef = doc(firestore, 'site_settings', 'config');
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      settingsCache = docSnap.data() as SiteConfiguration;
      lastFetchTimestamp = now;
      return settingsCache;
    } else {
      console.warn("Site settings document does not exist.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching site settings:", error);
    return null;
  }
}

    