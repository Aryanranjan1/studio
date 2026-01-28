
'use client';

import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query } from 'firebase/firestore';
import type { Testimonial } from '@/lib/data';

export function usePublicTestimonials() {
  const firestore = useFirestore();
  
  const testimonialsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'testimonials'));
  }, [firestore]);

  const { data, isLoading, error } = useCollection<Testimonial>(testimonialsQuery);

  return { data, isLoading, error };
}
