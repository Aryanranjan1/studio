'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCollection } from '@/firebase/firestore/use-collection';
import { collection, query, orderBy } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, Edit, Trash2, Loader2 } from 'lucide-react';
import type { Article } from '@/lib/data';
import { format } from 'date-fns';
import { deleteBlogPost } from '@/lib/firestore/blog';
import { useToast } from '@/hooks/use-toast';

function DeleteConfirmationDialog({ blogId, onConfirm }: { blogId: string, onConfirm: () => void }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Trash2 className="h-4 w-4 text-destructive" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the blog post.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-destructive hover:bg-destructive/90"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}


export default function BlogManagementPage() {
  const firestore = useFirestore();
  const { data: posts, isLoading, error } = useCollection<Article>(
    query(collection(firestore, 'blogs'), orderBy('date', 'desc'))
  );
  const { toast } = useToast();

  const handleDelete = (id: string) => {
    const firestore = useFirestore();
    if(!firestore) return;

    deleteBlogPost(firestore, id);
    toast({
        title: 'Blog post deleted',
        description: 'The blog post has been successfully deleted.',
    });
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Blog Management</h1>
        <Button asChild>
          <Link href="/admin/blog/new">
            <PlusCircle className="h-4 w-4 mr-2" />
            Create New Post
          </Link>
        </Button>
      </div>

      <div className="mt-6 rounded-lg border border-dashed shadow-sm overflow-hidden">
        {isLoading && (
          <div className="flex items-center justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            <p className="ml-2">Loading posts...</p>
          </div>
        )}
        {error && <p className="text-destructive p-8">Error loading posts: {error.message}</p>}
        {!isLoading && !error && posts && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Published Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posts.length > 0 ? (
                posts.map(post => (
                  <TableRow key={post.id}>
                    <TableCell className="font-medium">{post.title}</TableCell>
                    <TableCell>
                      <Badge variant={post.status === 'published' ? 'default' : 'secondary'}>
                        {post.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{post.category}</TableCell>
                    <TableCell>{format(new Date(post.date), 'MMM dd, yyyy')}</TableCell>
                    <TableCell className="text-right">
                       <Button asChild variant="ghost" size="icon">
                         <Link href={`/admin/blog/edit/${post.id}`}>
                           <Edit className="h-4 w-4" />
                         </Link>
                       </Button>
                       <DeleteConfirmationDialog blogId={post.id} onConfirm={() => handleDelete(post.id)} />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center h-24">
                    No blog posts found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>
    </>
  );
}

    