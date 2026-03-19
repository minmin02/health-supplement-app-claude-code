# API 스펙

## 표준 응답 형식

모든 API 응답은 아래 형식을 따른다.

```ts
// 성공
{ success: true, data: T }

// 실패
{ success: false, error: { code: string, message: string } }
```

## 에러 코드

| code | 의미 |
|------|------|
| `UNAUTHORIZED` | 인증 필요 |
| `FORBIDDEN` | 권한 없음 |
| `NOT_FOUND` | 리소스 없음 |
| `VALIDATION_ERROR` | 입력값 오류 |
| `INTERNAL_ERROR` | 서버 내부 오류 |

---

## 건강식품 (Supplements)

### `GET /api/supplements`
건강식품 목록 조회 (페이지네이션)

**Query params**
| 파라미터 | 타입 | 필수 | 설명 |
|---------|------|------|------|
| `page` | number | 아니오 | 페이지 번호 (기본값: 1) |
| `limit` | number | 아니오 | 페이지당 항목 수 (기본값: 20, 최대: 100) |
| `category` | string | 아니오 | 카테고리 필터 |

**응답 예시**
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "clx...",
        "name": "비타민C 1000mg",
        "category": "비타민",
        "brand": "브랜드명",
        "disclaimer": "이 정보는 참고용이며, 전문의 상담을 권장합니다."
      }
    ],
    "total": 120,
    "page": 1,
    "limit": 20
  }
}
```

### `GET /api/supplements/search`
건강식품 검색

**Query params**
| 파라미터 | 타입 | 필수 | 설명 |
|---------|------|------|------|
| `q` | string | 예 | 검색 키워드 |
| `page` | number | 아니오 | 페이지 번호 |
| `limit` | number | 아니오 | 페이지당 항목 수 |

### `GET /api/supplements/[id]`
건강식품 상세 조회

**응답 예시**
```json
{
  "success": true,
  "data": {
    "id": "clx...",
    "name": "비타민C 1000mg",
    "category": "비타민",
    "brand": "브랜드명",
    "ingredients": ["ascorbic acid 1000mg"],
    "benefits": ["항산화", "면역 지원"],
    "cautions": ["공복 복용 시 위장 장애 가능"],
    "disclaimer": "이 정보는 참고용이며, 전문의 상담을 권장합니다."
  }
}
```

---

## 챗봇 (Chat)

### `POST /api/chat`
AI 챗봇 질의 (스트리밍)

**인증 필요**: 예

**Request body**
```json
{
  "message": "오메가3 효능이 뭐야?",
  "sessionId": "optional-session-id"
}
```

**응답**: `text/event-stream` (SSE)

---

## 인증 (Auth)

NextAuth.js 기본 경로 사용:
- `POST /api/auth/signin`
- `POST /api/auth/signout`
- `GET /api/auth/session`
- `GET /api/auth/providers`

### `POST /api/auth/register`
신규 회원가입 (커스텀 엔드포인트)

**Request body**
```json
{
  "email": "user@example.com",
  "password": "...",
  "name": "홍길동"
}
```

---

## Route Handler 작성 규칙

```ts
// src/app/api/supplements/route.ts 예시
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const data = await SupplementService.findMany()
    return NextResponse.json({ success: true, data })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_ERROR', message: '서버 오류' } },
      { status: 500 }
    )
  }
}
```
