import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // Улучшенное кэширование для изображений
  if (request.nextUrl.pathname.startsWith('/_next/image')) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable, s-maxage=31536000')
    response.headers.set('CDN-Cache-Control', 'public, max-age=31536000, immutable')
    response.headers.set('Vercel-CDN-Cache-Control', 'public, max-age=31536000, immutable')
    response.headers.set('Surrogate-Control', 'public, max-age=31536000, immutable')
  }

  // Кэширование статических файлов
  if (request.nextUrl.pathname.startsWith('/_next/static')) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable, s-maxage=31536000')
    response.headers.set('CDN-Cache-Control', 'public, max-age=31536000, immutable')
    response.headers.set('Vercel-CDN-Cache-Control', 'public, max-age=31536000, immutable')
  }

  // Кэширование иконок и изображений
  if (request.nextUrl.pathname.startsWith('/icons/') || 
      request.nextUrl.pathname.startsWith('/public/') ||
      request.nextUrl.pathname.match(/\.(png|jpg|jpeg|gif|webp|svg|ico)$/)) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable, s-maxage=31536000')
  }

  return response
}

export const config = {
  matcher: [
    '/_next/image/:path*',
    '/_next/static/:path*',
    '/icons/:path*',
    '/public/:path*',
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
