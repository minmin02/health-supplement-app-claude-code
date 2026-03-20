import Link from 'next/link';
import styles from './CategoryMenu.module.css';

const CATEGORIES = [
  { id: 'vitamin', label: '비타민', icon: '💊', color: '#FFF3E0' },
  { id: 'mineral', label: '미네랄/철분', icon: '🩸', color: '#FCE4EC' },
  { id: 'probiotics', label: '유산균', icon: '🦠', color: '#E8F5E9' },
  { id: 'omega3', label: '오메가3', icon: '🐟', color: '#E3F2FD' },
  { id: 'lutein', label: '루테인/눈건강', icon: '👀', color: '#F3E5F5' },
  { id: 'collagen', label: '콜라겐/피부', icon: '✨', color: '#FFF8E1' },
  { id: 'protein', label: '단백질/아미노산', icon: '💪', color: '#EFEBE9' },
  { id: 'all', label: '전체보기', icon: '🔍', color: '#F5F5F5' },
];

export default function CategoryMenu() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {CATEGORIES.map((cat) => (
            <Link key={cat.id} href={`/supplements?category=${cat.id}`} className={styles.item}>
              <div className={styles.iconBox} style={{ backgroundColor: cat.color }}>
                <span className={styles.emoji}>{cat.icon}</span>
              </div>
              <span className={styles.label}>{cat.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
