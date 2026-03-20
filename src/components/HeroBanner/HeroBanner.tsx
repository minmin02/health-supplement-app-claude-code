import styles from './HeroBanner.module.css';
import Link from 'next/link';

export default function HeroBanner() {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.content}>
          <span className={styles.badge}>추천 큐레이션</span>
          <h1 className={styles.title}>
            내 몸에 맞는 영양성분,<br />
            어떤 제품을 선택할지 고민되시나요?
          </h1>
          <p className={styles.desc}>
            4천여 개의 엄선된 건강기능식품 데이터를 바탕으로<br />
            나에게 꼭 필요한 영양제를 찾아보세요.
          </p>
          <div className={styles.actions}>
            <Link href="/search" className={styles.primaryButton}>
              성분으로 맞춤 영양제 찾기
            </Link>
          </div>
        </div>
        <div className={styles.illustrationWrapper}>
          {/* Decorative elements to replace an image for now */}
          <div className={styles.circle1}></div>
          <div className={styles.circle2}></div>
          <div className={styles.illustrationText}>🌿 Custom Care</div>
        </div>
      </div>
    </section>
  );
}
