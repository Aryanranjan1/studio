'use client'

import React from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal, Edit, Trash2, Eye } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
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

import type { PortfolioProject } from '@/lib/data'
import { deletePortfolioProject } from '@/lib/firestore/portfolio'
import { useFirestore } from '@/firebase'
import { useToast } from '@/hooks/use-toast'


const CellActions: React.FC<{ project: PortfolioProject }> = ({ project }) => {
    const firestore = useFirestore()
    const { toast } = useToast()
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false)

    const handleDelete = () => {
        if (!firestore) return;
        deletePortfolioProject(firestore, project.id);
        toast({
            title: 'Project deleted',
            description: 'The portfolio project has been successfully deleted.',
        });
        setIsDeleteDialogOpen(false)
    }

    return (
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem asChild>
                        <Link href={`/portfolio/${project.slug}`} target="_blank">
                            <Eye className="mr-2 h-4 w-4" />
                            View
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href={`/admin/portfolio/edit/${project.id}`}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <AlertDialogTrigger asChild>
                        <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10" onSelect={(e) => e.preventDefault()}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                        </DropdownMenuItem>
                    </AlertDialogTrigger>
                </DropdownMenuContent>
            </DropdownMenu>
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the project from your portfolio.
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

export const columns: ColumnDef<PortfolioProject>[] = [
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
    accessorKey: 'publishDate',
    header: () => <div className="text-right">Publish Date</div>,
    cell: ({ row }) => {
        const dateValue = row.getValue('publishDate');
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
    cell: ({ row }) => <div className="text-right"><CellActions project={row.original} /></div>
  },
]
