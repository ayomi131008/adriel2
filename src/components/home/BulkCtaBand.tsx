import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, ArrowRight, Phone } from 'lucide-react';
import { businessConfig } from '../../config/business';
import { buildWhatsAppLink } from '../../lib/whatsapp';

export const BulkCtaBand: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 bg-[#1C3829] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#13271C] rounded-3xl p-8 sm:p-12 lg:p-16 border border-[#2A523C] flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          <div className="max-w-2xl space-y-4 text-left">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#C85A17]">
              Wholesale & Bulk Inquiries
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-tight [text-wrap:balance]">
              Need food products in bulk? Talk to Adriel about your wholesale order.
            </h2>
            <p className="text-sm sm:text-base text-[#C8D1CB] leading-relaxed">
              We supply caterers, restaurants, foodstuff vendors, resellers, and international food-export clients with consistent quality and dependable order communication.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
            <a
              href={buildWhatsAppLink({ type: 'wholesale' })}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs sm:text-sm font-semibold text-white bg-[#25D366] hover:bg-[#20bd5a] rounded-xl transition-colors shadow-sm whitespace-nowrap"
            >
              <MessageSquare className="w-4 h-4 text-white" />
              <span>Discuss Wholesale on WhatsApp</span>
            </a>

            <Link
              to="/wholesale"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs sm:text-sm font-semibold text-[#1C3829] bg-[#EFECE4] hover:bg-white rounded-xl transition-colors whitespace-nowrap"
            >
              <span>Submit Wholesale Form</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href={`tel:${businessConfig.phoneRaw}`}
              className="inline-flex items-center justify-center gap-2 text-xs text-[#A3B2A8] hover:text-white pt-1 transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Or call {businessConfig.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
