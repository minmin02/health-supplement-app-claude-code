import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export default async function MyPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/login')
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { createdAt: true },
  })

  const createdAt = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '-'

  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-12">
      <h1 className="mb-8 text-2xl font-bold text-gray-900">마이페이지</h1>

      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500">
          프로필
        </h2>
        <dl className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <dt className="text-sm text-gray-500">이름</dt>
            <dd className="text-sm font-medium text-gray-900">
              {session.user.name ?? '-'}
            </dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-sm text-gray-500">이메일</dt>
            <dd className="text-sm font-medium text-gray-900">{session.user.email}</dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-sm text-gray-500">가입일</dt>
            <dd className="text-sm font-medium text-gray-900">{createdAt}</dd>
          </div>
        </dl>
      </section>

      <section className="mt-6 grid grid-cols-2 gap-4">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm text-center">
          <p className="text-3xl font-bold text-gray-900">0</p>
          <p className="mt-1 text-sm text-gray-500">북마크</p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm text-center">
          <p className="text-3xl font-bold text-gray-900">0</p>
          <p className="mt-1 text-sm text-gray-500">리뷰</p>
        </div>
      </section>
    </main>
  )
}
