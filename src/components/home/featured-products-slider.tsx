// src/components/home/featured-products-slider.tsx
"use client";

import React, { useState, useEffect, useCallback, } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Product, } from '@/types';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/shared/product-card';

interface FeaturedProductsSliderProps {
  products?: Product[];
  itemsPerView?: {
    desktop: number;
    tablet: number;
    mobile: number;
  };
  autoPlayInterval?: number;
  showControls?: boolean;
  showDots?: boolean;
}

const FeaturedProductsSlider: React.FC<FeaturedProductsSliderProps> = ({
  products: propProducts,
  itemsPerView = { desktop: 4, tablet: 2, mobile: 1 },
  autoPlayInterval = 5000,
  showControls = true,
  showDots = true,
}) => {
  // ✅ TODOS LOS HOOKS AL INICIO
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  const [currentItemsPerView, setCurrentItemsPerView] = useState<number>(itemsPerView.desktop);

  // Usar propProducts directamente
  const productsToDisplay = propProducts;
  const maxIndex = Math.max(0, (productsToDisplay?.length || 0) - currentItemsPerView);

  // ✅ useEffect para manejo de resize
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setCurrentItemsPerView(itemsPerView.desktop);
      } else if (width >= 768) {
        setCurrentItemsPerView(itemsPerView.tablet);
      } else {
        setCurrentItemsPerView(itemsPerView.mobile);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [itemsPerView]);

  // ✅ useEffect para autoplay
  useEffect(() => {
    if (!isAutoPlaying || !productsToDisplay || productsToDisplay.length <= currentItemsPerView) return;
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
    }, autoPlayInterval);
    return () => clearInterval(interval);
  }, [isAutoPlaying, maxIndex, autoPlayInterval, productsToDisplay, currentItemsPerView]);

  // ✅ useCallback hooks
  const handlePrevious = useCallback(() => {
    setCurrentIndex(prev => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  const handleNext = useCallback(() => {
    setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  // ✅ Return condicional DESPUÉS de todos los hooks
  if (!productsToDisplay || productsToDisplay.length === 0) {
    return <p className="text-center text-gray-500 py-8">No hay productos destacados para mostrar en este momento.</p>;
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div
        className="flex transition-transform duration-700 ease-out"
        style={{
          transform: `translateX(-${currentIndex * (100 / currentItemsPerView)}%)`
        }}
      >
        {productsToDisplay.map((product) => (
          <div
            key={product.id}
            className="flex-shrink-0 px-2"
            style={{ width: `${100 / currentItemsPerView}%` }}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {/* Controles de Navegación */}
      {showControls && productsToDisplay.length > currentItemsPerView && (
        <>
          <Button
            onClick={handlePrevious}
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 transform -translate-x-1/2 md:-translate-x-0 bg-white/80 hover:bg-white shadow-lg rounded-full p-2 z-20 disabled:opacity-40 disabled:cursor-not-allowed transition-all hover:scale-105"
            disabled={currentIndex === 0}
            aria-label="Anterior"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-gray-700" />
          </Button>
          <Button
            onClick={handleNext}
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 transform translate-x-1/2 md:translate-x-0 bg-white/80 hover:bg-white shadow-lg rounded-full p-2 z-20 disabled:opacity-40 disabled:cursor-not-allowed transition-all hover:scale-105"
            disabled={currentIndex >= maxIndex}
            aria-label="Siguiente"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-gray-700" />
          </Button>
        </>
      )}

      {/* Indicadores de Puntos */}
      {showDots && productsToDisplay.length > currentItemsPerView && (
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 hover:scale-125 ${
                index === currentIndex 
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 scale-125' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Ir al slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FeaturedProductsSlider;