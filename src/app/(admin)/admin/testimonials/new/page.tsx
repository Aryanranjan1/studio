'use client';

import { useState } from 'react';
import { TestimonialForm } from '@/components/admin/testimonial-form';
import { useFirestore } from '@/firebase';
import { addTestimonial } from '@/lib/firestore/testimonials';
import type { Testimonial } from '@/lib/data';

export default function NewTestimonialPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const firestore = useFirestore();
  
  const handleSubmit = (data: Omit<Testimonial, 'id'>) => {
    if (!firestore) return;
    setIsSubmitting(true);
    addTestimonial(firestore, data);
    // The redirect is handled in the form component
  };

  return <TestimonialForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />;
}
