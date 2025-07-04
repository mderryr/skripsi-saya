import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { updateSession, rateLimitCheck } from '@/services/login/auth';
import { userAgent } from 'next/server';

export async function middleware(request: NextRequest) {
  try {
    const { device } = userAgent(request);
    const deviceType = device.type === 'mobile' ? 'mobile' : 'desktop';

    // Buat response
    const response = NextResponse.next();

    // Set headers ke response
    response.headers.set('x-device-type', deviceType);
    response.cookies.set('device-type', deviceType, { 
      path: '/',
      sameSite: 'strict'
    });

    // Handle session update
    const sessionResponse = await updateSession(request);
    const rateLimitResult = await rateLimitCheck(request);

    // Jika ada error pada rate limit, arahkan ke halaman error
    if (rateLimitResult?.error) {
      return NextResponse.redirect(new URL('/error', request.url));
    }

    // Check session
    if (sessionResponse) {
      return sessionResponse;
    }

    return response;
  } catch (error:any) {
    console.error("Middleware error:", error);

    // Tangani kesalahan token kedaluwarsa
    if (error.code === 'ERR_JWT_EXPIRED') {
      // Hapus cookie sesi
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.set("session", "", { expires: new Date(0) }); // Menghapus cookie sesi
      return response; // Kembalikan response yang telah dimodifikasi
    }

    return NextResponse.redirect(new URL('/error', request.url)); // Arahkan ke halaman error jika terjadi kesalahan lain
  }
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
    '/admin/:path*'
  ],
}