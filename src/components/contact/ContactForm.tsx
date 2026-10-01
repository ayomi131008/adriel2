import React, { useState } from 'react';
import { MessageSquare, AlertCircle, CheckCircle2 } from 'lucide-react';
import { submitContactForm, validateEmail, validatePhoneNumber } from '../../services/enquiries';

export const ContactForm: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!name.trim()) {
      newErrors.name = 'Please provide your name.';
    }

    const phoneCheck = validatePhoneNumber(phone);
    if (!phoneCheck.valid) {
      newErrors.phone = phoneCheck.error || 'Please enter a valid phone number.';
    }

    const emailCheck = validateEmail(email);
    if (!emailCheck.valid) {
      newErrors.email = emailCheck.error || 'Please enter a valid email address.';
    }

    if (!message.trim()) {
      newErrors.message = 'Please enter your enquiry or message.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const result = await submitContactForm({
        name,
        phone,
        email: email.trim() || undefined,
        message,
      });

      if (result.success && result.whatsappUrl) {
        setSubmitSuccess(true);
        window.open(result.whatsappUrl, '_blank', 'noopener,noreferrer');
      } else {
        setErrors({ form: result.message || 'Could not process message.' });
      }
    } catch {
      setErrors({ form: 'An unexpected error occurred. Please contact us via phone or WhatsApp.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="bg-white rounded-2xl border border-[#E2DDD2] p-8 text-center space-y-4 shadow-xs">
        <div className="w-12 h-12 mx-auto rounded-full bg-[#1C3829]/10 text-[#1C3829] flex items-center justify-center">
          <CheckCircle2 className="w-7 h-7 text-[#25D366]" />
        </div>
        <h3 className="font-serif text-xl font-bold text-[#1C3829]">
          Message Pre-Formatted!
        </h3>
        <p className="text-xs sm:text-sm text-[#555C56] max-w-sm mx-auto leading-relaxed">
          Your message is ready to send to Adriel on WhatsApp. If WhatsApp didn't open automatically, click the button below.
        </p>
        <div className="pt-2 flex flex-col sm:flex-row justify-center gap-2">
          <button
            type="button"
            onClick={handleSubmit}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-[#1C3829] hover:bg-[#2A523C] rounded-lg transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
            <span>Open WhatsApp Chat</span>
          </button>
          <button
            type="button"
            onClick={() => setSubmitSuccess(false)}
            className="px-4 py-2.5 text-xs font-semibold text-[#555C56] hover:text-[#171B18] bg-[#EFECE4] rounded-lg transition-colors"
          >
            Send Another Message
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="bg-white rounded-2xl border border-[#E2DDD2] p-6 sm:p-8 shadow-xs space-y-4 text-left"
    >
      {errors.form && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-800 flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
          <span>{errors.form}</span>
        </div>
      )}

      {/* Name */}
      <div className="space-y-1.5">
        <label htmlFor="contact-name" className="block text-xs font-semibold text-[#1C3829]">
          Your Name <span className="text-[#C85A17]">*</span>
        </label>
        <input
          id="contact-name"
          type="text"
          required
          aria-required="true"
          aria-invalid={Boolean(errors.name)}
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
          }}
          placeholder="e.g. Bukola Alabi"
          className={`w-full text-sm bg-white border rounded-lg px-3.5 py-2.5 text-[#171B18] placeholder-[#555C56]/50 focus:outline-none focus:ring-2 focus:ring-[#1C3829] ${
            errors.name ? 'border-red-400 bg-red-50/30' : 'border-[#E2DDD2]'
          }`}
        />
        {errors.name && <p className="text-[11px] text-red-600">{errors.name}</p>}
      </div>

      {/* Phone */}
      <div className="space-y-1.5">
        <label htmlFor="contact-phone" className="block text-xs font-semibold text-[#1C3829]">
          Phone / WhatsApp <span className="text-[#C85A17]">*</span>
        </label>
        <input
          id="contact-phone"
          type="tel"
          required
          aria-required="true"
          aria-invalid={Boolean(errors.phone)}
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
        {errors.phone && <p className="text-[11px] text-red-600">{errors.phone}</p>}
      </div>

      {/* Email (Optional) */}
      <div className="space-y-1.5">
        <label htmlFor="contact-email" className="block text-xs font-semibold text-[#1C3829]">
          Email Address <span className="text-[#555C56] font-normal">(Optional)</span>
        </label>
        <input
          id="contact-email"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
          }}
          placeholder="e.g. yourname@example.com"
          className={`w-full text-sm bg-white border rounded-lg px-3.5 py-2.5 text-[#171B18] placeholder-[#555C56]/50 focus:outline-none focus:ring-2 focus:ring-[#1C3829] ${
            errors.email ? 'border-red-400 bg-red-50/30' : 'border-[#E2DDD2]'
          }`}
        />
        {errors.email && <p className="text-[11px] text-red-600">{errors.email}</p>}
      </div>

      {/* Message */}
      <div className="space-y-1.5">
        <label htmlFor="contact-message" className="block text-xs font-semibold text-[#1C3829]">
          Your Enquiry or Message <span className="text-[#C85A17]">*</span>
        </label>
        <textarea
          id="contact-message"
          rows={4}
          required
          aria-required="true"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            if (errors.message) setErrors((prev) => ({ ...prev, message: '' }));
          }}
          placeholder="Tell us what food products you are looking for, order quantities, or questions..."
          className={`w-full text-sm bg-white border rounded-lg px-3.5 py-2 text-[#171B18] placeholder-[#555C56]/50 focus:outline-none focus:ring-2 focus:ring-[#1C3829] ${
            errors.message ? 'border-red-400 bg-red-50/30' : 'border-[#E2DDD2]'
          }`}
        />
        {errors.message && <p className="text-[11px] text-red-600">{errors.message}</p>}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex items-center justify-center gap-2 py-3 px-5 text-xs font-semibold text-white bg-[#1C3829] hover:bg-[#2A523C] rounded-lg transition-colors shadow-xs"
      >
        <MessageSquare className="w-4 h-4 text-[#25D366]" />
        <span>{isSubmitting ? 'Formatting...' : 'Send Message via WhatsApp'}</span>
      </button>

      <p className="text-[11px] text-center text-[#555C56]">
        Submitting opens WhatsApp with your pre-filled inquiry.
      </p>
    </form>
  );
};
