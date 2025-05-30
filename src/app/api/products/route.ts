import { NextResponse } from 'next/server';
import { db } from '../../../lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const brand = searchParams.get('brand');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const search = searchParams.get('search');
    const sort = searchParams.get('sort');

    const whereConditions: any = {};

    if (category && category !== 'all') {
      whereConditions.categoria = {
        slug: category,
      };
    }

    if (brand && brand !== 'all') {
      whereConditions.marca = {
        contains: brand,
        mode: 'insensitive',
      };
    }

    if (minPrice) {
      whereConditions.precio = {
        ...(whereConditions.precio || {}),
        gte: parseFloat(minPrice),
      };
    }

    if (maxPrice) {
      whereConditions.precio = {
        ...(whereConditions.precio || {}),
        lte: parseFloat(maxPrice),
      };
    }

    if (search) {
      whereConditions.OR = [
        {
          nombre: {
            contains: search,
            mode: 'insensitive',
          },
        },
        {
          descripcion: {
            contains: search,
            mode: 'insensitive',
          },
        },
        {
          marca: {
            contains: search,
            mode: 'insensitive',
          },
        },
      ];
    }

    let orderBy: any = {};
    switch (sort) {
      case 'price-asc':
        orderBy = { precio: 'asc' };
        break;
      case 'price-desc':
        orderBy = { precio: 'desc' };
        break;
      case 'rating-desc':
        orderBy = { rating: 'desc' };
        break;
      case 'name-asc':
        orderBy = { nombre: 'asc' };
        break;
      default:
        orderBy = { createdAt: 'desc' };
    }

    const productos = await db.producto.findMany({
      where: whereConditions,
      include: {
        categoria: true,
        imagenes: true,
      },
      orderBy,
    });

    return NextResponse.json(productos);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Error fetching products' },
      { status: 500 }
    );
  }
}
