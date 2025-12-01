// src/firebase/errors.ts

export type SecurityRuleContext = {
  path: string;
  operation: 'get' | 'list' | 'create' | 'update' | 'delete';
  requestResourceData?: any;
};

// This error is thrown when a Firestore operation fails due to security rules.
// It contains the context of the operation that failed, which can be used to
// provide a more informative error message to the user.
export class FirestorePermissionError extends Error {
  public context: SecurityRuleContext;

  constructor(context: SecurityRuleContext) {
    const message = `FirestoreError: Missing or insufficient permissions: The following request was denied by Firestore Security Rules:\n${JSON.stringify(
      context,
      null,
      2
    )}`;
    super(message);
    this.name = 'FirestorePermissionError';
    this.context = context;

    // This is to ensure that the error is an instance of FirestorePermissionError
    // when running in development mode.
    Object.setPrototypeOf(this, FirestorePermissionError.prototype);
  }
}
