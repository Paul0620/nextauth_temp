// import { PrismaClient } from '@prisma/client'

// const globalForPrisma = global as unknown as { prisma?: PrismaClient }

// // 🌟 전역 Prisma Client 인스턴스 유지 (개발 환경에서 중복 생성 방지)
// export const prisma = globalForPrisma.prisma ?? new PrismaClient()

// // 🌟 개발 환경에서는 Prisma 인스턴스를 전역 변수에 할당하여 중복 생성을 방지
// if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
