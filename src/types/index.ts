// @/types/index.ts
// Archivo de definiciones de tipos TypeScript para una aplicación de e-commerce

/**
 * Interfaz principal que define la estructura de un producto
 * Contiene toda la información necesaria para mostrar y gestionar productos
 */
export interface Product {
  // Identificadores básicos
  id: string; // ID único del producto (convertido a string desde la BD)
  name: string; // Nombre del producto
  slug: string; // URL amigable (ej: "laptop-gaming-asus")
  
  // Descripciones del producto
  description: string; // Descripción completa del producto
  shortDescription?: string; // Descripción corta para tarjetas y vistas previas
  technicalSpec?: string; // Especificaciones técnicas detalladas
  
  // Información de precios
  price: number; // Precio actual del producto (convertido desde Decimal)
  originalPrice?: number; // Precio original (antes de descuento)
  discountPercentage?: number; // Porcentaje de descuento calculado
  
  // Categorización y marca
  category?: Category; // Categoría del producto como objeto
  categorySlug?: string; // Slug de la categoría para navegación
  brand?: string; // Marca del producto
  
  // Multimedia y calificaciones
  images: ProductImage[]; // Array de imágenes del producto
  rating: number; // Calificación promedio del producto
  reviewsCount: number; // Número total de reseñas
  
  // Inventario y etiquetas especiales
  stock: number; // Cantidad disponible en inventario
  isFeatured: boolean; // Si el producto está destacado
  isNew: boolean; // Etiqueta de producto nuevo
  isBestseller: boolean; // Etiqueta de producto más vendido
  tags: string[]; // Etiquetas para filtrado y búsqueda
  dataAiHint?: string; // Pista para sistemas de IA/búsqueda
  
  // Detalles mejorados del producto
  features: string[]; // Lista de características principales
  colors: string[]; // Colores disponibles
  dimensions?: string; // Dimensiones físicas del producto
  weight?: string; // Peso del producto
  warranty?: string; // Período de garantía
  shippingInfo?: string; // Información de envío
  
  // Datos de interacción del usuario (manejados en frontend)
  inWishlist?: boolean; // Si está en la lista de deseos del usuario
  compareCount?: number; // Cuántos usuarios están comparando este producto
  
  // Sistema de reseñas mejorado
  reviews?: ProductReview[]; // Array de reseñas del producto
  
  // Metadatos
  createdAt?: string; // Fecha de creación
}

/**
 * Interfaz para las imágenes de productos
 * Define la estructura de las imágenes asociadas a productos
 */
export interface ProductImage {
  id: string; // ID único de la imagen
  url: string; // URL de la imagen
  alt?: string; // Texto alternativo para accesibilidad
  order: number; // Orden de visualización
  isPrimary?: boolean; // Si es la imagen principal (calculado desde orden === 0)
}

/**
 * Interfaz para las categorías de productos
 * Define la estructura jerárquica de organización de productos
 */
export interface Category {
  // Identificadores básicos
  id: string; // ID único de la categoría (convertido a string desde la BD)
  name: string; // Nombre de la categoría
  slug: string; // URL amigable de la categoría
  description?: string; // Descripción de la categoría
  image?: string; // URL de imagen representativa
  dataAiHint?: string; // Pista para sistemas de IA
  
  // Datos mejorados de categoría
  icon?: string; // Emoji o icono para representar la categoría
  color?: string; // Color de marca asociado a la categoría
  productsCount?: number; // Número de productos en esta categoría
  isPopular: boolean; // Si es una categoría popular
  
  // Para mega menús y navegación
  subcategories?: Category[]; // Subcategorías anidadas (futuro uso)
  featuredProducts?: string[]; // IDs de productos destacados en esta categoría
  
  // Metadatos
  createdAt?: string; // Fecha de creación
}

/**
 * Interfaz para las reseñas de productos
 * Define la estructura de las opiniones y comentarios de usuarios
 */
export interface ProductReview {
  id: string; // ID único de la reseña
  user: string; // Nombre del usuario que escribió la reseña
  rating: number; // Calificación dada por el usuario (1-5 estrellas)
  comment: string; // Comentario textual del usuario
  date: string; // Fecha de la reseña
  verified: boolean; // Si la compra está verificada
  helpful?: number; // Número de votos "útil" recibidos
  images?: string[]; // Imágenes adjuntas a la reseña
}

