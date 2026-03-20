import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { BookmarkService } from '@/services/BookmarkService'
import { DISCLAIMER } from '@/types/supplement.types'

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json(
        { success: false, error: { code: 'UNAUTHORIZED', message: '로그인이 필요합니다.' } },
        { status: 401 }
      )
    }

    const body: unknown = await request.json()
    if (
      typeof body !== 'object' ||
      body === null ||
      !('supplementId' in body) ||
      typeof (body as Record<string, unknown>).supplementId !== 'string'
    ) {
      return NextResponse.json(
        { success: false, error: { code: 'VALIDATION_ERROR', message: 'supplementId가 필요합니다.' } },
        { status: 400 }
      )
    }

    const { supplementId } = body as { supplementId: string }
    const result = await BookmarkService.toggle(session.user.id, supplementId)

    return NextResponse.json({ success: true, data: result })
  } catch {
    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_ERROR', message: '서버 오류가 발생했습니다.' } },
      { status: 500 }
    )
  }
}

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json(
        { success: false, error: { code: 'UNAUTHORIZED', message: '로그인이 필요합니다.' } },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const page = Math.max(1, Number(searchParams.get('page') ?? 1))
    const limit = Math.min(100, Math.max(1, Number(searchParams.get('limit') ?? 20)))

    const result = await BookmarkService.getBookmarkedList(session.user.id, page, limit)

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
