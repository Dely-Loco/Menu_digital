// src/lib/queries.ts
import { prisma } from "./prisma";
import type { Product, Category, BlogPost } from '@/types';

// Función helper para convertir datos de Prisma a tu tipo Product
function formatProductFromDB(dbProduct: any): Product {
  return {
    id: dbProduct.id.toString(),
    name: dbProduct.nombre,
    slug: dbProduct.slug,
    description: dbProduct.descripcion,
    shortDescription: dbProduct.descripcionCorta || dbProduct.descripcion.substring(0, 100) + '...',
    technicalSpec: dbProduct.especificacionesTecnicas || '',
    price: dbProduct.precio.toNumber(), // Prisma Decimal to number
    originalPrice: dbProduct.precioAnterior?.toNumber() || undefined,
    discountPercentage: dbProduct.precioAnterior ? 
      Math.round((1 - dbProduct.precio.toNumber() / dbProduct.precioAnterior.toNumber()) * 100) : 0,
    category: dbProduct.categoria?.slug || '',
    brand: dbProduct.marca,
    images: dbProduct.imagenes?.map((img: any) => img.url) || ['https://placehold.co/600x600.png'],
    rating: dbProduct.rating?.toNumber() || 4.0,
    reviewsCount: dbProduct.numeroReviews || 0,
    stock: dbProduct.stock,
    isFeatured: dbProduct.destacado || false,
    isNew: dbProduct.esNuevo || false,
    isBestseller: dbProduct.masVendido || false,
    tags: dbProduct.tags || [],
    dataAiHint: dbProduct.nombre.toLowerCase(),
    features: dbProduct.caracteristicas || [],
    colors: dbProduct.colores || ['Default'],
    dimensions: dbProduct.dimensiones || '',
    weight: dbProduct.peso || '',
    warranty: dbProduct.garantia || '1 year',
    shippingInfo: 'Free shipping, arrives in 2-3 days',
    inWishlist: false,
    compareCount: 0,
    reviews: [] // Implementar después si necesitas
  };
}

// Función helper para convertir categoría de DB
function formatCategoryFromDB(dbCategory: any): Category {
  return {
    id: dbCategory.id.toString(),
    name: dbCategory.nombre,
    slug: dbCategory.slug,
    image: dbCategory.imagen || 'https://placehold.co/400x300.png',
    description: dbCategory.descripcion,
    dataAiHint: dbCategory.nombre.toLowerCase(),
    icon: dbCategory.icono || '📦',
    color: dbCategory.color || '#6B7280',
    productsCount: dbCategory._count?.productos || 0,
    isPopular: dbCategory.popular || false
  };
}

// ===== PRODUCTOS =====
export async function getAllProducts(): Promise<Product[]> {
  try {
    const dbProducts = await prisma.producto.findMany({
  include: {
    imagenes: true,
    categoria: true,
  },
  orderBy: {
    createdAt: 'desc', // corregido aquí
  },
});

    
    return dbProducts.map(formatProductFromDB);
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  try {
    const dbProduct = await prisma.producto.findUnique({
      where: { slug },
      include: {
        imagenes: true,
        categoria: true,
      },
    });
    
    return dbProduct ? formatProductFromDB(dbProduct) : undefined;
  } catch (error) {
    console.error('Error fetching product by slug:', error);
    return undefined;
  }
}

export async function getFeaturedProducts(): Promise<Product[]> {
  try {
    const dbProducts = await prisma.producto.findMany({
      where: { destacado: true },
      include: {
        imagenes: true,
        categoria: true,
      },
      take: 8
    });
    
    return dbProducts.map(formatProductFromDB);
  } catch (error) {
    console.error('Error fetching featured products:', error);
    return [];
  }
}

export async function getNewProducts(): Promise<Product[]> {
  try {
    const dbProductsNuevos = await prisma.producto.findMany({
  where: { esNuevo: true },
  include: {
    imagenes: true,
    categoria: true,
  },
  take: 8,
});
    
    return dbProductsNuevos.map(formatProductFromDB);
  } catch (error) {
    console.error('Error fetching new products:', error);
    return [];
  }
}

export async function getBestsellerProducts(): Promise<Product[]> {
  try {
    const dbProductsVendidos = await prisma.producto.findMany({
  where: { masVendido: true },
  include: {
    imagenes: true,
    categoria: true,
  },
  take: 8,
});
    
    return dbProductsVendidos.map(formatProductFromDB);
  } catch (error) {
    console.error('Error fetching bestseller products:', error);
    return [];
  }
}

export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  try {
    const dbProducts = await prisma.producto.findMany({
      where: {
        categoria: {
          slug: categorySlug
        }
      },
      include: {
        imagenes: true,
        categoria: true,
      }
    });
    
    return dbProducts.map(formatProductFromDB);
  } catch (error) {
    console.error('Error fetching products by category:', error);
    return [];
  }
}

