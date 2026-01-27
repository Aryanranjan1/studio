'use client';

import { useState } from 'react';
import Link from 'next/link';
import { collection, query, orderBy, doc } from 'firebase/firestore';
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
import { PlusCircle, Edit, Trash2, Loader2, ToggleLeft, ToggleRight } from 'lucide-react';
import type { PortfolioProject } from '@/lib/data';
import { format } from 'date-fns';
import { deletePortfolioProject, updatePortfolioProject } from '@/lib/firestore/portfolio';
import { useToast } from '@/hooks/use-toast';
import { useAdminProjects } from '@/hooks/use-projects';

function DeleteConfirmationDialog({ projectId, onConfirm }: { projectId: string; onConfirm: () => void }) {
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
            This action cannot be undone. This will permanently delete the portfolio project.
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

export default function PortfolioManagementPage() {
  const firestore = useFirestore();
  const { toast } = useToast();

  const { data: projects, isLoading, error } = useAdminProjects();

  const handleDelete = (id: string) => {
    if (!firestore) return;
    deletePortfolioProject(firestore, id);
    toast({
        title: 'Project deleted',
        description: 'The portfolio project has been successfully deleted.',
    });
  };

  const togglePublishState = (project: PortfolioProject) => {
    if (!firestore) return;
    const newPublishedState = !project.published;
    updatePortfolioProject(firestore, project.id, { published: newPublishedState });
    toast({
        title: `Project ${newPublishedState ? 'Published' : 'Unpublished'}`,
        description: `${project.title} is now ${newPublishedState ? 'visible to the public' : 'hidden from the public'}.`,
    });
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Portfolio Management</h1>
        <Button asChild>
          <Link href="/admin/portfolio/new">
            <PlusCircle className="h-4 w-4 mr-2" />
            Create New Project
          </Link>
        </Button>
      </div>

      <div className="mt-6 rounded-lg border shadow-sm overflow-hidden">
        {isLoading && (
          <div className="flex items-center justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            <p className="ml-2">Loading projects...</p>
          </div>
        )}
        {error && <p className="text-destructive p-8">Error loading projects: {error.message}</p>}
        {!isLoading && !error && projects && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.length > 0 ? (
                projects.map(project => (
                  <TableRow key={project.id}>
                    <TableCell className="font-medium">{project.title}</TableCell>
                    <TableCell>{project.category}</TableCell>
                    <TableCell>
                      <Badge variant={project.published ? 'default' : 'secondary'}>
                        {project.published ? 'Published' : 'Draft'}
                      </Badge>
                    </TableCell>
                    <TableCell>{
                      (() => {
                        const dateValue = project.lastUpdated;
                        if (!dateValue) return 'N/A';

                        // Firestore Timestamps have a toDate() method, otherwise try creating a new Date
                        const date = (dateValue as any).toDate ? (dateValue as any).toDate() : new Date(dateValue as string);
                        
                        // Check if the created date is valid
                        if (isNaN(date.getTime())) {
                          return '...'; // Or 'Invalid Date', or nothing while pending
                        }
                        
                        return format(date, 'MMM dd, yyyy');
                      })()
                    }</TableCell>
                    <TableCell className="text-right">
                       <Button variant="ghost" size="icon" onClick={() => togglePublishState(project)} title={project.published ? 'Unpublish' : 'Publish'}>
                          {project.published ? <ToggleRight className="h-5 w-5 text-primary"/> : <ToggleLeft className="h-5 w-5 text-muted-foreground"/>}
                       </Button>
                       <Button asChild variant="ghost" size="icon">
                         <Link href={`/admin/portfolio/edit/${project.id}`}>
                           <Edit className="h-4 w-4" />
                         </Link>
                       </Button>
                       <DeleteConfirmationDialog projectId={project.id} onConfirm={() => handleDelete(project.id)} />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center h-24">
                    No portfolio projects found.
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
