// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  projectId: "ampire-studio-dynamic-showcase",
  appId: "1:700001141818:web:55e712ae7b78d29b1ce103",
  storageBucket: "ampire-studio-dynamic-showcase.firebasestorage.app",
  apiKey: "AIzaSyAPsUtO3M-uAhB2t8PssC5iJrPyMsWMrQc",
  authDomain: "ampire-studio-dynamic-showcase.firebaseapp.com",
  measurementId: "",
  messagingSenderId: "700001141818",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Enable offline persistence
enableIndexedDbPersistence(db)
  .catch((err) => {
    if (err.code == 'failed-precondition') {
      // Multiple tabs open, persistence can only be enabled
      // in one tab at a time.
      console.warn("Firestore persistence failed: multiple tabs open.");
    } else if (err.code == 'unimplemented') {
      // The current browser does not support all of the
      // features required to enable persistence
      console.warn("Firestore persistence not available in this browser.");
    }
  });


export { app, auth, db, storage };