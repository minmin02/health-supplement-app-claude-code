"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface Props {
  supplementId: string
  initialBookmarked: boolean
  isLoggedIn: boolean
}

export default function BookmarkButton({ supplementId, initialBookmarked, isLoggedIn }: Props) {
  const [bookmarked, setBookmarked] = useState(initialBookmarked)
  const [isPending, setIsPending] = useState(false)
  const router = useRouter()

  async function handleClick(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()

    if (!isLoggedIn) {
      window.alert('로그인이 필요합니다.')
      router.push('/login')
      return
    }

    if (isPending) return

    const previousValue = bookmarked
    setBookmarked((prev) => !prev)
    setIsPending(true)

    try {
      const res = await fetch('/api/bookmarks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ supplementId }),
      })

      if (!res.ok) {
        setBookmarked(previousValue)
        window.alert('북마크 처리 중 오류가 발생했습니다.')
        return
      }

      const json = await res.json()
      if (json.success) {
        setBookmarked(json.data.bookmarked)
      } else {
        setBookmarked(previousValue)
        window.alert('북마크 처리 중 오류가 발생했습니다.')
      }
    } catch {
      setBookmarked(previousValue)
      window.alert('북마크 처리 중 오류가 발생했습니다.')
    } finally {
      setIsPending(false)
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      aria-label={bookmarked ? '북마크 해제' : '북마크 추가'}
      className={`flex items-center justify-center rounded-full p-2 transition-colors
        ${isPending ? 'cursor-not-allowed opacity-50' : 'hover:bg-red-50 active:scale-95'}
        ${bookmarked ? 'text-red-500' : 'text-gray-400'}`}
    >
      {bookmarked ? (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      )}
    </button>
  )
}
