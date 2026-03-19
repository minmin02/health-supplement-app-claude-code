'use client'

import { useState } from 'react'
import ChatWindow from './ChatWindow'
import ChatInput from './ChatInput'
import { ChatMessage } from '@/services/ChatService'

export default function ChatContainer() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [streamingText, setStreamingText] = useState('')
  const [isStreaming, setIsStreaming] = useState(false)

  async function handleSend(message: string) {
    if (isStreaming) return

    const nextMessages: ChatMessage[] = [...messages, { role: 'user', content: message }]
    setMessages(nextMessages)
    setIsStreaming(true)
    setStreamingText('')

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, history: messages }),
      })

      if (!response.ok || !response.body) {
        throw new Error('응답 오류')
      }

      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let accumulated = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const raw = decoder.decode(value, { stream: true })
        const lines = raw.split('\n')

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue
          const payload = line.slice(6)
          if (payload === '[DONE]') break

          try {
            const parsed = JSON.parse(payload)
            if (parsed.error) throw new Error(parsed.error)
            if (parsed.text) {
              accumulated += parsed.text
              setStreamingText(accumulated)
            }
          } catch {
            // 파싱 실패 라인 무시
          }
        }
      }

      setMessages([...nextMessages, { role: 'assistant', content: accumulated }])
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : '오류가 발생했습니다.'
      setMessages([...nextMessages, { role: 'assistant', content: `오류: ${errorMsg}` }])
    } finally {
      setStreamingText('')
      setIsStreaming(false)
    }
  }

  return (
    <div className="flex flex-col h-full">
      <ChatWindow messages={messages} streamingText={streamingText} />
      <ChatInput onSend={handleSend} disabled={isStreaming} />
    </div>
  )
}
