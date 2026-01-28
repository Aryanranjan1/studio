'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { TestimonialForm } from '@/components/admin/testimonial-form';
import { useFirestore, useMemoFirebase } from '@/firebase';
import { useDoc } from '@/firebase/firestore/use-doc';
import { doc } from 'firebase/firestore';
import { updateTestimonial } from '@/lib/firestore/testimonials';
import type { Testimonial } from '@/lib/data';
import { Loader2 } from 'lucide-react';

export default function EditTestimonialPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const firestore = useFirestore();
  const params = useParams();
  const id = params.id as string;

  const testimonialRef = useMemoFirebase(() => {
    if (!firestore || !id) return null;
    return doc(firestore, 'testimonials', id);
  }, [firestore, id]);

  const { data: testimonial, isLoading } = useDoc<Testimonial>(testimonialRef);

  const handleSubmit = (data: Partial<Testimonial>) => {
    if (!firestore || !id) return;
    setIsSubmitting(true);
    updateTestimonial(firestore, id, data);
    // Redirect is handled in the form
  };

  if (isLoading) {
    return <div className="flex items-center justify-center p-8"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }
  
  if (!testimonial) {
      return <div>Testimonial not found.</div>
  }

  return <TestimonialForm defaultValues={testimonial} onSubmit={handleSubmit} isSubmitting={isSubmitting} />;
}
