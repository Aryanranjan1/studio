'use client';

import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, where } from 'firebase/firestore';
import type { FaqItem } from '@/lib/data';
import { useMemo } from 'react';

/**
 * Fetches only PUBLISHED FAQs, sorted on the client.
 */
export function usePublicFaqs() {
  const firestore = useFirestore();
  
  const faqsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    // Query is simplified: only filter, no ordering.
    return query(
        collection(firestore, 'faqs'),
        where('published', '==', true)
    );
  }, [firestore]);

  // Fetch the unsorted but filtered data
  const { data: unsortedData, isLoading, error } = useCollection<FaqItem>(faqsQuery);

  // Memoize the client-side sorting to prevent re-sorting on every render
  const data = useMemo(() => {
    if (!unsortedData) return null;
    // Perform sorting on the client
    return [...unsortedData].sort((a, b) => a.order - b.order);
  }, [unsortedData]);

  return { data, isLoading, error };
}
