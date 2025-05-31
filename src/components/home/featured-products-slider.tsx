// src/components/home/featured-products-slider.tsx
"use client";

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react'; // Solo se necesitan estos iconos aquí
import type { Product, Category, ProductImage as ProductImageType } from '@/types'; // Importa ProductImage como tipo
import { Button } from '@/components/ui/button';

// =====> IMPORTA TU ProductCard <=====
import ProductCard from '@/components/shared/product-card'; // Asegúrate que la ruta sea correcta

interface FeaturedProductsSliderProps {
  products?: Product[];
  itemsPerView?: {
    desktop: number; // ej. 4
    tablet: number;  // ej. 2 o 3
    mobile: number;  // ej. 1 o 2
  };
  autoPlayInterval?: number;
  // El título y subtítulo usualmente se manejan en la página que USA el slider (HomePage)
  // title?: string; 
  // subtitle?: string;
  showControls?: boolean;
  showDots?: boolean;
  // Los handlers de click/addToCart/wishlist están DENTRO de ProductCard,
  // por lo que no son necesarios aquí a menos que necesites una lógica específica del slider.
}

const FeaturedProductsSlider: React.FC<FeaturedProductsSliderProps> = ({
  products: propProducts,
  itemsPerView = { desktop: 4, tablet: 2, mobile: 1 },
  autoPlayInterval = 5000,
  // title = "Productos Destacados", // Eliminado, se manejará en HomePage
  // subtitle = "Descubre nuestra selección de productos premium", // Eliminado
  showControls = true,
  showDots = true,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  const [currentItemsPerView, setCurrentItemsPerView] = useState<number>(itemsPerView.desktop);

  // Si HomePage SIEMPRE va a pasar productos reales, estos defaultProducts podrían no ser necesarios
  // o deberían estar completamente alineados con el tipo Product.
  // Por ahora, los comento para enfocarnos en los 'propProducts'.
  // Si necesitas un fallback, asegúrate de que estén completos.
  /*
  const defaultProducts: Product[] = useMemo(() => [
    // ... tus productos mock completos como los definimos para ProductCard ...
    // Ejemplo de un item (debe tener todos los campos de Product):
    {
      id: "default-slider-1",
      name: "Producto Slider Mock",
      slug: "producto-slider-mock",
      description: "Descripción completa del producto mock para el slider.",
      shortDescription: "Descripción corta.",
      price: 99.99,
      originalPrice: 119.99,
      discountPercentage: 17, // Calculado o fijo
      categorySlug: "general",
      category: { id: "cat-gen", name: "General", slug: "general", isPopular: false, createdAt: new Date().toISOString() },
      brand: "Marca Mock",
      images: [
        { id: "img-mock-slider-1", url: "https://placehold.co/400x300/FF6347/FFFFFF?text=Mock1", alt: "Mock 1", order: 0, isPrimary: true }
      ],
      rating: 4.0,
      reviewsCount: 10,
      stock: 20,
      isFeatured: true,
      isNew: true,
      isBestseller: false,
      tags: ["mock", "slider"],
      features: ["Feature A", "Feature B"],
      colors: ["red", "blue"], // Colores CSS válidos
      createdAt: new Date().toISOString(),
      reviews: [],
    }
  ], []);
  */

  // Usar propProducts directamente. Si es undefined, se manejará abajo.
  const productsToDisplay = propProducts;

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1024) { // Tailwind 'lg' breakpoint
        setCurrentItemsPerView(itemsPerView.desktop);
      } else if (width >= 768) { // Tailwind 'md' breakpoint
        setCurrentItemsPerView(itemsPerView.tablet);
      } else {
        setCurrentItemsPerView(itemsPerView.mobile);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [itemsPerView]);

  // Si no hay productos para mostrar (ni de props ni por defecto), no renderizar nada o un mensaje.
  if (!productsToDisplay || productsToDisplay.length === 0) {
    return <p className="text-center text-gray-500 py-8">No hay productos destacados para mostrar en este momento.</p>;
  }

  const maxIndex = Math.max(0, productsToDisplay.length - currentItemsPerView);

  useEffect(() => {
    if (!isAutoPlaying || productsToDisplay.length <= currentItemsPerView) return;
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
    }, autoPlayInterval);
    return () => clearInterval(interval);
  }, [isAutoPlaying, maxIndex, autoPlayInterval, productsToDisplay.length, currentItemsPerView]);

  const handlePrevious = useCallback(() => {
    setCurrentIndex(prev => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  const handleNext = useCallback(() => {
    setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  return (
    // La sección con título y subtítulo ya está en HomePage.tsx
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
            className="flex-shrink-0 px-2" // Ajusta el padding entre tarjetas
            style={{ width: `${100 / currentItemsPerView}%` }}
          >
            {/* =====> USA TU ProductCard AQUÍ <===== */}
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
          {Array.from({ length: maxIndex + 1 }).map((_, index) => ( // maxIndex + 1 para el número correcto de puntos
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