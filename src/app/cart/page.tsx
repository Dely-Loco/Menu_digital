// src/app/cart/page.tsx
"use client";

import { useState, useEffect } from 'react'; // <--- ASEGÚRATE DE TENER ESTA LÍNEA
import Link from 'next/link';
import Image from 'next/image'; // Para mostrar imágenes de producto
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ShoppingBag, Trash2, Minus, Plus } from 'lucide-react';
import type { CartItem } from '@/types'; // Tu tipo CartItem
import { useCart } from '@/context/CartContext'; 
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

// Helper para formatear precios (puedes moverlo a utils si lo usas en varios sitios)
const formatCurrencyCOP = (value?: number): string => {
  if (typeof value !== 'number') {
    return '$0'; // Devuelve $0 o un placeholder si el valor no es un número
  }
  return value.toLocaleString('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
};

// Componente para una fila de ítem del carrito
const CartItemDisplay: React.FC<{
  item: CartItem;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
}> = ({ item, onUpdateQuantity, onRemoveItem }) => {
  const imageUrl = item.images && item.images.length > 0 
                   ? item.images.find(img => img.isPrimary)?.url || item.images[0].url 
                   : '/placeholder-product.jpg';
  const imageAlt = item.images && item.images.length > 0
                   ? item.images.find(img => img.isPrimary)?.alt || item.images[0].alt || item.name
                   : item.name;

  return (
    <Card className="flex flex-col sm:flex-row items-center gap-4 p-4 shadow-md">
      <Link href={`/products/${item.slug}`} className="block shrink-0">
        <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-lg overflow-hidden bg-gray-100">
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100px, 128px"
          />
        </div>
      </Link>
      
      <div className="flex-grow text-center sm:text-left">
        <Link href={`/products/${item.slug}`}>
          <h3 className="text-lg font-semibold hover:text-orange-600 line-clamp-2">{item.name}</h3>
        </Link>
        <p className="text-sm text-gray-500 mt-1">Precio Unitario: {formatCurrencyCOP(item.price)}</p>
      </div>

      <div className="flex items-center gap-2 my-2 sm:my-0">
        <Button 
          size="icon"
          variant="outline"
          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} 
          disabled={item.quantity <= 1}
          className="h-8 w-8"
          aria-label="Reducir cantidad"
        >
          <Minus className="h-4 w-4" />
        </Button>
        <span className="w-8 text-center font-medium tabular-nums">{item.quantity}</span> {/* tabular-nums para mejor alineación de números */}
        <Button 
          size="icon"
          variant="outline"
          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
          className="h-8 w-8"
          aria-label="Aumentar cantidad"
          // disabled={item.quantity >= item.stock} // Si quieres limitar por stock
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <p className="font-semibold text-lg w-28 text-center sm:text-right tabular-nums">
        {formatCurrencyCOP(item.price * item.quantity)}
      </p>

      <Button onClick={() => onRemoveItem(item.id)} variant="ghost" size="icon" className="text-red-500 hover:text-red-700 hover:bg-red-50" aria-label="Eliminar item">
        <Trash2 className="h-5 w-5" />
      </Button>
    </Card>
  );
};


export default function CartPage() {
  const { items: cartItems, itemCount, total: cartTotal, dispatch } = useCart();
  const [mounted, setMounted] = useState(false); // <--- ESTA ES LA LÍNEA IMPORTANTE

  useEffect(() => {
    setMounted(true); 
  }, []);

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const shippingCost = cartItems.length > 0 ? 5000 : 0; // Ejemplo: costo de envío en COP
  const finalTotal = cartTotal + shippingCost;

  if (!mounted) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <p className="text-xl text-muted-foreground animate-pulse">Cargando carrito...</p>
      </div>
    );
  }

  if (itemCount === 0) {
    return (
      <div className="text-center py-16 min-h-[calc(100vh-200px)] flex flex-col justify-center items-center">
        <ShoppingBag className="mx-auto h-24 w-24 text-gray-300 mb-6" />
        <h1 className="text-3xl font-bold mb-4 text-gray-700">Tu Carrito está Vacío</h1>
        <p className="text-gray-500 mb-8 max-w-md">
          Parece que no has añadido nada aún. ¡Explora nuestros productos y encuentra algo que te encante!
        </p>
        <Button asChild size="lg" className="bg-gradient-to-r from-orange-500 to-red-500 hover:opacity-90 text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all">
          <Link href="/products">Comenzar a Comprar</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8 md:space-y-12 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Tu Carrito ({itemCount} {itemCount === 1 ? 'ítem' : 'ítems'})</h1>
        {cartItems.length > 0 && (
            <Button onClick={clearCart} variant="outline" className="text-red-600 border-red-600 hover:bg-red-50 hover:text-red-700">
                <Trash2 className="mr-2 h-4 w-4" /> Vaciar Carrito
            </Button>
        )}
      </div>
      
      <div className="grid lg:grid-cols-3 gap-8 xl:gap-12 items-start">
        <div className="lg:col-span-2 space-y-4 md:space-y-6">
          {cartItems.map((item) => (
            <CartItemDisplay 
              key={item.id}
              item={item}
              onUpdateQuantity={updateQuantity}
              onRemoveItem={removeItem}
            />
          ))}
        </div>

        <div className="lg:col-span-1 sticky top-24">
          <Card className="shadow-xl border-t-4 border-orange-500 rounded-xl">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-gray-800">Resumen del Pedido</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-gray-700">
              <div className="flex justify-between">
                <p>Subtotal ({itemCount} {itemCount === 1 ? 'ítem' : 'ítems'})</p>
                <p className="font-medium tabular-nums">{formatCurrencyCOP(cartTotal)}</p>
              </div>
              <div className="flex justify-between">
                <p>Envío (Estimado)</p>
                <p className="font-medium tabular-nums">{formatCurrencyCOP(shippingCost)}</p>
              </div>
              <Separator className="my-3" />
              <div className="flex justify-between text-xl font-bold text-gray-800">
                <p>Total</p>
                <p className="tabular-nums">{formatCurrencyCOP(finalTotal)}</p>
              </div>
            </CardContent>
            <CardFooter className="flex-col space-y-3 pt-5">
              <Button
                asChild
                size="lg"
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:opacity-90 text-white font-semibold text-lg py-3 shadow-lg hover:shadow-xl"
              >
                <Link href="/checkout">Proceder al Pago</Link>
              </Button>
              <Button asChild variant="link" className="text-orange-600 hover:text-orange-700">
                <Link href="/products">Continuar Comprando</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}