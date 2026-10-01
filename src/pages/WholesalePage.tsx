import React from 'react';
import { Seo } from '../components/common/Seo';
import { SectionHeading } from '../components/common/SectionHeading';
import { WholesaleForm } from '../components/wholesale/WholesaleForm';
import {
  Utensils,
  Store,
  ChefHat,
  ShoppingBag,
  Globe2,
  Phone,
  MessageSquare,
  CheckCircle2,
} from 'lucide-react';
import { businessConfig } from '../config/business';
import { buildWhatsAppLink } from '../lib/whatsapp';

export const WholesalePage: React.FC = () => {
  const whoWeSupply = [
    {
      title: 'Restaurants & Eateries',
      description:
        'Consistent supply of stone-free Ofada rice, smoked panla, and smoked catfish to keep your daily menu authentic and kitchen preparation uninterrupted.',
      icon: Utensils,
    },
    {
      title: 'Event & Party Caterers',
      description:
        'Large-volume food items for weddings, family gatherings, and celebrations. Get clean food items that eliminate tedious sorting time before major events.',
      icon: ChefHat,
    },
    {
      title: 'Foodstuff Vendors & Retailers',
      description:
        'Stock your shop, store, or market stall with high-demand Nigerian staples at pocket-friendly wholesale prices for resale margin.',
      icon: Store,
    },
    {
      title: 'Bulk Buyers & Households',
      description:
        'Families, cooperatives, and joint-buying groups looking to save money by purchasing full bags of Ofada rice and bulk dried seafood.',
      icon: ShoppingBag,
    },
    {
      title: 'Food-Export Enquiries',
      description:
        'We welcome food-export enquiries for well-dried, properly smoked items and stone-free Ofada rice. Inquiries can be discussed directly with our management.',
      icon: Globe2,
    },
  ];

  const wholesaleSteps = [
    {
      step: '01',
      title: 'Submit Your Wholesale Request',
      description:
        'Select the food items you require, mention your approximate volumes, and submit via our form or directly on WhatsApp.',
    },
    {
      step: '02',
      title: 'Receive Price Quotation',
      description:
        'Adriel will review current market supplies and confirm our pocket-friendly bulk pricing with you promptly.',
    },
    {
      step: '03',
      title: 'Confirm Quantities & Arrangements',
      description:
        'Agree on packing, pickup or dispatch arrangements from Abeokuta to your desired destination.',
    },
  ];

  return (
    <>
      <Seo
        title="Wholesale Food Supply & Bulk Enquiries – Abeokuta, Ogun State"
        description="Wholesale and bulk supply of stone-free Ofada rice, smoked catfish, smoked panla, fresh & smoked snails, and smoked meats for restaurants, caterers, retailers, and export enquiries."
        canonicalPath="/wholesale"
      />

      <main id="main-content" className="py-12 sm:py-16 bg-[#F8F7F3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          {/* Hero Section */}
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#C85A17]">
              Commercial & Bulk Supply
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1C3829] leading-tight [text-wrap:balance]">
              Wholesale food supply for restaurants, caterers, resellers, & export enquiries
            </h1>
            <p className="text-sm sm:text-base text-[#555C56] leading-relaxed [text-wrap:pretty]">
              Adriel Minimart & Food Export supplies customers who require larger quantities. Based in Abeokuta, Ogun State, we provide steady, clean, and pocket-friendly bulk supplies with responsive customer communication.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href={buildWhatsAppLink({ type: 'wholesale' })}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold text-white bg-[#1C3829] hover:bg-[#2A523C] rounded-lg transition-colors shadow-xs"
              >
                <MessageSquare className="w-4 h-4 text-[#25D366]" />
                <span>Talk to Adriel on WhatsApp</span>
              </a>
              <a
                href={`tel:${businessConfig.phoneRaw}`}
                className="inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold text-[#1C3829] bg-[#EFECE4] hover:bg-[#E2DDD2] rounded-lg transition-colors border border-[#1C3829]/15"
              >
                <Phone className="w-4 h-4" />
                <span>Call {businessConfig.phoneDisplay}</span>
              </a>
            </div>
          </div>

          {/* Form Section */}
          <section className="space-y-6">
            <div className="border-b border-[#E2DDD2] pb-4">
              <h2 className="font-serif text-2xl font-bold text-[#1C3829]">
                Submit Your Wholesale Enquiry
              </h2>
              <p className="text-xs sm:text-sm text-[#555C56]">
                Fill out the products and estimated volume you need. We will open a formatted WhatsApp message to finalize your quotation.
              </p>
            </div>

            <WholesaleForm />
          </section>

          {/* Who We Supply */}
          <section className="space-y-8 pt-6 border-t border-[#E2DDD2]">
            <SectionHeading
              kicker="Commercial Partners"
              title="Who we supply"
              subtitle="We support food businesses and bulk purchasers with transparent communication and dependable foodstuff quality."
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {whoWeSupply.map((client) => {
                const Icon = client.icon;
                return (
                  <div
                    key={client.title}
                    className="bg-white rounded-2xl border border-[#E2DDD2] p-6 shadow-xs space-y-3"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#EFECE4] flex items-center justify-center text-[#1C3829]">
                      <Icon className="w-5 h-5 text-[#C85A17]" />
                    </div>
                    <h3 className="font-serif text-lg font-bold text-[#1C3829]">
                      {client.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#555C56] leading-relaxed">
                      {client.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* How Wholesale Enquiries Work */}
          <section className="bg-white rounded-2xl border border-[#E2DDD2] p-8 sm:p-12 shadow-xs space-y-8">
            <SectionHeading
              kicker="Process"
              title="How wholesale enquiries work"
              subtitle="A clear, straightforward process designed to save you time and provide exact pricing."
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {wholesaleSteps.map((s) => (
                <div key={s.step} className="space-y-2">
                  <span className="font-serif text-2xl font-bold text-[#C85A17]">
                    {s.step}
                  </span>
                  <h3 className="font-serif text-base font-bold text-[#1C3829]">
                    {s.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#555C56] leading-relaxed">
                    {s.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="p-4 bg-[#F8F7F3] rounded-xl border border-[#E2DDD2] text-xs text-[#555C56] flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#1C3829] shrink-0 mt-0.5" />
              <span>
                <strong>Food Export Note:</strong> If you are inquiring on behalf of overseas diaspora food retail or export distribution, please specify your destination and preferred drying specifications in the form notes.
              </span>
            </div>
          </section>

        </div>
      </main>
    </>
  );
};
