'use client';

import {
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  collection,
  serverTimestamp,
  Firestore,
} from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import type { Article } from '@/lib/data';

// Type for the data when creating a new post. `id` will be auto-generated.
export type NewBlogPostData = Omit<Article, 'id' | 'lastUpdated'>;

// Type for updating an existing post. All fields are optional.
export type UpdateBlogPostData = Partial<Omit<Article, 'id' | 'lastUpdated'>>;


/**
 * Creates a new blog post in the 'blogs' collection.
 * This is a non-blocking operation.
 * @param firestore - The Firestore instance.
 * @param data - The data for the new blog post.
 */
export function addBlogPost(firestore: Firestore, data: NewBlogPostData): void {
  const collectionRef = collection(firestore, 'blogs');
  const enrichedData = {
    ...data,
    lastUpdated: serverTimestamp(), // Let Firestore handle the timestamp
  };

  addDoc(collectionRef, enrichedData)
    .catch((error) => {
      console.error("Error adding document: ", error);
      const permissionError = new FirestorePermissionError({
        path: collectionRef.path,
        operation: 'create',
        requestResourceData: enrichedData,
      });
      errorEmitter.emit('permission-error', permissionError);
    });
}

/**
 * Updates an existing blog post in the 'blogs' collection.
 * This is a non-blocking operation.
 * @param firestore - The Firestore instance.
 * @param id - The ID of the blog post to update.
 * @param data - The data to update.
 */
export function updateBlogPost(firestore: Firestore, id: string, data: UpdateBlogPostData): void {
  const docRef = doc(firestore, 'blogs', id);
  const enrichedData = {
    ...data,
    lastUpdated: serverTimestamp(),
  };
  
  updateDoc(docRef, enrichedData)
    .catch((error) => {
      console.error("Error updating document: ", error);
      const permissionError = new FirestorePermissionError({
        path: docRef.path,
        operation: 'update',
        requestResourceData: enrichedData,
      });
      errorEmitter.emit('permission-error', permissionError);
    });
}

/**
 * Deletes a blog post from the 'blogs' collection.
 * This is a non-blocking operation.
 * @param firestore - The Firestore instance.
 * @param id - The ID of the blog post to delete.
 */
export function deleteBlogPost(firestore: Firestore, id: string): void {
  const docRef = doc(firestore, 'blogs', id);
  
  deleteDoc(docRef)
    .catch((error) => {
      console.error("Error deleting document: ", error);
      const permissionError = new FirestorePermissionError({
        path: docRef.path,
        operation: 'delete',
      });
      errorEmitter.emit('permission-error', permissionError);
    });
}

    