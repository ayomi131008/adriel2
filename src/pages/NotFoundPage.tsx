import React from 'react';
import { Link } from 'react-router-dom';
import { Seo } from '../components/common/Seo';
import { Home, ArrowLeft, MessageSquare } from 'lucide-react';
import { buildWhatsAppLink } from '../lib/whatsapp';

export const NotFoundPage: React.FC = () => {
  return (
    <>
      <Seo
        title="Page Not Found"
        description="The page you are looking for does not exist. Explore our food products or return to the homepage."
        canonicalPath="/404"
      />

      <main id="main-content" className="min-h-[70vh] flex items-center justify-center py-16 px-4 bg-[#F8F7F3]">
        <div className="max-w-md w-full bg-white rounded-2xl border border-[#E2DDD2] p-8 sm:p-10 text-center space-y-5 shadow-xs">
          <span className="font-serif text-6xl font-bold text-[#C85A17]">
            404
          </span>
          <h1 className="font-serif text-2xl font-bold text-[#1C3829]">
            Page Not Found
          </h1>
          <p className="text-sm text-[#555C56] leading-relaxed">
            The link you followed may have changed, or the page might have moved. Explore our catalogue of quality Nigerian foodstuffs.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-[#1C3829] hover:bg-[#2A523C] rounded-lg transition-colors shadow-xs"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </Link>

            <Link
              to="/products"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold text-[#1C3829] bg-[#EFECE4] hover:bg-[#E2DDD2] rounded-lg transition-colors border border-[#1C3829]/15"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>View Products</span>
            </Link>
          </div>

          <div className="pt-4 border-t border-[#E2DDD2] text-xs text-[#555C56]">
            <span>Need assistance? </span>
            <a
              href={buildWhatsAppLink({ type: 'general' })}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#1C3829] hover:text-[#C85A17] inline-flex items-center gap-1"
            >
              <MessageSquare className="w-3 h-3 text-[#25D366]" />
              <span>Message Adriel on WhatsApp</span>
            </a>
          </div>
        </div>
      </main>
    </>
  );
};
