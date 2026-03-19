import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

async function verifySession(cookie: string, secret: string): Promise<boolean> {
  if (!cookie || !cookie.includes('.')) return false
  const parts = cookie.split('.')

  let payload: string
  let signature: string

  if (parts.length === 3) {
    // New format: token.timestamp.signature
    payload = `${parts[0]}.${parts[1]}`
    signature = parts[2]
    // Check server-side expiry (24h)
    const created = parseInt(parts[1], 36)
    if (Date.now() - created > 24 * 60 * 60 * 1000) return false
  } else if (parts.length === 2) {
    // Legacy format: token.signature
    payload = parts[0]
    signature = parts[1]
  } else {
    return false
  }

  if (!payload || !signature) return false

  const encoder = new TextEncoder()
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret.trim()),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  const sig = await crypto.subtle.sign('HMAC', key, encoder.encode(payload))
  const expected = Array.from(new Uint8Array(sig)).map(b => b.toString(16).padStart(2, '0')).join('')
  return expected === signature
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Redirect old /login to /admin
  if (pathname === '/login') {
    return NextResponse.redirect(new URL('/admin', request.url))
  }

  // Protect admin sub-routes — redirect to /admin if not authenticated
  // /admin itself is allowed through (it handles its own auth check)
  if (pathname.startsWith('/admin/')) {
    const session = request.cookies.get('admin_session')?.value
    const secret = process.env.ADMIN_PASSWORD || ''

    if (!session || !await verifySession(session, secret)) {
      return NextResponse.redirect(new URL('/admin', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // Only run middleware on admin routes and login redirect
    '/admin/:path*',
    '/login',
  ],
}
