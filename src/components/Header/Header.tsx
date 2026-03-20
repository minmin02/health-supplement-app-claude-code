import Link from 'next/link';
import { Search, ShoppingBag, User } from 'lucide-react';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.topRow}>
          <Link href="/" className={styles.logo}>
            🌿 HealthNutri
          </Link>

          <div className={styles.searchWrapper}>
            <input 
              type="text" 
              className={styles.searchInput} 
              placeholder="비타민, 오메가3, 혹은 식품명 검색" 
            />
            <button className={styles.searchButton} aria-label="검색">
              <Search size={20} />
            </button>
          </div>

          <div className={styles.actions}>
            <Link href="/mypage" className={styles.iconButton}>
              <User size={24} />
            </Link>
            <Link href="/cart" className={styles.iconButton}>
              <ShoppingBag size={24} />
            </Link>
          </div>
        </div>
        
        <nav className={styles.navBar}>
          <ul className={styles.navList}>
            <li className={styles.navItem}><Link href="/supplements?category=all" className={styles.active}>전체상품</Link></li>
            <li className={styles.navItem}><Link href="/supplements?category=vitamin">비타민</Link></li>
            <li className={styles.navItem}><Link href="/supplements?category=mineral">미네랄</Link></li>
            <li className={styles.navItem}><Link href="/supplements?category=probiotics">유산균</Link></li>
            <li className={styles.navItem}><Link href="/supplements?category=omega3">오메가3</Link></li>
            <li className={styles.navItem}><Link href="/supplements?category=best">베스트</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
