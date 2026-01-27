
'use client';

import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, where, orderBy } from 'firebase/firestore';
import type { FaqItem } from '@/lib/data';

/**
 * Fetches only PUBLISHED FAQs, ordered by the 'order' field.
 */
export function usePublicFaqs() {
  const firestore = useFirestore();
  
  const faqsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(
        collection(firestore, 'faqs'),
        where('published', '==', true),
        orderBy('order', 'asc')
    );
  }, [firestore]);

  const { data, isLoading, error } = useCollection<FaqItem>(faqsQuery);

  return { data, isLoading, error };
}

    