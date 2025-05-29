// src/app/products/[id]/page.tsx
import { notFound } from 'next/navigation';
import { getProductBySlug, getAllProducts } from '@/lib/queries';

interface ProductPageParams {
  params: {
    id: string;
  };
}

export default async function ProductDetailPage({ params }: ProductPageParams) {
  const product = await getProductBySlug(params.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Galería de imágenes */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-lg overflow-hidden shadow-lg">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.slice(1, 5).map((image, index) => (
                  <div key={index} className="aspect-square bg-white rounded-lg overflow-hidden shadow">
                    <img
                      src={image}
                      alt={`${product.name} - Imagen ${index + 2}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Información del producto */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
              <p className="text-lg text-gray-600 mt-2">{product.shortDescription}</p>
            </div>

            {/* Precio */}
            <div className="flex items-center space-x-4">
              <span className="text-3xl font-bold text-green-600">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-gray-500 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                  <span className="bg-red-100 text-red-800 text-sm font-medium px-2.5 py-0.5 rounded">
                    -{product.discountPercentage}%
                  </span>
                </>
              )}
            </div>

            {/* Rating y reseñas */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-gray-600">
                {product.rating} ({product.reviewsCount} reseñas)
              </span>
            </div>

            {/* Características */}
            {product.features && product.features.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Características principales</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Colores disponibles */}
            {product.colors && product.colors.length > 1 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Colores disponibles</h3>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm"
                    >
                      {color}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Stock */}
            <div className="flex items-center space-x-2">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                product.stock > 0 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {product.stock > 0 ? 'En stock' : 'Agotado'}
              </span>
              {product.stock > 0 && product.stock <= 10 && (
                <span className="text-sm text-orange-600">
                  Solo quedan {product.stock} unidades
                </span>
              )}
            </div>

            {/* Botones de acción */}
            <div className="space-y-4">
              <button
                disabled={product.stock === 0}
                className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-colors ${
                  product.stock > 0
                    ? 'bg-blue-600 hover:bg-blue-700'
                    : 'bg-gray-400 cursor-not-allowed'
                }`}
              >
                {product.stock > 0 ? 'Agregar al carrito' : 'No disponible'}
              </button>
              
              <button className="w-full py-3 px-4 rounded-lg font-semibold text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 transition-colors">
                Agregar a lista de deseos
              </button>
            </div>

            {/* Información adicional */}
            <div className="border-t pt-6 space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Marca:</span>
                  <span className="ml-2 font-medium">{product.brand}</span>
                </div>
                {product.warranty && (
                  <div>
                    <span className="text-gray-600">Garantía:</span>
                    <span className="ml-2 font-medium">{product.warranty}</span>
                  </div>
                )}
                {product.dimensions && (
                  <div>
                    <span className="text-gray-600">Dimensiones:</span>
                    <span className="ml-2 font-medium">{product.dimensions}</span>
                  </div>
                )}
                {product.weight && (
                  <div>
                    <span className="text-gray-600">Peso:</span>
                    <span className="ml-2 font-medium">{product.weight}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Descripción completa */}
        <div className="mt-12">
          <div className="border-t pt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Descripción del producto</h2>
            <div className="prose max-w-none text-gray-700">
              <p>{product.description}</p>
              {product.technicalSpec && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Especificaciones técnicas</h3>
                  <p className="text-gray-600">{product.technicalSpec}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Generar parámetros estáticos para todas las páginas de productos
export async function generateStaticParams() {
  const products = await getAllProducts();
  
  return products.map((product) => ({
    id: product.slug,
  }));
}

// Metadatos dinámicos
export async function generateMetadata({ params }: ProductPageParams) {
  const product = await getProductBySlug(params.id);

  if (!product) {
    return {
      title: 'Producto no encontrado',
    };
  }

  return {
    title: `${product.name} - Tu Tienda`,
    description: product.shortDescription,
    openGraph: {
      title: product.name,
      description: product.shortDescription,
      images: [product.images[0]],
    },
  };
}
