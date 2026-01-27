'use client';

import { useState, useEffect } from 'react';
import {
  Query,
  onSnapshot,
  DocumentData,
  FirestoreError,
  QuerySnapshot,
  CollectionReference,
} from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

export type WithId<T> = T & { id: string };

export interface UseCollectionResult<T> {
  data: WithId<T>[] | null;
  isLoading: boolean;
  error: FirestoreError | Error | null;
}

// Expanded internal type to inspect query properties
export interface InternalQuery extends Query<DocumentData> {
  _query: {
    path: {
      canonicalString(): string;
      toString(): string;
    };
    filters?: {
      field: { canonicalString: () => string };
      op: string;
      value: { booleanValue?: boolean };
    }[];
  };
}

/**
 * A guard function to prevent unsafe queries on the 'projects' collection.
 * It ensures that any non-admin query for projects must include a filter for published documents.
 */
function assertSafeQuery(ref: CollectionReference<DocumentData> | Query<DocumentData>) {
  const internal = ref as unknown as InternalQuery;
  const path = internal?._query?.path?.canonicalString?.();

  // 🚫 Absolute ban on naked 'projects' list queries from this hook
  if (path === 'projects') {
    const hasPublishedFilter = internal?._query?.filters?.some(
      (f: any) =>
        f.field?.canonicalString() === 'published' &&
        f.op === '==' &&
        f.value?.booleanValue === true
    );

    if (!hasPublishedFilter) {
      throw new Error(
        '🔥 ILLEGAL QUERY BLOCKED: useCollection was called for "projects" without a where("published", "==", true) filter. ' +
        'This query is only allowed for admins via the useAdminProjects hook.'
      );
    }
  }
}

export function useCollection<T = any>(
    memoizedTargetRefOrQuery: ((CollectionReference<DocumentData> | Query<DocumentData>) & {__memo?: boolean})  | null | undefined,
): UseCollectionResult<T> {
  type ResultItemType = WithId<T>;
  type StateDataType = ResultItemType[] | null;

  const [data, setData] = useState<StateDataType>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<FirestoreError | Error | null>(null);

  useEffect(() => {
    if (!memoizedTargetRefOrQuery) {
      setData(null);
      setIsLoading(false);
      setError(null);
      return;
    }

    // ⬅️ HARD GUARD
    try {
      assertSafeQuery(memoizedTargetRefOrQuery);
    } catch (e) {
      setError(e as Error);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    const unsubscribe = onSnapshot(
      memoizedTargetRefOrQuery,
      (snapshot: QuerySnapshot<DocumentData>) => {
        const results: ResultItemType[] = [];
        for (const doc of snapshot.docs) {
          results.push({ ...(doc.data() as T), id: doc.id });
        }
        setData(results);
        setError(null);
        setIsLoading(false);
      },
      (error: FirestoreError) => {
        const path: string =
          memoizedTargetRefOrQuery.type === 'collection'
            ? (memoizedTargetRefOrQuery as CollectionReference).path
            : (memoizedTargetRefOrQuery as unknown as InternalQuery)._query.path.canonicalString();

        const contextualError = new FirestorePermissionError({
          operation: 'list',
          path,
        });

        setError(contextualError);
        setData(null);
        setIsLoading(false);

        errorEmitter.emit('permission-error', contextualError);
      }
    );

    return () => unsubscribe();
  }, [memoizedTargetRefOrQuery]);

  if(memoizedTargetRefOrQuery && !memoizedTargetRefOrQuery.__memo) {
    throw new Error(memoizedTargetRefOrQuery + ' was not properly memoized using useMemoFirebase');
  }

  return { data, isLoading, error };
}
