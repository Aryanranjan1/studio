// This file is intended for SERVER-SIDE use only.
import { collection, getDocs, query, where } from 'firebase/firestore';
import { getFirestoreServer } from '@/firebase/server-init';
import type { Article } from '@/lib/data';

/**
 * Fetches all published blog articles for sitemap generation.
 * @returns {Promise<{slug: string, lastModified: any}[]>} A promise that resolves to an array of published articles with a standardized lastModified field.
 */
export async function getAllPublicBlogs(): Promise<{ slug: string, lastModified: any }[]> {
    try {
        const firestore = getFirestoreServer();
        const blogsQuery = query(
            collection(firestore, 'blogs'),
            where('status', '==', 'published')
        );
        const snapshot = await getDocs(blogsQuery);
        if (snapshot.empty) {
            return [];
        }
        return snapshot.docs.map(doc => {
            const data = doc.data() as Article;
            return {
                slug: data.slug,
                lastModified: data.lastUpdated, // Standardize to lastModified
            };
        });
    } catch (error) {
        console.error("Error fetching public blogs for sitemap:", error);
        return [];
    }
}
