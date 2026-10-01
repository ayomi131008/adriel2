import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageSquare, UtensilsCrossed } from 'lucide-react';
import { Product } from '../../types';
import { buildWhatsAppLink } from '../../lib/whatsapp';

interface ProductCardProps {
  product: Product;
  onEnquire?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onEnquire }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const priceText = product.price !== null
    ? `₦${product.price.toLocaleString()}${product.priceUnit ? ` ${product.priceUnit}` : ''}`
    : product.priceLabel;

  return (
    <article className="group bg-white rounded-2xl border border-[#E2DDD2] overflow-hidden flex flex-col justify-between transition-all duration-200 hover:shadow-md hover:border-[#C85A17]/40">
      <div>
        {/* Product Image Slot: Fixed 4:3 Aspect Ratio with Zero Layout Shift */}
        <Link
          to={`/products/${product.slug}`}
          className="relative block aspect-4/3 w-full bg-[#EFECE4] overflow-hidden"
          tabIndex={-1}
          aria-hidden="true"
        >
          {/* Skeleton placeholder while loading */}
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 bg-[#EFECE4] animate-pulse" />
          )}

          {!imageError ? (
            <img
              src={product.image.src}
              alt={product.image.alt}
              loading="lazy"
              referrerPolicy="no-referrer"
              width={600}
              height={450}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
              className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ) : (
            /* Resilient Fallback Container (Zero-Broken-Image Policy) */
            <div className="w-full h-full flex flex-col items-center justify-center bg-[#EFECE4] text-[#555C56] p-4 text-center">
              <UtensilsCrossed className="w-8 h-8 text-[#C85A17] mb-2 opacity-80" />
              <span className="font-serif text-sm font-semibold text-[#1C3829]">
                {product.image.fallbackText}
              </span>
              <span className="text-[11px] text-[#555C56] mt-0.5">Adriel Minimart</span>
            </div>
          )}

          {/* Availability subtle indicator */}
          <div className="absolute top-3 left-3 bg-[#1C3829]/90 backdrop-blur-xs text-[#F8F7F3] text-[11px] font-medium px-2.5 py-1 rounded-md">
            Wholesale & Retail
          </div>
        </Link>

        {/* Content Box */}
        <div className="p-5 sm:p-6 space-y-3">
          {/* Category kicker */}
          <p className="text-[11px] font-semibold uppercase tracking-wider text-[#C85A17]">
            {product.categoryName}
          </p>

          {/* Product Title */}
          <h3 className="font-serif text-xl font-bold text-[#1C3829] group-hover:text-[#C85A17] transition-colors leading-snug">
            <Link to={`/products/${product.slug}`}>{product.name}</Link>
          </h3>

          {/* Short description */}
          <p className="text-xs sm:text-sm text-[#555C56] line-clamp-2 leading-relaxed">
            {product.shortDescription}
          </p>

          {/* Unboxed metadata: clean text with typographic separator (NO PILLS) */}
          <div className="pt-1 flex items-center gap-2 text-xs text-[#555C56]">
            <span>Wholesale Available</span>
            <span aria-hidden="true" className="text-[#C85A17]">·</span>
            <span>Retail Available</span>
          </div>
        </div>
      </div>

      {/* Card Footer: Price & Actions */}
      <div className="p-5 sm:p-6 pt-0 mt-2 border-t border-[#E2DDD2]/60 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <span className="text-[11px] block uppercase tracking-wider text-[#555C56]">
            Pricing
          </span>
          <span className="text-sm font-semibold text-[#1C3829] tabular-nums">
            {priceText}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {onEnquire ? (
            <button
              type="button"
              onClick={() => onEnquire(product)}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-[#1C3829] hover:bg-[#2A523C] rounded-lg transition-colors whitespace-nowrap shadow-xs"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
              <span>Order / Enquire</span>
            </button>
          ) : (
            <a
              href={buildWhatsAppLink({ type: 'product', productName: product.name })}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-[#1C3829] hover:bg-[#2A523C] rounded-lg transition-colors whitespace-nowrap shadow-xs"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
              <span>Enquire</span>
            </a>
          )}

          <Link
            to={`/products/${product.slug}`}
            className="p-2 text-[#555C56] hover:text-[#1C3829] hover:bg-[#EFECE4] rounded-lg transition-colors"
            title={`View details for ${product.name}`}
            aria-label={`View details for ${product.name}`}
          >
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </article>
  );
};
