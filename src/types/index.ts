// @/types/index.ts
// Archivo de definiciones de tipos TypeScript para una aplicación de restaurante

/**
 * Interfaz principal que define la estructura de un plato
 * Contiene toda la información necesaria para mostrar y gestionar platos del menú
 */
export interface Plato {
  // Identificadores básicos
  id: string;
  name: string;
  slug: string;
  
  // Descripciones del plato
  description: string;
  shortDescription?: string;
  
  // Información de precios
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  
  // Categorización
  category?: Category;
  categorySlug?: string;
  
  // Multimedia
  images: ProductImage[];
  
  // Disponibilidad y etiquetas especiales
  available: boolean;
  isFeatured: boolean;
  tags: string[];
  
  // Datos de interacción del usuario (manejados en frontend)
  inWishlist?: boolean;
  
  // Metadatos
  createdAt?: string;
}

/**
 * Interfaz para las imágenes de platos
 */
export interface ProductImage {
  id: string;
  url: string;
  alt?: string;
  order: number;
  isPrimary?: boolean;
}

/**
 * Interfaz para las categorías de platos
 */
export interface Category {
  id: string;                // Prisma devuelve `number`, pero si quieres usar string por consistencia con tu front, lo convertimos en el mapper
  name: string;              // viene de `nombre` en Prisma
  slug: string;
  description?: string;      // viene de `descripcion`
  image?: string;            // viene de `imagen`
  isPopular?: boolean;       // si tu modelo Prisma tiene `esPopular`, lo mapeamos aquí
  platosCount?: number;      // corresponde a `_count.productos` o `_count.platos`
  createdAt?: string;        // Prisma devuelve `Date`, aquí lo podemos convertir a ISO string
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
export interface CartItem extends Plato {
  quantity: number;
  addedAt: string; // Timestamp ISO string
  notes?: string; // Notas especiales para el plato
}

/**
 * Interfaz para filtros de platos
 */
export interface PlatoFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  available?: boolean;
  isFeatured?: boolean;
  tags?: string[];
}

/**
 * Interfaz para resultados de búsqueda
 */
export interface SearchResult {
  platos: Plato[];
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
  items: Plato[];
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

/**
 * Interfaz para formulario de contacto
 */
export interface ContactForm {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

/**
 * Interfaz para formulario de newsletter
 */
export interface NewsletterForm {
  email: string;
  preferences?: string[];
}

/**
 * Interfaz para formulario de reservas
 */
export interface ReservationForm {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  specialRequests?: string;
}

/**
 * Interfaz para elementos de navegación
 */
export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  icon?: string;
  badge?: string;
  children?: NavigationItem[];
}

/**
 * Interfaz para datos del mega menú
 */
export interface MegaMenuData {
  categories: Category[];
  featuredPlatos: Plato[];
  promotions: {
    title: string;
    description: string;
    image: string;
    link: string;
  }[];
}

/**
 * Interfaz para promociones
 */
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
  platos?: string[];
  isActive: boolean;
}

/**
 * Interfaz para banners
 */
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

// ===== TIPOS ESPECÍFICOS DE PRISMA (ACTUALIZADOS PARA RESTAURANTE) =====
// Estos tipos representan exactamente lo que viene de la BD

// Tipo para representar un Prisma Decimal que puede ser null
type PrismaDecimalNullable = string | number | { toString(): string } | null;
// Tipo para representar un Prisma Decimal que no es null
type PrismaDecimalNonNullable = string | number | { toString(): string };

/**
 * Tipo que representa un plato tal como viene de Prisma
 */
export type DBPlato = {
  id: number;
  nombre: string;
  slug: string;
  descripcion: string;
  descripcionCorta?: string | null;
  precio: PrismaDecimalNonNullable;
  precioAnterior?: PrismaDecimalNullable;
  disponible: boolean;
  destacado: boolean;
  etiquetas: string[];
  creadoEn: Date;
  categoriaId?: number | null;
  categoria?: DBCategoria | null;
  imagenes: DBImagen[];
};

/**
 * Tipo que representa una categoría tal como viene de Prisma
 */
export type DBCategoria = {
  id: number;
  nombre: string;
  slug: string;
  descripcion?: string | null;
  imagen?: string | null;
  esPopular?: boolean | null;
  creadoEn: Date;
  _count?: {
    platos: number;
  };
};

/**
 * Tipo que representa una imagen tal como viene de Prisma
 */
export type DBImagen = {
  id: number;
  url: string;
  alt?: string | null;
  orden: number;
  platoId?: number | null;
};

/**
 * Tipo para las acciones del carrito
 */
export type CartAction =
  | { type: 'ADD_ITEM'; payload: Plato }
  | { type: 'REMOVE_ITEM'; payload: { id: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'UPDATE_NOTES'; payload: { id: string; notes: string } }
  | { type: 'CLEAR_CART' };

/**
 * Funciones de utilidad para convertir tipos de DB a tipos de frontend
 */
export const convertDBPlatoToPlato = (dbPlato: DBPlato): Plato => ({
  id: dbPlato.id.toString(),
  name: dbPlato.nombre,
  slug: dbPlato.slug,
  description: dbPlato.descripcion,
  shortDescription: dbPlato.descripcionCorta || undefined,
  price: typeof dbPlato.precio === 'object' ? parseFloat(dbPlato.precio.toString()) : Number(dbPlato.precio),
  originalPrice: dbPlato.precioAnterior 
    ? (typeof dbPlato.precioAnterior === 'object' 
        ? parseFloat(dbPlato.precioAnterior.toString()) 
        : Number(dbPlato.precioAnterior))
    : undefined,
  discountPercentage: dbPlato.precioAnterior 
    ? Math.round(((Number(dbPlato.precioAnterior) - Number(dbPlato.precio)) / Number(dbPlato.precioAnterior)) * 100)
    : undefined,
  available: dbPlato.disponible,
  isFeatured: dbPlato.destacado,
  tags: dbPlato.etiquetas,
  category: dbPlato.categoria ? convertDBCategoriaToCategory(dbPlato.categoria) : undefined,
  categorySlug: dbPlato.categoria?.slug,
  images: dbPlato.imagenes.map(convertDBImagenToProductImage),
  createdAt: dbPlato.creadoEn.toISOString(),
});

export const convertDBCategoriaToCategory = (dbCategoria: DBCategoria): Category => ({
  id: dbCategoria.id.toString(),
  name: dbCategoria.nombre,
  slug: dbCategoria.slug,
  description: dbCategoria.descripcion || undefined,
  image: dbCategoria.imagen || undefined,
  isPopular: dbCategoria.esPopular || false,
  platosCount: dbCategoria._count?.platos,
  createdAt: dbCategoria.creadoEn.toISOString(),
});

export const convertDBImagenToProductImage = (dbImagen: DBImagen): ProductImage => ({
  id: dbImagen.id.toString(),
  url: dbImagen.url,
  alt: dbImagen.alt || undefined,
  order: dbImagen.orden,
  isPrimary: dbImagen.orden === 0,
});