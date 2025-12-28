import { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret-key"

export async function getUserIdFromRequest(req: NextRequest): Promise<string | null> {
  const secret = process.env.NEXTAUTH_SECRET
  
  // 1. Try NextAuth
  if (secret) {
    try {
      console.log("[AUTH-USER] Attempting to get NextAuth token...");
      const token = await getToken({ req, secret })
      console.log("[AUTH-USER] NextAuth token raw check:", !!token);
      if (token) {
        const tokenUserId = ((token as any)?.id ?? token?.sub) as string | undefined
        if (tokenUserId) {
          console.log("[AUTH-USER] NextAuth token found for user:", tokenUserId);
          return tokenUserId
        }
      }
    } catch (error) {
      console.error("[AUTH-USER] Error getting NextAuth token:", error);
    }
  }

  // 2. Try Custom JWT Cookie
  try {
    const customToken = req.cookies.get("token")?.value
    if (customToken) {
      console.log("[AUTH-USER] Custom token cookie found, verifying...");
      const decoded = jwt.verify(customToken, JWT_SECRET) as { userId: string }
      if (decoded?.userId) {
        console.log("[AUTH-USER] Custom token verified for user:", decoded.userId);
        return decoded.userId
      }
    }
  } catch (error) {
    console.warn("[AUTH-USER] Error or invalid custom token:", error);
  }

  console.warn("[AUTH-USER] No authentication found (neither NextAuth nor custom JWT)");
  return null
}
