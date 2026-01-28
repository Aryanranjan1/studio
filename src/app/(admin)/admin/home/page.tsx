'use client';

import { useUser, useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, ShieldOff, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

function AdminStatusCard() {
  const { user } = useUser();
  const firestore = useFirestore();

  const adminProfileRef = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return doc(firestore, 'admin_profiles', user.uid);
  }, [firestore, user]);

  const { data: adminProfile, isLoading } = useDoc(adminProfileRef);
  
  if (!user) {
    return null; // Don't render if user is not loaded
  }

  return (
     <Card className="mt-6">
        <CardHeader>
          <CardTitle>Admin Status Diagnostic</CardTitle>
          <CardDescription>
            Use this to verify your administrative privileges. To become an admin, create a document in the `admin_profiles` collection in Firestore with the ID matching your User UID below.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                    <p className="text-sm text-muted-foreground">Logged-In User</p>
                    <p className="font-semibold">{user.email}</p>
                </div>
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                ) : adminProfile ? (
                  <Badge variant="default" className="bg-green-600 hover:bg-green-600/80">
                    <Shield className="mr-2 h-4 w-4" />
                    Admin
                  </Badge>
                ) : (
                  <Badge variant="destructive">
                    <ShieldOff className="mr-2 h-4 w-4" />
                    Not Admin
                  </Badge>
                )}
            </div>
            <div>
              <p className="text-sm text-muted-foreground">User UID</p>
              <p className="font-mono text-sm bg-muted rounded p-2 mt-1 break-all">{user.uid}</p>
            </div>
            <Button asChild className="w-full">
                <Link href="/home">Go to Main Dashboard</Link>
            </Button>
        </CardContent>
      </Card>
  )
}


export default function AdminDiagnosticPage() {
    return (
      <>
        <div className="flex items-center">
          <h1 className="text-lg font-semibold md:text-2xl">Admin Diagnostic</h1>
        </div>
        <div
          className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
        >
          <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight">
              Welcome to the Admin Panel
            </h3>
            <p className="text-sm text-muted-foreground">
              This is a diagnostic page. Use the main dashboard for site management.
            </p>
          </div>
        </div>

        <AdminStatusCard />
      </>
    );
  }
