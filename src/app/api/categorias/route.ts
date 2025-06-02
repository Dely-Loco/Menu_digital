// src/app/api/categorias/route.ts
import { NextResponse } from 'next/server';
import { db } from '../../../lib/db';
import { mapCategorias } from '../../../lib/mappers';
import { Prisma } from '@prisma/client'; // <--- IMPORTA Prisma

// Define el tipo para el resultado de tu consulta específica
type CategoriaConConteoPayload = Prisma.CategoriaGetPayload<{
  include: { _count: { select: { productos: true } } }
}>;

export async function GET() {
  try {
    const dbCategorias: CategoriaConConteoPayload[] = await db.categoria.findMany({ // Tipa el resultado
      orderBy: {
        creadoEn: 'asc',
      },
      include: {
        _count: {
          select: { productos: true },
        },
      },
    });

    // Ahora mapCategorias debería aceptar dbCategorias si su parámetro
    // en mappers.ts es compatible con CategoriaConConteoPayload[]
    // (PrismaCategoria & { _count?: { productos: number } }) es compatible.
    const categoriasMapeadas = mapCategorias(dbCategorias); 

    return NextResponse.json(categoriasMapeadas);

  } catch (error) {
    console.error('[API_CATEGORIAS_ERROR]', error);
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido en el servidor.';
    return NextResponse.json(
      { message: 'Error al obtener las categorías.', errorDetails: errorMessage },
      { status: 500 }
    );
  }
}