
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
import { Badge } from '@/components/ui/badge';
import { PlusCircle, Edit, Trash2, Loader2 } from 'lucide-react';
import type { FaqItem } from '@/lib/data';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { updateFaq, deleteFaq } from '@/lib/firestore/faq';

function DeleteConfirmationDialog({ faqId, onConfirm }: { faqId: string, onConfirm: () => void }) {
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
            This action cannot be undone. This will permanently delete the FAQ item.
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


export default function FaqManagementPage() {
  const firestore = useFirestore();
  const faqsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'faqs'), orderBy('order', 'asc'))
  }, [firestore]);
  
  const { data: faqs, isLoading, error } = useCollection<FaqItem>(faqsQuery);
  const { toast } = useToast();

  const handleDelete = (id: string) => {
    if(!firestore) return;

    deleteFaq(firestore, id);
    toast({
        title: 'FAQ deleted',
        description: 'The FAQ item has been successfully deleted.',
    });
  };

  const handlePublishToggle = (id: string, currentStatus: boolean) => {
      if(!firestore) return;
      updateFaq(firestore, id, { published: !currentStatus });
      toast({
          title: `FAQ ${!currentStatus ? 'published' : 'unpublished'}`,
          description: `The FAQ item is now ${!currentStatus ? 'visible' : 'hidden'} on the public site.`,
      })
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">FAQ Management</h1>
        <Button asChild>
          <Link href="/admin/faq/new">
            <PlusCircle className="h-4 w-4 mr-2" />
            Create New FAQ
          </Link>
        </Button>
      </div>

      <div className="mt-6 rounded-lg border border-dashed shadow-sm overflow-hidden">
        {isLoading && (
          <div className="flex items-center justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            <p className="ml-2">Loading FAQs...</p>
          </div>
        )}
        {error && <p className="text-destructive p-8">Error loading FAQs: {error.message}</p>}
        {!isLoading && !error && faqs && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">Order</TableHead>
                <TableHead>Question</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Published</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {faqs.length > 0 ? (
                faqs.map(faq => (
                  <TableRow key={faq.id}>
                    <TableCell className="font-medium text-center">{faq.order}</TableCell>
                    <TableCell className="font-medium">{faq.question}</TableCell>
                    <TableCell>
                      <Badge variant={'secondary'}>
                        {faq.category}
                      </Badge>
                    </TableCell>
                    <TableCell>
                        <Switch
                            checked={faq.published}
                            onCheckedChange={() => handlePublishToggle(faq.id, faq.published)}
                            aria-label="Toggle published status"
                        />
                    </TableCell>
                    <TableCell className="text-right">
                       <Button asChild variant="ghost" size="icon">
                         <Link href={`/admin/faq/edit/${faq.id}`}>
                           <Edit className="h-4 w-4" />
                         </Link>
                       </Button>
                       <DeleteConfirmationDialog faqId={faq.id} onConfirm={() => handleDelete(faq.id)} />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center h-24">
                    No FAQs found. Get started by creating one.
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
