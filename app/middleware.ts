import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { withAuth } from "next-auth/middleware";

const protectedRoutes = ["/dashboard"];
const publicRoutes = ["/admin/login", "/", "/admin/forget-password"];

export async function middleware(req: NextRequest) {
  const cookie: any = (await cookies()).get("token");
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);
  // const cookie = cookies().get("token");
  if (!cookie?.value) {
    if (
      req.nextUrl.pathname.startsWith("/dashboard") ||
      req.nextUrl.pathname.startsWith("/admin")
    ) {
      return NextResponse.redirect(new URL("/", req.nextUrl));
    }
  }
  if (
    isPublicRoute &&
    cookie?.value &&
    !req.nextUrl.pathname.startsWith("/home") &&
    !req.nextUrl.pathname.startsWith("/admin")
  ) {
    return NextResponse.redirect(new URL("/home", req.nextUrl));
  }

  return NextResponse.next();
}
export const config = {
  matcher: [
    "/",
    "/dashboard",
    "/login",
    "/signup",
    "/admin/:path*",
    "/forget-password",
  ],
};
export default withAuth({});
