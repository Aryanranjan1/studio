
'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { TemplateForm } from '@/components/admin/template-form';
import { useFirestore, useMemoFirebase } from '@/firebase';
import { useDoc } from '@/firebase/firestore/use-doc';
import { doc } from 'firebase/firestore';
import { updateTemplate } from '@/lib/firestore/templates';
import type { Template } from '@/lib/data';
import { Loader2 } from 'lucide-react';

export default function EditTemplatePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const firestore = useFirestore();
  const params = useParams();
  const id = params.id as string;

  const templateRef = useMemoFirebase(() => {
    if (!firestore || !id) return null;
    return doc(firestore, 'templates', id);
  }, [firestore, id]);

  const { data: template, isLoading } = useDoc<Template>(templateRef);

  const handleSubmit = (data: Partial<Template>) => {
    if (!firestore || !id) return;
    setIsSubmitting(true);
    updateTemplate(firestore, id, data);
    // Redirect is handled in the form
  };

  if (isLoading) {
    return <div className="flex items-center justify-center p-8"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }
  
  if (!template) {
      return <div>Template not found.</div>
  }

  return <TemplateForm defaultValues={template} onSubmit={handleSubmit} isSubmitting={isSubmitting} />;
}

    