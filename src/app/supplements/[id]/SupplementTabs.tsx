"use client"

import { useState } from 'react'
import Disclaimer from '@/components/Disclaimer'

interface Props {
  ingredients: string[]
  benefits: string[]
  cautions: string[]
}

type TabKey = 'ingredients' | 'benefits' | 'cautions'

const TABS: { key: TabKey; label: string }[] = [
  { key: 'ingredients', label: '성분 분석' },
  { key: 'benefits', label: '효능 안내' },
  { key: 'cautions', label: '주의사항' },
]

export default function SupplementTabs({ ingredients, benefits, cautions }: Props) {
  const [activeTab, setActiveTab] = useState<TabKey>('ingredients')

  return (
    <div>
      <div className="flex border-b border-gray-200">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-6 py-3 text-sm font-medium transition-colors ${
              activeTab === tab.key
                ? 'border-b-2 border-green-600 text-green-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="py-6">
        {activeTab === 'ingredients' && (
          <ul className="space-y-2">
            {ingredients.length > 0 ? (
              ingredients.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-green-500" />
                  {item}
                </li>
              ))
            ) : (
              <li className="text-sm text-gray-400">성분 정보가 없습니다.</li>
            )}
          </ul>
        )}

        {activeTab === 'benefits' && (
          <div>
            <ul className="space-y-2">
              {benefits.length > 0 ? (
                benefits.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-green-500" />
                    {item}
                  </li>
                ))
              ) : (
                <li className="text-sm text-gray-400">효능 정보가 없습니다.</li>
              )}
            </ul>
            <Disclaimer />
          </div>
        )}

        {activeTab === 'cautions' && (
          <ul className="space-y-2">
            {cautions.length > 0 ? (
              cautions.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="mt-1 text-orange-500">⚠</span>
                  {item}
                </li>
              ))
            ) : (
              <li className="text-sm text-gray-400">주의사항이 없습니다.</li>
            )}
          </ul>
        )}
      </div>
    </div>
  )
}
