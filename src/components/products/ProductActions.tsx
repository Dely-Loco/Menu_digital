// src/components/platos/PlatoActions.tsx
"use client";

import React, { useState, useCallback } from 'react';
import type { Plato, CartItem } from '@/types'; // Asegúrate de importar CartItem
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
// import { toast } from 'sonner'; // Descomenta si usas Sonner para notificaciones

interface PlatoActionsProps {
  plato: Plato;
}

export default function PlatoActions({ plato }: PlatoActionsProps) {
  const { dispatch } = useCart();
  
  // Para platos de restaurante, no usamos colores sino porciones o tamaños
  const [selectedNotes, setSelectedNotes] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);

  const handleAddToCart = useCallback(() => {
    if (!plato.available) {
      // alert("Este plato no está disponible."); // O un toast más elegante
      // toast.error("Este plato no está disponible.");
      console.warn("Intento de añadir al carrito un plato no disponible.");
      return;
    }

    const itemToAdd: CartItem = {
      ...plato,
      quantity: quantity,
      notes: selectedNotes, // Notas especiales para el plato
      addedAt: new Date().toISOString(), // Asegúrate que CartItem tenga addedAt
    };

    dispatch({ type: 'ADD_ITEM', payload: itemToAdd });
    console.log(`${plato.name} (Cantidad: ${quantity}) añadido al carrito.`);
    // toast.success(`${plato.name} añadido al carrito!`);
  }, [dispatch, plato, quantity, selectedNotes]);

  const handleQuantityChange = useCallback((newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= 10) { // Límite de 10 porciones
      setQuantity(newQuantity);
    }
  }, []);

  return (
    <div className="space-y-6">
      {/* Selector de Cantidad */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-2">
          Cantidad: <span className="text-gray-900 font-medium">{quantity}</span>
        </h3>
        <div className="flex items-center space-x-3">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => handleQuantityChange(quantity - 1)}
            disabled={quantity <= 1}
            className="w-8 h-8 p-0 rounded-full"
            aria-label="Disminuir cantidad"
          >
            -
          </Button>
          <span className="w-8 text-center font-medium">{quantity}</span>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => handleQuantityChange(quantity + 1)}
            disabled={quantity >= 10}
            className="w-8 h-8 p-0 rounded-full"
            aria-label="Aumentar cantidad"
          >
            +
          </Button>
        </div>
      </div>

      {/* Notas especiales */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-2">
          Notas especiales (opcional)
        </h3>
        <textarea
          value={selectedNotes}
          onChange={(e) => setSelectedNotes(e.target.value)}
          placeholder="Ej: Sin cebolla, picante aparte..."
          className="w-full p-2 border border-gray-300 rounded-md text-sm resize-none"
          rows={2}
          maxLength={100}
        />
        <p className="text-xs text-gray-500 mt-1">
          {selectedNotes.length}/100 caracteres
        </p>
      </div>

      {/* Etiquetas del plato */}
      {plato.tags && plato.tags.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-2">
            Características
          </h3>
          <div className="flex flex-wrap gap-2">
            {plato.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Información de precio */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Precio unitario:</span>
          <div className="text-right">
            {plato.originalPrice && plato.originalPrice > plato.price && (
              <span className="text-sm text-gray-500 line-through">
                ${plato.originalPrice.toLocaleString()}
              </span>
            )}
            <span className="text-lg font-bold text-gray-900 ml-2">
              ${plato.price.toLocaleString()}
            </span>
          </div>
        </div>
        <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-200">
          <span className="text-sm font-medium text-gray-700">Total:</span>
          <span className="text-xl font-bold text-orange-600">
            ${(plato.price * quantity).toLocaleString()}
          </span>
        </div>
      </div>

      {/* Botones de Acción */}
      <div className="space-y-3 pt-2">
        <Button
          onClick={handleAddToCart}
          disabled={!plato.available}
          className={`w-full py-3 px-5 rounded-lg font-semibold text-lg text-white transition-all duration-300 ease-in-out shadow-md hover:shadow-lg ${
            !plato.available
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 transform hover:scale-105'
          }`}
          aria-label="Agregar al carrito"
        >
          {!plato.available ? 'No disponible' : `Agregar al carrito - $${(plato.price * quantity).toLocaleString()}`}
        </Button>
        
        {/* Mostrar información de descuento si aplica */}
        {plato.originalPrice && plato.originalPrice > plato.price && (
          <div className="text-center">
            <span className="text-sm text-green-600 font-medium">
              ¡Ahorra ${((plato.originalPrice - plato.price) * quantity).toLocaleString()}!
            </span>
          </div>
        )}
      </div>
    </div>
  );
}