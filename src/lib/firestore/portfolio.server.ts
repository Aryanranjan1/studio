// This file is intended for SERVER-SIDE use only.
import { collection, getDocs, query, where } from 'firebase/firestore';
import { getFirestoreServer } from '@/firebase/server-init';
import type { PortfolioProject } from '@/lib/data';

/**
 * Fetches all published portfolio projects for sitemap generation.
 * @returns {Promise<PortfolioProject[]>} A promise that resolves to an array of published projects.
 */
export async function getAllPublicPortfolioProjects(): Promise<Pick<PortfolioProject, 'slug' | 'lastUpdated'>[]> {
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
                lastUpdated: data.lastUpdated,
            };
        });
    } catch (error) {
        console.error("Error fetching public portfolio projects for sitemap:", error);
        return [];
    }
}

    