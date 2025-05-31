// src/app/api/products/route.ts
import { NextResponse } from 'next/server';
import { db } from '../../../lib/db'; // Ajusta esta ruta a tu cliente Prisma
import { mapProductos } from '../../../lib/mappers'; // Ajusta esta ruta a tus mappers

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const brand = searchParams.get('brand');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const search = searchParams.get('search');
    const sort = searchParams.get('sort');
    // const page = parseInt(searchParams.get('page') || '1', 10); // Ejemplo para paginación
    // const limit = parseInt(searchParams.get('limit') || '10', 10); // Ejemplo para paginación

    const whereConditions: any = {}; // Para mejor tipado, podrías usar Prisma.ProductoWhereInput

    if (category && category !== 'all') {
      whereConditions.categoria = {
        slug: category,
      };
    }

    if (brand && brand !== 'all') {
      whereConditions.marca = { // Campo 'marca' en Prisma
        // Si 'brand' es un solo string y quieres coincidencia exacta:
        // equals: brand,
        // mode: 'insensitive', // si tu DB lo soporta y quieres case-insensitive
        // O si 'brand' puede ser parte del nombre de la marca:
        contains: brand,
        mode: 'insensitive',
      };
    }

    if (minPrice) {
      const parsedMinPrice = parseFloat(minPrice);
      if (!isNaN(parsedMinPrice)) {
        whereConditions.precio = { // Campo 'precio' en Prisma
          ...(whereConditions.precio || {}),
          gte: parsedMinPrice,
        };
      }
    }

    if (maxPrice) {
      const parsedMaxPrice = parseFloat(maxPrice);
      if (!isNaN(parsedMaxPrice)) {
        whereConditions.precio = { // Campo 'precio' en Prisma
          ...(whereConditions.precio || {}),
          lte: parsedMaxPrice,
        };
      }
    }

    if (search) {
      whereConditions.OR = [
        { nombre: { contains: search, mode: 'insensitive' } },
        { descripcion: { contains: search, mode: 'insensitive' } },
        { marca: { contains: search, mode: 'insensitive' } },
        { etiquetas: { has: search } }, // Asumiendo que 'etiquetas' es String[] y quieres buscar una etiqueta exacta
      ];
    }

    let orderBy: any = {}; // Para mejor tipado, Prisma.ProductoOrderByWithRelationInput
    switch (sort) {
      case 'price-asc':
        orderBy = { precio: 'asc' };
        break;
      case 'price-desc':
        orderBy = { precio: 'desc' };
        break;
      case 'rating-desc':
        orderBy = { calificacion: 'desc' }; // Campo 'calificacion' en Prisma
        break;
      case 'name-asc':
        orderBy = { nombre: 'asc' };
        break;
      default: // Por defecto, o si 'sort' no coincide o es 'default'
        orderBy = { creadoEn: 'desc' }; // Campo 'creadoEn' en Prisma
    }

    // const skip = (page - 1) * limit; // Para paginación

    const productosDB = await db.producto.findMany({
      where: whereConditions,
      include: {
        categoria: true, // Para que el mapper pueda acceder a los datos de categoría
        imagenes: {      // Para que el mapper pueda acceder a las imágenes
          orderBy: {
            orden: 'asc' // Opcional: traer imágenes ordenadas
          }
        },
      },
      orderBy,
      // take: limit, // Para paginación
      // skip: skip,   // Para paginación
    });

    // const totalProducts = await db.producto.count({ where: whereConditions }); // Para metadatos de paginación

    const productosMapeados = mapProductos(productosDB);

    // Para paginación, podrías devolver un objeto:
    // return NextResponse.json({
    //   data: productosMapeados,
    //   pagination: {
    //     page,
    //     limit,
    //     total: totalProducts,
    //     totalPages: Math.ceil(totalProducts / limit),
    //   }
    // });
    return NextResponse.json(productosMapeados);

  } catch (error) {
    console.error('[API_PRODUCTS_ERROR]', error); // Loguear el error en el servidor
    // Enviar una respuesta de error más genérica al cliente
    return NextResponse.json(
      { message: 'Error al obtener los productos.', errorDetails: (error instanceof Error) ? error.message : 'Error desconocido' },
      { status: 500 }
    );
  }
}