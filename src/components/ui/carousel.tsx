// src/components/ui/carousel.tsx
"use client";

import * as React from "react";
// Corregir las importaciones de tipos de Embla Carousel
import useEmblaCarousel from "embla-carousel-react";
import type { EmblaOptionsType } from "embla-carousel";
import type { EmblaPluginType } from "embla-carousel";
import type { EmblaCarouselType } from "embla-carousel";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// Definir el tipo CarouselApi
type CarouselApi = EmblaCarouselType;

interface CarouselProps {
  className?: string;
  children: React.ReactNode;
  plugins?: EmblaPluginType[];
  onMouseEnter?: React.DOMAttributes<HTMLDivElement>["onMouseEnter"];
  onMouseLeave?: React.DOMAttributes<HTMLDivElement>["onMouseLeave"];
  opts?: EmblaOptionsType;
}

export const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  ({ className, children, plugins, onMouseEnter, onMouseLeave, opts }, ref) => {
    const [carouselRefInternal, api] = useEmblaCarousel(opts, plugins);
    const [canScrollPrev, setCanScrollPrev] = React.useState(false);
    const [canScrollNext, setCanScrollNext] = React.useState(false);

    const scrollPrev = React.useCallback(() => {
      api?.scrollPrev();
    }, [api]);

    const scrollNext = React.useCallback(() => {
      api?.scrollNext();
    }, [api]);

    const onSelect = React.useCallback(() => {
      if (!api) return;
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    }, [api]);

    React.useEffect(() => {
      if (!api) return;
      onSelect();
      api.on("select", onSelect);
      api.on("reInit", onSelect);
      return () => {
        api?.off("select", onSelect);
        api?.off("reInit", onSelect);
      };
    }, [api, onSelect]);
    
    // Lógica para combinar la ref interna de Embla con una ref externa si se pasa
    const combinedRef = React.useCallback(
        (node: HTMLDivElement | null) => {
          carouselRefInternal(node); // Asigna a la ref de Embla
          if (typeof ref === 'function') {
            ref(node);
          } else if (ref && typeof ref === 'object' && ref.current !== undefined) {
            ref.current = node;
          }
        },
        [carouselRefInternal, ref]
      );

    return (
      <div
        className={cn("relative", className)}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        ref={combinedRef} 
        role="region"
        aria-roledescription="carousel"
      >
        <div className="overflow-hidden">
          <CarouselContent>{children}</CarouselContent>
        </div>
        <CarouselPrevious onClick={scrollPrev} disabled={!canScrollPrev} />
        <CarouselNext onClick={scrollNext} disabled={!canScrollNext} />
      </div>
    );
  }
);
Carousel.displayName = "Carousel";

export const CarouselContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex", className)}
    {...props}
  />
));
CarouselContent.displayName = "CarouselContent";

export const CarouselItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "min-w-0 shrink-0 grow-0 basis-full pl-4",
      className
    )}
    role="group"
    aria-roledescription="slide"
    {...props}
  />
));
CarouselItem.displayName = "CarouselItem";

export const CarouselPrevious = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button>>(
  ({ className, variant = "outline", size = "icon", ...props }, ref) => (
  <Button
    ref={ref}
    variant={variant}
    size={size}
    className={cn("absolute left-2 top-1/2 -translate-y-1/2 rounded-full h-8 w-8 z-10", className)}
    {...props}
  >
    <ArrowLeft className="h-4 w-4" />
    <span className="sr-only">Slide Anterior</span>
  </Button>
));
CarouselPrevious.displayName = "CarouselPrevious";

export const CarouselNext = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button>>(
  ({ className, variant = "outline", size = "icon", ...props }, ref) => (
  <Button
    ref={ref}
    variant={variant}
    size={size}
    className={cn("absolute right-2 top-1/2 -translate-y-1/2 rounded-full h-8 w-8 z-10", className)}
    {...props}
  >
    <ArrowRight className="h-4 w-4" />
    <span className="sr-only">Siguiente Slide</span>
  </Button>
));
CarouselNext.displayName = "CarouselNext";

// Interface para CarouselDots
interface CarouselDotsProps {
  api: EmblaCarouselType | undefined;
  className?: string;
}

// Componente CarouselDots mejorado
export const CarouselDots = ({ api, className }: CarouselDotsProps) => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([]);

  // Navegar al slide correspondiente
  const onDotClick = React.useCallback(
    (index: number) => api?.scrollTo(index),
    [api]
  );

  // Sincronizar puntos con el slide actual
  React.useEffect(() => {
    if (!api) return;
    
    const updateDots = () => {
      setScrollSnaps(api.scrollSnapList());
      setSelectedIndex(api.selectedScrollSnap());
    };
    
    api.on("select", updateDots);
    updateDots(); // Inicializar
    
    return () => {
      api.off("select", updateDots);
    };
  }, [api]);

  if (!api || scrollSnaps.length === 0) return null;

  return (
    <div className={cn("flex justify-center gap-2", className)}>
      {scrollSnaps.map((_, index) => (
        <button
          key={index}
          onClick={() => onDotClick(index)}
          className={`w-2.5 h-2.5 rounded-full transition-all ${
            index === selectedIndex 
              ? "bg-orange-500 scale-125"  // Punto activo (usa tu color primario)
              : "bg-gray-300"              // Puntos inactivos
          }`}
          aria-label={`Ir al slide ${index + 1}`}
        />
      ))}
    </div>
  );
};

// Exportar tipos útiles
export type { CarouselApi, CarouselDotsProps };