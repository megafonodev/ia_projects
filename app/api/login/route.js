import { NextResponse } from 'next/server'
import crypto from 'crypto'

const COOKIE_NAME = 'auth_session'
const SESSION_DATA = 'emd:session'
const MAX_ATTEMPTS = 5
const WINDOW_MS = 15 * 60 * 1000 // 15 minutos

// Rate limiter en memoria (se reinicia en cada cold start de Vercel)
const attempts = new Map()

function checkRateLimit(ip) {
  const now = Date.now()
  const entry = attempts.get(ip)

  if (!entry || now > entry.resetAt) {
    attempts.set(ip, { count: 1, resetAt: now + WINDOW_MS })
    return false
  }

  if (entry.count >= MAX_ATTEMPTS) return true
  entry.count++
  return false
}

function clearRateLimit(ip) {
  attempts.delete(ip)
}

async function hashPassword(password) {
  const hash = await globalThis.crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(password)
  )
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

async function generateToken(secret) {
  const key = await globalThis.crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  const sig = await globalThis.crypto.subtle.sign(
    'HMAC',
    key,
    new TextEncoder().encode(SESSION_DATA)
  )
  return btoa(String.fromCharCode(...new Uint8Array(sig)))
}

export async function POST(request) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'

  if (checkRateLimit(ip)) {
    return NextResponse.json(
      { error: 'Demasiados intentos fallidos. Espera 15 minutos.' },
      { status: 429 }
    )
  }

  let body
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Solicitud inválida.' }, { status: 400 })
  }

  const { password } = body
  if (!password || typeof password !== 'string') {
    return NextResponse.json(
      { error: 'Contraseña requerida.' },
      { status: 400 }
    )
  }

  const submittedHash = await hashPassword(password)
  const storedHash = process.env.SITE_PASSWORD_HASH || ''

  // Comparación en tiempo constante para evitar timing attacks
  const a = Buffer.from(submittedHash)
  const b = Buffer.from(
    storedHash.length === 64 ? storedHash : 'f'.repeat(64)
  )
  const isValid =
    crypto.timingSafeEqual(a, b) && storedHash.length === 64

  if (!isValid) {
    // Delay artificial para dificultar brute force
    await new Promise((r) => setTimeout(r, 500))
    return NextResponse.json(
      { error: 'Contraseña incorrecta.' },
      { status: 401 }
    )
  }

  clearRateLimit(ip)

  const token = await generateToken(process.env.COOKIE_SECRET || '')

  const response = NextResponse.json({ ok: true })
  response.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 días
  })

  return response
}
