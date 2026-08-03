import "server-only"

export type VerifiedFirebaseUser = {
  uid: string
  email: string
  name: string
}

type FirebaseLookupResponse = {
  users?: Array<{
    localId?: string
    email?: string
    displayName?: string
  }>
}

export async function verifyFirebaseIdToken(idToken: string) {
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY
  if (!apiKey || apiKey.startsWith("YOUR_")) {
    throw new Error("Firebase is not configured.")
  }

  const response = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${encodeURIComponent(apiKey)}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken }),
      cache: "no-store",
    },
  )

  if (!response.ok) {
    throw new Error("Your Google session could not be verified.")
  }

  const payload = (await response.json()) as FirebaseLookupResponse
  const user = payload.users?.[0]
  if (!user?.localId || !user.email) {
    throw new Error("Your Google account did not provide the required details.")
  }

  return {
    uid: user.localId,
    email: user.email.toLowerCase(),
    name: user.displayName ?? "",
  } satisfies VerifiedFirebaseUser
}
