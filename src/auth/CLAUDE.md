# 인증 도메인 컨텍스트

## 담당 범위
- 이메일 회원가입 / 로그인
- 소셜 로그인 (Google, Kakao)
- 세션 관리 (JWT 기반)
- 마이페이지

## 핵심 파일
- `src/lib/auth.ts` — NextAuth 설정 (authOptions export)
- `src/app/api/auth/[...nextauth]/route.ts` — NextAuth 핸들러
- `src/app/api/auth/register/route.ts` — 회원가입 커스텀 엔드포인트
- `src/services/UserService.ts` — 유저 비즈니스 로직
- `src/app/(auth)/login/` — 로그인 페이지
- `src/app/(auth)/register/` — 회원가입 페이지
- `src/app/mypage/` — 마이페이지

## 규칙
- 비밀번호는 bcrypt (`saltRounds=12`)로 해싱 후 `passwordHash` 필드에 저장
- 클라이언트 컴포넌트에서 세션 접근: `useSession()` (next-auth/react)
- 서버 컴포넌트/Route Handler에서 세션 접근: `getServerSession(authOptions)`
- 인증 필요 페이지는 서버 컴포넌트에서 `redirect('/login')` 처리
- `NEXTAUTH_SECRET` 환경변수 필수 (32자 이상 랜덤 문자열)

## 세션 타입 확장
`src/types/next-auth.d.ts`에서 `session.user.id` 타입 선언 필요:
```ts
declare module 'next-auth' {
  interface Session {
    user: { id: string; email: string; name?: string | null }
  }
}
```
