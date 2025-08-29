import { AuthProvider } from '@/hooks/use-auth';
import { AdminSidebar } from '@/components/admin-sidebar';
import { AdminHeader } from '@/components/admin-header';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <div className="flex min-h-screen w-full bg-muted/40">
        <AdminSidebar />
        <div className="flex flex-col flex-1">
            <AdminHeader />
            <main className="flex-1 p-4 sm:p-6 lg:p-8">
            {children}
            </main>
        </div>
      </div>
    </AuthProvider>
  );
}
