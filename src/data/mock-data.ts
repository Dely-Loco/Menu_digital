// @/data/mock-data.ts
import type { Product, Category, BlogPost, ProductImage, ProductReview } from '@/types'; // Asegúrate de importar ProductImage y ProductReview

// Enhanced Categories with more visual and marketing data
export const categories: Category[] = [
  {
    id: '1',
    name: 'Gadgets',
    slug: 'gadgets',
    image: 'https://placehold.co/400x300.png',
    description: 'Cutting-edge gadgets to simplify your life.',
    dataAiHint: 'gadgets technology',
    icon: '📱',
    color: '#FF6B6B',
    productsCount: 15,
    isPopular: true,
    createdAt: new Date('2023-01-10T10:00:00Z').toISOString(), // Añadido createdAt
  },
  {
    id: '2',
    name: 'Smart Home',
    slug: 'smart-home',
    image: 'https://placehold.co/400x300.png',
    description: 'Automate and control your home with smart devices.',
    dataAiHint: 'smart home',
    icon: '🏠',
    color: '#4ECDC4',
    productsCount: 28,
    isPopular: true,
    createdAt: new Date('2023-01-11T10:00:00Z').toISOString(), // Añadido createdAt
  },
  {
    id: '3',
    name: 'Accessories',
    slug: 'accessories',
    image: 'https://placehold.co/400x300.png',
    description: 'Essential accessories for your tech gear.',
    dataAiHint: 'tech accessories',
    icon: '🔌',
    color: '#45B7D1',
    productsCount: 42,
    isPopular: false,
    createdAt: new Date('2023-01-12T10:00:00Z').toISOString(), // Añadido createdAt
  },
  {
    id: '4',
    name: 'Wearables',
    slug: 'wearables',
    image: 'https://placehold.co/400x300.png',
    description: 'Stay connected and track your fitness with our wearables.',
    dataAiHint: 'smartwatch fitness',
    icon: '⌚',
    color: '#F7DC6F',
    productsCount: 18,
    isPopular: true,
    createdAt: new Date('2023-01-13T10:00:00Z').toISOString(), // Añadido createdAt
  },
  {
    id: '5',
    name: 'Office Tech',
    slug: 'office-tech',
    image: 'https://placehold.co/400x300.png',
    description: 'Boost productivity with our range of office technology.',
    dataAiHint: 'office technology',
    icon: '💻',
    color: '#BB8FCE',
    productsCount: 33,
    isPopular: false,
    createdAt: new Date('2023-01-14T10:00:00Z').toISOString(), // Añadido createdAt
  },
  {
    id: '6',
    name: 'Gaming',
    slug: 'gaming',
    image: 'https://placehold.co/400x300.png',
    description: 'Level up your gaming experience with pro gear.',
    dataAiHint: 'gaming gear',
    icon: '🎮',
    color: '#58D68D',
    productsCount: 24,
    isPopular: true,
    createdAt: new Date('2023-01-15T10:00:00Z').toISOString(), // Añadido createdAt
  },
  {
    id: '7',
    name: 'Audio',
    slug: 'audio',
    image: 'https://placehold.co/400x300.png',
    description: 'Premium audio equipment for audiophiles.',
    dataAiHint: 'premium audio',
    icon: '🎧',
    color: '#F1948A',
    productsCount: 19,
    isPopular: false,
    createdAt: new Date('2023-01-16T10:00:00Z').toISOString(), // Añadido createdAt
  }
];

// Helper para encontrar una categoría por slug (usado en productos mock)
const findCategoryBySlug = (slug: string): Category | undefined => categories.find(c => c.slug === slug);

