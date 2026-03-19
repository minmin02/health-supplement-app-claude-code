import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { authOptions } from '@/lib/auth'
import { ChatService, ChatMessage } from '@/services/ChatService'

export async function POST(request: Request): Promise<Response> {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json(
      { success: false, error: { code: 'UNAUTHORIZED', message: '로그인이 필요합니다.' } },
      { status: 401 }
    )
  }

  let message: string
  let history: ChatMessage[]

  try {
    const body = await request.json()
    message = body.message
    history = body.history ?? []

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { success: false, error: { code: 'VALIDATION_ERROR', message: 'message 필드가 필요합니다.' } },
        { status: 400 }
      )
    }
  } catch {
    return NextResponse.json(
      { success: false, error: { code: 'VALIDATION_ERROR', message: '요청 형식이 올바르지 않습니다.' } },
      { status: 400 }
    )
  }

  const encoder = new TextEncoder()

  const stream = new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of ChatService.streamResponse(message, history)) {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text: chunk })}\n\n`))
        }
        controller.enqueue(encoder.encode('data: [DONE]\n\n'))
      } catch {
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify({ error: '응답 생성 중 오류가 발생했습니다.' })}\n\n`)
        )
      } finally {
        controller.close()
      }
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  })
}
