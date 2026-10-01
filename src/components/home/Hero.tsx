import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageSquare, MapPin, Check } from 'lucide-react';
import { businessConfig } from '../../config/business';
import { buildWhatsAppLink } from '../../lib/whatsapp';

export const Hero: React.FC = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <section className="relative overflow-hidden bg-[#F8F7F3] pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-[#E2DDD2]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Location marker (quiet text, zero-pill discipline) */}
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C85A17]">
              <MapPin className="w-3.5 h-3.5 text-[#C85A17]" />
              <span>Abeokuta, Ogun State, Nigeria</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-[#1C3829] leading-[1.12] [text-wrap:balance]">
              Quality food products. Affordable prices. Wholesale & retail.
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-[#555C56] max-w-2xl leading-relaxed [text-wrap:pretty]">
              Adriel Minimart & Food Export supplies stone-free Ofada rice, fresh & smoked snails, smoked panla, smoked catfish, and smoked meats to households, food vendors, caterers, and bulk buyers.
            </p>

            {/* Truthful Trust Pillars (Unboxed, no badge sandwich) */}
            <div className="pt-1 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-medium text-[#1C3829]">
              <span className="inline-flex items-center gap-1.5">
                <Check className="w-4 h-4 text-[#C85A17]" />
                Stone-Free Clean Ofada Rice
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Check className="w-4 h-4 text-[#C85A17]" />
                Traditionally Smoked Fish & Meats
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Check className="w-4 h-4 text-[#C85A17]" />
                Wholesale & Retail Quantities
              </span>
            </div>

            {/* CTAs */}
            <div className="pt-3 flex flex-wrap items-center gap-3">
              <Link
                to="/products"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-[#1C3829] hover:bg-[#2A523C] rounded-lg transition-colors shadow-xs whitespace-nowrap"
              >
                <span>Shop Our Products</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href={buildWhatsAppLink({ type: 'general' })}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-semibold text-white bg-[#25D366] hover:bg-[#20bd5a] rounded-lg transition-colors shadow-xs whitespace-nowrap"
              >
                <MessageSquare className="w-4 h-4 text-white" />
                <span>Chat on WhatsApp</span>
              </a>

              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-5 py-3.5 text-sm font-semibold text-[#1C3829] bg-[#EFECE4] hover:bg-[#E2DDD2] rounded-lg transition-colors border border-[#1C3829]/15 whitespace-nowrap"
              >
                Contact Us
              </Link>
            </div>

            {/* Direct Phone Assistance Note */}
            <p className="text-xs text-[#555C56]">
              Prefer to call? Speak directly with Adriel at{' '}
              <a
                href={`tel:${businessConfig.phoneRaw}`}
                className="font-semibold text-[#1C3829] underline underline-offset-2 hover:text-[#C85A17]"
              >
                {businessConfig.phoneDisplay}
              </a>
            </p>
          </div>

          {/* Right Column: Editorial Hero Imagery */}
          <div className="lg:col-span-5">
            <div className="relative aspect-4/3 sm:aspect-16/10 lg:aspect-4/3 w-full rounded-2xl overflow-hidden bg-[#EFECE4] border border-[#E2DDD2] shadow-md">
              {!imageLoaded && (
                <div className="absolute inset-0 bg-[#EFECE4] animate-pulse" />
              )}
              <img
                src="/images/hero/hero_food_export.jpg"
                alt="Adriel Minimart premium Nigerian food products - stone-free ofada rice, smoked fish and local ingredients"
                loading="eager"
                referrerPolicy="no-referrer"
                width={800}
                height={600}
                onLoad={() => setImageLoaded(true)}
                className={`w-full h-full object-cover transition-opacity duration-500 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
              />

              {/* Editorial Caption Tag in Corner */}
              <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 bg-[#1C3829]/90 backdrop-blur-xs text-[#F8F7F3] text-xs px-3 py-1.5 rounded-lg shadow-sm">
                Abeokuta, Ogun State
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
