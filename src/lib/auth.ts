import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "./prisma";
import { comparePassword } from "@/core/utils/password-util";
import { PrismaAdapter } from "@auth/prisma-adapter";

export const { auth, handlers } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      authorize: async (credentials) => {
        const email = credentials?.email as string;
        const password = credentials?.password as string;

        if (!email || !password) throw new Error("empty email or password");

        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) throw new Error("아이디 또는 비밀번호를 확인해주세요(i)");

        const isPasswordValid = await comparePassword(password, user.password!);

        if (!isPasswordValid)
          throw new Error("아이디 또는 비밀번호를 확인해주세요(p)");

        return user;
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/auth/sign-in",
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },
  callbacks: {
    session: async ({ session }) => {
      if (session && session.user && session.user.email) {
        const user = await prisma.user.findUnique({
          where: { email: session.user.email },
        });

        session.user.name = user?.name;
      }
      return session;
    },
  },
});
