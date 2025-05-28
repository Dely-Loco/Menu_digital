"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ShoppingBag } from 'lucide-react';
import { products } from '@/data/mock-data';
import type { CartItem } from '@/types';
import CartItemRow from './CartItemRow'; // Ajusta la ruta según dónde guardes el archivo
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

// Helper para cargar el carrito de localStorage
const loadCartFromStorage = (): CartItem[] => {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem('cart');
  if (!stored) return [];
  try {
    const parsed = JSON.parse(stored);
    // Podrías agregar validaciones aquí si quieres
    return parsed;
  } catch {
    return [];
  }
};

// Helper para guardar el carrito en localStorage
const saveCartToStorage = (cartItems: CartItem[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('cart', JSON.stringify(cartItems));
};

// Cart inicial (mock) solo si no hay nada en localStorage
const initialCartItems: CartItem[] = products.slice(0, 2).map(p => ({
  ...p,
  quantity: Math.floor(Math.random() * 3) + 1,
  addedAt: new Date().toISOString(),

}));

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Carga carrito de localStorage o usa inicial
    const storedCart = loadCartFromStorage();
    if (storedCart.length > 0) {
      setCartItems(storedCart);
    } else {
      setCartItems(initialCartItems);
      saveCartToStorage(initialCartItems);
    }
    setMounted(true);
  }, []);

  // Actualiza cantidad y guarda
  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) {
      removeItem(id);
      return;
    }
    setCartItems(prevItems => {
      const updated = prevItems.map(item => (item.id === id ? { ...item, quantity } : item));
      saveCartToStorage(updated);
      return updated;
    });
  };

  // Elimina item y guarda
  const removeItem = (id: string) => {
    setCartItems(prevItems => {
      const updated = prevItems.filter(item => item.id !== id);
      saveCartToStorage(updated);
      return updated;
    });
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = cartItems.length > 0 ? 5.0 : 0;
  const total = subtotal + shipping;

  if (!mounted) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <p className="text-xl text-muted-foreground">Loading cart...</p>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-12">
        <ShoppingBag className="mx-auto h-24 w-24 text-muted-foreground mb-6" />
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-muted-foreground mb-6">Looks like you haven't added anything to your cart yet.</p>
        <Button asChild size="lg">
          <Link href="/products">Start Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">Your Shopping Cart</h1>
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {cartItems.map((item) => (
            <CartItemRow
              key={item.id}
              item={item}
              updateQuantity={updateQuantity}
              removeItem={removeItem}
            />
          ))}
        </div>

        <div className="lg:col-span-1">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <p>Subtotal</p>
                <p>${subtotal.toFixed(2)}</p>
              </div>
              <div className="flex justify-between">
                <p>Shipping (Estimated)</p>
                <p>${shipping.toFixed(2)}</p>
              </div>
              <Separator />
              <div className="flex justify-between text-xl font-bold">
                <p>Total</p>
                <p>${total.toFixed(2)}</p>
              </div>
            </CardContent>
            <CardFooter className="flex-col space-y-3">
              <Button
                asChild
                size="lg"
                className="w-full bg-gradient-to-r from-[#FF4500] to-[#FF8C00] hover:opacity-90 text-primary-foreground"
              >
                <Link href="/checkout">Proceed to Checkout</Link>
              </Button>
              <Button asChild variant="link" className="text-primary">
                <Link href="/products">Continue Shopping</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
