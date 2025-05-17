import { initializeApp } from "firebase/app";
// @ts-ignore
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore, enableIndexedDbPersistence, connectFirestoreEmulator, CACHE_SIZE_UNLIMITED } from "firebase/firestore";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_APP_ID,
  FIREBASE_MEASUREMENT_ID
} from '@env';

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID,
  measurementId: FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const firebase_app = initializeApp(firebaseConfig);
const firebase_auth = initializeAuth(firebase_app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

// Initialize Firestore with settings
const firebase_db = getFirestore(firebase_app);

// Only try to enable persistence on web platforms that might support it
// Skip on iOS/Android as React Native has limited IndexedDB support
if (Platform.OS === 'web') {
  enableIndexedDbPersistence(firebase_db)
    .catch((err) => {
      if (err.code === 'failed-precondition') {
        // Multiple tabs open, persistence can only be enabled in one tab at a time
        console.warn('Firebase persistence could not be enabled: Multiple tabs open');
      } else if (err.code === 'unimplemented') {
        // The current browser does not support persistence
        console.warn('Firebase persistence not supported on this platform');
      }
    });
} else {
  console.log('Using memory cache for Firestore on mobile platform');
}

export default { firebase_app, firebase_auth, firebase_db };