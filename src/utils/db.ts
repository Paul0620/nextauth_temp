import { prisma } from '@/lib/prisma'

export async function getUserFromDb(email: string, password: Promise<string>) {
  return prisma.user.findUnique({
    where: { email, password },
  })
}
