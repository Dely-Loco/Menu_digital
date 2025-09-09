// src/app/api/products/route.ts
import { NextResponse } from 'next/server';
import { 
  getAllPlatos,
  searchPlatos, 
  getPlatosByCategoria,
  getFeaturedPlatos,
  getPlatosByPriceRange,
  getPlatosByTags,
  getAvailablePlatos,
  getTotalPlatosCount
} from '@/lib/queries';

// Definimos los tipos específicos para la API basados en lo que realmente devuelven las queries
type APIPlato = {
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
  category?: APICategory;
  categorySlug?: string;
  images: APIProductImage[];
  tags: string[];
  createdAt: string;
  inWishlist?: boolean;
};

type APICategory = {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  platosCount?: number;
  productsCount?: number;
  isPopular?: boolean;
  createdAt: string;
};

type APIProductImage = {
  id: string;
  url: string;
  alt?: string;
  order: number;
  isPrimary?: boolean;
};

// Tipos para los parámetros de la API
interface ProductFilters {
  category?: string;
  search?: string;
  featured?: boolean;
  minPrice?: number;
  maxPrice?: number;
  tags?: string[];
  available?: boolean;
  sort?: string;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Extraer y validar parámetros
    const filters: ProductFilters = {
      category: searchParams.get('category') || undefined,
      search: searchParams.get('search')?.trim() || undefined,
      featured: searchParams.get('featured') === 'true',
      minPrice: searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined,
      maxPrice: searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined,
      tags: searchParams.get('tags')?.split(',').filter(Boolean) || undefined,
      available: searchParams.get('available') !== 'false', // Por defecto true
      sort: searchParams.get('sort') || 'newest'
    };

    // Parámetros de paginación
    const page = Math.max(1, Number(searchParams.get('page')) || 1);
    const limit = Math.min(50, Math.max(1, Number(searchParams.get('limit')) || 20));

    console.log('[API /api/products] Filters:', filters);
    console.log('[API /api/products] Pagination:', { page, limit });

    let products: APIPlato[] = [];
    
