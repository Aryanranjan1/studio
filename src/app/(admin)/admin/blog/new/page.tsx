'use client';

import { useState } from 'react';
import { BlogForm } from '@/components/admin/blog-form';
import { useFirestore } from '@/firebase';
import { addBlogPost } from '@/lib/firestore/blog';
import type { Article } from '@/lib/data';

export default function NewBlogPostPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const firestore = useFirestore();
  
  const handleSubmit = (data: Omit<Article, 'id'>) => {
    if (!firestore) return;
    setIsSubmitting(true);
    addBlogPost(firestore, data);
    // The redirect is handled in the form component
    // No need to setIsSubmitting(false) as we are navigating away
  };

  return <BlogForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />;
}

    