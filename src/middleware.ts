import { NextRequest, NextResponse } from "next/server";
import { sessionKey, unauthorizationPages } from "./app/assets/data/constants";

export function middleware(request: NextRequest) {
  const {
    cookies,
    nextUrl: { pathname },
    url,
  } = request;

  const session = cookies.get(sessionKey)?.value;

  const isUnauthorizedPage = unauthorizationPages.some(page => pathname.startsWith(page));

  if (session && isUnauthorizedPage) {
    return NextResponse.redirect(new URL("/", url));
  }

  if (!session && !isUnauthorizedPage) {
    return NextResponse.redirect(new URL("/login", url));
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
