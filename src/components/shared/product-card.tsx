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
import { getCategoryName } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  // ========== ESTADOS LOCALES ==========
  // Controla si el usuario está haciendo hover sobre la card
  const [isHovered, setIsHovered] = useState(false);
  
  // Previene el flash de contenido mientras la imagen carga
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Maneja qué imagen mostrar cuando hay múltiples imágenes del producto
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // ========== CÁLCULOS DINÁMICOS ==========
  // Calcula el porcentaje de descuento basado en precio original vs precio actual
  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div 
      // Contenedor principal con efectos de transformación en hover (se eleva 8px)
      className="group relative transform transition-all duration-500 hover:-translate-y-2"
      onMouseEnter={() => setIsHovered(true)}   // Activa estado hover
      onMouseLeave={() => setIsHovered(false)}  // Desactiva estado hover
    >
      <Card className="relative overflow-hidden bg-white border-0 shadow-lg group-hover:shadow-2xl transition-all duration-500 rounded-2xl">
        
        {/* ========== EFECTO DE RESPLANDOR ==========*/}
        {/* Overlay con gradiente sutil que aparece solo en hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-orange-400/0 via-orange-500/5 to-red-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
        
        <CardHeader className="p-0 relative overflow-hidden rounded-t-2xl bg-gradient-to-b from-gray-50 to-white">
          
          {/* ========== CONTENEDOR DE IMAGEN PRINCIPAL ==========*/}
          {/* Aspect ratio 4:3 fijo para mantener consistencia visual */}
          <div className="relative aspect-[4/3] overflow-hidden">
            <Link href={`/products/${product.slug}`} className="block h-full">
              <Image
                // Lógica para mostrar imagen: array[índiceActual] o imagen por defecto
                src={
  Array.isArray(product.images) && product.images.length > 0
    ? (product.images[currentImageIndex] || product.images[0]).url // <--- AÑADE .url AQUÍ
    : '/placeholder.jpg'
}
                alt={product.name}
                fill // Ocupa todo el contenedor padre manteniendo aspect ratio
                className={`object-cover transition-all duration-700 group-hover:scale-110 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0' // Fade in suave cuando carga
                }`}
                onLoad={() => setImageLoaded(true)} // Callback cuando la imagen termina de cargar
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Optimización responsive
              />
              
              {/* Overlay oscuro que mejora la legibilidad de elementos sobre la imagen */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>

            {/* ========== BADGES INFORMATIVOS (Esquina superior izquierda) ==========*/}
            <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
              {/* Badge de descuento - se muestra solo si existe precio original */}
              {product.originalPrice && (
                <Badge className="bg-gradient-to-r from-red-500 to-red-600 text-white font-bold shadow-lg transform hover:scale-105 transition-transform">
                  -{discount}%
                </Badge>
              )}
              {/* Badge de stock bajo - alerta cuando quedan menos de 5 unidades */}
              {product.stock < 5 && product.stock > 0 && (
                <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium shadow-lg">
                  ¡Últimas {product.stock}!
                </Badge>
              )}
            </div>

            {/* ========== INDICADORES DE GALERÍA DE IMÁGENES ==========*/}
            {/* Solo se muestran si hay más de 1 imagen */}
            {Array.isArray(product.images) && product.images.length > 1 && (
              <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {product.images.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-200 ${
                      index === currentImageIndex 
                        ? 'bg-white shadow-lg scale-125' // Punto activo (imagen actual)
                        : 'bg-white/60 hover:bg-white/80' // Puntos inactivos
                    }`}
                    onMouseEnter={() => setCurrentImageIndex(index)} // Cambia imagen al pasar mouse
                  />
                ))}
              </div>
            )}

            {/* ========== BOTONES DE ACCIÓN FLOTANTES ==========*/}
            {/* Aparecen con animación desde la derecha en hover */}
            <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
              {/* Botón de favoritos con animación de deslizamiento */}
              <div className={`transform transition-all duration-300 ${isHovered ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'}`}>
                <Button
                  size="sm"
                  variant="secondary"
                  className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
                >
                  <Heart className="w-4 h-4 text-gray-700" />
                </Button>
              </div>
              {/* Botón de vista rápida con delay de 100ms en la animación */}
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

        {/* ========== CONTENIDO PRINCIPAL DE LA CARD ==========*/}
        <CardContent className="p-5">
          <div className="space-y-3">
            
            {/* Información de marca del producto */}
            <p className="text-xs uppercase tracking-wide text-orange-500 font-semibold">
              {product.brand || 'Houzze Tec'} {/* Fallback a marca por defecto */}
            </p>
            
            {/* Categoría del producto (se procesa con función utilitaria) */}
            <span className="text-xs text-gray-500 capitalize block">
              {getCategoryName(product.category)}
            </span>

            {/* Título clickeable con efecto hover independiente */}
            <Link href={`/products/${product.slug}`} className="block group/title">
              <CardTitle className="text-lg font-bold text-gray-900 group-hover/title:text-orange-500 transition-colors duration-200 line-clamp-2 leading-tight">
                {product.name}
              </CardTitle>
            </Link>

            {/* ========== SISTEMA DE CALIFICACIÓN ==========*/}
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {/* Genera 5 estrellas, llenando según el rating */}
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-4 h-4 transition-colors duration-200 ${
                      i < Math.round(product.rating) 
                        ? 'fill-amber-400 text-amber-400' // Estrellas llenas (doradas)
                        : 'text-gray-300' // Estrellas vacías (grises)
                    }`} 
                  />
                ))}
              </div>
              {/* Rating numérico con 1 decimal */}
              <span className="text-sm text-gray-600 font-medium">
                {product.rating.toFixed(1)}
              </span>
              {/* Cantidad de reseñas entre paréntesis */}
              <span className="text-xs text-gray-400">
                ({product.reviewsCount})
              </span>
            </div>

            {/* ========== SECCIÓN DE PRECIOS ==========*/}
            <div className="flex items-center gap-3">
              {/* Precio actual con gradiente de colores llamativo */}
              <p className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                {/* Validación de tipo para evitar errores */}
                {typeof product.price === 'number' ? `$${product.price.toFixed(2)}` : 'Precio no disponible'}
              </p>
              {/* Precio original tachado (solo si hay descuento) */}
              {product.originalPrice && (
                <p className="text-lg text-gray-400 line-through font-medium">
                  ${product.originalPrice.toFixed(2)}
                </p>
              )}
            </div>
          </div>
        </CardContent>

        {/* ========== BOTONES DE ACCIÓN PRINCIPALES ==========*/}
        <CardFooter className="p-5 pt-0">
          <div className="flex gap-2 w-full">
            {/* Botón principal para ver detalles del producto */}
            <Button
              asChild // Permite que el botón contenga un Link
              className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
            >
              <Link href={`/products/${product.slug}`}>
                <Eye className="w-4 h-4 mr-2" />
                Ver Detalles
              </Link>
            </Button>
            {/* Botón secundario para agregar al carrito (solo icono) */}
            <Button
              size="icon"
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200 hover:border-gray-300 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              <ShoppingCart className="w-4 h-4" />
            </Button>
          </div>
        </CardFooter>

        {/* ========== OVERLAY PARA PRODUCTOS AGOTADOS ==========*/}
        {/* Se superpone a toda la card cuando stock = 0 */}
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