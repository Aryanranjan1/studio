
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
import type { Message } from '@/lib/data';

// Type for creating a new message from the contact form.
export type NewMessageData = Omit<Message, 'id' | 'status' | 'receivedAt' | 'isArchived'>;

/**
 * Creates a new message in the 'messages' collection from a public form submission.
 * This is a non-blocking operation.
 * @param firestore - The Firestore instance.
 * @param data - The data for the new message.
 */
export function addMessage(firestore: Firestore, data: NewMessageData): void {
  const collectionRef = collection(firestore, 'messages');
  
  const enrichedData: Omit<Message, 'id'> = {
    ...data,
    status: 'unread',
    receivedAt: serverTimestamp(),
    isArchived: false,
  };

  addDoc(collectionRef, enrichedData)
    .catch((error) => {
      console.error("Error adding message: ", error);
      // Since this is a public form, we might not want to throw a fatal error.
      // Logging it here is a good first step.
      const permissionError = new FirestorePermissionError({
        path: collectionRef.path,
        operation: 'create',
        requestResourceData: enrichedData,
      });
      // We can decide whether to emit this globally or handle it differently.
      // For a contact form, failing silently might be acceptable to the user.
      console.error(permissionError.message);
    });
}

/**
 * Updates the status of a message (e.g., 'read', 'replied').
 * This is a non-blocking operation intended for admin use.
 * @param firestore - The Firestore instance.
 * @param id - The ID of the message to update.
 * @param status - The new status.
 */
export function updateMessageStatus(firestore: Firestore, id: string, status: Message['status']): void {
  const docRef = doc(firestore, 'messages', id);
  
  updateDoc(docRef, { status })
    .catch((error) => {
      console.error("Error updating message status: ", error);
      const permissionError = new FirestorePermissionError({
        path: docRef.path,
        operation: 'update',
        requestResourceData: { status },
      });
      errorEmitter.emit('permission-error', permissionError);
    });
}

/**
 * Archives or un-archives a message (soft delete).
 * This is a non-blocking operation intended for admin use.
 * @param firestore - The Firestore instance.
 * @param id - The ID of the message to update.
 * @param isArchived - The new archived state.
 */
export function archiveMessage(firestore: Firestore, id: string, isArchived: boolean): void {
  const docRef = doc(firestore, 'messages', id);

  updateDoc(docRef, { isArchived })
    .catch((error) => {
      console.error("Error archiving message: ", error);
      const permissionError = new FirestorePermissionError({
        path: docRef.path,
        operation: 'update',
        requestResourceData: { isArchived },
      });
      errorEmitter.emit('permission-error', permissionError);
    });
}

/**
 * Deletes a message permanently from the 'messages' collection.
 * This is a non-blocking operation intended for admin use.
 * @param firestore - The Firestore instance.
 * @param id - The ID of the message to delete.
 */
export function deleteMessage(firestore: Firestore, id: string): void {
  const docRef = doc(firestore, 'messages', id);
  
  deleteDoc(docRef)
    .catch((error) => {
      console.error("Error deleting message: ", error);
      const permissionError = new FirestorePermissionError({
        path: docRef.path,
        operation: 'delete',
      });
      errorEmitter.emit('permission-error', permissionError);
    });
}

    