import { getUserFromDb } from '@/utils/db'
import NextAuth from 'next-auth'
import { ZodError } from 'zod'
import Credentials from 'next-auth/providers/credentials'
import { signInSchema } from '@/lib/zod'

export const { handlers, auth } = NextAuth({
  providers: [
    Credentials({
      authorize: async (credentials) => {
        try {
          const { email, password } = await signInSchema.parseAsync(credentials)

          // 평문 비밀번호를 직접 전달하여 getUserFromDb 내에서 검증
          const user = await getUserFromDb(email, password)

          if (!user) {
            throw new Error('잘못된 인증 정보입니다.')
          }

          return user
        } catch (error) {
          if (error instanceof ZodError) {
            return null
          }
          // 다른 에러도 null을 반환하도록 수정
          return null
        }
      },
    }),
  ],
  callbacks: {
    authorized({ request, auth }) {
      const isLoggedIn = !!auth?.user
      if (request.nextUrl.pathname.startsWith('/api/') || isLoggedIn) {
        return true
      }
    },
  },
})
