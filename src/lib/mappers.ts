import { Categoria, Producto, ImagenProducto } from '@prisma/client';
import type { Category, Product, ProductImage } from '@/types';

// Mapper para imágenes de productos
export function mapProductImage(imagen: ImagenProducto): ProductImage {
  return {
    id: imagen.id.toString(),
    productId: imagen.productoId.toString(),
    url: imagen.url,
    altText: imagen.altText ?? '',
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
    icon: categoria.icono ?? '',
    image: categoria.imagen ?? '',
    description: categoria.descripcion ?? '',
    color: categoria.color ?? '',
    isPopular: categoria.esPopular,
    productsCount: categoria._count?.productos ?? 0,
    dataAiHint: categoria.nombre.toLowerCase(),
  };
}

// Mapper para productos
export function mapProducto(producto: Producto & {
  categoria?: Categoria;
  imagenes?: ImagenProducto[];
  _count?: { imagenes: number };
  esNuevo?: boolean;
  esBestseller?: boolean;
  especificacionesTecnicas?: string;
  etiquetas?: string;
}): Product {
  const discountPercentage =
    producto.precioAnterior &&
    Number(producto.precioAnterior) > Number(producto.precio)
      ? Math.round(
          ((Number(producto.precioAnterior) - Number(producto.precio)) /
            Number(producto.precioAnterior)) *
            100
        )
      : 0;

  return {
    id: producto.id.toString(),
    name: producto.nombre,
    slug: producto.slug,
    description: producto.descripcion ?? '',
    shortDescription: producto.descripcion
      ? producto.descripcion.slice(0, 150)
      : '',
    technicalSpec: producto.especificacionesTecnicas ?? '',
    price: Number(producto.precio),
    originalPrice: producto.precioAnterior
      ? Number(producto.precioAnterior)
      : undefined,
    discountPercentage,
    category: producto.categoria?.slug ?? '',
    brand: producto.marca ?? '',
    // Si quieres solo URLs:
    images: producto.imagenes?.map(img => img.url) ?? [],
    // Si quieres objetos completos:
    // images: producto.imagenes?.map(mapProductImage) ?? [],
    rating: Number(producto.rating ?? 0),
    reviewsCount: producto.reviewsCount ?? 0,
    stock: producto.stock ?? 0,
    isFeatured: producto.destacado ?? false,
    isNew: producto.esNuevo ?? false,
    isBestseller: producto.esBestseller ?? false,
    tags: producto.etiquetas?.split(',').map(tag => tag.trim()) ?? [],
    dataAiHint: producto.nombre.toLowerCase(),
    features: [],
    colors: [],
    dimensions: '',
    weight: '',
    warranty: '',
    shippingInfo: '',
    inWishlist: false,
    compareCount: 0,
    reviews: [],
  };
}

// Funciones para mapear arrays
export function mapCategorias(
  categorias: (Categoria & { _count?: { productos: number } })[]
): Category[] {
  return categorias.map(mapCategoria);
}

export function mapProductos(
  productos: (Producto & {
    categoria?: Categoria;
    imagenes?: ImagenProducto[];
    esNuevo?: boolean;
    esBestseller?: boolean;
    especificacionesTecnicas?: string;
    etiquetas?: string;
  })[]
): Product[] {
  return productos.map(mapProducto);
}