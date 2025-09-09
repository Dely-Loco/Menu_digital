// src/app/page.tsx
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getFeaturedPlatos, getAllCategorias } from '@/lib/queries';
import type { Plato, Category } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChefHat, Clock, Star, Utensils, MapPin, Phone, Heart, Award, Leaf } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Dely Loco | Sabores Auténticos de la Comuna 13 - Medellín',
  description: 'Descubre los sabores únicos de Dely Loco en Comuna 13, Medellín. Comida casera, ingredientes frescos y recetas tradicionales. ¡Ven y vive la experiencia gastronómica más auténtica!',
  keywords: 'Dely Loco, Comuna 13, Medellín, restaurante, comida casera, platos típicos, menú digital, gastronomía',
  openGraph: {
    title: 'Dely Loco | Sabores Auténticos de la Comuna 13',
    description: 'Comida casera preparada con amor en el corazón de la Comuna 13, Medellín',
    images: ['/Logo.png'],
    locale: 'es_CO',
    type: 'website',
  },
};

const formatCurrencyCOP = (value: number): string => {
  return value.toLocaleString('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
};

export default async function HomePage() {
  // Obtiene platos destacados y categorías desde la base de datos
  const featuredProducts: Plato[] = await getFeaturedPlatos(8);
  const allCategories: Category[] = await getAllCategorias();

  return (
    <div className="min-h-screen">
      {/* Hero Section - Dely Loco */}
      <section className="relative bg-gradient-to-br from-orange-600 via-red-600 to-red-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/30"></div>
        {/* Elementos decorativos mejorados */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-300/30 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-orange-300/30 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-green-300/20 rounded-full blur-xl animate-pulse delay-500"></div>
        
        <div className="relative container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-5xl mx-auto text-center">
            <div className="mb-8">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30 mb-4 text-lg px-6 py-2">
                <Heart className="w-5 h-5 mr-2" />
                Comuna 13 • Medellín
              </Badge>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-8 leading-tight">
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-orange-200 to-red-200">
                Dely Loco
              </span>
              <span className="block text-3xl md:text-4xl lg:text-5xl font-bold text-white/90 mt-4">
                Sabores que Enamoran
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl lg:text-3xl mb-10 text-white/90 max-w-3xl mx-auto leading-relaxed font-medium">
              Comida casera preparada con amor en el corazón de la Comuna 13. 
              <span className="text-yellow-300 font-bold"> ¡Cada plato cuenta una historia!</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button 
                asChild 
                size="lg"
                className="bg-white text-orange-600 hover:bg-gray-100 font-bold text-xl px-10 py-4 rounded-full shadow-2xl transform transition-all hover:scale-110 hover:shadow-3xl"
              >
                <Link href="/menu">
                  <Utensils className="w-6 h-6 mr-3" />
                  Explorar Nuestro Menú
                </Link>
              </Button>
              
              <Button 
                asChild 
                variant="outline" 
                size="lg"
                className="border-2 border-white text-white hover:bg-white hover:text-orange-600 font-bold text-xl px-10 py-4 rounded-full backdrop-blur-sm bg-white/10"
              >
                <Link href="#especialidades">
                  <Star className="w-6 h-6 mr-3" />
                  Ver Especialidades
                </Link>
              </Button>
            </div>

            {/* Información rápida */}
            <div className="mt-12 flex flex-col sm:flex-row gap-6 justify-center items-center text-white/80">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span className="font-medium">Lun - Dom: 12:00 PM - 8:00 PM</span>
              </div>
              <div className="hidden sm:block w-1 h-1 bg-white/50 rounded-full"></div>
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5" />
                <a href="tel:+573014056704" className="font-medium hover:text-yellow-300 transition-colors">
                  +57 301 405 6704
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Ventajas de Dely Loco */}
      <section className="py-20 bg-gradient-to-br from-orange-50 to-red-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              ¿Por qué elegirnos?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              En Dely Loco nos apasiona brindar la mejor experiencia gastronómica de la Comuna 13
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="text-center group">
              <div className="bg-gradient-to-br from-orange-400 to-red-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Clock className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Atención Rápida</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Servicio eficiente en restaurante y domicilios ágiles. 
                Tu satisfacción es nuestra prioridad.
              </p>
            </div>
            
            <div className="text-center group">
              <div className="bg-gradient-to-br from-green-400 to-emerald-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <ChefHat className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Tradición Familiar</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Recetas transmitidas de generación en generación, 
                preparadas con el sazón auténtico de la Comuna 13.
              </p>
            </div>
            
            <div className="text-center group">
              <div className="bg-gradient-to-br from-blue-400 to-purple-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Leaf className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Ingredientes Frescos</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Seleccionamos cuidadosamente cada ingrediente para 
                garantizar frescura y calidad en cada plato.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categorías Section */}
      {allCategories.length > 0 && (
        <section id="especialidades" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge variant="secondary" className="bg-orange-100 text-orange-700 mb-6 text-lg px-6 py-2">
                <Award className="w-5 h-5 mr-2" />
                Nuestras Especialidades
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Categorías que te van a
                <span className="text-orange-600"> Enamorar</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Desde platos tradicionales hasta creaciones únicas, 
                cada categoría refleja la riqueza gastronómica de Medellín
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
              {allCategories.slice(0, 8).map((category, index) => (
                <Link 
                  key={category.id} 
                  href={`/menu?category=${category.slug}`}
                  className="group"
                  style={{ 
                    animationDelay: `${index * 100}ms`,
                    animation: 'fadeInUp 0.8s ease-out forwards'
                  }}
                >
                  <Card className="overflow-hidden border-0 shadow-xl transition-all duration-500 hover:shadow-2xl hover:scale-105 bg-gradient-to-br from-white to-orange-50/30">
                    <div className="aspect-square relative">
                      <Image
                        src={category.image || '/placeholder-category.jpg'}
                        alt={category.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-120"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/50 transition-all duration-300" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center text-white transform group-hover:scale-110 transition-transform duration-300">
                          <h3 className="font-bold text-lg md:text-xl mb-2 drop-shadow-lg">
                            {category.name}
                          </h3>
                          {category.platosCount && category.platosCount > 0 && (
                            <Badge className="bg-orange-500 hover:bg-orange-600 text-white">
                              {category.platosCount} platos
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Button asChild variant="outline" size="lg" className="border-2 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white text-lg px-8 py-3">
                <Link href="/menu">
                  <Utensils className="w-5 h-5 mr-2" />
                  Ver Todas las Categorías
                </Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Platos Destacados Section */}
      {featuredProducts.length > 0 && (
        <section className="py-20 bg-gradient-to-br from-gray-50 to-orange-50/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge variant="secondary" className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 mb-6 text-lg px-6 py-2">
                <Star className="w-5 h-5 mr-2" />
                Especiales del Chef
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Platos que
                <span className="text-orange-600"> Conquistan Corazones</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Los favoritos de nuestros clientes y las creaciones especiales 
                que hacen de Dely Loco un lugar único
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts.map((product, index) => (
                <Link 
                  key={product.id} 
                  href={`/menu/${product.slug}`} 
                  className="group"
                  style={{ 
                    animationDelay: `${index * 150}ms`,
                    animation: 'fadeInUp 0.8s ease-out forwards'
                  }}
                >
                  <Card className="overflow-hidden border-0 shadow-xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-3 bg-white">
                    <div className="aspect-[4/3] relative">
                      <Image
                        src={product.images[0]?.url || '/placeholder-food.jpg'}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      {product.discountPercentage && product.discountPercentage > 0 && (
                        <Badge className="absolute top-3 left-3 bg-red-500 hover:bg-red-600 animate-pulse">
                          -{product.discountPercentage}%
                        </Badge>
                      )}
                      <Badge className="absolute top-3 right-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                        <Star className="w-3 h-3 mr-1" />
                        Destacado
                      </Badge>
                      
                      {/* Overlay de información */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="text-white text-center">
                          <p className="font-semibold">Ver Detalles</p>
                          <p className="text-sm opacity-90">Conoce más sobre este plato</p>
                        </div>
                      </div>
                    </div>
                    
                    <CardContent className="p-6">
                      <h3 className="font-bold text-xl mb-3 group-hover:text-orange-600 transition-colors line-clamp-2">
                        {product.name}
                      </h3>
                      
                      {product.shortDescription && (
                        <p className="text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                          {product.shortDescription}
                        </p>
                      )}
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          {product.originalPrice && (
                            <span className="text-gray-400 line-through text-sm">
                              {formatCurrencyCOP(product.originalPrice)}
                            </span>
                          )}
                          <div className="font-bold text-xl text-orange-600">
                            {formatCurrencyCOP(product.price)}
                          </div>
                        </div>
                        
                        <Button 
                          size="sm" 
                          className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 rounded-full px-6 font-semibold"
                        >
                          Ver Más
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Button asChild size="lg" className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-xl px-10 py-4">
                <Link href="/menu">
                  <Utensils className="w-6 h-6 mr-3" />
                  Explorar Todo el Menú
                </Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Contact Section - Información real de Dely Loco */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                ¿Listo para vivir la
                <span className="text-orange-600"> Experiencia Dely Loco?</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Estamos ubicados en el corazón de la Comuna 13, 
                listos para atenderte con la mejor comida y el mejor ambiente
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-10">
              <Card className="p-8 text-center border-0 shadow-xl bg-gradient-to-br from-green-50 to-emerald-50 hover:shadow-2xl transition-all duration-300">
                <div className="bg-gradient-to-br from-green-500 to-emerald-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Phone className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Haz tu Pedido</h3>
                <p className="text-gray-600 mb-6 text-lg">
                  Llámanos y disfruta nuestros platos en casa o visítanos en el restaurante
                </p>
                <a 
                  href="tel:+573014056704"
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  <Phone className="w-5 h-5" />
                  +57 301 405 6704
                </a>
              </Card>
              
              <Card className="p-8 text-center border-0 shadow-xl bg-gradient-to-br from-blue-50 to-indigo-50 hover:shadow-2xl transition-all duration-300">
                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MapPin className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Nuestra Ubicación</h3>
                <p className="text-gray-600 mb-6 text-lg">
                  Encuentranos en la Comuna 13, el lugar más vibrante de Medellín
                </p>
                <div className="space-y-2 text-gray-700">
                  <p className="font-semibold text-lg">Comuna 13, Medellín</p>
                  <p className="text-orange-600 font-medium">Lun - Dom: 12:00 PM - 8:00 PM</p>
                </div>
              </Card>
            </div>

            {/* Call to action final */}
            <div className="mt-16 text-center bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl p-12 text-white">
              <h3 className="text-3xl md:text-4xl font-bold mb-6">
                ¡La Comuna 13 te espera con los mejores sabores!
              </h3>
              <p className="text-xl mb-8 opacity-90">
                Ven y descubre por qué somos el restaurante favorito del barrio
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-white text-orange-600 hover:bg-gray-100 font-bold text-lg px-8 py-3">
                  <Link href="/menu">
                    Explorar Menú Digital
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-2 border-white text-white hover:bg-white hover:text-orange-600 font-bold text-lg px-8 py-3">
                  <Link href="/about">
                    Conoce Nuestra Historia
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}