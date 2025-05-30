// src/lib/queries.ts

// Importaciones necesarias
import { prisma } from "./prisma"; // Cliente de Prisma para conexión a BD
import type { Product, Category, BlogPost } from '@/types'; // Types TypeScript
import { prisma, Prisma } from '@/lib/prisma';

// En tus funciones donde usas esNuevo/masVendido
const where: Prisma.ProductoWhereInput = {
  esNuevo: true,
  masVendido: true
};

// ===== CONSTANTES GLOBALES =====

// Imágenes por defecto para evitar hardcode repetido
const DEFAULT_PRODUCT_IMAGE = 'https://placehold.co/600x600.png';
const DEFAULT_CATEGORY_IMAGE = 'https://placehold.co/400x300.png';

// Include reutilizable para evitar repetición
const defaultProductInclude = {
  imagenes: true,
  categoria: true,
} as const;

const defaultCategoryInclude = {
  _count: {
    select: { productos: true }
  }
} as const;

// Valores por defecto para rangos y límites
const DEFAULT_PRICE_RANGE = { min: 0, max: 1000 };
const DEFAULT_TAKE_LIMIT = 8;
const DEFAULT_PAGE_SIZE = 20;

// ===== FUNCIONES HELPER PARA FORMATEO DE DATOS =====

/**
 * Valida que los campos requeridos estén presentes
 */
function validateRequiredFields(dbProduct: any): boolean {
  return !!(dbProduct?.id && dbProduct?.nombre && dbProduct?.slug && dbProduct?.precio);
}

/**
 * Convierte un producto de la base de datos al tipo Product de la aplicación
 * Transforma los nombres de campos en español de la BD a inglés para el frontend
 */
function formatProductFromDB(dbProduct: any): Product {
  // Validar campos críticos antes de procesar
  if (!validateRequiredFields(dbProduct)) {
    console.warn('Product missing required fields:', dbProduct?.id);
  }

  return {
    // Campos básicos del producto
    id: dbProduct.id.toString(), // Convertir ID a string
    name: dbProduct.nombre || '', // nombre -> name
    slug: dbProduct.slug || '', // Para URLs amigables
    description: dbProduct.descripcion || '', // descripcion -> description
    
    // Descripción corta: usar campo específico o truncar descripción principal
    shortDescription: dbProduct.descripcionCorta || 
                     (dbProduct.descripcion ? dbProduct.descripcion.substring(0, 100) + '...' : ''),
    
    // Especificaciones técnicas (opcional)
    technicalSpec: dbProduct.especificacionesTecnicas || '',
    
    // Precios y descuentos
    price: dbProduct.precio?.toNumber() || 0, // Prisma Decimal convertido a number
    originalPrice: dbProduct.precioAnterior?.toNumber() || undefined,
    
    // Calcular porcentaje de descuento si existe precio anterior
    discountPercentage: dbProduct.precioAnterior ? 
      Math.round((1 - dbProduct.precio.toNumber() / dbProduct.precioAnterior.toNumber()) * 100) : 0,
    
    // Información de categoría y marca
    category: dbProduct.categoria?.slug || '', // Usar slug de la categoría relacionada
    brand: dbProduct.marca || '',
    
    // Imágenes: extraer URLs del array de relación imagenes
    images: dbProduct.imagenes?.map((img: any) => img.url).filter(Boolean) || 
            [DEFAULT_PRODUCT_IMAGE], // Imagen placeholder por defecto
    
    // Rating y reseñas
    rating: dbProduct.rating?.toNumber() || 4.0, // Rating por defecto 4.0
    reviewsCount: dbProduct.numeroReviews || 0,
    
    // Inventario
    stock: dbProduct.stock || 0,
    
    // Flags booleanos para destacar productos
    isFeatured: dbProduct.destacado || false, // Producto destacado
    isNew: dbProduct.esNuevo || false, // Producto nuevo
    isBestseller: dbProduct.masVendido || false, // Más vendido
    
    // Etiquetas y características
    tags: dbProduct.tags || [],
    dataAiHint: (dbProduct.nombre || '').toLowerCase(), // Para búsquedas por IA
    features: dbProduct.caracteristicas || [], // Lista de características
    colors: dbProduct.colores || ['Default'], // Colores disponibles
    
    // Especificaciones físicas
    dimensions: dbProduct.dimensiones || '',
    weight: dbProduct.peso || '',
    warranty: dbProduct.garantia || '1 year', // Garantía por defecto
    
    // Información adicional (valores fijos por ahora)
    shippingInfo: 'Free shipping, arrives in 2-3 days',
    inWishlist: false, // Se manejará en el frontend
    compareCount: 0, // Para funcionalidad de comparación
    reviews: [] // Se implementará después si es necesario
  };
}

