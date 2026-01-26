'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { BlogForm } from '@/components/admin/blog-form';
import { useFirestore } from '@/firebase';
import { useDoc } from '@/firebase/firestore/use-doc';
import { doc } from 'firebase/firestore';
import { updateBlogPost } from '@/lib/firestore/blog';
import type { Article } from '@/lib/data';
import { Loader2 } from 'lucide-react';

export default function EditBlogPostPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const firestore = useFirestore();
  const params = useParams();
  const id = params.id as string;

  const { data: post, isLoading } = useDoc<Article>(
    firestore && id ? doc(firestore, 'blogs', id) : null
  );

  const handleSubmit = (data: Partial<Article>) => {
    if (!firestore || !id) return;
    setIsSubmitting(true);
    updateBlogPost(firestore, id, data);
    // Redirect is handled in the form
  };

  if (isLoading) {
    return <div className="flex items-center justify-center p-8"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }
  
  if (!post) {
      return <div>Post not found.</div>
  }

  return <BlogForm defaultValues={post} onSubmit={handleSubmit} isSubmitting={isSubmitting} />;
}

    