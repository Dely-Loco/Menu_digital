// @/components/shared/plato-image-gallery.tsx
"use client";

import Image from 'next/image';
import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { ProductImage } from '@/types';

// ========== INTERFACE DE PROPS ==========
interface PlatoImageGalleryProps {
  images: ProductImage[];   // Array de imágenes del plato con metadata
  platoName: string;        // Nombre del plato para alt text
  className?: string;       // Clases CSS adicionales opcionales
}

export default function PlatoImageGallery({ 
  images, 
  platoName, 
  className 
}: PlatoImageGalleryProps) {
  // ========== ESTADO LOCAL ==========
  // Controla qué imagen se está mostrando actualmente en la vista principal
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageError, setImageError] = useState<Record<number, boolean>>({});

  // ========== VALIDACIÓN Y MANEJO DE DATOS ==========
  // Filtrar solo imágenes válidas y ordenarlas
  const validImages = images
    .filter(img => img.url && !imageError[parseInt(img.id)])
    .sort((a, b) => a.order - b.order);

  // Maneja el caso donde no hay imágenes disponibles
  if (!validImages || validImages.length === 0) {
    return (
      <div className={cn(
        "w-full aspect-square bg-gradient-to-br from-orange-50 to-red-50 rounded-3xl flex flex-col items-center justify-center border-2 border-dashed border-orange-200",
        className
      )}>
        <div className="bg-orange-100 p-4 rounded-full mb-3">
          <Camera className="h-8 w-8 text-orange-500" />
        </div>
        <p className="text-orange-700 font-medium">Imagen no disponible</p>
        <p className="text-orange-600 text-sm">Próximamente foto de este plato</p>
      </div>
    );
  }

  // ========== VARIABLE DERIVADA ==========
  // Obtiene la imagen actual basada en el índice seleccionado
  const currentImage = validImages[currentIndex];

  // ========== FUNCIONES DE NAVEGACIÓN ==========
  
  // Navega a la imagen anterior (con wrap-around al final)
  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide 
      ? validImages.length - 1 
      : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  // Navega a la imagen siguiente (con wrap-around al inicio)
  const goToNext = () => {
    const isLastSlide = currentIndex === validImages.length - 1;
    const newIndex = isLastSlide 
      ? 0 
      : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  // Maneja errores de carga de imágenes
  const handleImageError = (imageId: string) => {
    const numericId = parseInt(imageId);
    setImageError(prev => ({ ...prev, [numericId]: true }));
    
    // Si la imagen actual falló, cambiar a la siguiente disponible
    if (currentImage.id === imageId) {
      const nextValidIndex = validImages.findIndex((img, idx) => 
        idx > currentIndex && !imageError[parseInt(img.id)]
      );
      if (nextValidIndex !== -1) {
        setCurrentIndex(nextValidIndex);
      } else {
        setCurrentIndex(0);
      }
    }
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* ========== IMAGEN PRINCIPAL ==========*/}
      <Card className="overflow-hidden shadow-lg border-0 bg-gradient-to-br from-white to-orange-50/30">
        <CardContent className="p-0 relative aspect-square group">
          <Image
            src={currentImage.url}
            alt={currentImage.alt || `${platoName} - Imagen ${currentIndex + 1}`}
            width={600}
            height={600}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            priority={currentImage.isPrimary}
            onError={() => handleImageError(currentImage.id)}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          />
          
          {/* Overlay con información de la imagen */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="text-white">
              <p className="text-sm font-medium">
                {currentIndex + 1} de {validImages.length}
              </p>
              {currentImage.alt && (
                <p className="text-xs opacity-80 mt-1 line-clamp-2">
                  {currentImage.alt}
                </p>
              )}
            </div>
          </div>
          
          {/* ========== CONTROLES DE NAVEGACIÓN ==========*/}
          {validImages.length > 1 && (
            <>
              <Button
                variant="outline"
                size="icon"
                onClick={goToPrevious}
                className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 hover:bg-white border-orange-200 text-orange-600 hover:text-orange-700 shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300"
                aria-label={`Ver imagen anterior de ${platoName}`}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              
              <Button
                variant="outline"
                size="icon"
                onClick={goToNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 hover:bg-white border-orange-200 text-orange-600 hover:text-orange-700 shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300"
                aria-label={`Ver siguiente imagen de ${platoName}`}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </>
          )}

          {/* Indicadores de navegación (dots) */}
          {validImages.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {validImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all duration-200",
                    currentIndex === index 
                      ? "bg-orange-500 w-6" 
                      : "bg-white/60 hover:bg-white/80"
                  )}
                  aria-label={`Ver imagen ${index + 1} de ${platoName}`}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* ========== THUMBNAILS (MINIATURAS) ==========*/}
      {validImages.length > 1 && (
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
          {validImages.map((image, index) => (
            <button
              key={image.id}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                "aspect-square rounded-xl overflow-hidden border-2 transition-all duration-200 relative group/thumb",
                currentIndex === index 
                  ? "border-orange-500 ring-2 ring-orange-200 scale-105 shadow-lg" 
                  : "border-gray-200 hover:border-orange-300 hover:scale-102"
              )}
              aria-label={`Ver ${image.alt || `imagen ${index + 1} de ${platoName}`}`}
            >
              <Image
                src={image.url}
                alt={image.alt || `${platoName} - Miniatura ${index + 1}`}
                width={80}
                height={80}
                className="object-cover w-full h-full transition-transform duration-200 group-hover/thumb:scale-110"
                onError={() => handleImageError(image.id)}
              />
              
              {/* Overlay para thumbnail activo */}
              {currentIndex === index && (
                <div className="absolute inset-0 bg-orange-500/10 flex items-center justify-center">
                  <div className="w-2 h-2 bg-orange-500 rounded-full" />
                </div>
              )}
            </button>
          ))}
        </div>
      )}

      {/* ========== INFORMACIÓN ADICIONAL ==========*/}
      {validImages.length > 0 && (
        <div className="text-center text-sm text-gray-600">
          <p>
            {validImages.length === 1 
              ? "1 foto de este delicioso plato" 
              : `${validImages.length} fotos de este delicioso plato`
            }
          </p>
          {currentImage.isPrimary && (
            <p className="text-orange-600 font-medium mt-1">
              ✨ Foto principal
            </p>
          )}
        </div>
      )}
    </div>
  );
}