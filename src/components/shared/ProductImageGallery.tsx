// src/components/shared/ProductImageGallery.tsx
"use client"; // MUY IMPORTANTE: Esto lo convierte en un Client Component

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import type { ProductImage as ProductImageType } from '@/types'; // Asegúrate que este tipo se exporte de @/types

interface ProductImageGalleryProps {
  images: ProductImageType[];
  productName: string;
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({ images, productName }) => {
  const initialMainImage = images.find(img => img.isPrimary) || images[0];
  const [mainImage, setMainImage] = useState<ProductImageType | undefined>(initialMainImage);

  // Efecto para actualizar la imagen principal si las props de 'images' cambian
  useEffect(() => {
    const newInitialMainImage = images.find(img => img.isPrimary) || images[0];
    setMainImage(newInitialMainImage);
  }, [images]);

  if (!images || images.length === 0) {
    // Fallback si no hay imágenes (aunque tu page.tsx ya tiene uno)
    return (
      <div className="w-full h-full object-contain bg-gray-200 rounded-xl flex items-center justify-center shadow-lg border">
        <p className="text-gray-500">No image available</p>
      </div>
    );
  }

  // Si no se pudo determinar una imagen principal, usa la primera (esto es un doble fallback)
  const currentMainImage = mainImage || images[0];

  return (
    <div className="space-y-4">
      {/* Imagen principal del producto */}
      <div className="w-full h-full object-contain bg-white rounded-xl overflow-hidden shadow-2xl border">
        <Image
          src={currentMainImage.url}
          alt={currentMainImage.alt || productName}
          width={600}
          height={600}
          className="w-full h-full object-contain transition-opacity duration-300 ease-in-out"
          priority
          key={currentMainImage.id} // Añadir key para forzar re-renderizado si cambia la imagen
        />
      </div>

      {/* Miniaturas adicionales si hay más de una imagen */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 md:gap-3">
          {images.map((imageObj) => (
            <div
              key={imageObj.id}
              className={` w-full h-full object-contain bg-white rounded-md overflow-hidden shadow border cursor-pointer transition-all duration-200
                          ${mainImage?.id === imageObj.id ? 'ring-2 ring-blue-500 ring-offset-2' : 'hover:ring-2 hover:ring-blue-300'}`}
              onClick={() => setMainImage(imageObj)} // CAMBIA LA IMAGEN PRINCIPAL AL HACER CLIC
            >
              <Image
                src={imageObj.url}
                alt={imageObj.alt || `${productName} - Thumbnail`}
                width={100}
                height={100}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductImageGallery;