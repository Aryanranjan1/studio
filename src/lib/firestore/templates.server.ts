
// This file is intended for SERVER-SIDE use only.
// It does not and should not have the 'use client' directive.

import { collection, getDocs, query, where } from 'firebase/firestore';
import { getFirestoreServer } from '@/firebase/server-init';
import type { Template } from './templates';

/**
 * Fetches all PUBLIC templates from Firestore.
 * Public templates are those with status set to 'published'.
 * This function is intended for server-side use.
 * @returns {Promise<Template[]>} A promise that resolves to an array of templates.
 */
export async function getAllPublicTemplates(): Promise<Template[]> {
  const firestore = getFirestoreServer();
  const templatesCollection = collection(firestore, 'templates');
  
  const q = query(
    templatesCollection,
    where("published", "==", true) // Querying by the 'published' boolean field.
  );

  try {
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      return [];
    }
    // CORRECTED: Map the firestore document to the expected object structure.
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        // The sitemap requires 'lastModified', but the DB field is 'updatedAt'.
        lastModified: data.updatedAt, 
      } as Template;
    });
  } catch (error) {
    console.error("Error fetching public templates:", error);
    return [];
  }
}
