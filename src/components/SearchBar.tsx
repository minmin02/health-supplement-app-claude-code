"use client"

import { useSupplementSearch } from '@/hooks/useSupplementSearch'

interface Props {
  initialQuery?: string
  placeholder?: string
}

export default function SearchBar({
  initialQuery = '',
  placeholder = '건강식품 검색...',
}: Props) {
  const { inputValue, setInputValue } = useSupplementSearch(initialQuery)

  return (
    <div className="relative w-full">
      <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-gray-400">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
        </svg>
      </span>
      <input
        type="search"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-gray-300 py-2 pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  )
}
