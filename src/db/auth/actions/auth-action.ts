"use server";

import { hashPassword } from "@/core/utils/password-util";
import { prisma } from "@/lib/prisma";

export interface SignUpFormData {
  email: string;
  password: string;
  name: string;
}

export const handleSignUp = async (data: SignUpFormData) => {
  const { email, password, name } = data;

  const isExistUser = await prisma.user.findUnique({
    where: { email },
  });

  if (isExistUser) {
    throw new Error("이미 존재하는 이메일입니다.");
  }

  const user = await prisma.user.create({
    data: { email, password: await hashPassword(password), name },
  });

  return user;
};
