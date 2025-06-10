// src/app/products/[id]/page.tsx

import { notFound } from 'next/navigation';
import { getProductBySlug, getAllProducts } from '@/lib/queries';
import type { Product } from '@/types';
import ProductImageGallery from '@/components/shared/ProductImageGallery';
import ProductActions from '@/components/products/ProductActions'; // <--- IMPORTA EL NUEVO COMPONENTE

// FUNCIÓN PARA FORMATEAR PRECIOS - Puedes cambiar la moneda aquí
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
    // 🎨 CONTENEDOR PRINCIPAL - Puedes cambiar colores de fondo y espaciado
    <div className="min-h-screen bg-gray-50 py-8 md:py-12">
      {/* 🎨 CONTENEDOR CENTRADO - max-w-6xl controla el ancho máximo */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 🎨 GRID PRINCIPAL - En móvil 1 columna, en desktop 2 columnas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          
          {/* GALERÍA DE IMÁGENES - Lado izquierdo */}
          <ProductImageGallery images={product.images || []} productName={product.name} />
          
          {/* INFORMACIÓN DEL PRODUCTO - Lado derecho */}
          <div className="space-y-5">
            
            {/* 🎨 SECCIÓN: MARCA Y TÍTULO */}
            <div>
              {/* 🎨 MARCA - Puedes cambiar colores y tamaño */}
              {product.brand && (
                <p className="text-sm text-blue-600 font-semibold mb-1 uppercase tracking-wider">
                  {product.brand}
                </p>
              )}
              
              {/* 🎨 TÍTULO PRINCIPAL - text-3xl md:text-4xl controla el tamaño */}
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
                {product.name}
              </h1>
              
              {/* 🎨 DESCRIPCIÓN CORTA - text-md controla el tamaño */}
              {product.shortDescription && (
                <p className="text-md text-gray-600 mt-3">
                  {product.shortDescription}
                </p>
              )}
            </div>

            {/* 🎨 SECCIÓN: PRECIOS - Muy personalizable */}
            <div className="flex items-baseline space-x-3">
              {/* 🎨 PRECIO ACTUAL - text-4xl controla el tamaño, text-blue-700 el color */}
              <span className="text-4xl font-bold text-blue-700">
                {formatPrice(product.price)}
              </span>
              
              {/* 🎨 PRECIO ORIGINAL Y DESCUENTO - Solo si hay descuento */}
              {product.originalPrice && product.originalPrice > product.price && (
                <>
                  {/* 🎨 PRECIO TACHADO - text-xl controla el tamaño */}
                  <span className="text-xl text-gray-400 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                  
                  {/* 🎨 BADGE DE DESCUENTO - Puedes cambiar bg-red-500 por otro color */}
                  {product.discountPercentage && (
                     <span className="bg-red-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                       -{product.discountPercentage}%
                     </span>
                  )}
                </>
              )}
            </div>

            {/* 🎨 SECCIÓN: RATING Y RESEÑAS */}
            {typeof product.rating === 'number' && product.reviewsCount >= 0 && (
              <div className="flex items-center space-x-2">
                {/* 🎨 ESTRELLAS - w-5 h-5 controla el tamaño */}
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.round(product.rating as number) 
                          ? 'text-yellow-400'  // 🎨 Color estrella llena
                          : 'text-gray-300'    // 🎨 Color estrella vacía
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                
                {/* 🎨 TEXTO DE RATING - text-sm controla el tamaño */}
                <span className="text-sm text-gray-600">
                  {product.rating.toFixed(1)} ({product.reviewsCount} reseñas)
                </span>
              </div>
            )}

            {/* 🎨 SECCIÓN: CARACTERÍSTICAS PRINCIPALES */}
            {product.features && product.features.length > 0 && (
              <div>
                {/* 🎨 TÍTULO DE CARACTERÍSTICAS - text-lg controla el tamaño */}
                <h3 className="text-lg font-semibold text-gray-900 mb-3 mt-4">
                  Características principales
                </h3>
                
                {/* 🎨 LISTA DE CARACTERÍSTICAS - Puedes cambiar el estilo de lista */}
                <ul className="space-y-1.5 list-disc list-inside pl-1 text-gray-700">
                  {product.features.map((feature, index) => (
                    <li key={index}>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* COMPONENTE DE ACCIONES (Botones de compra, etc.) */}
            <ProductActions product={product} /> 

            {/* 🎨 SECCIÓN: INFORMACIÓN ADICIONAL */}
            <div className="border-t pt-4 mt-5 text-sm">
                {/* 🎨 GARANTÍA - text-sm controla el tamaño */}
                {product.warranty && (
                    <p className="text-gray-600 mb-1">
                      <strong>Garantía:</strong> {product.warranty}
                    </p>
                )}
                
                {/* 🎨 DIMENSIONES */}
                {product.dimensions && (
                    <p className="text-gray-600 mb-1">
                      <strong>Dimensiones:</strong> {product.dimensions}
                    </p>
                )}
                
                {/* 🎨 PESO */}
                {product.weight && (
                    <p className="text-gray-600">
                      <strong>Peso:</strong> {product.weight}
                    </p>
                )}
            </div>
          </div>
        </div>

        {/* 🎨 SECCIÓN: DESCRIPCIÓN DETALLADA - Parte inferior */}
        <div className="mt-12 md:mt-16 pt-8 md:pt-12 border-t border-gray-200">
          {/* 🎨 TÍTULO DE DESCRIPCIÓN - text-2xl md:text-3xl controla el tamaño */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            Descripción del Producto
          </h2>
          
          {/* 🎨 CONTENIDO DE DESCRIPCIÓN - prose prose-lg controla el estilo */}
          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="whitespace-pre-wrap">{product.description}</p>
          </div>
          
          {/* 🎨 ESPECIFICACIONES TÉCNICAS */}
          {product.technicalSpec && (
            <div className="mt-8 md:mt-10">
              {/* 🎨 TÍTULO DE ESPECIFICACIONES - text-xl md:text-2xl controla el tamaño */}
              <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">
                Especificaciones Técnicas
              </h3>
              
              {/* 🎨 CONTENIDO DE ESPECIFICACIONES */}
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

/*
🎨 GUÍA RÁPIDA DE PERSONALIZACIÓN:

1. TAMAÑOS DE TEXTO:
   - text-xs: Muy pequeño
   - text-sm: Pequeño  
   - text-base: Normal
   - text-lg: Grande
   - text-xl: Extra grande
   - text-2xl, text-3xl, text-4xl: Títulos

2. COLORES PRINCIPALES:
   - text-blue-600/700: Azul (marca, precio)
   - text-gray-600/700/900: Grises (texto general)
   - text-red-500: Rojo (descuentos)
   - text-yellow-400: Amarillo (estrellas)
   - bg-gray-50: Fondo gris claro
   - bg-red-500: Fondo rojo (badges)

3. ESPACIADO:
   - space-y-1/2/3/4/5: Espaciado vertical
   - gap-8/12: Espacios en grid
   - p-4/6/8: Padding
   - m-4/6/8: Margin

4. CONTENEDORES:
   - max-w-6xl: Ancho máximo del contenedor
   - grid-cols-1 lg:grid-cols-2: Responsive grid

5. RESPONSIVE:
   - md:text-4xl: Tamaño en tablets y desktop
   - lg:grid-cols-2: Grid en desktop
   - sm:px-6: Padding en móviles

6. PERSONALIZAR FÁCILMENTE:
   - Cambia los números después de text- para tamaños
   - Cambia los colores (blue, red, gray, etc.)
   - Ajusta espaciado cambiando números
   - Modifica max-w-6xl por max-w-4xl o max-w-7xl para ancho

EJEMPLOS DE CAMBIOS RÁPIDOS:
- Título más grande: text-3xl → text-5xl
- Precio más pequeño: text-4xl → text-2xl  
- Fondo blanco: bg-gray-50 → bg-white
- Marca en rojo: text-blue-600 → text-red-600
*/