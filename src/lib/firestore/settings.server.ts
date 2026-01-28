
// This file is intended for SERVER-SIDE use only.
// It does not and should not have the 'use client' directive.

import { doc, getDoc } from 'firebase/firestore';
import { getFirestoreServer } from '@/firebase/server-init';
import type { SiteConfiguration } from './settings';
import { unstable_noStore as noStore } from 'next/cache';

/**
 * Fetches site settings directly from Firestore for use in server components and API routes.
 * This function does NOT use caching to ensure fresh data is always served for dynamic routes like robots.txt.
 * It also ensures that the seoConfig and its pageTypeRules are complete with default values.
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
      const data = docSnap.data() as SiteConfiguration;

      // --- DEFINITIVE FIX FOR MISSING SERVER-SIDE SETTINGS ---
      // Ensure seoConfig and pageTypeRules exist and have default values for detail pages.
      // This prevents the sitemap generator from failing if the fields are missing from the database.
      const defaults = {
        projectDetail: { index: true, follow: true }, // CORRECTED: Default to index: true
        templateDetail: { index: true, follow: true }, // CORRECTED: Default to index: true
      };

      if (!data.seoConfig) {
        data.seoConfig = { pageTypeRules: defaults };
      } else if (!data.seoConfig.pageTypeRules) {
        data.seoConfig.pageTypeRules = defaults;
      } else {
        data.seoConfig.pageTypeRules = { ...defaults, ...data.seoConfig.pageTypeRules };
      }
      // --- END FIX ---

      return data;
    } else {
      console.warn("Site settings document does not exist.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching site settings on server:", error);
    return null;
  }
}
