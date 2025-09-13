// src/components/shared/plato-card.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import type { Plato } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, ChefHat, Flame, Leaf } from 'lucide-react';

interface PlatoCardProps {
  plato: Plato;
  priority?: boolean;
}

const formatCurrencyCOP = (value: number): string => {
  return value.toLocaleString('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
};

const getTagIcon = (tag: string) => {
  const tagLower = tag.toLowerCase();
  if (tagLower.includes('picante')) return <Flame className="w-3 h-3" />;
  if (tagLower.includes('vegano') || tagLower.includes('vegetariano')) return <Leaf className="w-3 h-3" />;
  if (tagLower.includes('rapido') || tagLower.includes('rápido')) return <Clock className="w-3 h-3" />;
  if (tagLower.includes('chef') || tagLower.includes('especial')) return <ChefHat className="w-3 h-3" />;
  return null;
};

export default function PlatoCard({ plato, priority = false }: PlatoCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const discount = plato.originalPrice && plato.price < plato.originalPrice
    ? Math.round(((plato.originalPrice - plato.price) / plato.originalPrice) * 100)
    : 0;

  return (
    <Link href={`/menu/${plato.slug}`} className="block group">
      <Card 
        className="overflow-hidden bg-white border-0 shadow-md group-hover:shadow-2xl transition-all duration-500 rounded-3xl h-full group-hover:-translate-y-1"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Imagen del plato */}
        <div className="relative aspect-[4/3] overflow-hidden rounded-t-3xl bg-gradient-to-br from-orange-50 to-red-50">
          <Image
            src={plato.images[0]?.url || '/placeholder-food.jpg'}
            alt={plato.name}
            fill
            className={`object-cover transition-all duration-700 group-hover:scale-110 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={priority}
          />
          
          {/* Overlay sutil */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500" />
          
          {/* Etiquetas superiores */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {/* Descuento */}
            {discount > 0 && (
              <Badge className="bg-red-500 hover:bg-red-600 text-white font-bold shadow-lg">
                -{discount}%
              </Badge>
            )}
            
            {/* Destacado */}
            {plato.isFeatured && (
              <Badge className="bg-orange-500 hover:bg-orange-600 text-white font-medium shadow-lg">
                Especial del Chef
              </Badge>
            )}
            
            {/* No disponible */}
            {!plato.available && (
              <Badge className="bg-gray-500 text-white font-medium shadow-lg">
                Agotado
              </Badge>
            )}
          </div>

          {/* Etiquetas de ingredientes */}
          {plato.tags && plato.tags.length > 0 && (
            <div className="absolute top-4 right-4 flex flex-col gap-1">
              {plato.tags.slice(0, 2).map((tag) => {
                const icon = getTagIcon(tag);
                if (!icon) return null;
                
                return (
                  <div
                    key={tag}
                    className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-orange-600 shadow-sm transition-all duration-300 hover:scale-110"
                    title={tag}
                  >
                    {icon}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Contenido */}
        <CardContent className="p-6 space-y-3">
          {/* Categoría */}
          {plato.category && (
            <p className="text-xs uppercase tracking-wider text-orange-500 font-medium">
              {plato.category.name}
            </p>
          )}

          {/* Nombre del plato */}
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors duration-300 line-clamp-2 leading-tight">
            {plato.name}
          </h3>

          {/* Descripción */}
          {plato.shortDescription && (
            <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
              {plato.shortDescription}
            </p>
          )}

          {/* Precios */}
          <div className="flex items-center justify-between pt-2">
            <div className="space-y-1">
              {/* Precio original tachado */}
              {plato.originalPrice && plato.originalPrice > plato.price && (
                <p className="text-sm text-gray-400 line-through">
                  {formatCurrencyCOP(plato.originalPrice)}
                </p>
              )}
              
              {/* Precio actual */}
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrencyCOP(plato.price)}
              </p>
            </div>

            {/* Indicador visual de hover */}
            <div className={`w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center transition-all duration-300 ${
              isHovered ? 'scale-110 shadow-lg' : 'scale-100'
            }`}>
              <ChefHat className="w-5 h-5 text-white" />
            </div>
          </div>

          {/* Etiquetas de ingredientes en texto */}
          {plato.tags && plato.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 pt-2">
              {plato.tags.slice(0, 3).map((tag) => (
                <Badge 
                  key={tag} 
                  variant="secondary" 
                  className="text-xs bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                >
                  {tag}
                </Badge>
              ))}
              {plato.tags.length > 3 && (
                <Badge 
                  variant="secondary" 
                  className="text-xs bg-gray-100 text-gray-600"
                >
                  +{plato.tags.length - 3} más
                </Badge>
              )}
            </div>
          )}
        </CardContent>

        {/* Overlay de no disponible */}
        {!plato.available && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center rounded-3xl">
            <div className="text-center space-y-2">
              <p className="text-lg font-bold text-gray-800">No Disponible</p>
              <p className="text-sm text-gray-600">Temporalmente agotado</p>
            </div>
          </div>
        )}
      </Card>
    </Link>
  );
}