'use client'

interface Props {
  onSend: (message: string) => void
  disabled: boolean
}

export default function ChatInput({ onSend, disabled }: Props) {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const input = form.elements.namedItem('message') as HTMLInputElement
    const value = input.value.trim()
    if (!value) return
    onSend(value)
    input.value = ''
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      const value = e.currentTarget.value.trim()
      if (!value || disabled) return
      onSend(value)
      e.currentTarget.value = ''
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 p-4 border-t border-gray-200 bg-white">
      <textarea
        name="message"
        rows={2}
        disabled={disabled}
        onKeyDown={handleKeyDown}
        placeholder="건강식품에 대해 궁금한 점을 물어보세요..."
        className="flex-1 resize-none rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-50 disabled:text-gray-400"
      />
      <button
        type="submit"
        disabled={disabled}
        className="self-end rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        {disabled ? '응답 중...' : '전송'}
      </button>
    </form>
  )
}
