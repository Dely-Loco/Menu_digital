// @/types/index.ts
// Archivo de definiciones de tipos TypeScript para una aplicación de e-commerce

/**
 * Interfaz principal que define la estructura de un producto
 * Contiene toda la información necesaria para mostrar y gestionar productos
 */
export interface Product {
  // Identificadores básicos
  id: string;
  name: string;
  slug: string;
  
  // Descripciones del producto
  description: string;
  shortDescription?: string;
  technicalSpec?: string;
  
  // Información de precios
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  
  // Categorización y marca
  category?: Category;
  categorySlug?: string;
  brand?: string;
  
  // Multimedia y calificaciones
  images: ProductImage[];
  rating: number;
  reviewsCount: number;
  
  // Inventario y etiquetas especiales
  stock: number;
  isFeatured: boolean;
  isNew: boolean;
  isBestseller: boolean;
  tags: string[];
  dataAiHint?: string;
  
  // Detalles mejorados del producto
  features: string[];
  colors: string[];
  dimensions?: string;
  weight?: string;
  warranty?: string;
  shippingInfo?: string;
  
  // Datos de interacción del usuario (manejados en frontend)
  inWishlist?: boolean;
  compareCount?: number;
  
  // Sistema de reseñas mejorado
  reviews?: ProductReview[];
  
  // Metadatos
  createdAt?: string;
}

/**
 * Interfaz para las imágenes de productos
 */
export interface ProductImage {
  id: string;
  url: string;
  alt?: string;
  order: number;
  isPrimary?: boolean;
}

/**
 * Interfaz para las categorías de productos
 */
export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  dataAiHint?: string;
  icon?: string;
  color?: string;
  productsCount?: number;
  isPopular: boolean;
  subcategories?: Category[];
  featuredProducts?: string[];
  createdAt?: string;
}

/**
 * Interfaz para las reseñas de productos
 */
export interface ProductReview {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: string; // Considerar Date si se maneja en el cliente, o string ISO
  verified: boolean;
  helpful?: number;
  images?: string[];
}

/**
 * Interfaz para las entradas del blog
 */
export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorTitle?: string;
  authorImage?: string;
  date: string; // Formato ISO
  readTime?: string;
  imageUrl?: string;
  tags?: string[];
  dataAiHint?: string;
  category?: string;
  featured?: boolean;
  views?: number;
  likes?: number;
  metaDescription?: string;
  socialImage?: string;
}

/**
 * Interfaz para elementos del carrito de compras
 */
export interface CartItem extends Product {
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
  addedAt: string; // Timestamp ISO string
}

/**
 * Interfaz para filtros de productos
 */
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

/**
 * Interfaz para resultados de búsqueda
 */
export interface SearchResult {
  products: Product[];
  categories: Category[];
  blogPosts: BlogPost[];
  totalResults: number;
}

/**
 * Interfaz base para el estado de la UI
 */
export interface UIState {
  isLoading: boolean;
  error?: string;
  successMessage?: string;
}

/**
 * Interfaz para el estado del carrito de compras
 */
export interface CartState extends UIState {
  items: CartItem[];
  total: number;
  itemCount: number;
  isOpen: boolean;
}

/**
 * Interfaz para el estado de la lista de deseos
 */
export interface WishlistState extends UIState {
  items: Product[];
  itemCount: number;
}

/**
 * Interfaz genérica para respuestas de API
 */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

/**
 * Interfaz para respuestas paginadas de API
 */
export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// ... (Tus otras interfaces: ContactForm, NewsletterForm, ProductReviewForm, NavigationItem, MegaMenuData, Promotion, Banner están bien)
// Solo las incluyo aquí por si necesitas el archivo completo para copiar y pegar.

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface NewsletterForm {
  email: string;
  preferences?: string[];
}

export interface ProductReviewForm {
  rating: number;
  title: string;
  comment: string;
  recommend: boolean;
  images?: File[]; // File es un tipo global del navegador
}

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  icon?: string; // Podría ser un componente React o un string para una clase de icono
  badge?: string;
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

export interface Promotion {
  id: string;
  title: string;
  description: string;
  discountPercentage?: number;
  discountAmount?: number;
  code?: string;
  validFrom: string; // ISO Date string
  validUntil: string; // ISO Date string
  image?: string;
  categories?: string[];
  products?: string[];
  isActive: boolean;
}

export interface Banner {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  image: string;
  mobileImage?: string;
  link?: string;
  buttonText?: string;
  position: 'hero' | 'category' | 'footer' | 'popup';
  isActive: boolean;
  priority: number;
}


// ===== TIPOS ESPECÍFICOS DE PRISMA (ACTUALIZADOS) =====
// Estos tipos representan exactamente lo que viene de la BD

// Tipo para representar un Prisma Decimal que puede ser null
type PrismaDecimalNullable = string | number | { toString(): string } | null;
// Tipo para representar un Prisma Decimal que no es null
type PrismaDecimalNonNullable = string | number | { toString(): string };

/**
 * Tipo que representa un producto tal como viene de Prisma
 */
export type DBProduct = {
  id: number;
  nombre: string;
  slug: string;
  descripcion: string;
  descripcionCorta?: string | null;
  especificacionesTecnicas?: string | null;
  precio: PrismaDecimalNonNullable; // CAMBIO: Antes 'any'
  precioAnterior?: PrismaDecimalNullable; // CAMBIO: Antes 'any | null'
  marca?: string | null; // CAMBIO: Asegurar que permita null
  stock: number;
  calificacion?: PrismaDecimalNullable; // CAMBIO: Antes 'any | null'
  numeroReviews: number;
  destacado: boolean;
  esNuevo: boolean;
  masVendido: boolean;
  etiquetas: string[];
  caracteristicas: string[];
  colores: string[];
  dimensiones?: string | null;
  peso?: string | null;
  garantia?: string | null;
  creadoEn: Date;
  categoriaId?: number | null;
  categoria?: DBCategory | null;
  imagenes: DBImage[];
};

/**
 * Tipo que representa una categoría tal como viene de Prisma
 */
export type DBCategory = {
  id: number;
  nombre: string;
  slug: string;
  descripcion?: string | null;
  imagen?: string | null;
  icono?: string | null; // Permitir null si es opcional
  color?: string | null;  // Permitir null si es opcional
  esPopular: boolean;
  creadoEn: Date;
  _count?: {
    productos: number;
  };
};

/**
 * Tipo que representa una imagen tal como viene de Prisma
 */
export type DBImage = {
  id: number;
  url: string;
  alt?: string | null; // Permitir null si es opcional
  orden: number;
  productoId?: number | null;
};

// Tipo para las acciones del carrito (ya lo tenías bien)
export type CartAction =
  | { type: 'ADD_ITEM'; payload: Product } // El reducer convierte esto a CartItem
  | { type: 'REMOVE_ITEM'; payload: { id: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' };