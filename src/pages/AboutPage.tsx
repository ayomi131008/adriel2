import React from 'react';
import { Link } from 'react-router-dom';
import { Seo } from '../components/common/Seo';
import { SectionHeading } from '../components/common/SectionHeading';
import { MapPin, Phone, MessageSquare, ArrowRight, Check } from 'lucide-react';
import { businessConfig } from '../config/business';
import { buildWhatsAppLink } from '../lib/whatsapp';

export const AboutPage: React.FC = () => {
  const commitments = [
    {
      title: 'Food Products at Fair, Pocket-Friendly Prices',
      description:
        'We believe everyday Nigerian staple food items should remain accessible without sacrificing cleanliness or eating quality.',
    },
    {
      title: 'Clean, Stone-Free Preparation',
      description:
        'We focus on supplying clean, thoroughly destoned Ofada rice so customers can prepare meals with confidence and zero grit.',
    },
    {
      title: 'Wholesale & Retail Inclusivity',
      description:
        'We do not restrict access to only large commercial buyers. Single-household portions receive the same courteous handling as bulk supply orders.',
    },
    {
      title: 'Honest, Direct Communication',
      description:
        'We speak plainly with our buyers via WhatsApp and phone regarding item availability, current pricing, and order arrangements.',
    },
  ];

  return (
    <>
      <Seo
        title="About Adriel Minimart & Food Export – Abeokuta, Ogun State"
        description="Learn about Adriel Minimart & Food Export, a food retailer, wholesaler, and food export business providing quality, affordable food products in Abeokuta, Ogun State, Nigeria."
        canonicalPath="/about"
      />

      <main id="main-content" className="py-12 sm:py-16 bg-[#F8F7F3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          {/* Hero Section */}
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#C85A17]">
              About Adriel Minimart & Food Export
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1C3829] leading-tight [text-wrap:balance]">
              Supplying authentic Nigerian food products with care and affordability
            </h1>
            <p className="text-sm sm:text-base text-[#555C56] leading-relaxed [text-wrap:pretty]">
              Adriel Minimart & Food Export is a food retail, wholesale, and food export business operating from Abeokuta, Ogun State, Nigeria. We specialize in essential traditional foodstuffs including stone-free Ofada rice, fresh and smoked snails, smoked fish, and smoked meats.
            </p>
          </div>

          {/* Core Story / Facts */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            
            <div className="lg:col-span-7 space-y-6 text-sm text-[#555C56] leading-relaxed">
              <div className="bg-white p-8 rounded-2xl border border-[#E2DDD2] shadow-xs space-y-4">
                <h2 className="font-serif text-2xl font-bold text-[#1C3829]">
                  Our Business & Focus
                </h2>
                <p>
                  At Adriel Minimart & Food Export, our business model centers on two priorities: <strong>quality food products</strong> and <strong>affordable, pocket-friendly prices</strong> for both wholesale and retail customers.
                </p>
                <p>
                  Nigerian cuisine depends fundamentally on the authenticity of its ingredients. A pot of traditional Ofada stew or Ayamase requires unpolished, aromatic Ofada rice that is genuinely free of stones. A rich pot of Efo Riro, native Jollof, or Egusi soup requires properly wood-smoked fish and snails that release flavor into the soup without sootiness or rapid spoiling.
                </p>
                <p>
                  We source and curate our product line specifically to address these kitchen and food business needs. We cater to individual households in need of clean weekly provisions, caterers preparing for wedding feasts, restaurants demanding reliable weekly inventory, and food exporters seeking export-grade dried items.
                </p>
              </div>

              {/* Location Trust Note */}
              <div className="bg-white p-6 rounded-2xl border border-[#E2DDD2] shadow-xs flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#EFECE4] flex items-center justify-center shrink-0 text-[#C85A17]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-serif text-base font-bold text-[#1C3829]">
                    Operating in Abeokuta, Ogun State
                  </h3>
                  <p className="text-xs text-[#555C56]">
                    Our operations are located in Abeokuta, Ogun State, giving us direct access to authentic regional food supply lines and allowing us to serve clients across Ogun State, neighboring states, and beyond.
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Commitments / Intentions */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-[#1C3829] text-white p-8 rounded-2xl shadow-xs space-y-6">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#C85A17]">
                    Our Principles
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-white mt-1">
                    What We Stand For
                  </h3>
                </div>

                <div className="space-y-4">
                  {commitments.map((comm) => (
                    <div key={comm.title} className="space-y-1 text-xs">
                      <div className="flex items-center gap-2 font-semibold text-[#F8F7F3]">
                        <Check className="w-4 h-4 text-[#25D366] shrink-0" />
                        <span>{comm.title}</span>
                      </div>
                      <p className="text-[#C8D1CB] pl-6 leading-relaxed">
                        {comm.description}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-[#2A523C]">
                  <p className="text-xs text-[#A3B2A8] italic">
                    "{businessConfig.tagline}"
                  </p>
                </div>
              </div>

              {/* Contact Card */}
              <div className="bg-white p-6 rounded-2xl border border-[#E2DDD2] shadow-xs space-y-4">
                <h4 className="font-serif text-base font-bold text-[#1C3829]">
                  Have Questions or Special Requests?
                </h4>
                <p className="text-xs text-[#555C56]">
                  Adriel is readily available to discuss your requirements, order quantities, and quotes.
                </p>
                <div className="flex flex-col gap-2 pt-1">
                  <a
                    href={buildWhatsAppLink({ type: 'general' })}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold text-white bg-[#1C3829] hover:bg-[#2A523C] rounded-lg transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
                    <span>Message on WhatsApp</span>
                  </a>
                  <a
                    href={`tel:${businessConfig.phoneRaw}`}
                    className="inline-flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold text-[#1C3829] bg-[#EFECE4] hover:bg-[#E2DDD2] rounded-lg transition-colors border border-[#1C3829]/15"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call {businessConfig.phoneDisplay}</span>
                  </a>
                </div>
              </div>

            </div>

          </div>

          {/* Bottom Action */}
          <div className="bg-[#EFECE4] rounded-2xl p-8 text-center space-y-4">
            <h3 className="font-serif text-2xl font-bold text-[#1C3829]">
              Ready to Order Authentic Foodstuffs?
            </h3>
            <p className="text-xs sm:text-sm text-[#555C56] max-w-md mx-auto">
              Explore our catalogue of stone-free Ofada rice, fresh and smoked snails, fish, and meats.
            </p>
            <div className="pt-2">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold text-white bg-[#1C3829] hover:bg-[#2A523C] rounded-lg transition-colors shadow-xs"
              >
                <span>View Products Catalogue</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      </main>
    </>
  );
};
