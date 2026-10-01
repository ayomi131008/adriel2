import React, { useState, useEffect, useRef } from 'react';
import { X, MessageSquare, AlertCircle } from 'lucide-react';
import { Product, BuyerType } from '../../types';
import { products as allProducts } from '../../data/products';
import { submitProductEnquiry, validatePhoneNumber } from '../../services/enquiries';
import { buildWhatsAppLink } from '../../lib/whatsapp';

interface ProductEnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProduct?: Product | null;
}

export const ProductEnquiryModal: React.FC<ProductEnquiryModalProps> = ({
  isOpen,
  onClose,
  initialProduct,
}) => {
  const [selectedProductSlug, setSelectedProductSlug] = useState<string>('');
  const [buyerType, setBuyerType] = useState<BuyerType>('Retail');
  const [quantity, setQuantity] = useState<string>('1');
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [note, setNote] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);

  // Sync initial product
  useEffect(() => {
    if (initialProduct) {
      setSelectedProductSlug(initialProduct.slug);
    } else if (allProducts.length > 0) {
      setSelectedProductSlug(allProducts[0].slug);
    }
  }, [initialProduct, isOpen]);

  // Handle focus trap & Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    // Focus first input
    const timer = setTimeout(() => {
      firstInputRef.current?.focus();
    }, 50);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      clearTimeout(timer);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentProduct = allProducts.find((p) => p.slug === selectedProductSlug) || allProducts[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!name.trim()) {
      setErrorMsg('Please enter your name.');
      return;
    }

    const phoneCheck = validatePhoneNumber(phone);
    if (!phoneCheck.valid) {
      setErrorMsg(phoneCheck.error || 'Please enter a valid phone number.');
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await submitProductEnquiry({
        productName: currentProduct.name,
        productSlug: currentProduct.slug,
        quantity,
        buyerType,
        name,
        phone,
        note,
      });

      if (result.success && result.whatsappUrl) {
        window.open(result.whatsappUrl, '_blank', 'noopener,noreferrer');
        onClose();
      } else {
        setErrorMsg(result.message || 'Could not process enquiry.');
      }
    } catch {
      setErrorMsg('An unexpected error occurred. Please chat with us directly on WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        className="bg-white w-full max-w-lg rounded-2xl border border-[#E2DDD2] shadow-xl overflow-hidden text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E2DDD2] bg-[#F8F7F3]">
          <div>
            <h2 id="modal-title" className="font-serif text-lg font-bold text-[#1C3829]">
              Product Order & Enquiry
            </h2>
            <p className="text-xs text-[#555C56]">
              Confirm your food product enquiry via WhatsApp
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-[#555C56] hover:text-[#171B18] rounded-lg hover:bg-[#EFECE4] transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          {errorMsg && (
            <div
              className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-800 flex items-start gap-2"
              role="alert"
            >
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Selected Product */}
          <div className="space-y-1.5">
            <label htmlFor="product-select" className="block text-xs font-semibold text-[#1C3829]">
              Selected Product
            </label>
            <select
              id="product-select"
              value={selectedProductSlug}
              onChange={(e) => setSelectedProductSlug(e.target.value)}
              className="w-full text-sm bg-white border border-[#E2DDD2] rounded-lg px-3 py-2.5 text-[#171B18] focus:outline-none focus:ring-2 focus:ring-[#1C3829]"
            >
              {allProducts.map((p) => (
                <option key={p.slug} value={p.slug}>
                  {p.name} ({p.categoryName})
                </option>
              ))}
            </select>
          </div>

          {/* Buyer Type Toggle */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#1C3829]">
              Order Classification
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setBuyerType('Retail')}
                className={`py-2 text-xs font-semibold rounded-lg border transition-colors ${
                  buyerType === 'Retail'
                    ? 'bg-[#1C3829] text-white border-[#1C3829]'
                    : 'bg-white text-[#555C56] border-[#E2DDD2] hover:bg-[#F8F7F3]'
                }`}
              >
                Retail (Household / Small)
              </button>
              <button
                type="button"
                onClick={() => setBuyerType('Wholesale')}
                className={`py-2 text-xs font-semibold rounded-lg border transition-colors ${
                  buyerType === 'Wholesale'
                    ? 'bg-[#1C3829] text-white border-[#1C3829]'
                    : 'bg-white text-[#555C56] border-[#E2DDD2] hover:bg-[#F8F7F3]'
                }`}
              >
                Wholesale (Bulk / Business)
              </button>
            </div>
          </div>

          {/* Quantity */}
          <div className="space-y-1.5">
            <label htmlFor="modal-quantity" className="block text-xs font-semibold text-[#1C3829]">
              Estimated Quantity / Volume
            </label>
            <input
              id="modal-quantity"
              type="text"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="e.g. 5kg, 2 bags, 1 carton, or 10 pieces"
              className="w-full text-sm bg-white border border-[#E2DDD2] rounded-lg px-3 py-2.5 text-[#171B18] placeholder-[#555C56]/60 focus:outline-none focus:ring-2 focus:ring-[#1C3829]"
            />
          </div>

          {/* Customer Name */}
          <div className="space-y-1.5">
            <label htmlFor="modal-name" className="block text-xs font-semibold text-[#1C3829]">
              Your Name <span className="text-[#C85A17]">*</span>
            </label>
            <input
              ref={firstInputRef}
              id="modal-name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Mrs. Adebayo / Chef Ibrahim"
              className="w-full text-sm bg-white border border-[#E2DDD2] rounded-lg px-3 py-2.5 text-[#171B18] placeholder-[#555C56]/60 focus:outline-none focus:ring-2 focus:ring-[#1C3829]"
            />
          </div>

          {/* Customer Phone */}
          <div className="space-y-1.5">
            <label htmlFor="modal-phone" className="block text-xs font-semibold text-[#1C3829]">
              Phone / WhatsApp Number <span className="text-[#C85A17]">*</span>
            </label>
            <input
              id="modal-phone"
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g. 0810 335 5028 or +234 810 335 5028"
              className="w-full text-sm bg-white border border-[#E2DDD2] rounded-lg px-3 py-2.5 text-[#171B18] placeholder-[#555C56]/60 focus:outline-none focus:ring-2 focus:ring-[#1C3829]"
            />
          </div>

          {/* Optional Note */}
          <div className="space-y-1.5">
            <label htmlFor="modal-note" className="block text-xs font-semibold text-[#1C3829]">
              Additional Note (Optional)
            </label>
            <textarea
              id="modal-note"
              rows={2}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Any specific preference or question..."
              className="w-full text-sm bg-white border border-[#E2DDD2] rounded-lg px-3 py-2 text-[#171B18] placeholder-[#555C56]/60 focus:outline-none focus:ring-2 focus:ring-[#1C3829]"
            />
          </div>

          {/* Actions */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-4 text-xs font-semibold text-white bg-[#1C3829] hover:bg-[#2A523C] rounded-lg transition-colors shadow-xs"
            >
              <MessageSquare className="w-4 h-4 text-[#25D366]" />
              <span>{isSubmitting ? 'Opening WhatsApp...' : 'Send Enquiry on WhatsApp'}</span>
            </button>

            <a
              href={buildWhatsAppLink({ type: 'product', productName: currentProduct.name })}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 py-3 px-4 text-xs font-semibold text-[#1C3829] bg-[#EFECE4] hover:bg-[#E2DDD2] rounded-lg transition-colors border border-[#1C3829]/15"
            >
              <span>Quick Direct Chat</span>
            </a>
          </div>

          <p className="text-[11px] text-center text-[#555C56]">
            Clicking sends your message directly to Adriel Minimart on WhatsApp for immediate response.
          </p>
        </form>
      </div>
    </div>
  );
};
