// src/lib/mappers.ts
import {
  Categoria as PrismaCategoria,
  Producto as PrismaProducto,
  Imagen as PrismaImagen
} from '@prisma/client';
import type { Category, Product, ProductImage, ProductReview, DBCategory, DBProduct, DBImage } from '@/types'; // Importa todos los tipos necesarios

// Helper para convertir Prisma Decimal a número de forma segura
function toNumber(value: any): number | undefined {
  if (value === null || value === undefined) return undefined;
  const num = parseFloat(value.toString());
  return isNaN(num) ? undefined : num;
}

const DEFAULT_PRODUCT_IMAGE_URL = 'https://placehold.co/600x600.png';
const DEFAULT_CATEGORY_IMAGE_URL = 'https://placehold.co/400x300.png';

export function formatProductImageFromDB(dbImage: DBImage): ProductImage {
  return {
    id: dbImage.id.toString(),
    url: dbImage.url,
    alt: dbImage.alt ?? undefined,
    order: dbImage.orden,
    isPrimary: dbImage.orden === 0,
  };
}

export function formatCategoryFromDB(
  dbCategory: DBCategory & { _count?: { productos: number } }
): Category {
  return {
    id: dbCategory.id.toString(),
    name: dbCategory.nombre, // Usa el campo 'nombre' de DBCategory
    slug: dbCategory.slug,
    description: dbCategory.descripcion ?? undefined,
    image: dbCategory.imagen ?? DEFAULT_CATEGORY_IMAGE_URL,
    icon: dbCategory.icono ?? undefined, 
    color: dbCategory.color ?? undefined,
    productsCount: dbCategory._count?.productos ?? 0,
    isPopular: dbCategory.esPopular,
    createdAt: dbCategory.creadoEn.toISOString(), // Usa 'creadoEn' de DBCategory
    dataAiHint: (dbCategory.nombre || '').toLowerCase(),
  };
}

export function formatProductFromDB(
  dbProduct: DBProduct & { 
    categoria?: (DBCategory & { _count?: { productos: number } }) | null; 
    imagenes?: DBImage[]; 
  }
): Product | null {
  if (!dbProduct) return null;

  const price = toNumber(dbProduct.precio);
  const originalPrice = toNumber(dbProduct.precioAnterior);
  let discountPercentage: number | undefined = undefined;

  if (originalPrice !== undefined && originalPrice > 0 && price !== undefined) {
    if (price < originalPrice) {
      discountPercentage = Math.round(((originalPrice - price) / originalPrice) * 100);
    } else {
      discountPercentage = 0;
    }
  }

  const images: ProductImage[] = dbProduct.imagenes?.length
    ? dbProduct.imagenes.map(formatProductImageFromDB) // Usa el mapper de imágenes
    : [{
        id: 'default-placeholder-0',
        url: DEFAULT_PRODUCT_IMAGE_URL,
        alt: dbProduct.nombre || 'Imagen de producto por defecto',
        order: 0,
        isPrimary: true,
      }];

  return {
    id: dbProduct.id.toString(),
    name: dbProduct.nombre,
    slug: dbProduct.slug,
    description: dbProduct.descripcion,
    shortDescription: dbProduct.descripcionCorta ?? (dbProduct.descripcion ? dbProduct.descripcion.substring(0, 120) + '...' : undefined),
    technicalSpec: dbProduct.especificacionesTecnicas ?? undefined,
    price: price ?? 0,
    originalPrice: originalPrice,
    discountPercentage: discountPercentage,
    category: dbProduct.categoria ? formatCategoryFromDB(dbProduct.categoria) : undefined, // Usa el mapper de categoría
    categorySlug: dbProduct.categoria?.slug,
    brand: dbProduct.campoDePrismaQuePuedeSerNull ?? undefined, // Prisma: marca
    images: images, // Ya es ProductImage[]
    rating: toNumber(dbProduct.calificacion) ?? 0, // Prisma: calificacion
    reviewsCount: dbProduct.numeroReviews,
    stock: dbProduct.stock,
    isFeatured: dbProduct.destacado,    // Prisma: destacado
    isNew: dbProduct.esNuevo,          // Prisma: esNuevo
    isBestseller: dbProduct.masVendido,// Prisma: masVendido
    tags: dbProduct.etiquetas || [],     // Prisma: etiquetas
    features: dbProduct.caracteristicas || [], // Prisma: caracteristicas
    colors: dbProduct.colores || [],         // Prisma: colores
    dimensions: dbProduct.dimensiones ?? undefined,
    weight: dbProduct.peso ?? undefined,
    warranty: dbProduct.garantia ?? undefined,
    createdAt: dbProduct.creadoEn.toISOString(), // Prisma: creadoEn
    
    // Campos que tu tipo Product puede tener y no vienen directamente de DBProduct base
    dataAiHint: (dbProduct.nombre || '').toLowerCase().substring(0,50),
    shippingInfo: 'Envío estándar gratuito (2-5 días)',
    inWishlist: false, 
    compareCount: 0,
    reviews: [], // Las reseñas detalladas se cargarían por separado
  };
}

// Funciones para mapear arrays (wrappers)
export function mapCategorias(
  prismaCategorias: (DBCategory & { _count?: { productos: number } })[]
): Category[] {
  // Filtra cualquier null que pueda venir de una relación opcional antes de mapear
  return prismaCategorias.filter(Boolean).map(cat => formatCategoryFromDB(cat as any));
}

export function mapProductos<
  T extends DBProduct & { // T es un tipo que extiende DBProduct
    categoria?: (DBCategory & { _count?: { productos: number } }) | null;
    imagenes?: DBImage[];
  }
>(prismaProductos: T[]): Product[] {
  return prismaProductos.filter(Boolean).map(p => formatProductFromDB(p as any)).filter(Boolean) as Product[];
}