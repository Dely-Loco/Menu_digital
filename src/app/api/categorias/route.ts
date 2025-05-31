import { NextResponse } from 'next/server';
import { db } from '../../../lib/db'; // db es tu cliente Prisma

export async function GET() {
  try {
    const categorias = await db.categoria.findMany({ // 1. Accede al modelo 'categoria'
      orderBy: {
        creadoEn: 'asc', // 2. Intenta ordenar por un campo 'orden'
      },
    });

    return NextResponse.json(categorias); // 3. Devuelve los datos de Prisma directamente
  } catch (error) {
    console.error('Error al obtener las categorías:', error);
    return NextResponse.json(
      { error: 'Error al obtener las categorías' },
      { status: 500 }
    );
  }
}