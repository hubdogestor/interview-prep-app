import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Pega o token de sessão do NextAuth
  const token = request.cookies.get("authjs.session-token") || 
                request.cookies.get("__Secure-authjs.session-token");
  
  const isLoggedIn = !!token;
  const isAuthPage = pathname.startsWith("/auth");

  // Se está na página de auth e já está logado, redireciona para home
  if (isAuthPage && isLoggedIn) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Se não está na página de auth e não está logado, redireciona para login
  if (!isAuthPage && !isLoggedIn) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
