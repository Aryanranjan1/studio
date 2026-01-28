
'use client';

import {
  doc,
  setDoc,
  Firestore,
} from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

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
};


/**
 * Creates or updates the site configuration document.
 * This is a non-blocking operation intended for admin use.
 * @param firestore - The Firestore instance.
 * @param data - The complete configuration data.
 */
export async function updateSiteSettings(firestore: Firestore, data: SiteConfiguration): Promise<void> {
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
    // Re-throw the original error if you want the caller to be able to catch it too
    throw error;
  }
}
