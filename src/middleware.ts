export { auth as middleware } from '@/lib/auth'

// 인증이 필요하지 않은 경로 설정
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|auth).*)'],
}