/**
 * Interfaz para las entradas del blog
 * Define la estructura de artículos y contenido editorial
 */
export interface BlogPost {
  // Identificadores y contenido básico
  id: string; // ID único del post
  slug: string; // URL amigable del artículo
  title: string; // Título del artículo
  excerpt: string; // Extracto o resumen
  content: string; // Contenido completo del artículo
  
  // Información del autor
  author: string; // Nombre del autor
  authorTitle?: string; // Cargo/título del autor
  authorImage?: string; // Imagen de perfil del autor
  
  // Metadatos temporales y multimedia
  date: string; // Fecha de publicación (formato ISO)
  readTime?: string; // Tiempo estimado de lectura
  imageUrl?: string; // Imagen principal del artículo
  tags?: string[]; // Etiquetas del artículo
  dataAiHint?: string; // Pista para sistemas de IA
  
  // Datos mejorados del blog
  category?: string; // Categoría del artículo
  featured?: boolean; // Si es un artículo destacado
  views?: number; // Número de visualizaciones
  likes?: number; // Número de "me gusta"
  
  // SEO y redes sociales
  metaDescription?: string; // Meta descripción para SEO
  socialImage?: string; // Imagen para compartir en redes sociales
}

/**
 * Interfaz para elementos del carrito de compras
 * Extiende Product con información específica del carrito
 */
export interface CartItem extends Product {
  quantity: number; // Cantidad seleccionada del producto
  selectedColor?: string; // Color seleccionado (si aplica)
  selectedSize?: string; // Talla seleccionada (si aplica)
  addedAt: string; // Timestamp de cuándo se agregó al carrito
}

/**
 * Interfaz para filtros de productos
 * Define los criterios de filtrado disponibles
 */
export interface ProductFilters {
  category?: string; // Filtrar por categoría (slug)
  brand?: string; // Filtrar por marca
  minPrice?: number; // Precio mínimo
  maxPrice?: number; // Precio máximo
  minRating?: number; // Calificación mínima
  inStock?: boolean; // Solo productos en stock
  isNew?: boolean; // Solo productos nuevos
  isFeatured?: boolean; // Solo productos destacados
  isBestseller?: boolean; // Solo productos más vendidos
  colors?: string[]; // Filtrar por colores específicos
  tags?: string[]; // Filtrar por etiquetas
}

/**
 * Interfaz para resultados de búsqueda
 * Agrupa diferentes tipos de contenido encontrado
 */
export interface SearchResult {
  products: Product[]; // Productos encontrados
  categories: Category[]; // Categorías encontradas
  blogPosts: BlogPost[]; // Artículos de blog encontrados
  totalResults: number; // Número total de resultados
}

/**
 * Interfaz base para el estado de la UI
 * Maneja estados comunes de carga y errores
 */
export interface UIState {
  isLoading: boolean; // Si está cargando
  error?: string; // Mensaje de error (si existe)
  successMessage?: string; // Mensaje de éxito (si existe)
}

/**
 * Interfaz para el estado del carrito de compras
 * Extiende UIState con funcionalidad específica del carrito
 */
export interface CartState extends UIState {
  items: CartItem[]; // Elementos en el carrito
  total: number; // Total del carrito
  itemCount: number; // Número total de elementos
  isOpen: boolean; // Si el carrito está abierto/visible
}

/**
 * Interfaz para el estado de la lista de deseos
 * Maneja los productos guardados por el usuario
 */
export interface WishlistState extends UIState {
  items: Product[]; // Productos en la lista de deseos
  itemCount: number; // Número de productos en la lista
}

/**
 * Interfaz genérica para respuestas de API
 * Estandariza el formato de respuestas del servidor
 */
export interface ApiResponse<T> {
  success: boolean; // Si la operación fue exitosa
  data?: T; // Datos devueltos (si los hay)
  error?: string; // Mensaje de error (si existe)
  message?: string; // Mensaje general de la respuesta
}

/**
 * Interfaz para respuestas paginadas de API
 * Extiende ApiResponse con información de paginación
 */
export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  data: T[]; // Array de datos paginados
  pagination: {
    page: number; // Página actual
    limit: number; // Elementos por página
    total: number; // Total de elementos
    totalPages: number; // Total de páginas
  };
}

/**
 * Interfaz para formulario de contacto
 * Define los campos necesarios para contactar al sitio
 */
