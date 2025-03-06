import { prisma } from '@/lib/prisma'

export async function getUserFromDb(email: string, password: Promise<string>) {
  // TODO: 암호화 작업
  console.log(password)

  return prisma.user.findUnique({
    where: { email },
  })
}
