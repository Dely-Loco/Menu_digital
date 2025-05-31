// src/lib/queries.ts
import { prisma } from "./prisma";
import type {
  Product,
  Category,
  ProductImage, // Necesaria para el mapeo correcto
  DBProduct,    // Para tipar correctamente los datos de Prisma
  DBCategory,   // Para tipar correctamente los datos de Prisma
  DBImage       // Para tipar correctamente los datos de Prisma
} from "@/types";

// ===== CONSTANTES GLOBALES =====

const DEFAULT_PRODUCT_IMAGE_URL = 'https://placehold.co/600x600.png';
const DEFAULT_CATEGORY_IMAGE_URL = 'https://placehold.co/400x300.png';

// Helper para convertir Prisma Decimal a número de forma segura
function toNumber(value: any): number | undefined {
  if (value === null || value === undefined) return undefined;
  const num = parseFloat(value.toString());
  return isNaN(num) ? undefined : num;
}

const defaultProductInclude = {
  imagenes: {
    orderBy: {
      orden: 'asc', // Asegurar que la imagen primaria (orden 0) venga primero
    },
  },
  categoria: true, // Incluye el objeto categoría completo
} as const;

const defaultCategoryInclude = {
  _count: {
    select: { productos: true },
  },
} as const;

const DEFAULT_TAKE_LIMIT = 8;
const DEFAULT_PAGE_SIZE = 20;

// ===== FUNCIONES HELPER PARA FORMATEO DE DATOS =====

function formatProductImageFromDB(dbImage: DBImage): ProductImage {
  return {
    id: dbImage.id.toString(),
    url: dbImage.url,
    alt: dbImage.alt ?? undefined,
    order: dbImage.orden,
    isPrimary: dbImage.orden === 0,
  };
}

function formatCategoryFromDB(dbCategory: DBCategory): Category {
  return {
    id: dbCategory.id.toString(),
    name: dbCategory.nombre,
    slug: dbCategory.slug,
    description: dbCategory.descripcion ?? undefined,
    image: dbCategory.imagen ?? DEFAULT_CATEGORY_IMAGE_URL,
    dataAiHint: (dbCategory.nombre || '').toLowerCase(),
    icon: dbCategory.icono ?? '📦',
    color: dbCategory.color ?? '#6B7280',
    productsCount: dbCategory._count?.productos ?? 0,
    isPopular: dbCategory.esPopular,
    createdAt: dbCategory.creadoEn.toISOString(), // Mapeo de creadoEn a createdAt
  };
}

/**
 * Convierte un producto de la base de datos al tipo Product de la aplicación.
 * Transforma los nombres de campos en español de la BD a inglés para el frontend.
 */
function formatProductFromDB(dbProduct: DBProduct): Product | null {
  const price = toNumber(dbProduct.precio);
  const originalPrice = toNumber(dbProduct.precioAnterior);

  let discountPercentage: number | undefined = undefined;
  if (originalPrice !== undefined && originalPrice > 0 && price !== undefined) {
    if (price < originalPrice) {
        discountPercentage = Math.round((1 - price / originalPrice) * 100);
    } else {
        discountPercentage = 0;
    }
  }

  const images: ProductImage[] = dbProduct.imagenes?.length
    ? dbProduct.imagenes.map(formatProductImageFromDB)
    : [{
        id: 'default-0',
        url: DEFAULT_PRODUCT_IMAGE_URL,
        alt: dbProduct.nombre || 'Default product image',
        order: 0,
        isPrimary: true,
      }];

  return {
    id: dbProduct.id.toString(),
    name: dbProduct.nombre,
    slug: dbProduct.slug,
    description: dbProduct.descripcion,
    shortDescription: dbProduct.descripcionCorta ??
      (dbProduct.descripcion ? dbProduct.descripcion.substring(0, 100) + '...' : undefined),
    technicalSpec: dbProduct.especificacionesTecnicas ?? undefined,
    
    price: price ?? 0,
    originalPrice: originalPrice,
    discountPercentage: discountPercentage,
    
    category: dbProduct.categoria ? formatCategoryFromDB(dbProduct.categoria) : undefined,
    categorySlug: dbProduct.categoria?.slug,
    brand: dbProduct.marca ?? undefined,
    
    images: images,
    rating: toNumber(dbProduct.calificacion) ?? 0, // USA calificacion DE DBProduct
    reviewsCount: dbProduct.numeroReviews,
    
    stock: dbProduct.stock,
    isFeatured: dbProduct.destacado,
    isNew: dbProduct.esNuevo,
    isBestseller: dbProduct.masVendido,
    tags: dbProduct.etiquetas || [], // USA etiquetas DE DBProduct
    dataAiHint: (dbProduct.nombre || '').toLowerCase(),
    
    features: dbProduct.caracteristicas || [],
    colors: dbProduct.colores?.length ? dbProduct.colores : [],
    dimensions: dbProduct.dimensiones ?? undefined,
    weight: dbProduct.peso ?? undefined,
    warranty: dbProduct.garantia ?? undefined,
    
    shippingInfo: 'Free shipping, arrives in 2-3 days',
    inWishlist: false,
    compareCount: 0,
    reviews: [],
    createdAt: dbProduct.creadoEn.toISOString(), // USA creadoEn DE DBProduct
  };
}


