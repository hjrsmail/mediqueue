import { auth } from "@/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const session = await auth();
  const { pathname } = request.nextUrl;

  // Daftar route publik
  const publicRoutes = [
    "/",
    "/login",
    "/register",
    "/unauthorized",
    "/favicon.ico",
    "/daftar-antrian",
  ];

  //  pengecekan untuk route dinamis seperti /bukti-antrian/:id
  const isPublic =
    publicRoutes.includes(pathname) ||
    pathname.startsWith("/bukti-antrian/") ||
    pathname.startsWith("/unauthorized");

  // izinkan akses jika termasuk public route
  if (isPublic) {
    return NextResponse.next();
  }

  // klo belum login dan bukan login page → redirect ke /login
  if (!session?.user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const role = session.user.role;

  //  Akses terbatas berdasarkan role
  if (pathname.startsWith("/admin") && role !== "ADMIN") {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  if (pathname.startsWith("/petugas") && role !== "PETUGAS") {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  //  clear, lanjutkan
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Hanya jalankan middleware untuk route yang bukan:
     * - _next (static files)
     * - images (public images)
     * - api (API routes)
     * - favicon.ico
     */
    "/((?!_next|images|favicon.ico|api).*)",
  ],
};
