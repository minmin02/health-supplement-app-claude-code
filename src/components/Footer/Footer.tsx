import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <h2 className={styles.logo}>🌿 HealthNutri</h2>
          <p className={styles.desc}>신뢰할 수 있는 건강기능식품 정보 서비스</p>
        </div>
        
        <div className={styles.links}>
          <div className={styles.linkColumn}>
            <h3>서비스</h3>
            <ul>
              <li><Link href="/">홈</Link></li>
              <li><Link href="/supplements">전체 상품</Link></li>
              <li><Link href="/search">통합 검색</Link></li>
            </ul>
          </div>
          <div className={styles.linkColumn}>
            <h3>고객지원</h3>
            <ul>
              <li><Link href="/faq">자주 묻는 질문</Link></li>
              <li><Link href="/contact">문의하기</Link></li>
              <li><Link href="/terms">이용약관</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        <p>&copy; {new Date().getFullYear()} HealthNutri. All rights reserved.</p>
        <p className={styles.disclaimer}>본 사이트의 건강기능식품 정보는 제조사 제공 정보를 바탕으로 하며, 질병의 예방 및 치료를 위한 의학적 조언을 대신할 수 없습니다.</p>
      </div>
    </footer>
  );
}
