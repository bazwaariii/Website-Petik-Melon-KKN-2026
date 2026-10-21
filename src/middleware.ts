import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect admin routes except login
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    
    // If Supabase is configured, check auth cookie or session
    if (supabaseUrl) {
      const authCookie = request.cookies.get('sb-access-token') || request.cookies.get('supabase-auth-token');
      // If no session cookie, check for standard local admin session cookie
      const mockAdminCookie = request.cookies.get('admin_session');
      if (!authCookie && !mockAdminCookie) {
        return NextResponse.redirect(new URL('/admin/login', request.url));
      }
    } else {
      // Local fallback mode: check mock admin cookie
      const mockAdminCookie = request.cookies.get('admin_session');
      if (!mockAdminCookie) {
        return NextResponse.redirect(new URL('/admin/login', request.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
