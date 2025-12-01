// src/firebase/error-emitter.ts

// The purpose of this file is to provide a global event emitter for Firebase
// related errors. This allows us to decouple error handling from the components
// that trigger them. For example, a component can trigger a Firestore write
// and a global listener can handle any permission errors.

import { EventEmitter } from 'events';
import { FirestorePermissionError } from './errors';

type ErrorEvents = {
  'permission-error': (error: FirestorePermissionError) => void;
};

// We have to declare the emitter as a global variable to ensure that it is
// a singleton.
declare global {
  var errorEmitter: EventEmitter<ErrorEvents> | undefined;
}

export const errorEmitter =
  global.errorEmitter || new EventEmitter<ErrorEvents>();

if (process.env.NODE_ENV !== 'production') {
  global.errorEmitter = errorEmitter;
}
