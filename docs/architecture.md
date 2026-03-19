# 아키텍처 개요

## 전체 구조

```
사용자 브라우저
    │
    ▼
Next.js App Router (Frontend + API Routes)
    │
    ├── 인증 (NextAuth.js + JWT)
    ├── 건강식품 검색/조회 (Prisma → PostgreSQL)
    ├── AI 챗봇 (Anthropic Claude API)
    └── 정적 자산 (Next.js Image Optimization)
```

## 계층별 역할

### 1. 프레젠테이션 계층 (`src/app/`)
- App Router 기반 서버/클라이언트 컴포넌트 혼합
- 서버 컴포넌트에서 직접 DB 조회 (API 불필요 시)
- 클라이언트 컴포넌트는 `"use client"` 선언 필수

### 2. API 계층 (`src/app/api/`)
- Next.js Route Handlers (`route.ts`)
- 모든 응답은 표준 형식: `{ success, data, error }`
- 인증이 필요한 엔드포인트는 `getServerSession` 으로 세션 검증

### 3. 서비스 계층 (`src/services/`)
- 비즈니스 로직 집중
- DB 접근은 서비스 함수를 통해서만 수행
- AI 챗봇 응답 생성 로직 포함

### 4. DB 계층 (`prisma/`)
- Prisma Client를 통한 단일 DB 접근 경로
- `src/lib/prisma.ts`에서 싱글턴 인스턴스 관리

## 주요 데이터 흐름

### 건강식품 검색
```
검색 입력 → /api/supplements/search → SupplementService → Prisma → PostgreSQL
```

### AI 챗봇
```
사용자 질문 → /api/chat → ChatService → Claude API → 스트리밍 응답
```

### 인증
```
로그인 요청 → NextAuth /api/auth/* → DB 사용자 조회 → JWT 발급
```

## 면책 문구 정책
건강 효능 관련 정보를 노출하는 모든 컴포넌트/API 응답에는 반드시 아래 문구를 포함해야 한다:
> "이 정보는 참고용이며, 전문의 상담을 권장합니다."
