// This file is intended for SERVER-SIDE use only.
// It does not and should not have the 'use client' directive.

import { doc, getDoc } from 'firebase/firestore';
import { getFirestoreServer } from '@/firebase/server-init';
import type { SiteConfiguration } from './settings';

// Server-side cache to reduce database reads during build and server-rendering.
let settingsCache: SiteConfiguration | null = null;
let lastFetchTimestamp = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

/**
 * Fetches site settings with caching, for use in server components and server-side functions like generateMetadata.
 * @returns {Promise<SiteConfiguration | null>} The site configuration.
 */
export async function getSiteSettings(): Promise<SiteConfiguration | null> {
  const now = Date.now();
  if (settingsCache && (now - lastFetchTimestamp < CACHE_DURATION)) {
    return settingsCache;
  }

  try {
    const firestore = getFirestoreServer();
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
    console.error("Error fetching site settings on server:", error);
    // In a production environment, you might want to handle this more gracefully.
    // For now, we return null and let the caller handle it.
    return null;
  }
}
