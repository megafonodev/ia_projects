import { NextResponse } from 'next/server'

const COOKIE_NAME = 'auth_session'
const SESSION_DATA = 'emd:session'

async function verifyToken(token, secret) {
  if (!token || !secret) return false
  try {
    const key = await crypto.subtle.importKey(
      'raw',
      new TextEncoder().encode(secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    )
    const sigBytes = Uint8Array.from(atob(token), (c) => c.charCodeAt(0))
    return await crypto.subtle.verify(
      'HMAC',
      key,
      sigBytes,
      new TextEncoder().encode(SESSION_DATA)
    )
  } catch {
    return false
  }
}

export async function proxy(request) {
  const token = request.cookies.get(COOKIE_NAME)?.value
  const isValid = await verifyToken(token, process.env.COOKIE_SECRET)

  if (!isValid) {
    const loginUrl = new URL('/login', request.url)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!login|api/login|api/logout|_next/static|_next/image|favicon.ico).*)',
  ],
}
