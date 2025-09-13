import { NextResponse } from 'next/server';
import { db } from '../../../lib/db';

export async function GET() {
  try {
    // Cambiado de 'producto' a 'plato' para coincidir con tu esquema Prisma
    const marcas = await db.plato.findMany({
      select: {
        // Como tu esquema no tiene campo 'marca', probablemente quieras obtener categorías
        // o algún otro campo. Aquí hay algunas opciones:
        
        // Opción 1: Si quieres obtener categorías únicas
        categoria: {
          select: {
            nombre: true,
            slug: true,
          }
        }
        
        // Opción 2: Si tienes un campo específico en platos
        // Si no hay campo 'marca' en tu esquema, considera qué información necesitas realmente
      },
      where: {
        categoria: {
          isNot: null,
        },
      },
      distinct: ['categoriaId'], // Cambiado para obtener categorías únicas
      orderBy: {
        categoria: {
          nombre: 'asc',
        },
      },
    });

    // Mapea las categorías únicas
    const categoriasFiltradas = marcas
      .map((plato) => plato.categoria?.nombre)
      .filter((nombre): nombre is string => nombre !== null && nombre !== undefined);

    // Elimina duplicados
    const categoriasUnicas = [...new Set(categoriasFiltradas)];

    return NextResponse.json(categoriasUnicas);
  } catch (error) {
    console.error('Error al obtener categorías:', error);
    return NextResponse.json(
      { error: 'Error al obtener categorías' },
      { status: 500 }
    );
  }
}