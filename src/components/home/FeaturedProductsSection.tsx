import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getFeaturedProducts } from '../../data/products';
import { Product } from '../../types';
import { SectionHeading } from '../common/SectionHeading';
import { ProductCard } from '../product/ProductCard';

interface FeaturedProductsSectionProps {
  onEnquire: (product: Product) => void;
}

export const FeaturedProductsSection: React.FC<FeaturedProductsSectionProps> = ({ onEnquire }) => {
  const featured = getFeaturedProducts();

  return (
    <section className="py-16 sm:py-24 bg-[#EFECE4]/50 border-y border-[#E2DDD2]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-12">
          <SectionHeading
            kicker="Customer Favorites"
            title="Featured food selections"
            subtitle="Selected staples known for clean preparation, natural freshness, and rich traditional flavor."
          />
          <Link
            to="/products"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1C3829] hover:text-[#C85A17] transition-colors whitespace-nowrap self-start md:self-end"
          >
            <span>See All 7 Products</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onEnquire={onEnquire}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
