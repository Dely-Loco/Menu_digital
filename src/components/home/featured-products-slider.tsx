"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Product } from '@/types';
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
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  const [currentItemsPerView, setCurrentItemsPerView] = useState<number>(itemsPerView.desktop);

  const productsToDisplay = propProducts || [];
  const { desktop, tablet, mobile } = itemsPerView;

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setCurrentItemsPerView(desktop);
      } else if (width >= 768) {
        setCurrentItemsPerView(tablet);
      } else {
        setCurrentItemsPerView(mobile);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [desktop, tablet, mobile]);

  const maxIndex = Math.max(0, productsToDisplay.length - currentItemsPerView);

  useEffect(() => {
    if (!isAutoPlaying || productsToDisplay.length <= currentItemsPerView || maxIndex === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
    }, autoPlayInterval);
    return () => clearInterval(interval);
  }, [isAutoPlaying, maxIndex, autoPlayInterval, productsToDisplay.length, currentItemsPerView]);

  const handlePrevious = useCallback(() => {
    setCurrentIndex(prev => prev <= 0 ? maxIndex : prev - 1);
  }, [maxIndex]);

  const handleNext = useCallback(() => {
    setCurrentIndex(prev => prev >= maxIndex ? 0 : prev + 1);
  }, [maxIndex]);

  if (!productsToDisplay || productsToDisplay.length === 0) {
    return <p className="text-center text-gray-500 py-8">No hay productos destacados para mostrar en este momento.</p>;
  }

  return (
    <div
      className="relative group overflow-hidden"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Contenedor principal con padding para evitar que los items toquen los bordes */}
      <div className="px-4 md:px-6">
        {/* Contenedor del carrusel con overflow hidden */}
        <div className="relative overflow-hidden">
          {/* Contenedor de los items con margen negativo para compensar el padding */}
          <div
            className="flex transition-transform duration-700 ease-out -mx-2"
            style={{
              transform: `translateX(-${currentIndex * (100 / currentItemsPerView)}%)`,
            }}
          >
            {productsToDisplay.map((product) => (
              <div
                key={product.id}
                className="flex-shrink-0 px-2 md:px-3"
                style={{ 
                  width: `calc(${100 / currentItemsPerView}% - 16px)`,
                  minWidth: `calc(${100 / currentItemsPerView}% - 16px)`
                }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {showControls && productsToDisplay.length > currentItemsPerView && (
        <>
          <Button
            onClick={handlePrevious}
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-lg rounded-full p-2 z-20 disabled:opacity-40 disabled:cursor-not-allowed transition-all hover:scale-105"
            disabled={currentIndex === 0}
            aria-label="Anterior"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-gray-700" />
          </Button>
          <Button
            onClick={handleNext}
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-lg rounded-full p-2 z-20 disabled:opacity-40 disabled:cursor-not-allowed transition-all hover:scale-105"
            disabled={currentIndex >= maxIndex}
            aria-label="Siguiente"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-gray-700" />
          </Button>
        </>
      )}

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