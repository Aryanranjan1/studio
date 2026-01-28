'use client';

import Link from 'next/link';
import { useCollection } from '@/firebase/firestore/use-collection';
import { collection, query, orderBy } from 'firebase/firestore';
import { useFirestore, useMemoFirebase } from '@/firebase';
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
import { PlusCircle, Edit, Trash2, Loader2 } from 'lucide-react';
import type { Testimonial } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';
import { deleteTestimonial } from '@/lib/firestore/testimonials';
import { useIsAdmin } from '@/hooks/useIsAdmin';
import Image from 'next/image';

function DeleteConfirmationDialog({ testimonialId, onConfirm }: { testimonialId: string, onConfirm: () => void }) {
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
            This action cannot be undone. This will permanently delete the testimonial.
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


export default function TestimonialsManagementPage() {
  const firestore = useFirestore();
  const { isAdmin, isLoading: isAdminLoading } = useIsAdmin();

  const testimonialsQuery = useMemoFirebase(() => {
    if (!firestore || !isAdmin) return null;
    return query(collection(firestore, 'testimonials'));
  }, [firestore, isAdmin]);
  
  const { data: testimonials, isLoading: testimonialsLoading, error } = useCollection<Testimonial>(testimonialsQuery);
  const { toast } = useToast();

  const isLoading = isAdminLoading || testimonialsLoading;

  const handleDelete = (id: string) => {
    if(!firestore) return;

    deleteTestimonial(firestore, id);
    toast({
        title: 'Testimonial deleted',
        description: 'The testimonial has been successfully deleted.',
    });
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="text-center p-8">
        <h2 className="text-xl font-bold">Access Denied</h2>
        <p className="text-muted-foreground">You do not have permission to view this page.</p>
      </div>
    );
  }


  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Testimonials</h1>
        <Button asChild>
          <Link href="/admin/testimonials/new">
            <PlusCircle className="h-4 w-4 mr-2" />
            Create New Testimonial
          </Link>
        </Button>
      </div>

      <div className="mt-6 rounded-lg border border-dashed shadow-sm overflow-hidden">
        {error && <p className="text-destructive p-8">Error loading testimonials: {error.message}</p>}
        {!isLoading && !error && testimonials && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Quote</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {testimonials.length > 0 ? (
                testimonials.map(item => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium flex items-center gap-2">
                        {item.image && <Image src={item.image} alt={item.name} width={40} height={40} className="rounded-full" />}
                        {item.name}
                    </TableCell>
                    <TableCell>{item.company}</TableCell>
                    <TableCell className="text-muted-foreground max-w-sm truncate">"{item.quote}"</TableCell>
                    <TableCell className="text-right">
                       <Button asChild variant="ghost" size="icon">
                         <Link href={`/admin/testimonials/edit/${item.id}`}>
                           <Edit className="h-4 w-4" />
                         </Link>
                       </Button>
                       <DeleteConfirmationDialog testimonialId={item.id} onConfirm={() => handleDelete(item.id)} />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center h-24">
                    No testimonials found. Get started by creating one.
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
