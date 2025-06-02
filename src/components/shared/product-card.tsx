// @/components/shared/product-card.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useCallback } from 'react';
import type { Product } from '@/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, ShoppingCart, Eye, Heart } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
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

  const { dispatch } = useCart();

  const discount = product.originalPrice && product.price < product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = useCallback((e: React.MouseEvent) => {
    e.stopPropagation(); 
    e.preventDefault();  

    // Para el ProductCard, usualmente no hay selección de color directa.
    // Si un producto tiene colores, el usuario iría a la página de detalle para elegir.
    // Así que aquí enviamos el producto base. Si tuvieras variantes en la card, aquí se añadiría selectedColor.
    const itemToAdd = { 
        ...product, 
        // selectedColor: undefined, // O el color por defecto si aplicara y lo tuvieras
        // addedAt: new Date().toISOString() // Si CartItem lo requiere y Product no lo tiene
    };

    dispatch({ type: 'ADD_ITEM', payload: itemToAdd as Product }); // Asegúrate que el payload coincida con CartAction
    
    console.log(`${product.name} añadido al carrito desde la tarjeta!`);
    // import { toast } from "sonner";
    // toast.success(`${product.name} añadido al carrito!`);
  }, [dispatch, product]);

  return (
    <div 
      className="group relative transform transition-all duration-500 hover:-translate-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        // setCurrentImageIndex(0); // <--- ESTA LÍNEA SE QUITA O COMENTA para evitar el error de profundidad máxima.
                                  // La imagen se mantendrá en la última vista por los puntos.
                                  // Si el mouse sale de la card y vuelve a entrar (sin tocar los puntos),
                                  // currentImageIndex no se resetea, lo cual es aceptable.
      }}
    >
      <Card className="relative overflow-hidden bg-white border-0 shadow-lg group-hover:shadow-2xl transition-all duration-500 rounded-2xl flex flex-col h-full">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-400/0 via-orange-500/5 to-red-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />
        
        <CardHeader className="p-0 relative overflow-hidden rounded-t-2xl bg-gradient-to-b from-gray-50 to-white">
          <div className="relative aspect-[4/3] overflow-hidden">
            <Link href={`/products/${product.slug}`} className="block h-full" aria-label={`Ver detalles de ${product.name}`}>
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
                sizes="(max-width: 640px) 90vw, (max-width: 768px) 45vw, (max-width: 1024px) 30vw, 23vw" // Ajustado sizes
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </Link>

            <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
              {discount > 0 && (
                <Badge className="bg-gradient-to-r from-red-500 to-red-600 text-white font-bold shadow-lg text-xs px-2 py-0.5"> {/* Badge más pequeño */}
                  -{discount}%
                </Badge>
              )}
              {product.stock < 5 && product.stock > 0 && (
                <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium shadow-lg text-xs px-2 py-0.5"> {/* Badge más pequeño */}
                  ¡Últimas {product.stock}!
                </Badge>
              )}
            </div>

            {Array.isArray(product.images) && product.images.length > 1 && (
              <div className="absolute bottom-2.5 left-1/2 transform -translate-x-1/2 flex gap-1.5 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {product.images.map((image, index) => (
                  <button
                    key={image.id}
                    className={`w-2 h-2 rounded-full transition-all duration-200 border border-white/60 shadow-sm ${ // Ajustado tamaño y borde
                      index === currentImageIndex 
                        ? 'bg-white scale-110' 
                        : 'bg-white/50 hover:bg-white/70'
                    }`}
                    onMouseEnter={() => setCurrentImageIndex(index)}
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); setCurrentImageIndex(index);}}
                    aria-label={`Ver imagen ${index + 1}`}
                  />
                ))}
              </div>
            )}
            <div className="absolute top-2 right-2 flex flex-col gap-1.5 z-10"> {/* Ajustado posición y gap */}
              <div className={`transform transition-all duration-300 ${isHovered ? 'translate-x-0 opacity-100' : 'translate-x-6 opacity-0'}`}> {/* Ajustada animación */}
                <Button 
                  size="icon" // Usar size="icon" de shadcn/ui para botones de icono
                  variant="secondary" 
                  className="w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white shadow-md hover:shadow-lg" /* Ajustado tamaño y estilos */
                  title="Añadir a favoritos"
                >
                  <Heart className="w-3.5 h-3.5 text-gray-600" /> {/* Ajustado tamaño de icono */}
                </Button>
              </div>
              <div className={`transform transition-all duration-300 delay-75 ${isHovered ? 'translate-x-0 opacity-100' : 'translate-x-6 opacity-0'}`}> {/* Ajustada animación y delay */}
                <Button 
                  size="icon" 
                  variant="secondary" 
                  className="w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white shadow-md hover:shadow-lg" /* Ajustado tamaño y estilos */
                  title="Vista rápida"
                >
                  <Eye className="w-3.5 h-3.5 text-gray-600" /> {/* Ajustado tamaño de icono */}
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-3 sm:p-4 space-y-1.5 flex-grow flex flex-col justify-between"> {/* Ajustado padding y space */}
          <div>
            <p className="text-[11px] sm:text-xs uppercase tracking-wide text-orange-600 font-semibold"> {/* Color más vivo */}
              {product.brand || 'Houzze Tec'}
            </p>
            <span className="text-[11px] sm:text-xs text-gray-500 capitalize block mt-0.5">
              {product.category?.name || product.categorySlug || 'Sin Categoría'}
            </span>
            <Link href={`/products/${product.slug}`} className="block group/title mt-1">
              <CardTitle className="text-sm sm:text-base font-bold text-gray-800 group-hover/title:text-orange-600 transition-colors duration-200 line-clamp-2 leading-snug min-h-[2.25rem] sm:min-h-[2.5rem]"> {/* Ajustado tamaño y min-h */}
                {product.name}
              </CardTitle>
            </Link>
          </div>
          
          <div className="pt-1"> {/* Añadido pt para separar del título */}
            {typeof product.rating === 'number' && product.rating > 0 && ( // Mostrar solo si hay rating > 0
              <div className="flex items-center gap-1 mt-1">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-3 h-3 sm:w-3.5 sm:h-3.5 transition-colors duration-200 ${ /* Tamaño responsivo */
                        i < Math.round(product.rating) 
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-gray-300'
                      }`} 
                    />
                  ))}
                </div>
                <span className="text-[10px] sm:text-xs text-gray-500 font-medium"> {/* Tamaño responsivo */}
                  {product.rating.toFixed(1)}
                </span>
                <span className="text-[10px] sm:text-xs text-gray-400"> {/* Tamaño responsivo */}
                  ({product.reviewsCount})
                </span>
              </div>
            )}

            <div className="flex items-baseline gap-1.5 sm:gap-2 pt-1.5 flex-wrap"> {/* flex-wrap para precios largos */}
              <p className="text-lg sm:text-xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                {formatCurrencyCOP(product.price)}
              </p>
              {product.originalPrice && product.originalPrice > product.price && (
                <p className="text-xs sm:text-sm text-gray-400 line-through">
                  {formatCurrencyCOP(product.originalPrice)}
                </p>
              )}
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-3 sm:p-4 pt-1.5 sm:pt-2"> {/* Ajustado padding */}
          <div className="flex gap-2 w-full">
            <Button
              asChild
              className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold shadow-md hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200 text-xs sm:text-sm h-8 sm:h-9" /* Tamaño responsivo */
            >
              <Link href={`/products/${product.slug}`}>
                <Eye className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1 sm:mr-1.5" /> {/* Tamaño responsivo */}
                Ver Detalles
              </Link>
            </Button>
            <Button
              size="icon"
              variant="outline"
              className="border-gray-300 hover:bg-gray-100 text-gray-700 shadow-sm hover:shadow-md transform hover:scale-105 transition-all duration-200 h-8 w-8 sm:h-9 sm:w-9" /* Tamaño responsivo */
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              title="Agregar al carrito"
            >
              <ShoppingCart className="w-3.5 h-3.5 sm:w-4 sm:w-4" /> {/* Tamaño responsivo */}
            </Button>
          </div>
        </CardFooter>

        {product.stock === 0 && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center rounded-2xl pointer-events-none">
            <Badge className="bg-gray-600 text-white text-sm sm:text-base px-3 py-1 sm:px-4 sm:py-2 shadow-xl"> {/* Tamaño responsivo */}
              Agotado
            </Badge>
          </div>
        )}
      </Card>
    </div>
  );
}