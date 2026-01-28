
'use client';

import { useIsAdmin } from '@/hooks/useIsAdmin';
import { Loader2 } from 'lucide-react';
import { Inbox } from '@/components/admin/inbox';


export default function MessagesPage() {
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
          <p className="text-muted-foreground">You do not have permission to view messages.</p>
        </div>
      );
    }

    return (
      <div className="h-full">
        <Inbox />
      </div>
    );
  }
