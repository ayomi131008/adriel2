import React from 'react';
import { MapPin, MessageSquare, Phone } from 'lucide-react';
import { businessConfig } from '../../config/business';
import { buildWhatsAppLink } from '../../lib/whatsapp';

export const LocationCard: React.FC = () => {
  const hasMapEmbed = Boolean(businessConfig.location.mapEmbedUrl);
  const hasStreetAddress = Boolean(businessConfig.location.streetAddress);

  return (
    <div className="bg-white rounded-2xl border border-[#E2DDD2] p-6 sm:p-8 shadow-xs overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-5 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C85A17]">
            <MapPin className="w-4 h-4 text-[#C85A17]" />
            <span>Operating Hub</span>
          </div>

          <h3 className="font-serif text-2xl font-bold text-[#1C3829]">
            {businessConfig.location.city}, {businessConfig.location.state}
          </h3>

          <p className="text-sm text-[#555C56] leading-relaxed">
            Adriel Minimart & Food Export is based in Abeokuta, Ogun State, Nigeria. We serve retail households and wholesale buyers locally, regionally, and cater to food export inquiries.
          </p>

          {hasStreetAddress ? (
            <p className="text-sm font-medium text-[#171B18] pt-1">
              {businessConfig.location.streetAddress}
            </p>
          ) : (
            <div className="p-3.5 bg-[#F8F7F3] rounded-xl border border-[#E2DDD2] text-xs text-[#555C56] space-y-1">
              <p className="font-medium text-[#1C3829]">Order Collection & Enquiries:</p>
              <p>
                Pickup point and order fulfillment arrangements are confirmed directly with customers upon placing an enquiry via WhatsApp or phone.
              </p>
            </div>
          )}

          <div className="pt-2 flex flex-wrap gap-3">
            <a
              href={buildWhatsAppLink({ type: 'general' })}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-[#1C3829] hover:bg-[#2A523C] rounded-lg transition-colors shadow-xs"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
              <span>Confirm Location on WhatsApp</span>
            </a>
            <a
              href={`tel:${businessConfig.phoneRaw}`}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-[#1C3829] bg-[#EFECE4] hover:bg-[#E2DDD2] rounded-lg transition-colors border border-[#1C3829]/15"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{businessConfig.phoneDisplay}</span>
            </a>
          </div>
        </div>

        {/* Visual Map / Geographic Representation */}
        <div className="lg:col-span-7">
          {hasMapEmbed ? (
            <div className="aspect-16/9 w-full rounded-xl overflow-hidden border border-[#E2DDD2]">
              <iframe
                title="Adriel Minimart Location Map"
                src={businessConfig.location.mapEmbedUrl!}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          ) : (
            <div className="relative aspect-16/9 sm:aspect-2/1 w-full rounded-xl overflow-hidden bg-[#EFECE4] border border-[#E2DDD2] flex flex-col items-center justify-center p-6 text-center">
              {/* Subtle architectural geometric map pattern */}
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#1C3829_1px,transparent_1px)] [background-size:16px_16px]" />
              
              <div className="relative z-10 space-y-2 max-w-sm">
                <div className="w-12 h-12 mx-auto rounded-full bg-[#1C3829] text-white flex items-center justify-center shadow-xs">
                  <MapPin className="w-6 h-6 text-[#EFECE4]" />
                </div>
                <h4 className="font-serif text-lg font-bold text-[#1C3829]">
                  Abeokuta, Ogun State, Nigeria
                </h4>
                <p className="text-xs text-[#555C56]">
                  Proudly rooted in historic Abeokuta, connecting authentic local foodstuffs with customers across Nigeria and export channels.
                </p>
                <div className="pt-2">
                  <span className="inline-block text-[11px] font-medium text-[#1C3829] bg-white px-3 py-1 rounded-md border border-[#E2DDD2]">
                    Exact address shared upon order confirmation
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
