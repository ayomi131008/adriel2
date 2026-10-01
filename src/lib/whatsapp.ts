import { businessConfig } from '../config/business';
import { BuyerType } from '../types';

export interface WhatsAppLinkOptions {
  type?: 'general' | 'product' | 'order' | 'wholesale' | 'contact';
  productName?: string;
  quantity?: string;
  buyerType?: BuyerType;
  name?: string;
  businessName?: string;
  products?: string[];
  phone?: string;
  email?: string;
  message?: string;
  customText?: string;
}

/**
 * Builds a clean, fully URL-encoded WhatsApp click-to-chat link
 * referencing the centralized phone configuration.
 */
export function buildWhatsAppLink(options: WhatsAppLinkOptions = {}): string {
  const number = businessConfig.whatsappNumber;
  let text = '';

  if (options.customText) {
    text = options.customText;
  } else if (options.type === 'product' && options.productName) {
    text = businessConfig.whatsappTemplates.defaultProduct(options.productName);
  } else if (options.type === 'order' && options.productName) {
    text = businessConfig.whatsappTemplates.orderWithQuantity(
      options.productName,
      options.quantity || '1',
      options.buyerType || 'Retail'
    );
  } else if (options.type === 'wholesale') {
    text = businessConfig.whatsappTemplates.wholesaleEnquiry({
      name: options.name || 'Prospective Wholesale Buyer',
      businessName: options.businessName,
      products: options.products || (options.productName ? [options.productName] : []),
      quantity: options.quantity,
      notes: options.message,
    });
  } else if (options.type === 'contact') {
    text = businessConfig.whatsappTemplates.contactMessage({
      name: options.name || 'Prospective Client',
      phone: options.phone || 'Not provided',
      email: options.email,
      message: options.message || 'I would like more information about your food products.',
    });
  } else {
    text = businessConfig.whatsappTemplates.general;
  }

  return `https://wa.me/${number}?text=${encodeURIComponent(text.trim())}`;
}

/**
 * Opens the WhatsApp link in a user-safe manner without blocking popups
 */
export function openWhatsAppLink(options: WhatsAppLinkOptions = {}): void {
  const url = buildWhatsAppLink(options);
  if (typeof window !== 'undefined') {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}
