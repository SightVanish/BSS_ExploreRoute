import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Protect /todos
  if (pathname.startsWith("/todos")) {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      const url = new URL("/auth/sign-in", request.url);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  runtime: "nodejs",
  matcher: ["/todos"],
};
