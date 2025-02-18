import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const protectedRoutes = ["/admin/dashboard", "/admin/dashboard"];
const publicRoutes = ["/", "/admin/login", "/admin/forget-password"];

export async function middleware(req: NextRequest) {
  const cookie = (await cookies()).get("token");
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.some((route) =>
    path.startsWith(route)
  );
  const isPublicRoute = publicRoutes.includes(path);

  // If the user is not authenticated and trying to access a protected route, redirect to login
  if (isProtectedRoute && !cookie?.value) {
    return NextResponse.redirect(new URL("/admin/login", req.nextUrl));
  }

  // If the user is authenticated and trying to access a public route, redirect to dashboard
  if (isPublicRoute && cookie?.value) {
    return NextResponse.redirect(new URL("/admin/dashboard", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/dashboard/:path*", "/admin/:path*"],
};
