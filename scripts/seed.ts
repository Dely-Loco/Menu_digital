// scripts/seed.ts
import { PrismaClient } from '@prisma/client';
// Asumo que tus mock-data exportan categories y products con la estructura de tus tipos de app
// (Product, Category, donde Product tiene images: ProductImage[])
import { categories as mockCategories, products as mockProducts } from "@/data/mock-data"; 
import type { Product as AppProduct, ProductImage as AppProductImage, Category as AppCategory } from '@/types';


const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando carga de datos...');

  try {
    console.log('🧹 Limpiando datos existentes...');
    await prisma.$transaction([
      prisma.imagen.deleteMany(),
      prisma.producto.deleteMany(),
      prisma.categoria.deleteMany(),
    ]);

    console.log('📂 Creando categorías...');
    // Asegúrate que 'mockCategories' tenga la estructura que espera Prisma Categoria o mapea los campos
    const createdCategories = await prisma.$transaction(
      mockCategories.map(category => 
        prisma.categoria.create({
          data: {
            // Mapeo de campos de tu AppCategory a PrismaCategoria
            nombre: category.name,
            slug: category.slug,
            descripcion: category.description,
            imagen: category.image,
            icono: category.icon,
            color: category.color,
            esPopular: category.isPopular,
            // creadoEn se pone por defecto con @default(now()) en el schema
          }
        })
      )
    );
    console.log(`✅ ${createdCategories.length} categorías creadas.`);

    console.log('🛍️ Creando productos...');
    let createdProductsCount = 0;
    let skippedProductsCount = 0;

    for (const productData of mockProducts) { // productData es de tipo AppProduct
      const categoriaSlug = typeof productData.category === 'string' 
                            ? productData.category // Esto era de un mock antiguo, ahora productData.category es un objeto
                            : productData.category?.slug || productData.categorySlug; // Usa categorySlug o category.slug

      if (!categoriaSlug) {
        console.log(`⚠️ Categoría o slug de categoría no definido para "${productData.name}". Omitiendo.`);
        skippedProductsCount++;
        continue;
      }
      
      const categoriaDB = await prisma.categoria.findUnique({
        where: { slug: categoriaSlug }
      });

      if (!categoriaDB) {
        console.log(`⚠️ Categoría con slug "${categoriaSlug}" no encontrada para el producto "${productData.name}". Omitiendo.`);
        skippedProductsCount++;
        continue;
      }

      await prisma.$transaction(async (tx) => {
        const nuevoProducto = await tx.producto.create({
          data: {
            nombre: productData.name,
            slug: productData.slug,
            descripcion: productData.description,
            descripcionCorta: productData.shortDescription,
            especificacionesTecnicas: productData.technicalSpec,
            precio: productData.price, // Prisma maneja la conversión de number a Decimal
            precioAnterior: productData.originalPrice,
            marca: productData.brand,
            stock: productData.stock,
            calificacion: productData.rating,        // Mapeo de app.rating a prisma.calificacion
            numeroReviews: productData.reviewsCount,
            destacado: productData.isFeatured,
            esNuevo: productData.isNew,
            masVendido: productData.isBestseller,
            etiquetas: productData.tags,           // Mapeo de app.tags a prisma.etiquetas
            caracteristicas: productData.features,   // Mapeo de app.features a prisma.caracteristicas
            colores: productData.colors,           // Mapeo de app.colors a prisma.colores
            dimensiones: productData.dimensions,
            peso: productData.weight,
            garantia: productData.warranty,
            // creadoEn se pone por defecto
            categoriaId: categoriaDB.id,
          }
        });

        // Crear imágenes asociadas
        if (productData.images && productData.images.length > 0) {
          await tx.imagen.createMany({
            data: productData.images.map((imageObj: AppProductImage) => ({ // imageObj es de tipo ProductImage
              url: imageObj.url,         // <--- CORRECCIÓN AQUÍ
              alt: imageObj.alt || `${productData.name} - Imagen ${imageObj.order + 1}`, // Usa el alt de imageObj
              orden: imageObj.order,       // Usa el order de imageObj
              productoId: nuevoProducto.id,
            }))
          });
        }
        createdProductsCount++;
        console.log(`✅ Producto creado: ${productData.name}`);
      });
    }

    console.log('🎉 ¡Carga de datos completada!');
    const [totalCategorias, totalProductos, totalImagenes] = await Promise.all([
      prisma.categoria.count(),
      prisma.producto.count(),
      prisma.imagen.count(),
    ]);

    console.log(`\n📊 Estadísticas:`);
    console.log(`   Categorías: ${totalCategorias}`);
    console.log(`   Productos: ${totalProductos} (${skippedProductsCount} omitidos)`);
    console.log(`   Imágenes: ${totalImagenes}`);

  } catch (error) {
    console.error('❌ Error durante la carga de datos inicial (seed):', error);
    throw error; // Re-lanza el error para que el proceso falle si hay un problema
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