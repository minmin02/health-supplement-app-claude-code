import { NextResponse } from 'next/server'
import { UserService } from '@/services/UserService'

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json()

    if (
      typeof body !== 'object' ||
      body === null ||
      !('email' in body) ||
      !('password' in body) ||
      !('name' in body)
    ) {
      return NextResponse.json(
        { success: false, error: { code: 'VALIDATION_ERROR', message: '이메일, 비밀번호, 이름은 필수입니다.' } },
        { status: 400 }
      )
    }

    const { email, password, name } = body as Record<string, unknown>

    if (typeof email !== 'string' || typeof password !== 'string' || typeof name !== 'string') {
      return NextResponse.json(
        { success: false, error: { code: 'VALIDATION_ERROR', message: '입력값 형식이 올바르지 않습니다.' } },
        { status: 400 }
      )
    }

    if (password.length < 8) {
      return NextResponse.json(
        { success: false, error: { code: 'VALIDATION_ERROR', message: '비밀번호는 8자 이상이어야 합니다.' } },
        { status: 400 }
      )
    }

    const user = await UserService.createUser(email.trim(), password, name.trim())

    return NextResponse.json({ success: true, data: user }, { status: 201 })
  } catch (error) {
    if (error instanceof Error && error.message === 'EMAIL_ALREADY_EXISTS') {
      return NextResponse.json(
        { success: false, error: { code: 'VALIDATION_ERROR', message: '이미 사용 중인 이메일입니다.' } },
        { status: 409 }
      )
    }

    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_ERROR', message: '서버 오류가 발생했습니다.' } },
      { status: 500 }
    )
  }
}
