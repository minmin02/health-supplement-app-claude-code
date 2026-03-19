'use client'

import { useEffect, useRef } from 'react'
import Disclaimer from '@/components/Disclaimer'
import { ChatMessage } from '@/services/ChatService'

interface Props {
  messages: ChatMessage[]
  streamingText: string
}

export default function ChatWindow({ messages, streamingText }: Props) {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, streamingText])

  return (
    <div className="flex flex-col flex-1 overflow-y-auto p-4 gap-4">
      {messages.length === 0 && !streamingText && (
        <div className="flex flex-col items-center justify-center flex-1 text-gray-400 gap-2">
          <p className="text-lg font-medium">건강식품 AI 어시스턴트</p>
          <p className="text-sm">궁금한 건강식품 정보를 질문해 보세요.</p>
          <Disclaimer />
        </div>
      )}

      {messages.map((msg, i) => (
        <div
          key={i}
          className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm whitespace-pre-wrap ${
              msg.role === 'user'
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-800'
            }`}
          >
            {msg.content}
          </div>
        </div>
      ))}

      {streamingText && (
        <div className="flex justify-start">
          <div className="max-w-[75%] rounded-2xl px-4 py-2 text-sm whitespace-pre-wrap bg-gray-100 text-gray-800">
            {streamingText}
            <span className="inline-block w-1 h-4 ml-0.5 bg-gray-500 animate-pulse align-text-bottom" />
          </div>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  )
}
