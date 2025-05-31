// @/components/shared/product-card.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useCallback } from 'react'; // Añadido useCallback
import type { Product } from '@/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, ShoppingCart, Eye, Heart } from 'lucide-react';
// import { getCategoryName } from "@/lib/utils"; // Comentado si no se usa directamente aquí
import { useCart } from '@/context/CartContext'; // <--- 1. IMPORTA useCart

interface ProductCardProps {
  product: Product;
  // Opcional: podrías pasar una función onAddToCart desde la página si necesitas lógica extra allí
  // onAddToCart?: (product: Product) => void; 
}

const formatCurrencyCOP = (value?: number): string => {
  if (typeof value !== 'number') {
    return ''; 
  }
  return value.toLocaleString('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
};

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { dispatch } = useCart(); // <--- 2. OBTÉN dispatch DEL CONTEXTO DEL CARRITO

  const discount = product.originalPrice && product.price < product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  // 3. CREA EL HANDLER PARA AÑADIR AL CARRITO
  const handleAddToCart = useCallback((e: React.MouseEvent) => {
    e.stopPropagation(); // Evita que el clic se propague al Link de la tarjeta si el botón está dentro
    e.preventDefault();  // Evita cualquier comportamiento por defecto si el botón estuviera en un form

    dispatch({ type: 'ADD_ITEM', payload: product });
    
    // Opcional: Mostrar alguna notificación o feedback visual
    console.log(`${product.name} añadido al carrito!`);
    // Podrías usar aquí la función `toast` de `sonner` o `react-hot-toast` si la tienes configurada
    // import { toast } from "sonner";
    // toast.success(`${product.name} añadido al carrito!`);

  }, [dispatch, product]);

  return (
    <div 
      className="group relative transform transition-all duration-500 hover:-translate-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setCurrentImageIndex(0);
      }}
    >
      <Card className="relative overflow-hidden bg-white border-0 shadow-lg group-hover:shadow-2xl transition-all duration-500 rounded-2xl flex flex-col h-full"> {/* Asegurar que la card ocupe toda la altura */}
        <div className="absolute inset-0 bg-gradient-to-r from-orange-400/0 via-orange-500/5 to-red-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />
        
        <CardHeader className="p-0 relative overflow-hidden rounded-t-2xl bg-gradient-to-b from-gray-50 to-white">
          <div className="relative aspect-[4/3] overflow-hidden">
            <Link href={`/products/${product.slug}`} className="block h-full">
              <Image
                src={
                  Array.isArray(product.images) && product.images.length > 0
                    ? (product.images[currentImageIndex]?.url || product.images[0]?.url)
                    : '/placeholder.jpg'
                }
                alt={product.images?.[currentImageIndex]?.alt || product.name}
                fill
                className={`object-contain transition-all duration-700 group-hover:scale-110 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => setImageLoaded(true)}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </Link>

            <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
              {discount > 0 && (
                <Badge className="bg-gradient-to-r from-red-500 to-red-600 text-white font-bold shadow-lg transform hover:scale-105 transition-transform">
                  -{discount}%
                </Badge>
              )}
              {product.stock < 5 && product.stock > 0 && (
                <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium shadow-lg">
                  ¡Últimas {product.stock}!
                </Badge>
              )}
            </div>

            {Array.isArray(product.images) && product.images.length > 1 && (
              <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1.5 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {product.images.map((image, index) => (
                  <button
                    key={image.id}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-200 border border-white/50 shadow-md ${
                      index === currentImageIndex 
                        ? 'bg-white scale-125' 
                        : 'bg-white/60 hover:bg-white/80'
                    }`}
                    onMouseEnter={() => setCurrentImageIndex(index)}
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); setCurrentImageIndex(index);}}
                    aria-label={`Ver imagen ${index + 1}`}
                  />
                ))}
              </div>
            )}
            <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
              <div className={`transform transition-all duration-300 ${isHovered ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'}`}>
                <Button 
                  size="sm" 
                  variant="secondary" 
                  className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
                  title="Añadir a favoritos" // Añadir title para accesibilidad
                  // onClick={handleAddToWishlist} // Necesitarías este handler
                >
                  <Heart className="w-4 h-4 text-gray-700" />
                </Button>
              </div>
              <div className={`transform transition-all duration-300 delay-100 ${isHovered ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'}`}>
                <Button 
                  size="sm" 
                  variant="secondary" 
                  className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
                  title="Vista rápida" // Añadir title
                  // onClick={handleQuickView} // Necesitarías este handler
                >
                  <Eye className="w-4 h-4 text-gray-700" />
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-4 space-y-2.5 flex-grow flex flex-col justify-between"> {/* flex-grow para que el contenido ocupe espacio */}
          <div> {/* Contenedor para la info superior */}
            <p className="text-xs uppercase tracking-wide text-orange-500 font-semibold">
              {product.brand || 'Houzze Tec'}
            </p>
            <span className="text-xs text-gray-500 capitalize block mt-0.5">
              {product.category?.name || product.categorySlug || 'Sin Categoría'}
            </span>
            <Link href={`/products/${product.slug}`} className="block group/title mt-1.5">
              <CardTitle className="text-md font-bold text-gray-800 group-hover/title:text-orange-500 transition-colors duration-200 line-clamp-2 leading-snug min-h-[2.5rem]"> {/* min-h para consistencia en altura */}
                {product.name}
              </CardTitle>
            </Link>
          </div>
          
          <div> {/* Contenedor para rating y precio, para empujar al fondo si CardContent es flex-col */}
            {typeof product.rating === 'number' && (
              <div className="flex items-center gap-1.5 mt-1.5">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-3.5 h-3.5 transition-colors duration-200 ${
                        i < Math.round(product.rating) 
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-gray-300'
                      }`} 
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-600 font-medium">
                  {product.rating.toFixed(1)}
                </span>
                <span className="text-xs text-gray-400">
                  ({product.reviewsCount})
                </span>
              </div>
            )}

            <div className="flex items-baseline gap-2 pt-2"> {/* Ajustado pt */}
              <p className="text-xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                {formatCurrencyCOP(product.price)}
              </p>
              {product.originalPrice && product.originalPrice > product.price && (
                <p className="text-sm text-gray-400 line-through">
                  {formatCurrencyCOP(product.originalPrice)}
                </p>
              )}
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-2"> {/* Ajustado padding */}
          <div className="flex gap-2 w-full">
            <Button
              asChild
              className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 text-sm h-9"
            >
              <Link href={`/products/${product.slug}`}>
                <Eye className="w-3.5 h-3.5 mr-1.5" />
                Ver Detalles
              </Link>
            </Button>
            <Button
              size="icon"
              variant="outline"
              className="border-gray-300 hover:bg-gray-100 text-gray-700 shadow-sm hover:shadow-md transform hover:scale-105 transition-all duration-200 h-9 w-9"
              onClick={handleAddToCart} // <--- 4. ASIGNA EL HANDLER AQUÍ
              disabled={product.stock === 0} // Opcional: deshabilitar si no hay stock
              title="Agregar al carrito" // Añadir title
            >
              <ShoppingCart className="w-4 h-4" />
            </Button>
          </div>
        </CardFooter>

        {product.stock === 0 && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center rounded-2xl pointer-events-none">
            <Badge className="bg-gray-600 text-white text-md px-4 py-2 shadow-xl">
              Agotado
            </Badge>
          </div>
        )}
      </Card>
    </div>
  );
}
