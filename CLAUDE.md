# 건강식품 정보 서비스 — 프로젝트 컨텍스트

## ⚠️ 절대 규칙
- 건강 효능 관련 문구는 반드시 면책 문구 포함 ("전문의 상담 권장")
- DB 스키마 변경 시 반드시 Prisma migration 파일 생성
- API 응답은 항상 표준 형식 사용: { success, data, error }
- 컴포넌트 하나당 파일 하나 원칙

## 아키텍처
@docs/architecture.md 참조

## 기술 스택
- Frontend: Next.js 14 App Router + TypeScript + Tailwind
- Backend: Next.js API Routes
- DB: PostgreSQL + Prisma
- Auth: NextAuth.js
- AI: Anthropic Claude API

## 폴더 구조
@docs/folder-structure.md 참조

## API 스펙
@docs/api-spec.md 참조

## DB 스키마
@docs/db-schema.md 참조

## 코딩 컨벤션
@docs/conventions.md 참조

## 환경변수
@docs/env-guide.md 참조

## 빌드 & 실행
- 개발 서버: npm run dev
- 빌드: npm run build
- 테스트: npm run test
- DB 마이그레이션: npx prisma migrate dev

## 도메인별 CLAUDE.md
- 인증: src/auth/CLAUDE.md
- 검색: src/search/CLAUDE.md
- 챗봇: src/chatbot/CLAUDE.md

## 트리거 키워드
- "새 API 만들어줘" → @docs/api-spec.md 참조 후 표준 형식으로 생성
- "컴포넌트 만들어줘" → @docs/conventions.md 참조 후 생성
- "DB 수정해줘" → Prisma schema 수정 + migration 파일 함께 생성