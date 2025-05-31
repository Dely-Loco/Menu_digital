// src/components/products/ProductActions.tsx
"use client";

import React, { useState, useCallback, useEffect } from 'react';
import type { Product, CartItem } from '@/types'; // Asegúrate de importar CartItem
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
// import { toast } from 'sonner'; // Descomenta si usas Sonner para notificaciones

interface ProductActionsProps {
  product: Product;
}

export default function ProductActions({ product }: ProductActionsProps) {
  const { dispatch } = useCart();
  
  const [selectedColor, setSelectedColor] = useState<string | undefined>(() => 
    product.colors && product.colors.length > 0 ? product.colors[0] : undefined
  );

  // Si el producto (o sus colores) cambian por alguna razón, actualiza el color seleccionado por defecto
  useEffect(() => {
    setSelectedColor(product.colors && product.colors.length > 0 ? product.colors[0] : undefined);
  }, [product.id, product.colors]); // Depender de product.id también por si cambia el producto completo

  const handleAddToCart = useCallback(() => {
    if (product.colors && product.colors.length > 0 && !selectedColor) {
      // alert("Por favor, selecciona un color."); // O un toast más elegante
      // toast.error("Por favor, selecciona un color.");
      console.warn("Intento de añadir al carrito sin seleccionar color cuando hay opciones.");
      return;
    }

    const itemToAdd: CartItem = {
      ...product,
      quantity: 1,
      selectedColor: selectedColor,
      addedAt: new Date().toISOString(), // Asegúrate que CartItem tenga addedAt
    };

    dispatch({ type: 'ADD_ITEM', payload: itemToAdd });
    console.log(`${product.name} (Color: ${selectedColor || 'N/A'}) añadido al carrito.`);
    // toast.success(`${product.name} ${selectedColor ? `(${selectedColor})` : ''} añadido al carrito!`);
  }, [dispatch, product, selectedColor]);

  return (
    <div className="space-y-6">
      {/* Selección de Color */}
      {product.colors && product.colors.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-2">
            Color: <span className="text-gray-900 font-medium">{selectedColor || "Elige un color"}</span>
          </h3>
          <div className="flex flex-wrap gap-2">
            {product.colors.map((colorOption) => (
              <button
                key={colorOption}
                type="button"
                onClick={() => setSelectedColor(colorOption)}
                className={cn(
                  "h-8 w-8 rounded-full border-2 p-0.5 transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
                  selectedColor === colorOption
                    ? 'ring-2 ring-blue-600 border-transparent shadow-md' // Estilo para color seleccionado
                    : 'border-gray-300 hover:border-gray-400' // Estilo para color no seleccionado
                )}
                title={colorOption} // El title puede ser el nombre descriptivo del color
                aria-label={`Seleccionar color ${colorOption}`}
              >
                <span 
                  className="block w-full h-full rounded-full border border-black/10" // Un pequeño borde interior
                  style={{ backgroundColor: colorOption.toLowerCase() }} // Aquí se aplica el color
                                                                      // Asume que colorOption es un string de color CSS válido
                                                                      // ej: "red", "blue", "#FFCC00", "rgb(10,20,30)"
                >
                  {/* Si el color es muy claro como 'white', el borde ayuda a verlo */}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Botones de Acción */}
      <div className="space-y-3 pt-2"> {/* Añadido un poco de padding top */}
        <Button
          onClick={handleAddToCart}
          disabled={product.stock === 0 || (product.colors && product.colors.length > 0 && !selectedColor)}
          className={`w-full py-3 px-5 rounded-lg font-semibold text-lg text-white transition-all duration-300 ease-in-out shadow-md hover:shadow-lg ${
            (product.stock === 0 || (product.colors && product.colors.length > 0 && !selectedColor))
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105'
          }`}
          aria-label="Agregar al carrito"
        >
          {product.stock === 0 ? 'No disponible' : 'Agregar al carrito'}
        </Button>
        <Button 
          className="w-full py-3 px-5 rounded-lg font-semibold text-gray-700 bg-gray-100 border border-gray-300 hover:bg-gray-200 transition-colors transform hover:scale-105 shadow-sm hover:shadow-md"
          aria-label="Agregar a lista de deseos"
          // onClick={handleAddToWishlist} // Necesitarías este handler
        >
          Agregar a lista de deseos
        </Button>
      </div>
    </div>
  );
}