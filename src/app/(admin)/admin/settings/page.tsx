
'use client';
import { useIsAdmin } from '@/hooks/useIsAdmin';
import { Loader2 } from 'lucide-react';
import { SettingsForm } from '@/components/admin/settings-form';

export default function SettingsPage() {
    const { isAdmin, isLoading: isAdminLoading } = useIsAdmin();

    if (isAdminLoading) {
      return (
        <div className="flex items-center justify-center p-8">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          <p className="ml-2">Verifying permissions...</p>
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
    <div className="max-w-4xl mx-auto">
        <div className="mb-8">
            <h1 className="text-lg font-semibold md:text-2xl">Settings</h1>
            <p className="text-muted-foreground">Manage site-wide integrations and features.</p>
        </div>
      <SettingsForm />
    </div>
  );
}
