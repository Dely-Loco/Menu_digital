// src/lib/queries.ts
import { prisma } from "./prisma";

// Importamos solo los tipos que necesitamos de nuestros types
type PlatoType = {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription?: string;
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  available: boolean;
  isFeatured: boolean;
  category?: CategoryType;
  categorySlug?: string;
  images: ImageType[];
  tags: string[];
  createdAt: string;
  inWishlist?: boolean;
};

type CategoryType = {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  platosCount?: number;
  productsCount?: number; // Alias para compatibilidad
  isPopular?: boolean;
  createdAt: string;
};

type ImageType = {
  id: string;
  url: string;
  alt?: string;
  order: number;
  isPrimary?: boolean;
};

// Constantes
const DEFAULT_TAKE_LIMIT = 8;
const DEFAULT_PAGE_SIZE = 20;
const DEFAULT_PRODUCT_IMAGE_URL = 'https://placehold.co/600x600.png';
const DEFAULT_CATEGORY_IMAGE_URL = 'https://placehold.co/400x300.png';

// Helper para convertir Decimal a number
function convertToNumber(value: unknown): number {
  if (typeof value === 'number') return value;
  if (typeof value === 'string') return parseFloat(value) || 0;
  if (value && typeof value === 'object' && 'toString' in value) {
    return parseFloat(String(value)) || 0;
  }
  return 0;
}

// Configuración de includes
const platoInclude = {
  imagenes: { orderBy: { orden: "asc" as const } },
  categoria: { include: { _count: { select: { platos: true } } } },
} as const;

const categoriaInclude = {
  _count: { select: { platos: true } },
} as const;

// ===== MAPPERS INTERNOS =====
function mapImageFromDB(dbImage: Record<string, unknown>): ImageType {
  return {
    id: String(dbImage?.id || ''),
    url: String(dbImage?.url || DEFAULT_PRODUCT_IMAGE_URL),
    alt: dbImage?.alt ? String(dbImage.alt) : undefined,
    order: Number(dbImage?.orden || 0),
    isPrimary: Number(dbImage?.orden || 0) === 0,
  };
}

function mapCategoriaFromDB(dbCategoria: Record<string, unknown> | null): CategoryType {
  if (!dbCategoria) {
    // En lugar de devolver null, devolvemos un objeto CategoryType por defecto
    return {
      id: '0',
      name: 'Sin categoría',
      slug: 'sin-categoria',
      description: undefined,
      image: DEFAULT_CATEGORY_IMAGE_URL,
      platosCount: 0,
      productsCount: 0,
      isPopular: false,
      createdAt: new Date().toISOString(),
    };
  }
  
  const countData = dbCategoria._count as Record<string, unknown> | undefined;
  const platosCount = countData?.platos ? Number(countData.platos) : 0;
  
  return {
    id: String(dbCategoria.id),
    name: String(dbCategoria.nombre || ''),
    slug: String(dbCategoria.slug || ''),
    description: dbCategoria.descripcion ? String(dbCategoria.descripcion) : undefined,
    image: String(dbCategoria.imagen || DEFAULT_CATEGORY_IMAGE_URL),
    platosCount,
    productsCount: platosCount,
    isPopular: false,
    createdAt: dbCategoria.creadoEn ? new Date(String(dbCategoria.creadoEn)).toISOString() : new Date().toISOString(),
  };
}

function mapPlatoFromDB(dbPlato: Record<string, unknown> | null): PlatoType {
  if (!dbPlato) {
    // En lugar de devolver null, devolvemos un objeto PlatoType por defecto
    return {
      id: '0',
      name: 'Plato no disponible',
      slug: 'plato-no-disponible',
      description: 'Este plato no está disponible',
      price: 0,
      available: false,
      isFeatured: false,
      images: [{
        id: 'default-0',
        url: DEFAULT_PRODUCT_IMAGE_URL,
        alt: 'Imagen por defecto',
        order: 0,
        isPrimary: true,
      }],
      tags: [],
      createdAt: new Date().toISOString(),
      inWishlist: false,
    };
  }

  // Procesar imágenes
  const imagenesData = Array.isArray(dbPlato.imagenes) ? dbPlato.imagenes : [];
  const images: ImageType[] = imagenesData.length > 0
    ? imagenesData.map(img => mapImageFromDB(img as Record<string, unknown>))
    : [{
        id: 'default-0',
        url: DEFAULT_PRODUCT_IMAGE_URL,
        alt: String(dbPlato.nombre || 'Imagen por defecto'),
        order: 0,
        isPrimary: true,
      }];

  // Procesar precios
  const precio = convertToNumber(dbPlato.precio);
  const precioAnterior = dbPlato.precioAnterior ? convertToNumber(dbPlato.precioAnterior) : undefined;

  // Calcular descuento
  const discountPercentage = precioAnterior && precioAnterior > precio && precio > 0
    ? Math.round(((precioAnterior - precio) / precioAnterior) * 100)
    : undefined;

  // Procesar categoría
  const categoria = dbPlato.categoria ? mapCategoriaFromDB(dbPlato.categoria as Record<string, unknown>) : undefined;

  return {
    id: String(dbPlato.id),
    name: String(dbPlato.nombre || ''),
    slug: String(dbPlato.slug || ''),
    description: String(dbPlato.descripcion || ''),
    shortDescription: dbPlato.descripcionCorta ? String(dbPlato.descripcionCorta) : undefined,
    price: precio,
    originalPrice: precioAnterior,
    discountPercentage,
    available: Boolean(dbPlato.disponible),
    isFeatured: Boolean(dbPlato.destacado),
    category: categoria,
    categorySlug: categoria?.slug,
    images,
    tags: Array.isArray(dbPlato.etiquetas) ? dbPlato.etiquetas.map(String) : [],
    createdAt: dbPlato.creadoEn ? new Date(String(dbPlato.creadoEn)).toISOString() : new Date().toISOString(),
    inWishlist: false,
  };
}

