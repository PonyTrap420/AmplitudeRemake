import { createMiddleware } from "@rescale/nemo";
import { rateLimitMiddleware } from "./middlewares/ratelimiter";
import { urlMiddleware } from "./middlewares/url";

const middlewares = {
  "/api": rateLimitMiddleware,
  "/*": urlMiddleware
};


export const middleware = createMiddleware(middlewares);

export const config = {
  matcher: "/((?!api/|_next/|_static|_vercel|[\\w-]+\\.\\w+).*)",
};