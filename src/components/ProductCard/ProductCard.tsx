import Link from 'next/link';
import Image from 'next/image';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  id: string;
  name: string;
  brand?: string;
  imageUrl?: string;
  tags?: string[];
}

export default function ProductCard({ id, name, brand, imageUrl, tags = [] }: ProductCardProps) {
  // If no image, use a placeholder
  const displayImage = imageUrl || '/placeholder.png'; // Need a placeholder image or generic div
  
  return (
    <Link href={`/supplements/${id}`} className={styles.card}>
      <div className={styles.imageWrapper}>
        {/* Placeholder styling without real Next.js Image to avoid configuration errors if not set */}
        <div 
          className={styles.image} 
          style={{ backgroundImage: `url(${displayImage})`, backgroundColor: '#F7F9FA' }} 
        />
      </div>
      <div className={styles.content}>
        {brand && <span className={styles.brand}>{brand}</span>}
        <h3 className={styles.name}>{name}</h3>
        
        {tags && tags.length > 0 && (
          <div className={styles.tags}>
            {tags.slice(0, 3).map((tag, idx) => (
              <span key={idx} className={styles.tag}>{tag}</span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
