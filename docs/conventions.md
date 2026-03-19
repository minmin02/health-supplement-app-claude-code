# 코딩 컨벤션

## 컴포넌트

- 컴포넌트 하나당 파일 하나 (`UserCard.tsx`, `SupplementDetail.tsx`)
- 파일명과 컴포넌트명은 PascalCase 일치
- 서버 컴포넌트가 기본; 상태/이벤트 필요 시 상단에 `"use client"` 선언
- props 타입은 파일 내 `interface Props` 로 정의 (export 불필요)

```tsx
// 서버 컴포넌트 (기본)
interface Props {
  supplementId: string
}

export default async function SupplementDetail({ supplementId }: Props) {
  const data = await SupplementService.findById(supplementId)
  return <div>{data.name}</div>
}
```

```tsx
// 클라이언트 컴포넌트
"use client"

interface Props {
  onSearch: (query: string) => void
}

export default function SearchBar({ onSearch }: Props) { ... }
```

## 건강 효능 면책 문구

건강 효능 정보를 표시하는 컴포넌트는 반드시 `Disclaimer` 컴포넌트를 포함해야 한다.

```tsx
import Disclaimer from '@/components/Disclaimer'

export default function BenefitsList({ benefits }: Props) {
  return (
    <div>
      <ul>{benefits.map(b => <li key={b}>{b}</li>)}</ul>
      <Disclaimer />
    </div>
  )
}
```

`Disclaimer` 컴포넌트 출력 텍스트: *"이 정보는 참고용이며, 전문의 상담을 권장합니다."*

## 파일 네이밍

| 종류 | 규칙 | 예시 |
|------|------|------|
| 컴포넌트 | PascalCase | `SupplementCard.tsx` |
| 훅 | camelCase, `use` 접두사 | `useSupplementSearch.ts` |
| 서비스 | PascalCase + `Service` | `SupplementService.ts` |
| 유틸 | camelCase | `formatDate.ts` |
| 타입 정의 | camelCase | `supplement.types.ts` |
| Route Handler | `route.ts` (Next.js 고정) | `route.ts` |

## 임포트 순서

1. 외부 라이브러리 (`react`, `next/*`)
2. 내부 절대 경로 (`@/components/*`, `@/services/*`)
3. 상대 경로 (`./`, `../`)

## 서비스 함수 패턴

```ts
// src/services/SupplementService.ts
import { prisma } from '@/lib/prisma'

export const SupplementService = {
  async findById(id: string) {
    return prisma.supplement.findUniqueOrThrow({ where: { id } })
  },

  async search(query: string, page = 1, limit = 20) {
    const skip = (page - 1) * limit
    const [items, total] = await prisma.$transaction([
      prisma.supplement.findMany({ where: { name: { contains: query } }, skip, take: limit }),
      prisma.supplement.count({ where: { name: { contains: query } } }),
    ])
    return { items, total, page, limit }
  },
}
```

## Tailwind 클래스 순서

레이아웃 → 크기 → 간격 → 색상 → 텍스트 → 기타 순으로 작성한다.

## TypeScript

- `any` 사용 금지; 불가피한 경우 `unknown` 후 타입 가드
- 비동기 함수는 명시적 반환 타입 권장
- Prisma 생성 타입 (`Supplement`, `User` 등) 을 직접 재사용
