# DB 스키마

## 규칙

- 스키마 변경 시 반드시 `npx prisma migrate dev --name <설명>` 으로 migration 파일 생성
- 마이그레이션 파일은 커밋에 포함
- `prisma/schema.prisma` 가 단일 소스 오브 트루스

---

## 현재 스키마 (`prisma/schema.prisma`)

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  // url은 prisma.config.ts의 datasource.url 에서 관리 (Prisma 7+)
}

// 사용자
model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String?
  passwordHash  String?
  emailVerified DateTime?
  image         String?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  accounts      Account[]
  sessions      Session[]
  reviews       Review[]
  bookmarks     Bookmark[]
}

// NextAuth.js 연동 테이블
model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String?
  access_token      String?
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String?
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
}

// 건강식품
model Supplement {
  id          String   @id @default(cuid())
  name        String
  brand       String?
  category    String
  description String?
  ingredients String[] // 원재료 목록
  benefits    String[] // 효능 (항상 면책 문구와 함께 노출)
  cautions    String[] // 주의사항
  imageUrl    String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  reviews     Review[]
  bookmarks   Bookmark[]

  @@index([category])
  @@index([name])
}

// 리뷰
model Review {
  id           String     @id @default(cuid())
  userId       String
  supplementId String
  rating       Int        // 1~5
  content      String
  createdAt    DateTime   @default(now())
  updatedAt    DateTime   @updatedAt

  user         User       @relation(fields: [userId], references: [id], onDelete: Cascade)
  supplement   Supplement @relation(fields: [supplementId], references: [id], onDelete: Cascade)

  @@unique([userId, supplementId])
}

// 북마크
model Bookmark {
  id           String     @id @default(cuid())
  userId       String
  supplementId String
  createdAt    DateTime   @default(now())

  user         User       @relation(fields: [userId], references: [id], onDelete: Cascade)
  supplement   Supplement @relation(fields: [supplementId], references: [id], onDelete: Cascade)

  @@unique([userId, supplementId])
}
```

---

## 카테고리 목록 (category 필드 허용값)

| 값 | 설명 |
|----|------|
| `비타민` | 비타민류 |
| `미네랄` | 철분, 칼슘 등 |
| `오메가` | 오메가3/6/9 |
| `프로바이오틱스` | 유산균 |
| `단백질` | 프로틴, 아미노산 |
| `허브` | 홍삼, 강황 등 |
| `기타` | 분류 외 |

---

## 마이그레이션 예시

```bash
# 스키마 변경 후
npx prisma migrate dev --name add_supplement_tags

# 프로덕션 적용
npx prisma migrate deploy

# Prisma Client 재생성
npx prisma generate
```
