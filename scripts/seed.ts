// scripts/seed.ts
import { PrismaClient } from '@prisma/client';
// Import from your restaurant mock data (you'll need to create this)
// import { categories as mockCategories, platos as mockPlatos } from "@/data/restaurant-mock-data"; 

// For now, let's use correct types from your existing types file
import type { Plato, ProductImage, Category } from '@/types';

const prisma = new PrismaClient();

// Temporary mock data for restaurant - you can replace this with your actual restaurant data
const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Platos Principales',
    slug: 'platos-principales',
    description: 'Deliciosos platos principales de la casa',
    isPopular: true,
  },
  {
    id: '2', 
    name: 'Bebidas',
    slug: 'bebidas',
    description: 'Refrescantes bebidas naturales',
    isPopular: true,
  }
];

const mockPlatos: Plato[] = [
  {
    id: '1',
    name: 'Bandeja Paisa',
    slug: 'bandeja-paisa',
    description: 'Tradicional bandeja paisa con frijoles, arroz, carne, chicharrón y más',
    shortDescription: 'Plato típico antioqueño completo',
    price: 25000,
    available: true,
    isFeatured: true,
    tags: ['tradicional', 'completo'],
    images: [],
    categorySlug: 'platos-principales'
  }
];

async function main() {
  console.log('🌱 Iniciando carga de datos...');

  try {
    console.log('🧹 Limpiando datos existentes...');
    await prisma.$transaction([
      prisma.imagen.deleteMany(),
      prisma.plato.deleteMany(),
      prisma.categoria.deleteMany(),
    ]);

    console.log('📂 Creando categorías...');
    const createdCategories = await prisma.$transaction(
      mockCategories.map(category => 
        prisma.categoria.create({
          data: {
            nombre: category.name,
            slug: category.slug,
            descripcion: category.description,
            esPopular: category.isPopular,
          }
        })
      )
    );
    console.log(`✅ ${createdCategories.length} categorías creadas.`);

    console.log('🍽️ Creando platos...');
    let createdPlatosCount = 0;
    let skippedPlatosCount = 0;

    for (const platoData of mockPlatos) {
      const categoriaSlug = platoData.categorySlug;

      if (!categoriaSlug) {
        console.log(`⚠️ Categoría no definida para "${platoData.name}". Omitiendo.`);
        skippedPlatosCount++;
        continue;
      }
      
      const categoriaDB = await prisma.categoria.findUnique({
        where: { slug: categoriaSlug }
      });

      if (!categoriaDB) {
        console.log(`⚠️ Categoría con slug "${categoriaSlug}" no encontrada para el plato "${platoData.name}". Omitiendo.`);
        skippedPlatosCount++;
        continue;
      }

      await prisma.$transaction(async (tx) => {
        const nuevoPlato = await tx.plato.create({
          data: {
            nombre: platoData.name,
            slug: platoData.slug,
            descripcion: platoData.description,
            descripcionCorta: platoData.shortDescription,
            precio: platoData.price,
            precioAnterior: platoData.originalPrice,
            disponible: platoData.available,
            destacado: platoData.isFeatured,
            etiquetas: platoData.tags,
            categoriaId: categoriaDB.id,
          }
        });

        // Crear imágenes asociadas
        if (platoData.images && platoData.images.length > 0) {
          await tx.imagen.createMany({
            data: platoData.images.map((imageObj: ProductImage) => ({
              url: imageObj.url,
              alt: imageObj.alt || `${platoData.name} - Imagen ${imageObj.order + 1}`,
              orden: imageObj.order,
              platoId: nuevoPlato.id,
            }))
          });
        }
        createdPlatosCount++;
        console.log(`✅ Plato creado: ${platoData.name}`);
      });
    }

    console.log('🎉 ¡Carga de datos completada!');
    const [totalCategorias, totalPlatos, totalImagenes] = await Promise.all([
      prisma.categoria.count(),
      prisma.plato.count(),
      prisma.imagen.count(),
    ]);

    console.log(`\n📊 Estadísticas:`);
    console.log(`   Categorías: ${totalCategorias}`);
    console.log(`   Platos: ${totalPlatos} (${skippedPlatosCount} omitidos)`);
    console.log(`   Imágenes: ${totalImagenes}`);

  } catch (error) {
    console.error('❌ Error durante la carga de datos inicial (seed):', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error('❌ Error fatal en el script de seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log('🌱 Carga de datos finalizada y conexión cerrada.');
  });