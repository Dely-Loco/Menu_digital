import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Star, ShoppingCart, Heart, Eye } from 'lucide-react';
import type { Product, Category } from '@/types'; // Import Category type
import Image from 'next/image';

// Props interface para el componente slider
interface FeaturedProductsSliderProps {
  products?: Product[];
  itemsPerView?: {
    desktop: number;
    tablet: number;
    mobile: number;
  };
  autoPlayInterval?: number;
  title?: string;
  subtitle?: string;
  showControls?: boolean;
  showDots?: boolean;
  onProductClick?: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
  onAddToWishlist?: (product: Product) => void;
}

const FeaturedProductsSlider: React.FC<FeaturedProductsSliderProps> = ({ 
  products: propProducts,
  itemsPerView = { desktop: 4, tablet: 2, mobile: 1 },
  autoPlayInterval = 5000,
  title = "Productos Destacados",
  subtitle = "Descubre nuestra selección de productos premium",
  showControls = true,
  showDots = true,
  onProductClick,
  onAddToCart,
  onAddToWishlist
}) => {
  // Estados del componente
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  const [currentItemsPerView, setCurrentItemsPerView] = useState<number>(itemsPerView.desktop);

  // Productos por defecto mejorados
  // Productos por defecto mejorados
  const defaultProducts: Product[] = useMemo(() => [
    {
      id: "1",
      name: "Auriculares Bluetooth Premium",
      slug: "auriculares-bluetooth-premium",
      description: "Auriculares inalámbricos con cancelación de ruido activa y sonido Hi-Fi",
      shortDescription: "Sonido premium con cancelación de ruido",
      technicalSpec: "Bluetooth 5.0, Batería 30h, Cancelación activa",
      price: 89.99,
      originalPrice: 129.99,
      discountPercentage: 31,
      category: {
        id: "audio-1", // Añade un ID único para la categoría "audio"
        slug: "audio",
        name: "Audio"
      },
      brand: "TechSound",
      images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop"],
      rating: 4.5,
      reviewsCount: 324,
      stock: 50,
      isFeatured: true,
      isBestseller: true,
      features: ["Cancelación de ruido", "30h batería", "Carga rápida"],
      colors: ["Negro", "Blanco", "Azul"],
      warranty: "2 años"
    },
    {
      id: "2",
      name: "Reloj Inteligente Deportivo",
      slug: "reloj-inteligente-deportivo",
      description: "Smartwatch con GPS, monitor cardíaco y resistencia al agua",
      shortDescription: "Smartwatch completo para deportistas",
      technicalSpec: "GPS, Monitor cardíaco, IP68, iOS/Android",
      price: 199.99,
      originalPrice: 249.99,
      discountPercentage: 20,
      category: {
        id: "wearables-2", // Añade un ID único para la categoría "wearables"
        slug: "wearables",
        name: "Wearables"
      },
      brand: "FitTech",
      images: ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop"],
      rating: 4.8,
      reviewsCount: 156,
      stock: 30,
      isFeatured: true,
      isNew: true,
      features: ["GPS integrado", "Resistente al agua", "Monitor 24/7"],
      colors: ["Negro", "Plateado", "Oro Rosa"],
      warranty: "1 año"
    },
    {
      id: "3",
      name: "Altavoz Portátil 360°",
      slug: "altavoz-portatil-360",
      description: "Altavoz Bluetooth con sonido 360° y graves potentes",
      shortDescription: "Sonido envolvente portátil",
      technicalSpec: "Bluetooth 5.0, 20W, IPX7, 12h batería",
      price: 59.99,
      category: {
        id: "audio-3", // Añade un ID único para la categoría "audio"
        slug: "audio",
        name: "Audio"
      },
      brand: "SoundWave",
      images: ["https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop"],
      rating: 4.3,
      reviewsCount: 89,
      stock: 75,
      isFeatured: true,
      features: ["Sonido 360°", "Resistente al agua", "Carga USB-C"],
      colors: ["Negro", "Azul", "Rojo"],
      warranty: "1 año"
    },
    {
      id: "4",
      name: "Teclado Mecánico Gaming RGB",
      slug: "teclado-mecanico-gaming-rgb",
      description: "Teclado mecánico para gaming con switches azules y RGB",
      shortDescription: "Teclado gaming profesional",
      technicalSpec: "Switches Cherry MX Blue, RGB, Anti-ghosting",
      price: 149.99,
      originalPrice: 199.99,
      discountPercentage: 25,
      category: {
        id: "gaming-4", // Añade un ID único para la categoría "gaming"
        slug: "gaming",
        name: "Gaming"
      },
      brand: "GamePro",
      images: ["https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=400&fit=crop"],
      rating: 4.7,
      reviewsCount: 201,
      stock: 25,
      isFeatured: true,
      features: ["Switches mecánicos", "RGB personalizable", "Teclas programables"],
      switchTypes: ["Cherry MX Blue", "Cherry MX Red"],
      warranty: "3 años"
    },
    {
      id: "5",
      name: "Cámara Web 4K Ultra HD",
      slug: "camara-web-4k-ultra-hd",
      description: "Webcam 4K con autoenfoque y micrófono integrado",
      shortDescription: "Video 4K profesional",
      technicalSpec: "4K@30fps, Autoenfoque, Micrófono estéreo",
      price: 79.99,
      category: {
        id: "tech-5", // Añade un ID único para la categoría "tech"
        slug: "tech",
        name: "Tech"
      },
      brand: "VisionTech",
      images: ["https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=400&fit=crop"],
      rating: 4.4,
      reviewsCount: 67,
      stock: 40,
      isFeatured: true,
      features: ["Video 4K", "Autoenfoque rápido", "Micrófono integrado"],
      compatibility: ["Windows", "macOS", "Linux"],
      warranty: "2 años"
    }
  ], []);
  

  // Usar productos de props o productos por defecto
  const products = propProducts || defaultProducts;

  // Manejar responsive design
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setCurrentItemsPerView(itemsPerView.desktop);
      } else if (width >= 768) {
        setCurrentItemsPerView(itemsPerView.tablet);
      } else {
        setCurrentItemsPerView(itemsPerView.mobile);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [itemsPerView]);

  // Configuración del slider
  const maxIndex = Math.max(0, products.length - currentItemsPerView);

  // Auto-play effect
  useEffect(() => {
    if (!isAutoPlaying || products.length <= currentItemsPerView) return;
    
    const interval = setInterval(() => {
      setCurrentIndex(prev => prev >= maxIndex ? 0 : prev + 1);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [isAutoPlaying, maxIndex, autoPlayInterval, products.length, currentItemsPerView]);

  // Handlers memoizados
  const handlePrevious = useCallback((): void => {
    setCurrentIndex(prev => prev <= 0 ? maxIndex : prev - 1);
  }, [maxIndex]);

  const handleNext = useCallback((): void => {
    setCurrentIndex(prev => prev >= maxIndex ? 0 : prev + 1);
  }, [maxIndex]);

  const handleMouseEnter = useCallback((): void => {
    setIsAutoPlaying(false);
  }, []);

  const handleMouseLeave = useCallback((): void => {
    setIsAutoPlaying(true);
  }, []);

  // Handlers de productos
  const handleProductClick = useCallback((product: Product): void => {
    if (onProductClick) {
      onProductClick(product);
    } else {
      console.log(`Navegando a producto: ${product.slug}`);
      // Default: navigate to product page
      // router.push(`/products/${product.slug}`);
    }
  }, [onProductClick]);

  const handleAddToCart = useCallback((e: React.MouseEvent, product: Product): void => {
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(product);
    } else {
      console.log(`Agregar al carrito: ${product.name}`);
      // Default cart logic here
    }
  }, [onAddToCart]);

  const handleAddToWishlist = useCallback((e: React.MouseEvent, product: Product): void => {
    e.stopPropagation();
    if (onAddToWishlist) {
      onAddToWishlist(product);
    } else {
      console.log(`Agregar a wishlist: ${product.name}`);
      // Default wishlist logic here
    }
  }, [onAddToWishlist]);

  // Renderizar estrellas optimizado
  const renderStars = useCallback((rating: number): JSX.Element[] => {
    const stars: JSX.Element[] = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <Star className="w-4 h-4 text-gray-300" />
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 absolute top-0 left-0" style={{ clipPath: 'inset(0 50% 0 0)' }} />
        </div>
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />
      );
    }

    return stars;
  }, []);

  // Obtener estilos de badge
  const getBadgeInfo = useCallback((product: Product) => {
    if (product.isBestseller) {
      return { text: 'Más Vendido', styles: 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' };
    }
    if (product.isNew) {
      return { text: 'Nuevo', styles: 'bg-gradient-to-r from-green-500 to-emerald-600 text-white' };
    }
    if (product.discountPercentage && product.discountPercentage > 0) {
      return { text: `${product.discountPercentage}% OFF`, styles: 'bg-gradient-to-r from-red-500 to-pink-600 text-white' };
    }
    return null;
  }, []);

  // Si no hay productos, no renderizar nada
  if (!products.length) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">{title}</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
      </div>

      {/* Slider Container */}
      <div 
        className="relative overflow-hidden"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Products Grid */}
        <div 
          className="flex transition-transform duration-700 ease-out"
          style={{ 
            transform: `translateX(-${currentIndex * (100 / currentItemsPerView)}%)` 
          }}
        >
          {products.map((product) => {
            const badge = getBadgeInfo(product);
            
            return (
              <div
                key={product.id}
                className="flex-shrink-0 px-3"
                style={{ width: `${100 / currentItemsPerView}%` }}
              >
                {/* Product Card */}
                <div 
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group overflow-hidden"
                  onClick={() => handleProductClick(product)}
                >
                  {/* Image Container */}
                  <div className="relative overflow-hidden">
                    <div className="aspect-square relative">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    </div>
                    
                    {/* Badge */}
                    {badge && (
                      <span className={`absolute top-4 left-4 px-3 py-1 text-xs font-bold rounded-full ${badge.styles} shadow-lg z-10`}>
                        {badge.text}
                      </span>
                    )}
                    
                    {/* Quick Actions */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col space-y-2">
                      <button 
                        className="bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
                        onClick={(e) => handleAddToWishlist(e, product)}
                        title="Agregar a favoritos"
                      >
                        <Heart className="w-4 h-4 text-gray-700" />
                      </button>
                      <button 
                        className="bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
                        title="Vista rápida"
                      >
                        <Eye className="w-4 h-4 text-gray-700" />
                      </button>
                    </div>

                    {/* Stock Badge */}
                    {product.stock <= 5 && product.stock > 0 && (
                      <div className="absolute bottom-4 left-4 bg-orange-500 text-white px-2 py-1 text-xs rounded-full">
                        Solo {product.stock} disponibles
                      </div>
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className="p-6">
                    {/* Brand & Category */}
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-blue-600 font-medium">{product.brand}</span>
<span className="text-xs text-gray-500 capitalize">
  {typeof product.category === 'string' ? product.category : product.category?.name}
</span>
</div>

                    {/* Product Name */}
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                    
                    {/* Short Description */}
                    {product.shortDescription && (
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {product.shortDescription}
                      </p>
                    )}
                    
                    {/* Rating */}
                    <div className="flex items-center mb-4">
                      <div className="flex items-center mr-2">
                        {renderStars(product.rating)}
                      </div>
                      <span className="text-sm text-gray-600">
                        {product.rating} ({product.reviewsCount})
                      </span>
                    </div>
                    
                    {/* Features */}
                    {product.features && product.features.length > 0 && (
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-1">
                          {product.features.slice(0, 2).map((feature, index) => (
                            <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Price & Actions */}
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-gray-900">
                            ${product.price}
                          </span>
                          {product.originalPrice && (
                            <span className="text-sm text-gray-500 line-through">
                              ${product.originalPrice}
                            </span>
                          )}
                        </div>
                        {product.discountPercentage && (
                          <span className="text-sm text-green-600 font-medium">
                            Ahorras ${(product.originalPrice! - product.price).toFixed(2)}
                          </span>
                        )}
                      </div>
                      
                      <button 
                        className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl hover:scale-105"
                        onClick={(e) => handleAddToCart(e, product)}
                        disabled={product.stock === 0}
                      >
                        <ShoppingCart className="w-4 h-4" />
                        <span className="hidden sm:inline">
                          {product.stock === 0 ? 'Agotado' : 'Agregar'}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation Controls */}
        {showControls && products.length > currentItemsPerView && (
          <>
            <button
              onClick={handlePrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white shadow-xl rounded-full p-3 transition-all duration-200 z-10 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-110"
              disabled={currentIndex === 0}
              aria-label="Producto anterior"
            >
              <ChevronLeft className="w-6 h-6 text-gray-700" />
            </button>
            
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white shadow-xl rounded-full p-3 transition-all duration-200 z-10 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-110"
              disabled={currentIndex >= maxIndex}
              aria-label="Siguiente producto"
            >
              <ChevronRight className="w-6 h-6 text-gray-700" />
            </button>
          </>
        )}
      </div>

      {/* Dots Indicator */}
      {showDots && products.length > currentItemsPerView && (
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-125 ${
                index === currentIndex 
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 scale-125' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Ir al slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default FeaturedProductsSlider;