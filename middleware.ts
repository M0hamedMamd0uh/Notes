import { getCookie } from "cookies-next";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { cookies } from "next/headers";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  let isAuth = getCookie("token", { cookies });
  let publicPath = "/";

  if (!isAuth && publicPath.includes(pathname)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/", "/login", "/register"],
};