// ===== CONSULTAS PRINCIPALES =====

export async function getAllPlatos(
  page = 1,
  limit = DEFAULT_PAGE_SIZE
): Promise<PlatoType[]> {
  try {
    const skip = (page - 1) * limit;
    const dbPlatos = await prisma.plato.findMany({
      skip,
      take: limit,
      include: platoInclude,
      orderBy: { creadoEn: "desc" },
    });
    
    return dbPlatos
      .map(plato => mapPlatoFromDB(plato as Record<string, unknown>))
      .filter((plato): plato is PlatoType => plato !== null);
  } catch (error) {
    console.error("Error fetching all platos:", error);
    return [];
  }
}

export async function getTotalPlatosCount(): Promise<number> {
  try {
    return await prisma.plato.count();
  } catch (error) {
    console.error("Error counting platos:", error);
    return 0;
  }
}

export async function getPlatoBySlug(slug: string): Promise<PlatoType | null> {
  try {
    const dbPlato = await prisma.plato.findUnique({
      where: { slug },
      include: platoInclude,
    });
    return mapPlatoFromDB(dbPlato as Record<string, unknown> | null);
  } catch (error) {
    console.error(`Error fetching plato by slug (${slug}):`, error);
    return null;
  }
}

export async function getPlatoById(id: number): Promise<PlatoType | null> {
  try {
    const dbPlato = await prisma.plato.findUnique({
      where: { id },
      include: platoInclude,
    });
    return mapPlatoFromDB(dbPlato as Record<string, unknown> | null);
  } catch (error) {
    console.error(`Error fetching plato by id (${id}):`, error);
    return null;
  }
}

export async function getFeaturedPlatos(
  limit = DEFAULT_TAKE_LIMIT
): Promise<PlatoType[]> {
  try {
    const dbPlatos = await prisma.plato.findMany({
      where: { 
        destacado: true, 
        disponible: true 
      },
      include: platoInclude,
      take: limit,
      orderBy: { creadoEn: "desc" },
    });
    
    return dbPlatos
      .map(plato => mapPlatoFromDB(plato as Record<string, unknown>))
      .filter((plato): plato is PlatoType => plato !== null);
  } catch (error) {
    console.error("Error fetching featured platos:", error);
    return [];
  }
}

export async function getAvailablePlatos(
  limit = DEFAULT_PAGE_SIZE
): Promise<PlatoType[]> {
  try {
    const dbPlatos = await prisma.plato.findMany({
      where: { disponible: true },
      include: platoInclude,
      take: limit,
      orderBy: { creadoEn: "desc" },
    });
    
    return dbPlatos
      .map(plato => mapPlatoFromDB(plato as Record<string, unknown>))
      .filter((plato): plato is PlatoType => plato !== null);
  } catch (error) {
    console.error("Error fetching available platos:", error);
    return [];
  }
}

export async function getRecentPlatos(
  limit = DEFAULT_TAKE_LIMIT
): Promise<PlatoType[]> {
  try {
    const dbPlatos = await prisma.plato.findMany({
      where: { disponible: true },
      include: platoInclude,
      take: limit,
      orderBy: { creadoEn: "desc" },
    });
    
    return dbPlatos
      .map(plato => mapPlatoFromDB(plato as Record<string, unknown>))
      .filter((plato): plato is PlatoType => plato !== null);
  } catch (error) {
    console.error("Error fetching recent platos:", error);
    return [];
  }
}

// ===== CONSULTAS DE CATEGORÍAS =====

export async function getAllCategorias(): Promise<CategoryType[]> {
  try {
    const dbCategorias = await prisma.categoria.findMany({
      include: categoriaInclude,
      orderBy: { nombre: "asc" },
    });
    
    return dbCategorias.map(mapCategoriaFromDB).filter(Boolean);
  } catch (error) {
    console.error("Error fetching all categorias:", error);
    return [];
  }
}

