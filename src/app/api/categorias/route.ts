// src/app/api/categorias/route.ts
import { NextResponse } from 'next/server';
import { db } from '../../../lib/db'; // Ajusta la ruta a tu cliente Prisma
import { mapCategorias } from '../../../lib/mappers'; // <--- IMPORTA TU MAPPER
import { Prisma } from '@prisma/client'; // Para tipos de Prisma si es necesario

export async function GET() {
  try {
    const dbCategorias = await db.categoria.findMany({
      orderBy: {
        creadoEn: 'asc', // O por 'nombre', como prefieras
      },
      include: { // <--- AÑADIDO: Para que 'productsCount' funcione en el mapper
        _count: {
          select: { productos: true },
        },
      },
    });

    // Mapea los datos al formato de tu aplicación
    const categoriasMapeadas = mapCategorias(dbCategorias as any); // 'as any' es un atajo aquí, 
                                                                 // o asegúrate que el tipo exacto
                                                                 // de dbCategorias coincida con lo que espera mapCategorias

    return NextResponse.json(categoriasMapeadas); // Devuelve los datos mapeados

  } catch (error) {
    console.error('[API_CATEGORIAS_ERROR]', error);
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido en el servidor.';
    return NextResponse.json(
      { message: 'Error al obtener las categorías.', errorDetails: errorMessage },
      { status: 500 }
    );
  }
}