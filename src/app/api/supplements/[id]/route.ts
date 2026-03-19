import { NextResponse } from 'next/server'
import { SupplementService } from '@/services/SupplementService'
import { DISCLAIMER } from '@/types/supplement.types'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supplement = await SupplementService.findById(id)

    return NextResponse.json({
      success: true,
      data: { ...supplement, disclaimer: DISCLAIMER },
    })
  } catch (error) {
    if (error instanceof Error && error.name === 'NotFoundError') {
      return NextResponse.json(
        { success: false, error: { code: 'NOT_FOUND', message: '건강식품을 찾을 수 없습니다.' } },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_ERROR', message: '서버 오류가 발생했습니다.' } },
      { status: 500 }
    )
  }
}
