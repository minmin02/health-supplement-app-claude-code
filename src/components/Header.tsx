"use client"

import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'

export default function Header() {
  const { data: session, status } = useSession()

  return (
    <header className="w-full border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-lg font-bold text-gray-900 hover:text-blue-600 transition-colors">
          건강식품 정보
        </Link>

        <nav className="flex items-center gap-3">
          {status === 'loading' ? null : session ? (
            <>
              <Link
                href="/mypage"
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                마이페이지
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
              >
                로그아웃
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="rounded-lg bg-blue-600 px-3 py-1.5 text-sm text-white hover:bg-blue-700 transition-colors"
            >
              로그인
            </Link>
          )}
        </nav>
      </div>
    </header>
  )
}
