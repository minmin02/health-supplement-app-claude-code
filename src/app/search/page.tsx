import SearchBar from '@/components/SearchBar'
import SupplementCard from '@/components/SupplementCard'
import { SupplementService } from '@/services/SupplementService'

interface Props {
  searchParams: Promise<{ q?: string; page?: string }>
}

export default async function SearchPage({ searchParams }: Props) {
  const { q, page: pageParam } = await searchParams
  const query = q?.trim() ?? ''
  const page = Math.max(1, Number(pageParam ?? 1))

  const result = query ? await SupplementService.search(query, page) : null

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="mb-4 text-2xl font-bold text-gray-900">건강식품 검색</h1>

      <SearchBar initialQuery={query} />

      <div className="mt-6">
        {!query && (
          <p className="text-center text-sm text-gray-500">검색어를 입력해주세요.</p>
        )}

        {result && result.total === 0 && (
          <p className="text-center text-sm text-gray-500">
            &apos;{query}&apos;에 대한 결과가 없습니다.
          </p>
        )}

        {result && result.total > 0 && (
          <>
            <p className="mb-4 text-sm text-gray-600">
              <span className="font-medium text-gray-900">{result.total}개</span>의 결과
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {result.items.map((supplement) => (
                <SupplementCard key={supplement.id} supplement={supplement} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
