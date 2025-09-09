// src/lib/prisma.ts
import { PrismaClient } from '@prisma/client';

// Configuración optimizada para Neon
const prismaClientSingleton = () => {
  return new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    errorFormat: 'pretty',
  });
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

// Prevenir múltiples instancias en desarrollo
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

// Manejo de desconexión graceful
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});

// Función helper para verificar conexión
export async function checkDatabaseConnection(): Promise<boolean> {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return true;
  } catch (error) {
    console.error('Database connection failed:', error);
    return false;
  }
}

// Función para obtener estadísticas básicas
export async function getDatabaseStats() {
  try {
    const [platosCount, categoriasCount] = await Promise.all([
      prisma.plato.count({ where: { disponible: true } }),
      prisma.categoria.count(),
    ]);

    return {
      platos: platosCount,
      categorias: categoriasCount,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    console.error('Error getting database stats:', error);
    return {
      platos: 0,
      categorias: 0,
      timestamp: new Date().toISOString(),
    };
  }
}

// Exportar los tipos de Prisma
export * from '@prisma/client';