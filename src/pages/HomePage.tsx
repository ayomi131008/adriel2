import React from 'react';
import { Seo } from '../components/common/Seo';
import { Hero } from '../components/home/Hero';
import { FeaturedProductsSection } from '../components/home/FeaturedProductsSection';
import { ProductCategoriesSection } from '../components/home/ProductCategoriesSection';
import { WhyChooseUs } from '../components/home/WhyChooseUs';
import { WholesaleRetailBanner } from '../components/home/WholesaleRetailBanner';
import { HowOrderingWorks } from '../components/home/HowOrderingWorks';
import { AboutTeaser } from '../components/home/AboutTeaser';
import { LocationCard } from '../components/common/LocationCard';
import { TestimonialsSection } from '../components/home/TestimonialsSection';
import { BulkCtaBand } from '../components/home/BulkCtaBand';
import { Product } from '../types';
import { products } from '../data/products';

interface HomePageProps {
  onEnquire: (product: Product) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onEnquire }) => {
  return (
    <>
      <Seo
        title="Quality Food Products, Wholesale & Retail"
        description="Adriel Minimart & Food Export supplies stone-free Ofada rice, fresh & smoked snails, smoked panla, catfish, and smoked meats in Abeokuta, Ogun State, Nigeria."
        canonicalPath="/"
        products={products}
      />

      <main id="main-content">
        {/* 1. Hero Section */}
        <Hero />

        {/* 2. Featured Products */}
        <FeaturedProductsSection onEnquire={onEnquire} />

        {/* 3. Product Categories */}
        <ProductCategoriesSection />

        {/* 4. Why Choose Adriel */}
        <WhyChooseUs />

        {/* 5. Wholesale & Retail Audiences */}
        <WholesaleRetailBanner />

        {/* 6. How Ordering Works */}
        <HowOrderingWorks />

        {/* 7. About Teaser */}
        <AboutTeaser />

        {/* 8. Location Section */}
        <section className="py-16 sm:py-20 bg-[#F8F7F3]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <LocationCard />
          </div>
        </section>

        {/* 9. Testimonials (Conditional: only renders if genuine testimonials exist) */}
        <TestimonialsSection />

        {/* 10. Bulk CTA Band */}
        <BulkCtaBand />
      </main>
    </>
  );
};
