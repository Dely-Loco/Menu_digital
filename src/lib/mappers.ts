// src/lib/mappers.ts 
import {
  Categoria as PrismaCategoria,
  Producto as PrismaProducto,
  Imagen as PrismaImagen
} from '@prisma/client';
import type { Category, Product, ProductImage, ProductReview } from '@/types'; // Asumo que ProductReview también está en tus types

// Helper para convertir Prisma Decimal a número de forma segura
function toNumber(value: any): number | undefined {
  if (value === null || value === undefined) return undefined;
  // Intentar convertir a número, si falla (ej. no es un string numérico válido), devuelve undefined
  const num = parseFloat(value.toString());
  return isNaN(num) ? undefined : num;
}

// Mapper para imágenes de productos
export function mapProductImage(prismaImagen: PrismaImagen): ProductImage {
  return {
    id: prismaImagen.id.toString(),
    url: prismaImagen.url,
    alt: prismaImagen.alt ?? undefined,
    order: prismaImagen.orden,
    isPrimary: prismaImagen.orden === 0,
  };
}

// Mapper para categorías
export function mapCategoria(
  // PrismaCategoria puede venir con _count si se incluye en la consulta
  prismaCategoria: PrismaCategoria & { _count?: { productos: number } }
): Category {
  return {
    id: prismaCategoria.id.toString(),
    name: prismaCategoria.nombre,
    slug: prismaCategoria.slug,
    description: prismaCategoria.descripcion ?? undefined,
    image: prismaCategoria.imagen ?? undefined, // URL de la imagen principal de la categoría
    icon: prismaCategoria.icono ?? undefined,   // Puede ser un emoji, clase de icono, o URL corta
    color: prismaCategoria.color ?? undefined,  // Color representativo
    isPopular: prismaCategoria.esPopular,
    productsCount: prismaCategoria._count?.productos ?? 0,
    createdAt: prismaCategoria.creadoEn.toISOString(), // Campo de Prisma es creadoEn
    dataAiHint: prismaCategoria.nombre.toLowerCase(), // Como lo tenías
    // subcategories y featuredProducts no se mapean aquí por defecto, requerirían lógica adicional
  };
}

// Mapper para productos
export function mapProducto(
  // El tipo base es PrismaProducto, extendido con las relaciones que incluimos
  prismaProducto: PrismaProducto & {
    categoria?: PrismaCategoria | null; // La relación puede ser nula
    imagenes?: PrismaImagen[];          // Puede ser un array vacío o no estar si no se incluye
  }
): Product {
  const price = toNumber(prismaProducto.precio);
  const originalPrice = toNumber(prismaProducto.precioAnterior);

  let discountPercentage: number | undefined = undefined;
  if (originalPrice !== undefined && originalPrice > 0 && price !== undefined) {
    if (price < originalPrice) {
      discountPercentage = Math.round(((originalPrice - price) / originalPrice) * 100);
    } else {
      discountPercentage = 0; // Sin descuento o precio igual/mayor
    }
  }

  // Asegúrate de que tu tipo Product en @/types tenga todos estos campos
  return {
    id: prismaProducto.id.toString(),
    name: prismaProducto.nombre,
    slug: prismaProducto.slug,
    description: prismaProducto.descripcion,
    shortDescription: prismaProducto.descripcionCorta ?? 
      (prismaProducto.descripcion ? prismaProducto.descripcion.substring(0, 120) + '...' : undefined),
    technicalSpec: prismaProducto.especificacionesTecnicas ?? undefined,
    price: price ?? 0, // Default a 0 si el precio no es válido
    originalPrice: originalPrice,
    discountPercentage: discountPercentage,
    category: prismaProducto.categoria ? mapCategoria(prismaProducto.categoria) : undefined,
    categorySlug: prismaProducto.categoria?.slug,
    brand: prismaProducto.marca ?? undefined,
    images: prismaProducto.imagenes?.map(mapProductImage) ?? [], // Mapea a ProductImage[]
    rating: toNumber(prismaProducto.calificacion) ?? 0, // Usa 'calificacion' de Prisma
    reviewsCount: prismaProducto.numeroReviews,
    stock: prismaProducto.stock,
    isFeatured: prismaProducto.destacado,
    isNew: prismaProducto.esNuevo,
    isBestseller: prismaProducto.masVendido,
    tags: prismaProducto.etiquetas || [], // Usa 'etiquetas' de Prisma
    features: prismaProducto.caracteristicas || [],
    colors: prismaProducto.colores || [],
    dimensions: prismaProducto.dimensiones ?? undefined,
    weight: prismaProducto.peso ?? undefined,
    warranty: prismaProducto.garantia ?? undefined,
    createdAt: prismaProducto.creadoEn.toISOString(), // Usa 'creadoEn' de Prisma
    
    // Campos adicionales de tu tipo Product que podrían no venir de este mapeo directo
    dataAiHint: prismaProducto.nombre.toLowerCase().substring(0, 50), // Ejemplo
    shippingInfo: 'Envío estándar gratuito', // Valor por defecto o lógica de negocio
    inWishlist: false, // Usualmente manejado por el estado del cliente
    compareCount: 0,   // Usualmente manejado por el estado del cliente
    reviews: [],       // Las reseñas detalladas se cargarían por separado
  };
}

// Funciones para mapear arrays
export function mapCategorias(
  prismaCategorias: (PrismaCategoria & { _count?: { productos: number } })[]
): Category[] {
  return prismaCategorias.map(mapCategoria);
}

// Función genérica para mapProductos para manejar correctamente los 'includes'
export function mapProductos<
  T extends PrismaProducto & {
    categoria?: PrismaCategoria | null;
    imagenes?: PrismaImagen[];
    // Añade aquí otras relaciones que podrías incluir en el futuro
  }
>(prismaProductos: T[]): Product[] {
  return prismaProductos.map(p => mapProducto(p as any)); // 'as any' aquí puede ser necesario si TypeScript sigue estricto con T y la firma de mapProducto.
                                                          // Una alternativa más segura es asegurar que mapProducto acepte T.
                                                          // O, más explícito: prismaProductos.map(p => mapProducto(p)) si mapProducto acepta bien T.
                                                          // Para la firma actual de mapProducto, esto debería funcionar:
                                                          // return prismaProductos.map(p => mapProducto(p));
}

// Alternativa más simple para mapProductos si mapProducto ya está bien tipado:
// export function mapProductos(
//   prismaProductos: (PrismaProducto & {
//     categoria?: PrismaCategoria | null;
//     imagenes?: PrismaImagen[];
//   })[]
// ): Product[] {
//   return prismaProductos.map(mapProducto);
// }