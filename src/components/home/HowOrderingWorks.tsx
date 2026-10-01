import React from 'react';
import { Search, MousePointerClick, MessageSquare, CheckCircle2 } from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading';

export const HowOrderingWorks: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'Browse Products',
      description: 'Explore our selection of stone-free Ofada rice, fresh and smoked snails, smoked fish, and meats.',
      icon: Search,
    },
    {
      number: '02',
      title: 'Tap Order or Enquire',
      description: 'Click any enquiry button on the product you want, or open our wholesale form for bulk quantities.',
      icon: MousePointerClick,
    },
    {
      number: '03',
      title: 'Chat on WhatsApp or Call',
      description: 'Connect directly with Adriel on WhatsApp or phone to discuss your specific quantity and pricing.',
      icon: MessageSquare,
    },
    {
      number: '04',
      title: 'Confirm Details & Order',
      description: 'Finalize your items, confirm quantity and pickup or dispatch arrangements directly with us.',
      icon: CheckCircle2,
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#F8F7F3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="How Ordering Works"
          title="Simple, straightforward communication"
          subtitle="Ordering your food products from Adriel Minimart & Food Export takes just a few quick steps."
          centered
          className="pb-16"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div key={step.number} className="relative flex flex-col space-y-4">
                {/* Visual Step Indicator */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-white border border-[#E2DDD2] flex items-center justify-center text-[#1C3829] shadow-xs">
                    <Icon className="w-5 h-5 text-[#C85A17]" />
                  </div>
                  <span className="font-serif text-2xl font-bold text-[#C85A17]/80">
                    {step.number}
                  </span>
                </div>

                <div className="space-y-1.5 pt-1">
                  <h3 className="font-serif text-lg font-bold text-[#1C3829]">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#555C56] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
