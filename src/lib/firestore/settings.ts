
'use client';

import {
  doc,
  setDoc,
  Firestore,
} from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

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
  brandingConfig?: {
    websiteName?: string;
    brandName?: string;
    logoUrl?: string;
    squareLogoUrl?: string;
    faviconUrl?: string;
    defaultOgImageUrl?: string;
  };
  contactConfig?: {
    primaryEmail?: string;
    supportEmail?: string;
    phone?: string;
    address?: string;
    country?: string;
    businessHours?: string;
    socialLinks?: {
        linkedin?: string;
        instagram?: string;
        facebook?: string;
        pinterest?: string;
        youtube?: string;
        dribbble?: string;
    }
  };
  seoConfig?: {
    baseSiteUrl?: string;
    defaultMetaTitleTemplate?: string;
    defaultMetaDescription?: string;
    globalIndexingEnabled: boolean;
    pageTypeRules: PageTypeRules;
  };
  emailConfig: {
    enabled: boolean;
    senderName: string;
    senderEmail: string;
  };
  aiConfig: {
    enabled: boolean;
    provider: 'gemini' | 'openai';
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
