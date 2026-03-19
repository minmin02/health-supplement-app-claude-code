import { prisma } from '@/lib/prisma'
import type { Supplement, PaginatedResult } from '@/types/supplement.types'

export const SupplementService = {
  async findMany(
    page: number = 1,
    limit: number = 20,
    category?: string
  ): Promise<PaginatedResult<Supplement>> {
    const skip = (page - 1) * limit
    const where = category ? { category } : {}

    const [items, total] = await prisma.$transaction([
      prisma.supplement.findMany({ where, skip, take: limit, orderBy: { createdAt: 'desc' } }),
      prisma.supplement.count({ where }),
    ])

    return { items, total, page, limit }
  },

  async search(
    query: string,
    page: number = 1,
    limit: number = 20
  ): Promise<PaginatedResult<Supplement>> {
    const skip = (page - 1) * limit
    const where = {
      OR: [
        { name: { contains: query, mode: 'insensitive' as const } },
        { description: { contains: query, mode: 'insensitive' as const } },
      ],
    }

    const [items, total] = await prisma.$transaction([
      prisma.supplement.findMany({ where, skip, take: limit, orderBy: { createdAt: 'desc' } }),
      prisma.supplement.count({ where }),
    ])

    return { items, total, page, limit }
  },

  async findById(id: string): Promise<Supplement> {
    return prisma.supplement.findUniqueOrThrow({ where: { id } })
  },
}
