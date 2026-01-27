
'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { PortfolioForm } from '@/components/admin/portfolio-form';
import { useFirestore, useMemoFirebase } from '@/firebase';
import { useDoc } from '@/firebase/firestore/use-doc';
import { doc } from 'firebase/firestore';
import { updatePortfolioProject } from '@/lib/firestore/portfolio';
import type { PortfolioProject } from '@/lib/data';
import { Loader2 } from 'lucide-react';

export default function EditPortfolioProjectPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const firestore = useFirestore();
  const params = useParams();
  const id = params.id as string;

  const projectRef = useMemoFirebase(() => {
    if (!firestore || !id) return null;
    return doc(firestore, 'projects', id);
  }, [firestore, id]);

  const { data: project, isLoading } = useDoc<PortfolioProject>(projectRef);

  const handleSubmit = (data: Partial<PortfolioProject>) => {
    if (!firestore || !id) return;
    setIsSubmitting(true);
    updatePortfolioProject(firestore, id, data);
    // Redirect is handled in the form
  };

  if (isLoading) {
    return <div className="flex items-center justify-center p-8"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }
  
  if (!project) {
      return <div>Project not found.</div>
  }

  return <PortfolioForm defaultValues={project} onSubmit={handleSubmit} isSubmitting={isSubmitting} />;
}
