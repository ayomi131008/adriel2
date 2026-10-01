import React from 'react';
import { Eye, BadgePercent, Store, MapPin, MessageCircle } from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading';
import { businessConfig } from '../../config/business';

export const WhyChooseUs: React.FC = () => {
  const pillars = [
    {
      title: 'Quality You Can See',
      description:
        'From stone-free, thoroughly cleaned Ofada rice to evenly wood-smoked catfish, snails, and meats, our products are visually inspected so you receive clean, appetizing food items.',
      icon: Eye,
    },
    {
      title: 'Affordable, Pocket-Friendly Prices',
      description:
        'We believe nutritious, authentic Nigerian foodstuffs should remain within realistic budgets. We maintain fair, competitive pricing for everyday families and commercial food operations alike.',
      icon: BadgePercent,
    },
    {
      title: 'Available for Wholesale & Retail',
      description:
        'Whether you need a single portion for your family weekend soup or bulk quantities to supply a restaurant, catering outfit, or resale business, we accommodate both scales.',
      icon: Store,
    },
    {
      title: 'Based in Abeokuta, Ogun State',
      description:
        'Firmly established in Abeokuta, we provide reliable access to authentic regional foodstuffs for local buyers and serve clients with shipping needs across Nigeria and for food export.',
      icon: MapPin,
    },
    {
      title: 'Simple Ordering',
      description:
        'No complicated checkout hurdles. Chat directly with us on WhatsApp or call our line. We discuss your quantities, confirm item availability, and finalize arrangements together.',
      icon: MessageCircle,
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#F8F7F3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="Why Choose Adriel"
          title="Built on honest quality, fair pricing, and straightforward service"
          subtitle="We focus on delivering genuine Nigerian food staples with transparent communication and dependable service."
          centered
          className="pb-14"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className={`bg-white rounded-2xl border border-[#E2DDD2] p-7 transition-all duration-200 hover:border-[#C85A17]/40 shadow-xs flex flex-col justify-between ${
                  index === 4 ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
              >
                <div className="space-y-4">
                  <div className="w-11 h-11 rounded-xl bg-[#EFECE4] flex items-center justify-center text-[#1C3829]">
                    <Icon className="w-5 h-5 text-[#C85A17]" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#1C3829]">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-[#555C56] leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-[#E2DDD2]/60 text-xs font-medium text-[#C85A17]">
                  0{index + 1}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
