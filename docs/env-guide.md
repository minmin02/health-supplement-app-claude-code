# 환경변수 가이드

## 파일 구조

```
.env.local        # 로컬 개발용 (gitignore 처리됨, 커밋 금지)
.env.example      # 템플릿 (커밋 포함, 실제 값 없이 키만 기재)
.env.production   # 프로덕션 (배포 플랫폼에서 직접 설정 권장)
```

## 필수 환경변수

### DB

| 변수명 | 설명 | 예시 |
|--------|------|------|
| `DATABASE_URL` | PostgreSQL 연결 문자열 | `postgresql://user:pass@localhost:5432/supplements` |

### 인증 (NextAuth.js)

| 변수명 | 설명 | 예시 |
|--------|------|------|
| `NEXTAUTH_URL` | 앱 기본 URL | `http://localhost:3000` |
| `NEXTAUTH_SECRET` | JWT 서명 시크릿 (32자 이상 랜덤 문자열) | `openssl rand -base64 32` 로 생성 |

### AI (Anthropic)

| 변수명 | 설명 | 획득 방법 |
|--------|------|----------|
| `ANTHROPIC_API_KEY` | Claude API 키 | console.anthropic.com |

### 소셜 로그인 (선택)

| 변수명 | 설명 |
|--------|------|
| `GOOGLE_CLIENT_ID` | Google OAuth 클라이언트 ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth 시크릿 |
| `KAKAO_CLIENT_ID` | 카카오 OAuth 클라이언트 ID |
| `KAKAO_CLIENT_SECRET` | 카카오 OAuth 시크릿 |

---

## `.env.example` 템플릿

```env
# DB
DATABASE_URL=postgresql://USER:PASSWORD@HOST:5432/DATABASE

# Auth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-here

# AI
ANTHROPIC_API_KEY=sk-ant-...

# 소셜 로그인 (선택)
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
KAKAO_CLIENT_ID=
KAKAO_CLIENT_SECRET=
```

---

## Next.js 환경변수 노출 규칙

| 접두사 | 노출 범위 | 사용 위치 |
|--------|----------|----------|
| 없음 | 서버 전용 | Route Handler, 서버 컴포넌트 |
| `NEXT_PUBLIC_` | 클라이언트 포함 전체 | 어디서나 사용 가능 |

**API 키(`ANTHROPIC_API_KEY`, `DATABASE_URL` 등)는 절대 `NEXT_PUBLIC_` 접두사를 붙이지 않는다.**

---

## 로컬 개발 초기 설정

```bash
# 1. 템플릿 복사
cp .env.example .env.local

# 2. .env.local 편집 후 실제 값 입력

# 3. DB 마이그레이션
npx prisma migrate dev

# 4. 개발 서버 실행
npm run dev
```

---

## Prisma에서 환경변수 사용

`prisma/schema.prisma`의 `url = env("DATABASE_URL")` 은 `.env` 또는 `.env.local` 파일을 자동으로 읽는다. Prisma CLI 실행 시 별도 export 불필요.
