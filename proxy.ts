// // import createMiddleware from 'next-intl/middleware'
// // import { routing } from './i18n/routing'

// import NextAuth from "next-auth";
// import authConfig from "./auth.config";

// // const intlMiddleware = createMiddleware(routing)
// const { auth } = NextAuth(authConfig);
// export default auth;

// export const config = {
//   // Skip all paths that should not be internationalized
//   matcher: [
//     "/account/:path*",
//     "/admin/:path*",
//     "/checkout/:path*",
//     "/order/:path*",
//   ],
//   // matcher: ["/((?!api|_next|.*\\..*).*)"],
// };

// middleware.ts
import NextAuth from "next-auth";
import createMiddleware from "next-intl/middleware";
import authConfig from "./auth.config";
import { routing } from "./i18n/routing";
// 1. Setup the i18n middleware
const intlMiddleware = createMiddleware(routing);

// 2. Setup Auth
const { auth } = NextAuth(authConfig);

export default auth((req) => {
  // This handles the automatic redirect from / to /en-US
  return intlMiddleware(req);
});

export const config = {
  // The matcher must allow the middleware to "see" the root and the locale paths
  matcher: [
    // Match the root /
    "/",
    // Match any path starting with your locale codes
    "/(en-US|fr|ar)/:path*",
    // Standard exclusions for internal Next.js files and static assets
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
};
