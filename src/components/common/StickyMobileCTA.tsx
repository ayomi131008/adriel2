import React from 'react';
import { MessageSquare, Phone } from 'lucide-react';
import { businessConfig } from '../../config/business';
import { buildWhatsAppLink } from '../../lib/whatsapp';

interface StickyMobileCTAProps {
  onOpenEnquiry?: () => void;
}

export const StickyMobileCTA: React.FC<StickyMobileCTAProps> = ({ onOpenEnquiry }) => {
  return (
    <aside
      aria-label="Quick contact actions"
      className="fixed bottom-0 left-0 right-0 z-30 md:hidden bg-[#F8F7F3]/95 backdrop-blur-md border-t border-[#E2DDD2] px-3 py-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] shadow-lg transition-transform"
    >
      <div className="flex items-center gap-2 max-w-md mx-auto">
        {/* Action 1: WhatsApp (Primary quick conversion) */}
        <a
          href={buildWhatsAppLink({ type: 'general' })}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 h-11 px-3 text-xs font-semibold text-white bg-[#1C3829] active:bg-[#13271C] rounded-lg transition-colors whitespace-nowrap shadow-xs"
        >
          <MessageSquare className="w-4 h-4 text-[#25D366] shrink-0" />
          <span>WhatsApp Us</span>
        </a>

        {/* Action 2: Call or Enquiry Drawer */}
        {onOpenEnquiry ? (
          <button
            type="button"
            onClick={onOpenEnquiry}
            className="flex-1 flex items-center justify-center gap-2 h-11 px-3 text-xs font-semibold text-[#1C3829] bg-[#EFECE4] hover:bg-[#E2DDD2] active:bg-[#DDD8CC] border border-[#1C3829]/20 rounded-lg transition-colors whitespace-nowrap"
          >
            <span>Order / Enquire</span>
          </button>
        ) : (
          <a
            href={`tel:${businessConfig.phoneRaw}`}
            className="flex-1 flex items-center justify-center gap-2 h-11 px-3 text-xs font-semibold text-[#1C3829] bg-[#EFECE4] hover:bg-[#E2DDD2] active:bg-[#DDD8CC] border border-[#1C3829]/20 rounded-lg transition-colors whitespace-nowrap"
          >
            <Phone className="w-4 h-4 text-[#1C3829] shrink-0" />
            <span>Call Adriel</span>
          </a>
        )}
      </div>
    </aside>
  );
};
