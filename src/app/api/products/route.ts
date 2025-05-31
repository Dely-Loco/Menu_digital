// src/app/api/products/route.ts
import { NextResponse } from 'next/server';
import { db } from '../../../lib/db'; // Adjust path to your Prisma client
import { mapProductos } from '../../../lib/mappers'; // Adjust path to your mappers
import { Prisma } from '@prisma/client'; // Import Prisma for more specific types

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const categorySlug = searchParams.get('category');
    const brandName = searchParams.get('brand');
    const minPriceParam = searchParams.get('minPrice');
    const maxPriceParam = searchParams.get('maxPrice');
    const searchQuery = searchParams.get('search');
    const sortBy = searchParams.get('sort');
    const isFeatured = searchParams.get('featured'); // For featured products
    const isOnSale = searchParams.get('on_sale');   // For products on sale

    // Define a more specific type for whereConditions
    const whereConditions: Prisma.ProductoWhereInput = {};

    if (categorySlug && categorySlug !== 'all') {
      whereConditions.categoria = {
        slug: categorySlug,
      };
    }

    if (brandName && brandName !== 'all') {
      whereConditions.marca = {
        contains: brandName,
        mode: 'insensitive',
      };
    }

    const minPrice = minPriceParam ? parseFloat(minPriceParam) : undefined;
    const maxPrice = maxPriceParam ? parseFloat(maxPriceParam) : undefined;

    if (minPrice !== undefined && !isNaN(minPrice)) {
      whereConditions.precio = {
        ...(whereConditions.precio as Prisma.DecimalFilter), // Type assertion
        gte: minPrice,
      };
    }

    if (maxPrice !== undefined && !isNaN(maxPrice)) {
      whereConditions.precio = {
        ...(whereConditions.precio as Prisma.DecimalFilter), // Type assertion
        lte: maxPrice,
      };
    }

    if (searchQuery) {
      whereConditions.OR = [
        { nombre: { contains: searchQuery, mode: 'insensitive' } },
        { descripcion: { contains: searchQuery, mode: 'insensitive' } },
        { marca: { contains: searchQuery, mode: 'insensitive' } },
        { etiquetas: { has: searchQuery } }, // Assumes 'searchQuery' is a single tag to search for
      ];
    }

    if (isFeatured === 'true') {
      whereConditions.destacado = true;
    }

    if (isOnSale === 'true') {
      // This identifies products that *could* be on sale by having an original price.
      // The actual discount (precio < precioAnterior) is calculated by your mapper.
      // For a stricter DB-level "on sale" filter, you'd ideally have an `enOferta: Boolean` field
      // in your Producto model that you set when precio < precioAnterior.
      whereConditions.precioAnterior = {
        not: null,
      };
      // And to ensure there IS a discount (precio < precioAnterior), this is harder in Prisma directly.
      // The mappers calculate discountPercentage, so the frontend can use that if needed.
      // If you need to strictly filter by `precio < precioAnterior` at the DB level,
      // it often requires a raw query or a dedicated 'enOferta' field.
      // For now, we'll filter by items that *have* an originalPrice, implying they *might* be on sale.
    }

    let orderBy: Prisma.ProductoOrderByWithRelationInput | Prisma.ProductoOrderByWithRelationInput[] = {};
    switch (sortBy) {
      case 'price-asc':
        orderBy = { precio: 'asc' };
        break;
      case 'price-desc':
        orderBy = { precio: 'desc' };
        break;
      case 'rating-desc':
        orderBy = { calificacion: 'desc' }; // Prisma field name
        break;
      case 'name-asc':
        orderBy = { nombre: 'asc' };
        break;
      default: // Default sort
        orderBy = { creadoEn: 'desc' }; // Prisma field name
    }

    // Example for pagination (you can uncomment and use if you pass page/limit params)
    // const page = parseInt(searchParams.get('page') || '1', 10);
    // const limit = parseInt(searchParams.get('limit') || '10', 10); // Default 10 items per page
    // const skip = (page - 1) * limit;

    const productosDB = await db.producto.findMany({
      where: whereConditions,
      include: {
        categoria: { // Ensure category data needed by mapper is included
          include: {
            _count: {
              select: { productos: true }
            }
          }
        },
        imagenes: {
          orderBy: {
            orden: 'asc',
          },
        },
      },
      orderBy,
      // take: limit, // For pagination
      // skip: skip,   // For pagination
    });

    // const totalProducts = await db.producto.count({ where: whereConditions }); // For pagination metadata

    const productosMapeados = mapProductos(productosDB);

    // For pagination, your response might look like:
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
    console.error('[API_PRODUCTS_GET_ERROR]', error);
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido en el servidor.';
    return NextResponse.json(
      { message: 'Error al obtener los productos.', errorDetails: errorMessage },
      { status: 500 }
    );
  }
}