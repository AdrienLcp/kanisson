import { Prisma, PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  return new PrismaClient()
}

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined
}

const prisma = globalForPrisma.prisma ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

type PrismaErrorCode = 'unique_constraint_violation'

type PrismaError = {
  code: PrismaErrorCode,
  fields: string[]
}

export const getPrismaError = (error: unknown): PrismaError | null => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    // Unique constraint violation
    if (error.code === 'P2002' && Array.isArray(error.meta?.target)) {
      return {
        code: 'unique_constraint_violation',
        fields: error.meta.target ?? []
      }
    }
  }

  return null
}
