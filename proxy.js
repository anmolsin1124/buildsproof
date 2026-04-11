import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';

// Routes accessible WITHOUT authentication
const PUBLIC_ROUTES = ['/', '/auth', '/login', '/signup'];

export async function proxy(request) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // MUST call getUser() to refresh session cookies
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  // Allow static files, API routes, and OAuth callback
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/auth/callback') ||
    pathname.includes('.')
  ) {
    return supabaseResponse;
  }

  // If logged in and hitting /auth → redirect to /role
  if (user && (pathname === '/auth' || pathname === '/login')) {
    const url = request.nextUrl.clone();
    url.pathname = '/role';
    return NextResponse.redirect(url);
  }

  // Allow public routes without auth
  if (PUBLIC_ROUTES.includes(pathname)) {
    return supabaseResponse;
  }

  // All other routes require authentication
  if (!user) {
    const url = request.nextUrl.clone();
    url.pathname = '/auth';
    url.searchParams.set('redirectTo', pathname);
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
