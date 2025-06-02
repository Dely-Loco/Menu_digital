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

  // Para efectos visuales que no dependen de estado de cliente (useState/useEffect),
  // podemos usar clases de Tailwind y CSS directamente.
  // Animaciones de scroll complejas o parallax JS requerirían Client Components.

  return (
    <div className="relative">
      
      {/* === SECCIÓN HERO === */}
      <section className="relative min-h-[85vh] md:min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white">
        {/* Efectos de fondo sutiles */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 800" fill="none">
            <defs>
              <radialGradient id="glow1_page" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#FF4500" stopOpacity="0.3" /><stop offset="70%" stopColor="#FF8C00" stopOpacity="0.1" /><stop offset="100%" stopColor="transparent" stopOpacity="0" /></radialGradient>
              <radialGradient id="glow2_page" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#FF8C00" stopOpacity="0.2" /><stop offset="70%" stopColor="#FF4500" stopOpacity="0.05" /><stop offset="100%" stopColor="transparent" stopOpacity="0" /></radialGradient>
              <linearGradient id="gradient1_page"><stop offset="0%" stopColor="#FF4500" stopOpacity="0.1" /><stop offset="50%" stopColor="#FF8C00" stopOpacity="0.2" /><stop offset="100%" stopColor="#FF4500" stopOpacity="0.1" /></linearGradient>
              <linearGradient id="gradient2_page"><stop offset="0%" stopColor="#FF8C00" stopOpacity="0.05" /><stop offset="100%" stopColor="#FF4500" stopOpacity="0.15" /></linearGradient>
            </defs>
            {/* Elementos SVG con opacidad reducida y animaciones más lentas si es necesario */}
            <circle cx="200" cy="150" r="100" fill="url(#glow1_page)" className="animate-[pulse_8s_ease-in-out_infinite]" style={{ animationDelay: '0s' }} />
            <circle cx="950" cy="650" r="120" fill="url(#glow2_page)" className="animate-[pulse_10s_ease-in-out_infinite]" style={{ animationDelay: '1s' }} />
            <path d="M100 700L400 400L700 600L1100 300" stroke="url(#gradient1_page)" strokeWidth="1" fill="none" />
          </svg>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 shadow-sm">
            <Sparkles className="w-4 h-4 text-orange-400" />
            <span className="text-sm font-medium">Tecnología de Vanguardia</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 md:mb-8 leading-tight">
            Bienvenido a{' '}
            <span className="relative group"> {/* 'group' para controlar hover en el aura */}
              <span className="bg-gradient-to-r from-orange-400 via-red-500 to-orange-600 bg-clip-text text-transparent">
                Houzze Tec
              </span>
              {/* Aura/Glow más sutil y reactivo al hover */}
              <span className="absolute -inset-1.5 md:-inset-2.5 bg-gradient-to-r from-orange-500 to-red-500 rounded-full blur-xl opacity-20 group-hover:opacity-30 group-hover:blur-2xl transition-all duration-500 ease-out pointer-events-none" />
            </span>
          </h1>
          
          <p className="text-lg md:text-2xl text-gray-300 mb-10 md:mb-12 leading-relaxed max-w-3xl mx-auto font-light">
            La <span className="text-orange-400 font-semibold">innovación tecnológica</span> para tu hogar, oficina y estilo de vida digital.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6 mb-12 md:mb-16">
            <Button asChild size="lg" className="group relative bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-bold px-8 md:px-10 py-5 md:py-6 text-lg md:text-xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 rounded-xl md:rounded-2xl overflow-hidden">
              <Link href="/products">
                <span className="relative z-10 flex items-center gap-2 md:gap-3">
                  Explorar Productos
                  <Zap className="w-5 h-5 group-hover:animate-bounce" />
                </span>
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="group border-2 border-gray-300 text-white hover:bg-white hover:text-slate-900 font-semibold px-8 md:px-10 py-5 md:py-6 text-lg md:text-xl transition-all duration-300 hover:scale-105 rounded-xl md:rounded-2xl backdrop-blur-sm bg-white/5">
              <Link href="#featured-products-section">
                <span className="flex items-center gap-2 md:gap-3">
                  Ver Destacados
                  <Star className="w-5 h-5 group-hover:animate-spin" />
                </span>
              </Link>
            </Button>
          </div>
          
          {/* Iconos de Beneficios MÁS GRANDES */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 max-w-4xl mx-auto">
            {[
              { icon: Shield, title: "Garantía Premium", desc: "Protección completa" },
              { icon: Zap, title: "Envío Express", desc: "Rápido y seguro" }, // Zap para envío express tiene sentido
              { icon: Star, title: "Calidad Superior", desc: "Marcas seleccionadas" }
            ].map((item, index) => (
              <div 
                key={index}
                className="group flex flex-col items-center text-center p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 hover:bg-white/15 transition-all duration-300 hover:scale-[1.03] shadow-lg" // Mejorado estilo de tarjeta
              >
                <item.icon className="w-10 h-10 md:w-12 md:h-12 text-orange-400 mb-4 group-hover:text-orange-300 transition-colors duration-300" /> {/* ICONOS MÁS GRANDES */}
                <h3 className="font-bold text-lg md:text-xl mb-2">{item.title}</h3>
                <p className="text-gray-300 text-sm md:text-base">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce opacity-70 hover:opacity-100 transition-opacity">
          <Link href="#featured-products-section" aria-label="Ir a productos destacados">
            <ChevronDown className="w-8 h-8 text-white/80" />
          </Link>
        </div>
      </section>
      
      {/* CONTENIDO PRINCIPAL */}
      <div className="container mx-auto px-4 py-16 md:py-20 space-y-16 md:space-y-24">
        
        <section id="featured-products-section" className="space-y-10">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-2 md:mb-3">
                Productos <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">Destacados</span>
              </h2>
              <p className="text-lg md:text-xl text-gray-600">Los favoritos de nuestros clientes.</p>
            </div>
            <Button 
              variant="outline" 
              asChild 
              className="group border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white font-semibold px-5 py-2.5 transition-all duration-300 hover:scale-105 rounded-xl text-sm md:text-base"
            >
              {/* Este enlace ahora filtra por 'isFeatured' en la página de productos */}
              <Link href="/products?featured=true"> 
                Ver Todos
                <ChevronDown className="w-4 h-4 ml-1.5 rotate-[-90deg] group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </Button>
          </div>
          
          {featuredProducts && featuredProducts.length > 0 ? (
            <div className="bg-gray-50 rounded-2xl md:rounded-3xl p-6 md:p-10 shadow-inner">
              <FeaturedProductsSlider products={featuredProducts} />
            </div>
          ) : (
            <p className="text-center text-gray-500 py-10">No hay productos destacados en este momento.</p>
          )}
        </section>

        <section className="space-y-10">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3 md:mb-4">
              Explora por <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">Categoría</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Encuentra exactamente lo que necesitas en nuestras categorías especializadas.
            </p>
          </div>
          
          {allCategories && allCategories.length > 0 ? (
            <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-10 shadow-lg border border-gray-100">
              {/* Aquí CategorySection debería mostrar las categorías. */}
              {/* Si quieres mostrar productos DENTRO de CategorySection, ese componente necesitaría ser modificado */}
              <CategorySection categories={allCategories} />
            </div>
          ) : (
             <p className="text-center text-gray-500 py-10">No hay categorías disponibles en este momento.</p>
          )}
        </section>

        <section className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
          <div className="relative min-h-[450px] md:min-h-[500px] flex items-center justify-center p-6 md:p-8">
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900" />
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/15 via-red-500/25 to-orange-600/15 pointer-events-none" />
            <div className="absolute inset-0 opacity-5 pointer-events-none">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,69,0,0.2),transparent_50%)]" />
            </div>
            
            <div className="relative z-10 text-center max-w-3xl mx-auto">
              <div className="mb-5 inline-flex items-center gap-2 px-3 py-1.5 bg-red-500/20 backdrop-blur-sm rounded-full border border-red-500/30">
                <Sparkles className="w-3.5 h-3.5 text-red-400" />
                <span className="text-xs font-medium text-white">Oferta Exclusiva</span>
              </div>
              <h3 className="text-3xl md:text-5xl font-black text-white mb-4 md:mb-5">
                ¡Ofertas <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">Imperdibles!</span>
              </h3>
              <p className="text-lg md:text-xl text-gray-200 mb-8 md:mb-10 leading-relaxed">
                Hasta <span className="text-orange-400 font-bold text-2xl md:text-3xl">30% DCTO</span> en Hogar Inteligente. 
                <br className="hidden md:block" />
                Transforma tu hogar por menos.
              </p>
              <Button 
                asChild
                size="lg" 
                className="group bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold px-10 py-5 text-lg md:text-xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 rounded-xl md:rounded-2xl"
              >
                {/* Este enlace ahora filtra por categoría "smart-home" y productos en oferta */}
                <Link href="/products?category=smart-home&on_sale=true">
                  <span className="flex items-center gap-2 md:gap-3">
                    Ver Ofertas
                    <Zap className="w-5 h-5 md:w-6 group-hover:animate-bounce" />
                  </span>
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}