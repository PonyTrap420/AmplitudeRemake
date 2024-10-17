import { NextRequest, NextResponse } from 'next/server';
import rateLimit from './lib/ratelimit';

export default function middleware(request: NextRequest) {
  if (!rateLimit(request.ip)) {
    return new NextResponse('Too many requests. Please try again later.', { status: 429 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/:path*'],
};