// Enhanced Products with rich data for advanced features
export const products: Product[] = [
  {
    id: '1',
    name: 'Quantum Smart Speaker X1',
    slug: 'quantum-smart-speaker-x1',
    description: 'Experience immersive sound and AI assistance with the Quantum X1. Features voice control, multi-room audio, and seamless integration with your smart home ecosystem.',
    shortDescription: 'AI-powered smart speaker with premium audio quality',
    technicalSpec: 'Connectivity: Wi-Fi, Bluetooth 5.0. Drivers: 3" Woofer, 1" Tweeter. AI: Integrated HouzzeAI. Power: 30W.',
    price: 129.99,
    originalPrice: 159.99,
    discountPercentage: 19,
    categorySlug: 'smart-home', // CAMBIO: Usamos categorySlug
    category: findCategoryBySlug('smart-home'), // CAMBIO: Objeto Category completo
    brand: 'Quantum Audio',
    images: [ // CAMBIO: Ahora son ProductImage[]
      { id: 'img-1-1', url: 'https://placehold.co/600x600.png', alt: 'Quantum Smart Speaker X1 Image 1', order: 0, isPrimary: true },
      { id: 'img-1-2', url: 'https://placehold.co/600x600.png', alt: 'Quantum Smart Speaker X1 Image 2', order: 1, isPrimary: false },
      { id: 'img-1-3', url: 'https://placehold.co/600x600.png', alt: 'Quantum Smart Speaker X1 Image 3', order: 2, isPrimary: false },
      { id: 'img-1-4', url: 'https://placehold.co/600x600.png', alt: 'Quantum Smart Speaker X1 Image 4', order: 3, isPrimary: false },
    ],
    rating: 4.8,
    reviewsCount: 256,
    stock: 50,
    isFeatured: true,
    isNew: false,
    isBestseller: true,
    tags: ['smart speaker', 'ai assistant', 'audio'],
    dataAiHint: 'smart speaker',
    features: ['Voice Control', 'Multi-room Audio', 'Smart Home Integration', 'Premium Sound'],
    colors: ['Charcoal Black', 'Arctic White', 'Forest Green'],
    dimensions: '6.5" H x 4.1" D',
    weight: '2.65 lbs',
    warranty: '2 years',
    shippingInfo: 'Free shipping, arrives in 2-3 days',
    inWishlist: false,
    compareCount: 12,
    reviews: [
      {
        id: 'review-1-1', // IDs de review deben ser únicos
        user: 'Alex Johnson',
        rating: 5,
        comment: 'Amazing sound quality and the AI is incredibly responsive!',
        date: '2024-07-20T10:00:00Z', // Formato ISO para fechas
        verified: true
      },
      {
        id: 'review-1-2',
        user: 'Sarah Chen',
        rating: 4,
        comment: 'Great product, easy setup, love the multi-room feature.',
        date: '2024-07-18T15:30:00Z',
        verified: true
      }
    ],
    createdAt: new Date('2023-02-01T12:00:00Z').toISOString(), // Añadido createdAt
  },
  {
    id: '2',
    name: 'Nova Smartwatch Pro',
    slug: 'nova-smartwatch-pro',
    description: 'Track your fitness, stay connected, and manage your day with the Nova Smartwatch Pro. AMOLED display, 14-day battery life, and advanced health monitoring.',
    shortDescription: 'Premium smartwatch with 14-day battery and health monitoring',
    technicalSpec: 'Display: 1.4" AMOLED. Battery: Up to 14 days. Sensors: HR, SpO2, GPS. Water Resistance: 5ATM.',
    price: 199.50,
    categorySlug: 'wearables', // CAMBIO
    category: findCategoryBySlug('wearables'), // CAMBIO
    brand: 'Nova Gear',
    images: [ // CAMBIO
      { id: 'img-2-1', url: 'https://placehold.co/600x600.png', alt: 'Nova Smartwatch Pro Image 1', order: 0, isPrimary: true },
      { id: 'img-2-2', url: 'https://placehold.co/600x600.png', alt: 'Nova Smartwatch Pro Image 2', order: 1, isPrimary: false },
      { id: 'img-2-3', url: 'https://placehold.co/600x600.png', alt: 'Nova Smartwatch Pro Image 3', order: 2, isPrimary: false },
    ],
    rating: 4.6,
    reviewsCount: 180,
    stock: 75,
    isFeatured: true,
    isNew: true,
    isBestseller: false,
    tags: ['smartwatch', 'fitness tracker', 'wearable tech'],
    dataAiHint: 'smartwatch modern',
    features: ['AMOLED Display', '14-Day Battery', 'Health Monitoring', 'GPS Tracking', 'Water Resistant'],
    colors: ['Midnight Black', 'Rose Gold', 'Silver Steel'],
    // sizes: ['42mm', '46mm'], // Tu tipo Product no tiene 'sizes', puedes añadirlo si quieres
    dimensions: '46 x 39 x 10.9 mm',
    weight: '52g (without strap)',
    warranty: '1 year',
    shippingInfo: 'Free shipping, arrives in 1-2 days',
    inWishlist: false,
    compareCount: 8,
    reviews: [
      {
        id: 'review-2-1',
        user: 'Mike Rodriguez',
        rating: 5,
        comment: 'Battery life is incredible, exactly as advertised!',
        date: '2024-07-22T11:00:00Z',
        verified: true
      }
    ],
    createdAt: new Date('2023-03-10T12:00:00Z').toISOString(), // Añadido createdAt
  },
  // ... (Aplica cambios similares para los demás productos: categorySlug, category, images, createdAt)
  // Por brevedad, no repetiré todos los productos, pero la lógica es la misma.
  // Aquí un ejemplo más conciso del producto 3:
  {
    id: '3',
    name: 'ErgoTech Keyboard K5',
    slug: 'ergotech-keyboard-k5',
    description: 'Maximize your comfort and productivity with the ErgoTech K5 wireless mechanical keyboard. Customizable RGB, programmable keys, and ergonomic design.',
    shortDescription: 'Wireless mechanical keyboard with RGB and ergonomic design',
    technicalSpec: 'Type: Mechanical (Brown Switches). Connectivity: Bluetooth, 2.4GHz Wireless, USB-C. Backlight: RGB per key.',
    price: 89.00,
    categorySlug: 'office-tech',
    category: findCategoryBySlug('office-tech'),
    brand: 'ErgoTech',
    images: [
      { id: 'img-3-1', url: 'https://placehold.co/600x600.png', alt: 'ErgoTech Keyboard K5 Image 1', order: 0, isPrimary: true },
      { id: 'img-3-2', url: 'https://placehold.co/600x600.png', alt: 'ErgoTech Keyboard K5 Image 2', order: 1, isPrimary: false },
    ],
    rating: 4.9,
    reviewsCount: 320,
    stock: 120,
    isFeatured: false,
    isNew: false,
    isBestseller: true,
    tags: ['keyboard', 'mechanical keyboard', 'office setup'],
    dataAiHint: 'ergonomic keyboard',
    features: ['Mechanical Switches', 'RGB Backlighting', 'Wireless Connectivity', 'Programmable Keys'],
    colors: ['Space Gray', 'Pure White'],
    // switchTypes: ['Red (Linear)', 'Brown (Tactile)', 'Blue (Clicky)'], // No en Product type
    dimensions: '17.3" x 5.1" x 1.6"',
    weight: '2.2 lbs',
    warranty: '2 years',
    shippingInfo: 'Free shipping, arrives in 2-3 days',
    inWishlist: false,
    compareCount: 15,
    reviews: [],
    createdAt: new Date('2023-04-05T12:00:00Z').toISOString(),
  },
  // Debes continuar este patrón para el resto de los productos en tu array 'products'.
  // Por ejemplo, para el producto con id: '4':
  {
    id: '4',
    name: 'Aura LED Smart Bulb Pack (4)',
    slug: 'aura-led-smart-bulb-pack',
    description: 'Transform your home lighting with Aura Smart Bulbs. Millions of colors, tunable whites, and voice control compatibility.',
    shortDescription: '4-pack of RGB smart bulbs with voice control',
    technicalSpec: 'Type: LED E26. Colors: RGB + Tunable White (2700K-6500K). Lumens: 800lm per bulb. Connectivity: Wi-Fi.',
    price: 49.99,
    originalPrice: 69.99,
    discountPercentage: 29,
    categorySlug: 'smart-home',
    category: findCategoryBySlug('smart-home'),
    brand: 'Aura Home',
    images: [
        { id: 'img-4-1', url: 'https://placehold.co/600x600.png', alt: 'Aura LED Image 1', order: 0, isPrimary: true },
        { id: 'img-4-2', url: 'https://placehold.co/600x600.png', alt: 'Aura LED Image 2', order: 1, isPrimary: false },
        { id: 'img-4-3', url: 'https://placehold.co/600x600.png', alt: 'Aura LED Image 3', order: 2, isPrimary: false }
    ],
    rating: 4.5,
    reviewsCount: 150,
    stock: 200,
    isFeatured: true,
    isNew: false,
    isBestseller: false,
    tags: ['smart bulb', 'led lighting', 'home automation'],
    dataAiHint: 'smart bulb',
    features: ['16M Colors', 'Voice Control', 'Schedule & Timer', 'Energy Efficient'],
    // compatibility: ['Alexa', 'Google Assistant', 'Apple HomeKit'], // No en Product Type
    // lumens: '800lm per bulb', // No en Product Type, puede ir en description o technicalSpec
    // lifespan: '25,000 hours', // No en Product Type
    colors: ['Negro Sigiloso', 'Blanco Ártico'],
    warranty: '2 years',
    shippingInfo: 'Free shipping, arrives in 2-3 days',
    inWishlist: false,
    compareCount: 6,
    reviews: [],
    createdAt: new Date('2023-05-01T10:00:00Z').toISOString(),
  },
  // ... y así sucesivamente para los productos 5, 6, 7, 8
];

