import { getApp, getApps, initializeApp } from "firebase/app"
import {
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  type User,
} from "firebase/auth"

export type GoogleProfile = {
  name: string
  email: string
}

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

function hasFirebaseConfiguration() {
  return Object.values(firebaseConfig).every(
    (value) => value && !value.startsWith("YOUR_"),
  )
}

function getFirebaseAuth() {
  if (!hasFirebaseConfiguration()) return null

  const app = getApps().length ? getApp() : initializeApp(firebaseConfig)
  return getAuth(app)
}

function toGoogleProfile(user: User | null): GoogleProfile | null {
  if (!user?.email) return null

  return {
    name: user.displayName ?? "",
    email: user.email,
  }
}

export function observeGoogleUser(
  onChange: (profile: GoogleProfile | null) => void,
) {
  const auth = getFirebaseAuth()
  if (!auth) return null

  return onAuthStateChanged(auth, (user) => onChange(toGoogleProfile(user)))
}

export async function signInWithGoogle() {
  const auth = getFirebaseAuth()
  if (!auth) {
    throw new Error(
      "Firebase is not configured. Add the NEXT_PUBLIC_FIREBASE_* values before enabling Google sign-in.",
    )
  }

  const provider = new GoogleAuthProvider()
  provider.setCustomParameters({ prompt: "select_account" })
  const result = await signInWithPopup(auth, provider)
  const profile = toGoogleProfile(result.user)

  if (!profile) {
    throw new Error("Your Google account did not provide an email address.")
  }

  return profile
}
