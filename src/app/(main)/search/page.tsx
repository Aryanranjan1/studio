'use client';

import { getTemplates } from '@/lib/data';
import { SearchResults } from '@/components/search-results';
import type { Article } from '@/lib/data';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';


export default function SearchPage() {
  const firestore = useFirestore();
  const templates = getTemplates();

  const articlesQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'blogs'), orderBy('date', 'desc'));
  }, [firestore]);

  const { data: articles, isLoading } = useCollection<Article>(articlesQuery);

  return (
    <div className="w-full bg-background text-foreground">
      <main>
         <div className="grid grid-cols-12 gap-px border-l border-r border-neutral-800 bg-black">
            <div className="col-span-12 bg-black">
                {isLoading ? (
                  <div className="p-8 md:p-12">
                    <Skeleton className="h-14 max-w-2xl mx-auto" />
                    <Skeleton className="h-48 mt-8" />
                  </div>
                ) : (
                  <SearchResults
                      articles={articles || []}
                      templates={templates}
                  />
                )}
            </div>
        </div>
      </main>
    </div>
  );
}
