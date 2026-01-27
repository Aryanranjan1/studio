'use client';

import { DataTable } from '@/components/admin/data-table';
import { columns } from '@/components/admin/columns';
import { useAdminProjects } from '@/hooks/use-projects';

export default function AdminPortfolioPage() {
  const { data: projects, isLoading, error } = useAdminProjects();

  if (isLoading) return <div>Loading projects...</div>;
  if (error) return <div>Error loading projects: {error.message}</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold">Portfolio Projects</h1>
      {projects && <DataTable columns={columns} data={projects} />}
    </div>
  );
}
