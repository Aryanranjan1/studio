"use client";

import { useEffect, useState } from 'react';
import { summarizeProject } from '@/ai/flows/portfolio-project-summary';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle, Sparkles } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export function AiSummary({ description }: { description: string }) {
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getSummary() {
      try {
        setError(null);
        setLoading(true);
        const result = await summarizeProject({ projectDescription: description });
        setSummary(result.projectSummary);
      } catch (e) {
        setError('Could not generate summary at this time.');
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    getSummary();
  }, [description]);

  if (loading) {
    return (
      <div className="space-y-2 pt-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[75%]" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="mt-2">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="flex items-start gap-2 pt-2">
      <Sparkles className="h-4 w-4 flex-shrink-0 text-primary" />
      <p className="text-sm text-muted-foreground">{summary}</p>
    </div>
  );
}
