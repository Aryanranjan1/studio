
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
import type { PortfolioProject } from '@/lib/data';

export type NewProjectData = Omit<PortfolioProject, 'id' | 'publishDate' | 'lastUpdated'>;
export type UpdateProjectData = Partial<NewProjectData>;

/**
 * Creates a new portfolio project in the 'projects' collection.
 * This is a non-blocking operation.
 */
export function addPortfolioProject(firestore: Firestore, data: NewProjectData): void {
  const collectionRef = collection(firestore, 'projects');

  const sanitizedData = { ...data };
  Object.keys(sanitizedData).forEach(key => {
    if (sanitizedData[key as keyof typeof sanitizedData] === undefined) {
      delete sanitizedData[key as keyof typeof sanitizedData];
    }
  });

  const enrichedData = {
    ...sanitizedData,
    publishDate: serverTimestamp(),
    lastUpdated: serverTimestamp(),
  };

  addDoc(collectionRef, enrichedData)
    .catch((error) => {
      console.error("Error adding project: ", error);
      const permissionError = new FirestorePermissionError({
        path: collectionRef.path,
        operation: 'create',
        requestResourceData: enrichedData,
      });
      errorEmitter.emit('permission-error', permissionError);
    });
}

/**
 * Updates an existing portfolio project.
 * This is a non-blocking operation.
 */
export function updatePortfolioProject(firestore: Firestore, id: string, data: UpdateProjectData): void {
  const docRef = doc(firestore, 'projects', id);
  
  const sanitizedData = { ...data };
  Object.keys(sanitizedData).forEach(key => {
    if (sanitizedData[key as keyof typeof sanitizedData] === undefined) {
      delete sanitizedData[key as keyof typeof sanitizedData];
    }
  });

  const enrichedData = {
    ...sanitizedData,
    lastUpdated: serverTimestamp(),
  };
  
  updateDoc(docRef, enrichedData)
    .catch((error) => {
      console.error("Error updating project: ", error);
      const permissionError = new FirestorePermissionError({
        path: docRef.path,
        operation: 'update',
        requestResourceData: enrichedData,
      });
      errorEmitter.emit('permission-error', permissionError);
    });
}

/**
 * Deletes a portfolio project from the 'projects' collection.
 * This is a non-blocking operation.
 */
export function deletePortfolioProject(firestore: Firestore, id: string): void {
  const docRef = doc(firestore, 'projects', id);
  
  deleteDoc(docRef)
    .catch((error) => {
      console.error("Error deleting project: ", error);
      const permissionError = new FirestorePermissionError({
        path: docRef.path,
        operation: 'delete',
      });
      errorEmitter.emit('permission-error', permissionError);
    });
}
