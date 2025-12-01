'use client';

import { useEffect } from 'react';
import { errorEmitter } from '@/firebase/error-emitter';
import { useToast } from '@/hooks/use-toast';
import { FirestorePermissionError } from '@/firebase/errors';

// This component listens for Firebase permission errors and displays a toast
// notification when one occurs. In a production environment, you might want
// to log these errors to a service like Sentry or log them to the console.
// In a development environment, this component will throw the error so that
// Next.js can display the error overlay. This is useful for debugging
// security rules.
export function FirebaseErrorListener() {
  const { toast } = useToast();

  useEffect(() => {
    const handlePermissionError = (error: FirestorePermissionError) => {
      console.error('Firestore Permission Error:', error.message);

      // In a production app, you might want to display a more user-friendly
      // error message. You can also log the error to a service like Sentry.
      if (process.env.NODE_ENV === 'production') {
        toast({
          variant: 'destructive',
          title: 'Permission Denied',
          description: 'You do not have permission to perform this action.',
        });
      } else {
        // In development, we want to see the full error overlay from Next.js
        // to help debug security rules. We can re-throw the error here to
        // achieve that.
        throw error;
      }
    };

    errorEmitter.on('permission-error', handlePermissionError);

    return () => {
      errorEmitter.off('permission-error', handlePermissionError);
    };
  }, [toast]);

  return null;
}
