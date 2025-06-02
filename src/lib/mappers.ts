// src/lib/mappers.ts
import {
  Categoria as PrismaCategoria,
  Producto as PrismaProducto,
  Imagen as PrismaImagen,
  Prisma // Importa el namespace Prisma
} from '@prisma/client';
import type { Category, Product, ProductImage, } from '@/types';

// Helper para convertir Prisma Decimal a número de forma segura
// Refinamos el tipo de 'value'
function toNumber(value: string | number | Prisma.Decimal | null | undefined): number | undefined {
  if (value === null || value === undefined) return undefined;
  const num = parseFloat(value.toString()); // Prisma.Decimal tiene un método .toString()
  return isNaN(num) ? undefined : num;
}

const DEFAULT_PRODUCT_IMAGE_URL = 'https://placehold.co/600x600.png';
const DEFAULT_CATEGORY_IMAGE_URL = 'https://placehold.co/400x300.png';

// Tipo para un objeto Categoria de Prisma que incluye el conteo de productos
type PrismaCategoriaWithCount = PrismaCategoria & { _count?: { productos: number } };

// Tipo para un objeto Producto de Prisma que incluye las relaciones categoria e imagenes
// y donde la categoría también puede tener el conteo.
type PrismaProductoWithRelations = PrismaProducto & { 
  categoria?: PrismaCategoriaWithCount | null; 
  imagenes?: PrismaImagen[]; 
};

export function formatProductImageFromDB(dbImage: PrismaImagen): ProductImage { // Usamos PrismaImagen
  return {
    id: dbImage.id.toString(),
    url: dbImage.url,
    alt: dbImage.alt ?? undefined,
    order: dbImage.orden,
    isPrimary: dbImage.orden === 0,
  };
}

export function formatCategoryFromDB(dbCategory: PrismaCategoriaWithCount): Category { // Usamos el tipo específico
  return {
    id: dbCategory.id.toString(),
    name: dbCategory.nombre,
    slug: dbCategory.slug,
    description: dbCategory.descripcion ?? undefined,
    image: dbCategory.imagen ?? DEFAULT_CATEGORY_IMAGE_URL,
    icon: dbCategory.icono ?? undefined, 
    color: dbCategory.color ?? undefined,
    productsCount: dbCategory._count?.productos ?? 0,
    isPopular: dbCategory.esPopular,
    createdAt: dbCategory.creadoEn.toISOString(),
    dataAiHint: (dbCategory.nombre || '').toLowerCase(),
  };
}

export function formatProductFromDB(dbProduct: PrismaProductoWithRelations): Product | null { // Usamos el tipo específico
  if (!dbProduct) return null;

  const price = toNumber(dbProduct.precio); // precio es Decimal
  const originalPrice = toNumber(dbProduct.precioAnterior); // precioAnterior es Decimal?
  let discountPercentage: number | undefined = undefined;

  if (originalPrice !== undefined && originalPrice > 0 && price !== undefined) {
    if (price < originalPrice) {
      discountPercentage = Math.round(((originalPrice - price) / originalPrice) * 100);
    } else {
      discountPercentage = 0;
    }
  }

  const images: ProductImage[] = dbProduct.imagenes?.length
    ? dbProduct.imagenes.map(formatProductImageFromDB)
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
    category: dbProduct.categoria ? formatCategoryFromDB(dbProduct.categoria) : undefined,
    categorySlug: dbProduct.categoria?.slug,
    brand: dbProduct.marca ?? undefined,
    images: images,
    rating: toNumber(dbProduct.calificacion) ?? 0, // calificacion es Decimal?
    reviewsCount: dbProduct.numeroReviews,
    stock: dbProduct.stock,
    isFeatured: dbProduct.destacado,
    isNew: dbProduct.esNuevo,
    isBestseller: dbProduct.masVendido,
    tags: dbProduct.etiquetas || [],
    features: dbProduct.caracteristicas || [],
    colors: dbProduct.colores || [],
    dimensions: dbProduct.dimensiones ?? undefined,
    weight: dbProduct.peso ?? undefined,
    warranty: dbProduct.garantia ?? undefined,
    createdAt: dbProduct.creadoEn.toISOString(),
    dataAiHint: (dbProduct.nombre || '').toLowerCase().substring(0,50),
    shippingInfo: 'Envío estándar gratuito (2-5 días)',
    inWishlist: false, 
    compareCount: 0,
    reviews: [],
  };
}

export function mapCategorias(prismaCategorias: PrismaCategoriaWithCount[]): Category[] {
  return prismaCategorias.filter(Boolean).map(formatCategoryFromDB); // No 'as any'
}

export function mapProductos(prismaProductos: PrismaProductoWithRelations[]): Product[] {
  return prismaProductos.filter(Boolean).map(formatProductFromDB).filter(Boolean) as Product[]; // No 'as any' en map, el filter(Boolean) al final es para los null de formatProductFromDB
}