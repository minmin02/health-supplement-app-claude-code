import Link from 'next/link'
import type { Supplement } from '@/types/supplement.types'
import Disclaimer from '@/components/Disclaimer'

interface Props {
  supplement: Supplement
}

export default function SupplementCard({ supplement }: Props) {
  const { id, name, brand, category, description, benefits } = supplement

  return (
    <Link href={`/supplements/${id}`} className="block rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
            {category}
          </span>
          <h3 className="mt-1 text-base font-semibold text-gray-900">{name}</h3>
          {brand && <p className="text-sm text-gray-500">{brand}</p>}
        </div>
      </div>

      {description && (
        <p className="mt-2 text-sm text-gray-600 line-clamp-2">{description}</p>
      )}

      {benefits.length > 0 && (
        <div className="mt-2">
          <ul className="flex flex-wrap gap-1">
            {benefits.slice(0, 3).map((benefit: string) => (
              <li key={benefit} className="text-xs text-gray-600 bg-gray-100 px-2 py-0.5 rounded">
                {benefit}
              </li>
            ))}
          </ul>
          <Disclaimer />
        </div>
      )}
    </Link>
  )
}
