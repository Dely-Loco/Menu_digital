// src/app/api/products/route.ts
import { NextResponse } from 'next/server';
import { db } from '../../../lib/db'; // Ajusta esta ruta a tu cliente Prisma
import { mapProductos } from '../../../lib/mappers'; // Ajusta esta ruta a tus mappers
import { Prisma } from '@prisma/client';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const categorySlug = searchParams.get('category');
    const brandName = searchParams.get('brand');
    const minPriceParam = searchParams.get('minPrice');
    const maxPriceParam = searchParams.get('maxPrice');
    const searchQuery = searchParams.get('search'); // Este es el término de búsqueda
    const sortBy = searchParams.get('sort');
    const isFeatured = searchParams.get('featured');
    const isOnSale = searchParams.get('on_sale');
    // 🆕 NUEVO: Parámetro para filtrar productos en descuento
    const saleFilter = searchParams.get('sale');

    // --- Debugging Logs ---
    console.log('[API /api/products] Received URL:', request.url);
    console.log('[API /api/products] searchQuery:', searchQuery);
    console.log('[API /api/products] categorySlug:', categorySlug);
    console.log('[API /api/products] brandName:', brandName);
    console.log('[API /api/products] saleFilter:', saleFilter); // 🆕 NUEVO LOG
    // --- Fin Debugging Logs ---

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
        ...(whereConditions.precio as Prisma.DecimalFilter),
        gte: minPrice,
      };
    }

    if (maxPrice !== undefined && !isNaN(maxPrice)) {
      whereConditions.precio = {
        ...(whereConditions.precio as Prisma.DecimalFilter),
        lte: maxPrice,
      };
    }

    // Lógica de búsqueda mejorada
    if (searchQuery && searchQuery.trim() !== "") { // Asegurarse que searchQuery no esté vacío
      const cleanedSearchQuery = searchQuery.trim();
      whereConditions.OR = [
        { nombre: { contains: cleanedSearchQuery, mode: 'insensitive' } },
        { marca: { contains: cleanedSearchQuery, mode: 'insensitive' } },
        // Para etiquetas, `has` busca una coincidencia exacta del string completo.
        // Si quieres buscar si CUALQUIER palabra del searchQuery está en las etiquetas, es más complejo.
        // Por ahora, mantenemos `has` para una etiqueta exacta o si la etiqueta es una frase.
        { etiquetas: { has: cleanedSearchQuery } },
        // Considera si quieres buscar también en la descripción corta o completa,
        // pero recuerda que puede traer resultados menos precisos.
        // { descripcionCorta: { contains: cleanedSearchQuery, mode: 'insensitive' } },
      ];
      console.log('[API /api/products] Applying search conditions for:', cleanedSearchQuery, whereConditions.OR);
    } else {
      console.log('[API /api/products] No search query, or empty search query.');
    }

    if (isFeatured === 'true') {
      whereConditions.destacado = true;
    }

    if (isOnSale === 'true') {
      whereConditions.precioAnterior = { not: null };
      // Adicionalmente, para que sea una oferta real, precio < precioAnterior.
      // Esto es difícil de hacer directamente en un where de Prisma para comparar dos columnas.
      // Una solución es tener un campo 'enOferta' en la BD o filtrar después del fetch,
      // o confiar en que el frontend muestre el descuento basado en los dos precios.
      // Por ahora, solo verificamos que tenga un precioAnterior.
    }

    // 🆕 NUEVO: Filtro para productos en descuento
    if (saleFilter === 'true') {
      whereConditions.precioAnterior = { not: null };
      console.log('[API /api/products] Applying sale filter - products with discount');
    }
    
    console.log('[API /api/products] Final whereConditions:', JSON.stringify(whereConditions, null, 2));

    let orderBy: Prisma.ProductoOrderByWithRelationInput | Prisma.ProductoOrderByWithRelationInput[] = { creadoEn: 'desc' }; // Default
    switch (sortBy) {
      case 'price-asc': orderBy = { precio: 'asc' }; break;
      case 'price-desc': orderBy = { precio: 'desc' }; break;
      case 'rating-desc': orderBy = { calificacion: 'desc' }; break;
      case 'name-asc': orderBy = { nombre: 'asc' }; break;
      // default ya está establecido
    }
    console.log('[API /api/products] orderBy:', orderBy);

    const productosDB = await db.producto.findMany({
      where: whereConditions,
      include: {
        categoria: {
          include: { _count: { select: { productos: true } } }
        },
        imagenes: { orderBy: { orden: 'asc' } },
      },
      orderBy,
    });

    const productosMapeados = mapProductos(productosDB);
    console.log(`[API /api/products] Found ${productosDB.length} products, mapped to ${productosMapeados.length}.`);

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