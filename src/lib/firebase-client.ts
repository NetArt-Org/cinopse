import { getApp, getApps, initializeApp } from "firebase/app"
import {
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  signOut,
  signInWithPopup,
  type User,
} from "firebase/auth"

export type GoogleProfile = {
  uid: string
  name: string
  email: string
  photoUrl: string | null
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
    uid: user.uid,
    name: user.displayName ?? "",
    email: user.email,
    photoUrl: user.photoURL,
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

export async function signOutGoogle() {
  const auth = getFirebaseAuth()
  if (!auth) return

  await signOut(auth)
}

export async function getFirebaseIdToken() {
  const auth = getFirebaseAuth()
  if (!auth?.currentUser) {
    throw new Error("Please sign in with Google to continue.")
  }

  return auth.currentUser.getIdToken()
}