export async function searchProducts(query: string): Promise<Product[]> {
  try {
    const dbProducts = await prisma.producto.findMany({
      where: {
        OR: [
          { nombre: { contains: query, mode: 'insensitive' } },
          { descripcion: { contains: query, mode: 'insensitive' } },
          { marca: { contains: query, mode: 'insensitive' } },
        ]
      },
      include: {
        imagenes: true,
        categoria: true,
      }
    });
    
    return dbProducts.map(formatProductFromDB);
  } catch (error) {
    console.error('Error searching products:', error);
    return [];
  }
}

// ===== CATEGORÍAS =====
export async function getAllCategories(): Promise<Category[]> {
  try {
    const dbCategories = await prisma.categoria.findMany({
      include: {
        _count: {
          select: { productos: true }
        }
      }
    });
    
    return dbCategories.map(formatCategoryFromDB);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

export async function getCategoryBySlug(slug: string): Promise<Category | undefined> {
  try {
    const dbCategory = await prisma.categoria.findUnique({
      where: { slug },
      include: {
        _count: {
          select: { productos: true }
        }
      }
    });
    
    return dbCategory ? formatCategoryFromDB(dbCategory) : undefined;
  } catch (error) {
    console.error('Error fetching category by slug:', error);
    return undefined;
  }
}

export async function getPopularCategories(): Promise<Category[]> {
  try {
    const dbCategories = await prisma.categoria.findMany({
  where: { esPopular: true }, // ✅ CAMPO CORRECTO
  include: {
    _count: {
      select: { productos: true },
    },
  },
});
    
    return dbCategories.map(formatCategoryFromDB);
  } catch (error) {
    console.error('Error fetching popular categories:', error);
    return [];
  }
}

// ===== FUNCIONES ADICIONALES =====
export async function getAllBrands(): Promise<string[]> {
  try {
    const brands = await prisma.producto.findMany({
      select: { marca: true },
      distinct: ['marca']
    });
    
return brands
  .map(b => b.marca)
  .filter((marca): marca is string => marca !== null)
  .sort();
  } catch (error) {
    console.error('Error fetching brands:', error);
    return [];
  }
}

export async function getPriceRange(): Promise<{ min: number; max: number }> {
  try {
    const result = await prisma.producto.aggregate({
      _min: { precio: true },
      _max: { precio: true }
    });
    
    return {
      min: result._min.precio?.toNumber() || 0,
      max: result._max.precio?.toNumber() || 1000
    };
  } catch (error) {
    console.error('Error fetching price range:', error);
    return { min: 0, max: 1000 };
  }
}

export async function getProductsOnSale(): Promise<Product[]> {
  try {
    const dbProducts = await prisma.producto.findMany({
      where: {
        precioAnterior: {
          not: null
        }
      },
      include: {
        imagenes: true,
        categoria: true,
      }
    });
    
    return dbProducts.map(formatProductFromDB);
  } catch (error) {
    console.error('Error fetching products on sale:', error);
    return [];
  }
}