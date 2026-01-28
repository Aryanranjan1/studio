// This file is intended for SERVER-SIDE use only.
import { collection, getDocs, query, where } from 'firebase/firestore';
import { getFirestoreServer } from '@/firebase/server-init';
import type { FaqItem } from '@/lib/data';

/**
 * Fetches all published FAQs for sitemap generation.
 * @returns {Promise<{updatedAt: any}[]>} A promise that resolves to an array of published FAQs with their update timestamps.
 */
export async function getAllPublicFaqs(): Promise<{ updatedAt: any }[]> {
    try {
        const firestore = getFirestoreServer();
        const faqsQuery = query(
            collection(firestore, 'faqs'),
            where('published', '==', true)
        );
        const snapshot = await getDocs(faqsQuery);
        if (snapshot.empty) {
            return [];
        }
        return snapshot.docs.map(doc => {
            const data = doc.data() as FaqItem;
            return {
                updatedAt: data.updatedAt,
            };
        });
    } catch (error) {
        console.error("Error fetching public FAQs for sitemap:", error);
        return [];
    }
}
