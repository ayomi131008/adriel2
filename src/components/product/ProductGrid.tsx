import React from 'react';
import { Product } from '../../types';
import { ProductCard } from './ProductCard';
import { PackageOpen } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  onEnquire?: (product: Product) => void;
  emptyMessage?: string;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  onEnquire,
  emptyMessage = 'No food products match this category yet.',
}) => {
  if (products.length === 0) {
    return (
      <div className="py-16 px-4 text-center bg-white rounded-2xl border border-[#E2DDD2] max-w-lg mx-auto">
        <PackageOpen className="w-12 h-12 text-[#C85A17] mx-auto mb-3 opacity-80" />
        <h3 className="font-serif text-lg font-bold text-[#1C3829]">
          No products found
        </h3>
        <p className="text-xs sm:text-sm text-[#555C56] mt-1">
          {emptyMessage}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onEnquire={onEnquire}
        />
      ))}
    </div>
  );
};
