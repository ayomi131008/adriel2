export type ProductCategorySlug = 'rice' | 'snails' | 'smoked-seafood' | 'smoked-meat';

export interface Category {
  id: string;
  slug: ProductCategorySlug;
  name: string;
  tagline: string;
  description: string;
  image: string;
  productCount?: number;
}

export interface ProductAvailability {
  wholesale: boolean;
  retail: boolean;
}

export interface ProductImage {
  src: string;
  alt: string;
  fallbackText: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: ProductCategorySlug;
  categoryName: string;
  shortDescription: string;
  longDescription: string;
  culinaryUses: string[];
  image: ProductImage;
  availability: ProductAvailability;
  price: number | null; // Kept null in v1 as per strict truthfulness guidelines
  priceUnit: string | null;
  priceLabel: string; // "Contact for price"
  featured: boolean;
  inStock?: boolean;
  seoKeywords?: string[];
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  organization: string;
  quote: string;
}

export type BuyerType = 'Retail' | 'Wholesale';
export type PreferredContactMethod = 'WhatsApp' | 'Phone call' | 'Email';

export interface ProductEnquiryPayload {
  productName: string;
  productSlug: string;
  quantity: string;
  buyerType: BuyerType;
  name: string;
  phone: string;
  note?: string;
}

export interface WholesaleFormPayload {
  name: string;
  phone: string;
  businessName?: string;
  productsNeeded: string[];
  estimatedQuantity: string;
  preferredContactMethod: PreferredContactMethod;
  additionalMessage?: string;
}

export interface ContactFormPayload {
  name: string;
  phone: string;
  email?: string;
  message: string;
}

export interface FormSubmissionResult {
  success: boolean;
  message: string;
  whatsappUrl?: string;
  error?: string;
}
