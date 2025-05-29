// scripts/seed.ts

// ✅ Importamos el cliente de Prisma y los datos simulados (mock)
import { PrismaClient } from '@prisma/client';
import { categories, products } from "@/data/mock-data";

// ✅ Inicializamos Prisma
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando carga de datos...');

  try {
    // ✅ Borramos todos los datos existentes en orden seguro
    // (imagenes → productos → categorías) para evitar errores por relaciones
    console.log('🧹 Limpiando datos existentes...');
    await prisma.$transaction([
      prisma.imagenProducto.deleteMany(),
      prisma.producto.deleteMany(),
      prisma.categoria.deleteMany(),
    ]);

    // ✅ Creamos categorías usando los datos del mock
    console.log('📂 Creando categorías...');
    const createdCategories = await prisma.$transaction(
      categories.map(category => 
        prisma.categoria.create({
          data: {
            nombre: category.name,
            slug: category.slug,
            descripcion: category.description,
            imagen: category.image,
            icono: category.icon,
            color: category.color,
            esPopular: category.isPopular, // 🔄 CORREGIDO: 'esPopular' en lugar de 'popular'
          }
        })
      )
    );
    console.log(`✅ ${createdCategories.length} categorías creadas`);

    // ✅ Creamos productos y sus imágenes asociados a su categoría
    console.log('🛍️ Creando productos...');
    let createdProducts = 0;
    let skippedProducts = 0;

    for (const product of products) {
      // 🧐 Buscamos la categoría por slug
      const categoria = await prisma.categoria.findUnique({
  where: {
    slug: typeof product.category === 'string'
      ? product.category
      : product.category?.slug
  }
});


      // ⚠️ Si no existe la categoría, omitimos el producto
      if (!categoria) {
        console.log(`⚠️  Categoría no encontrada para "${product.name}": ${product.category}`);
        skippedProducts++;
        continue;
      }

      // ✅ Creamos producto + imágenes en una transacción por seguridad
      await prisma.$transaction(async (tx) => {
        const nuevoProducto = await tx.producto.create({
          data: {
            nombre: product.name,
            slug: product.slug,
            descripcion: product.description,
            precio: product.price,
            precioAnterior: product.originalPrice,
            marca: product.brand,
            rating: product.rating,
            reviewsCount: product.reviewsCount, // 🔄 CAMPO QUE EXISTE en tu schema
            stock: product.stock,
            destacado: product.isFeatured,
            categoriaId: categoria.id,
            createdAt: new Date(), // 🕒 Puede omitirse, ya que tienes default(now())
          }
        });

        // ✅ Creamos imágenes relacionadas al producto
        await tx.imagenProducto.createMany({
          data: product.images.map((imageUrl, index) => ({
            url: imageUrl,
            altText: `${product.name} - Imagen ${index + 1}`,
            productoId: nuevoProducto.id,
            orden: index,
            principal: index === 0, // La primera imagen es principal
          }))
        });

        createdProducts++;
        console.log(`✅ Producto creado: ${product.name}`);
      });
    }

    console.log('🎉 ¡Carga de datos completada!');

    // 📊 Estadísticas finales para verificar resultados
    const [totalCategorias, totalProductos, totalImagenes] = await Promise.all([
      prisma.categoria.count(),
      prisma.producto.count(),
      prisma.imagenProducto.count(),
    ]);

    console.log(`\n📊 Estadísticas:`);
    console.log(`   Categorías: ${totalCategorias}`);
    console.log(`   Productos: ${totalProductos} (${skippedProducts} omitidos)`);
    console.log(`   Imágenes: ${totalImagenes}`);
  } catch (error) {
    console.error('❌ Error durante la carga:', error);
    throw error;
  }
}

// 🧼 Ejecutamos main y manejamos errores y desconexión
main()
  .catch((e) => {
    console.error('❌ Error en el proceso:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect(); // 🔌 Cerramos conexión con la base de datos
  });
