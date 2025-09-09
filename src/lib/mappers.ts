// src/lib/mappers.ts
import { Prisma } from '@prisma/client';
import type { Category, Plato as PlatoType, ProductImage } from '@/types';

// Helper para convertir Prisma Decimal a número
function toNumber(value: string | number | Prisma.Decimal | null | undefined): number | undefined {
  if (value === null || value === undefined) return undefined;
  const num = parseFloat(value.toString());
  return isNaN(num) ? undefined : num;
}

const DEFAULT_PRODUCT_IMAGE_URL = 'https://placehold.co/600x600.png';
const DEFAULT_CATEGORY_IMAGE_URL = 'https://placehold.co/400x300.png';

// Definimos nuestros propios tipos basados en el schema de Prisma
type DBCategoria = {
  id: number;
  nombre: string;
  slug: string;
  descripcion: string | null;
  imagen: string | null;
  esPopular: boolean | null;
  creadoEn: Date;
};

type DBPlato = {
  id: number;
  nombre: string;
  slug: string;
  descripcion: string;
  descripcionCorta: string | null;
  precio: Prisma.Decimal;
  precioAnterior: Prisma.Decimal | null;
  disponible: boolean;
  destacado: boolean;
  etiquetas: string[];
  creadoEn: Date;
  categoriaId: number | null;
};

type DBImagen = {
  id: number;
  url: string;
  alt: string | null;
  orden: number;
  platoId: number | null;
};

// Tipos con relaciones
type PrismaCategoriaWithCount = DBCategoria & { 
  _count?: { platos: number };
};

type PrismaPlatoWithRelations = DBPlato & {
  categoria?: PrismaCategoriaWithCount | null;
  imagenes?: DBImagen[];
};

// ---- FORMATTERS ----
export function formatPlatoImageFromDB(dbImage: DBImagen): ProductImage {
  return {
    id: dbImage.id.toString(),
    url: dbImage.url,
    alt: dbImage.alt ?? undefined,
    order: dbImage.orden,
    isPrimary: dbImage.orden === 0,
  };
}

export function formatCategoriaFromDB(dbCategory: PrismaCategoriaWithCount): Category {
  return {
    id: dbCategory.id.toString(),
    name: dbCategory.nombre,
    slug: dbCategory.slug,
    description: dbCategory.descripcion ?? undefined,
    image: dbCategory.imagen ?? DEFAULT_CATEGORY_IMAGE_URL,
    platosCount: dbCategory._count?.platos ?? 0,
    isPopular: dbCategory.esPopular ?? false,
    createdAt: dbCategory.creadoEn.toISOString(),
  };
}

export function formatPlatoFromDB(dbPlato: PrismaPlatoWithRelations): PlatoType | null {
  if (!dbPlato) return null;

  const images: ProductImage[] = dbPlato.imagenes?.length
    ? dbPlato.imagenes.map(formatPlatoImageFromDB)
    : [{
        id: 'default-placeholder-0',
        url: DEFAULT_PRODUCT_IMAGE_URL,
        alt: dbPlato.nombre || 'Imagen de plato por defecto',
        order: 0,
        isPrimary: true,
      }];

  const precio = toNumber(dbPlato.precio) ?? 0;
  const precioAnterior = toNumber(dbPlato.precioAnterior);

  return {
    id: dbPlato.id.toString(),
    name: dbPlato.nombre,
    slug: dbPlato.slug,
    description: dbPlato.descripcion,
    shortDescription: dbPlato.descripcionCorta ?? (dbPlato.descripcion ? dbPlato.descripcion.substring(0, 120) + '...' : undefined),
    price: precio,
    originalPrice: precioAnterior,
    discountPercentage: precioAnterior && precioAnterior > precio
      ? Math.round(((precioAnterior - precio) / precioAnterior) * 100)
      : undefined,
    available: dbPlato.disponible,
    isFeatured: dbPlato.destacado,
    category: dbPlato.categoria ? formatCategoriaFromDB(dbPlato.categoria) : undefined,
    categorySlug: dbPlato.categoria?.slug,
    images,
    tags: dbPlato.etiquetas || [],
    createdAt: dbPlato.creadoEn.toISOString(),
    
    // Valores opcionales para frontend
    inWishlist: false,
  };
}

// ---- MAP FUNCTIONS ----
export function mapCategorias(prismaCategorias: PrismaCategoriaWithCount[]): Category[] {
  return prismaCategorias.filter(Boolean).map(formatCategoriaFromDB);
}

export function mapPlatos(prismaPlatos: PrismaPlatoWithRelations[]): PlatoType[] {
  return prismaPlatos.filter(Boolean).map(formatPlatoFromDB).filter(Boolean) as PlatoType[];
}

// ---- UTILITY FUNCTIONS ----

/**
 * Convierte un array de platos de DB con sus relaciones incluidas
 */
export function mapPlatosWithIncludes(
  prismaPlatos: (DBPlato & {
    categoria?: DBCategoria | null;
    imagenes?: DBImagen[];
  })[]
): PlatoType[] {
  return prismaPlatos.map(plato => formatPlatoFromDB(plato)).filter(Boolean) as PlatoType[];
}

/**
 * Convierte una categoría individual de DB
 */
export function mapSingleCategoria(prismaCategoria: PrismaCategoriaWithCount | null): Category | null {
  if (!prismaCategoria) return null;
  return formatCategoriaFromDB(prismaCategoria);
}

/**
 * Convierte un plato individual de DB
 */
export function mapSinglePlato(prismaPlato: PrismaPlatoWithRelations | null): PlatoType | null {
  if (!prismaPlato) return null;
  return formatPlatoFromDB(prismaPlato);
}

/**
 * Helper para crear query includes comunes de Prisma
 */
export const commonIncludes = {
  plato: {
    categoria: {
      include: {
        _count: {
          select: { platos: true }
        }
      }
    },
    imagenes: {
      orderBy: { orden: 'asc' as const }
    }
  },
  categoria: {
    _count: {
      select: { platos: true }
    }
  }
} as const;