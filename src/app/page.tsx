// src/app/page.tsx
import Link from 'next/link';
import { ChevronDown, Sparkles, Zap, Shield, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import FeaturedProductsSlider from '@/components/home/featured-products-slider';
import CategorySection from '@/components/home/category-section';
import { getFeaturedProducts, getAllCategories } from '@/lib/queries'; 
import type { Product, Category } from '@/types';

export default async function HomePage() {
  // 📊 DATOS: Obtiene productos destacados y categorías desde la base de datos
  const featuredProducts: Product[] = await getFeaturedProducts();
  const allCategories: Category[] = await getAllCategories();

  return (
    <div className="relative">
      
      {/* ========================================
          🎨 SECCIÓN HERO - LA PARTE MÁS VISUAL 
          ======================================== */}
      <section className="relative min-h-[85vh] md:min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white">
        
        {/* 🌟 EFECTOS DE FONDO - Puedes cambiar colores y opacidad */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 800" fill="none">
            <defs>
              {/* 🎨 GRADIENTES - Cambia #FF4500 y #FF8C00 por tus colores preferidos */}
              <radialGradient id="glow1_page" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FF4500" stopOpacity="0.3" />
                <stop offset="70%" stopColor="#FF8C00" stopOpacity="0.1" />
                <stop offset="100%" stopColor="transparent" stopOpacity="0" />
              </radialGradient>
            </defs>
            {/* ✨ CÍRCULOS ANIMADOS - Cambia cx, cy, r para posición y tamaño */}
            <circle cx="200" cy="150" r="100" fill="url(#glow1_page)" className="animate-[pulse_8s_ease-in-out_infinite]" />
            <circle cx="950" cy="650" r="120" fill="url(#glow2_page)" className="animate-[pulse_10s_ease-in-out_infinite]" />
          </svg>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          
          {/* 🏷️ ETIQUETA SUPERIOR - Personalizable */}
          <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 shadow-sm">
            <Sparkles className="w-4 h-4 text-orange-400" />
            {/* 📝 TEXTO PERSONALIZABLE - Cambia este mensaje */}
            <span className="text-sm font-medium">Tecnología de Vanguardia</span>
          </div>
          
          {/* 🎯 TÍTULO PRINCIPAL - MUY PERSONALIZABLE */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 md:mb-8 leading-tight">
            {/* 📝 PRIMERA PARTE DEL TÍTULO */}
            Bienvenido a{' '}
            <span className="relative group">
              {/* 🎨 NOMBRE DE LA MARCA - Cambia colores del gradiente aquí */}
              <span className="bg-gradient-to-r from-orange-400 via-red-500 to-orange-600 bg-clip-text text-transparent">
                Houzze Tec {/* 📝 CAMBIA EL NOMBRE DE TU TIENDA AQUÍ */}
              </span>
              {/* ✨ EFECTO GLOW - Cambia from-orange-500 to-red-500 por tus colores */}
              <span className="absolute -inset-1.5 md:-inset-2.5 bg-gradient-to-r from-orange-500 to-red-500 rounded-full blur-xl opacity-20 group-hover:opacity-30 group-hover:blur-2xl transition-all duration-500 ease-out pointer-events-none" />
            </span>
          </h1>
          
          {/* 💬 SUBTÍTULO - Totalmente personalizable */}
          <p className="text-lg md:text-2xl text-gray-300 mb-10 md:mb-12 leading-relaxed max-w-3xl mx-auto font-light">
            {/* 📝 DESCRIPCIÓN DE TU NEGOCIO - Personaliza este texto */}
            La <span className="text-orange-400 font-semibold">innovación tecnológica</span> para tu hogar, oficina y estilo de vida digital.
          </p>
          
          {/* 🔘 BOTONES PRINCIPALES - Muy personalizables */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6 mb-12 md:mb-16">
            {/* 🎨 BOTÓN PRIMARIO - Cambia colores y texto */}
            <Button asChild size="lg" className="group relative bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-bold px-8 md:px-10 py-5 md:py-6 text-lg md:text-xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 rounded-xl md:rounded-2xl overflow-hidden">
              <Link href="/products">
                <span className="relative z-10 flex items-center gap-2 md:gap-3">
                  {/* 📝 TEXTO DEL BOTÓN - Personalizable */}
                  Explorar Productos
                  <Zap className="w-5 h-5 group-hover:animate-bounce" />
                </span>
              </Link>
            </Button>
            
            {/* 🎨 BOTÓN SECUNDARIO */}
            <Button asChild size="lg" variant="outline" className="group border-2 border-gray-300 text-white hover:bg-white hover:text-slate-900 font-semibold px-8 md:px-10 py-5 md:py-6 text-lg md:text-xl transition-all duration-300 hover:scale-105 rounded-xl md:rounded-2xl backdrop-blur-sm bg-white/5">
              <Link href="#featured-products-section">
                <span className="flex items-center gap-2 md:gap-3">
                  {/* 📝 TEXTO DEL BOTÓN - Personalizable */}
                  Ver Destacados
                  <Star className="w-5 h-5 group-hover:animate-spin" />
                </span>
              </Link>
            </Button>
          </div>
          
          {/* 🏆 TARJETAS DE BENEFICIOS - Muy personalizables */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 max-w-4xl mx-auto">
            {[
              /* 📝 BENEFICIOS PERSONALIZABLES - Cambia título, descripción e ícono */
              { icon: Shield, title: "Garantía Premium", desc: "Protección completa" },
              { icon: Zap, title: "Envío Express", desc: "Rápido y seguro" },
              { icon: Star, title: "Calidad Superior", desc: "Marcas seleccionadas" }
            ].map((item, index) => (
              <div 
                key={index}
                className="group flex flex-col items-center text-center p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 hover:bg-white/15 transition-all duration-300 hover:scale-[1.03] shadow-lg"
              >
                {/* 🎨 ICONOS - Cambia w-10 h-10 por w-8 h-8 para más pequeños, w-14 h-14 para más grandes */}
                <item.icon className="w-10 h-10 md:w-12 md:h-12 text-orange-400 mb-4 group-hover:text-orange-300 transition-colors duration-300" />
                {/* 📝 TÍTULO DE BENEFICIO - Personalizable */}
                <h3 className="font-bold text-lg md:text-xl mb-2">{item.title}</h3>
                {/* 📝 DESCRIPCIÓN DE BENEFICIO - Personalizable */}
                <p className="text-gray-300 text-sm md:text-base">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* ========================================
          📦 SECCIÓN PRODUCTOS DESTACADOS
          ======================================== */}
      <div className="container mx-auto px-4 py-16 md:py-20 space-y-16 md:space-y-24">
        
        <section id="featured-products-section" className="space-y-10">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              {/* 🎯 TÍTULO DE SECCIÓN - Personalizable */}
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-2 md:mb-3">
                {/* 📝 CAMBIA EL TEXTO AQUÍ */}
                Productos <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">Destacados</span>
              </h2>
              {/* 📝 SUBTÍTULO - Personalizable */}
              <p className="text-lg md:text-xl text-gray-600">Los favoritos de nuestros clientes.</p>
            </div>
            
            {/* 🔘 BOTÓN "VER TODOS" */}
            <Button variant="outline" asChild className="group border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white font-semibold px-5 py-2.5 transition-all duration-300 hover:scale-105 rounded-xl text-sm md:text-base">
              <Link href="/products?featured=true">
                {/* 📝 TEXTO DEL BOTÓN - Personalizable */}
                Ver Todos
                <ChevronDown className="w-4 h-4 ml-1.5 rotate-[-90deg] group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </Button>
          </div>
          
          {/* 📦 SLIDER DE PRODUCTOS - El componente que muestra los productos */}
          {featuredProducts && featuredProducts.length > 0 ? (
            <div className="bg-gray-50 rounded-2xl md:rounded-3xl p-6 md:p-10 shadow-inner">
              {/* 🎨 AQUÍ SE RENDERIZAN LOS PRODUCTOS DESTACADOS */}
              <FeaturedProductsSlider products={featuredProducts} />
            </div>
          ) : (
            <p className="text-center text-gray-500 py-10">No hay productos destacados en este momento.</p>
          )}
        </section>

        {/* ========================================
            📂 SECCIÓN CATEGORÍAS
            ======================================== */}
        <section className="space-y-10">
          <div className="text-center">
            {/* 🎯 TÍTULO DE CATEGORÍAS - Personalizable */}
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3 md:mb-4">
              {/* 📝 CAMBIA EL TEXTO AQUÍ */}
              Explora por <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">Categoría</span>
            </h2>
            {/* 📝 DESCRIPCIÓN - Personalizable */}
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Encuentra exactamente lo que necesitas en nuestras categorías especializadas.
            </p>
          </div>
          
          {/* 📂 GRID DE CATEGORÍAS */}
          {allCategories && allCategories.length > 0 ? (
            <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-10 shadow-lg border border-gray-100">
              {/* 🎨 AQUÍ SE RENDERIZAN LAS CATEGORÍAS */}
              <CategorySection categories={allCategories} />
            </div>
          ) : (
             <p className="text-center text-gray-500 py-10">No hay categorías disponibles en este momento.</p>
          )}
        </section>

        {/* ========================================
            🏷️ SECCIÓN OFERTAS ESPECIALES
            ======================================== */}
        <section className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
          <div className="relative min-h-[450px] md:min-h-[500px] flex items-center justify-center p-6 md:p-8">
            {/* 🎨 FONDOS SUPERPUESTOS - Personaliza colores */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900" />
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/15 via-red-500/25 to-orange-600/15 pointer-events-none" />
            
            <div className="relative z-10 text-center max-w-3xl mx-auto">
              {/* 🏷️ ETIQUETA DE OFERTA */}
              <div className="mb-5 inline-flex items-center gap-2 px-3 py-1.5 bg-red-500/20 backdrop-blur-sm rounded-full border border-red-500/30">
                <Sparkles className="w-3.5 h-3.5 text-red-400" />
                {/* 📝 TEXTO DE ETIQUETA - Personalizable */}
                <span className="text-xs font-medium text-white">Oferta Exclusiva</span>
              </div>
              
              {/* 🎯 TÍTULO DE OFERTA - Muy personalizable */}
              <h3 className="text-3xl md:text-5xl font-black text-white mb-4 md:mb-5">
                {/* 📝 CAMBIA EL TEXTO DE LA OFERTA */}
                ¡Ofertas <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">Imperdibles!</span>
              </h3>
              
              {/* 💰 DESCRIPCIÓN DE OFERTA - Muy personalizable */}
              <p className="text-lg md:text-xl text-gray-200 mb-8 md:mb-10 leading-relaxed">
                {/* 📝 PORCENTAJE DE DESCUENTO - Cambia el 30% */}
                Hasta <span className="text-orange-400 font-bold text-2xl md:text-3xl">30% DCTO</span> en Hogar Inteligente. 
                <br className="hidden md:block" />
                {/* 📝 MENSAJE ADICIONAL */}
                Transforma tu hogar por menos.
              </p>
              
              {/* 🔘 BOTÓN DE OFERTAS */}
              <Button 
                asChild
                size="lg" 
                className="group bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold px-10 py-5 text-lg md:text-xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 rounded-xl md:rounded-2xl"
              >
                {/* 🔗 ENLACE A OFERTAS - Personaliza la URL */}
<Link href="/products?discount=true">                  <span className="flex items-center gap-2 md:gap-3">
                    {/* 📝 TEXTO DEL BOTÓN - Personalizable */}
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

/* =========================================================================
   🚀 GUÍA RÁPIDA DE PERSONALIZACIÓN - SIN TOCAR OTROS ARCHIVOS
   ========================================================================= */

/* 🎨 COLORES PRINCIPALES:
   - Orange/Red: Cambia #FF4500, #FF8C00, orange-400, red-500, etc.
   - Grises: slate-900, gray-300, etc.
   - Para cambiar colores, busca y reemplaza en todo el archivo

   📏 TAMAÑOS DE TEXTO:
   - Títulos H1: text-5xl md:text-6xl lg:text-7xl
   - Títulos H2: text-3xl md:text-4xl
   - Párrafos: text-lg md:text-xl
   - Botones: text-lg md:text-xl
   
   🔤 TAMAÑOS DE ELEMENTOS:
   - Iconos pequeños: w-4 h-4
   - Iconos medianos: w-5 h-5, w-6 h-6
   - Iconos grandes: w-10 h-10 md:w-12 md:h-12
   - Botones: px-8 py-5 (padding horizontal y vertical)
   
   📱 ESPACIADO Y MÁRGENES:
   - Espacios entre secciones: space-y-16 md:space-y-24
   - Márgenes: mb-6 md:mb-8 (margin-bottom)
   - Padding: p-6 md:p-10
   
   🎯 TEXTOS PERSONALIZABLES:
   1. Nombre de la tienda: "Houzze Tec"
   2. Eslogan: "La innovación tecnológica..."
   3. Títulos de secciones: "Productos Destacados", "Explora por Categoría"
   4. Beneficios: Garantía Premium, Envío Express, Calidad Superior
   5. Ofertas: "30% DCTO", "Ofertas Imperdibles"
   6. Textos de botones: "Explorar Productos", "Ver Destacados", etc.
   
   🔗 ENLACES PERSONALIZABLES:
   - /products (página de productos)
   - /products?featured=true (productos destacados)
   - /products?category=smart-home&on_sale=true (ofertas específicas)
   
   ⚡ ANIMACIONES:
   - animate-bounce (rebote)
   - animate-pulse (pulso)
   - animate-spin (rotación)
   - hover:scale-105 (escala al hover)
   - group-hover: (efectos en grupo)
   
   🎨 EFECTOS VISUALES:
   - backdrop-blur-sm/md (desenfoque de fondo)
   - shadow-lg/xl/2xl/3xl (sombras)
   - rounded-xl/2xl/3xl (bordes redondeados)
   - bg-gradient-to-r/br (gradientes)
*/