import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Seo } from '../components/common/Seo';
import { SectionHeading } from '../components/common/SectionHeading';
import { CategoryFilter } from '../components/product/CategoryFilter';
import { ProductGrid } from '../components/product/ProductGrid';
import { products, getProductsByCategory } from '../data/products';
import { Product } from '../types';
import { ArrowRight, MessageSquare } from 'lucide-react';
import { buildWhatsAppLink } from '../lib/whatsapp';

interface ProductsPageProps {
  onEnquire: (product: Product) => void;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({ onEnquire }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || 'all';

  const [activeCategory, setActiveCategory] = useState<string>(categoryParam);

  useEffect(() => {
    setActiveCategory(categoryParam);
  }, [categoryParam]);

  const handleSelectCategory = (cat: string) => {
    setActiveCategory(cat);
    if (cat === 'all') {
      searchParams.delete('category');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category: cat });
    }
  };

  const filteredProducts = getProductsByCategory(activeCategory);

  return (
    <>
      <Seo
        title="Food Products Catalogue – Stone-Free Ofada Rice, Snails, Smoked Fish & Meat"
        description="Browse our food products catalogue: stone-free Ofada rice, fresh snails, smoked snails, smoked panla, smoked catfish, smoked goat meat, and smoked cow meat in Abeokuta, Ogun State."
        canonicalPath="/products"
        products={filteredProducts}
      />

      <main id="main-content" className="py-12 sm:py-16 bg-[#F8F7F3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          {/* Header */}
          <div className="border-b border-[#E2DDD2] pb-8 space-y-4">
            <SectionHeading
              kicker="Product Catalogue"
              title="Quality Nigerian food products for wholesale & retail"
              subtitle="Every product is available in flexible retail portions for homes and bulk quantities for food businesses and caterers. Contact us directly to confirm current market pricing."
            />

            {/* Filter controls */}
            <div className="pt-2">
              <CategoryFilter
                activeCategory={activeCategory}
                onSelectCategory={handleSelectCategory}
                totalCount={products.length}
              />
            </div>
          </div>

          {/* Product Grid */}
          <div>
            <ProductGrid
              products={filteredProducts}
              onEnquire={onEnquire}
              emptyMessage="No products found in this category. Browse all products to view our complete catalogue."
            />
          </div>

          {/* Wholesale Cross-Promotion Banner */}
          <div className="bg-[#1C3829] text-white rounded-2xl p-8 sm:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#C85A17]">
                Bulk Buyers & Caterers
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold">
                Looking for larger quantities or regular commercial supply?
              </h3>
              <p className="text-xs sm:text-sm text-[#EFECE4] leading-relaxed">
                We provide competitive wholesale rates on full bags of Ofada rice, cartons of smoked fish, and bulk snail or meat orders.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link
                to="/wholesale"
                className="inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold text-[#1C3829] bg-[#EFECE4] hover:bg-white rounded-lg transition-colors whitespace-nowrap"
              >
                <span>Wholesale Enquiry Form</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={buildWhatsAppLink({ type: 'general' })}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold text-white bg-[#25D366] hover:bg-[#20bd5a] rounded-lg transition-colors whitespace-nowrap"
              >
                <MessageSquare className="w-4 h-4 text-white" />
                <span>WhatsApp Directly</span>
              </a>
            </div>
          </div>

        </div>
      </main>
    </>
  );
};
