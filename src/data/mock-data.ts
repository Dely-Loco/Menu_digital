// @/data/mock-data.ts
import type { Product, Category, BlogPost } from '@/types';

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
    isPopular: true
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
    isPopular: true
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
    isPopular: false
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
    isPopular: true
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
    isPopular: false
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
    isPopular: true
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
    isPopular: false
  }
];

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
    category: 'smart-home',
    brand: 'Quantum Audio',
    images: [
      'https://placehold.co/600x600.png',
      'https://placehold.co/600x600.png',
      'https://placehold.co/600x600.png',
      'https://placehold.co/600x600.png'
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
        id: '1',
        user: 'Alex Johnson',
        rating: 5,
        comment: 'Amazing sound quality and the AI is incredibly responsive!',
        date: '2024-07-20',
        verified: true
      },
      {
        id: '2',
        user: 'Sarah Chen',
        rating: 4,
        comment: 'Great product, easy setup, love the multi-room feature.',
        date: '2024-07-18',
        verified: true
      }
    ]
  },
  {
    id: '2',
    name: 'Nova Smartwatch Pro',
    slug: 'nova-smartwatch-pro',
    description: 'Track your fitness, stay connected, and manage your day with the Nova Smartwatch Pro. AMOLED display, 14-day battery life, and advanced health monitoring.',
    shortDescription: 'Premium smartwatch with 14-day battery and health monitoring',
    technicalSpec: 'Display: 1.4" AMOLED. Battery: Up to 14 days. Sensors: HR, SpO2, GPS. Water Resistance: 5ATM.',
    price: 199.50,
    category: 'wearables',
    brand: 'Nova Gear',
    images: [
      'https://placehold.co/600x600.png',
      'https://placehold.co/600x600.png',
      'https://placehold.co/600x600.png'
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
    sizes: ['42mm', '46mm'],
    dimensions: '46 x 39 x 10.9 mm',
    weight: '52g (without strap)',
    warranty: '1 year',
    shippingInfo: 'Free shipping, arrives in 1-2 days',
    inWishlist: false,
    compareCount: 8,
    reviews: [
      {
        id: '1',
        user: 'Mike Rodriguez',
        rating: 5,
        comment: 'Battery life is incredible, exactly as advertised!',
        date: '2024-07-22',
        verified: true
      }
    ]
  },
  {
    id: '3',
    name: 'ErgoTech Keyboard K5',
    slug: 'ergotech-keyboard-k5',
    description: 'Maximize your comfort and productivity with the ErgoTech K5 wireless mechanical keyboard. Customizable RGB, programmable keys, and ergonomic design.',
    shortDescription: 'Wireless mechanical keyboard with RGB and ergonomic design',
    technicalSpec: 'Type: Mechanical (Brown Switches). Connectivity: Bluetooth, 2.4GHz Wireless, USB-C. Backlight: RGB per key.',
    price: 89.00,
    category: 'office-tech',
    brand: 'ErgoTech',
    images: [
      'https://placehold.co/600x600.png',
      'https://placehold.co/600x600.png'
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
    switchTypes: ['Red (Linear)', 'Brown (Tactile)', 'Blue (Clicky)'],
    dimensions: '17.3" x 5.1" x 1.6"',
    weight: '2.2 lbs',
    warranty: '2 years',
    shippingInfo: 'Free shipping, arrives in 2-3 days',
    inWishlist: false,
    compareCount: 15,
    reviews: []
  },
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
    category: 'smart-home',
    brand: 'Aura Home',
    images: [
      'https://placehold.co/600x600.png',
      'https://placehold.co/600x600.png',
      'https://placehold.co/600x600.png'
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
    compatibility: ['Alexa', 'Google Assistant', 'Apple HomeKit'],
    lumens: '800lm per bulb',
    lifespan: '25,000 hours',
    warranty: '2 years',
    shippingInfo: 'Free shipping, arrives in 2-3 days',
    inWishlist: false,
    compareCount: 6,
    reviews: []
  },
  {
    id: '5',
    name: 'Stealth Drone X200',
    slug: 'stealth-drone-x200',
    description: 'Capture stunning aerial footage with the Stealth Drone X200. 4K camera, 30-min flight time, and intelligent flight modes.',
    shortDescription: '4K drone with 30-min flight time and intelligent modes',
    technicalSpec: 'Camera: 4K UHD. Flight Time: 30 mins. Range: 5km. Features: Obstacle Avoidance, Follow Me.',
    price: 499.00,
    originalPrice: 549.00,
    discountPercentage: 9,
    category: 'gadgets',
    brand: 'AeroFlight',
    images: [
      'https://placehold.co/600x600.png',
      'https://placehold.co/600x600.png',
      'https://placehold.co/600x600.png',
      'https://placehold.co/600x600.png'
    ],
    rating: 4.7,
    reviewsCount: 95,
    stock: 30,
    isFeatured: false,
    isNew: true,
    isBestseller: false,
    tags: ['drone', '4k camera', 'aerial photography'],
    dataAiHint: 'drone photography',
    features: ['4K Camera', '30min Flight', 'Obstacle Avoidance', 'Follow Me Mode', '5km Range'],
    colors: ['Stealth Black', 'Arctic White'],
    maxSpeed: '68 km/h',
    dimensions: 'Folded: 214×137×84mm',
    weight: '895g',
    warranty: '1 year',
    shippingInfo: 'Free shipping, arrives in 3-5 days',
    inWishlist: false,
    compareCount: 4,
    reviews: []
  },
  {
    id: '6',
    name: 'PowerCore III 20K Charger',
    slug: 'powercore-iii-20k-charger',
    description: 'High-capacity portable charger with 20,000mAh battery. Fast charge your devices on the go. USB-C PD and USB-A ports.',
    shortDescription: '20,000mAh portable charger with fast charging',
    technicalSpec: 'Capacity: 20,000mAh. Ports: 1x USB-C PD (45W), 2x USB-A (18W). Weight: 350g.',
    price: 59.99,
    category: 'accessories',
    brand: 'ChargeUp',
    images: [
      'https://placehold.co/600x600.png',
      'https://placehold.co/600x600.png'
    ],
    rating: 4.8,
    reviewsCount: 450,
    stock: 300,
    isFeatured: false,
    isNew: false,
    isBestseller: true,
    tags: ['power bank', 'portable charger', 'usb-c'],
    dataAiHint: 'power bank',
    features: ['20,000mAh Capacity', 'Fast Charging', 'Multiple Ports', 'LED Display'],
    colors: ['Matte Black', 'Space Gray'],
    ports: ['1x USB-C PD (45W)', '2x USB-A (18W)'],
    dimensions: '158 x 74 x 19mm',
    weight: '350g',
    warranty: '18 months',
    shippingInfo: 'Free shipping, arrives in 1-2 days',
    inWishlist: false,
    compareCount: 11,
    reviews: []
  },
  // Additional products for richer catalog
  {
    id: '7',
    name: 'ProGamer Elite Headset',
    slug: 'progamer-elite-headset',
    description: 'Professional gaming headset with 7.1 surround sound, noise-canceling microphone, and RGB lighting.',
    shortDescription: 'Pro gaming headset with 7.1 surround and RGB',
    technicalSpec: 'Drivers: 50mm. Frequency: 20Hz-20kHz. Microphone: Noise-canceling boom. Connectivity: USB, 3.5mm.',
    price: 79.99,
    originalPrice: 99.99,
    discountPercentage: 20,
    category: 'gaming',
    brand: 'ProGamer',
    images: [
      'https://placehold.co/600x600.png',
      'https://placehold.co/600x600.png'
    ],
    rating: 4.4,
    reviewsCount: 89,
    stock: 85,
    isFeatured: false,
    isNew: true,
    isBestseller: false,
    tags: ['gaming headset', 'rgb', '7.1 surround'],
    dataAiHint: 'gaming headset',
    features: ['7.1 Surround Sound', 'RGB Lighting', 'Noise-Canceling Mic', 'Comfortable Design'],
    colors: ['RGB Black', 'RGB White'],
    warranty: '2 years',
    shippingInfo: 'Free shipping, arrives in 2-3 days',
    inWishlist: false,
    compareCount: 7,
    reviews: []
  },
  {
    id: '8',
    name: 'UltraSound Pro Bluetooth Speaker',
    slug: 'ultrasound-pro-bluetooth-speaker',
    description: 'Portable Bluetooth speaker with 360° sound, waterproof design, and 24-hour battery life.',
    shortDescription: 'Waterproof Bluetooth speaker with 360° sound',
    technicalSpec: 'Power: 40W. Battery: 24 hours. Waterproof: IPX7. Bluetooth: 5.0. Drivers: Dual 20W.',
    price: 149.99,
    category: 'audio',
    brand: 'UltraSound',
    images: [
      'https://placehold.co/600x600.png',
      'https://placehold.co/600x600.png',
      'https://placehold.co/600x600.png'
    ],
    rating: 4.6,
    reviewsCount: 203,
    stock: 60,
    isFeatured: true,
    isNew: false,
    isBestseller: false,
    tags: ['bluetooth speaker', 'waterproof', 'portable'],
    dataAiHint: 'bluetooth speaker',
    features: ['360° Sound', 'IPX7 Waterproof', '24H Battery', 'Bass Boost'],
    colors: ['Ocean Blue', 'Sunset Orange', 'Forest Green'],
    warranty: '1 year',
    shippingInfo: 'Free shipping, arrives in 2-3 days',
    inWishlist: false,
    compareCount: 9,
    reviews: []
  }
];

// Enhanced Blog Posts with more metadata
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
    date: '2024-07-15T10:00:00Z',
    readTime: '8 min read',
    imageUrl: 'https://placehold.co/800x400.png',
    tags: ['smart home', 'technology', 'future tech'],
    dataAiHint: 'smart home future',
    category: 'Technology Trends',
    featured: true,
    views: 2450,
    likes: 189
  },
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
    likes: 124
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
    likes: 267
  },
];

