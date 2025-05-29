'use client'; // Este componente se renderiza en el cliente (necesario para usar hooks como useState y useEffect)

import FeaturedProductsSlider from '@/components/home/featured-products-slider';
import CategorySection from '@/components/home/category-section';
import { getFeaturedProducts, categories as allCategories } from '@/data/mock-data';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { ChevronDown, Sparkles, Zap, Shield, Star } from 'lucide-react'; // Íconos SVG

export default function HomePage() {
  // Obtener productos destacados desde datos simulados (mock)
  const featuredProducts = getFeaturedProducts();
  
  // Estado para controlar la posición vertical del scroll
  const [scrollY, setScrollY] = useState(0);
  
  // Estado para mostrar animaciones al montar el componente
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Escuchar el scroll para actualizar scrollY (para parallax)
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    
    // Activar visibilidad (por ejemplo, animaciones) después de 100ms
    setTimeout(() => setIsVisible(true), 100);
    
    // Limpiar el event listener cuando el componente se desmonta
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative">
      {/* === SECCIÓN HERO A PANTALLA COMPLETA === */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden -mx-4 md:-mx-6 lg:-mx-8">
        
        {/* Fondo con efecto parallax (se mueve más lento que el scroll) */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-black"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`, // Parallax: el fondo se mueve a la mitad del scroll
          }}
        />

        {/* SVG animado: patrón geométrico con círculos y líneas */}
        <div className="absolute inset-0 opacity-20">
          <svg className="absolute inset-0 w-full h-full animate-pulse" viewBox="0 0 1200 800" fill="none">
            
            {/* === Gradientes radiales para efectos de brillo en los círculos === */}
            <defs>
              <radialGradient id="glow1" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FF4500" stopOpacity="0.6" />
                <stop offset="70%" stopColor="#FF8C00" stopOpacity="0.3" />
                <stop offset="100%" stopColor="transparent" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="glow2" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FF8C00" stopOpacity="0.5" />
                <stop offset="70%" stopColor="#FF4500" stopOpacity="0.2" />
                <stop offset="100%" stopColor="transparent" stopOpacity="0" />
              </radialGradient>
            </defs>
            
            {/* === Círculos animados (efecto de rebote y brillo) === */}
            <circle cx="200" cy="150" r="100" fill="url(#glow1)" className="animate-bounce" style={{ animationDelay: '0s', animationDuration: '4s' }} />
            <circle cx="800" cy="250" r="80" fill="url(#glow2)" className="animate-bounce" style={{ animationDelay: '1s', animationDuration: '3s' }} />
            <circle cx="400" cy="400" r="60" fill="url(#glow1)" className="animate-bounce" style={{ animationDelay: '2s', animationDuration: '5s' }} />
            <circle cx="1000" cy="500" r="120" fill="url(#glow2)" className="animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '3.5s' }} />
            
            {/* === Líneas conectoras animadas entre los círculos === */}
            <path d="M200 150L400 400L800 250L1000 500" stroke="url(#gradient1)" strokeWidth="2" fill="none" className="animate-pulse" />
            <path d="M0 600L300 400L600 650L900 450L1200 700" stroke="url(#gradient2)" strokeWidth="1" fill="none" className="animate-pulse" />
            
            {/* === Gradientes lineales para las líneas === */}
            <defs>
              <linearGradient id="gradient1">
                <stop offset="0%" stopColor="#FF4500" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#FF8C00" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#FF4500" stopOpacity="0.3" />
              </linearGradient>
              <linearGradient id="gradient2">
                <stop offset="0%" stopColor="#FF8C00" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#FF4500" stopOpacity="0.4" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        
        {/* === Partículas animadas flotantes === */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-orange-400 rounded-full animate-ping"
              style={{
                left: `${Math.random() * 100}%`,  // Posición horizontal aleatoria
                top: `${Math.random() * 100}%`,   // Posición vertical aleatoria
                animationDelay: `${Math.random() * 4}s`, // Retardo aleatorio
                animationDuration: `${2 + Math.random() * 3}s`, // Duración aleatoria
              }}
            />
          ))}
        </div>

        {/* Aquí iría el contenido del hero: texto, botón o llamada a la acción */}

       {/* Contenido principal del hero con animaciones de entrada */}
