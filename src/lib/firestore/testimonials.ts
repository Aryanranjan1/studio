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
import type { Testimonial } from '@/lib/data';

// Type for creating a new testimonial. `id` will be auto-generated.
export type NewTestimonialData = Omit<Testimonial, 'id'>;

// Type for updating an existing testimonial. All fields are optional.
export type UpdateTestimonialData = Partial<NewTestimonialData>;

/**
 * Creates a new testimonial in the 'testimonials' collection.
 */
export function addTestimonial(firestore: Firestore, data: NewTestimonialData): void {
  const collectionRef = collection(firestore, 'testimonials');
  
  const sanitizedData = { ...data };
  Object.keys(sanitizedData).forEach(key => {
    if (sanitizedData[key as keyof typeof sanitizedData] === undefined) {
      delete sanitizedData[key as keyof typeof sanitizedData];
    }
  });

  addDoc(collectionRef, sanitizedData)
    .catch((error) => {
      console.error("Error adding testimonial: ", error);
      const permissionError = new FirestorePermissionError({
        path: collectionRef.path,
        operation: 'create',
        requestResourceData: sanitizedData,
      });
      errorEmitter.emit('permission-error', permissionError);
    });
}

/**
 * Updates an existing testimonial.
 */
export function updateTestimonial(firestore: Firestore, id: string, data: UpdateTestimonialData): void {
  const docRef = doc(firestore, 'testimonials', id);
  
  const sanitizedData = { ...data };
  Object.keys(sanitizedData).forEach(key => {
    if (sanitizedData[key as keyof typeof sanitizedData] === undefined) {
      delete sanitizedData[key as keyof typeof sanitizedData];
    }
  });
  
  updateDoc(docRef, sanitizedData)
    .catch((error) => {
      console.error("Error updating testimonial: ", error);
      const permissionError = new FirestorePermissionError({
        path: docRef.path,
        operation: 'update',
        requestResourceData: sanitizedData,
      });
      errorEmitter.emit('permission-error', permissionError);
    });
}

/**
 * Deletes a testimonial from the 'testimonials' collection.
 */
export function deleteTestimonial(firestore: Firestore, id: string): void {
  const docRef = doc(firestore, 'testimonials', id);
  
  deleteDoc(docRef)
    .catch((error) => {
      console.error("Error deleting testimonial: ", error);
      const permissionError = new FirestorePermissionError({
        path: docRef.path,
        operation: 'delete',
      });
      errorEmitter.emit('permission-error', permissionError);
    });
}
