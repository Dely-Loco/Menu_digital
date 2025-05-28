// @/components/shared/product-card.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import type { Product } from '@/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, ShoppingCart, Eye, Heart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div 
      className="group relative transform transition-all duration-500 hover:-translate-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card className="relative overflow-hidden bg-white border-0 shadow-lg group-hover:shadow-2xl transition-all duration-500 rounded-2xl">
        {/* Efecto de resplandor en hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-orange-400/0 via-orange-500/5 to-red-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
        
        <CardHeader className="p-0 relative overflow-hidden rounded-t-2xl bg-gradient-to-b from-gray-50 to-white">
          <div className="relative aspect-[4/3] overflow-hidden">
            <Link href={`/products/${product.slug}`} className="block h-full">
              <Image
                src={product.images[currentImageIndex] || product.images[0]}
                alt={product.name}
                fill
                className={`object-cover transition-all duration-700 group-hover:scale-110 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => setImageLoaded(true)}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              
              {/* Overlay con gradiente en hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
              {product.originalPrice && (
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

            {/* Puntos indicadores de imágenes múltiples */}
            {product.images.length > 1 && (
              <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {product.images.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-200 ${
                      index === currentImageIndex 
                        ? 'bg-white shadow-lg scale-125' 
                        : 'bg-white/60 hover:bg-white/80'
                    }`}
                    onMouseEnter={() => setCurrentImageIndex(index)}
                  />
                ))}
              </div>
            )}

            {/* Botones de acción flotantes */}
            <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
              <div className={`transform transition-all duration-300 ${isHovered ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'}`}>
                <Button
                  size="sm"
                  variant="secondary"
                  className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
                >
                  <Heart className="w-4 h-4 text-gray-700" />
                </Button>
              </div>
              <div className={`transform transition-all duration-300 delay-100 ${isHovered ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'}`}>
                <Button
                  size="sm"
                  variant="secondary"
                  className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
                >
                  <Eye className="w-4 h-4 text-gray-700" />
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-5">
          <div className="space-y-3">
            {/* Marca */}
            <p className="text-xs uppercase tracking-wide text-orange-500 font-semibold">
              {product.brand || 'Houzze Tec'}
            </p>

            {/* Título */}
            <Link href={`/products/${product.slug}`} className="block group/title">
              <CardTitle className="text-lg font-bold text-gray-900 group-hover/title:text-orange-500 transition-colors duration-200 line-clamp-2 leading-tight">
                {product.name}
              </CardTitle>
            </Link>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-4 h-4 transition-colors duration-200 ${
                      i < Math.round(product.rating) 
                        ? 'fill-amber-400 text-amber-400' 
                        : 'text-gray-300'
                    }`} 
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600 font-medium">
                {product.rating.toFixed(1)}
              </span>
              <span className="text-xs text-gray-400">
                ({product.reviewsCount})
              </span>
            </div>

            {/* Precio */}
            <div className="flex items-center gap-3">
              <p className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                ${product.price.toFixed(2)}
              </p>
              {product.originalPrice && (
                <p className="text-lg text-gray-400 line-through font-medium">
                  ${product.originalPrice.toFixed(2)}
                </p>
              )}
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-5 pt-0">
          <div className="flex gap-2 w-full">
            <Button
              asChild
              className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
            >
              <Link href={`/products/${product.slug}`}>
                <Eye className="w-4 h-4 mr-2" />
                Ver Detalles
              </Link>
            </Button>
            <Button
              size="icon"
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200 hover:border-gray-300 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              <ShoppingCart className="w-4 h-4" />
            </Button>
          </div>
        </CardFooter>

        {/* Indicador de stock bajo */}
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center rounded-2xl">
            <Badge className="bg-red-600 text-white text-lg px-4 py-2">
              Agotado
            </Badge>
          </div>
        )}
      </Card>
    </div>
  );
}