/**
 * Convierte una categoría de la base de datos al tipo Category de la aplicación
 */
function formatCategoryFromDB(dbCategory: any): Category {
  return {
    id: dbCategory.id.toString(),
    name: dbCategory.nombre || '', // nombre -> name
    slug: dbCategory.slug || '',
    image: dbCategory.imagen || DEFAULT_CATEGORY_IMAGE, // Imagen por defecto
    description: dbCategory.descripcion || '',
    dataAiHint: (dbCategory.nombre || '').toLowerCase(), // Para búsquedas por IA
    icon: dbCategory.icono || '📦', // Icono por defecto
    color: dbCategory.color || '#6B7280', // Color por defecto (gris)
    productsCount: dbCategory._count?.productos || 0, // Contar productos relacionados
    isPopular: dbCategory.popular || false // Categoría popular
  };
}

// ===== CONSULTAS DE PRODUCTOS =====

/**
 * Obtiene todos los productos de la base de datos con paginación
 * Incluye imágenes y categoría relacionadas, ordenados por fecha de creación
 */
export async function getAllProducts(page = 1, limit = DEFAULT_PAGE_SIZE): Promise<Product[]> {
  try {
    const skip = (page - 1) * limit;
    
    const dbProducts = await prisma.producto.findMany({
      skip,
      take: limit,
      include: defaultProductInclude,
      orderBy: {
        createdAt: 'desc', // Ordenar por más recientes primero
      },
    });

    // Transformar cada producto de BD al formato de la aplicación
    return dbProducts.map(formatProductFromDB);
  } catch (error) {
    console.error('Error fetching products:', error);
    return []; // Retornar array vacío en caso de error
  }
}

/**
 * Obtiene el total de productos para paginación
 */
export async function getTotalProductsCount(): Promise<number> {
  try {
    return await prisma.producto.count();
  } catch (error) {
    console.error('Error counting products:', error);
    return 0;
  }
}

/**
 * Obtiene un producto específico por su slug
 * Incluye todas las relaciones necesarias para mostrar detalles completos
 */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const dbProduct = await prisma.producto.findUnique({
      where: { slug }, // Buscar por slug único
      include: defaultProductInclude, // CRÍTICO: Incluir imágenes para la galería
    });
    
    // Retornar producto formateado o null si no existe
    return dbProduct ? formatProductFromDB(dbProduct) : null;
  } catch (error) {
    console.error('Error fetching product by slug:', error);
    return null;
  }
}

/**
 * Obtiene productos marcados como destacados
 * Limitado a 8 productos para secciones de homepage
 */
