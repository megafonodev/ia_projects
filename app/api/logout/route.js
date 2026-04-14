import { NextResponse } from 'next/server'

const COOKIE_NAME = 'auth_session'

export async function GET(request) {
  const loginUrl = new URL('/login', request.url)
  const response = NextResponse.redirect(loginUrl)
  response.cookies.set(COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  })
  return response
}
