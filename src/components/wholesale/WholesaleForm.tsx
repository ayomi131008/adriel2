import React, { useState } from 'react';
import { Check, MessageSquare, AlertCircle, CheckCircle2 } from 'lucide-react';
import { products } from '../../data/products';
import { PreferredContactMethod, WholesaleFormPayload } from '../../types';
import { submitWholesaleEnquiry, validatePhoneNumber } from '../../services/enquiries';

export const WholesaleForm: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [selectedProducts, setSelectedProducts] = useState<string[]>(['Stone-Free Ofada Rice']);
  const [estimatedQuantity, setEstimatedQuantity] = useState('');
  const [preferredContact, setPreferredContact] = useState<PreferredContactMethod>('WhatsApp');
  const [additionalMessage, setAdditionalMessage] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const toggleProduct = (productName: string) => {
    setSelectedProducts((prev) =>
      prev.includes(productName)
        ? prev.filter((p) => p !== productName)
        : [...prev, productName]
    );
  };

  const selectAllProducts = () => {
    setSelectedProducts(products.map((p) => p.name));
  };

  const clearSelectedProducts = () => {
    setSelectedProducts([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!name.trim()) {
      newErrors.name = 'Please provide your full name.';
    }

    const phoneCheck = validatePhoneNumber(phone);
    if (!phoneCheck.valid) {
      newErrors.phone = phoneCheck.error || 'Please provide a valid phone number.';
    }

    if (selectedProducts.length === 0) {
      newErrors.productsNeeded = 'Please select at least one food product you need.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    const payload: WholesaleFormPayload = {
      name,
      phone,
      businessName: businessName.trim() || undefined,
      productsNeeded: selectedProducts,
      estimatedQuantity: estimatedQuantity.trim() || 'To discuss based on price list',
      preferredContactMethod: preferredContact,
      additionalMessage: additionalMessage.trim() || undefined,
    };

    try {
      const result = await submitWholesaleEnquiry(payload);
      if (result.success && result.whatsappUrl) {
        setSubmitSuccess(true);
        window.open(result.whatsappUrl, '_blank', 'noopener,noreferrer');
      } else {
        setErrors({ form: result.message || 'Failed to submit enquiry. Please try again.' });
      }
    } catch {
      setErrors({
        form: 'An unexpected error occurred. Please contact us directly via WhatsApp or phone.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="bg-white rounded-2xl border border-[#E2DDD2] p-8 sm:p-12 text-center max-w-2xl mx-auto shadow-xs space-y-4">
        <div className="w-14 h-14 mx-auto rounded-full bg-[#1C3829]/10 text-[#1C3829] flex items-center justify-center">
          <CheckCircle2 className="w-8 h-8 text-[#25D366]" />
        </div>
        <h3 className="font-serif text-2xl font-bold text-[#1C3829]">
          Wholesale Enquiry Form Ready!
        </h3>
        <p className="text-sm text-[#555C56] max-w-md mx-auto leading-relaxed">
          Your wholesale details have been pre-formatted for Adriel Minimart. If your WhatsApp chat did not open automatically, tap the button below to send your enquiry.
        </p>
        <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
          <button
            type="button"
            onClick={handleSubmit}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-semibold text-white bg-[#1C3829] hover:bg-[#2A523C] rounded-lg transition-colors shadow-xs"
          >
            <MessageSquare className="w-4 h-4 text-[#25D366]" />
            <span>Open WhatsApp Chat</span>
          </button>
          <button
            type="button"
            onClick={() => setSubmitSuccess(false)}
            className="px-5 py-3 text-xs font-semibold text-[#555C56] hover:text-[#171B18] bg-[#EFECE4] rounded-lg transition-colors"
          >
            Edit / Submit Another Enquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="bg-white rounded-2xl border border-[#E2DDD2] p-6 sm:p-10 shadow-xs space-y-6 text-left"
    >
      {errors.form && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-xs text-red-800 flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
          <span>{errors.form}</span>
        </div>
      )}

      {/* Row 1: Name and Business Name */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-1.5">
          <label htmlFor="wholesale-name" className="block text-xs font-semibold text-[#1C3829]">
            Full Name <span className="text-[#C85A17]">*</span>
          </label>
          <input
            id="wholesale-name"
            type="text"
            required
            aria-required="true"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'error-name' : undefined}
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
            }}
            placeholder="e.g. Olawale Johnson"
            className={`w-full text-sm bg-white border rounded-lg px-3.5 py-2.5 text-[#171B18] placeholder-[#555C56]/50 focus:outline-none focus:ring-2 focus:ring-[#1C3829] ${
              errors.name ? 'border-red-400 bg-red-50/30' : 'border-[#E2DDD2]'
            }`}
          />
          {errors.name && (
            <p id="error-name" className="text-[11px] text-red-600">
              {errors.name}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <label htmlFor="wholesale-business" className="block text-xs font-semibold text-[#1C3829]">
            Business / Organization Name <span className="text-[#555C56] font-normal">(Optional)</span>
          </label>
          <input
            id="wholesale-business"
            type="text"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            placeholder="e.g. Mama Put Eatery / Grand Caterers / Reseller"
            className="w-full text-sm bg-white border border-[#E2DDD2] rounded-lg px-3.5 py-2.5 text-[#171B18] placeholder-[#555C56]/50 focus:outline-none focus:ring-2 focus:ring-[#1C3829]"
          />
        </div>
      </div>

      {/* Row 2: Phone & Preferred Contact */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-1.5">
          <label htmlFor="wholesale-phone" className="block text-xs font-semibold text-[#1C3829]">
            Phone / WhatsApp Number <span className="text-[#C85A17]">*</span>
          </label>
          <input
            id="wholesale-phone"
            type="tel"
            required
            aria-required="true"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? 'error-phone' : undefined}
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              if (errors.phone) setErrors((prev) => ({ ...prev, phone: '' }));
            }}
            placeholder="e.g. 0810 335 5028 or +234 810 335 5028"
            className={`w-full text-sm bg-white border rounded-lg px-3.5 py-2.5 text-[#171B18] placeholder-[#555C56]/50 focus:outline-none focus:ring-2 focus:ring-[#1C3829] ${
              errors.phone ? 'border-red-400 bg-red-50/30' : 'border-[#E2DDD2]'
            }`}
          />
          {errors.phone && (
            <p id="error-phone" className="text-[11px] text-red-600">
              {errors.phone}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-[#1C3829]">
            Preferred Contact Method
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(['WhatsApp', 'Phone call', 'Email'] as PreferredContactMethod[]).map((method) => (
              <button
                key={method}
                type="button"
                onClick={() => setPreferredContact(method)}
                className={`py-2 px-2 text-xs font-semibold rounded-lg border text-center transition-colors ${
                  preferredContact === method
                    ? 'bg-[#1C3829] text-white border-[#1C3829]'
                    : 'bg-white text-[#555C56] border-[#E2DDD2] hover:bg-[#F8F7F3]'
                }`}
              >
                {method}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Row 3: Multi-select Products Needed */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="block text-xs font-semibold text-[#1C3829]">
            Food Products Needed <span className="text-[#C85A17]">*</span>
          </label>
          <div className="flex items-center gap-3 text-xs text-[#C85A17]">
            <button
              type="button"
              onClick={selectAllProducts}
              className="hover:underline"
            >
              Select All
            </button>
            <span>·</span>
            <button
              type="button"
              onClick={clearSelectedProducts}
              className="hover:underline text-[#555C56]"
            >
              Clear
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 pt-1">
          {products.map((prod) => {
            const isChecked = selectedProducts.includes(prod.name);
            return (
              <button
                key={prod.id}
                type="button"
                onClick={() => {
                  toggleProduct(prod.name);
                  if (errors.productsNeeded) {
                    setErrors((prev) => ({ ...prev, productsNeeded: '' }));
                  }
                }}
                className={`p-3 text-left rounded-xl border text-xs font-medium transition-all flex items-center justify-between ${
                  isChecked
                    ? 'bg-[#1C3829]/5 border-[#1C3829] text-[#1C3829]'
                    : 'bg-[#F8F7F3] border-[#E2DDD2] text-[#555C56] hover:bg-white hover:border-[#C85A17]/40'
                }`}
              >
                <span>{prod.name}</span>
                <div
                  className={`w-4 h-4 rounded-sm border flex items-center justify-center transition-colors ${
                    isChecked
                      ? 'bg-[#1C3829] border-[#1C3829] text-white'
                      : 'border-[#E2DDD2] bg-white'
                  }`}
                >
                  {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
              </button>
            );
          })}
        </div>
        {errors.productsNeeded && (
          <p className="text-[11px] text-red-600 pt-1">
            {errors.productsNeeded}
          </p>
        )}
      </div>

      {/* Row 4: Estimated Quantity / Volume */}
      <div className="space-y-1.5">
        <label htmlFor="wholesale-quantity" className="block text-xs font-semibold text-[#1C3829]">
          Estimated Volume / Quantities Needed
        </label>
        <input
          id="wholesale-quantity"
          type="text"
          value={estimatedQuantity}
          onChange={(e) => setEstimatedQuantity(e.target.value)}
          placeholder="e.g. 5 bags Ofada rice, 1 carton smoked panla, 50 fresh snails weekly"
          className="w-full text-sm bg-white border border-[#E2DDD2] rounded-lg px-3.5 py-2.5 text-[#171B18] placeholder-[#555C56]/50 focus:outline-none focus:ring-2 focus:ring-[#1C3829]"
        />
        <p className="text-[11px] text-[#555C56]">
          If you are unsure, leave this empty to discuss standard bulk packing sizes with us.
        </p>
      </div>

      {/* Row 5: Additional Message */}
      <div className="space-y-1.5">
        <label htmlFor="wholesale-notes" className="block text-xs font-semibold text-[#1C3829]">
          Additional Requirements / Notes <span className="text-[#555C56] font-normal">(Optional)</span>
        </label>
        <textarea
          id="wholesale-notes"
          rows={3}
          value={additionalMessage}
          onChange={(e) => setAdditionalMessage(e.target.value)}
          placeholder="Mention any delivery location, export enquiry details, recurring order frequency, or special questions..."
          className="w-full text-sm bg-white border border-[#E2DDD2] rounded-lg px-3.5 py-2 text-[#171B18] placeholder-[#555C56]/50 focus:outline-none focus:ring-2 focus:ring-[#1C3829]"
        />
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-xs sm:text-sm font-semibold text-white bg-[#1C3829] hover:bg-[#2A523C] rounded-lg transition-colors shadow-xs"
        >
          <MessageSquare className="w-4 h-4 text-[#25D366]" />
          <span>
            {isSubmitting ? 'Formatting Enquiry...' : 'Submit Wholesale Enquiry via WhatsApp'}
          </span>
        </button>

        <p className="text-xs text-[#555C56] mt-3">
          Submitting opens WhatsApp with your pre-formatted order request so Adriel can review your wholesale needs and quote current wholesale pricing.
        </p>
      </div>
    </form>
  );
};
