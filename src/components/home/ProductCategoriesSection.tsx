import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { categories } from '../../data/categories';
import { SectionHeading } from '../common/SectionHeading';

export const ProductCategoriesSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 bg-[#F8F7F3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-10">
          <SectionHeading
            kicker="Our Product Range"
            title="Carefully sourced Nigerian food essentials"
            subtitle="Explore our four core categories available for both household retail and commercial wholesale supply."
          />
          <Link
            to="/products"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1C3829] hover:text-[#C85A17] transition-colors whitespace-nowrap self-start md:self-end"
          >
            <span>View Full Catalogue</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Visual Category Tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/products?category=${cat.slug}`}
              className="group relative rounded-2xl overflow-hidden bg-white border border-[#E2DDD2] hover:border-[#C85A17]/60 transition-all duration-300 flex flex-col justify-between shadow-xs hover:shadow-md"
            >
              <div className="relative aspect-4/3 w-full overflow-hidden bg-[#EFECE4]">
                <img
                  src={cat.image}
                  alt={cat.name}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                <div className="absolute bottom-3 left-4 right-4">
                  <h3 className="font-serif text-xl font-bold text-white group-hover:text-[#F8F7F3] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-[#EFECE4] line-clamp-1 mt-0.5">
                    {cat.tagline}
                  </p>
                </div>
              </div>

              <div className="p-4 bg-white flex items-center justify-between text-xs text-[#555C56]">
                <span className="font-medium text-[#1C3829] group-hover:text-[#C85A17] transition-colors">
                  Explore {cat.name}
                </span>
                <ArrowUpRight className="w-4 h-4 text-[#C85A17] transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
