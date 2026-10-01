import { Product } from '../types';

export const products: Product[] = [
  {
    id: 'prod-ofada-rice',
    slug: 'stone-free-ofada-rice',
    name: 'Stone-Free Ofada Rice',
    category: 'rice',
    categoryName: 'Rice',
    shortDescription: 'Clean, thoroughly destoned indigenous short-grain Ofada rice with authentic aroma and natural whole-grain texture.',
    longDescription: 'Our Stone-Free Ofada Rice offers the cherished taste and aromatic character of traditional Nigerian Ofada rice without the hassle of tedious stone picking. Carefully sorted and cleaned, it cooks up tender with the distinctive earthy fragrance that pairs so well with spicy palm oil bleaching sauces. Ideal for home kitchens, busy caterers, and food service vendors who value authentic taste and preparation convenience.',
    culinaryUses: [
      'Authentic Ayamase / Designer stew',
      'Traditional Ofada stew with bleached palm oil and locust beans (iru)',
      'Sunday household special rice meals',
      'Catering for weddings, family parties, and corporate events',
    ],
    image: {
      src: '/images/products/ofada_rice.gif',
      alt: 'Clean, stone-free Nigerian Ofada rice grains in an artisanal bowl',
      fallbackText: 'Stone-Free Ofada Rice',
    },
    availability: {
      wholesale: true,
      retail: true,
    },
    price: null, // Strictly null; contact for current market rates
    priceUnit: null,
    priceLabel: 'Contact for price',
    featured: true,
    inStock: true,
    seoKeywords: [
      'Stone-free Ofada rice',
      'Ofada rice in Abeokuta',
      'Wholesale Ofada rice Ogun State',
      'Clean Nigerian indigenous rice',
      'Ayamase rice supplier',
    ],
  },
  {
    id: 'prod-fresh-snail',
    slug: 'fresh-snail',
    name: 'Fresh Snail',
    category: 'snails',
    categoryName: 'Snails',
    shortDescription: 'Healthy, whole fresh giant African land snails selected for tenderness and hearty meat quality.',
    longDescription: 'Fresh giant African land snails, carefully selected to ensure wholesome quality. Known for their firm texture and mild, clean taste when seasoned, they absorb traditional herbs, peppers, and savory broths nicely. Suitable for direct home preparation, restaurant menus, and specialty catering orders.',
    culinaryUses: [
      'Spicy peppered snail platters (small chops / appetizer)',
      'Rich native Nigerian vegetable soups (Efo Riro, Afang, Edikang Ikong)',
      'Slow-simmered Egusi soup with assorted meats',
      'Pepper soup with scent leaf and local spices',
    ],
    image: {
      src: '/images/products/fresh_snail.jpg',
      alt: 'Fresh giant African land snails ready for culinary preparation',
      fallbackText: 'Fresh Snail',
    },
    availability: {
      wholesale: true,
      retail: true,
    },
    price: null,
    priceUnit: null,
    priceLabel: 'Contact for price',
    featured: true,
    inStock: true,
    seoKeywords: [
      'Fresh snail in Abeokuta',
      'Giant African land snails Ogun State',
      'Wholesale fresh snails Nigeria',
      'Snails for peppered snail and catering',
    ],
  },
  {
    id: 'prod-smoked-snail',
    slug: 'smoked-snail',
    name: 'Smoked Snail',
    category: 'snails',
    categoryName: 'Snails',
    shortDescription: 'Traditionally wood-smoked snails delivering deep smoky richness and firm, chew-tender texture.',
    longDescription: 'Our Smoked Snail is prepared using traditional wood-smoking techniques that lock in natural flavor and impart a distinct aroma to every batch. Thoroughly smoked and dried to withstand travel and storage, they rehydrate with a satisfying, tender chew that elevates any pot of soup or native stew.',
    culinaryUses: [
      'Native jollof rice and palm-oil concoction rice',
      'Traditional Efo Riro and Egusi soup',
      'Fisherman and native seafood-style soups',
      'Spiced snail sauces and party catering dishes',
    ],
    image: {
      src: '/images/products/smoked_snail.jpg',
      alt: 'Traditionally wood-smoked Nigerian snails on a display board',
      fallbackText: 'Smoked Snail',
    },
    availability: {
      wholesale: true,
      retail: true,
    },
    price: null,
    priceUnit: null,
    priceLabel: 'Contact for price',
    featured: true,
    inStock: true,
    seoKeywords: [
      'Smoked snail in Abeokuta',
      'Dried smoked snails Ogun State',
      'Wholesale smoked snails Nigeria',
      'Food export smoked snail',
    ],
  },
  {
    id: 'prod-smoked-panla',
    slug: 'smoked-panla',
    name: 'Smoked Panla',
    category: 'smoked-seafood',
    categoryName: 'Smoked Seafood',
    shortDescription: 'Golden wood-smoked panla (hake fish) with flaky flesh and unmistakable aromatic savor.',
    longDescription: 'Smoked Panla (hake fish) is an essential cornerstone of Nigerian home cooking and buka-style delicacies. Evenly wood-smoked to golden perfection, its firm yet flaky white meat absorbs stew flavors while releasing a rich, savory aroma into soups. Cleanly handled and dried for excellent shelf-stability and versatile kitchen use.',
    culinaryUses: [
      'Classic Buka stew and pepper sauce',
      'Efo Riro (spinach stew) and Ila Alasepo (okra soup)',
      'Banga (palm nut) soup and Ofe Nsala (white soup)',
      'Ogbono and bitterleaf soups',
    ],
    image: {
      src: '/images/products/smoked_panla.gif',
      alt: 'Aromatic wood-smoked panla fish pieces stacked neatly',
      fallbackText: 'Smoked Panla',
    },
    availability: {
      wholesale: true,
      retail: true,
    },
    price: null,
    priceUnit: null,
    priceLabel: 'Contact for price',
    featured: false,
    inStock: true,
    seoKeywords: [
      'Smoked panla fish Abeokuta',
      'Wholesale panla Ogun State',
      'Dried smoked hake fish Nigeria',
      'Efo riro smoked fish supplier',
    ],
  },
  {
    id: 'prod-smoked-catfish',
    slug: 'smoked-catfish',
    name: 'Smoked Catfish',
    category: 'smoked-seafood',
    categoryName: 'Smoked Seafood',
    shortDescription: 'Well-dried, hot-smoked catfish with glistening mahogany skin and tender, oil-rich savory flakes.',
    longDescription: 'Whole hot-smoked catfish (Eja Aro / Eja Kika) processed with care over natural wood heat. The smoking process draws out excess moisture while preserving the natural oils and rich taste of the fish. Free from bitter soot, it softens gently when simmered in soups, contributing that authentic earthy background note that makes Nigerian dishes memorable.',
    culinaryUses: [
      'Catfish pepper soup with utazi or scent leaf',
      'Rich vegetable soups (Efo Elegusi, Edikang Ikong, Afang)',
      'Native fisherman soup and Ofe Owerri',
      'Fried pepper sauce for yam and plantain',
    ],
    image: {
      src: '/images/products/smoked_catfish.gif',
      alt: 'Cleanly smoked whole Nigerian catfish on a wooden board',
      fallbackText: 'Smoked Catfish',
    },
    availability: {
      wholesale: true,
      retail: true,
    },
    price: null,
    priceUnit: null,
    priceLabel: 'Contact for price',
    featured: true,
    inStock: true,
    seoKeywords: [
      'Smoked catfish in Abeokuta',
      'Dried catfish wholesale Ogun State',
      'Eja aro supplier Nigeria',
      'Smoked fish for food export',
    ],
  },
  {
    id: 'prod-smoked-goat-meat',
    slug: 'smoked-goat-meat',
    name: 'Smoked Goat Meat',
    category: 'smoked-meat',
    categoryName: 'Smoked Meat',
    shortDescription: 'Slow-smoked cuts of seasoned goat meat packed with robust flavor and gamey richness.',
    longDescription: 'Selected cuts of goat meat, slow-smoked over aromatic hardwood until deeply infused with savory smokiness. The smoking process renders the meat tender yet resilient enough to hold its shape through long cooking. It imparts an unmistakable depth of flavor that complements pepper soups, native sauces, and celebratory dishes.',
    culinaryUses: [
      'Authentic goat meat pepper soup',
      'Rich party jollof rice accompaniment',
      'Assorted meat vegetable stew (Efo Riro)',
      'Obe ata dindin (spicy fried pepper sauce)',
    ],
    image: {
      src: '/images/products/smoked_goat_meat.jpg',
      alt: 'Wood-smoked goat meat pieces cut and prepared for cooking',
      fallbackText: 'Smoked Goat Meat',
    },
    availability: {
      wholesale: true,
      retail: true,
    },
    price: null,
    priceUnit: null,
    priceLabel: 'Contact for price',
    featured: false,
    inStock: true,
    seoKeywords: [
      'Smoked goat meat Abeokuta',
      'Dried smoked chevon Ogun State',
      'Goat meat for pepper soup wholesale',
      'Nigerian smoked meat supplier',
    ],
  },
  {
    id: 'prod-smoked-cow-meat',
    slug: 'smoked-cow-meat',
    name: 'Smoked Cow Meat',
    category: 'smoked-meat',
    categoryName: 'Smoked Meat',
    shortDescription: 'Deeply wood-smoked, cured beef pieces with a concentrated savory taste and hearty bite.',
    longDescription: 'Traditional Nigerian wood-smoked cow meat (beef chunks), smoked and dried to preserve its natural hearty savor. As it simmers in stews and soups, it releases rich smoky juices that infuse the entire pot while retaining a satisfying, tender chew. Highly favored by caterers and households for its long-lasting quality and concentrated taste.',
    culinaryUses: [
      'Egusi and Ogbono soup with assorted meats',
      'Rich tomato and pepper stew for white rice and yam',
      'Okra soup (Ila Alasepo) and Ogbono stew',
      'Ayamase and designer stew accompaniment',
    ],
    image: {
      src: '/images/products/smoked_cow_meat.jpg',
      alt: 'Hearty pieces of wood-smoked Nigerian cow meat',
      fallbackText: 'Smoked Cow Meat',
    },
    availability: {
      wholesale: true,
      retail: true,
    },
    price: null,
    priceUnit: null,
    priceLabel: 'Contact for price',
    featured: false,
    inStock: true,
    seoKeywords: [
      'Smoked cow meat Abeokuta',
      'Dried beef wholesale Ogun State',
      'Nigerian smoked meat for stews',
      'Wholesale foodstuff Abeokuta',
    ],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  if (category === 'all') return products;
  return products.filter((p) => p.category === category);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}
