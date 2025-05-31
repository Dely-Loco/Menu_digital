// src/lib/queries.ts
import { prisma } from "./prisma"; // Asumo que este es tu cliente Prisma configurado
import type {
  Product,
  Category,
  ProductImage,
  DBProduct,
  DBCategory,
  DBImage
} from "@/types";
import { mapCategorias } from './mappers'; // IMPORTA mapCategorias

// ===== CONSTANTES GLOBALES =====
const DEFAULT_PRODUCT_IMAGE_URL = 'https://placehold.co/600x600.png';
const DEFAULT_CATEGORY_IMAGE_URL = 'https://placehold.co/400x300.png';

// Helper para convertir Prisma Decimal a número de forma segura
function toNumber(value: any): number | undefined {
  if (value === null || value === undefined) return undefined;
  const num = parseFloat(value.toString());
  return isNaN(num) ? undefined : num;
}

// Definición de qué incluir por defecto al obtener productos
const defaultProductInclude = {
  imagenes: {
    orderBy: {
      orden: 'asc',
    },
  },
  categoria: { // Asegurar que se incluya _count para la categoría si formatCategoryFromDB lo espera
    include: {
      _count: {
        select: { productos: true }
      }
    }
  },
} as const;

// Definición de qué incluir por defecto al obtener categorías (para productsCount)
const defaultCategoryInclude = {
  _count: {
    select: { productos: true },
  },
} as const;

const DEFAULT_TAKE_LIMIT = 8;
const DEFAULT_PAGE_SIZE = 20;

// ===== FUNCIONES HELPER PARA FORMATEO DE DATOS (Mapeo de DB a Tipos de App) =====

// Estas funciones de formato son excelentes. Convierten los datos de la estructura de Prisma
// (con nombres en español y tipos de Prisma) a la estructura de tus tipos de aplicación
// (con nombres en inglés y tipos de JavaScript/TypeScript más estándar).

function formatProductImageFromDB(dbImage: DBImage): ProductImage {
  return {
    id: dbImage.id.toString(),
    url: dbImage.url,
    alt: dbImage.alt ?? undefined,
    order: dbImage.orden,
    isPrimary: dbImage.orden === 0,
  };
}

function formatCategoryFromDB(dbCategory: DBCategory & { _count?: { productos: number } }): Category {
  // Asegúrate que DBCategory en @/types/index.ts tenga creadoEn y los campos que usas aquí.
  // Tu DBCategory ya los tiene.
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
    // subcategories y featuredProducts no se mapean aquí por defecto
  };
}

