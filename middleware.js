// middleware.js
import { NextResponse } from "next/server";
import { parse } from "cookie";

export function middleware(request) {
  try {
    const cookieHeader = request.headers.get("cookie") || "";
    const parsedCookies = parse(cookieHeader);
    const token = parsedCookies.token;
    
    console.log("---Middleware checking path:---", request.nextUrl.pathname);
    console.log("Token present:", !!token);

    if (!token) {
      console.log("No token found, redirecting to login");
      return NextResponse.redirect(new URL("/login", request.url));
    }

    console.log("Token found, proceeding to dashboard");
    return NextResponse.next();
  } catch (error) {
    console.error("Middleware error:", error);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/admin/dashboard", "/admin/dashboard/:path*"]
};
