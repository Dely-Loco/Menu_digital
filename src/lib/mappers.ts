// Mappers para convertir datos de Prisma a tipos del frontend
import { Categoria, Producto, ImagenProducto } from '@prisma/client';
import type { Category, Product, ProductImage } from '@/types';

// Mapper para imágenes de productos
export function mapProductImage(imagen: ImagenProducto): ProductImage {
  return {
    id: imagen.id.toString(),
    productId: imagen.productoId.toString(),
    url: imagen.url,
    altText: imagen.altText ?? undefined,
    order: imagen.orden,
    isPrimary: imagen.principal,
  };
}

// Mapper para categorías
export function mapCategoria(categoria: Categoria & {
  _count?: { productos: number };
}): Category {
  return {
    id: categoria.id.toString(),
    name: categoria.nombre,
    slug: categoria.slug,
    icon: categoria.icono ?? undefined,
    image: categoria.imagen ?? undefined,
    description: categoria.descripcion ?? undefined,
    color: categoria.color ?? undefined,
    isPopular: categoria.esPopular,
    productsCount: categoria._count?.productos || 0,
    dataAiHint: categoria.nombre.toLowerCase(),
  };
}

// Mapper para productos
export function mapProducto(producto: Producto & {
  categoria?: Categoria;
  imagenes?: ImagenProducto[];
  _count?: { imagenes: number };
}): Product {
  const discountPercentage =
    producto.precioAnterior != null &&
    producto.precio != null &&
    Number(producto.precioAnterior) > Number(producto.precio)
      ? Math.round(
          ((Number(producto.precioAnterior) - Number(producto.precio)) /
            Number(producto.precioAnterior)) *
            100
        )
      : undefined;

  return {
    id: producto.id.toString(),
    name: producto.nombre,
    slug: producto.slug,
    description: producto.descripcion ?? '',
    shortDescription: producto.descripcion
      ? producto.descripcion.substring(0, 150)
      : '',
    technicalSpec: (producto as any).especificacionesTecnicas ?? '', // Ajusta según tu modelo real
    price: Number(producto.precio),
    originalPrice: producto.precioAnterior
      ? Number(producto.precioAnterior)
      : undefined,
    discountPercentage,
    category: producto.categoria?.slug ?? '',
    brand: producto.marca ?? '',
    images: producto.imagenes?.map((img: ImagenProducto) => img.url) || [],
    rating: producto.rating || 0,
    reviewsCount: producto.reviewsCount || 0,
    stock: producto.stock || 0,
    isFeatured: producto.destacado || false,
    isNew: (producto as any).esNuevo || false, // Ajusta según tu modelo real
    isBestseller: (producto as any).esBestseller || false, // Ajusta según tu modelo real
    tags: (producto as any).etiquetas?.split(',') || undefined, // Ajusta según tu modelo real
    dataAiHint: producto.nombre.toLowerCase(),
  };
}

// Función para mapear arrays
export function mapCategorias(
  categorias: (Categoria & { _count?: { productos: number } })[]
): Category[] {
  return categorias.map(mapCategoria);
}

export function mapProductos(
  productos: (Producto & {
    categoria?: Categoria;
    imagenes?: ImagenProducto[];
  })[]
): Product[] {
  return productos.map(mapProducto);
}
