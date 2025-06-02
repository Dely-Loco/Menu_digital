// src/lib/queries.ts
import { prisma } from "./prisma";
import type { Product, Category } from "@/types"; // Solo los tipos de la aplicación que devuelven estas funciones
// IMPORTA TUS FUNCIONES DE MAPEO DESDE mappers.ts
import { mapProductos, mapCategorias, formatProductFromDB } from './mappers';
import { Prisma } from "@prisma/client"; // Importar Prisma para tipos

// --- Definición de Tipos para Resultados de Prisma con Includes ---
// Esto nos ayudará a evitar 'as any'
type ProductoConRelaciones = Prisma.ProductoGetPayload<{
  include: {
    imagenes: { orderBy: { orden: 'asc' } };
    categoria: { include: { _count: { select: { productos: true } } } };
  }
}>;

type CategoriaConConteo = Prisma.CategoriaGetPayload<{
  include: { _count: { select: { productos: true } } }
}>;
// --- Fin Definición de Tipos ---


const defaultProductInclude = {
  imagenes: { orderBy: { orden: 'asc' } },
  categoria: { 
    include: { 
      _count: { select: { productos: true } } 
    } 
  },
} as const;

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
    // Ahora dbProducts está mejor tipado, mapProductos debería aceptarlo
    // si su firma en mappers.ts es compatible con ProductoConRelaciones[]
    return mapProductos(dbProducts as ProductoConRelaciones[]);
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
    // formatProductFromDB espera un tipo compatible con ProductoConRelaciones
    return formatProductFromDB(dbProduct as ProductoConRelaciones);
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
    return mapProductos(dbProducts as ProductoConRelaciones[]);
  } catch (error) {
    console.error('Error fetching featured products:', error);
    return [];
  }
}

export async function getAllCategories(): Promise<Category[]> {
  try {
    const dbCategories = await prisma.categoria.findMany({
      include: defaultCategoryInclude, 
      orderBy: { nombre: 'asc' },
    });
    return mapCategorias(dbCategories as CategoriaConConteo[]);
  } catch (error) {
    console.error('Error fetching all categories:', error);
    return [];
  }
}

export async function getNewProducts(limit = DEFAULT_TAKE_LIMIT): Promise<Product[]> {
  try {
    const dbProductsNuevos = await prisma.producto.findMany({
      where: { esNuevo: true },
      include: defaultProductInclude,
      take: limit,
      orderBy: { creadoEn: 'desc' }
    });
    return mapProductos(dbProductsNuevos as ProductoConRelaciones[]);
  } catch (error) {
    console.error('Error fetching new products:', error);
    return [];
  }
}

// Asumo que tienes getBestsellerProducts, getProductsByCategory, searchProducts
// en otro lugar o los añadirás. Deben seguir el mismo patrón de llamar a mapProductos.
// Por ejemplo, para searchProducts (del API route que ya teníamos):

/*
export async function searchProducts(
  whereConditions: Prisma.ProductoWhereInput, // Recibe las condiciones ya construidas
  orderBy: Prisma.ProductoOrderByWithRelationInput | Prisma.ProductoOrderByWithRelationInput[],
  page = 1, // Opcional para paginación
  limit = DEFAULT_PAGE_SIZE // Opcional para paginación
): Promise<Product[]> {
  try {
    const skip = (page - 1) * limit;
    const dbProducts = await prisma.producto.findMany({
      where: whereConditions,
      include: defaultProductInclude,
      orderBy: orderBy,
      take: limit,
      skip: skip,
    });
    return mapProductos(dbProducts as ProductoConRelaciones[]);
  } catch (error) {
    console.error('Error searching products:', error);
    return [];
  }
}
*/