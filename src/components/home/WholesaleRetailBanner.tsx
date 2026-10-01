import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Building2, ArrowRight } from 'lucide-react';

export const WholesaleRetailBanner: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 bg-[#1C3829] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#EFECE4]">
            Serving Both Scales
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white mt-2 [text-wrap:balance]">
            Whether for your kitchen table or commercial food business
          </h2>
          <p className="text-sm sm:text-base text-[#EFECE4] mt-3 leading-relaxed">
            Adriel Minimart & Food Export is structured to handle small household portions and high-volume commercial supply with equal attention to quality.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Retail Audience */}
          <div className="bg-[#13271C] rounded-2xl p-8 border border-[#2A523C] flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#2A523C]/50 flex items-center justify-center text-[#EFECE4]">
                <ShoppingBag className="w-6 h-6 text-[#C85A17]" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-white">
                Retail & Households
              </h3>
              <p className="text-sm text-[#EFECE4] leading-relaxed">
                Enjoy stone-free Ofada rice without grit, premium smoked catfish, fresh or smoked snails, and dried meats in comfortable family sizes. Perfect for your weekly cooking, special Sunday stews, and celebrations.
              </p>
              <ul className="space-y-2 text-xs text-[#EFECE4]">
                <li>• Flexible purchase quantities</li>
                <li>• No stone-picking hassle for Ofada rice</li>
                <li>• Direct chat on WhatsApp to order</li>
              </ul>
            </div>

            <div className="pt-2">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 text-xs font-semibold text-white hover:text-[#C85A17] transition-colors"
              >
                <span>Browse Products for Home</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Wholesale Audience */}
          <div className="bg-[#13271C] rounded-2xl p-8 border border-[#2A523C] flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#2A523C]/50 flex items-center justify-center text-[#EFECE4]">
                <Building2 className="w-6 h-6 text-[#C85A17]" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-white">
                Wholesale & Commercial Supply
              </h3>
              <p className="text-sm text-[#EFECE4] leading-relaxed">
                Supplying restaurants, caterers, food vendors, mini-mart resellers, bulk commodity buyers, and food-export clients. Count on stable volume, clean processing, and pocket-friendly bulk rates.
              </p>
              <ul className="space-y-2 text-xs text-[#EFECE4]">
                <li>• Bulk bags and cartons</li>
                <li>• Steady supply for catering & restaurants</li>
                <li>• Inquiries welcome for food export</li>
              </ul>
            </div>

            <div className="pt-2">
              <Link
                to="/wholesale"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-[#1C3829] bg-[#EFECE4] hover:bg-white rounded-lg transition-colors shadow-xs"
              >
                <span>Explore Wholesale Supply</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
