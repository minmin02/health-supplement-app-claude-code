'use client'

import { useEffect, useRef } from 'react'
import Disclaimer from '@/components/Disclaimer'
import { ChatMessage } from '@/services/ChatService'

const SUGGESTED_QUESTIONS = [
  '비타민C 효능과 하루 권장량이 궁금해요',
  '오메가3와 오메가6 차이점을 알려줘',
  '프로바이오틱스 복용 시 주의사항은?',
]

interface Props {
  messages: ChatMessage[]
  streamingText: string
  onSuggest?: (question: string) => void
}

export default function ChatWindow({ messages, streamingText, onSuggest }: Props) {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, streamingText])

  return (
    <div className="flex flex-col flex-1 overflow-y-auto p-4 gap-4">
      {messages.length === 0 && !streamingText && (
        <div className="flex flex-col items-center justify-center flex-1 gap-4">
          <div className="text-center text-gray-400">
            <p className="text-lg font-medium">건강식품 AI 어시스턴트</p>
            <p className="text-sm mt-1">궁금한 건강식품 정보를 질문해 보세요.</p>
          </div>
          <div className="flex flex-col gap-2 w-full max-w-sm">
            {SUGGESTED_QUESTIONS.map((q) => (
              <button
                key={q}
                onClick={() => onSuggest?.(q)}
                className="text-left rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-600 hover:bg-green-50 hover:border-green-300 hover:text-green-700 transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
          <Disclaimer />
        </div>
      )}

      {messages.map((msg, i) => {
        const isError = msg.role === 'assistant' && msg.content.startsWith('오류:')
        return (
          <div
            key={i}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[75%] ${msg.role === 'assistant' ? 'flex flex-col gap-1' : ''}`}>
              <div
                className={`rounded-2xl px-4 py-2 text-sm whitespace-pre-wrap ${
                  msg.role === 'user'
                    ? 'bg-green-600 text-white'
                    : isError
                    ? 'bg-red-50 text-red-700 border border-red-200'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {msg.content}
              </div>
              {msg.role === 'assistant' && !isError && <Disclaimer />}
            </div>
          </div>
        )
      })}

      {streamingText && (
        <div className="flex justify-start">
          <div className="max-w-[75%] flex flex-col gap-1">
            <div className="rounded-2xl px-4 py-2 text-sm whitespace-pre-wrap bg-gray-100 text-gray-800">
              {streamingText}
              <span className="inline-block w-1 h-4 ml-0.5 bg-gray-500 animate-pulse align-text-bottom" />
            </div>
            <Disclaimer />
          </div>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  )
}
