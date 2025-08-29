import { AuthProvider } from '@/hooks/use-auth';
import { AdminSidebar } from '@/components/admin-sidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <div className="flex min-h-screen bg-muted/40">
        <AdminSidebar />
        <main className="flex-1 flex flex-col p-8">
          {children}
        </main>
      </div>
    </AuthProvider>
  );
}