// Enhanced Blog Posts with more metadata (parecen estar bien, pero asegúrate de que las fechas sean ISO)
export const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'future-of-smart-homes',
    title: 'The Future of Smart Homes: Trends to Watch in 2024',
    excerpt: 'Discover the latest innovations and trends shaping the future of smart home technology, from AI integration to enhanced security.',
    content: 'Full blog post content about smart home trends... (Placeholder)',
    author: 'Jane Doe',
    authorTitle: 'Tech Analyst',
    authorImage: 'https://placehold.co/100x100.png',
    date: '2024-07-15T10:00:00Z', // Ya es ISO
    readTime: '8 min read',
    imageUrl: 'https://placehold.co/800x400.png',
    tags: ['smart home', 'technology', 'future tech'],
    dataAiHint: 'smart home future',
    category: 'Technology Trends', // Este campo 'category' es un string, si tu BlogPost type espera un objeto Category, necesitaría ajuste.
    featured: true,
    views: 2450,
    likes: 189,
  },
  // ... (revisar los demás blog posts, especialmente el campo 'category' si es necesario)
  {
    id: '2',
    slug: 'top-5-gadgets-for-productivity',
    title: 'Top 5 Gadgets to Boost Your Productivity This Year',
    excerpt: 'Enhance your workflow and achieve more with these must-have gadgets designed for maximum productivity at home or in the office.',
    content: 'Full blog post content about productivity gadgets... (Placeholder)',
    author: 'John Smith',
    authorTitle: 'Productivity Guru',
    authorImage: 'https://placehold.co/100x100.png',
    date: '2024-07-10T14:30:00Z',
    readTime: '6 min read',
    imageUrl: 'https://placehold.co/800x400.png',
    tags: ['gadgets', 'productivity', 'office tech'],
    dataAiHint: 'office gadgets',
    category: 'Productivity',
    featured: false,
    views: 1876,
    likes: 124,
  },
  {
    id: '3',
    slug: 'wearable-tech-health-revolution',
    title: 'Wearable Technology: Revolutionizing Personal Health',
    excerpt: 'Explore how wearable devices are changing the game in personal health monitoring, fitness tracking, and preventative care.',
    content: 'Full blog post content about wearable tech and health... (Placeholder)',
    author: 'Dr. Alice Brown',
    authorTitle: 'Health Tech Expert',
    authorImage: 'https://placehold.co/100x100.png',
    date: '2024-07-05T09:15:00Z',
    readTime: '10 min read',
    imageUrl: 'https://placehold.co/800x400.png',
    tags: ['wearables', 'health tech', 'fitness'],
    dataAiHint: 'wearable health',
    category: 'Health & Fitness',
    featured: true,
    views: 3201,
    likes: 267,
  },
];

