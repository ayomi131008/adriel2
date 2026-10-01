import { Category } from '../types';

export const categories: Category[] = [
  {
    id: 'cat-rice',
    slug: 'rice',
    name: 'Rice',
    tagline: 'Clean, stone-free Nigerian grains',
    description: 'Thoroughly sorted, clean stone-free indigenous rice ready for traditional delicacies.',
    image: '/images/products/ofada_rice.jpg',
  },
  {
    id: 'cat-snails',
    slug: 'snails',
    name: 'Snails',
    tagline: 'Fresh and traditional wood-smoked snails',
    description: 'Carefully prepared fresh and wood-smoked snails for rich Nigerian soups and peppered dishes.',
    image: '/images/products/smoked_snail.jpg',
  },
  {
    id: 'cat-smoked-seafood',
    slug: 'smoked-seafood',
    name: 'Smoked Seafood',
    tagline: 'Aromatic smoked catfish & panla',
    description: 'Traditionally hot-smoked fish that impart deep flavor to native soups and everyday cooking.',
    image: '/images/products/smoked_catfish.jpg',
  },
  {
    id: 'cat-smoked-meat',
    slug: 'smoked-meat',
    name: 'Smoked Meat',
    tagline: 'Savory wood-smoked goat & cow meat',
    description: 'Richly dried, wood-smoked meats prepared to enrich pepper soup, stews, and vegetable sauces.',
    image: '/images/products/smoked_goat_meat.jpg',
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
