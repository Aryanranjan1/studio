
// This file is intended for SERVER-SIDE use only.
// It does not and should not have the 'use client' directive.

import { collection, getDocs, query, where } from 'firebase/firestore';
import { getFirestoreServer } from '@/firebase/server-init';
import type { PortfolioProject } from './portfolio'; 

/**
 * Fetches all PUBLIC portfolio projects from Firestore.
 * Public projects are those with status set to 'published'.
 * This function is intended for server-side use.
 * @returns {Promise<PortfolioProject[]>} A promise that resolves to an array of portfolio projects.
 */
export async function getAllPublicPortfolioProjects(): Promise<PortfolioProject[]> {
  const firestore = getFirestoreServer();
  const projectsCollection = collection(firestore, 'projects');
  
  const q = query(
    projectsCollection,
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
        // The sitemap requires 'lastModified', but the DB field is 'lastUpdated'.
        lastModified: data.lastUpdated, 
      } as PortfolioProject;
    });
  } catch (error) {
    console.error("Error fetching public portfolio projects:", error);
    return [];
  }
}
