
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
import type { Template } from '@/lib/data';

// Type for the data when creating a new template. `id` will be auto-generated.
export type NewTemplateData = Omit<Template, 'id' | 'createdAt' | 'updatedAt'>;

// Type for updating an existing template. All fields are optional.
export type UpdateTemplateData = Partial<NewTemplateData>;

/**
 * Creates a new template in the 'templates' collection.
 * This is a non-blocking operation.
 */
export function addTemplate(firestore: Firestore, data: NewTemplateData): void {
  const collectionRef = collection(firestore, 'templates');

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
      console.error("Error adding template: ", error);
      const permissionError = new FirestorePermissionError({
        path: collectionRef.path,
        operation: 'create',
        requestResourceData: enrichedData,
      });
      errorEmitter.emit('permission-error', permissionError);
    });
}

/**
 * Updates an existing template.
 * This is a non-blocking operation.
 */
export function updateTemplate(firestore: Firestore, id: string, data: UpdateTemplateData): void {
  const docRef = doc(firestore, 'templates', id);
  
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
      console.error("Error updating template: ", error);
      const permissionError = new FirestorePermissionError({
        path: docRef.path,
        operation: 'update',
        requestResourceData: enrichedData,
      });
      errorEmitter.emit('permission-error', permissionError);
    });
}

/**
 * Deletes a template from the 'templates' collection.
 * This is a non-blocking operation.
 */
export function deleteTemplate(firestore: Firestore, id: string): void {
  const docRef = doc(firestore, 'templates', id);
  
  deleteDoc(docRef)
    .catch((error) => {
      console.error("Error deleting template: ", error);
      const permissionError = new FirestorePermissionError({
        path: docRef.path,
        operation: 'delete',
      });
      errorEmitter.emit('permission-error', permissionError);
    });
}

    