// @/components/product/image-gallery.tsx
"use client";

import Image from 'next/image';
import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

// ========== INTERFACE DE PROPS ==========
interface ImageGalleryProps {
  images: string[];     // Array de URLs de imágenes del producto
  altText: string;      // Texto alternativo base para accesibilidad
  dataAiHint?: string;  // Hint opcional para AI/SEO (metadatos)
}

export default function ImageGallery({ images, altText, dataAiHint }: ImageGalleryProps) {
  // ========== ESTADO LOCAL ==========
  // Controla qué imagen se está mostrando actualmente en la vista principal
  const [currentIndex, setCurrentIndex] = useState(0);

  // ========== VALIDACIÓN DE DATOS ==========
  // Maneja el caso donde no hay imágenes disponibles
  if (!images || images.length === 0) {
    return (
      <div className="w-full aspect-square bg-muted rounded-lg flex items-center justify-center">
        <p>No image available</p>
      </div>
    );
  }

  // ========== VARIABLE DERIVADA ==========
  // Obtiene la imagen actual basada en el índice seleccionado
  const mainImage = images[currentIndex];

  // ========== FUNCIONES DE NAVEGACIÓN ==========
  
  // Navega a la imagen anterior (con wrap-around al final)
  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;        // Detecta si estamos en la primera imagen
    const newIndex = isFirstSlide                   // Si es la primera, va a la última
      ? images.length - 1                           // Última imagen (wrap-around)
      : currentIndex - 1;                           // Imagen anterior normal
    setCurrentIndex(newIndex);
  };

  // Navega a la imagen siguiente (con wrap-around al inicio)
  const goToNext = () => {
    const isLastSlide = currentIndex === images.length - 1;  // Detecta si estamos en la última imagen
    const newIndex = isLastSlide                             // Si es la última, va a la primera
      ? 0                                                    // Primera imagen (wrap-around)
      : currentIndex + 1;                                    // Imagen siguiente normal
    setCurrentIndex(newIndex);
  };

  return (
    <div className="space-y-4">
      {/* ========== IMAGEN PRINCIPAL ==========*/}
      <Card className="overflow-hidden">
        <CardContent className="p-0 relative aspect-square">
          <Image
            src={mainImage}
            alt={`${altText} - Image ${currentIndex + 1}`}  // Alt dinámico con número de imagen
            width={600}
            height={600}
            className="object-contain w-full h-full"        // object-contain mantiene proporción sin recortar
            priority                                        // Carga prioritaria para imagen principal (LCP optimization)
            data-ai-hint={dataAiHint || 'product detail'}   // Metadato para AI/SEO
          />
          
          {/* ========== CONTROLES DE NAVEGACIÓN ==========*/}
          {/* Solo se muestran si hay más de una imagen */}
          {images.length > 1 && (
            <>
              {/* Botón anterior - posicionado absolutamente a la izquierda */}
              <Button
                variant="outline"
                size="icon"
                onClick={goToPrevious}
                className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-background/50 hover:bg-background/80"
                aria-label="Previous image"  // Accesibilidad para lectores de pantalla
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              
              {/* Botón siguiente - posicionado absolutamente a la derecha */}
              <Button
                variant="outline"
                size="icon"
                onClick={goToNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-background/50 hover:bg-background/80"
                aria-label="Next image"     // Accesibilidad para lectores de pantalla
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </>
          )}
        </CardContent>
      </Card>

      {/* ========== THUMBNAILS (MINIATURAS) ==========*/}
      {/* Solo se muestran si hay múltiples imágenes */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">  {/* Grid responsivo: 4 en móvil, 5 en desktop */}
          {images.map((src, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}    // Cambia imagen principal al hacer clic
              className={cn(
                // Estilos base para todos los thumbnails
                "aspect-square rounded-md overflow-hidden border-2 transition-all",
                // Estilos condicionales según si es la imagen activa
                currentIndex === index 
                  ? "border-primary ring-2 ring-primary ring-offset-2"  // Thumbnail activo: borde y ring
                  : "border-border hover:border-primary/50"              // Thumbnail inactivo: borde sutil con hover
              )}
            >
              <Image
                src={src}
                alt={`${altText} - Thumbnail ${index + 1}`}         // Alt específico para cada thumbnail
                width={100}
                height={100}
                className="object-cover w-full h-full"              // object-cover para thumbnails (puede recortar)
                data-ai-hint={dataAiHint || 'product thumbnail'}    // Metadato específico para thumbnails
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}