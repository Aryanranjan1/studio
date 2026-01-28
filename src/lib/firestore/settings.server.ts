// This file is intended for SERVER-SIDE use only.
// It does not and should not have the 'use client' directive.

import { doc, getDoc } from 'firebase/firestore';
import { getFirestoreServer } from '@/firebase/server-init';
import type { SiteConfiguration } from './settings';
import { unstable_noStore as noStore } from 'next/cache';

/**
 * Fetches site settings directly from Firestore for use in server components and API routes.
 * This function does NOT use caching to ensure fresh data is always served for dynamic routes like robots.txt.
 * @returns {Promise<SiteConfiguration | null>} The site configuration.
 */
export async function getSiteSettings(): Promise<SiteConfiguration | null> {
  // Opt out of caching for this function. This is crucial for dynamic routes.
  noStore();
  
  try {
    const firestore = getFirestoreServer();
    const docRef = doc(firestore, 'site_settings', 'config');
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as SiteConfiguration;
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
