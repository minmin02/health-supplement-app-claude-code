import { notFound } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { SupplementService } from '@/services/SupplementService'
import { BookmarkService } from '@/services/BookmarkService'
import { authOptions } from '@/lib/auth'
import Disclaimer from '@/components/Disclaimer'
import BookmarkButton from '@/components/BookmarkButton'
import SupplementTabs from './SupplementTabs'

interface Props {
  params: Promise<{ id: string }>
}

export default async function SupplementDetailPage({ params }: Props) {
  const { id } = await params

  let supplement
  try {
    supplement = await SupplementService.findById(id)
  } catch {
    notFound()
  }

  const session = await getServerSession(authOptions)
  const isLoggedIn = session !== null
  const initialBookmarked = isLoggedIn
    ? await BookmarkService.isBookmarked(session.user.id, id)
    : false

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <div className="mb-6">
        <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
          {supplement.category}
        </span>
      </div>

      <div className="mb-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{supplement!.name}</h1>
            {supplement!.brand && (
              <p className="mt-1 text-sm text-gray-500">{supplement!.brand}</p>
            )}
          </div>
          <BookmarkButton
            supplementId={supplement!.id}
            initialBookmarked={initialBookmarked}
            isLoggedIn={isLoggedIn}
          />
        </div>
        {supplement!.description && (
          <p className="mt-4 text-sm leading-relaxed text-gray-700">{supplement!.description}</p>
        )}
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <SupplementTabs
          ingredients={supplement.ingredients}
          benefits={supplement.benefits}
          cautions={supplement.cautions}
        />
      </div>

      <div className="mt-6 rounded-lg bg-gray-50 px-4 py-3">
        <Disclaimer />
      </div>
    </main>
  )
}
