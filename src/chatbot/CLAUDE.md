# 챗봇 도메인 컨텍스트

## 담당 범위
- AI 챗봇 Q&A (건강식품 관련 질문)
- 컨디션 기반 맞춤 추천
- SSE 스트리밍 응답

## 핵심 파일
- `src/services/ChatService.ts` — Claude API 호출, 스트리밍 로직
- `src/app/api/chat/route.ts` — POST, SSE 응답
- `src/app/chat/page.tsx` — 챗봇 페이지 (인증 필수)
- `src/app/chat/ChatWindow.tsx` — 스트리밍 메시지 표시
- `src/app/chat/ChatInput.tsx` — 메시지 입력

## 규칙
- `/api/chat`는 인증 필수 (`getServerSession` 검증)
- 시스템 프롬프트에 반드시 아래 지침 포함:
  > "건강 관련 정보는 참고용으로만 제공하며, 전문의 상담을 권장하라고 반드시 안내하세요."
- 응답은 `text/event-stream` Content-Type으로 스트리밍
- 클라이언트는 `ReadableStream` reader로 청크 단위 처리
- 사용 모델: `claude-sonnet-4-6` (최신 Claude 모델)

## 시스템 프롬프트 템플릿
```
당신은 건강식품 정보 전문 AI 어시스턴트입니다.
- 건강식품의 성분, 효능, 주의사항에 대한 정보를 제공합니다.
- 모든 건강 관련 정보는 참고용이며, 전문의 상담을 권장한다고 반드시 안내하세요.
- 의학적 진단이나 처방은 제공하지 않습니다.
```
