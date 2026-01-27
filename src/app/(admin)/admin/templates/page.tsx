
'use client';

import { DataTable } from '@/components/admin/data-table';
import { columns } from '@/components/admin/template-columns';
import { useAdminTemplates } from '@/hooks/use-templates';
import { useIsAdmin } from '@/hooks/useIsAdmin';
import { Loader2, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function AdminTemplatesPage() {
  const { isAdmin, isLoading: isAdminLoading } = useIsAdmin();
  const { data: templates, isLoading: templatesLoading, error } = useAdminTemplates(isAdmin);

  const isLoading = isAdminLoading || (isAdmin && templatesLoading);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        <p className="ml-2">Loading templates...</p>
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

  if (error) {
    return <div className="text-destructive p-8">Error loading templates: {error.message}</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Template Management</h1>
        <Button asChild>
            <Link href="/admin/templates/new">
                <PlusCircle className="mr-2 h-4 w-4" />
                Create New Template
            </Link>
        </Button>
      </div>
      {templates && <DataTable columns={columns} data={templates} />}
    </div>
  );
}

    