    // Lógica de obtención de productos basada en filtros
    if (filters.search) {
      // Búsqueda por texto
      products = await searchPlatos(filters.search, limit * 2) as APIPlato[]; // Obtenemos más para filtrar después
    } else if (filters.category && filters.category !== 'all') {
      // Filtro por categoría
      products = await getPlatosByCategoria(filters.category, page, limit) as APIPlato[];
    } else if (filters.featured) {
      // Solo productos destacados
      products = await getFeaturedPlatos(limit) as APIPlato[];
    } else if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
      // Filtro por rango de precio
      const min = filters.minPrice ?? 0;
      const max = filters.maxPrice ?? 999999;
      products = await getPlatosByPriceRange(min, max, limit) as APIPlato[];
    } else if (filters.tags && filters.tags.length > 0) {
      // Filtro por etiquetas
      products = await getPlatosByTags(filters.tags, limit) as APIPlato[];
    } else {
      // Todos los productos disponibles
      if (filters.available) {
        products = await getAvailablePlatos(limit) as APIPlato[];
      } else {
        products = await getAllPlatos(page, limit) as APIPlato[];
      }
    }

    // Aplicar filtros adicionales si es necesario
    let filteredProducts: APIPlato[] = products;

    // Filtrar por precio si ya tenemos productos pero necesitamos refinar
    if ((filters.minPrice !== undefined || filters.maxPrice !== undefined) && !filters.search) {
      filteredProducts = products.filter(product => {
        const price = product.price;
        const minOk = filters.minPrice === undefined || price >= filters.minPrice;
        const maxOk = filters.maxPrice === undefined || price <= filters.maxPrice;
        return minOk && maxOk;
      });
    }

    // Filtrar por disponibilidad
    if (filters.available) {
      filteredProducts = filteredProducts.filter(product => product.available);
    }

    // Filtrar por destacados si no fue el filtro principal
    if (filters.featured && !filters.search && !filters.category) {
      filteredProducts = filteredProducts.filter(product => product.isFeatured);
    }

    // Aplicar ordenamiento
    filteredProducts = sortProducts(filteredProducts, filters.sort || 'newest');

    // Aplicar paginación manual si es necesario
    if (filters.search || (filters.minPrice !== undefined || filters.maxPrice !== undefined)) {
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      filteredProducts = filteredProducts.slice(startIndex, endIndex);
    }

    // Obtener estadísticas adicionales
    const totalCount = await getTotalPlatosCount();

    // Construir respuesta
    const response = {
      products: filteredProducts,
      pagination: {
        page,
        limit,
        total: filteredProducts.length,
        hasMore: filteredProducts.length >= limit,
      },
      filters: {
        applied: filters,
        totalProducts: totalCount,
      },
      meta: {
        timestamp: new Date().toISOString(),
        requestId: crypto.randomUUID(),
      }
    };

    console.log(`[API /api/products] Returning ${filteredProducts.length} products`);
    return NextResponse.json(response);

  } catch (error) {
    console.error('[API_PRODUCTS_GET_ERROR]', error);
    
    return NextResponse.json(
      { 
        error: 'Error al obtener los productos del menú',
        message: error instanceof Error ? error.message : 'Error interno del servidor',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

// Función auxiliar para ordenar productos
function sortProducts(products: APIPlato[], sortBy: string): APIPlato[] {
  const sortedProducts = [...products];
  
  switch (sortBy) {
    case 'price-asc':
      return sortedProducts.sort((a, b) => a.price - b.price);
    
    case 'price-desc':
      return sortedProducts.sort((a, b) => b.price - a.price);
    
    case 'name-asc':
      return sortedProducts.sort((a, b) => a.name.localeCompare(b.name, 'es', { sensitivity: 'base' }));
    
    case 'name-desc':
      return sortedProducts.sort((a, b) => b.name.localeCompare(a.name, 'es', { sensitivity: 'base' }));
    
    case 'featured':
      return sortedProducts.sort((a, b) => {
        if (a.isFeatured && !b.isFeatured) return -1;
        if (!a.isFeatured && b.isFeatured) return 1;
        // Comparar por fecha de creación
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return dateB - dateA;
      });
    
    case 'discount':
      return sortedProducts.sort((a, b) => {
        const discountA = a.discountPercentage ?? 0;
        const discountB = b.discountPercentage ?? 0;
        return discountB - discountA;
      });
    
    case 'newest':
    default:
      return sortedProducts.sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return dateB - dateA;
      });
  }
}

// Endpoint POST para crear nuevos platos (opcional para administración)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validaciones básicas
    const requiredFields = ['nombre', 'descripcion', 'precio'];
    const missingFields = requiredFields.filter(field => !body[field]);
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { 
          error: 'Campos requeridos faltantes',
          missingFields,
          required: requiredFields
        },
        { status: 400 }
      );
    }

    // Validar precio
    if (typeof body.precio !== 'number' || body.precio <= 0) {
      return NextResponse.json(
        { error: 'El precio debe ser un número positivo' },
        { status: 400 }
      );
    }

    // Generar slug si no se proporciona
    const slug = body.slug || body.nombre
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remover acentos
      .replace(/[^a-z0-9\s-]/g, '') // Solo letras, números, espacios y guiones
      .replace(/\s+/g, '-') // Reemplazar espacios con guiones
      .replace(/-+/g, '-') // Remover guiones múltiples
      .trim('-'); // Remover guiones al inicio y final

    const platoData = {
      nombre: body.nombre.trim(),
      slug,
      descripcion: body.descripcion.trim(),
      descripcionCorta: body.descripcionCorta?.trim(),
      precio: body.precio,
      precioAnterior: body.precioAnterior || null,
      disponible: body.disponible ?? true,
      destacado: body.destacado ?? false,
      etiquetas: Array.isArray(body.etiquetas) ? body.etiquetas : [],
      categoriaId: body.categoriaId || null,
    };

    console.log('[API /api/products POST] Creating plato:', platoData);

    // Aquí deberías usar tu función de queries para crear el plato
    // Como no tienes una función createPlato, tendrías que crearla
    // Por ahora, devuelvo una respuesta de ejemplo
    
    return NextResponse.json(
      { 
        message: 'Plato creado exitosamente',
        plato: { id: 'new-id', ...platoData }
      },
      { status: 201 }
    );
    
  } catch (error) {
    console.error('[API_PRODUCTS_POST_ERROR]', error);
    
    return NextResponse.json(
      { 
        error: 'Error al crear el plato',
        message: error instanceof Error ? error.message : 'Error interno del servidor'
      },
      { status: 500 }
    );
  }
}

// Endpoint PUT para actualizar platos
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { searchParams } = new URL(request.url);
    const platoId = searchParams.get('id');

    if (!platoId) {
      return NextResponse.json(
        { error: 'ID del plato requerido' },
        { status: 400 }
      );
    }

    // Aquí implementarías la lógica de actualización
    console.log('[API /api/products PUT] Updating plato:', platoId, body);

    return NextResponse.json(
      { 
        message: 'Plato actualizado exitosamente',
        platoId 
      }
    );
    
  } catch (error) {
    console.error('[API_PRODUCTS_PUT_ERROR]', error);
    
    return NextResponse.json(
      { 
        error: 'Error al actualizar el plato',
        message: error instanceof Error ? error.message : 'Error interno del servidor'
      },
      { status: 500 }
    );
  }
}

// Endpoint DELETE para eliminar platos
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const platoId = searchParams.get('id');

    if (!platoId) {
      return NextResponse.json(
        { error: 'ID del plato requerido' },
        { status: 400 }
      );
    }

    // Aquí implementarías la lógica de eliminación
    console.log('[API /api/products DELETE] Deleting plato:', platoId);

    return NextResponse.json(
      { 
        message: 'Plato eliminado exitosamente',
        platoId 
      }
    );
    
  } catch (error) {
    console.error('[API_PRODUCTS_DELETE_ERROR]', error);
    
    return NextResponse.json(
      { 
        error: 'Error al eliminar el plato',
        message: error instanceof Error ? error.message : 'Error interno del servidor'
      },
      { status: 500 }
    );
  }
}