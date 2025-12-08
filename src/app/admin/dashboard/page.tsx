
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from '@/components/ui/card';
  
  export default function AdminDashboard() {
    return (
      <>
        <div className="flex items-center">
          <h1 className="text-lg font-semibold md:text-2xl">Admin Dashboard</h1>
        </div>
        <div
          className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
        >
          <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight">
              Welcome to the Admin Panel
            </h3>
            <p className="text-sm text-muted-foreground">
              You can manage your products, orders, and customers here.
            </p>
          </div>
        </div>
      </>
    );
  }
  
