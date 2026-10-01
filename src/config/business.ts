/**
 * Centralized business configuration for Adriel Minimart & Food Export.
 * All phone numbers, WhatsApp links, business copy, and location details
 * flow directly from this single source of truth.
 */

export interface BusinessConfig {
  name: string;
  shortName: string;
  businessType: string;
  tagline: string;
  footerLine: string;
  phoneDisplay: string;
  phoneRaw: string;
  whatsappNumber: string; // international digits-only format for wa.me links
  location: {
    city: string;
    state: string;
    country: string;
    countryCode: string;
    formatted: string;
    /**
     * Exact street address placeholder.
     * Keep as null until the business owner provides a verified street address.
     */
    streetAddress: string | null;
    /**
     * Google Maps embed URL placeholder.
     * Only renders map iframe if provided.
     */
    mapEmbedUrl: string | null;
  };
  email: string | null; // Placeholder: null until provided
  businessHours: {
    display: string | null; // e.g. "Monday – Saturday: 8:00 AM – 6:00 PM"
    statusNote: string;
  };
  socialLinks: {
    facebook: string | null;
    instagram: string | null;
    twitter: string | null;
    tiktok: string | null;
  };
  siteUrl: string;
  currency: {
    code: string;
    symbol: string;
  };
  whatsappTemplates: {
    defaultProduct: (productName: string) => string;
    orderWithQuantity: (productName: string, quantity: string, buyerType: string) => string;
    wholesaleEnquiry: (details: {
      name: string;
      businessName?: string;
      products: string[];
      quantity?: string;
      notes?: string;
    }) => string;
    contactMessage: (details: {
      name: string;
      phone: string;
      email?: string;
      message: string;
    }) => string;
    general: string;
  };
}

export const businessConfig: BusinessConfig = {
  name: "Adriel Minimart & Food Export",
  shortName: "Adriel Minimart",
  businessType: "Food retailer, wholesaler, and food export business",
  tagline: "Quality food products. Affordable prices. Wholesale & retail.",
  footerLine: "Quality food products for wholesale & retail.",
  phoneDisplay: "+234 810 335 5028",
  phoneRaw: "+2348103355028",
  whatsappNumber: "2348103355028", // Change this ONE value to update all links & forms across the site
  location: {
    city: "Abeokuta",
    state: "Ogun State",
    country: "Nigeria",
    countryCode: "NG",
    formatted: "Abeokuta, Ogun State, Nigeria",
    streetAddress: null, // Keep null; no street address provided
    mapEmbedUrl: null, // Keep null; conditional map renders clean fallback
  },
  email: "Mojisolamata@gmail.com", // Placeholder: null until verified
  businessHours: {
    display: "Monday – Saturday: 24 hours", // Placeholder: null until verified
    statusNote: "Orders processed 24/7 on WhatsApp",
  },
  socialLinks: {
    facebook: null,
    instagram: null,
    twitter: null,
    tiktok: "https://www.tiktok.com/@adrielfood1?_r=1&_t=ZS-9AAdWC722RZ",
  },
  siteUrl: "https://adrielminimart.com",
  currency: {
    code: "NGN",
    symbol: "₦",
  },
  whatsappTemplates: {
    defaultProduct: (productName: string) =>
      `Hello Adriel Minimart & Food Export, I would like to enquire about ${productName}.`,
    orderWithQuantity: (productName: string, quantity: string, buyerType: string) =>
      `Hello Adriel Minimart & Food Export,\n\nI would like to place an order / enquiry:\n• Product: ${productName}\n• Order Type: ${buyerType}\n• Estimated Quantity: ${quantity || "To be discussed"}\n\nPlease let me know availability and pricing.`,
    wholesaleEnquiry: ({ name, businessName, products, quantity, notes }) =>
      `Hello Adriel Minimart & Food Export,\n\n*Wholesale Enquiry*\n• Name: ${name}${businessName ? `\n• Business / Organization: ${businessName}` : ""}\n• Products Needed: ${products.length > 0 ? products.join(", ") : "General Wholesale"}${quantity ? `\n• Estimated Quantity: ${quantity}` : ""}${notes ? `\n• Additional Notes: ${notes}` : ""}\n\nPlease share your wholesale pricing and order arrangements. Thank you!`,
    contactMessage: ({ name, phone, email, message }) =>
      `Hello Adriel Minimart & Food Export,\n\n*Website Enquiry*\n• Name: ${name}\n• Phone: ${phone}${email ? `\n• Email: ${email}` : ""}\n• Message: ${message}`,
    general:
      "Hello Adriel Minimart & Food Export, I would like to enquire about your food products.",
  },
};
