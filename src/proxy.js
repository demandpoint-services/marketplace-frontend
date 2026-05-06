import { NextResponse } from "next/server";

export function proxy(request) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  const isProtected =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/bookings") ||
    pathname.startsWith("/profile") ||
    pathname.startsWith("/artisan");

  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/bookings/:path*",
    "/profile/:path*",
    "/artisan/:path*",
  ],
};
