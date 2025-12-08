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

// By instantiating the EventEmitter here, it acts as a singleton for the
// entire application lifecycle.
const errorEmitter = new EventEmitter<ErrorEvents>();

export { errorEmitter };
