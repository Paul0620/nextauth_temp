import { prisma } from '@/lib/prisma'
import { verifyPassword } from './password'

export async function getUserFromDb(email: string, password: string) {
  // 1. 사용자의 정보를 DB에서 조회
  const user = await prisma.user.findUnique({
    where: { email },
  })

  if (!user) {
    throw new Error('사용자를 찾을 수 없습니다')
  }

  // 2. 저장된 해시된 비밀번호와 사용자가 입력한 평문 비밀번호 비교
  const isPasswordValid = await verifyPassword(password, user.password!)

  if (!isPasswordValid) {
    throw new Error('잘못된 비밀번호입니다')
  }

  return user
}
