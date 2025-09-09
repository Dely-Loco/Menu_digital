// src/app/api/categorias/route.ts
import { NextResponse } from 'next/server';
import { 
  getAllCategorias,
  getPopularCategorias,
  getCategoriaBySlug
} from '@/lib/queries';

// Tipos específicos para la API de categorías
type APICategoria = {
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

// Tipos para los filtros
interface CategoriaFilters {
  popular?: boolean;
  slug?: string;
  withProducts?: boolean;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Extraer parámetros
    const filters: CategoriaFilters = {
      popular: searchParams.get('popular') === 'true',
      slug: searchParams.get('slug') || undefined,
      withProducts: searchParams.get('withProducts') !== 'false' // Por defecto true
    };

    console.log('[API /api/categorias] Filters:', filters);

    let categorias: APICategoria[] = [];

    // Lógica de obtención basada en filtros
    if (filters.slug) {
      // Obtener categoría específica por slug
      const categoria = await getCategoriaBySlug(filters.slug);
      categorias = categoria ? [categoria as APICategoria] : [];
    } else if (filters.popular) {
      // Solo categorías populares
      categorias = await getPopularCategorias() as APICategoria[];
    } else {
      // Todas las categorías
      categorias = await getAllCategorias() as APICategoria[];
    }

    // Filtrar categorías que tienen productos si se solicita
    if (filters.withProducts) {
      categorias = categorias.filter(cat => (cat.platosCount || 0) > 0);
    }

    // Ordenar alfabéticamente por nombre
    categorias.sort((a, b) => a.name.localeCompare(b.name, 'es', { sensitivity: 'base' }));

    const response = {
      categorias,
      meta: {
        total: categorias.length,
        filters: filters,
        timestamp: new Date().toISOString(),
      }
    };

    console.log(`[API /api/categorias] Returning ${categorias.length} categorias`);
    return NextResponse.json(response);

  } catch (error) {
    console.error('[API_CATEGORIAS_GET_ERROR]', error);
    
    return NextResponse.json(
      { 
        error: 'Error al obtener las categorías',
        message: error instanceof Error ? error.message : 'Error interno del servidor',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

// Endpoint POST para crear nuevas categorías
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validaciones básicas
    const requiredFields = ['nombre'];
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

    // Generar slug si no se proporciona
    const slug = body.slug || body.nombre
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remover acentos
      .replace(/[^a-z0-9\s-]/g, '') // Solo letras, números, espacios y guiones
      .replace(/\s+/g, '-') // Reemplazar espacios con guiones
      .replace(/-+/g, '-') // Remover guiones múltiples
      .trim('-'); // Remover guiones al inicio y final

    const categoriaData = {
      nombre: body.nombre.trim(),
      slug,
      descripcion: body.descripcion?.trim() || null,
      imagen: body.imagen?.trim() || null,
      esPopular: body.esPopular ?? false,
    };

    console.log('[API /api/categorias POST] Creating categoria:', categoriaData);

    // Aquí deberías usar tu función de queries para crear la categoría
    // Como no tienes una función createCategoria, tendrías que crearla
    
    return NextResponse.json(
      { 
        message: 'Categoría creada exitosamente',
        categoria: { id: 'new-id', ...categoriaData }
      },
      { status: 201 }
    );
    
  } catch (error) {
    console.error('[API_CATEGORIAS_POST_ERROR]', error);
    
    return NextResponse.json(
      { 
        error: 'Error al crear la categoría',
        message: error instanceof Error ? error.message : 'Error interno del servidor'
      },
      { status: 500 }
    );
  }
}

// Endpoint PUT para actualizar categorías
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { searchParams } = new URL(request.url);
    const categoriaId = searchParams.get('id');

    if (!categoriaId) {
      return NextResponse.json(
        { error: 'ID de la categoría requerido' },
        { status: 400 }
      );
    }

    console.log('[API /api/categorias PUT] Updating categoria:', categoriaId, body);

    // Aquí implementarías la lógica de actualización
    return NextResponse.json(
      { 
        message: 'Categoría actualizada exitosamente',
        categoriaId 
      }
    );
    
  } catch (error) {
    console.error('[API_CATEGORIAS_PUT_ERROR]', error);
    
    return NextResponse.json(
      { 
        error: 'Error al actualizar la categoría',
        message: error instanceof Error ? error.message : 'Error interno del servidor'
      },
      { status: 500 }
    );
  }
}

// Endpoint DELETE para eliminar categorías
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const categoriaId = searchParams.get('id');

    if (!categoriaId) {
      return NextResponse.json(
        { error: 'ID de la categoría requerido' },
        { status: 400 }
      );
    }

    console.log('[API /api/categorias DELETE] Deleting categoria:', categoriaId);

    // Aquí implementarías la lógica de eliminación
    // Importante: verificar que no tenga platos asociados
    return NextResponse.json(
      { 
        message: 'Categoría eliminada exitosamente',
        categoriaId 
      }
    );
    
  } catch (error) {
    console.error('[API_CATEGORIAS_DELETE_ERROR]', error);
    
    return NextResponse.json(
      { 
        error: 'Error al eliminar la categoría',
        message: error instanceof Error ? error.message : 'Error interno del servidor'
      },
      { status: 500 }
    );
  }
}