import { anthropic } from '@/lib/anthropic'

const SYSTEM_PROMPT = `당신은 건강식품 정보 전문 AI 어시스턴트입니다.
- 건강식품의 성분, 효능, 주의사항에 대한 정보를 제공합니다.
- 모든 건강 관련 정보는 참고용이며, 전문의 상담을 권장한다고 반드시 안내하세요.
- 의학적 진단이나 처방은 제공하지 않습니다.`

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

export const ChatService = {
  async *streamResponse(
    message: string,
    history: ChatMessage[] = []
  ): AsyncGenerator<string> {
    const messages: ChatMessage[] = [
      ...history,
      { role: 'user', content: message },
    ]

    const stream = anthropic.messages.stream({
      model: 'claude-sonnet-4-6',
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages,
    })

    for await (const event of stream) {
      if (
        event.type === 'content_block_delta' &&
        event.delta.type === 'text_delta'
      ) {
        yield event.delta.text
      }
    }
  },
}
