import { NextResponse } from 'next/server'
import { SupplementService } from '@/services/SupplementService'
import { DISCLAIMER } from '@/types/supplement.types'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const page = Math.max(1, Number(searchParams.get('page') ?? 1))
    const limit = Math.min(100, Math.max(1, Number(searchParams.get('limit') ?? 20)))
    const category = searchParams.get('category') ?? undefined

    const result = await SupplementService.findMany(page, limit, category)

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
