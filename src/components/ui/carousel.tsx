"use client";

import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export type CarouselApi = ReturnType<typeof useEmblaCarousel>[1];

export const Carousel = ({
  className,
  children,
  plugins,
  onMouseEnter,
  onMouseLeave,
  opts,
}: {
  className?: string;
  children: React.ReactNode;
  plugins?: any[];
  onMouseEnter?: React.DOMAttributes<HTMLDivElement>["onMouseEnter"];
  onMouseLeave?: React.DOMAttributes<HTMLDivElement>["onMouseLeave"];
  opts?: Parameters<typeof useEmblaCarousel>[0];
}) => {
  // Aquí pasamos los plugins como segundo parámetro
  const [carouselRef, api] = useEmblaCarousel(opts, plugins);

  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);

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
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api, onSelect]);

  return (
    <div
      className={cn("relative", className)}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="overflow-hidden" ref={carouselRef}>
        <CarouselContent>{children}</CarouselContent>
      </div>
      <CarouselPrevious onClick={() => api?.scrollPrev()} disabled={!canScrollPrev} />
      <CarouselNext onClick={() => api?.scrollNext()} disabled={!canScrollNext} />
    </div>
  );
};

export const CarouselContent = ({
  className,
  children,
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex -ml-4", className)}>{children}</div>
);

export const CarouselItem = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("min-w-0 shrink-0 grow-0 basis-full pl-4", className)}
    role="group"
    aria-roledescription="slide"
    {...props}
  />
);

export const CarouselPrevious = ({
  onClick,
  disabled,
}: {
  onClick?: () => void;
  disabled?: boolean;
}) => (
  <Button
    onClick={onClick}
    disabled={disabled}
    size="icon"
    variant="outline"
    className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full h-8 w-8"
  >
    <ArrowLeft className="h-4 w-4" />
    <span className="sr-only">Previous</span>
  </Button>
);

export const CarouselNext = ({
  onClick,
  disabled,
}: {
  onClick?: () => void;
  disabled?: boolean;
}) => (
  <Button
    onClick={onClick}
    disabled={disabled}
    size="icon"
    variant="outline"
    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full h-8 w-8"
  >
    <ArrowRight className="h-4 w-4" />
    <span className="sr-only">Next</span>
  </Button>
);

