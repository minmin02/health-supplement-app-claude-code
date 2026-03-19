import { NextResponse } from 'next/server'
import { SupplementService } from '@/services/SupplementService'
import { DISCLAIMER } from '@/types/supplement.types'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const q = searchParams.get('q')

    if (!q || q.trim() === '') {
      return NextResponse.json(
        { success: false, error: { code: 'VALIDATION_ERROR', message: '검색어(q)는 필수입니다.' } },
        { status: 400 }
      )
    }

    const page = Math.max(1, Number(searchParams.get('page') ?? 1))
    const limit = Math.min(100, Math.max(1, Number(searchParams.get('limit') ?? 20)))

    const result = await SupplementService.search(q.trim(), page, limit)

    return NextResponse.json({
      success: true,
      data: {
        ...result,
        items: result.items.map((item) => ({ ...item, disclaimer: DISCLAIMER })),
      },
    })
  } catch {
    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_ERROR', message: '서버 오류가 발생했습니다.' } },
      { status: 500 }
    )
  }
}
