'use client'

import { ColumnDef } from '@tanstack/react-table'

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Project = {
  id: string
  title: string
  published: boolean
  publishDate: string
}

export const columns: ColumnDef<Project>[] = [
  {
    accessorKey: 'title',
    header: 'Title',
  },
  {
    accessorKey: 'published',
    header: 'Status',
    cell: ({ row }) => {
        const project = row.original
        return project.published ? 'Published' : 'Draft'
    }
  },
  {
    accessorKey: 'publishDate',
    header: 'Publish Date',
    cell: ({ row }) => {
        const date = new Date(row.getValue('publishDate'))
        const formatted = date.toLocaleDateString()
        return <div className="text-right font-medium">{formatted}</div>
      }
  },
]
