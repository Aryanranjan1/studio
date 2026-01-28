// This file is intended for SERVER-SIDE use only.
import { collection, getDocs, query, where } from 'firebase/firestore';
import { getFirestoreServer } from '@/firebase/server-init';
import type { Template } from '@/lib/data';

/**
 * Fetches all published templates for sitemap generation.
 * @returns {Promise<{slug: string, lastModified: any}[]>} A promise that resolves to an array of published templates with a standardized lastModified field.
 */
export async function getAllPublicTemplates(): Promise<{ slug: string, lastModified: any }[]> {
    try {
        const firestore = getFirestoreServer();
        const templatesQuery = query(
            collection(firestore, 'templates'),
            where('published', '==', true)
        );
        const snapshot = await getDocs(templatesQuery);
        if (snapshot.empty) {
            return [];
        }
        return snapshot.docs.map(doc => {
            const data = doc.data() as Template;
            return {
                slug: data.slug,
                lastModified: data.updatedAt, // Standardize to lastModified
            };
        });
    } catch (error) {
        console.error("Error fetching public templates for sitemap:", error);
        return [];
    }
}
