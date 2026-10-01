import React from 'react';
import { testimonials } from '../../data/testimonials';
import { SectionHeading } from '../common/SectionHeading';
import { Quote } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  // STRICT TRUTHFULNESS: Never render fake testimonials or empty placeholder cards.
  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <section className="py-16 sm:py-24 bg-[#F8F7F3] border-t border-[#E2DDD2]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="Customer Experiences"
          title="What our clients say"
          subtitle="Real feedback from families, caterers, and commercial buyers who order from Adriel."
          centered
          className="pb-12"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white p-7 rounded-2xl border border-[#E2DDD2] shadow-xs flex flex-col justify-between space-y-4"
            >
              <Quote className="w-6 h-6 text-[#C85A17] opacity-60" />
              <blockquote className="text-sm text-[#171B18] leading-relaxed italic">
                "{t.quote}"
              </blockquote>
              <div className="pt-3 border-t border-[#E2DDD2]/60 text-xs text-[#555C56]">
                <p className="font-semibold text-[#1C3829] not-italic">{t.author}</p>
                <p>
                  {t.role} {t.organization ? `· ${t.organization}` : ''}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
