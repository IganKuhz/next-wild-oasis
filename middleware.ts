// import { NextResponse, type NextRequest } from 'next/server';

// export function middleware(request: NextRequest) {
//   return NextResponse.redirect(new URL('/about', request.url));
// }

import { auth } from '@/src/lib/auth';

export const middleware = auth;

export const config = {
  matcher: ['/account'],
};
