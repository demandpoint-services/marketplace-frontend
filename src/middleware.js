import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("token");

  const isProtected =
    request.nextUrl.pathname.startsWith("/bookings") ||
    request.nextUrl.pathname.startsWith("/profile") ||
    request.nextUrl.pathname.startsWith("/artisan/dashboard");

  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/bookings/:path*", "/profile/:path*", "/artisan/dashboard/:path*"],
};