// Enhanced helper functions
export const getFeaturedProducts = (): Product[] => products.filter(p => p.isFeatured);
export const getNewProducts = (): Product[] => products.filter(p => p.isNew);
export const getBestsellerProducts = (): Product[] => products.filter(p => p.isBestseller);
export const getProductBySlug = (slug: string): Product | undefined => products.find(p => p.slug === slug);
// CAMBIO: Filtrar por categorySlug en lugar de product.category (que ahora es un objeto)
export const getProductsByCategory = (categorySlug: string): Product[] => products.filter(p => p.categorySlug === categorySlug);
export const getCategoryBySlug = (slug: string): Category | undefined => categories.find(c => c.slug === slug);
export const getBlogPostBySlug = (slug: string): BlogPost | undefined => blogPosts.find(p => p.slug === slug);
export const getProductsByBrand = (brand: string): Product[] => products.filter(p => p.brand === brand); // Asume brand sigue siendo string
export const getProductsByPriceRange = (min: number, max: number): Product[] => products.filter(p => p.price >= min && p.price <= max);
export const getProductsOnSale = (): Product[] => products.filter(p => p.originalPrice && p.originalPrice > p.price);
export const getPopularCategories = (): Category[] => categories.filter(c => c.isPopular);
export const getFeaturedBlogPosts = (): BlogPost[] => blogPosts.filter(p => p.featured);

