'use client';
import { useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import type { SiteConfiguration } from '@/lib/firestore/settings';

export function usePublicSettings() {
    const firestore = useFirestore();

    const settingsRef = useMemoFirebase(() => {
        if (!firestore) return null;
        return doc(firestore, 'site_settings', 'config');
    }, [firestore]);

    const { data: settings, isLoading, error } = useDoc<SiteConfiguration>(settingsRef);

    return { settings, isLoading, error };
}

    