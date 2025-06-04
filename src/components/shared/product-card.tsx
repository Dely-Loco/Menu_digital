// @/components/shared/product-card.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useCallback } from 'react';
import type { Product } from '@/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, ShoppingCart, Eye, } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
}

// 🎨 FUNCIÓN PARA FORMATO DE MONEDA - PUEDES CAMBIAR EL FORMATO AQUÍ
const formatCurrencyCOP = (value?: number): string => {
  if (typeof value !== 'number') {
    return ''; 
  }
  return value.toLocaleString('es-CO', {
    style: 'currency',
    currency: 'COP',           // 💰 CAMBIAR MONEDA (USD, EUR, etc.)
    minimumFractionDigits: 0,  // 📊 DECIMALES MÍNIMOS
    maximumFractionDigits: 0,  // 📊 DECIMALES MÁXIMOS
  });
};

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { dispatch } = useCart();

  // 🏷️ CÁLCULO DE DESCUENTO - PUEDES MODIFICAR LA LÓGICA
  const discount = product.originalPrice && product.price < product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  // 🛒 FUNCIÓN PARA AÑADIR AL CARRITO
  const handleAddToCart = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch({ type: 'ADD_ITEM', payload: product });
    console.log(`${product.name} añadido al carrito!`);
  }, [dispatch, product]);

  return (
    <div 
      // 🎭 CONTENEDOR PRINCIPAL - EFECTOS DE HOVER Y ANIMACIONES
      className="group relative transform transition-all duration-500 hover:-translate-y-2" // 📏 CAMBIAR hover:-translate-y-2 por hover:-translate-y-4 para más elevación
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setCurrentImageIndex(0);
      }}
    >
      {/* 🃏 TARJETA PRINCIPAL */}
      <Card className="relative overflow-hidden bg-white border-0 shadow-lg group-hover:shadow-2xl transition-all duration-500 rounded-2xl flex flex-col h-full">
        {/* 🌈 EFECTO DE GRADIENTE AL HACER HOVER */}
        <div className="absolute inset-0 bg-gradient-to-r from-orange-400/0 via-orange-500/5 to-red-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />
        
        {/* 🖼️ SECCIÓN DE IMAGEN */}
        <CardHeader className="p-0 relative overflow-hidden rounded-t-2xl bg-gradient-to-b from-gray-50 to-white">
          <div className="relative aspect-[4/3] overflow-hidden"> {/* 📐 CAMBIAR aspect-[4/3] por aspect-square o aspect-[16/9] para diferentes proporciones */}
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
                }`} // 🔍 CAMBIAR group-hover:scale-110 por scale-105 o scale-125 para zoom diferente
                onLoad={() => setImageLoaded(true)}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </Link>

            {/* 🏷️ ETIQUETAS SUPERIORES IZQUIERDAS */}
            <div className=" absolute top-1 left-0 flex flex-col gap-2 z-10"> {/* 📍 CAMBIAR top-3 left-3 para reposicionar etiquetas */}
              {/* 💥 ETIQUETA DE DESCUENTO */}
              {discount > 0 && (
                <Badge className="bg-gradient-to-r from-red-500 to-red-600 text-white font-bold shadow-lg transform hover:scale-105 transition-transform">
                  -{discount}% {/* 🎯 TEXTO DEL DESCUENTO - PUEDES CAMBIAR EL FORMATO */}
                </Badge>
              )}
              {/* ⚠️ ETIQUETA DE STOCK BAJO */}
              {product.stock < 5 && product.stock > 0 && (
                <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium shadow-lg transform hover:scale-105 transition-transform">
                  ¡{product.stock} uds.! {/* 📦 TEXTO DE STOCK - PERSONALIZABLE */}
                </Badge>
              )}
              {/* 🌟 ETIQUETA DE MÁS VENDIDO */}
              {product.isBestseller && (
                <Badge className="bg-gradient-to-r from-purple-500 to-purple-600 text-white font-bold shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center gap-1">
                  +Vend. {/* 🏆 TEXTO PERSONALIZABLE */}
                </Badge>
              )}
              {/* ✨ ETIQUETA DE NUEVO */}
              {product.isNew && (
                <Badge className="bg-gradient-to-r from-emerald-500 to-green-500 text-white font-bold shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center gap-1">
                  Nuevo {/* 🆕 TEXTO PERSONALIZABLE */}
                </Badge>
              )}
            </div>

            {/* 🔘 INDICADORES DE IMÁGENES MÚLTIPLES */}
            {Array.isArray(product.images) && product.images.length > 1 && (
              <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1.5 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {product.images.map((image, index) => (
                  <button
                    key={image.id}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-200 border border-white/50 shadow-md ${ // 📏 CAMBIAR w-2.5 h-2.5 para tamaño de indicadores
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

            {/* 👁️ BOTONES DE ACCIÓN SUPERIOR DERECHA */}
            <div className="absolute top-3 right-3 flex flex-col gap-2 z-10"> {/* 📍 CAMBIAR top-3 right-3 para reposicionar */}
              <div className={`transform transition-all duration-300 delay-100 ${isHovered ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'}`}>
                <Button 
                  size="sm" 
                  variant="secondary" 
                  className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110" // 📏 CAMBIAR w-10 h-10 para tamaño del botón
                  title="Vista rápida"
                >
                  <Eye className="w-4 h-4 text-gray-700" /> {/* 📏 CAMBIAR w-4 h-4 para tamaño del ícono */}
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>

        {/* 📝 CONTENIDO PRINCIPAL DE LA TARJETA */}
        <CardContent className="p-4 space-y-2.5 flex-grow flex flex-col justify-between"> {/* 📏 CAMBIAR p-4 para padding del contenido */}
          <div>
            {/* 🏢 MARCA DEL PRODUCTO */}
            <p className="text-xs uppercase tracking-wide text-orange-500 font-semibold"> {/* 📏 CAMBIAR text-xs por text-sm, text-base, etc. para tamaño de marca */}
              {product.brand || 'Houzze Tec'} {/* 🏷️ MARCA - PUEDES CAMBIAR EL TEXTO POR DEFECTO */}
            </p>
            {/* 📂 CATEGORÍA DEL PRODUCTO */}
            <span className="text-xs text-gray-500 capitalize block mt-0.5"> {/* 📏 CAMBIAR text-xs para tamaño de categoría */}
              {product.category?.name || product.categorySlug || 'Sin Categoría'} {/* 📂 CATEGORÍA - TEXTO PERSONALIZABLE */}
            </span>
            {/* 📛 NOMBRE DEL PRODUCTO - ¡AQUÍ PUEDES MODIFICAR COMO DESEES! */}
            <Link href={`/products/${product.slug}`} className="block group/title mt-1.5">
              <CardTitle className="text-xl font-bold text-gray-800 group-hover/title:text-orange-500 transition-colors duration-200 line-clamp-2 leading-snug min-h-[2.5rem]"> 
                {/* 📏 CAMBIAR text-md por text-sm, text-lg, text-xl para tamaño del nombre */}
                {/* 🎨 CAMBIAR font-bold por font-medium, font-semibold, font-black para grosor */}
                {/* 🌈 CAMBIAR text-gray-800 por cualquier color para el texto */}
                {/* 📐 CAMBIAR line-clamp-2 por line-clamp-1 o line-clamp-3 para número de líneas */}
                {product.name} {/* 📛 AQUÍ ESTÁ EL NOMBRE - PUEDES CAMBIARLO POR: */}
                {/* {product.name.toUpperCase()} - Para mayúsculas */}
                {/* {product.name.substring(0, 30)}... - Para limitar caracteres */}
                {/* `⭐ ${product.name}` - Para agregar emojis */}
              </CardTitle>
            </Link>
          </div>
          
          <div>
            {/* ⭐ SISTEMA DE CALIFICACIÓN */}
            {typeof product.rating === 'number' && (
              <div className="flex items-center gap-1.5 mt-0">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-3.5 h-3.5 transition-colors duration-200 ${ // 📏 CAMBIAR w-3.5 h-3.5 para tamaño de estrellas
                        i < Math.round(product.rating) 
                          ? 'fill-amber-400 text-amber-400' // 🌈 CAMBIAR amber-400 por otro color para estrellas activas
                          : 'text-gray-300' // 🌈 CAMBIAR gray-300 para estrellas inactivas
                      }`} 
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-600 font-medium"> {/* 📏 CAMBIAR text-xs para tamaño del rating */}
                  {product.rating.toFixed(1)}
                </span>
                <span className="text-xs text-gray-400"> {/* 📏 CAMBIAR text-xs para tamaño del contador */}
                  ({product.reviewsCount})
                </span>
              </div>
            )}

            {/* 💰 SECCIÓN DE PRECIOS - ¡MUY IMPORTANTE PARA PERSONALIZAR! */}
            <div className="flex items-baseline gap-2 pt-2">
              {/* 💵 PRECIO PRINCIPAL */}
              <p className="text-xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                {/* 📏 CAMBIAR text-xl por text-sm, text-lg, text-2xl, text-3xl para tamaño del precio */}
                {/* 🎨 CAMBIAR font-bold por font-medium, font-semibold, font-black para grosor */}
                {/* 🌈 CAMBIAR from-orange-500 to-red-500 por otros colores para el gradiente */}
                {formatCurrencyCOP(product.price)} {/* 💰 PRECIO FORMATEADO */}
              </p>
              {/* 💸 PRECIO ORIGINAL (TACHADO) */}
              {product.originalPrice && product.originalPrice > product.price && (
                <p className="text-sm text-gray-400 line-through"> {/* 📏 CAMBIAR text-sm para tamaño del precio original */}
                  {formatCurrencyCOP(product.originalPrice)}
                </p>
              )}
            </div>
          </div>
        </CardContent>

        {/* 🎯 BOTONES DE ACCIÓN INFERIOR */}
        <CardFooter className="p-4 pt-2"> {/* 📏 CAMBIAR p-4 para padding del footer */}
          <div className="flex gap-2 w-full">
            {/* 👀 BOTÓN VER DETALLES */}
            <Button
              asChild
              className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 text-sm h-9"
              // 🌈 CAMBIAR from-orange-500 to-red-500 por otros colores
              // 📏 CAMBIAR text-sm por text-xs, text-base para tamaño del texto
              // 📏 CAMBIAR h-9 por h-8, h-10, h-12 para altura del botón
            >
              <Link href={`/products/${product.slug}`}>
                <Eye className="w-3.5 h-3.5 mr-1.5" /> {/* 📏 CAMBIAR w-3.5 h-3.5 para tamaño del ícono */}
                Ver Detalles {/* 📝 TEXTO DEL BOTÓN - PERSONALIZABLE */}
              </Link>
            </Button>
            {/* 🛒 BOTÓN AGREGAR AL CARRITO */}
            <Button
              size="icon"
              variant="outline"
              className="border-gray-300 hover:bg-gray-100 text-gray-700 shadow-sm hover:shadow-md transform hover:scale-105 transition-all duration-200 h-9 w-9"
              // 📏 CAMBIAR h-9 w-9 para tamaño del botón
              // 🌈 CAMBIAR border-gray-300, hover:bg-gray-100 para colores
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              title="Agregar al carrito"
            >
              <ShoppingCart className="w-4 h-4" /> {/* 📏 CAMBIAR w-4 h-4 para tamaño del ícono */}
            </Button>
          </div>
        </CardFooter>

        {/* 🚫 OVERLAY DE PRODUCTO AGOTADO */}
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center rounded-2xl pointer-events-none">
            <Badge className="bg-gray-600 text-white text-md px-4 py-2 shadow-xl"> {/* 📏 CAMBIAR text-md, px-4 py-2 para tamaño */}
              Agotado {/* 📝 TEXTO PERSONALIZABLE */}
            </Badge>
          </div>
        )}
      </Card>
    </div>
  );
}