import HeroBanner from '@/components/HeroBanner/HeroBanner';
import CategoryMenu from '@/components/CategoryMenu/CategoryMenu';
import CurationSection from '@/components/CurationSection/CurationSection';
import Footer from '@/components/Footer/Footer';

export default function Home() {
  return (
    <main className="main-content">
      <HeroBanner />
      <CategoryMenu />
      <CurationSection />
      <Footer />
    </main>
  );
}
