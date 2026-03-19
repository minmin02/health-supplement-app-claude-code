# 검색·분석 도메인 컨텍스트

## 담당 범위
- 건강식품 목록 조회 (페이지네이션, 카테고리 필터)
- 통합 검색 (이름 기반 키워드 검색)
- 건강식품 상세 (성분, 효능, 주의사항)
- 북마크 (찜 기능)

## 핵심 파일
- `src/services/SupplementService.ts` — 목록/검색/상세 로직
- `src/services/BookmarkService.ts` — 북마크 토글/조회
- `src/app/api/supplements/route.ts` — GET 목록
- `src/app/api/supplements/search/route.ts` — GET 검색
- `src/app/api/supplements/[id]/route.ts` — GET 상세
- `src/app/api/bookmarks/route.ts` — POST 토글, GET 목록
- `src/components/SupplementCard.tsx` — 카드 UI
- `src/components/SearchBar.tsx` — 검색 입력
- `src/components/BookmarkButton.tsx` — 북마크 버튼
- `src/hooks/useSupplementSearch.ts` — 클라이언트 검색 훅

## 규칙
- benefits 필드를 노출하는 모든 컴포넌트는 반드시 `<Disclaimer />` 포함
- API 응답의 supplement 데이터에는 `disclaimer` 문자열 필드 포함
- 검색은 `name` 필드 `contains` 쿼리 사용 (대소문자 무시: `mode: 'insensitive'`)
- 페이지네이션 기본값: `page=1`, `limit=20`, 최대 `limit=100`
- 북마크 API는 인증 필수

## 카테고리
비타민 | 미네랄 | 오메가 | 프로바이오틱스 | 단백질 | 허브 | 기타
