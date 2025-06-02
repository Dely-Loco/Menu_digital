// src/components/home/featured-products-slider.tsx
"use client";

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Product } from '@/types'; // Solo Product es necesario aquí si ProductCard maneja el resto
import { Button } from '@/components/ui/button'; // Importación de Button
import ProductCard from '@/components/shared/product-card';

interface FeaturedProductsSliderProps {
  products?: Product[];
  itemsPerView?: { // Mantendremos el nombre 'itemsPerView' para la prop
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
  itemsPerView = { desktop: 4, tablet: 2, mobile: 1 }, // Valor por defecto
  autoPlayInterval = 5000,
  showControls = true,
  showDots = true,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  // El estado se inicializa con el valor desktop del objeto itemsPerView
  const [currentItemsPerView, setCurrentItemsPerView] = useState<number>(itemsPerView.desktop);

  // Si HomePage siempre pasa 'products' reales, estos defaultProducts no son necesarios.
  // const defaultProducts: Product[] = useMemo(() => [/* ... */], []); // Comentado como lo tenías
  const productsToDisplay = propProducts || []; // Usar array vacío si propProducts es undefined

  // Desestructura los valores de itemsPerView para usarlos en las dependencias del useEffect
  const { desktop, tablet, mobile } = itemsPerView;

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      // Usa los valores desestructurados 'desktop', 'tablet', 'mobile'
      if (width >= 1024) { // Asumiendo lg (desktop) es 1024px
        setCurrentItemsPerView(desktop);
      } else if (width >= 768) { // Asumiendo md (tablet) es 768px
        setCurrentItemsPerView(tablet);
      } else {
        setCurrentItemsPerView(mobile);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [desktop, tablet, mobile]); // <--- USA LOS VALORES PRIMITIVOS COMO DEPENDENCIAS

  if (!productsToDisplay || productsToDisplay.length === 0) {
    return <p className="text-center text-gray-500 py-8">No hay productos destacados para mostrar.</p>;
  }

  const maxIndex = Math.max(0, productsToDisplay.length - currentItemsPerView);

  useEffect(() => {
    if (!isAutoPlaying || productsToDisplay.length <= currentItemsPerView || maxIndex === 0 && productsToDisplay.length > 0) { // Ajuste para evitar autoPlay si solo hay una "página" de items
        // Si maxIndex es 0 pero hay productos (ej. 3 productos, 4 por vista), no debería haber autoplay.
        if(productsToDisplay.length > currentItemsPerView) {
            // procede con autoplay si hay más productos que los que se ven por vista
        } else {
            return; // No autoplay si todos los productos caben en una vista
        }
    }
    if (!isAutoPlaying) return; // Si isAutoPlaying es explícitamente false

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
            className="flex-shrink-0 px-2 md:px-3" 
            style={{ width: `${100 / currentItemsPerView}%` }}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {showControls && productsToDisplay.length > currentItemsPerView && (
        <>
          <Button
            onClick={handlePrevious}
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 transform -translate-x-3 md:-translate-x-1/2 bg-white/80 hover:bg-white shadow-lg rounded-full p-2 z-20 disabled:opacity-40 disabled:cursor-not-allowed transition-all hover:scale-105"
            disabled={currentIndex === 0}
            aria-label="Anterior"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-gray-700" />
          </Button>
          <Button
            onClick={handleNext}
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 transform translate-x-3 md:translate-x-1/2 bg-white/80 hover:bg-white shadow-lg rounded-full p-2 z-20 disabled:opacity-40 disabled:cursor-not-allowed transition-all hover:scale-105"
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