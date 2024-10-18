import { NextResponse } from "next/server";
import rateLimit from "@/lib/ratelimit";
import { type MiddlewareFunctionProps } from '@rescale/nemo'; 

export function rateLimitMiddleware({request}: MiddlewareFunctionProps) {
    if (!rateLimit(request.ip)) {
        return new NextResponse('Too many requests. Please try again later.', { status: 429 });
    }
    return new NextResponse();
}
