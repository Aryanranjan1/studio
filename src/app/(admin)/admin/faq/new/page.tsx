
'use client';

import { useState } from 'react';
import { FaqForm } from '@/components/admin/faq-form';
import { useFirestore } from '@/firebase';
import { addFaq } from '@/lib/firestore/faq';
import type { FaqItem } from '@/lib/data';

export default function NewFaqPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const firestore = useFirestore();
  
  const handleSubmit = (data: Omit<FaqItem, 'id'>) => {
    if (!firestore) return;
    setIsSubmitting(true);
    addFaq(firestore, data);
    // The redirect is handled in the form component
  };

  return <FaqForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />;
}
