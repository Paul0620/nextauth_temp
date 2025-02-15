import Credentials from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { compareSync } from 'bcryptjs'
import NextAuth from 'next-auth'

import { prisma } from './prisma'

export const { signIn, signOut, auth, handlers } = NextAuth({
  /**
   * 어댑터 역할:
   * - 사용자 관리: 생성, 업데이트, 삭제
   * - 계정 연결: 인증 제공자와 연결/해제
   * - 세션 관리: 로그인 상태 유지
   * - 비밀번호 없는 인증 지원
   */
  adapter: PrismaAdapter(prisma),
  /**
   * 인증 제공자 설정 ex) Credentials, Google, Github, Apple, etc
   */
  providers: [
    Credentials({
      credentials: {
        email: { type: 'email' },
        password: { type: 'password' },
      },
      authorize: async (credentials) => {
        let user = null

        const { email, password } = credentials

        user = await prisma.user.findFirst({
          where: {
            email: email as string,
          },
        })

        if (!user || !compareSync(password as string, user.password as string)) {
          throw new Error('Invalid credentials')
        }

        return user
      },
    }),
  ],
  /**
   * 세션 저장 형태 및 기간 등 설정
   * 기본값은 jwt이나 adapter를 사용하는 경우 database로 변경
   */
  session: {
    strategy: 'jwt', // JSON Web Token 사용
    maxAge: 60 * 60 * 24, // 세션 만료 시간 1일
  },
  pages: {
    signIn: '/auth/sign-in',
  },
  callbacks: {
    authorized: async ({ auth }) => {
      // middleware에서 페이지 인증 처리를 여기서 다 처리 할 수 있는걸로 보임
      return !!auth
    },
  },
})
