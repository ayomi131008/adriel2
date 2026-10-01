# Adriel Minimart & Food Export — Web Application

A modern, fast, and authentic digital storefront and wholesale catalogue for **Adriel Minimart & Food Export**, based in Abeokuta, Ogun State, Nigeria.

Tagline: *"Quality food products. Affordable prices. Wholesale & retail."*

---

## 1. Quick Start (Running Locally)

### Prerequisites
- Node.js (version 18+ or 20+ recommended)
- npm or yarn

### Installation
```bash
# 1. Install dependencies
npm install

# 2. Start local development server (runs on port 3000)
npm run dev

# 3. Build for production
npm run build

# 4. Preview production build locally
npm run preview
```

---

## 2. Architecture & Design Decisions

- **Framework**: React 19 + TypeScript + Vite for ultra-fast load times, small bundle footprint, and full code-splitting.
- **Styling**: Tailwind CSS v4 using disciplined design tokens:
  - Deep warm primary (`#1C3829` — rich forest green evoking agricultural freshness and nature)
  - Warm accent (`#C85A17` — rich terracotta/amber for high-contrast, WCAG AA compliant CTAs)
  - Warm linen canvas (`#F8F7F3` and `#EFECE4`)
  - Dark charcoal body (`#171B18`)
- **Typography**:
  - Display / Headlines: `Playfair Display` (expressive, editorial, warm serif loaded with `font-display: swap`)
  - Body & Controls: `Plus Jakarta Sans` (clean, modern, highly legible)
- **Zero-Pill Discipline**: Metadata is rendered as clean unboxed text with typographic separators (`·`), avoiding cluttered AI badge templates.
- **Conversion Flow**: In Version 1, every order and enquiry form formats a clear, structured message and hands off to WhatsApp (`https://wa.me/2348103355028?text=...`). This provides immediate real-world sales conversion for Nigerian buyers and international food exporters.

---

## 3. Centralized Business Configuration

All business information, contact channels, and WhatsApp templates are governed by **`src/config/business.ts`**.

Changing the WhatsApp or phone number in this single file immediately updates every link, button, modal, form, header, footer, and mobile bar across the entire website:

```typescript
// File: src/config/business.ts
export const businessConfig = {
  name: "Adriel Minimart & Food Export",
  phoneDisplay: "+234 810 335 5028",
  phoneRaw: "+2348103355028",
  whatsappNumber: "2348103355028", // International digits-only format
  location: {
    city: "Abeokuta",
    state: "Ogun State",
    country: "Nigeria",
    formatted: "Abeokuta, Ogun State, Nigeria",
    streetAddress: null, // Set exact street address when available
    mapEmbedUrl: null,   // Set Google Maps embed iframe URL when ready
  },
  email: null, // Set business email when ready
  businessHours: {
    display: null, // e.g. "Monday – Saturday: 8:00 AM – 6:00 PM"
    statusNote: "Message us on WhatsApp to confirm opening and order processing hours",
  },
  socialLinks: {
    facebook: null,
    instagram: null,
    twitter: null,
    tiktok: null,
  },
  siteUrl: "https://adrielminimart.com",
};
```

---

## 4. Product Catalogue & Image System

### Managing Products
All products are defined in **`src/data/products.ts`**. Every product has:
- `id` & `slug` (used for clean URLs like `/products/stone-free-ofada-rice`)
- `name` & `category`
- `shortDescription` & `longDescription`
- `culinaryUses` (traditional recipes like Ayamase, Efo Riro, Pepper soup, Egusi)
- `image`: `{ src: '/images/products/filename.jpg', alt: '...', fallbackText: '...' }`
- `availability`: `{ wholesale: boolean, retail: boolean }`
- `price`: `number | null` (keep `null` for "Contact for price", or provide numeric price in NGN)
- `priceLabel`: fallback label when price is null (default: `"Contact for price"`)

