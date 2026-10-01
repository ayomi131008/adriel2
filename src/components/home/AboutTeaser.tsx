import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, HeartHandshake, MapPin } from 'lucide-react';
import { businessConfig } from '../../config/business';

export const AboutTeaser: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 bg-[#EFECE4]/50 border-t border-[#E2DDD2]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-6 space-y-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#C85A17]">
              About Adriel Minimart & Food Export
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#1C3829] leading-snug [text-wrap:balance]">
              Rooted in Abeokuta, supplying authentic food products with integrity
            </h2>
            <p className="text-sm sm:text-base text-[#555C56] leading-relaxed">
              Adriel Minimart & Food Export is an Abeokuta-based food retailer, wholesaler, and food export business. Our mission is direct and focused: supplying clean, high-grade food essentials at pocket-friendly prices for households and commercial enterprises.
            </p>
            <p className="text-xs sm:text-sm text-[#555C56] leading-relaxed">
              Whether you need destoned Ofada rice that saves you hours of preparation or wood-smoked seafood and meat that enrich your soups, we treat every order with personal care.
            </p>

            <div className="pt-2">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold text-white bg-[#1C3829] hover:bg-[#2A523C] rounded-lg transition-colors shadow-xs"
              >
                <span>Read More About Our Approach</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-2xl border border-[#E2DDD2] space-y-2.5 shadow-xs">
                <ShieldCheck className="w-6 h-6 text-[#C85A17]" />
                <h3 className="font-serif text-base font-bold text-[#1C3829]">
                  Honest Food Quality
                </h3>
                <p className="text-xs text-[#555C56] leading-relaxed">
                  Carefully cleaned stone-free rice and thoroughly dried, savory smoked items you can trust in your pots.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-[#E2DDD2] space-y-2.5 shadow-xs">
                <HeartHandshake className="w-6 h-6 text-[#C85A17]" />
                <h3 className="font-serif text-base font-bold text-[#1C3829]">
                  Pocket-Friendly Pricing
                </h3>
                <p className="text-xs text-[#555C56] leading-relaxed">
                  Direct, affordable rates structured for family sustenance and vendor profit margins.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-[#E2DDD2] space-y-2.5 shadow-xs sm:col-span-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#1C3829]">
                  <MapPin className="w-4 h-4 text-[#C85A17]" />
                  <span>Abeokuta, Ogun State, Nigeria</span>
                </div>
                <p className="text-xs text-[#555C56] leading-relaxed">
                  Serving clients in Ogun State, across Nigeria, and catering to prospective food-export orders.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
