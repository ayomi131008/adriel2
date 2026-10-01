import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, MessageSquare, Phone } from 'lucide-react';
import { businessConfig } from '../../config/business';
import { buildWhatsAppLink } from '../../lib/whatsapp';

interface HeaderProps {
  onOpenEnquiryModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenEnquiryModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Products', path: '/products' },
    { label: 'Wholesale', path: '/wholesale' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#1C3829] focus:text-white focus:rounded-md focus:shadow-lg"
      >
        Skip to main content
      </a>

      <header
        className={`sticky top-0 z-40 w-full transition-all duration-200 ${
          scrolled
            ? 'bg-[#F8F7F3]/95 backdrop-blur-md shadow-xs border-b border-[#E2DDD2]'
            : 'bg-[#F8F7F3] border-b border-[#E2DDD2]/60'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 sm:h-20">
            {/* Zone 1: Single text element wordmark in display serif face */}
            <div className="flex items-center">
              <Link
                to="/"
                className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#1C3829] hover:text-[#C85A17] transition-colors whitespace-nowrap"
                aria-label="Adriel Minimart & Food Export Home"
              >
                Adriel Minimart
              </Link>
            </div>

            {/* Zone 2: Clean text navigation links */}
            <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#555C56]">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`relative py-1 transition-colors whitespace-nowrap ${
                      isActive
                        ? 'text-[#1C3829] font-semibold'
                        : 'hover:text-[#1C3829]'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C85A17] rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Zone 3: 1-2 primary actions */}
            <div className="flex items-center gap-3">
              <a
                href={buildWhatsAppLink({ type: 'general' })}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-[#1C3829] hover:bg-[#2A523C] rounded-lg transition-colors whitespace-nowrap shadow-xs"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
                <span>Chat on WhatsApp</span>
              </a>

              {/* Mobile menu button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-lg text-[#1C3829] hover:bg-[#EFECE4] focus:outline-none focus:ring-2 focus:ring-[#1C3829] md:hidden"
                aria-expanded={mobileMenuOpen}
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" aria-hidden="true" />
                ) : (
                  <Menu className="w-6 h-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer / Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 md:hidden bg-black/40 backdrop-blur-xs transition-opacity"
          onClick={() => setMobileMenuOpen(false)}
          aria-modal="true"
          role="dialog"
        >
          <div
            className="fixed inset-y-0 right-0 max-w-xs w-full bg-[#F8F7F3] shadow-xl flex flex-col justify-between p-6 transition-transform"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#E2DDD2]">
                <span className="font-serif text-lg font-bold text-[#1C3829]">
                  Adriel Minimart
                </span>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-[#555C56] hover:text-[#171B18] rounded-lg focus:outline-none"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <nav className="mt-6 flex flex-col gap-2">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`px-3 py-2.5 rounded-lg text-base font-medium transition-colors ${
                        isActive
                          ? 'bg-[#EFECE4] text-[#1C3829] font-semibold'
                          : 'text-[#555C56] hover:bg-[#EFECE4]/60 hover:text-[#171B18]'
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="pt-6 border-t border-[#E2DDD2] flex flex-col gap-3">
              <a
                href={buildWhatsAppLink({ type: 'general' })}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-white bg-[#1C3829] rounded-lg hover:bg-[#2A523C] transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-[#25D366]" />
                <span>Chat on WhatsApp</span>
              </a>

              <a
                href={`tel:${businessConfig.phoneRaw}`}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-[#1C3829] border border-[#1C3829] rounded-lg hover:bg-[#EFECE4] transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>Call {businessConfig.phoneDisplay}</span>
              </a>

              <p className="text-center text-xs text-[#555C56] mt-2">
                Abeokuta, Ogun State, Nigeria
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
