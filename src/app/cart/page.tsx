// @/app/cart/page.tsx
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { CartItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Trash2, Minus, Plus, ShoppingBag } from 'lucide-react';
import { products } from '@/data/mock-data'; // For sample data
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

// Mock cart functionality using local state for now
const initialCartItems: CartItem[] = products.slice(0, 2).map(p => ({ ...p, quantity: Math.floor(Math.random() * 3) + 1 }));


export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Simulate loading cart items, e.g., from localStorage or API in a real app
    // For this example, using mock data directly after mount
    setCartItems(initialCartItems);
    setMounted(true);
  }, []);

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return; // Or remove item if quantity is 0
    setCartItems(prevItems =>
      prevItems.map(item => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const removeItem = (id: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = cartItems.length > 0 ? 5.00 : 0; // Example shipping cost
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
            <Card key={item.id} className="flex flex-col sm:flex-row items-center gap-4 p-4 shadow-sm">
              <Link href={`/products/${item.slug}`} className="block shrink-0">
                <Image
                  src={item.images[0]}
                  alt={item.name}
                  width={100}
                  height={100}
                  className="rounded-md object-cover w-24 h-24 sm:w-28 sm:h-28"
                  data-ai-hint={item.dataAiHint || 'product image'}
                />
              </Link>
              <div className="flex-grow space-y-1 text-center sm:text-left">
                <Link href={`/products/${item.slug}`} className="block">
                  <h2 className="text-lg font-semibold hover:text-primary">{item.name}</h2>
                </Link>
                <p className="text-sm text-muted-foreground">{item.brand}</p>
                <p className="text-md font-medium">${item.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="icon" onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>
                  <Minus className="h-4 w-4" />
                </Button>
                <Input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                  min="1"
                  className="w-16 h-9 text-center"
                />
                <Button variant="outline" size="icon" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-lg font-semibold w-20 text-center sm:text-right">${(item.price * item.quantity).toFixed(2)}</p>
              <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)} className="text-destructive hover:text-destructive/80">
                <Trash2 className="h-5 w-5" />
              </Button>
            </Card>
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
              <Button asChild size="lg" className="w-full bg-gradient-to-r from-[#FF4500] to-[#FF8C00] hover:opacity-90 text-primary-foreground">
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
