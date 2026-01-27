
'use client'

import React from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { Eye, Edit, Trash2 } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
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
} from '@/components/ui/alert-dialog'
import { Badge } from '@/components/ui/badge'

import type { Template } from '@/lib/data'
import { deleteTemplate } from '@/lib/firestore/templates'
import { useFirestore } from '@/firebase'
import { useToast } from '@/hooks/use-toast'


const CellActions: React.FC<{ template: Template }> = ({ template }) => {
    const firestore = useFirestore()
    const { toast } = useToast()
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false)

    const handleDelete = () => {
        if (!firestore) return;
        deleteTemplate(firestore, template.id);
        toast({
            title: 'Template deleted',
            description: 'The template has been successfully deleted.',
        });
        setIsDeleteDialogOpen(false)
    }

    return (
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
            <div className="flex items-center justify-end gap-2">
                <Button asChild variant="ghost" size="icon">
                    <Link href={`/store/${template.slug}`} target="_blank" aria-label="View Template">
                        <Eye className="h-4 w-4" />
                    </Link>
                </Button>
                <Button asChild variant="ghost" size="icon">
                    <Link href={`/admin/templates/edit/${template.id}`} aria-label="Edit Template">
                        <Edit className="h-4 w-4" />
                    </Link>
                </Button>
                <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" aria-label="Delete Template">
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </AlertDialogTrigger>
            </div>
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the template.
                </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                    onClick={handleDelete}
                    className="bg-destructive hover:bg-destructive/90"
                >
                    Delete
                </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export const columns: ColumnDef<Template>[] = [
  {
    accessorKey: 'title',
    header: 'Title',
    cell: ({ row }) => {
        return <div className="font-medium">{row.getValue('title')}</div>
    }
  },
  {
    accessorKey: 'published',
    header: 'Status',
    cell: ({ row }) => {
        const isPublished = row.getValue('published')
        return (
            <Badge variant={isPublished ? 'default' : 'secondary'}>
                {isPublished ? 'Published' : 'Draft'}
            </Badge>
        )
    }
  },
   {
    accessorKey: 'price',
    header: () => <div className="text-right">Price</div>,
    cell: ({ row }) => {
        const price = parseFloat(row.getValue('price'))
        const formatted = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'MYR'
        }).format(price)

        return <div className="text-right font-medium">{formatted}</div>
    }
  },
  {
    accessorKey: 'createdAt',
    header: () => <div className="text-right">Created Date</div>,
    cell: ({ row }) => {
        const dateValue = row.getValue('createdAt');
        if (!dateValue) {
            return <div className="text-right font-medium">N/A</div>;
        }

        const date = typeof (dateValue as any).toDate === 'function' 
            ? (dateValue as any).toDate() 
            : new Date(dateValue as string);
            
        if (isNaN(date.getTime())) {
            return <div className="text-right font-medium text-destructive">Invalid Date</div>;
        }
            
        return <div className="text-right font-medium">{date.toLocaleDateString()}</div>
      }
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellActions template={row.original} />
  },
]

    