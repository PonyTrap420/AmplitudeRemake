import { NextResponse } from "next/server";
import { type MiddlewareFunctionProps } from '@rescale/nemo'; 

export async function urlMiddleware({request}: MiddlewareFunctionProps) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-url', request.url);

  return NextResponse.next({
    request: {
      // Apply new request headers
      headers: requestHeaders,
    }
  });
}
