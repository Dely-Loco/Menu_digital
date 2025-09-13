// src/components/home/featured-platos-slider.tsx
"use client";

import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Plato } from '@/types';
import { Button } from '@/components/ui/button';
import PlatoCard from '@/components/shared/plato-card';

interface FeaturedPlatosSliderProps {
  platos?: Plato[];
  itemsPerView?: {
    desktop: number;
    tablet: number;
    mobile: number;
  };
  autoPlayInterval?: number;
  showControls?: boolean;
  showDots?: boolean;
  className?: string;
}

const FeaturedPlatosSlider: React.FC<FeaturedPlatosSliderProps> = ({
  platos: propPlatos = [],
  itemsPerView = { desktop: 4, tablet: 2, mobile: 1 },
  autoPlayInterval = 5000,
  showControls = true,
  showDots = true,
  className = "",
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  const [currentItemsPerView, setCurrentItemsPerView] = useState<number>(itemsPerView.desktop);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  
  // Refs para evitar memory leaks
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Estados para touch/swipe
  const [touchStart, setTouchStart] = useState<number>(0);
  const [touchEnd, setTouchEnd] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  // Memoizar platos para evitar re-renders innecesarios
  const platosToDisplay = useMemo(() => {
    return Array.isArray(propPlatos) ? propPlatos : [];
  }, [propPlatos]);

  // Memoizar el cálculo del maxIndex
  const maxIndex = useMemo(() => {
    return Math.max(0, platosToDisplay.length - currentItemsPerView);
  }, [platosToDisplay.length, currentItemsPerView]);

  // Función para determinar items por vista basado en el ancho de pantalla
  const getItemsPerView = useCallback(() => {
    if (typeof window === 'undefined') return itemsPerView.desktop;
    
    const width = window.innerWidth;
    if (width >= 1024) return itemsPerView.desktop;
    if (width >= 768) return itemsPerView.tablet;
    return itemsPerView.mobile;
  }, [itemsPerView.desktop, itemsPerView.tablet, itemsPerView.mobile]);

  // Efecto para manejar resize con debounce
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const handleResize = () => {
      // Debounce para evitar múltiples ejecuciones
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const newItemsPerView = getItemsPerView();
        if (newItemsPerView !== currentItemsPerView) {
          setCurrentItemsPerView(newItemsPerView);
          // Ajustar índice si es necesario
          const newMaxIndex = Math.max(0, platosToDisplay.length - newItemsPerView);
          setCurrentIndex(prev => Math.min(prev, newMaxIndex));
        }
      }, 100);
    };

    // Establecer valor inicial
    setCurrentItemsPerView(getItemsPerView());
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, [getItemsPerView, currentItemsPerView, platosToDisplay.length]);

  // Limpiar autoplay cuando se desmonta el componente
  useEffect(() => {
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, []);

  // Efecto para autoplay con mejor gestión
  useEffect(() => {
    // Limpiar interval anterior
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = null;
    }

    // No iniciar autoplay si no es necesario
    if (!isAutoPlaying || platosToDisplay.length <= currentItemsPerView || maxIndex === 0) {
      return;
    }

    autoPlayRef.current = setInterval(() => {
      setCurrentIndex(prev => {
        const next = prev >= maxIndex ? 0 : prev + 1;
        return next;
      });
    }, autoPlayInterval);

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
        autoPlayRef.current = null;
      }
    };
  }, [isAutoPlaying, maxIndex, autoPlayInterval, platosToDisplay.length, currentItemsPerView]);

  // Handlers con mejor gestión de transiciones
  const handlePrevious = useCallback(() => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentIndex(prev => prev <= 0 ? maxIndex : prev - 1);
    
    setTimeout(() => setIsTransitioning(false), 300);
  }, [maxIndex, isTransitioning]);

  const handleNext = useCallback(() => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentIndex(prev => prev >= maxIndex ? 0 : prev + 1);
    
    setTimeout(() => setIsTransitioning(false), 300);
  }, [maxIndex, isTransitioning]);

  const handleDotClick = useCallback((index: number) => {
    if (isTransitioning || index === currentIndex) return;
    
    setIsTransitioning(true);
    setCurrentIndex(index);
    
    setTimeout(() => setIsTransitioning(false), 300);
  }, [currentIndex, isTransitioning]);

  // Handlers para pause/resume
  const handleMouseEnter = useCallback(() => {
    setIsAutoPlaying(false);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsAutoPlaying(true);
  }, []);

  // Touch/Swipe handlers
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setTouchEnd(0); // Reset touchEnd
    setTouchStart(e.targetTouches[0].clientX);
    setIsDragging(true);
    setIsAutoPlaying(false); // Pausar autoplay durante swipe
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging) return;
    setTouchEnd(e.targetTouches[0].clientX);
  }, [isDragging]);

  const handleTouchEnd = useCallback(() => {
    if (!isDragging || !touchStart || !touchEnd) {
      setIsDragging(false);
      setIsAutoPlaying(true);
      return;
    }

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && currentIndex < maxIndex) {
      handleNext();
    } else if (isRightSwipe && currentIndex > 0) {
      handlePrevious();
    }

    setIsDragging(false);
    setIsAutoPlaying(true);
  }, [isDragging, touchStart, touchEnd, currentIndex, maxIndex, handleNext, handlePrevious]);

  // Mouse drag handlers para desktop
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setTouchStart(e.clientX);
    setIsDragging(true);
    setIsAutoPlaying(false);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return;
    setTouchEnd(e.clientX);
  }, [isDragging]);

  const handleMouseUp = useCallback(() => {
    if (!isDragging || !touchStart || !touchEnd) {
      setIsDragging(false);
      setIsAutoPlaying(true);
      return;
    }

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && currentIndex < maxIndex) {
      handleNext();
    } else if (isRightSwipe && currentIndex > 0) {
      handlePrevious();
    }

    setIsDragging(false);
    setIsAutoPlaying(true);
  }, [isDragging, touchStart, touchEnd, currentIndex, maxIndex, handleNext, handlePrevious]);

  // Global mouse up handler para desktop
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
        setIsAutoPlaying(true);
      }
    };

    if (isDragging) {
      document.addEventListener('mouseup', handleGlobalMouseUp);
      document.addEventListener('mouseleave', handleGlobalMouseUp);
    }

    return () => {
      document.removeEventListener('mouseup', handleGlobalMouseUp);
      document.removeEventListener('mouseleave', handleGlobalMouseUp);
    };
  }, [isDragging]);

  // Early return si no hay platos
  if (!platosToDisplay || platosToDisplay.length === 0) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-48 mx-auto"></div>
        </div>
      </div>
    );
  }

  const translateX = -(currentIndex * (100 / currentItemsPerView));

  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Container principal con overflow hidden */}
      <div 
        className="overflow-hidden cursor-grab select-none" 
        ref={containerRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        style={{ 
          cursor: isDragging ? 'grabbing' : 'grab',
          touchAction: 'pan-y pinch-zoom' // Permite scroll vertical pero previene horizontal
        }}
      >
        <div
          className={`flex transition-transform duration-500 ease-in-out will-change-transform ${isDragging ? 'transition-none' : ''}`}
          style={{
            transform: `translateX(${translateX}%)`,
            backfaceVisibility: 'hidden', // Evita flickering
            perspective: '1000px', // Mejora el rendering 3D
            userSelect: 'none' // Previene selección de texto durante drag
          }}
        >
          {platosToDisplay.map((plato, index) => (
            <div
              key={`${plato.id}-${index}`} // Key más estable
              className="flex-shrink-0 px-1 sm:px-2 md:px-3"
              style={{ 
                width: `${100 / currentItemsPerView}%`,
                minWidth: 0 // Evita overflow issues
              }}
            >
              <div className="h-full">
                <PlatoCard plato={plato} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Controles de Navegación */}
      {showControls && platosToDisplay.length > currentItemsPerView && (
        <>
          <Button
            onClick={handlePrevious}
            variant="outline"
            size="icon"
            disabled={isTransitioning}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 z-20 transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            aria-label="Plato anterior"
          >
            <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 text-gray-700" />
          </Button>
          
          <Button
            onClick={handleNext}
            variant="outline"
            size="icon"
            disabled={isTransitioning}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 z-20 transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            aria-label="Siguiente plato"
          >
            <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-gray-700" />
          </Button>
        </>
      )}

      {/* Indicadores de Puntos */}
      {showDots && platosToDisplay.length > currentItemsPerView && maxIndex > 0 && (
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              disabled={isTransitioning}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 hover:scale-125 disabled:cursor-not-allowed ${
                index === currentIndex 
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 scale-125' 
                  : 'bg-gray-300 hover:bg-gray-400 disabled:hover:bg-gray-300'
              }`}
              aria-label={`Ir al slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FeaturedPlatosSlider;