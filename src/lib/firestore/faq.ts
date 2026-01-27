
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
import type { FaqItem } from '@/lib/data';

// Type for the data when creating a new FAQ. `id` will be auto-generated.
export type NewFaqData = Omit<FaqItem, 'id' | 'createdAt' | 'updatedAt'>;

// Type for updating an existing FAQ. All fields are optional.
export type UpdateFaqData = Partial<NewFaqData>;


/**
 * Creates a new FAQ item in the 'faqs' collection.
 * This is a non-blocking operation.
 * @param firestore - The Firestore instance.
 * @param data - The data for the new FAQ.
 */
export function addFaq(firestore: Firestore, data: NewFaqData): void {
  const collectionRef = collection(firestore, 'faqs');
  
  const sanitizedData = { ...data };
  Object.keys(sanitizedData).forEach(key => {
    if (sanitizedData[key as keyof typeof sanitizedData] === undefined) {
      delete sanitizedData[key as keyof typeof sanitizedData];
    }
  });

  const enrichedData = {
    ...sanitizedData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
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
 * Updates an existing FAQ item in the 'faqs' collection.
 * This is a non-blocking operation.
 * @param firestore - The Firestore instance.
 * @param id - The ID of the FAQ to update.
 * @param data - The data to update.
 */
export function updateFaq(firestore: Firestore, id: string, data: UpdateFaqData): void {
  const docRef = doc(firestore, 'faqs', id);
  
  const sanitizedData = { ...data };
  Object.keys(sanitizedData).forEach(key => {
    if (sanitizedData[key as keyof typeof sanitizedData] === undefined) {
      delete sanitizedData[key as keyof typeof sanitizedData];
    }
  });

  const enrichedData = {
    ...sanitizedData,
    updatedAt: serverTimestamp(),
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
 * Deletes a FAQ item from the 'faqs' collection.
 * This is a non-blocking operation.
 * @param firestore - The Firestore instance.
 * @param id - The ID of the FAQ to delete.
 */
export function deleteFaq(firestore: Firestore, id: string): void {
  const docRef = doc(firestore, 'faqs', id);
  
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

    