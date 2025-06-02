// src/app/products/[id]/page.tsx

import { notFound } from 'next/navigation';
import { getProductBySlug, getAllProducts } from '@/lib/queries';
import type { Product } from '@/types';
import ProductImageGallery from '@/components/shared/ProductImageGallery';
import ProductActions from '@/components/products/ProductActions'; // <--- IMPORTA EL NUEVO COMPONENTE

const formatPrice = (price: number | undefined) => {
  if (typeof price !== 'number') return 'N/A';
  return price.toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0, maximumFractionDigits: 0 });
};

// ✅ CORREGIDO: params es ahora Promise en Next.js 15
interface ProductPageParams {
  params: Promise<{
    id: string;
  }>;
}

// ✅ CORREGIDO: await params
export default async function ProductDetailPage({ params }: ProductPageParams) {
  const resolvedParams = await params; // <- Await params primero
  const product = await getProductBySlug(resolvedParams.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 md:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          
          <ProductImageGallery images={product.images || []} productName={product.name} />
          
          <div className="space-y-5">
            <div>
              {product.brand && <p className="text-sm text-blue-600 font-semibold mb-1 uppercase tracking-wider">{product.brand}</p>}
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">{product.name}</h1>
              {product.shortDescription && 
                <p className="text-md text-gray-600 mt-3">{product.shortDescription}</p>
              }
            </div>

            <div className="flex items-baseline space-x-3">
              <span className="text-4xl font-bold text-blue-700">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <>
                  <span className="text-xl text-gray-400 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                  {product.discountPercentage && (
                     <span className="bg-red-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                       -{product.discountPercentage}%
                     </span>
                  )}
                </>
              )}
            </div>

            {typeof product.rating === 'number' && product.reviewsCount >= 0 && (
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.round(product.rating as number) ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {product.rating.toFixed(1)} ({product.reviewsCount} reseñas)
                </span>
              </div>
            )}

            {product.features && product.features.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 mt-4">Características principales</h3>
                <ul className="space-y-1.5 list-disc list-inside pl-1 text-gray-700">
                  {product.features.map((feature, index) => (
                    <li key={index}>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* USA EL COMPONENTE ProductActions PARA LOS BOTONES */}
            <ProductActions product={product} /> 

            <div className="border-t pt-4 mt-5 text-sm">
                {product.warranty && (
                    <p className="text-gray-600 mb-1"><strong>Garantía:</strong> {product.warranty}</p>
                )}
                {product.dimensions && (
                    <p className="text-gray-600 mb-1"><strong>Dimensiones:</strong> {product.dimensions}</p>
                )}
                {product.weight && (
                    <p className="text-gray-600"><strong>Peso:</strong> {product.weight}</p>
                )}
            </div>
          </div>
        </div>

        <div className="mt-12 md:mt-16 pt-8 md:pt-12 border-t border-gray-200">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Descripción del Producto</h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="whitespace-pre-wrap">{product.description}</p>
          </div>
          {product.technicalSpec && (
            <div className="mt-8 md:mt-10">
              <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">Especificaciones Técnicas</h3>
              <div className="prose max-w-none text-gray-700">
                <p className="whitespace-pre-wrap">{product.technicalSpec}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ✅ CORRECTO: generateStaticParams sigue igual
export async function generateStaticParams() {
  const productsData = await getAllProducts(); // Renombrado para evitar conflicto con el tipo 'Product'
  return productsData.map((p: Product) => ({ // Tipar p aquí
    id: p.slug,
  }));
}

// ✅ CORREGIDO: await params
export async function generateMetadata({ params }: ProductPageParams) {
  const resolvedParams = await params; // <- Await params primero
  const product = await getProductBySlug(resolvedParams.id);

  if (!product) {
    return { title: 'Producto no encontrado' };
  }

  const imageUrl = product.images && product.images.length > 0 
                   ? product.images.find(img => img.isPrimary)?.url || product.images[0].url
                   : undefined;

  return {
    title: `${product.name} | Houzze Tec`,
    description: product.shortDescription || product.description.substring(0, 160),
    openGraph: {
      title: product.name,
      description: product.shortDescription || product.description.substring(0, 160),
      images: imageUrl ? [{ url: imageUrl }] : [],
    },
  };
}