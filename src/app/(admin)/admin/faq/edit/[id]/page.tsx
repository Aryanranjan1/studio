
'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { FaqForm } from '@/components/admin/faq-form';
import { useFirestore, useMemoFirebase } from '@/firebase';
import { useDoc } from '@/firebase/firestore/use-doc';
import { doc } from 'firebase/firestore';
import { updateFaq } from '@/lib/firestore/faq';
import type { FaqItem } from '@/lib/data';
import { Loader2 } from 'lucide-react';

export default function EditFaqPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const firestore = useFirestore();
  const params = useParams();
  const id = params.id as string;

  const faqRef = useMemoFirebase(() => {
    if (!firestore || !id) return null;
    return doc(firestore, 'faqs', id);
  }, [firestore, id]);

  const { data: faq, isLoading } = useDoc<FaqItem>(faqRef);

  const handleSubmit = (data: Partial<FaqItem>) => {
    if (!firestore || !id) return;
    setIsSubmitting(true);
    updateFaq(firestore, id, data);
    // Redirect is handled in the form
  };

  if (isLoading) {
    return <div className="flex items-center justify-center p-8"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }
  
  if (!faq) {
      return <div>FAQ not found.</div>
  }

  return <FaqForm defaultValues={faq} onSubmit={handleSubmit} isSubmitting={isSubmitting} />;
}
