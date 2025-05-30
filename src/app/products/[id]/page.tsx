// src/app/products/[id]/page.tsx

// Importaciones necesarias de Next.js y funciones de consulta
import { notFound } from 'next/navigation';
import { getProductBySlug, getAllProducts } from '@/lib/queries';

// Definición de tipos TypeScript para los parámetros de la página
// Next.js pasa automáticamente estos parámetros desde la URL dinámica [id]
interface ProductPageParams {
  params: {
    id: string; // Este será el slug del producto desde la URL
  };
}

// Componente principal de la página de detalle del producto
// Es un Server Component (async) que se ejecuta en el servidor
export default async function ProductDetailPage({ params }: ProductPageParams) {
  // Obtener los datos del producto usando el slug desde los parámetros de la URL
  const product = await getProductBySlug(params.id);

  // Si no se encuentra el producto, mostrar página 404
  if (!product) {
    notFound(); // Función de Next.js que renderiza la página not-found.tsx
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Contenedor principal con máximo ancho y padding responsivo */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Grid principal: 1 columna en mobile, 2 columnas en desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* SECCIÓN IZQUIERDA: Galería de imágenes */}
          <div className="space-y-4">
            {/* Imagen principal del producto */}
            <div className="aspect-square bg-white rounded-lg overflow-hidden shadow-lg">
              <img
                src={product.images[0]} // Primera imagen como principal
                alt={product.name}
                className="w-full h-full object-cover" // Mantiene aspecto y cubre todo el contenedor
              />
            </div>
            
            {/* Miniaturas adicionales si hay más de una imagen */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {/* Mostrar hasta 4 imágenes adicionales (índices 1-4) */}
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

          {/* SECCIÓN DERECHA: Información del producto */}
          <div className="space-y-6">
            
            {/* Título y descripción corta */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
              <p className="text-lg text-gray-600 mt-2">{product.shortDescription}</p>
            </div>

            {/* Sección de precios con descuentos */}
            <div className="flex items-center space-x-4">
              {/* Precio actual */}
              <span className="text-3xl font-bold text-green-600">
                ${product.price.toFixed(2)}
              </span>
              
              {/* Precio original y porcentaje de descuento (condicional) */}
              {product.originalPrice && (
                <>
                  {/* Precio original tachado */}
                  <span className="text-xl text-gray-500 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                  {/* Badge de descuento */}
                  <span className="bg-red-100 text-red-800 text-sm font-medium px-2.5 py-0.5 rounded">
                    -{product.discountPercentage}%
                  </span>
                </>
              )}
            </div>

            {/* Rating con estrellas y cantidad de reseñas */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                {/* Generar 5 estrellas dinámicamente */}
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    // Colorear estrellas según el rating
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    {/* Path SVG para forma de estrella */}
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              {/* Texto con rating numérico y cantidad de reseñas */}
              <span className="text-sm text-gray-600">
                {product.rating} ({product.reviewsCount} reseñas)
              </span>
            </div>

            {/* Lista de características principales (condicional) */}
            {product.features && product.features.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Características principales</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      {/* Checkmark verde para cada característica */}
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Colores disponibles (si hay más de uno) */}
            {product.colors && product.colors.length > 1 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Colores disponibles</h3>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color, index) => (
                    // Cada color como un badge
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

            {/* Indicador de stock */}
            <div className="flex items-center space-x-2">
              {/* Badge de estado del stock con colores condicionales */}
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                product.stock > 0 
                  ? 'bg-green-100 text-green-800'  // Verde si hay stock
                  : 'bg-red-100 text-red-800'     // Rojo si no hay stock
              }`}>
                {product.stock > 0 ? 'En stock' : 'Agotado'}
              </span>
              
              {/* Advertencia de stock bajo (solo si hay stock y es <= 10) */}
              {product.stock > 0 && product.stock <= 10 && (
                <span className="text-sm text-orange-600">
                  Solo quedan {product.stock} unidades
                </span>
              )}
            </div>

            {/* Botones de acción */}
            <div className="space-y-4">
              {/* Botón principal - Agregar al carrito */}
              <button
                disabled={product.stock === 0} // Deshabilitado si no hay stock
                className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-colors ${
                  product.stock > 0
                    ? 'bg-blue-600 hover:bg-blue-700'    // Azul activo con hover
                    : 'bg-gray-400 cursor-not-allowed'   // Gris deshabilitado
                }`}
              >
                {product.stock > 0 ? 'Agregar al carrito' : 'No disponible'}
              </button>
              
              {/* Botón secundario - Lista de deseos */}
              <button className="w-full py-3 px-4 rounded-lg font-semibold text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 transition-colors">
                Agregar a lista de deseos
              </button>
            </div>

            {/* Información adicional del producto */}
            <div className="border-t pt-6 space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                
                {/* Marca (siempre se muestra) */}
                <div>
                  <span className="text-gray-600">Marca:</span>
                  <span className="ml-2 font-medium">{product.brand}</span>
                </div>
                
                {/* Garantía (condicional) */}
                {product.warranty && (
                  <div>
                    <span className="text-gray-600">Garantía:</span>
                    <span className="ml-2 font-medium">{product.warranty}</span>
                  </div>
                )}
                
                {/* Dimensiones (condicional) */}
                {product.dimensions && (
                  <div>
                    <span className="text-gray-600">Dimensiones:</span>
                    <span className="ml-2 font-medium">{product.dimensions}</span>
                  </div>
                )}
                
                {/* Peso (condicional) */}
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

        {/* SECCIÓN INFERIOR: Descripción completa */}
        <div className="mt-12">
          <div className="border-t pt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Descripción del producto</h2>
            
            {/* Contenedor con estilos de prosa para mejor legibilidad */}
            <div className="prose max-w-none text-gray-700">
              <p>{product.description}</p>
              
              {/* Especificaciones técnicas (condicional) */}
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

// FUNCIÓN PARA GENERACIÓN ESTÁTICA (SSG - Static Site Generation)
// Esta función le dice a Next.js qué páginas generar en build time
export async function generateStaticParams() {
  // Obtener todos los productos de la base de datos
  const products = await getAllProducts();
  
  // Retornar array de objetos con los parámetros para cada página estática
  return products.map((product) => ({
    id: product.slug, // El slug se usará como [id] en la URL
  }));
}

// FUNCIÓN PARA METADATOS DINÁMICOS (SEO)
// Genera metadatos específicos para cada producto
export async function generateMetadata({ params }: ProductPageParams) {
  // Obtener datos del producto usando el slug
  const product = await getProductBySlug(params.id);

  // Si no existe el producto, retornar metadatos por defecto
  if (!product) {
    return {
      title: 'Producto no encontrado',
    };
  }

  // Retornar metadatos optimizados para SEO y redes sociales
  return {
    title: `${product.name} - Tu Tienda`, // Título de la página
    description: product.shortDescription, // Meta descripción
    openGraph: { // Metadatos para Facebook, Twitter, etc.
      title: product.name,
      description: product.shortDescription,
      images: [product.images[0]], // Imagen principal para preview
    },
  };
}