function formatProductFromDB(
  // El producto de la DB puede tener categoria e imagenes opcionalmente, según el include
  dbProduct: DBProduct & { 
    categoria?: DBCategory & { _count?: { productos: number } } | null; 
    imagenes?: DBImage[]; 
  }
): Product | null {
  // Tu lógica de validación o manejo de errores si dbProduct es null podría ir aquí,
  // aunque las funciones que llaman a esto ya suelen verificar si dbProduct existe.

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
    ? dbProduct.imagenes.map(formatProductImageFromDB)
    : [{
        id: 'default-placeholder-0', // ID único para la imagen placeholder
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
    shortDescription: dbProduct.descripcionCorta ??
      (dbProduct.descripcion ? dbProduct.descripcion.substring(0, 120) + '...' : undefined), // Ajustado longitud
    technicalSpec: dbProduct.especificacionesTecnicas ?? undefined,
    
    price: price ?? 0,
    originalPrice: originalPrice,
    discountPercentage: discountPercentage,
    
    // Mapea la categoría si existe
    category: dbProduct.categoria ? formatCategoryFromDB(dbProduct.categoria) : undefined,
    categorySlug: dbProduct.categoria?.slug,
    brand: dbProduct.marca ?? undefined,
    
    images: images,
    rating: toNumber(dbProduct.calificacion) ?? 0,
    reviewsCount: dbProduct.numeroReviews,
    
    stock: dbProduct.stock,
    isFeatured: dbProduct.destacado,
    isNew: dbProduct.esNuevo,
    isBestseller: dbProduct.masVendido,
    tags: dbProduct.etiquetas || [],
    dataAiHint: (dbProduct.nombre || '').toLowerCase().substring(0,50), // Limitado para que no sea muy largo
    
    features: dbProduct.caracteristicas || [],
    colors: dbProduct.colores || [], // Asumimos que ya es string[] desde Prisma
    dimensions: dbProduct.dimensiones ?? undefined,
    weight: dbProduct.peso ?? undefined,
    warranty: dbProduct.garantia ?? undefined,
    
    // Campos que Product tiene pero que se definen por defecto o en otro lado
    shippingInfo: 'Envío estándar gratuito (2-5 días)', // Ejemplo
    inWishlist: false, 
    compareCount: 0,
    reviews: [], // Las reseñas detalladas se cargarían por separado
    createdAt: dbProduct.creadoEn.toISOString(),
  };
}


// ===== CONSULTAS DE PRODUCTOS (EXISTENTES Y CORRECTAS) =====

export async function getAllProducts(page = 1, limit = DEFAULT_PAGE_SIZE): Promise<Product[]> {
  try {
    const skip = (page - 1) * limit;
    const dbProducts = await prisma.producto.findMany({
      skip,
      take: limit,
      include: defaultProductInclude,
      orderBy: { creadoEn: 'desc' },
    });
    // El tipo de 'p' aquí es DBProduct & { categoria, imagenes }
    return dbProducts.map(p => formatProductFromDB(p)).filter(Boolean) as Product[];
  } catch (error) {
    console.error('Error fetching all products:', error);
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
    return formatProductFromDB(dbProduct);
  } catch (error) {
    console.error(`Error fetching product by slug (${slug}):`, error);
    return null;
  }
}

export async function getFeaturedProducts(limit = DEFAULT_TAKE_LIMIT): Promise<Product[]> {
  try {
    const dbProducts = await prisma.producto.findMany({
      where: { destacado: true },
      include: defaultProductInclude,
      take: limit,
      orderBy: { creadoEn: 'desc' } 
    });
    return dbProducts.map(p => formatProductFromDB(p)).filter(Boolean) as Product[];
  } catch (error) {
    console.error('Error fetching featured products:', error);
    return [];
  }
}

// ... (tus otras funciones getNewProducts, getBestsellerProducts, getProductsByCategory, searchProducts están bien)
// Solo asegúrate que todas llamen a formatProductFromDB en el resultado de Prisma.
// Y que los orderBy usen 'creadoEn', 'calificacion', etc. (los nombres de tu esquema Prisma).
// Lo que me enviaste ya tiene esto corregido.

// --- NUEVA FUNCIÓN getAllCategories ---
export async function getAllCategories(): Promise<Category[]> {
  try {
    const dbCategories = await prisma.categoria.findMany({
      include: defaultCategoryInclude, // Para obtener productsCount
      orderBy: {
        // Podrías añadir un campo 'orden' a Categoria si quieres un orden específico
        // o quitar el orderBy si no es necesario, o usar 'nombre'.
        nombre: 'asc', 
      },
    });
    // mapCategorias debería estar en tu archivo mappers.ts
    // y debería usar tu función formatCategoryFromDB internamente.
    // Tu formatCategoryFromDB ya está preparado para recibir el _count.
    return mapCategorias(dbCategories as any); // 'as any' para simplificar si hay quejas de tipo con _count,
                                             // o asegúrate de que el tipo pasado a mapCategorias sea exacto.
                                             // Si mapCategorias espera (DBCategoria & { _count: ... })[], entonces no necesitas 'as any'.
  } catch (error) {
    console.error('Error fetching all categories:', error);
    return [];
  }
}