export async function getPopularCategorias(): Promise<CategoryType[]> {
  try {
    const dbCategorias = await prisma.categoria.findMany({
      include: categoriaInclude,
      orderBy: { nombre: "asc" },
      take: 6,
    });
    
    const categorias: CategoryType[] = [];
    
    for (const dbCat of dbCategorias) {
      const mappedCat = mapCategoriaFromDB(dbCat as Record<string, unknown>);
      if (mappedCat) {
        categorias.push(mappedCat);
      }
    }
    
    return categorias;
  } catch (error) {
    console.error("Error fetching popular categorias:", error);
    return [];
  }
}

export async function getCategoriaBySlug(slug: string): Promise<CategoryType | null> {
  try {
    const dbCategoria = await prisma.categoria.findUnique({
      where: { slug },
      include: categoriaInclude,
    });
    return mapCategoriaFromDB(dbCategoria as Record<string, unknown> | null);
  } catch (error) {
    console.error(`Error fetching categoria by slug (${slug}):`, error);
    return null;
  }
}

// ===== CONSULTAS POR CATEGORÍA =====

export async function getPlatosByCategoria(
  categoriaSlug: string,
  page = 1,
  limit = DEFAULT_PAGE_SIZE
): Promise<PlatoType[]> {
  try {
    const skip = (page - 1) * limit;
    const dbPlatos = await prisma.plato.findMany({
      where: {
        categoria: { slug: categoriaSlug },
        disponible: true,
      },
      include: platoInclude,
      skip,
      take: limit,
      orderBy: { creadoEn: "desc" },
    });
    
    return dbPlatos.map(mapPlatoFromDB).filter(Boolean) as PlatoType[];
  } catch (error) {
    console.error(`Error fetching platos by categoria (${categoriaSlug}):`, error);
    return [];
  }
}

export async function getPlatosByCategoriaTotalCount(
  categoriaSlug: string
): Promise<number> {
  try {
    return await prisma.plato.count({
      where: {
        categoria: { slug: categoriaSlug },
        disponible: true,
      },
    });
  } catch (error) {
    console.error(`Error counting platos by categoria (${categoriaSlug}):`, error);
    return 0;
  }
}

// ===== BÚSQUEDA Y FILTROS =====

export async function searchPlatos(
  query: string,
  limit = DEFAULT_PAGE_SIZE
): Promise<PlatoType[]> {
  try {
    const dbPlatos = await prisma.plato.findMany({
      where: {
        AND: [
          { disponible: true },
          {
            OR: [
              { nombre: { contains: query, mode: "insensitive" } },
              { descripcion: { contains: query, mode: "insensitive" } },
              { descripcionCorta: { contains: query, mode: "insensitive" } },
              { etiquetas: { hasSome: [query] } },
            ],
          },
        ],
      },
      include: platoInclude,
      take: limit,
      orderBy: { creadoEn: "desc" },
    });
    
    return dbPlatos.map(mapPlatoFromDB).filter(Boolean) as PlatoType[];
  } catch (error) {
    console.error(`Error searching platos (${query}):`, error);
    return [];
  }
}

export async function getPlatosByPriceRange(
  minPrice: number,
  maxPrice: number,
  limit = DEFAULT_PAGE_SIZE
): Promise<PlatoType[]> {
  try {
    const dbPlatos = await prisma.plato.findMany({
      where: {
        disponible: true,
        precio: {
          gte: minPrice,
          lte: maxPrice,
        },
      },
      include: platoInclude,
      take: limit,
      orderBy: { precio: "asc" },
    });
    
    return dbPlatos.map(mapPlatoFromDB).filter(Boolean) as PlatoType[];
  } catch (error) {
    console.error(`Error fetching platos by price range (${minPrice}-${maxPrice}):`, error);
    return [];
  }
}

export async function getPlatosByTags(
  tags: string[],
  limit = DEFAULT_PAGE_SIZE
): Promise<PlatoType[]> {
  try {
    const dbPlatos = await prisma.plato.findMany({
      where: {
        disponible: true,
        etiquetas: { hasSome: tags },
      },
      include: platoInclude,
      take: limit,
      orderBy: { creadoEn: "desc" },
    });
    
    return dbPlatos.map(mapPlatoFromDB).filter(Boolean) as PlatoType[];
  } catch (error) {
    console.error(`Error fetching platos by tags (${tags.join(", ")}):`, error);
    return [];
  }
}

// ===== ESTADÍSTICAS =====

export async function getMenuStats() {
  try {
    const totalPlatos = await prisma.plato.count();
    const availablePlatos = await prisma.plato.count({ where: { disponible: true } });
    const featuredPlatos = await prisma.plato.count({ where: { destacado: true } });
    const totalCategorias = await prisma.categoria.count();
    
    // Como esPopular no existe, ponemos 0
    const popularCategorias = 0;

    return {
      totalPlatos,
      availablePlatos,
      featuredPlatos,
      totalCategorias,
      popularCategorias,
    };
  } catch (error) {
    console.error("Error fetching menu stats:", error);
    return {
      totalPlatos: 0,
      availablePlatos: 0,
      featuredPlatos: 0,
      totalCategorias: 0,
      popularCategorias: 0,
    };
  }
}