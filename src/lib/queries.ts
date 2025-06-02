// src/lib/queries.ts
import { prisma } from "./prisma"; // Tu cliente Prisma
import type { Product, Category, ProductImage, DBProduct, DBCategory, DBImage } from "@/types";
// IMPORTA TUS FUNCIONES DE MAPEO DESDE mappers.ts
import { mapProductos, mapCategorias, formatProductFromDB, formatCategoryFromDB } from './mappers';

// Incluir _count para categoría cuando se fetchea un producto, porque formatCategoryFromDB lo usa
const defaultProductInclude = {
  imagenes: { orderBy: { orden: 'asc' } },
  categoria: { 
    include: { 
      _count: { select: { productos: true } } 
    } 
  },
} as const;

// Incluir _count para productos cuando se fetchean categorías
const defaultCategoryInclude = {
  _count: { select: { productos: true } },
} as const;

const DEFAULT_TAKE_LIMIT = 8;
const DEFAULT_PAGE_SIZE = 20;

// ===== CONSULTAS =====

export async function getAllProducts(page = 1, limit = DEFAULT_PAGE_SIZE): Promise<Product[]> {
  try {
    const skip = (page - 1) * limit;
    const dbProducts = await prisma.producto.findMany({
      skip,
      take: limit,
      include: defaultProductInclude,
      orderBy: { creadoEn: 'desc' },
    });
    return mapProductos(dbProducts as any); // Usa mapProductos
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
    return formatProductFromDB(dbProduct as any); // Usa formatProductFromDB directamente
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
    return mapProductos(dbProducts as any); // Usa mapProductos
  } catch (error) {
    console.error('Error fetching featured products:', error);
    return [];
  }
}

// FUNCIÓN getAllCategories (asegúrate que esté exportada)
export async function getAllCategories(): Promise<Category[]> {
  try {
    const dbCategories = await prisma.categoria.findMany({
      include: defaultCategoryInclude, 
      orderBy: { nombre: 'asc' },
    });
    return mapCategorias(dbCategories as any); // Usa mapCategorias
  } catch (error) {
    console.error('Error fetching all categories:', error);
    return [];
  }
}

// Aquí puedes añadir tus otras funciones de queries como:
// getNewProducts, getBestsellerProducts, getProductsByCategory, searchProducts
// Asegúrate de que todas ellas, después de obtener datos de Prisma, usen mapProductos o formatProductFromDB.
// Por ejemplo:
export async function getNewProducts(limit = DEFAULT_TAKE_LIMIT): Promise<Product[]> {
  try {
    const dbProductsNuevos = await prisma.producto.findMany({
      where: { esNuevo: true },
      include: defaultProductInclude,
      take: limit,
      orderBy: { creadoEn: 'desc' }
    });
    return mapProductos(dbProductsNuevos as any);
  } catch (error) {
    console.error('Error fetching new products:', error);
    return [];
  }
}
// ... y así para las demás ...