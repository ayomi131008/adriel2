import { buildWhatsAppLink } from '../lib/whatsapp';
import {
  ContactFormPayload,
  FormSubmissionResult,
  ProductEnquiryPayload,
  WholesaleFormPayload,
} from '../types';

/**
 * Validates Nigerian and international phone numbers.
 * Tolerates spaces, hyphens, and leading zeros or country codes.
 * Examples: 0810 335 5028, +234 810 335 5028, 08021234567, 2348103355028
 */
export function validatePhoneNumber(phone: string): { valid: boolean; normalized?: string; error?: string } {
  if (!phone || !phone.trim()) {
    return { valid: false, error: 'Phone number is required so we can contact you.' };
  }

  // Strip spaces, dashes, parentheses
  const cleaned = phone.replace(/[\s\-()]/g, '');

  // Check if it matches Nigerian number patterns:
  // Starts with 0 and has 11 digits (e.g. 08103355028, 080..., 070..., 090..., 091...)
  // OR starts with +234 and has 10 digits after (e.g. +2348103355028)
  // OR starts with 234 and has 10 digits after (e.g. 2348103355028)
  // OR general international number with at least 8 digits
  const nigerianLocalRegex = /^0[789][01]\d{8}$/;
  const nigerianIntlWithPlus = /^\+234[789][01]\d{8}$/;
  const nigerianIntlNoPlus = /^234[789][01]\d{8}$/;
  const generalPhoneRegex = /^\+?[0-9]{8,15}$/;

  if (
    nigerianLocalRegex.test(cleaned) ||
    nigerianIntlWithPlus.test(cleaned) ||
    nigerianIntlNoPlus.test(cleaned) ||
    generalPhoneRegex.test(cleaned)
  ) {
    return { valid: true, normalized: cleaned };
  }

  return {
    valid: false,
    error: 'Please enter a valid phone number (e.g., 0810 335 5028 or +234 810 335 5028).',
  };
}

/**
 * Basic email validator (only if email is provided, since email is optional)
 */
export function validateEmail(email?: string): { valid: boolean; error?: string } {
  if (!email || !email.trim()) {
    return { valid: true };
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return { valid: false, error: 'Please enter a valid email address.' };
  }
  return { valid: true };
}

/**
 * Submit Product Enquiry
 *
 * In Version 1: Validates form input, creates the formatted WhatsApp link,
 * and opens WhatsApp so the user can immediately engage directly with Adriel.
 *
 * FUTURE BACKEND EXTENSION POINT:
 * To connect a server-side database (Firebase/Supabase/Cloud SQL) or email
 * service (Formspree/Resend/SendGrid), replace or extend this handler to call
 * `fetch('/api/enquiries', { method: 'POST', body: JSON.stringify(payload) })`.
 */
export async function submitProductEnquiry(
  payload: ProductEnquiryPayload
): Promise<FormSubmissionResult> {
  if (!payload.name || !payload.name.trim()) {
    return { success: false, message: 'Please provide your name.', error: 'name' };
  }

  const phoneCheck = validatePhoneNumber(payload.phone);
  if (!phoneCheck.valid) {
    return { success: false, message: phoneCheck.error || 'Invalid phone', error: 'phone' };
  }

  const customText = `Hello Adriel Minimart & Food Export,\n\n*Product Order / Enquiry*\n• Product: ${payload.productName}\n• Order Type: ${payload.buyerType}\n• Estimated Quantity: ${payload.quantity || '1'}\n• Customer Name: ${payload.name.trim()}\n• Contact Phone: ${payload.phone.trim()}${payload.note ? `\n• Notes: ${payload.note.trim()}` : ''}\n\nPlease confirm availability and pricing.`;

  const whatsappUrl = buildWhatsAppLink({ customText });

  return {
    success: true,
    message: 'Enquiry prepared! Opening WhatsApp to send your message directly to Adriel Minimart.',
    whatsappUrl,
  };
}

/**
 * Submit Wholesale Enquiry
 */
export async function submitWholesaleEnquiry(
  payload: WholesaleFormPayload
): Promise<FormSubmissionResult> {
  if (!payload.name || !payload.name.trim()) {
    return { success: false, message: 'Please provide your contact name.', error: 'name' };
  }

  const phoneCheck = validatePhoneNumber(payload.phone);
  if (!phoneCheck.valid) {
    return { success: false, message: phoneCheck.error || 'Invalid phone', error: 'phone' };
  }

  if (!payload.productsNeeded || payload.productsNeeded.length === 0) {
    return {
      success: false,
      message: 'Please select at least one product you are interested in.',
      error: 'productsNeeded',
    };
  }

  const customText = `Hello Adriel Minimart & Food Export,\n\n*Wholesale & Bulk Enquiry*\n• Name: ${payload.name.trim()}${payload.businessName ? `\n• Business / Outfit: ${payload.businessName.trim()}` : ''}\n• Phone: ${payload.phone.trim()}\n• Preferred Contact: ${payload.preferredContactMethod}\n• Products Needed:\n  - ${payload.productsNeeded.join('\n  - ')}\n• Estimated Quantity / Volume: ${payload.estimatedQuantity || 'To discuss'}${payload.additionalMessage ? `\n• Message: ${payload.additionalMessage.trim()}` : ''}\n\nLooking forward to your wholesale price list and order details.`;

  const whatsappUrl = buildWhatsAppLink({ customText });

  return {
    success: true,
    message: 'Wholesale enquiry prepared! Opening WhatsApp to connect with Adriel Minimart.',
    whatsappUrl,
  };
}

/**
 * Submit General Contact Form
 */
export async function submitContactForm(
  payload: ContactFormPayload
): Promise<FormSubmissionResult> {
  if (!payload.name || !payload.name.trim()) {
    return { success: false, message: 'Please provide your name.', error: 'name' };
  }

  const phoneCheck = validatePhoneNumber(payload.phone);
  if (!phoneCheck.valid) {
    return { success: false, message: phoneCheck.error || 'Invalid phone', error: 'phone' };
  }

  const emailCheck = validateEmail(payload.email);
  if (!emailCheck.valid) {
    return { success: false, message: emailCheck.error || 'Invalid email', error: 'email' };
  }

  if (!payload.message || !payload.message.trim()) {
    return { success: false, message: 'Please write your message.', error: 'message' };
  }

  const customText = `Hello Adriel Minimart & Food Export,\n\n*General Contact Message*\n• Name: ${payload.name.trim()}\n• Phone: ${payload.phone.trim()}${payload.email ? `\n• Email: ${payload.email.trim()}` : ''}\n• Message: ${payload.message.trim()}`;

  const whatsappUrl = buildWhatsAppLink({ customText });

  return {
    success: true,
    message: 'Message ready! Opening WhatsApp to send directly to Adriel Minimart.',
    whatsappUrl,
  };
}
