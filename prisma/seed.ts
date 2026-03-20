import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import * as XLSX from 'xlsx'
import * as path from 'path'
import 'dotenv/config'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

// 식품중분류명 → DB 카테고리 매핑
const CATEGORY_MAP: Record<string, string> = {
  // 비타민
  '비타민 A': '비타민',
  '비타민 B1': '비타민',
  '비타민 B2': '비타민',
  '비타민 B6': '비타민',
  '비타민 B12': '비타민',
  '비타민 C': '비타민',
  '비타민 D': '비타민',
  '비타민 E': '비타민',
  '베타카로틴': '비타민',
  '비오틴': '비타민',
  '엽산': '비타민',
  '나이아신': '비타민',
  '판토텐산': '비타민',

  // 미네랄
  '칼슘': '미네랄',
  '철': '미네랄',
  '마그네슘': '미네랄',
  '아연': '미네랄',
  '셀레늄': '미네랄',
  '칼륨': '미네랄',

  // 오메가
  'EPA 및 DHA 함유 유지': '오메가',
  '감마리놀렌산 함유 유지': '오메가',
  '공액리놀레산': '오메가',
  '스쿠알렌': '오메가',
  '알콕시글리세롤 함유 상어간유': '오메가',
  '필수 지방산': '오메가',
  '옥타코사놀 함유 유지': '오메가',

  // 프로바이오틱스
  '프로바이오틱스': '프로바이오틱스',

  // 단백질
  '단백질': '단백질',
  '크레아틴': '단백질',

  // 허브
  '홍삼': '허브',
  '홍국': '허브',
  '녹차추출물': '허브',
  '밀크씨슬 추출물': '허브',
  '은행잎 추출물': '허브',
  '가르시니아캄보지아 추출물': '허브',
  '바나바잎 추출물': '허브',
  '알로에 겔': '허브',
  '쏘팔메토 열매 추출물': '허브',
  '클로렐라': '허브',
  '스피루리나': '허브',
  '프로폴리스추출물': '허브',
  '회화나무열매추출물': '허브',
  '토마토추출물': '허브',
  '마리골드꽃추출물': '허브',
  '엽록소 함유 식물': '허브',
  '대두이소플라본': '허브',
  '레시틴': '허브',
  '테아닌': '허브',
  '히알루론산': '허브',
  '코엔자임Q10': '허브',
  '키토산/키토올리고당': '허브',
  '글루코사민': '허브',
  'NAG': '허브',
  '뮤코다당·단백': '허브',
  '포스파티딜세린': '허브',
  '폴리덱스트로스': '허브',
  '프락토올리고당': '허브',
  '구아검/구아검가수분해물': '허브',
  '귀리식이섬유': '허브',
}

function mapCategory(subCategory: string): string {
  return CATEGORY_MAP[subCategory] ?? '기타'
}

// 영양성분 필드 → ingredients 배열 생성
function buildIngredients(row: Record<string, unknown>): string[] {
  const fields: Array<[string, string]> = [
    ['에너지(kcal)', 'kcal'],
    ['단백질(g)', 'g'],
    ['지방(g)', 'g'],
    ['탄수화물(g)', 'g'],
    ['당류(g)', 'g'],
    ['식이섬유(g)', 'g'],
    ['칼슘(mg)', 'mg'],
    ['철(mg)', 'mg'],
    ['인(mg)', 'mg'],
    ['칼륨(mg)', 'mg'],
    ['나트륨(mg)', 'mg'],
    ['비타민A(μg RAE)', 'μg RAE'],
    ['비타민 C(mg)', 'mg'],
    ['비타민 D(μg)', 'μg'],
    ['비타민 E(mg α-TE)', 'mg α-TE'],
    ['비타민 B6 / 피리독신(mg)', 'mg'],
    ['비타민 B12(μg)', 'μg'],
    ['엽산(μg DFE)', 'μg DFE'],
    ['마그네슘(mg)', 'mg'],
    ['아연(mg)', 'mg'],
    ['셀레늄(μg)', 'μg'],
    ['EPA와 DHA의 합(mg)', 'mg'],
    ['오메가3 지방산(g)', 'g'],
  ]

  const result: string[] = []
  for (const [field, unit] of fields) {
    const val = row[field]
    if (val !== null && val !== undefined && val !== '' && val !== 0) {
      const name = field.replace(/\(.*\)/, '').trim()
      result.push(`${name}: ${val}${unit}`)
    }
  }

  // 1회분량 정보 추가
  if (row['1회분량 중량/부피']) {
    result.push(`1회분량: ${row['1회분량 중량/부피']}`)
  }

  return result
}

async function main() {
  const filePath = path.join(__dirname, 'data', '20251230_건강기능식품DB_4380건.xlsx')
  const wb = XLSX.readFile(filePath)
  const ws = wb.Sheets[wb.SheetNames[0]]
  const rows = XLSX.utils.sheet_to_json(ws) as Record<string, unknown>[]

  console.log(`총 ${rows.length}건 데이터 로드 완료`)

  // 기존 데이터 초기화
  await prisma.supplement.deleteMany()
  console.log('기존 supplement 데이터 초기화 완료')

  const BATCH_SIZE = 100
  let inserted = 0

  for (let i = 0; i < rows.length; i += BATCH_SIZE) {
    const batch = rows.slice(i, i + BATCH_SIZE)

    const data = batch
      .filter((row) => row['식품명'])
      .map((row) => ({
        name: String(row['식품명']),
        brand: row['제조사명'] ? String(row['제조사명']) : null,
        category: mapCategory(String(row['식품중분류명'] ?? '')),
        description: [
          row['유형명'] ? `유형: ${row['유형명']}` : null,
          row['식품소분류명'] && row['식품소분류명'] !== '해당없음'
            ? `분류: ${row['식품소분류명']}`
            : null,
          row['섭취대상'] ? `섭취대상: ${row['섭취대상']}` : null,
          row['1일 섭취 횟수'] ? `1일 ${row['1일 섭취 횟수']}회` : null,
        ]
          .filter(Boolean)
          .join(' | ') || null,
        ingredients: buildIngredients(row),
        benefits: [] as string[],
        cautions: [] as string[],
        imageUrl: null,
      }))

    await prisma.supplement.createMany({ data, skipDuplicates: true })
    inserted += data.length
    console.log(`진행 중: ${inserted}/${rows.length}`)
  }

  console.log(`완료: 총 ${inserted}건 삽입`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
