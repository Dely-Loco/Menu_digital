// src/app/products/[id]/page.tsx
import { notFound } from 'next/navigation';
import { getProductBySlug, getAllProducts } from '@/lib/queries';
import type { Product } from '@/types';
import type { Metadata } from 'next';
import ProductImageGallery from '@/components/shared/ProductImageGallery';
import ProductActions from '@/components/products/ProductActions';

// ✅ FUNCIÓN PARA FORMATEAR PRECIOS - Personalizable por región
const formatPrice = (price: number | undefined) => {
  if (typeof price !== 'number') return 'N/A';
  // 🎨 PERSONALIZABLE: Cambia 'es-CO' por tu país y 'COP' por tu moneda
  return price.toLocaleString('es-CO', { 
    style: 'currency', 
    currency: 'COP', 
    minimumFractionDigits: 0, 
    maximumFractionDigits: 0 
  });
};

// ✅ Interfaz actualizada para Next.js 15
interface ProductPageProps {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

// ✅ Función para generar metadata con await params
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  
  try {
    const product = await getProductBySlug(id);
    
    if (!product) {
      return {
        title: 'Producto no encontrado',
        description: `No se encontró el producto: ${id}`,
      };
    }

    // Obtener la imagen principal para metadata
    const imageUrl = product.images && product.images.length > 0 
                     ? product.images.find(img => img.isPrimary)?.url || product.images[0].url
                     : undefined;

    return {
      title: `${product.name} | Tienda`,
      description: product.shortDescription || product.description?.substring(0, 160) || `Detalles del producto ${product.name}`,
      openGraph: {
        title: product.name,
        description: product.shortDescription || product.description?.substring(0, 160),
        type: 'product',
        images: imageUrl ? [{ url: imageUrl, alt: product.name }] : [],
      },
      twitter: {
        card: 'summary_large_image',
        title: product.name,
        description: product.shortDescription || product.description?.substring(0, 160),
        images: imageUrl ? [imageUrl] : [],
      },
    };
  } catch (error) {
    return {
      title: `Producto: ${id}`,
      description: `Detalles del producto ${id}`,
    };
  }
}

// ✅ Generación de rutas estáticas (opcional)
export async function generateStaticParams() {
  try {
    const productsData = await getAllProducts();
    return productsData.map((product: Product) => ({
      id: product.slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

// ✅ Componente principal con await params
export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { id } = await params;
  
  let product;
  try {
    product = await getProductBySlug(id);
  } catch (error) {
    console.error(`Error fetching product: ${id}`, error);
    notFound();
  }

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 md:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 🎨 GRID PRINCIPAL - Responsive: 1 columna móvil, 2 columnas desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          
          {/* GALERÍA DE IMÁGENES - Lado izquierdo */}
          <div className="order-1 lg:order-1">
            <ProductImageGallery 
              images={product.images || []} 
              productName={product.name} 
            />
          </div>
          
          {/* INFORMACIÓN DEL PRODUCTO - Lado derecho */}
          <div className="order-2 lg:order-2 space-y-6">
            
            {/* 🎨 SECCIÓN: MARCA Y TÍTULO */}
            <header>
              {product.brand && (
                <p className="text-sm text-blue-600 dark:text-blue-400 font-semibold mb-2 uppercase tracking-wider">
                  {product.brand}
                </p>
              )}
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-gray-100 leading-tight">
                {product.name}
              </h1>
              
              {product.shortDescription && (
                <p className="text-lg text-gray-600 dark:text-gray-400 mt-4 leading-relaxed">
                  {product.shortDescription}
                </p>
              )}
            </header>

            {/* 🎨 SECCIÓN: PRECIOS */}
            <div className="flex items-baseline space-x-4 py-2">
              <span className="text-4xl md:text-5xl font-bold text-blue-700 dark:text-blue-400">
                {formatPrice(product.price)}
              </span>
              
              {product.originalPrice && product.originalPrice > product.price && (
                <div className="flex items-center space-x-3">
                  <span className="text-xl text-gray-400 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                  
                  {product.discountPercentage && (
                    <span className="bg-red-500 text-white text-sm font-semibold px-3 py-1 rounded-full animate-pulse">
                      -{product.discountPercentage}%
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* 🎨 SECCIÓN: RATING Y RESEÑAS */}
            {typeof product.rating === 'number' && product.reviewsCount !== undefined && (
              <div className="flex items-center space-x-3 py-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.round(product.rating as number) 
                          ? 'text-yellow-400' 
                          : 'text-gray-300 dark:text-gray-600'
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {product.rating.toFixed(1)} ({product.reviewsCount} reseñas)
                </span>
              </div>
            )}

            {/* 🎨 SECCIÓN: CARACTERÍSTICAS PRINCIPALES */}
            {product.features && product.features.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Características principales
                </h3>
                
                <ul className="space-y-2 list-none">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* COMPONENTE DE ACCIONES */}
            <div className="pt-4">
              <ProductActions product={product} />
            </div>

            {/* 🎨 SECCIÓN: INFORMACIÓN ADICIONAL */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6 space-y-3">
              {product.warranty && (
                <div className="flex items-center text-sm">
                  <svg className="w-5 h-5 text-blue-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-600 dark:text-gray-400">
                    <strong>Garantía:</strong> {product.warranty}
                  </span>
                </div>
              )}
              
              {product.dimensions && (
                <div className="flex items-center text-sm">
                  <svg className="w-5 h-5 text-blue-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                  <span className="text-gray-600 dark:text-gray-400">
                    <strong>Dimensiones:</strong> {product.dimensions}
                  </span>
                </div>
              )}
              
              {product.weight && (
                <div className="flex items-center text-sm">
                  <svg className="w-5 h-5 text-blue-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                  </svg>
                  <span className="text-gray-600 dark:text-gray-400">
                    <strong>Peso:</strong> {product.weight}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 🎨 SECCIÓN: DESCRIPCIÓN DETALLADA */}
        <section className="mt-16 pt-12 border-t border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            
            {/* Descripción Principal */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                Descripción del Producto
              </h2>
              
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                  {product.description}
                </p>
              </div>
            </div>

            {/* Especificaciones Técnicas */}
            {product.technicalSpec && (
              <div className="lg:col-span-1">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Especificaciones Técnicas
                </h3>
                
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                  <div className="prose prose-sm dark:prose-invert max-w-none">
                    <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">
                      {product.technicalSpec}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}