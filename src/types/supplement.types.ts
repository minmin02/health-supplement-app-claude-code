import type { Supplement, Review, Bookmark, User } from '@prisma/client'

export type { Supplement, Review, Bookmark, User }

export interface PaginatedResult<T> {
  items: T[]
  total: number
  page: number
  limit: number
}

export interface ApiSuccess<T> {
  success: true
  data: T
}

export interface ApiError {
  success: false
  error: {
    code: 'UNAUTHORIZED' | 'FORBIDDEN' | 'NOT_FOUND' | 'VALIDATION_ERROR' | 'INTERNAL_ERROR'
    message: string
  }
}

export type ApiResponse<T> = ApiSuccess<T> | ApiError

export const DISCLAIMER = '이 정보는 참고용이며, 전문의 상담을 권장합니다.'

export const SUPPLEMENT_CATEGORIES = [
  '비타민',
  '미네랄',
  '오메가',
  '프로바이오틱스',
  '단백질',
  '허브',
  '기타',
] as const

export type SupplementCategory = (typeof SUPPLEMENT_CATEGORIES)[number]
