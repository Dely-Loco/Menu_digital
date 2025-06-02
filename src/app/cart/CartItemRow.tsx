// src/app/cart/CartItemRow.tsx
// Asumo que este archivo es un Client Component, si no lo es, añade "use client";
"use client"; // Probablemente necesario si tiene handlers

import Image from 'next/image';
import Link from 'next/link';
import type { CartItem, } from '@/types'; // Importa ProductImage si es necesario para claridad

interface CartItemRowProps {
  item: CartItem;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
}

export default function CartItemRow({ item, updateQuantity, removeItem }: CartItemRowProps) {
  // Determinar la URL de la imagen principal o la primera imagen
  const imageUrl = item.images && item.images.length > 0 
                   ? item.images.find(img => img.isPrimary)?.url || item.images[0].url 
                   : '/placeholder-product.jpg'; // Un placeholder general

  const imageAlt = item.images && item.images.length > 0
                   ? item.images.find(img => img.isPrimary)?.alt || item.images[0].alt || item.name
                   : item.name;

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 p-4 border-b"> {/* Estructura y estilos de ejemplo */}
      <Link href={`/products/${item.slug}`} className="block shrink-0">
        <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-md overflow-hidden bg-gray-100"> {/* Contenedor con tamaño */}
          <Image
            src={imageUrl} // <--- USA LA VARIABLE imageUrl
            alt={imageAlt}
            fill // 'fill' necesita un padre con 'position: relative' y dimensiones
            className="object-contain" // O 'object-cover' según prefieras
            sizes="(max-width: 768px) 100px, 128px" // Ajusta sizes
          />
        </div>
      </Link>
      
      <div className="flex-grow text-center sm:text-left">
        <Link href={`/products/${item.slug}`}>
          <h3 className="text-lg font-semibold hover:text-orange-600">{item.name}</h3>
        </Link>
        <p className="text-sm text-gray-500">Precio Unitario: {item.price.toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits:0, maximumFractionDigits:0 })}</p>
        {/* Puedes añadir más detalles como color, talla si están en CartItem */}
      </div>

      <div className="flex items-center gap-2">
        <button 
          onClick={() => updateQuantity(item.id, item.quantity - 1)} 
          disabled={item.quantity <= 1}
          className="px-2 py-1 border rounded disabled:opacity-50"
        >
          -
        </button>
        <span>{item.quantity}</span>
        <button 
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
          className="px-2 py-1 border rounded"
        >
          +
        </button>
      </div>

      <p className="font-semibold w-24 text-center sm:text-right">
        {(item.price * item.quantity).toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits:0, maximumFractionDigits:0 })}
      </p>

      <button onClick={() => removeItem(item.id)} className="text-red-500 hover:text-red-700">
        Eliminar
      </button>
    </div>
  );
}