// Enhanced helper functions
export const getFeaturedProducts = (): Product[] => products.filter(p => p.isFeatured);
export const getNewProducts = (): Product[] => products.filter(p => p.isNew);
export const getBestsellerProducts = (): Product[] => products.filter(p => p.isBestseller);
export const getProductBySlug = (slug: string): Product | undefined => products.find(p => p.slug === slug);
export const getProductsByCategory = (categorySlug: string): Product[] => products.filter(p => p.category === categorySlug);
export const getCategoryBySlug = (slug: string): Category | undefined => categories.find(c => c.slug === slug);
export const getBlogPostBySlug = (slug: string): BlogPost | undefined => blogPosts.find(p => p.slug === slug);
export const getProductsByBrand = (brand: string): Product[] => products.filter(p => p.brand === brand);
export const getProductsByPriceRange = (min: number, max: number): Product[] => products.filter(p => p.price >= min && p.price <= max);
export const getProductsOnSale = (): Product[] => products.filter(p => p.originalPrice && p.originalPrice > p.price);
export const getPopularCategories = (): Category[] => categories.filter(c => c.isPopular);
export const getFeaturedBlogPosts = (): BlogPost[] => blogPosts.filter(p => p.featured);

// Search functionality
// @/data/mock-data.ts
export const searchProducts = (query: string): Product[] => {
  const searchTerm = query.toLowerCase();
  return products.filter(p => 
    p.name.toLowerCase().includes(searchTerm) ||
    p.description.toLowerCase().includes(searchTerm) ||
    (p.tags && p.tags.some((tag: string) => tag.toLowerCase().includes(searchTerm))) ||
    p.brand.toLowerCase().includes(searchTerm)
  );
};

// Filter products by multiple criteria
export const filterProducts = (filters: {
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  inStock?: boolean;
}): Product[] => {
  return products.filter(product => {
    if (filters.category && product.category !== filters.category) return false;
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
  return [...new Set(products.map(p => p.brand))].sort();
};

// Get price range
export const getPriceRange = (): { min: number; max: number } => {
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
    prod.dataAiHint = prod.name.split(' ').slice(0,2).join(' ').toLowerCase();
  }
  prod.images = prod.images.map(img => `${img}?data-ai-hint=${encodeURIComponent(prod.dataAiHint as string)}`);
});

blogPosts.forEach(post => {
  if (post.imageUrl && !post.imageUrl.includes('data-ai-hint')) {
     post.imageUrl = `${post.imageUrl}?data-ai-hint=${encodeURIComponent(post.dataAiHint as string)}`;
  }
  if (post.authorImage && !post.authorImage.includes('data-ai-hint')) {
     post.authorImage = `${post.authorImage}?data-ai-hint=${encodeURIComponent('author profile photo')}`;
  }
});