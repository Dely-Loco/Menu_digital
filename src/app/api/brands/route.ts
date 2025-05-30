import { NextResponse } from 'next/server';
import { db } from '../../../lib/db';

export async function GET() {
  try {
    const marcas = await db.producto.findMany({
      select: {
        marca: true,
      },
      where: {
        marca: {
          not: null,
        },
      },
      distinct: ['marca'],
      orderBy: {
        marca: 'asc',
      },
    });

    // Mapea solo los strings de marca
    const marcasFiltradas = marcas
      .map((b) => b.marca)
      .filter((m): m is string => m !== null);

    return NextResponse.json(marcasFiltradas);
  } catch (error) {
    console.error('Error al obtener marcas:', error);
    return NextResponse.json(
      { error: 'Error al obtener marcas' },
      { status: 500 }
    );
  }
}
