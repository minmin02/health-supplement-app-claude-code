import styles from './CurationSection.module.css';
import ProductCard from '@/components/ProductCard/ProductCard';
import { prisma } from '@/lib/prisma';

export default async function CurationSection() {
  // DB에서 8개 임의 조회 또는 최신순으로 가져옵니다 (서버 컴포넌트)
  let products: any[] = [];
  try {
    products = await prisma.supplement.findMany({
      take: 8,
      orderBy: { createdAt: 'desc' }
    });
  } catch (error) {
    console.error("Failed to fetch products for curation:", error);
  }

  // 데이터가 없을 경우를 대비한 목(Mock) 데이터
  if (!products || products.length === 0) {
    products = Array.from({ length: 8 }).map((_, i) => ({
      id: `mock-${i}`,
      name: `프리미엄 건강기능식품 ${i + 1}`,
      brand: '헬스뉴트리',
      category: '비타민',
      ingredients: ['비타민C', '비타민D'],
      benefits: ['피로회복', '면역력'],
      imageUrl: ''
    }));
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>🎁 지금 이 계절, 가장 많이 찾는 영양제</h2>
          <p className={styles.subtitle}>수많은 고객님들이 선택한 믿을 수 있는 제품들을 만나보세요.</p>
        </div>

        <div className={styles.grid}>
          {products.map((p) => (
            <ProductCard 
              key={p.id}
              id={p.id}
              name={p.name}
              brand={p.brand || '제조사 미상'}
              imageUrl={p.imageUrl || undefined}
              tags={p.ingredients ? p.ingredients.slice(0, 2) : []}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
