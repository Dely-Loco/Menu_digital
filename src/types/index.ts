// @/types/index.ts

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription?: string; // For cards and quick previews
  technicalSpec: string;
  price: number;
  originalPrice?: number;
  discountPercentage?: number; // Calculated discount
category: string | Category | undefined;
  brand: string;
  images: string[];
  rating: number;
  reviewsCount: number;
  stock: number;
  isFeatured?: boolean;
  isNew?: boolean; // New product badge
  isBestseller?: boolean; // Bestseller badge
  tags?: string[];
  dataAiHint?: string;
  
  // Enhanced product details
  features?: string[]; // Key features list
  colors?: string[]; // Available colors
  sizes?: string[]; // Available sizes (for wearables)
  switchTypes?: string[]; // For keyboards, etc.
  dimensions?: string; // Product dimensions
  weight?: string; // Product weight
  warranty?: string; // Warranty period
  shippingInfo?: string; // Shipping details
  
  // User interaction data
  inWishlist?: boolean;
  compareCount?: number; // How many users are comparing this
  
  // Enhanced review system
  reviews?: ProductReview[];
  
  // Compatibility and specs (for tech products)
  compatibility?: string[]; // Compatible platforms/systems
  lumens?: string; // For lights
  lifespan?: string; // Product lifespan
  maxSpeed?: string; // For drones, etc.
  ports?: string[]; // For chargers, etc.
}

export interface ProductReview {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
  helpful?: number; // Helpful votes
  images?: string[]; // Review images
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string; // URL for category image
  dataAiHint?: string;
  
  // Enhanced category data
  icon?: string; // Emoji or icon for the category
  color?: string; // Brand color for the category
  productsCount?: number; // Number of products in category
  isPopular?: boolean; // Popular category badge
  
  // For mega menu and navigation
  subcategories?: Category[]; // Nested categories
  featuredProducts?: string[]; // Featured product IDs for this category
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorTitle?: string; // Author's job title
  authorImage?: string; // Author profile image
  date: string; // ISO date string
  readTime?: string; // Estimated read time
  imageUrl?: string;
  tags?: string[];
  dataAiHint?: string;
  
  // Enhanced blog data
  category?: string; // Blog post category
  featured?: boolean; // Featured blog post
  views?: number; // View count
  likes?: number; // Like count
  
  // SEO and social
  metaDescription?: string;
  socialImage?: string;
}

export interface CartItem extends Product {
  quantity: number;
  selectedColor?: string; // Selected color variant
  selectedSize?: string; // Selected size variant
  addedAt: string; // When item was added to cart
}

// Filter and search interfaces
export interface ProductFilters {
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  inStock?: boolean;
  isNew?: boolean;
  isFeatured?: boolean;
  isBestseller?: boolean;
  colors?: string[];
  tags?: string[];
}

export interface SearchResult {
  products: Product[];
  categories: Category[];
  blogPosts: BlogPost[];
  totalResults: number;
}

// UI State interfaces
export interface UIState {
  isLoading: boolean;
  error?: string;
  successMessage?: string;
}

export interface CartState extends UIState {
  items: CartItem[];
  total: number;
  itemCount: number;
  isOpen: boolean;
}

export interface WishlistState extends UIState {
  items: Product[];
  itemCount: number;
}

// API Response interfaces
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Form interfaces
export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface NewsletterForm {
  email: string;
  preferences?: string[]; // Email preferences
}

export interface ProductReviewForm {
  rating: number;
  title: string;
  comment: string;
  recommend: boolean;
  images?: File[];
}

// Navigation and menu interfaces
export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  icon?: string;
  badge?: string; // For "New", "Sale", etc.
  children?: NavigationItem[];
}

export interface MegaMenuData {
  categories: Category[];
  featuredProducts: Product[];
  promotions: {
    title: string;
    description: string;
    image: string;
    link: string;
  }[];
}

// Promotion and marketing interfaces
export interface Promotion {
  id: string;
  title: string;
  description: string;
  discountPercentage?: number;
  discountAmount?: number;
  code?: string; // Coupon code
  validFrom: string;
  validUntil: string;
  image?: string;
  categories?: string[]; // Applicable categories
  products?: string[]; // Applicable products
  isActive: boolean;
}

export interface Banner {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  image: string;
  mobileImage?: string; // Responsive image for mobile
  link?: string;
  buttonText?: string;
  position: 'hero' | 'category' | 'footer' | 'popup';
  isActive: boolean;
  priority: number; // Display order
}

export interface ProductImage {
  id: string;
  productId: string;
  url: string;
  altText?: string;
  order: number;
  isPrimary: boolean;
}