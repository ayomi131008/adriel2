import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MessageSquare, MapPin, ArrowUpRight } from 'lucide-react';
import { businessConfig } from '../../config/business';
import { products } from '../../data/products';
import { buildWhatsAppLink } from '../../lib/whatsapp';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  // Filter out any social links that aren't set
  const activeSocials = Object.entries(businessConfig.socialLinks).filter(
    ([, url]) => Boolean(url)
  );

  return (
    <footer className="bg-[#13271C] text-[#EFECE4] pt-16 pb-24 md:pb-16 border-t border-[#2A523C]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-[#2A523C]/40">
          {/* Col 1 & 2: Brand Information */}
          <div className="lg:col-span-2 space-y-4">
            <Link
              to="/"
              className="inline-block font-serif text-2xl font-bold tracking-tight text-white hover:text-[#C85A17] transition-colors"
            >
              {businessConfig.name}
            </Link>
            <p className="text-sm text-[#C8D1CB] max-w-sm leading-relaxed">
              {businessConfig.footerLine}
            </p>
            <p className="text-xs text-[#A3B2A8] leading-relaxed max-w-sm">
              Supplying individual households, restaurants, caterers, food vendors, retailers, and food-export enquiries.
            </p>

            <div className="pt-2 flex items-center gap-2 text-sm text-[#EFECE4]">
              <MapPin className="w-4 h-4 text-[#C85A17] shrink-0" />
              <span>{businessConfig.location.formatted}</span>
            </div>
          </div>

          {/* Col 3: Navigation Links */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#A3B2A8]">
              Quick Navigation
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-[#EFECE4] hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-[#EFECE4] hover:text-white transition-colors">
                  Product Catalogue
                </Link>
              </li>
              <li>
                <Link to="/wholesale" className="text-[#EFECE4] hover:text-white transition-colors">
                  Wholesale & Bulk Orders
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-[#EFECE4] hover:text-white transition-colors">
                  About Adriel
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-[#EFECE4] hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Products Catalogue (auto-generated from products.ts) */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#A3B2A8]">
              Food Products
            </h3>
            <ul className="space-y-2 text-sm">
              {products.map((p) => (
                <li key={p.id}>
                  <Link
                    to={`/products/${p.slug}`}
                    className="text-[#EFECE4] hover:text-[#C85A17] transition-colors inline-flex items-center gap-1 group"
                  >
                    <span>{p.name}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-[#C85A17]" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 5: Contact & Order Placement */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#A3B2A8]">
              Place Enquiries
            </h3>
            <div className="space-y-2.5 text-sm">
              <a
                href={buildWhatsAppLink({ type: 'general' })}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#EFECE4] hover:text-[#25D366] transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-[#25D366] shrink-0" />
                <span>WhatsApp: {businessConfig.phoneDisplay}</span>
              </a>

              <a
                href={`tel:${businessConfig.phoneRaw}`}
                className="flex items-center gap-2 text-[#EFECE4] hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4 text-[#A3B2A8] shrink-0" />
                <span>Call: {businessConfig.phoneDisplay}</span>
              </a>

              <p className="text-xs text-[#A3B2A8] pt-1">
                {businessConfig.businessHours.statusNote}
              </p>

              {/* Conditional Socials: only shown if configured */}
              {activeSocials.length > 0 && (
                <div className="pt-3 flex items-center gap-3">
                  {activeSocials.map(([platform, url]) => (
                    <a
                      key={platform}
                      href={url!}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs capitalize text-[#C8D1CB] hover:text-white underline underline-offset-4"
                    >
                      {platform}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#A3B2A8]">
          <p>
            © {currentYear} {businessConfig.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs">
            <span>Wholesale & Retail Foodstuffs</span>
            <span aria-hidden="true">·</span>
            <span>Abeokuta, Ogun State, Nigeria</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
