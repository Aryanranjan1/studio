// This file is intended for SERVER-SIDE use only.
import { collection, getDocs, query, where } from 'firebase/firestore';
import { getFirestoreServer } from '@/firebase/server-init';
import type { PortfolioProject } from '@/lib/data';

/**
 * Fetches all published portfolio projects for sitemap generation.
 * @returns {Promise<{slug: string, lastModified: any}[]>} A promise that resolves to an array of published projects with a standardized lastModified field.
 */
export async function getAllPublicPortfolioProjects(): Promise<{ slug: string, lastModified: any }[]> {
    try {
        const firestore = getFirestoreServer();
        const projectsQuery = query(
            collection(firestore, 'projects'),
            where('published', '==', true)
        );
        const snapshot = await getDocs(projectsQuery);
        if (snapshot.empty) {
            return [];
        }
        return snapshot.docs.map(doc => {
            const data = doc.data() as PortfolioProject;
            return {
                slug: data.slug,
                lastModified: data.lastUpdated, // Standardize to lastModified
            };
        });
    } catch (error) {
        console.error("Error fetching public portfolio projects for sitemap:", error);
        return [];
    }
}
