"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2, Minus, Plus } from 'lucide-react';
import type { CartItem } from '@/types';

interface CartItemRowProps {
  item: CartItem;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
}

export default function CartItemRow({ item, updateQuantity, removeItem }: CartItemRowProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 p-4 shadow-sm bg-white rounded-md">
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
        <Button
          variant="outline"
          size="icon"
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
          disabled={item.quantity <= 1}
          aria-label={`Decrease quantity of ${item.name}`}
        >
          <Minus className="h-4 w-4" />
        </Button>
        <Input
          type="number"
          aria-label={`Quantity for ${item.name}`}
          value={item.quantity}
          onChange={(e) => {
            const value = parseInt(e.target.value);
            if (!isNaN(value) && value > 0) {
              updateQuantity(item.id, value);
            }
          }}
          min="1"
          className="w-16 h-9 text-center"
        />
        <Button
          variant="outline"
          size="icon"
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
          aria-label={`Increase quantity of ${item.name}`}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <p className="text-lg font-semibold w-20 text-center sm:text-right">
        ${(item.price * item.quantity).toFixed(2)}
      </p>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => removeItem(item.id)}
        className="text-destructive hover:text-destructive/80"
        aria-label={`Remove ${item.name} from cart`}
      >
        <Trash2 className="h-5 w-5" />
      </Button>
    </div>
  );
}