<div className="relative z-10 text-center text-white px-4 max-w-6xl mx-auto">
  <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
    
    {/* Badge que muestra una característica destacada (ej: tecnología) */}
    <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
      <Sparkles className="w-4 h-4 text-orange-400" />
      <span className="text-sm font-medium">Tecnología de Vanguardia</span>
    </div>
    
    {/* Título principal con efecto de gradiente animado y sombra de brillo */}
    <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-8 leading-tight">
      Bienvenido a{' '}
      <span className="relative">
        {/* Texto con gradiente animado (resalta el nombre de la marca) */}
        <span className="bg-gradient-to-r from-orange-400 via-red-500 to-orange-600 bg-clip-text text-transparent animate-pulse">
          Houzze Tec
        </span>
        {/* Brillo difuminado detrás del texto para dar un efecto brillante */}
        <div className="absolute -inset-2 bg-gradient-to-r from-orange-400 to-red-500 rounded-lg blur opacity-30 animate-pulse" />
      </span>
    </h1>
    
    {/* Subtítulo descriptivo con énfasis en palabras clave */}
    <p className="text-xl md:text-2xl lg:text-3xl text-gray-300 mb-12 leading-relaxed max-w-4xl mx-auto font-light">
      La <span className="text-orange-400 font-semibold">vanguardia en tecnología</span> para tu hogar, oficina y estilo de vida digital.
    </p>
    
    {/* Botones de acción principal (call to action) */}
    <div className="flex flex-col sm:flex-row justify-center gap-6 mb-16">
      
      {/* Botón principal que redirige a la tienda de productos */}
      <Button 
        asChild 
        size="lg" 
        className="group relative bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-bold px-10 py-6 text-xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 rounded-2xl overflow-hidden"
      >
        <Link href="/products">
          <span className="relative z-10 flex items-center gap-3">
            Explorar Productos
            <Zap className="w-5 h-5 group-hover:animate-bounce" /> {/* Ícono con animación al hacer hover */}
          </span>
          {/* Efecto de brillo que aparece al hacer hover sobre el botón */}
          <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
        </Link>
      </Button>
      
      {/* Botón secundario que navega a la sección de productos destacados */}
      <Button 
        asChild 
        size="lg" 
        variant="outline" 
        className="group border-2 border-gray-300 text-white hover:bg-white hover:text-slate-900 font-semibold px-10 py-6 text-xl transition-all duration-300 hover:scale-105 rounded-2xl backdrop-blur-sm bg-white/5"
      >
        <Link href="#featured">
          <span className="flex items-center gap-3">
            Ver Destacados
            <Star className="w-5 h-5 group-hover:animate-spin" /> {/* Ícono giratorio al hacer hover */}
          </span>
        </Link>
      </Button>
    </div>
    
    {/* Beneficios/ventajas del producto o servicio (animaciones escalonadas) */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
      {[
        { icon: Shield, title: "Garantía Premium", desc: "2 años de protección completa" },
        { icon: Zap, title: "Envío Express", desc: "24-48h en toda la ciudad" },
        { icon: Star, title: "Calidad Superior", desc: "Solo las mejores marcas" }
      ].map((item, index) => (
        <div 
          key={index}
          className={`transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
          style={{ transitionDelay: `${index * 200}ms` }} // Cada ítem se anima con 200ms de diferencia
        >
          {/* Tarjeta de beneficio con hover animado */}
          <div className="group flex flex-col items-center text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105">
            <item.icon className="w-8 h-8 text-orange-400 mb-3 group-hover:animate-pulse" /> {/* Ícono con animación de pulso */}
            <h3 className="font-bold text-lg mb-2">{item.title}</h3>
            <p className="text-gray-300 text-sm">{item.desc}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>

{/* Indicador visual animado para incitar a hacer scroll hacia abajo */}
<div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
  <ChevronDown className="w-8 h-8 text-white/60" />
</div>
</section>

      
      {/* === CONTENIDO PRINCIPAL CON ESPACIADO ESTANDARIZADO === */}
      <div className="space-y-20 md:space-y-32 py-20">
        
        {/* === SECCIÓN DE PRODUCTOS DESTACADOS === */}
        <section id="featured" className="space-y-12">
          {/* Header de la sección con título y botón "Ver Todos" */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
                Productos{' '}
                <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                  Destacados
                </span>
              </h2>
              <p className="text-xl text-gray-600">Los favoritos de nuestros clientes</p>
            </div>
            <Button 
              variant="outline" 
              asChild 
              className="group border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white font-semibold px-6 py-3 transition-all duration-300 hover:scale-105 rounded-xl"
            >
              <Link href="/products?filter=featured">
                Ver Todos
                <ChevronDown className="w-4 h-4 ml-2 rotate-[-90deg] group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
          
          {/* === CONTENEDOR DE PRODUCTOS CON MÁRGENES ESTANDARIZADOS === */}
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="bg-gray-50 rounded-3xl p-8 md:p-12 shadow-inner">
              <FeaturedProductsSlider products={featuredProducts} />
            </div>
          </div>
        </section>

        {/* === SECCIÓN DE CATEGORÍAS === */}
        <section className="space-y-12">
          {/* Header centrado de la sección */}
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
              Explora por{' '}
              <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                Categoría
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Encuentra exactamente lo que necesitas en nuestras categorías especializadas
            </p>
          </div>
          
          {/* === CONTENEDOR DE CATEGORÍAS CON MÁRGENES ESTANDARIZADOS === */}
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg border border-gray-100">
              <CategorySection categories={allCategories} />
            </div>
          </div>
        </section>

        {/* === SECCIÓN CALL TO ACTION - OFERTAS === */}
        <section className="relative rounded-3xl overflow-hidden shadow-2xl mx-4 md:mx-6 lg:mx-8">
          <div className="relative min-h-[500px] flex items-center justify-center">
            
            {/* Fondo con gradientes múltiples para profundidad */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900" />
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-red-500/30 to-orange-600/20" />
            
            {/* Patrón de fondo con círculos radiales */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,69,0,0.3),transparent_50%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(255,140,0,0.3),transparent_50%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,69,0,0.3),transparent_50%)]" />
            </div>
            
            {/* Contenido del CTA */}
            <div className="relative z-10 text-center p-8 max-w-4xl mx-auto">
              {/* Badge de oferta limitada */}
              <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 bg-red-500/20 backdrop-blur-sm rounded-full border border-red-500/30">
                <Sparkles className="w-4 h-4 text-red-400" />
                <span className="text-sm font-medium text-white">Oferta Limitada</span>
              </div>
              
              {/* Título principal del CTA */}
              <h3 className="text-4xl md:text-6xl font-black text-white mb-6">
                ¡Ofertas{' '}
                <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                  Imperdibles!
                </span>
              </h3>
              
              {/* Descripción de la oferta */}
              <p className="text-xl md:text-2xl text-gray-200 mb-10 leading-relaxed max-w-3xl mx-auto">
                Hasta <span className="text-orange-400 font-bold text-3xl">30% OFF</span> en dispositivos Smart Home selectos. 
                <br className="hidden md:block" />
                Transforma tu hogar por menos.
              </p>
              
              {/* Botón de acción del CTA */}
              <Button 
                asChild
                size="lg" 
                className="group bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold px-12 py-6 text-xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 rounded-2xl"
              >
                <Link href="/products?category=smart-home&sale=true">
                  <span className="flex items-center gap-3">
                    Ver Ofertas Smart Home
                    <Zap className="w-6 h-6 group-hover:animate-bounce" />
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