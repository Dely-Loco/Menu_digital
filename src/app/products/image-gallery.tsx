// @/components/product/image-gallery.tsx
"use client";

import Image from 'next/image';
import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ImageGalleryProps {
  images: string[];
  altText: string;
  dataAiHint?: string;
}

export default function ImageGallery({ images, altText, dataAiHint }: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="w-full aspect-square bg-muted rounded-lg flex items-center justify-center">
        <p>No image available</p>
      </div>
    );
  }

  const mainImage = images[currentIndex];

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };


  return (
    <div className="space-y-4">
      <Card className="overflow-hidden">
        <CardContent className="p-0 relative aspect-square">
          <Image
            src={mainImage}
            alt={`${altText} - Image ${currentIndex + 1}`}
            width={600}
            height={600}
            className="object-contain w-full h-full"
            priority // Prioritize main product image
            data-ai-hint={dataAiHint || 'product detail'}
          />
           {images.length > 1 && (
            <>
              <Button
                variant="outline"
                size="icon"
                onClick={goToPrevious}
                className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-background/50 hover:bg-background/80"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={goToNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-background/50 hover:bg-background/80"
                aria-label="Next image"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </>
          )}
        </CardContent>
      </Card>

      {images.length > 1 && (
        <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
          {images.map((src, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                "aspect-square rounded-md overflow-hidden border-2 transition-all",
                currentIndex === index ? "border-primary ring-2 ring-primary ring-offset-2" : "border-border hover:border-primary/50"
              )}
            >
              <Image
                src={src}
                alt={`${altText} - Thumbnail ${index + 1}`}
                width={100}
                height={100}
                className="object-cover w-full h-full"
                data-ai-hint={dataAiHint || 'product thumbnail'}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