// Search functionality
export const searchProducts = (query: string): Product[] => {
  const searchTerm = query.toLowerCase();
  return products.filter(p =>
    p.name.toLowerCase().includes(searchTerm) ||
    p.description.toLowerCase().includes(searchTerm) ||
    (p.tags && p.tags.some((tag: string) => tag.toLowerCase().includes(searchTerm))) ||
    (p.brand && p.brand.toLowerCase().includes(searchTerm)) // Añadido chequeo para p.brand
  );
};

// Filter products by multiple criteria
export const filterProducts = (filters: {
  category?: string; // Este filtro debe ser por categorySlug
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  inStock?: boolean;
}): Product[] => {
  return products.filter(product => {
    // CAMBIO: Filtrar por categorySlug
    if (filters.category && product.categorySlug !== filters.category) return false;
    if (filters.brand && product.brand !== filters.brand) return false;
    if (filters.minPrice && product.price < filters.minPrice) return false;
    if (filters.maxPrice && product.price > filters.maxPrice) return false;
    if (filters.minRating && product.rating < filters.minRating) return false;
    if (filters.inStock && product.stock <= 0) return false;
    return true;
  });
};

// Get unique brands
export const getAllBrands = (): string[] => {
  // Filtrar productos que podrían no tener marca para evitar errores con Set(undefined)
  return [...new Set(products.filter(p => p.brand).map(p => p.brand as string))].sort();
};

// Get price range
export const getPriceRange = (): { min: number; max: number } => {
  if (products.length === 0) return { min: 0, max: 0 }; // Manejar caso de array vacío
  const prices = products.map(p => p.price);
  return {
    min: Math.min(...prices),
    max: Math.max(...prices)
  };
};

// Enhanced data processing with AI hints
categories.forEach(cat => {
  if (!cat.dataAiHint) {
    cat.dataAiHint = cat.name.toLowerCase();
  }
});

products.forEach(prod => {
  if (!prod.dataAiHint) {
    prod.dataAiHint = prod.name.split(' ').slice(0, 2).join(' ').toLowerCase();
  }
  // CAMBIO: Modificar la URL dentro de cada objeto ProductImage
  prod.images = prod.images.map(img => ({
    ...img,
    url: `${img.url}?data-ai-hint=${encodeURIComponent(prod.dataAiHint as string)}`
  }));
});

blogPosts.forEach(post => {
  if (post.imageUrl && !post.imageUrl.includes('data-ai-hint')) {
    post.imageUrl = `${post.imageUrl}?data-ai-hint=${encodeURIComponent(post.dataAiHint as string)}`;
  }
  if (post.authorImage && !post.authorImage.includes('data-ai-hint')) {
    post.authorImage = `${post.authorImage}?data-ai-hint=${encodeURIComponent('author profile photo')}`;
  }
});