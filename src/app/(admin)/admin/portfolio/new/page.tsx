
'use client';

import { useState } from 'react';
import { PortfolioForm } from '@/components/admin/portfolio-form';
import { useFirestore } from '@/firebase';
import { addPortfolioProject } from '@/lib/firestore/portfolio';
import type { PortfolioProject } from '@/lib/data';

export default function NewPortfolioProjectPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const firestore = useFirestore();
  
  const handleSubmit = (data: Omit<PortfolioProject, 'id' | 'publishDate' | 'lastUpdated'>) => {
    if (!firestore) return;
    setIsSubmitting(true);
    addPortfolioProject(firestore, data);
    // The redirect is handled in the form component
  };

  return <PortfolioForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />;
}
