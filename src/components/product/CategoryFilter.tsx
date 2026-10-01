import React from 'react';
import { categories } from '../../data/categories';

interface CategoryFilterProps {
  activeCategory: string;
  onSelectCategory: (slug: string) => void;
  totalCount: number;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  activeCategory,
  onSelectCategory,
  totalCount,
}) => {
  return (
    <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-2 scrollbar-none">
      <button
        type="button"
        onClick={() => onSelectCategory('all')}
        className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
          activeCategory === 'all'
            ? 'bg-[#1C3829] text-white shadow-xs'
            : 'bg-[#EFECE4] text-[#555C56] hover:bg-[#E2DDD2] hover:text-[#171B18]'
        }`}
        aria-pressed={activeCategory === 'all'}
      >
        All Products ({totalCount})
      </button>

      {categories.map((cat) => {
        const isSelected = activeCategory === cat.slug;
        return (
          <button
            key={cat.id}
            type="button"
            onClick={() => onSelectCategory(cat.slug)}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              isSelected
                ? 'bg-[#1C3829] text-white shadow-xs'
                : 'bg-[#EFECE4] text-[#555C56] hover:bg-[#E2DDD2] hover:text-[#171B18]'
            }`}
            aria-pressed={isSelected}
          >
            {cat.name}
          </button>
        );
      })}
    </div>
  );
};
