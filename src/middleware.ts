import { NextRequest, NextResponse } from 'next/server';
import rateLimit from './lib/ratelimit';
export const middleware = async (req: NextRequest) => {
  if(req.nextUrl.pathname.startsWith('/api')) {
    if (!rateLimit(req.ip)) {
      return new NextResponse('Too many requests. Please try again later.', { status: 429 });
    }
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