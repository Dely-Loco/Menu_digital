// src/app/page.tsx
import Link from 'next/link';
import { ChevronDown, Sparkles, Zap, Shield, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import FeaturedProductsSlider from '@/components/home/featured-products-slider';
import CategorySection from '@/components/home/category-section';
import { getFeaturedProducts, getAllCategories } from '@/lib/queries'; 
import type { Product, Category } from '@/types';

export default async function HomePage() {
  const featuredProducts: Product[] = await getFeaturedProducts();
  const allCategories: Category[] = await getAllCategories();

  return (
    <div className="relative">
      
      {/* === SECCIÓN HERO === */}
      <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white">
        {/* Efectos de fondo optimizados con SVG */}
        <div className="absolute inset-0 opacity-8 pointer-events-none">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 800" fill="none">
            <defs>
              <radialGradient id="glow1_page" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FF4500" stopOpacity="0.25" />
                <stop offset="70%" stopColor="#FF8C00" stopOpacity="0.1" />
                <stop offset="100%" stopColor="transparent" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="glow2_page" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FF8C00" stopOpacity="0.2" />
                <stop offset="70%" stopColor="#FF4500" stopOpacity="0.08" />
                <stop offset="100%" stopColor="transparent" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="gradient1_page">
                <stop offset="0%" stopColor="#FF4500" stopOpacity="0.1" />
                <stop offset="50%" stopColor="#FF8C00" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#FF4500" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            <circle cx="200" cy="150" r="100" fill="url(#glow1_page)" className="animate-[pulse_8s_ease-in-out_infinite]" style={{ animationDelay: '0s' }} />
            <circle cx="950" cy="650" r="120" fill="url(#glow2_page)" className="animate-[pulse_10s_ease-in-out_infinite]" style={{ animationDelay: '2s' }} />
            <path d="M100 700L400 400L700 600L1100 300" stroke="url(#gradient1_page)" strokeWidth="1" fill="none" />
          </svg>
        </div>
        
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
          {/* Badge superior */}
          <div className="mb-6 md:mb-8 inline-flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 shadow-sm">
            <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-orange-400" />
            <span className="text-xs md:text-sm font-medium">Tecnología de Vanguardia</span>
          </div>
          
          {/* Título principal con aura reactiva */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-6 md:mb-8 leading-[0.9] tracking-tight">
            Bienvenido a{' '}
            <span className="relative inline-block group">
              <span className="bg-gradient-to-r from-orange-400 via-red-500 to-orange-600 bg-clip-text text-transparent">
                Houzze Tec
              </span>
              {/* Aura reactiva al hover más elegante */}
              <span className="absolute -inset-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg blur-xl opacity-20 group-hover:opacity-35 group-hover:blur-2xl transition-all duration-500 ease-out pointer-events-none" 
                    aria-hidden="true" />
            </span>
          </h1>
          
          {/* Subtítulo mejorado */}
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-8 md:mb-12 leading-relaxed max-w-4xl mx-auto font-light">
            La <span className="text-orange-400 font-semibold">innovación tecnológica</span> para tu hogar, oficina y estilo de vida digital.
          </p>
          
          {/* Botones CTA con animaciones chimbas */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12 md:mb-16 max-w-lg sm:max-w-none mx-auto">
            <Button 
              asChild 
              size="lg" 
              className="group relative bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-bold px-6 sm:px-8 md:px-10 py-4 md:py-5 text-base md:text-lg lg:text-xl shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 transform hover:scale-105 rounded-xl border-0 min-h-[3rem] md:min-h-[3.5rem] overflow-hidden"
            >
              <Link href="/products" className="flex items-center justify-center gap-2 w-full">
                <span className="relative z-10">Explorar Productos</span>
                <Zap className="w-4 h-4 md:w-5 md:h-5 group-hover:animate-bounce transition-transform duration-200" />
              </Link>
            </Button>
            
            <Button 
              asChild 
              size="lg" 
              variant="outline" 
              className="group border-2 border-gray-300 text-white hover: bg-white hover:text-slate-900 font-semibold px-6 sm:px-8 md:px-10 py-4 md:py-5 text-base md:text-lg lg:text-xl transition-all duration-300 hover:scale-105 rounded-xl backdrop-blur-sm bg-white/5 hover:bg-white min-h-[3rem] md:min-h-[3.5rem]"
            >
              <Link href="#featured-products-section" className="flex items-center justify-center gap-2 w-full">
                <span>Ver Destacados</span>
                <Star className="w-4 h-4 md:w-5 md:h-5 group-hover:animate-spin transition-transform duration-200" />
              </Link>
            </Button>
          </div>
          
          {/* Tarjetas de beneficios con iconos grandes y mejores efectos */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 lg:gap-8 max-w-5xl mx-auto">
            {[
              { icon: Shield, title: "Garantía Premium", desc: "Protección completa" },
              { icon: Zap, title: "Envío Express", desc: "Rápido y seguro" },
              { icon: Star, title: "Calidad Superior", desc: "Marcas seleccionadas" }
            ].map((item, index) => (
              <div 
                key={index}
                className="group flex flex-col items-center text-center p-4 md:p-6 bg-white/10 backdrop-blur-md rounded-xl md:rounded-2xl border border-white/10 hover:bg-white/15 transition-all duration-300 hover:scale-[1.03] shadow-lg"
              >
                <item.icon className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-orange-400 mb-3 md:mb-4 group-hover:text-orange-300 transition-colors duration-300" />
                <h3 className="font-bold text-sm md:text-lg lg:text-xl mb-1 md:mb-2">{item.title}</h3>
                <p className="text-gray-300 text-xs md:text-sm lg:text-base">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Indicador de scroll con animación suave */}
        <div className="absolute bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 opacity-70 hover:opacity-100 transition-opacity">
          <Link href="#featured-products-section" aria-label="Ir a productos destacados" className="block p-2">
            <ChevronDown className="w-6 h-6 md:w-8 md:h-8 text-white/80 animate-bounce" 
                          style={{ animationDuration: '2s' }} />
          </Link>
        </div>
      </section>
      
      {/* CONTENIDO PRINCIPAL */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20 space-y-12 md:space-y-16 lg:space-y-24">
        
        {/* Sección de productos destacados */}
        <section id="featured-products-section" className="space-y-8 md:space-y-10">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 lg:gap-6">
            <div className="flex-1">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-2 md:mb-3 leading-tight">
                Productos <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">Destacados</span>
              </h2>
              <p className="text-base md:text-lg lg:text-xl text-gray-600">Los favoritos de nuestros clientes.</p>
            </div>
            
            <Button 
              variant="outline" 
              asChild 
              className="group border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white font-semibold px-4 md:px-5 py-2 md:py-2.5 transition-all duration-300 hover:scale-105 rounded-xl text-sm md:text-base flex-shrink-0"
            >
              <Link href="/products?featured=true" className="flex items-center gap-1.5">
                <span>Ver Todos</span>
                <ChevronDown className="w-4 h-4 rotate-[-90deg] group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </Button>
          </div>
          
          {featuredProducts && featuredProducts.length > 0 ? (
            <div className="bg-gray-50 rounded-xl md:rounded-2xl lg:rounded-3xl p-4 md:p-6 lg:p-10 shadow-inner">
              <FeaturedProductsSlider products={featuredProducts} />
            </div>
          ) : (
            <div className="text-center py-12 md:py-16 bg-gray-50 rounded-xl">
              <p className="text-gray-500 text-base md:text-lg">No hay productos destacados en este momento.</p>
            </div>
          )}
        </section>

        {/* Sección de categorías */}
        <section className="space-y-8 md:space-y-10">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-3 md:mb-4 leading-tight">
              Explora por <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">Categoría</span>
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed">
              Encuentra exactamente lo que necesitas en nuestras categorías especializadas.
            </p>
          </div>
          
          {allCategories && allCategories.length > 0 ? (
            <div className="bg-white rounded-xl md:rounded-2xl lg:rounded-3xl p-4 md:p-6 lg:p-10 shadow-lg border border-gray-100">
              <CategorySection categories={allCategories} />
            </div>
          ) : (
            <div className="text-center py-12 md:py-16 bg-white rounded-xl shadow-lg">
              <p className="text-gray-500 text-base md:text-lg">No hay categorías disponibles en este momento.</p>
            </div>
          )}
        </section>

        {/* Sección de ofertas con efectos súper chimbas */}
        <section className="relative rounded-xl md:rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl">
          <div className="relative min-h-[400px] md:min-h-[450px] lg:min-h-[500px] flex items-center justify-center p-6 md:p-8 lg:p-12">
            {/* Fondo con gradientes múltiples */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900" />
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-red-500/30 to-orange-600/20" />
            
            {/* Efectos de fondo con radial gradients */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(255,69,0,0.3),transparent_50%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(255,140,0,0.2),transparent_50%)]" />
            </div>
            
            <div className="relative z-10 text-center max-w-4xl mx-auto">
              {/* Badge de oferta con mejor estilo */}
              <div className="mb-4 md:mb-6 inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-red-500/20 backdrop-blur-sm rounded-full border border-red-500/30 shadow-lg">
                <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-red-400 animate-pulse" />
                <span className="text-xs md:text-sm font-medium text-white">Oferta Exclusiva</span>
              </div>
              
              {/* Título de ofertas */}
              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 md:mb-6 leading-tight">
                ¡Ofertas <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">Imperdibles!</span>
              </h3>
              
              {/* Descripción de ofertas */}
              <p className="text-base md:text-lg lg:text-xl text-gray-200 mb-6 md:mb-8 lg:mb-10 leading-relaxed max-w-2xl mx-auto">
                Hasta <span className="text-orange-400 font-bold text-xl md:text-2xl lg:text-3xl">30% DCTO</span> en Hogar Inteligente.
                <br className="hidden sm:block" />
                Transforma tu hogar por menos.
              </p>
              
              {/* Botón de ofertas súper chimba */}
              <Button 
                asChild
                size="lg" 
                className="group relative bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold px-6 md:px-8 lg:px-10 py-4 md:py-5 text-base md:text-lg lg:text-xl shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 transform hover:scale-105 rounded-xl min-h-[3rem] md:min-h-[3.5rem] overflow-hidden"
              >
                <Link href="/products?category=smart-home&on_sale=true" className="flex items-center justify-center gap-2 md:gap-3">
                  <span className="relative z-10">Ver Ofertas</span>
                  <Zap className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 group-hover:animate-bounce transition-transform duration-200" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}