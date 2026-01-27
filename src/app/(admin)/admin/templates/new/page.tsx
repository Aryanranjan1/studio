
'use client';

import { useState } from 'react';
import { TemplateForm } from '@/components/admin/template-form';
import { useFirestore } from '@/firebase';
import { addTemplate } from '@/lib/firestore/templates';
import type { Template } from '@/lib/data';

export default function NewTemplatePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const firestore = useFirestore();
  
  const handleSubmit = (data: Omit<Template, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!firestore) return;
    setIsSubmitting(true);
    addTemplate(firestore, data);
    // The redirect is handled in the form component
  };

  return <TemplateForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />;
}

    