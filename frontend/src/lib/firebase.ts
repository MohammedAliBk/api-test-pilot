import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, type Auth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

let app: FirebaseApp | null = null;
let auth: Auth | null = null;

export function isFirebaseConfigured(): boolean {
  return Boolean(firebaseConfig.apiKey && firebaseConfig.projectId);
}

export function getFirebaseAuth(): Auth | null {
  if (typeof window === 'undefined') return null;

  if (!isFirebaseConfigured()) {
    return null;
  }

  if (!app) {
    app = getApps().length > 0 ? getApps()[0] : initializeApp(firebaseConfig);
    auth = getAuth(app);
  }

  return auth;
}

/**
 * Initiates Google Single Sign-On via Firebase Auth popup and returns the ID token.
 */
export async function signInWithGoogle(): Promise<string> {
  const firebaseAuth = getFirebaseAuth();

  if (!firebaseAuth) {
    throw new Error(
      'Firebase is not configured. Please add VITE_FIREBASE_API_KEY and VITE_FIREBASE_PROJECT_ID to your .env file.'
    );
  }

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });

  const result = await signInWithPopup(firebaseAuth, provider);
  const idToken = await result.user.getIdToken();
  return idToken;
}