### Replacing Product Photos with Real Photos
The site includes high-fidelity studio product photography. The owner can swap in real photos at any time:
1. Save the new photo in `/public/images/products/` (e.g. `ofada_rice.jpg`).
2. **Recommended image specifications**:
   - Aspect ratio: **4:3** (e.g. 1200 × 900 px or 800 × 600 px)
   - Format: JPG or WebP
   - Lighting: Clean, well-lit, showing the actual product on a clean surface
3. If using a new filename, update the `image.src` path in `src/data/products.ts`.
4. Resilient Fallbacks: If any image fails to load or the file is missing, the component gracefully renders a branded culinary fallback card (Zero-Broken-Image Policy).

---

## 5. Adding Testimonials

To adhere to the **Strict Truthfulness Rule**, the testimonials array in **`src/data/testimonials.ts`** is empty by default (`[]`). The UI completely hides the testimonials section until genuine customer reviews are provided.

To activate the testimonials section:
```typescript
// File: src/data/testimonials.ts
export const testimonials = [
  {
    id: 't-1',
    author: 'Chef Adebayo',
    role: 'Lead Caterer',
    organization: 'Abeokuta Event Services',
    quote: 'The stone-free Ofada rice saved our kitchen team hours of sorting before our 400-guest event. Clean and authentic flavor.',
  },
];
```

---

## 6. Adding a Google Maps Embed or Exact Address

1. Open `src/config/business.ts`.
2. Set `streetAddress: "Your Exact Street Address, Abeokuta, Ogun State"`.
3. To embed a live map, obtain the embed link from Google Maps (`Share -> Embed a map -> copy the src URL`) and set:
   ```typescript
   mapEmbedUrl: "https://www.google.com/maps/embed?pb=..."
   ```
4. If `mapEmbedUrl` is null, the site displays an elegant, branded geographic location card explaining that pickup points and dispatch are coordinated via WhatsApp.

---

## 7. Future-Proofing & Extensions

### Connecting a Server-side Database or Email Service
All form submissions pass through **`src/services/enquiries.ts`**:
- `submitProductEnquiry`
- `submitWholesaleEnquiry`
- `submitContactForm`

To store submissions in Firebase Firestore, Supabase, Cloud SQL, or send notification emails via Resend/SendGrid/Formspree, replace the stubbed handlers inside `src/services/enquiries.ts` with API requests (e.g., `fetch('/api/enquiries', { method: 'POST', body: JSON.stringify(payload) })`).

### Adding Online Payments (Paystack / Flutterwave)
When the business is ready to accept online debit card / bank transfer checkout:
1. Set numeric prices in `src/data/products.ts`.
2. Install the Paystack or Flutterwave React SDK (`react-paystack` or `flutterwave-react-v3`).
3. Replace the WhatsApp submission in `ProductDetailPage.tsx` or introduce a Cart Drawer with your Paystack Public Key.

---

## 8. Deployment Options

### A. AI Studio / Google Cloud Run (One-Click)
This project is fully configured for deployment on Google Cloud Run via AI Studio. Run `npm run build` to verify the build bundle.

### B. Vercel / Netlify
1. Connect your GitHub repository.
2. Build command: `npm run build`
3. Output directory: `dist`
4. For client-side routing, add a redirect rule (`/* -> /index.html 200`).

### C. Firebase Hosting
1. Run `firebase init hosting`
2. Specify `dist` as public directory
3. Configure as single-page app (rewrite all URLs to `/index.html`)
4. Run `npm run build && firebase deploy`

---

## 9. Placeholders to Fill When Available

The business owner should review and update these placeholders in `src/config/business.ts` and `src/data/products.ts`:
1. **Email**: Provide business email address (currently `null`).
2. **Business Opening Hours**: Set specific working days & hours (currently `null`, displays WhatsApp confirmation note).
3. **Exact Street Address**: Add street name/building once available (currently city & state only).
4. **Google Maps Embed URL**: Add Google Maps iframe URL (currently `null`).
5. **Social Media Links**: Add links to active Instagram, Facebook, or TikTok profiles.
6. **Product Prices**: Add exact naira prices if the business wishes to display fixed rates rather than "Contact for price".
7. **Customer Testimonials**: Add real reviews to `src/data/testimonials.ts`.
