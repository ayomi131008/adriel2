import React, { useEffect } from 'react';
import { businessConfig } from '../../config/business';
import { Product } from '../../types';

interface SeoProps {
  title?: string;
  description?: string;
  canonicalPath?: string;
  ogType?: 'website' | 'article' | 'product';
  ogImage?: string;
  products?: Product[];
}

export const Seo: React.FC<SeoProps> = ({
  title,
  description = 'Quality food products, stone-free Ofada rice, snails, smoked catfish, panla, and smoked meats for wholesale and retail in Abeokuta, Ogun State, Nigeria.',
  canonicalPath = '',
  ogType = 'website',
  ogImage = '/images/hero/hero_food_export.jpg',
  products,
}) => {
  const fullTitle = title
    ? `${title} | ${businessConfig.shortName}`
    : `${businessConfig.name} – Wholesale & Retail Foodstuffs, Abeokuta`;

  useEffect(() => {
    // 1. Update document title
    document.title = fullTitle;

    // Helper to set or create meta tag
    const setMetaTag = (attribute: 'name' | 'property', key: string, value: string) => {
      let element = document.querySelector(`meta[${attribute}="${key}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, key);
        document.head.appendChild(element);
      }
      element.setAttribute('content', value);
    };

    setMetaTag('name', 'description', description);
    setMetaTag('property', 'og:title', fullTitle);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:type', ogType);
    setMetaTag('property', 'og:image', ogImage);
    setMetaTag('property', 'og:site_name', businessConfig.name);
    setMetaTag('property', 'og:locale', 'en_NG');

    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', fullTitle);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', ogImage);

    // Canonical link
    const origin = typeof window !== 'undefined' ? window.location.origin : businessConfig.siteUrl;
    const canonicalUrl = `${origin}${canonicalPath}`;
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', canonicalUrl);

    // Schema.org LocalBusiness JSON-LD (strictly truthful, no street address)
    const localBusinessSchema = {
      '@context': 'https://schema.org',
      '@type': 'Store',
      name: businessConfig.name,
      description: businessConfig.tagline,
      telephone: businessConfig.phoneDisplay,
      url: origin,
      address: {
        '@type': 'PostalAddress',
        addressLocality: businessConfig.location.city,
        addressRegion: businessConfig.location.state,
        addressCountry: businessConfig.location.countryCode,
      },
      priceRange: '₦₦',
      currenciesAccepted: businessConfig.currency.code,
      paymentAccepted: 'Contact for order arrangements',
    };

    let scriptLd = document.getElementById('schema-local-business') as HTMLScriptElement | null;
    if (!scriptLd) {
      scriptLd = document.createElement('script');
      scriptLd.id = 'schema-local-business';
      scriptLd.type = 'application/ld+json';
      document.head.appendChild(scriptLd);
    }
    scriptLd.textContent = JSON.stringify(localBusinessSchema);

    // If products provided, add ItemList schema (without fake prices)
    if (products && products.length > 0) {
      const itemListSchema = {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        itemListElement: products.map((prod, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@type': 'Product',
            name: prod.name,
            description: prod.shortDescription,
            image: `${origin}${prod.image.src}`,
            category: prod.categoryName,
          },
        })),
      };

      let scriptProducts = document.getElementById('schema-products-list') as HTMLScriptElement | null;
      if (!scriptProducts) {
        scriptProducts = document.createElement('script');
        scriptProducts.id = 'schema-products-list';
        scriptProducts.type = 'application/ld+json';
        document.head.appendChild(scriptProducts);
      }
      scriptProducts.textContent = JSON.stringify(itemListSchema);
    }
  }, [fullTitle, description, canonicalPath, ogType, ogImage, products]);

  return null;
};