// ===== CONSULTAS DE PRODUCTOS =====

export async function getAllProducts(page = 1, limit = DEFAULT_PAGE_SIZE): Promise<Product[]> {
  try {
    const skip = (page - 1) * limit;
    const dbProducts = await prisma.producto.findMany({
      skip,
      take: limit,
      include: defaultProductInclude,
      orderBy: { creadoEn: 'desc' }, // USA creadoEn
    });
    return dbProducts.map(p => formatProductFromDB(p as DBProduct)).filter(Boolean) as Product[];
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export async function getTotalProductsCount(): Promise<number> {
  try {
    return await prisma.producto.count();
  } catch (error) {
    console.error('Error counting products:', error);
    return 0;
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const dbProduct = await prisma.producto.findUnique({
      where: { slug },
      include: defaultProductInclude,
    });
    if (!dbProduct) return null;
    return formatProductFromDB(dbProduct as DBProduct);
  } catch (error) {
    console.error('Error fetching product by slug:', error);
    return null;
  }
}

export async function getFeaturedProducts(limit = DEFAULT_TAKE_LIMIT): Promise<Product[]> {
  try {
    const dbProducts = await prisma.producto.findMany({
      where: { destacado: true },
      include: defaultProductInclude,
      take: limit,
      orderBy: { creadoEn: 'desc' }, // USA creadoEn
    });
    return dbProducts.map(p => formatProductFromDB(p as DBProduct)).filter(Boolean) as Product[];
  } catch (error) {
    console.error('Error fetching featured products:', error);
    return [];
  }
}

export async function getNewProducts(limit = DEFAULT_TAKE_LIMIT): Promise<Product[]> {
  try {
    const dbProductsNuevos = await prisma.producto.findMany({
      where: { esNuevo: true },
      include: defaultProductInclude,
      take: limit,
      orderBy: { creadoEn: 'desc' }, // USA creadoEn
    });
    return dbProductsNuevos.map(p => formatProductFromDB(p as DBProduct)).filter(Boolean) as Product[];
  } catch (error) {
    console.error('Error fetching new products:', error);
    return [];
  }
}

export async function getBestsellerProducts(limit = DEFAULT_TAKE_LIMIT): Promise<Product[]> {
  try {
    const dbProductsVendidos = await prisma.producto.findMany({
      where: { masVendido: true },
      include: defaultProductInclude,
      take: limit,
      orderBy: { creadoEn: 'desc' }, // USA creadoEn
    });
    return dbProductsVendidos.map(p => formatProductFromDB(p as DBProduct)).filter(Boolean) as Product[];
  } catch (error) {
    console.error('Error fetching bestseller products:', error);
    return [];
  }
}

export async function getProductsByCategory(
  categorySlug: string,
  page = 1,
  limit = DEFAULT_PAGE_SIZE
): Promise<Product[]> {
  try {
    const skip = (page - 1) * limit;
    const dbProducts = await prisma.producto.findMany({
      where: {
        categoria: { slug: categorySlug }
      },
      skip,
      take: limit,
      include: defaultProductInclude,
      orderBy: { creadoEn: 'desc' }, // USA creadoEn
    });
    return dbProducts.map(p => formatProductFromDB(p as DBProduct)).filter(Boolean) as Product[];
  } catch (error) {
    console.error('Error fetching products by category:', error);
    return [];
  }
}

export async function searchProducts(
  query: string,
  page = 1,
  limit = DEFAULT_PAGE_SIZE
): Promise<Product[]> {
  try {
    if (!query.trim()) return [];
    const skip = (page - 1) * limit;
    const searchTerm = query.trim();
    const dbProducts = await prisma.producto.findMany({
      where: {
        OR: [
          { nombre: { contains: searchTerm, mode: 'insensitive' } },
          { descripcion: { contains: searchTerm, mode: 'insensitive' } },
          { marca: { contains: searchTerm, mode: 'insensitive' } },
          { etiquetas: { has: searchTerm } } // USA etiquetas
        ]
      },
      skip,
      take: limit,
      include: defaultProductInclude,
      orderBy: { creadoEn: 'desc' }, // USA creadoEn
    });
    return dbProducts.map(p => formatProductFromDB(p as DBProduct)).filter(Boolean) as Product[];
  } catch (error) {
    console.error('Error searching products:', error);
    return [];
  }
}