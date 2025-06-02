// src/context/CartContext.tsx
"use client";

import React, { createContext, useReducer, useContext, ReactNode, useEffect } from 'react';
import type { CartItem, CartState, CartAction, } from '@/types'; // Asegúrate de importar UIState también

const CART_STORAGE_KEY = 'houzzeTecCart';

// Estado inicial del carrito, ahora cumpliendo con la interfaz CartState completa
const initialState: CartState = {
  items: [],
  total: 0,            // Añadido
  itemCount: 0,        // Añadido
  isOpen: false,         // Añadido
  // Propiedades de UIState
  isLoading: false,      // Añadido
  error: undefined,      // Añadido (o null si prefieres)
  successMessage: undefined, // Añadido (o null)
};

// --- Reducer del Carrito ---
// Esta función deberá ahora también recalcular 'total' e 'itemCount'
function cartReducer(state: CartState, action: CartAction): CartState {
  let newItems: CartItem[];
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItemIndex = state.items.findIndex(item => item.id === action.payload.id);
      if (existingItemIndex > -1) {
        newItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Necesitamos asegurar que el payload (Product) se convierta a CartItem
        // Tu tipo CartItem extiende Product y añade 'quantity' y 'addedAt'.
        // 'addedAt' no está en tu tipo Product base.
        const newItem: CartItem = { 
          ...action.payload, 
          quantity: 1, 
          // Deberías añadir addedAt si es parte de tu tipo CartItem y es requerido
          // Si addedAt es opcional o lo manejas en otro lado, puedes omitirlo aquí
          // o añadirlo como new Date().toISOString() si es string.
          // Por ahora, asumo que tu tipo CartItem solo necesita quantity además de Product.
          // Si `CartItem` tiene `addedAt: string;` obligatorio, necesitas añadirlo:
          addedAt: new Date().toISOString(), // Ejemplo si 'addedAt' es requerido en CartItem
        };
        newItems = [...state.items, newItem];
      }
      break; // Sale del case para calcular después
    }
    case 'REMOVE_ITEM': {
      newItems = state.items.filter(item => item.id !== action.payload.id);
      break;
    }
    case 'UPDATE_QUANTITY': {
      newItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: Math.max(0, action.payload.quantity) }
          : item
      ).filter(item => item.quantity > 0);
      break;
    }
    case 'CLEAR_CART':
      newItems = [];
      break;
    default:
      // Para satisfacer a TypeScript, aunque no debería llegar aquí si las acciones están bien tipadas
      return state; 
  }

  // Recalcular itemCount y total después de cualquier modificación de items
  const newItemCount = newItems.reduce((total, item) => total + item.quantity, 0);
  const newTotal = newItems.reduce((total, item) => {
    const price = typeof item.price === 'number' ? item.price : 0;
    return total + price * item.quantity;
  }, 0);

  return { 
    ...state, // Mantiene otras propiedades de estado como isOpen, isLoading, etc.
    items: newItems, 
    itemCount: newItemCount, 
    total: newTotal 
  };
}

// --- Creación del Contexto ---
// CartContextType debe coincidir o ser compatible con CartState
// Si CartContextType solo añade 'dispatch', está bien.
// En tu caso, CartContextType en la versión anterior YA INCLUÍA itemCount y cartTotal.
// Así que la definición de CartContextType que teníamos está bien.
interface CartContextType extends CartState { // CartState ya incluye itemCount y total
  dispatch: React.Dispatch<CartAction>;
  // Las propiedades itemCount y total ya vienen de CartState
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// --- Proveedor del Contexto (CartProvider) ---
interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState, (initial) => {
    try {
      if (typeof window !== "undefined") {
        const storedCart = localStorage.getItem(CART_STORAGE_KEY);
        if (storedCart) {
          const parsedCart = JSON.parse(storedCart);
          // Asegurarse de que el estado cargado de localStorage tenga todos los campos necesarios
          return {
            ...initialState, // Proporciona valores por defecto para todos los campos
            ...parsedCart,   // Sobrescribe con lo que haya en localStorage
          };
        }
      }
    } catch (error) {
      console.error("Error cargando el carrito desde localStorage:", error);
    }
    return initial; // Devuelve el initialState completo si no hay nada en localStorage o hay error
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Solo guardar las partes relevantes, o el estado completo si es necesario
      // Si UIState (isLoading, error, etc.) no debe persistir, filtra el estado antes de guardar:
      // const { items, total, itemCount, isOpen } = state;
      // localStorage.setItem(CART_STORAGE_KEY, JSON.stringify({ items, total, itemCount, isOpen }));
      // O si quieres persistir todo:
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state));
    }
  }, [state]);

  // Ya no necesitamos calcular itemCount y cartTotal aquí, vienen del state del reducer
  return (
    <CartContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

// --- Hook Personalizado para Usar el Contexto del Carrito ---
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart debe ser usado dentro de un CartProvider');
  }
  return context;
};