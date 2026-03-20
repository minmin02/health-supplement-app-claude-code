"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export function useSupplementSearch(initialQuery = '') {
  const [inputValue, setInputValue] = useState(initialQuery)
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      const q = inputValue.trim()
      router.push(q ? `/search?q=${encodeURIComponent(q)}` : '/search')
    }, 300)

    return () => clearTimeout(timer)
  }, [inputValue, router])

  return { inputValue, setInputValue }
}
