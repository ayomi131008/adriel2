import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Seo } from '../components/common/Seo';
import { getProductBySlug, products } from '../data/products';
import { ProductCard } from '../components/product/ProductCard';
import { Product } from '../types';
import {
  MessageSquare,
  Phone,
  Check,
  ChevronRight,
  UtensilsCrossed,
  Sparkles,
} from 'lucide-react';
import { businessConfig } from '../../src/config/business';
import { buildWhatsAppLink } from '../lib/whatsapp';
import { submitProductEnquiry, validatePhoneNumber } from '../services/enquiries';

interface ProductDetailPageProps {
  onEnquire: (product: Product) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ onEnquire }) => {
  const { slug } = useParams<{ slug: string }>();
  const product = slug ? getProductBySlug(slug) : undefined;

  const [quantity, setQuantity] = useState('1');
  const [buyerType, setBuyerType] = useState<'Retail' | 'Wholesale'>('Retail');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [note, setNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!product) {
    return <Navigate to="/products" replace />;
  }

  // Related products from same category or other featured items
  const relatedProducts = products
    .filter((p) => p.id !== product.id)
    .slice(0, 3);

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
        productName: product.name,
        productSlug: product.slug,
        quantity,
        buyerType,
        name,
        phone,
        note,
      });

      if (result.success && result.whatsappUrl) {
        window.open(result.whatsappUrl, '_blank', 'noopener,noreferrer');
      } else {
        setErrorMsg(result.message || 'Could not process enquiry.');
      }
    } catch {
      setErrorMsg('An error occurred. Please click the direct WhatsApp button below.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Seo
        title={`${product.name} – Wholesale & Retail`}
        description={product.shortDescription}
        canonicalPath={`/products/${product.slug}`}
        ogImage={product.image.src}
        ogType="product"
        products={[product]}
      />

      <main id="main-content" className="py-8 sm:py-12 bg-[#F8F7F3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumbs" className="flex items-center gap-2 text-xs text-[#555C56]">
            <Link to="/" className="hover:text-[#1C3829] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#A3B2A8]" />
            <Link to="/products" className="hover:text-[#1C3829] transition-colors">
              Products
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#A3B2A8]" />
            <span className="font-semibold text-[#1C3829] truncate max-w-[200px] sm:max-w-none">
              {product.name}
            </span>
          </nav>

          {/* Product Detail Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            
            {/* Left: Product Image */}
            <div className="lg:col-span-6 space-y-4">
              <div className="relative aspect-4/3 w-full rounded-2xl overflow-hidden bg-[#EFECE4] border border-[#E2DDD2] shadow-sm">
                <img
                  src={product.image.src}
                  alt={product.image.alt}
                  loading="eager"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-[#1C3829]/90 backdrop-blur-xs text-[#F8F7F3] text-xs font-semibold px-3 py-1.5 rounded-lg">
                  Wholesale & Retail
                </div>
              </div>

              {/* Culinary Highlights Card */}
              <div className="bg-white rounded-2xl border border-[#E2DDD2] p-6 space-y-3 shadow-xs">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C85A17]">
                  <UtensilsCrossed className="w-4 h-4 text-[#C85A17]" />
                  <span>Common Nigerian Culinary Uses</span>
                </div>
                <p className="text-xs text-[#555C56]">
                  Popular dishes prepared with this staple in homes, restaurants, and catering events:
                </p>
                <ul className="space-y-2 pt-1 text-xs sm:text-sm text-[#171B18]">
                  {product.culinaryUses.map((use) => (
                    <li key={use} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#1C3829] shrink-0 mt-0.5" />
                      <span>{use}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right: Info & Contiguous Purchase/Enquiry Module */}
            <div className="lg:col-span-6 space-y-6">
              
              <div className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#C85A17]">
                  {product.categoryName}
                </span>
                <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#1C3829]">
                  {product.name}
                </h1>
                
                {/* Unboxed metadata: zero-pill discipline */}
                <div className="flex items-center gap-2 text-xs text-[#555C56] pt-1">
                  <span>Wholesale Available</span>
                  <span aria-hidden="true" className="text-[#C85A17]">·</span>
                  <span>Retail Available</span>
                  <span aria-hidden="true" className="text-[#C85A17]">·</span>
                  <span>Abeokuta, Ogun State</span>
                </div>
              </div>

              {/* Pricing Box */}
              <div className="p-4 bg-white rounded-xl border border-[#E2DDD2] flex items-center justify-between">
                <div>
                  <span className="text-xs text-[#555C56] block">Pricing</span>
                  <span className="font-serif text-xl font-bold text-[#1C3829]">
                    {product.price !== null
                      ? `₦${product.price.toLocaleString()}`
                      : product.priceLabel}
                  </span>
                </div>
                <span className="text-xs text-[#555C56] max-w-[180px] text-right">
                  Pocket-friendly pricing confirmed based on desired volume
                </span>
              </div>

              {/* Long Description */}
              <div className="space-y-3">
                <h2 className="text-xs font-semibold uppercase tracking-wider text-[#1C3829]">
                  Product Description
                </h2>
                <p className="text-sm sm:text-base text-[#555C56] leading-relaxed">
                  {product.longDescription}
                </p>
              </div>

              {/* Contiguous Enquiry Form */}
              <div className="bg-white rounded-2xl border border-[#E2DDD2] p-6 shadow-xs space-y-4 text-left">
                <div className="space-y-1">
                  <h3 className="font-serif text-lg font-bold text-[#1C3829]">
                    Enquire / Order {product.name}
                  </h3>
                  <p className="text-xs text-[#555C56]">
                    Fill this quick form to send your order specifications directly to Adriel on WhatsApp.
                  </p>
                </div>

                {errorMsg && (
                  <p className="p-2.5 bg-red-50 text-red-700 text-xs rounded-lg border border-red-200">
                    {errorMsg}
                  </p>
                )}

                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setBuyerType('Retail')}
                      className={`py-2 text-xs font-semibold rounded-lg border transition-colors ${
                        buyerType === 'Retail'
                          ? 'bg-[#1C3829] text-white border-[#1C3829]'
                          : 'bg-white text-[#555C56] border-[#E2DDD2]'
                      }`}
                    >
                      Retail
                    </button>
                    <button
                      type="button"
                      onClick={() => setBuyerType('Wholesale')}
                      className={`py-2 text-xs font-semibold rounded-lg border transition-colors ${
                        buyerType === 'Wholesale'
                          ? 'bg-[#1C3829] text-white border-[#1C3829]'
                          : 'bg-white text-[#555C56] border-[#E2DDD2]'
                      }`}
                    >
                      Wholesale (Bulk)
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="detail-name" className="block text-[11px] font-semibold text-[#1C3829] mb-1">
                        Your Name *
                      </label>
                      <input
                        id="detail-name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your name"
                        className="w-full text-xs bg-white border border-[#E2DDD2] rounded-lg px-3 py-2 text-[#171B18] focus:outline-none focus:ring-1 focus:ring-[#1C3829]"
                      />
                    </div>

                    <div>
                      <label htmlFor="detail-phone" className="block text-[11px] font-semibold text-[#1C3829] mb-1">
                        Phone / WhatsApp *
                      </label>
                      <input
                        id="detail-phone"
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="0810 335 5028"
                        className="w-full text-xs bg-white border border-[#E2DDD2] rounded-lg px-3 py-2 text-[#171B18] focus:outline-none focus:ring-1 focus:ring-[#1C3829]"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="detail-quantity" className="block text-[11px] font-semibold text-[#1C3829] mb-1">
                      Estimated Quantity / Size
                    </label>
                    <input
                      id="detail-quantity"
                      type="text"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      placeholder="e.g. 1 bag, 5kg, 1 carton, or 20 pieces"
                      className="w-full text-xs bg-white border border-[#E2DDD2] rounded-lg px-3 py-2 text-[#171B18] focus:outline-none focus:ring-1 focus:ring-[#1C3829]"
                    />
                  </div>

                  <div>
                    <label htmlFor="detail-note" className="block text-[11px] font-semibold text-[#1C3829] mb-1">
                      Optional Note
                    </label>
                    <input
                      id="detail-note"
                      type="text"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder="Delivery location or special requirement..."
                      className="w-full text-xs bg-white border border-[#E2DDD2] rounded-lg px-3 py-2 text-[#171B18] focus:outline-none focus:ring-1 focus:ring-[#1C3829]"
                    />
                  </div>

                  <div className="pt-1 flex flex-col sm:flex-row gap-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 text-xs font-semibold text-white bg-[#1C3829] hover:bg-[#2A523C] rounded-lg transition-colors shadow-xs"
                    >
                      <MessageSquare className="w-4 h-4 text-[#25D366]" />
                      <span>{isSubmitting ? 'Formatting...' : 'Send Order via WhatsApp'}</span>
                    </button>

                    <a
                      href={buildWhatsAppLink({ type: 'product', productName: product.name })}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 py-3 px-4 text-xs font-semibold text-[#1C3829] bg-[#EFECE4] hover:bg-[#E2DDD2] rounded-lg transition-colors border border-[#1C3829]/15"
                    >
                      <span>Direct Chat</span>
                    </a>
                  </div>
                </form>

                <div className="pt-2 text-center">
                  <a
                    href={`tel:${businessConfig.phoneRaw}`}
                    className="inline-flex items-center gap-1.5 text-xs text-[#555C56] hover:text-[#1C3829]"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Prefer to call? Call {businessConfig.phoneDisplay}</span>
                  </a>
                </div>
              </div>

            </div>

          </div>

          {/* Related Products */}
          <div className="pt-12 border-t border-[#E2DDD2] space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-2xl font-bold text-[#1C3829]">
                Other Food Products You May Need
              </h2>
              <Link
                to="/products"
                className="text-xs font-semibold text-[#C85A17] hover:underline"
              >
                View All Products
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} onEnquire={onEnquire} />
              ))}
            </div>
          </div>

        </div>
      </main>
    </>
  );
};
