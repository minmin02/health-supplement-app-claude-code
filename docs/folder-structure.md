# 폴더 구조

```
health-supplement-app/
├── prisma/
│   ├── schema.prisma          # DB 스키마 (단일 소스)
│   └── migrations/            # 마이그레이션 파일 (자동 생성, 커밋 필수)
│
├── public/                    # 정적 자산
│
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── layout.tsx         # 루트 레이아웃
│   │   ├── page.tsx           # 홈 페이지
│   │   ├── globals.css
│   │   │
│   │   ├── (auth)/            # 인증 관련 페이지 (Route Group)
│   │   │   ├── login/page.tsx
│   │   │   └── register/page.tsx
│   │   │
│   │   ├── supplements/       # 건강식품 페이지
│   │   │   ├── page.tsx       # 목록
│   │   │   └── [id]/page.tsx  # 상세
│   │   │
│   │   ├── search/page.tsx    # 검색 결과
│   │   ├── chat/page.tsx      # AI 챗봇
│   │   │
│   │   └── api/               # Route Handlers
│   │       ├── auth/
│   │       │   ├── [...nextauth]/route.ts
│   │       │   └── register/route.ts
│   │       ├── supplements/
│   │       │   ├── route.ts           # GET (목록)
│   │       │   ├── search/route.ts    # GET (검색)
│   │       │   └── [id]/route.ts      # GET (상세)
│   │       └── chat/route.ts          # POST (AI 챗봇)
│   │
│   ├── components/            # 공유 UI 컴포넌트 (컴포넌트당 파일 하나)
│   │   ├── Disclaimer.tsx     # 건강 면책 문구 컴포넌트
│   │   ├── SupplementCard.tsx
│   │   ├── SearchBar.tsx
│   │   └── ...
│   │
│   ├── services/              # 비즈니스 로직
│   │   ├── SupplementService.ts
│   │   ├── ChatService.ts
│   │   └── UserService.ts
│   │
│   ├── lib/                   # 외부 클라이언트 초기화
│   │   ├── prisma.ts          # Prisma 싱글턴
│   │   ├── auth.ts            # NextAuth 설정
│   │   └── anthropic.ts       # Claude API 클라이언트
│   │
│   ├── types/                 # 공유 타입 정의
│   │   └── supplement.types.ts
│   │
│   ├── hooks/                 # 클라이언트 전용 훅
│   │   └── useSupplementSearch.ts
│   │
│   └── utils/                 # 순수 유틸 함수
│       └── formatDate.ts
│
├── docs/                      # 프로젝트 문서
│   ├── architecture.md
│   ├── api-spec.md
│   ├── conventions.md
│   ├── db-schema.md
│   ├── folder-structure.md
│   └── env-guide.md
│
├── src/auth/CLAUDE.md         # 인증 도메인 컨텍스트
├── src/search/CLAUDE.md       # 검색 도메인 컨텍스트
├── src/chatbot/CLAUDE.md      # 챗봇 도메인 컨텍스트
│
├── CLAUDE.md
├── AGENTS.md
├── next.config.ts
├── tsconfig.json
└── package.json
```

## 주요 규칙

- `src/app/api/` 하위 파일은 Route Handler 전용 (`route.ts`)
- 페이지 컴포넌트(`page.tsx`)는 서버 컴포넌트 기본, 데이터 패칭을 직접 수행
- 재사용 UI는 `src/components/`, 도메인 전용 컴포넌트는 해당 페이지 폴더 내부에 위치
- `src/lib/`는 초기화 코드만; 비즈니스 로직은 `src/services/`로 분리