export async function getFeaturedProducts(limit = DEFAULT_TAKE_LIMIT): Promise<Product[]> {
  try {
    const dbProducts = await prisma.producto.findMany({
      where: { destacado: true }, // Solo productos destacados
      include: defaultProductInclude,
      take: limit, // Límite configurable
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    return dbProducts.map(formatProductFromDB);
  } catch (error) {
    console.error('Error fetching featured products:', error);
    return [];
  }
}

/**
 * Obtiene productos marcados como nuevos
 * Para sección "Novedades" o "Recién llegados"
 */
export async function getNewProducts(limit = DEFAULT_TAKE_LIMIT): Promise<Product[]> {
  try {
    const dbProductsNuevos = await prisma.producto.findMany({
      where: { esNuevo: true }, // Solo productos nuevos
      include: defaultProductInclude,
      take: limit, // Límite configurable
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    return dbProductsNuevos.map(formatProductFromDB);
  } catch (error) {
    console.error('Error fetching new products:', error);
    return [];
  }
}

/**
 * Obtiene productos más vendidos/bestsellers
 * Para secciones de productos populares
 */
export async function getBestsellerProducts(limit = DEFAULT_TAKE_LIMIT): Promise<Product[]> {
  try {
    const dbProductsVendidos = await prisma.producto.findMany({
      where: { masVendido: true }, // Solo más vendidos
      include: defaultProductInclude,
      take: limit, // Límite configurable
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    return dbProductsVendidos.map(formatProductFromDB);
  } catch (error) {
    console.error('Error fetching bestseller products:', error);
    return [];
  }
}

/**
 * Obtiene productos de una categoría específica con paginación
 * Para páginas de categorías y filtrado
 */
export async function getProductsByCategory(
  categorySlug: string, 
  page = 1, 
  limit = DEFAULT_PAGE_SIZE
): Promise<Product[]> {
  try {
    const skip = (page - 1) * limit;
    
    const dbProducts = await prisma.producto.findMany({
      where: {
        categoria: {
          slug: categorySlug // Buscar por slug de categoría relacionada
        }
      },
      skip,
      take: limit,
      include: defaultProductInclude,
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    return dbProducts.map(formatProductFromDB);
  } catch (error) {
    console.error('Error fetching products by category:', error);
    return [];
  }
}

/**
 * Busca productos por texto en múltiples campos con paginación
 * Implementa búsqueda full-text en nombre, descripción y marca
 */
export async function searchProducts(
  query: string, 
  page = 1, 
  limit = DEFAULT_PAGE_SIZE
): Promise<Product[]> {
  try {
    if (!query.trim()) {
      return [];
    }

    const skip = (page - 1) * limit;
    const searchTerm = query.trim();
    
    const dbProducts = await prisma.producto.findMany({
      where: {
        OR: [ // Buscar en cualquiera de estos campos
          { nombre: { contains: searchTerm, mode: 'insensitive' } }, // Nombre (case-insensitive)
          { descripcion: { contains: searchTerm, mode: 'insensitive' } }, // Descripción
          { marca: { contains: searchTerm, mode: 'insensitive' } }, // Marca
        ]
      },
      skip,
      take: limit,
      include: defaultProductInclude,
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    return dbProducts.map(formatProductFromDB);
  } catch (error) {
    console.error('Error searching products:', error);
    return [];
  }
}

// ===== CONSULTAS DE CATEGORÍAS =====

/**
 * Obtiene todas las categorías con contador de productos
 * Para menús de navegación y filtros
 */
export async function getAllCategories(): Promise<Category[]> {
  try {
    const dbCategories = await prisma.categoria.findMany({
      include: defaultCategoryInclude,
      orderBy: {
        nombre: 'asc' // Ordenar alfabéticamente
      }
    });
    
    return dbCategories.map(formatCategoryFromDB);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

/**
 * Obtiene una categoría específica por slug
 * Para páginas individuales de categoría
 */
export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    const dbCategory = await prisma.categoria.findUnique({
      where: { slug },
      include: defaultCategoryInclude
    });
    
    return dbCategory ? formatCategoryFromDB(dbCategory) : null;
  } catch (error) {
    console.error('Error fetching category by slug:', error);
    return null;
  }
}

/**
 * Obtiene categorías marcadas como populares
 * Para destacar en homepage o secciones especiales
 */
export async function getPopularCategories(limit = DEFAULT_TAKE_LIMIT): Promise<Category[]> {
  try {
    const dbCategories = await prisma.categoria.findMany({
      where: { esPopular: true }, // Campo correcto para categorías populares
      include: defaultCategoryInclude,
      take: limit, // Límite configurable
      orderBy: {
        nombre: 'asc'
      }
    });
    
    return dbCategories.map(formatCategoryFromDB);
  } catch (error) {
    console.error('Error fetching popular categories:', error);
    return [];
  }
}

// ===== FUNCIONES UTILITARIAS ADICIONALES =====

/**
 * Obtiene lista única de todas las marcas disponibles
 * Para filtros y faceted search
 */
export async function getAllBrands(): Promise<string[]> {
  try {
    const brands = await prisma.producto.findMany({
      select: { marca: true }, // Solo seleccionar campo marca
      distinct: ['marca'], // Valores únicos solamente
      where: {
        marca: {
          not: null // Excluir marcas null
        }
      }
    });
    
    return brands
      .map(b => b.marca) // Extraer string de marca
      .filter((marca): marca is string => marca !== null && marca.trim() !== '') // Filtrar nulls y strings vacíos
      .sort(); // Ordenar alfabéticamente
  } catch (error) {
    console.error('Error fetching brands:', error);
    return [];
  }
}

/**
 * Obtiene el rango de precios (mínimo y máximo) de todos los productos
 * Para sliders de precio en filtros
 */
export async function getPriceRange(): Promise<{ min: number; max: number }> {
  try {
    const result = await prisma.producto.aggregate({
      _min: { precio: true }, // Precio mínimo
      _max: { precio: true }  // Precio máximo
    });
    
    return {
      min: result._min.precio?.toNumber() || DEFAULT_PRICE_RANGE.min, // Convertir Decimal y fallback
      max: result._max.precio?.toNumber() || DEFAULT_PRICE_RANGE.max
    };
  } catch (error) {
    console.error('Error fetching price range:', error);
    return DEFAULT_PRICE_RANGE; // Valores por defecto
  }
}

/**
 * Obtiene productos que están en oferta/descuento con paginación
 * Identifica productos con precio anterior (precioAnterior no null)
 */
export async function getProductsOnSale(
  page = 1, 
  limit = DEFAULT_PAGE_SIZE
): Promise<Product[]> {
  try {
    const skip = (page - 1) * limit;
    
    const dbProducts = await prisma.producto.findMany({
      where: {
        precioAnterior: {
          not: null // Solo productos con precio anterior definido
        }
      },
      skip,
      take: limit,
      include: defaultProductInclude,
      orderBy: [
        {
          // Ordenar por mayor descuento primero
          precioAnterior: 'desc'
        },
        {
          createdAt: 'desc'
        }
      ]
    });
    
    return dbProducts.map(formatProductFromDB);
  } catch (error) {
    console.error('Error fetching products on sale:', error);
    return [];
  }
}

/**
 * Obtiene productos filtrados por múltiples criterios
 * Función avanzada para filtrado complejo
 */
export async function getFilteredProducts({
  categorySlug,
  brand,
  minPrice,
  maxPrice,
  inStock = true,
  page = 1,
  limit = DEFAULT_PAGE_SIZE,
  sortBy = 'newest'
}: {
  categorySlug?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  page?: number;
  limit?: number;
  sortBy?: 'newest' | 'oldest' | 'price_asc' | 'price_desc' | 'name_asc' | 'name_desc';
}): Promise<Product[]> {
  try {
    const skip = (page - 1) * limit;
    
    // Construir filtros dinámicamente
    const whereClause: any = {};
    
    if (categorySlug) {
      whereClause.categoria = { slug: categorySlug };
    }
    
    if (brand) {
      whereClause.marca = { equals: brand, mode: 'insensitive' };
    }
    
    if (minPrice !== undefined || maxPrice !== undefined) {
      whereClause.precio = {};
      if (minPrice !== undefined) whereClause.precio.gte = minPrice;
      if (maxPrice !== undefined) whereClause.precio.lte = maxPrice;
    }
    
    if (inStock) {
      whereClause.stock = { gt: 0 };
    }
    
    // Construir ordenamiento dinámicamente
    let orderBy: any = { createdAt: 'desc' }; // Por defecto
    
    switch (sortBy) {
      case 'oldest':
        orderBy = { createdAt: 'asc' };
        break;
      case 'price_asc':
        orderBy = { precio: 'asc' };
        break;
      case 'price_desc':
        orderBy = { precio: 'desc' };
        break;
      case 'name_asc':
        orderBy = { nombre: 'asc' };
        break;
      case 'name_desc':
        orderBy = { nombre: 'desc' };
        break;
    }
    
    const dbProducts = await prisma.producto.findMany({
      where: whereClause,
      skip,
      take: limit,
      include: defaultProductInclude,
      orderBy
    });
    
    return dbProducts.map(formatProductFromDB);
  } catch (error) {
    console.error('Error fetching filtered products:', error);
    return [];
  }
}