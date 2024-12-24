import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "./prisma";
import { saltAndHashPassword } from "@/core/utils/password";
import { PrismaAdapter } from "@auth/prisma-adapter";

export const { signIn, signOut, auth, handlers } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      authorize: async (credentials) => {
        let user = null;

        const { email, password } = credentials;

        const pwHash = saltAndHashPassword(password as string);

        user = await prisma.user.findFirst({
          where: {
            email: email as string,
            password: pwHash,
          },
        });

        if (!user) {
          throw new Error("Invalid credentials");
        }

        return user;
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt", // JSON Web Token 사용
    maxAge: 60 * 60 * 24, // 세션 만료 시간 1일
  },
  pages: {
    signIn: "/auth/sign-in",
  },
});
