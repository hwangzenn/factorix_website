import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const locale = request.nextUrl.pathname.startsWith("/en") ? "en" : "ko";

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-locale", locale);

  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
