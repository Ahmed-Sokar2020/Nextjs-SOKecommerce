// import createMiddleware from 'next-intl/middleware'
// import { routing } from './i18n/routing'

import NextAuth from "next-auth";
import authConfig from "./auth.config";

// const intlMiddleware = createMiddleware(routing)
const { auth } = NextAuth(authConfig);
export default auth;

export const config = {
  // Skip all paths that should not be internationalized
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
