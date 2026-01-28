// This file is intended for SERVER-SIDE use only.
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { getFirestoreServer } from '@/firebase/server-init';
import type { Article } from '@/lib/data';

/**
 * Fetches all published blog articles for sitemap generation.
 * @returns {Promise<Article[]>} A promise that resolves to an array of published articles.
 */
export async function getAllPublicBlogs(): Promise<Pick<Article, 'slug' | 'lastUpdated'>[]> {
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
                lastUpdated: data.lastUpdated,
            };
        });
    } catch (error) {
        console.error("Error fetching public blogs for sitemap:", error);
        return [];
    }
}
