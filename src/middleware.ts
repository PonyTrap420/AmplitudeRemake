import { NextRequest, NextResponse } from 'next/server';
import rateLimit from './lib/ratelimit';
import { cookies } from 'next/headers';
import { decrypt } from './lib/session';
import { ipAddress } from '@vercel/functions'

const protectedRoutes = ['/channels']
const publicRoutes = ['/login', '/register']

export const middleware = async (req: NextRequest) => {
  if(req.nextUrl.pathname.startsWith('/api')) {
    if (!rateLimit(ipAddress(req))) {
      return new NextResponse('Too many requests. Please try again later.', { status: 429 });
    }
  }

  const path = req.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.includes(path)
  const isPublicRoute = publicRoutes.includes(path)

  if(req.nextUrl.pathname == '/')
    return NextResponse.redirect(new URL('/login', req.nextUrl.toString()))

  const cookie = (await cookies()).get('session')?.value
  const session = await decrypt(cookie)

  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL('/login', req.nextUrl.toString()))
  }

  if (
    isPublicRoute &&
    session?.userId
  ) {
    return NextResponse.redirect(new URL('/channels/me', req.nextUrl.toString()))
  }

  const requestHeaders = new Headers(req.headers);
  requestHeaders.set('x-url', req.url);

  return NextResponse.next({
    request: {
      // Apply new request headers
      headers: requestHeaders,
    }
  });

}
export const config = {
  matcher: ['/((?!_next/|_static|_vercel|[\\w-]+\\.\\w+).*)'],
};