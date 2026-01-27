'use client';

import { useUser, useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';

/**
 * A hook to determine if the currently authenticated user is an administrator.
 * It checks for the existence of a document in the `admin_profiles` collection
 * with an ID matching the user's UID.
 *
 * @returns An object containing:
 * - `isAdmin`: A boolean that is `true` if the user is an admin.
 * - `isLoading`: A boolean that is `true` while authentication state or the admin profile is being loaded.
 */
export function useIsAdmin() {
  const { user, isUserLoading: isAuthLoading } = useUser();
  const firestore = useFirestore();

  const adminProfileRef = useMemoFirebase(() => {
    if (!firestore || !user?.uid) return null;
    return doc(firestore, 'admin_profiles', user.uid);
  }, [firestore, user]);

  const { data: adminProfile, isLoading: isAdminProfileLoading } = useDoc(adminProfileRef);

  const isAdmin = !!adminProfile;
  // The overall loading state is true if we are still checking auth,
  // or if we have a user but are still fetching their admin profile.
  const isLoading = isAuthLoading || (!!user && isAdminProfileLoading);

  return { isAdmin, isLoading };
}
