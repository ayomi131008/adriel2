/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { ScrollToTop } from './components/common/ScrollToTop';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { StickyMobileCTA } from './components/common/StickyMobileCTA';
import { ProductEnquiryModal } from './components/product/ProductEnquiryModal';
import { Product } from './types';

// Route-based code-splitting for fast initial mobile page load
const HomePage = lazy(() => import('./pages/HomePage').then((m) => ({ default: m.HomePage })));
const ProductsPage = lazy(() => import('./pages/ProductsPage').then((m) => ({ default: m.ProductsPage })));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage').then((m) => ({ default: m.ProductDetailPage })));
const WholesalePage = lazy(() => import('./pages/WholesalePage').then((m) => ({ default: m.WholesalePage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then((m) => ({ default: m.AboutPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then((m) => ({ default: m.ContactPage })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })));

function RouteLoading() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center p-8">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-[#1C3829] border-t-transparent animate-spin" />
        <span className="text-xs font-medium text-[#555C56]">Loading Adriel Minimart...</span>
      </div>
    </div>
  );
}

export default function App() {
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);

  const handleOpenEnquiry = (product?: Product) => {
    if (product) {
      setActiveProduct(product);
    }
    setEnquiryModalOpen(true);
  };

  const handleCloseEnquiry = () => {
    setEnquiryModalOpen(false);
  };

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-[#F8F7F3] text-[#171B18] font-sans antialiased">
          {/* Header */}
          <Header onOpenEnquiryModal={() => handleOpenEnquiry()} />

          {/* Main Application Routes with Code Splitting */}
          <div className="flex-1">
            <Suspense fallback={<RouteLoading />}>
              <Routes>
                <Route path="/" element={<HomePage onEnquire={handleOpenEnquiry} />} />
                <Route
                  path="/products"
                  element={<ProductsPage onEnquire={handleOpenEnquiry} />}
                />
                <Route
                  path="/products/:slug"
                  element={<ProductDetailPage onEnquire={handleOpenEnquiry} />}
                />
                <Route path="/wholesale" element={<WholesalePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
          </div>

          {/* Footer */}
          <Footer />

          {/* Mobile Bottom Sticky CTA (hides on md+, respects safe-areas) */}
          <StickyMobileCTA onOpenEnquiry={() => handleOpenEnquiry()} />

          {/* Global Product Order & Enquiry Modal */}
          <ProductEnquiryModal
            isOpen={enquiryModalOpen}
            onClose={handleCloseEnquiry}
            initialProduct={activeProduct}
          />
        </div>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
