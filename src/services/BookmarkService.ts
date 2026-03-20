import { prisma } from '@/lib/prisma'
import type { PaginatedResult } from '@/types/supplement.types'
import type { Supplement } from '@prisma/client'

export const BookmarkService = {
  async toggle(userId: string, supplementId: string): Promise<{ bookmarked: boolean }> {
    const existing = await prisma.bookmark.findUnique({
      where: { userId_supplementId: { userId, supplementId } },
    })

    if (existing) {
      await prisma.bookmark.delete({
        where: { userId_supplementId: { userId, supplementId } },
      })
      return { bookmarked: false }
    }

    await prisma.bookmark.create({ data: { userId, supplementId } })
    return { bookmarked: true }
  },

  async isBookmarked(userId: string, supplementId: string): Promise<boolean> {
    const row = await prisma.bookmark.findUnique({
      where: { userId_supplementId: { userId, supplementId } },
    })
    return row !== null
  },

  async getBookmarkedList(
    userId: string,
    page: number = 1,
    limit: number = 20
  ): Promise<PaginatedResult<Supplement>> {
    const skip = (page - 1) * limit

    const [bookmarks, total] = await prisma.$transaction([
      prisma.bookmark.findMany({
        where: { userId },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: { supplement: true },
      }),
      prisma.bookmark.count({ where: { userId } }),
    ])

    return {
      items: bookmarks.map((b) => b.supplement),
      total,
      page,
      limit,
    }
  },
}
