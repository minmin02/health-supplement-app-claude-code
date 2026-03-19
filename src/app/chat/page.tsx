import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import ChatContainer from './ChatContainer'

export default async function ChatPage() {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect('/login')
  }

  return (
    <main className="flex flex-col h-[calc(100vh-4rem)] max-w-3xl mx-auto">
      <div className="px-4 py-3 border-b border-gray-200 bg-white">
        <h1 className="text-lg font-semibold text-gray-800">건강식품 AI 어시스턴트</h1>
        <p className="text-xs text-gray-500">건강식품 성분·효능·주의사항을 안내해 드립니다.</p>
      </div>
      <ChatContainer />
    </main>
  )
}