export interface ContactForm {
  name: string; // Nombre del usuario
  email: string; // Email de contacto
  subject: string; // Asunto del mensaje
  message: string; // Contenido del mensaje
}

/**
 * Interfaz para formulario de newsletter
 * Maneja suscripciones a boletines informativos
 */
export interface NewsletterForm {
  email: string; // Email para suscribirse
  preferences?: string[]; // Preferencias de email (tipos de contenido)
}

/**
 * Interfaz para formulario de reseñas de productos
 * Define los campos para que usuarios dejen opiniones
 */
export interface ProductReviewForm {
  rating: number; // Calificación (1-5 estrellas)
  title: string; // Título de la reseña
  comment: string; // Comentario detallado
  recommend: boolean; // Si recomienda el producto
  images?: File[]; // Archivos de imagen adjuntos
}

/**
 * Interfaz para elementos de navegación
 * Define la estructura de menús y navegación del sitio
 */
export interface NavigationItem {
  id: string; // ID único del elemento
  label: string; // Texto visible del enlace
  href: string; // URL de destino
  icon?: string; // Icono asociado
  badge?: string; // Etiqueta especial ("Nuevo", "Oferta", etc.)
  children?: NavigationItem[]; // Subelementos de navegación (menús desplegables)
}

/**
 * Interfaz para datos de mega menú
 * Estructura compleja de navegación con contenido rico
 */
export interface MegaMenuData {
  categories: Category[]; // Categorías a mostrar en el mega menú
  featuredProducts: Product[]; // Productos destacados
  promotions: {
    title: string; // Título de la promoción
    description: string; // Descripción de la promoción
    image: string; // Imagen promocional
    link: string; // Enlace a la promoción
  }[];
}

/**
 * Interfaz para promociones y ofertas
 * Define descuentos y campañas promocionales
 */
export interface Promotion {
  id: string; // ID único de la promoción
  title: string; // Título de la promoción
  description: string; // Descripción detallada
  discountPercentage?: number; // Porcentaje de descuento
  discountAmount?: number; // Cantidad fija de descuento
  code?: string; // Código de cupón (si aplica)
  validFrom: string; // Fecha de inicio de validez
  validUntil: string; // Fecha de fin de validez
  image?: string; // Imagen promocional
  categories?: string[]; // Categorías aplicables
  products?: string[]; // Productos específicos aplicables
  isActive: boolean; // Si la promoción está activa
}

/**
 * Interfaz para banners promocionales
 * Define elementos gráficos promocionales en el sitio
 */
export interface Banner {
  id: string; // ID único del banner
  title: string; // Título principal
  subtitle?: string; // Subtítulo (opcional)
  description?: string; // Descripción adicional
  image: string; // Imagen principal del banner
  mobileImage?: string; // Imagen optimizada para móviles
  link?: string; // Enlace de destino al hacer clic
  buttonText?: string; // Texto del botón de acción
  position: 'hero' | 'category' | 'footer' | 'popup'; // Posición donde se muestra
  isActive: boolean; // Si el banner está activo
  priority: number; // Orden de visualización (mayor prioridad = se muestra primero)
}

// ===== TIPOS ESPECÍFICOS DE PRISMA =====
// Estos tipos representan exactamente lo que viene de la BD

/**
 * Tipo que representa un producto tal como viene de Prisma
 * Usado internamente en las queries
 */

export type DBProduct = {
  id: number;
  nombre: string;
  slug: string;
  descripcion: string;
  descripcionCorta?: string | null;
  especificacionesTecnicas?: string | null;
  precio: any; // Prisma Decimal
  precioAnterior?: any | null; // Prisma Decimal
  marca?: string | null;
  stock: number;
  calificacion?: any | null; // ANTES: rating. (Prisma Decimal)
  numeroReviews: number;
  destacado: boolean;
  esNuevo: boolean;
  masVendido: boolean;
  etiquetas: string[];       // ANTES: tags
  caracteristicas: string[];
  colores: string[];
  dimensiones?: string | null;
  peso?: string | null;
  garantia?: string | null;
  creadoEn: Date;            // ANTES: createdAt
  categoriaId?: number | null;
  categoria?: DBCategory | null; // Este DBCategory también debe estar actualizado
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
  icono?: string | null;
  color?: string | null;
  esPopular: boolean;
  creadoEn: Date;            // ANTES: createdAt
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
  alt?: string | null;
  orden: number;
  productoId?: number | null;
};