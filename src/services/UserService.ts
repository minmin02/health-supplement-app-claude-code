import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export const UserService = {
  async findByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } })
  },

  async createUser(email: string, password: string, name: string) {
    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      throw new Error('EMAIL_ALREADY_EXISTS')
    }

    const passwordHash = await bcrypt.hash(password, 12)
    return prisma.user.create({
      data: { email, name, passwordHash },
      select: { id: true, email: true, name: true, createdAt: true },
    })
  },
}
