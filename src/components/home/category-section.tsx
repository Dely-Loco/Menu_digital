// @/components/home/category-section.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import type { Category } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';
// Cambiar la importación
import { mapCategorias } from '@/lib/mappers';
import { cn } from '@/lib/utils';

interface CategorySectionProps {
  categories: Category[];
  showAll?: boolean;
  className?: string;
}

export default function CategorySection({ 
  categories, 
  showAll = false,
  className = "" 
}: CategorySectionProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  
  if (!categories || categories.length === 0) {
    return null;
  }

  // Show popular categories first, then others
  const displayCategories = showAll 
    ? categories 
    : categories.filter(cat => cat.isPopular).slice(0, 6);

  return (
    <div className={`relative ${className}`}>
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-pink-50/30 rounded-3xl -z-10" />
      
      {/* Grid container with enhanced responsive design */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4 lg:gap-6 p-4 md:p-6">
        {displayCategories.map((category, index) => {
          const isHovered = hoveredId === category.id;
          
          return (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1,
                ease: "easeOut"
              }}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              className="group relative"
              onMouseEnter={() => setHoveredId(category.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <Link href={`/products?category=${category.slug}`} className="block">
                <Card className="relative overflow-hidden h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white/80 backdrop-blur-sm">
                  {/* Animated background gradient */}
                  <motion.div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(135deg, ${category.color || '#667eea'}20, ${category.color || '#764ba2'}40)`
                    }}
                  />
                  
                  {/* Category image with advanced hover effects */}
                  {category.image && (
                    <div className="relative aspect-square overflow-hidden">
                      <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
                        className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-2"
                        data-ai-hint={category.dataAiHint || category.name.toLowerCase()}
                      />
                      
                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      {/* Floating icon with animation */}
                      <AnimatePresence>
                        {category.icon && isHovered && (
                          <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            exit={{ scale: 0, rotate: 180 }}
                            transition={{ type: "spring", damping: 15 }}
                            className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg"
                          >
                            <span className="text-lg">{category.icon}</span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                      
                      {/* Popular badge */}
                      {category.isPopular && (
                        <motion.div
                          initial={{ x: -100 }}
                          animate={{ x: 0 }}
                          transition={{ delay: index * 0.1 + 0.3 }}
                          className="absolute top-3 left-3"
                        >
                          <Badge 
                            variant="secondary" 
                            className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold shadow-lg"
                          >
                            Popular
                          </Badge>
                        </motion.div>
                      )}
                    </div>
                  )}
                  
                  {/* Content section with enhanced typography */}
                  <CardContent className="relative p-3 md:p-4 text-center space-y-2">
                    {/* Category name with color accent */}
                    <motion.h3 
                      className="text-sm md:text-base font-bold transition-all duration-300 group-hover:scale-105"
                      style={{
                        color: isHovered ? (category.color || '#667eea') : 'inherit'
                      }}
                    >
                      {category.name}
                    </motion.h3>
                    
                    {/* Products count with animation */}
                    {category.productsCount && (
                      <motion.p 
                        className="text-xs text-gray-500 group-hover:text-gray-700 transition-colors"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.1 + 0.5 }}
                      >
                        {category.productsCount} products
                      </motion.p>
                    )}
                    
                    {/* Hover description */}
                    <AnimatePresence>
                      {isHovered && category.description && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="text-xs text-gray-600 leading-relaxed overflow-hidden"
                        >
                          {category.description}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </CardContent>
                  
                  {/* Animated border accent */}
                  <motion.div
                    className="absolute bottom-0 left-0 h-1 bg-gradient-to-r transition-all duration-500"
                    style={{
                      background: `linear-gradient(90deg, ${category.color || '#667eea'}, ${category.color || '#764ba2'})`
                    }}
                    initial={{ width: '0%' }}
                    animate={{ width: isHovered ? '100%' : '0%' }}
                  />
                  
                  {/* Subtle pulse effect on hover */}
                  <motion.div
                    className="absolute inset-0 border-2 border-transparent rounded-lg"
                    animate={{
                      borderColor: isHovered ? (category.color || '#667eea') + '40' : 'transparent'
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </Card>
              </Link>
            </motion.div>
          );
        })}
      </div>
      
      {/* Show All Categories button */}
      {!showAll && categories.length > 6 && (
        <motion.div 
          className="flex justify-center mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Link href="/categories">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:from-blue-700 hover:to-purple-700"
            >
              View All Categories
              <motion.span
                className="inline-block ml-2"
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                →
              </motion.span>
            </motion.button>
          </Link>
        </motion.div>
      )}
      
      {/* Floating particles effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-30"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              delay: i * 1.5,
            }}
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + i * 10}%`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
