import React from 'react';
import { Seo } from '../components/common/Seo';
import { SectionHeading } from '../components/common/SectionHeading';
import { ContactForm } from '../components/contact/ContactForm';
import { LocationCard } from '../components/common/LocationCard';
import { MessageSquare, Phone, MapPin, Mail, Clock } from 'lucide-react';
import { businessConfig } from '../config/business';
import { buildWhatsAppLink } from '../lib/whatsapp';

export const ContactPage: React.FC = () => {
  return (
    <>
      <Seo
        title="Contact Us – Phone, WhatsApp & Location in Abeokuta, Ogun State"
        description="Contact Adriel Minimart & Food Export for enquiries and orders. Call or WhatsApp +234 810 335 5028. Based in Abeokuta, Ogun State, Nigeria."
        canonicalPath="/contact"
      />

      <main id="main-content" className="py-12 sm:py-16 bg-[#F8F7F3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          {/* Header */}
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#C85A17]">
              Get in Touch
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1C3829] leading-tight [text-wrap:balance]">
              We are ready to assist with your order & enquiries
            </h1>
            <p className="text-sm sm:text-base text-[#555C56] leading-relaxed [text-wrap:pretty]">
              Whether you want to confirm current prices for stone-free Ofada rice, place a wholesale order for your restaurant, or enquire about food export, connect directly with Adriel Minimart & Food Export.
            </p>
          </div>

          {/* Quick Contact Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* WhatsApp Card */}
            <div className="bg-white rounded-2xl border border-[#E2DDD2] p-6 shadow-xs flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#25D366]/10 flex items-center justify-center text-[#25D366]">
                  <MessageSquare className="w-5 h-5 text-[#25D366]" />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#1C3829]">
                  WhatsApp (Fastest)
                </h3>
                <p className="text-xs text-[#555C56]">
                  Direct messaging for instant replies, photo requests, and quick quotations.
                </p>
                <p className="text-sm font-semibold text-[#1C3829]">
                  {businessConfig.phoneDisplay}
                </p>
              </div>

              <a
                href={buildWhatsAppLink({ type: 'general' })}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold text-white bg-[#1C3829] hover:bg-[#2A523C] rounded-lg transition-colors shadow-xs"
              >
                <MessageSquare className="w-4 h-4 text-[#25D366]" />
                <span>Open WhatsApp Chat</span>
              </a>
            </div>

            {/* Direct Phone Call Card */}
            <div className="bg-white rounded-2xl border border-[#E2DDD2] p-6 shadow-xs flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#EFECE4] flex items-center justify-center text-[#1C3829]">
                  <Phone className="w-5 h-5 text-[#C85A17]" />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#1C3829]">
                  Phone Call
                </h3>
                <p className="text-xs text-[#555C56]">
                  Speak directly with Adriel to place orders or make inquiries.
                </p>
                <p className="text-sm font-semibold text-[#1C3829]">
                  {businessConfig.phoneDisplay}
                </p>
              </div>

              <a
                href={`tel:${businessConfig.phoneRaw}`}
                className="inline-flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold text-[#1C3829] bg-[#EFECE4] hover:bg-[#E2DDD2] rounded-lg transition-colors border border-[#1C3829]/15"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call {businessConfig.phoneDisplay}</span>
              </a>
            </div>

            {/* Location & Hours Card */}
            <div className="bg-white rounded-2xl border border-[#E2DDD2] p-6 shadow-xs flex flex-col justify-between space-y-4 sm:col-span-2 lg:col-span-1">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#EFECE4] flex items-center justify-center text-[#1C3829]">
                  <MapPin className="w-5 h-5 text-[#C85A17]" />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#1C3829]">
                  Location Hub
                </h3>
                <p className="text-sm font-semibold text-[#1C3829]">
                  {businessConfig.location.formatted}
                </p>
                
                {/* Business Hours Placeholder note */}
                <div className="pt-1 flex items-start gap-2 text-xs text-[#555C56]">
                  <Clock className="w-4 h-4 text-[#C85A17] shrink-0 mt-0.5" />
                  <span>
                    {businessConfig.businessHours.display ||
                      businessConfig.businessHours.statusNote}
                  </span>
                </div>

                {/* Email (only shown if configured) */}
                {businessConfig.email && (
                  <div className="flex items-center gap-2 text-xs text-[#555C56]">
                    <Mail className="w-4 h-4 text-[#C85A17]" />
                    <a href={`mailto:${businessConfig.email}`} className="hover:underline">
                      {businessConfig.email}
                    </a>
                  </div>
                )}
              </div>

              <div className="pt-2 text-xs text-[#555C56]">
                Orders arranged for pickup or dispatch across Nigeria.
              </div>
            </div>

          </div>

          {/* Form & Map Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-6 space-y-4">
              <div className="space-y-1">
                <h2 className="font-serif text-2xl font-bold text-[#1C3829]">
                  Send a Message
                </h2>
                <p className="text-xs sm:text-sm text-[#555C56]">
                  Have a question or custom order? Send your message and we will respond on WhatsApp promptly.
                </p>
              </div>

              <ContactForm />
            </div>

            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-1">
                <h2 className="font-serif text-2xl font-bold text-[#1C3829]">
                  Operating Location
                </h2>
                <p className="text-xs sm:text-sm text-[#555C56]">
                  Abeokuta, Ogun State, Nigeria.
                </p>
              </div>

              <LocationCard />
            </div>
          </div>

        </div>
      </main>
    </>
  );
};
