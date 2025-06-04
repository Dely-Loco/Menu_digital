// @/components/layout/header.tsx
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { 
  ShoppingCart, Menu, Search, X, ChevronDown, 
  Zap, Smartphone, Headphones, Watch, ShoppingBag 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { useState, useEffect, } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useCart } from '@/context/CartContext';

/*
🎨 GUÍA RÁPIDA DE PERSONALIZACIÓN
=====================================

📝 TEXTOS MODIFICABLES:
- Línea 104: "Houzze Tec" → Cambiar nombre de la tienda
- Línea 107: "TECH INNOVATION STORE" → Cambiar eslogan
- Línea 45: "Buscar productos..." → Cambiar placeholder de búsqueda
- Línea 29: Modificar nombres de categorías en dropdownItems

🎨 COLORES PERSONALIZABLES:
- orange-400, orange-500, orange-600 → Tu color principal
- red-400, red-500, red-600 → Tu color secundario  
- gray-700, gray-500 → Colores de texto

📏 TAMAÑOS AJUSTABLES:
- Línea 96: width={50} height={50} → Tamaño del logo
- Línea 100: text-2xl lg:text-3xl → Tamaño del nombre de la tienda
- Línea 103: text-xs → Tamaño del eslogan
- Línea 228: w-64 lg:w-80 → Ancho de la barra de búsqueda

🔗 ENLACES MODIFICABLES:
- Línea 16-32: navLinks array → Modificar menú de navegación
- Línea 22-28: dropdownItems → Modificar categorías del dropdown

⚡ EFECTOS VISUALES:
- Línea 77: scrollY > 10 → Punto donde cambia el header al hacer scroll
- Línea 121: duration-300 → Velocidad de animaciones
- Línea 142: blur-lg → Intensidad del efecto blur en hover
*/

// 🔧 CONFIGURACIÓN DE NAVEGACIÓN - Define la estructura del menú principal
const navLinks = [
  { href: '/', label: 'Inicio' }, // ✏️ MODIFICABLE: Cambiar "Inicio" por tu texto
  { 
    href: '/products', 
    label: 'Productos', // ✏️ MODIFICABLE: Cambiar "Productos" por tu texto
    hasDropdown: true,
    dropdownItems: [
      // 🏷️ CATEGORÍAS MODIFICABLES - Cambiar href, label e iconos según tus productos // ✏️ MODIFICABLE
     { href: '/products?category=celulares', label: 'Celulares', icon: Smartphone },
        { href: '/products?category=relojes', label: 'Relojes', icon: Watch },
        { href: '/products?category=audio', label: 'Audio', icon: Headphones },
        { href: '/products?category=powerbanck', label: 'Power Bank', icon: Zap },
        { href: '/products?category=accesorios', label: 'Accesorios', icon: ShoppingBag }, 
    ]
  },
  { href: '/blog', label: 'Blog' }, // ✏️ MODIFICABLE: Cambiar "Blog" por tu sección
  { href: '/contact', label: 'Contáctanos' }, // ✏️ MODIFICABLE: Cambiar texto de contacto
];

export default function Header() {
  // 🔄 ESTADOS LOCALES - Controlan el comportamiento interactivo del header
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // 📱 Controla apertura/cierre del menú móvil
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null); // 📋 Controla qué dropdown está activo
  const [isScrolled, setIsScrolled] = useState(false); // 📊 Detecta scroll para cambiar estilos del header
  const [searchQuery, setSearchQuery] = useState(''); // 🔍 Almacena el texto de búsqueda
  
  const pathname = usePathname(); // 🧭 Obtiene la ruta actual para resaltar enlaces activos
  const router = useRouter(); // 🔄 Para navegación programática
  const { itemCount } = useCart(); // 🛒 Obtiene cantidad de items en el carrito

  // 📜 EFECTO DE SCROLL - Cambia apariencia del header al hacer scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10); // 🎛️ MODIFICABLE: Cambiar "10" para ajustar sensibilidad del scroll
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 🖱️ MANEJADORES DE DROPDOWN - Controlan menús desplegables en desktop
  const handleMouseEnter = (label: string) => setActiveDropdown(label); // Abre dropdown al pasar mouse
  const handleMouseLeave = () => setTimeout(() => setActiveDropdown(null), 150); // 🎛️ MODIFICABLE: Delay en ms antes de cerrar
  const handleDropdownMouseEnter = () => { if (activeDropdown) setActiveDropdown(activeDropdown); }; // Mantiene abierto si mouse está sobre dropdown
  const handleDropdownToggle = (label: string) => setActiveDropdown(activeDropdown === label ? null : label); // Toggle para móvil

  // 🔍 MANEJADOR DE BÚSQUEDA - Procesa búsquedas y navega a productos
  const handleSearchSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`); // 🔗 Navega a productos con query de búsqueda
      setIsMobileMenuOpen(false); // Cierra menú móvil si está abierto
      setSearchQuery(''); // Limpia campo de búsqueda
    }
  };

  return (
    <>
      {/* 📌 HEADER PRINCIPAL - Contenedor sticky que se mantiene fijo en la parte superior */}
      <header className={cn(
        "sticky top-0 z-50 transition-all duration-500 ease-in-out", // ⚡ MODIFICABLE: duration-500 controla velocidad de transición
        // 🎨 ESTILOS DINÁMICOS SEGÚN SCROLL - Cambian cuando el usuario hace scroll
        isScrolled 
          ? "bg-white/95 backdrop-blur-lg border-b border-orange-100 shadow-xl shadow-orange-500/10" // 🎨 MODIFICABLE: Estilos con scroll activo
          : "bg-white border-b border-gray-200 shadow-lg" // 🎨 MODIFICABLE: Estilos estado inicial
      )}>
        <div className="container mx-auto px-4 py-3"> {/* 📏 MODIFICABLE: px-4 py-3 controlan el espaciado interno */}
          <div className="flex items-center justify-between">
            
            {/* 🏢 LOGO Y MARCA - Sección principal de identidad de la tienda */}
            <Link href="/" className="flex items-center group">
              <div className="relative">
                {/* ✨ EFECTO GLOW EN LOGO - Brillo animado que aparece al hacer hover */}
                <div className={cn(
                  "absolute inset-0 rounded-xl transition-all duration-300",
                  "bg-gradient-to-br from-orange-400 to-red-500 opacity-0 group-hover:opacity-20 blur-lg" // 🎨 MODIFICABLE: Colores del efecto glow
                )} />
                <Image
                  src="/Logo.png" // 🖼️ MODIFICABLE: Cambiar por la ruta de tu logo
                  alt="Logo Houzze Tec" // ✏️ MODIFICABLE: Cambiar descripción del logo
                  width={50} // 📏 MODIFICABLE: Ancho del logo en píxeles
                  height={50} // 📏 MODIFICABLE: Alto del logo en píxeles
                  className="relative rounded-xl transition-transform duration-300 group-hover:scale-110" // ⚡ MODIFICABLE: scale-110 controla zoom en hover
                />
              </div>
              <div className="ml-3 flex flex-col"> {/* 📏 MODIFICABLE: ml-3 espaciado entre logo y texto */}
                <span className="text-2xl lg:text-3xl font-bold text-gradient-houzze transition-all duration-300 group-hover:scale-105">
                  {/* 📏 MODIFICABLE: text-2xl lg:text-3xl controlan tamaño del nombre en móvil y desktop */}
                  Houzze Tec {/* ✏️ MODIFICABLE: Cambiar por el nombre de tu tienda */}
                </span>
                <span className="text-xs text-gray-500 font-medium tracking-wider"> {/* 📏 MODIFICABLE: text-xs controla tamaño del eslogan */}
                  TECH INNOVATION STORE {/* ✏️ MODIFICABLE: Cambiar por tu eslogan o descripción */}
                </span>
              </div>
            </Link>

            {/* 🧭 NAVEGACIÓN DESKTOP - Menú principal visible solo en pantallas grandes */}
            <nav className="hidden lg:flex items-center space-x-8"> {/* 📏 MODIFICABLE: space-x-8 espaciado entre elementos del menú */}
              {navLinks.map((link) => (
                <div key={link.label} className="relative group">
                  {link.hasDropdown ? (
                    // 📋 MENÚ DROPDOWN - Desplegable para categorías de productos
                    <div 
                      onMouseEnter={() => handleMouseEnter(link.label)}
                      onMouseLeave={handleMouseLeave}
                      className="relative"
                    >
                      <button
                        className={cn(
                          "flex items-center space-x-1 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300", // 📏 MODIFICABLE: px-4 py-3 padding, text-sm tamaño de fuente
                          "hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 hover:text-orange-600", // 🎨 MODIFICABLE: Colores del efecto hover
                          // 🎯 LÓGICA DE ESTADO ACTIVO - Resalta el enlace actual
                          (pathname.startsWith(link.href) || (pathname === "/products" && link.href === "/products")) && link.label === "Productos" ? "text-orange-600 bg-orange-50" : 
                          pathname === link.href && link.label !== "Productos" ? "text-orange-600 bg-orange-50" : "text-gray-700", // 🎨 MODIFICABLE: Colores de estado activo
                          activeDropdown === link.label ? "text-orange-600 bg-orange-50" : ""
                        )}
                      >
                        <span>{link.label}</span>
                        <ChevronDown className={cn("h-4 w-4 transition-transform duration-300", activeDropdown === link.label ? "rotate-180 text-orange-600" : "")} />
                      </button>
                      
                      {/* 🎨 PANEL DROPDOWN - Contenido del menú desplegable con animaciones */}
                      <div className={cn(
                        "absolute top-full left-1/2 -translate-x-1/2 mt-1 w-80 transition-all duration-300 transform z-50", // 📏 MODIFICABLE: w-80 ancho del panel desplegable
                        activeDropdown === link.label ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2 pointer-events-none"
                      )}
                        onMouseEnter={handleDropdownMouseEnter}
                        onMouseLeave={handleMouseLeave}
                      >
                        <div className="absolute -top-1 left-0 right-0 h-1 bg-transparent" /> {/* Área invisible para evitar parpadeo */}
                        <div className="bg-white rounded-2xl shadow-2xl border border-orange-100 p-6 glass backdrop-blur-sm"> {/* 📏 MODIFICABLE: p-6 padding interno del panel */}
                          <div className="mb-4 pb-3 border-b border-orange-100"> {/* 📏 MODIFICABLE: mb-4 pb-3 espaciado del encabezado */}
                            <h3 className="text-sm font-semibold text-gray-800 flex items-center gap-2"> {/* 📏 MODIFICABLE: text-sm tamaño del título */}
                              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-orange-400 to-red-500"></div> {/* 🎨 MODIFICABLE: Colores del indicador */}
                              Categorías de Productos {/* ✏️ MODIFICABLE: Título del menú desplegable */}
                            </h3>
                          </div>
                          <div className="grid gap-2"> {/* 📏 MODIFICABLE: gap-2 espaciado entre categorías */}
                            {/* 🏷️ ITEMS DE CATEGORÍA - Enlaces a productos específicos con animaciones */}
                            {link.dropdownItems?.map((item, index) => (
                              <Link
                                key={item.href}
                                href={item.href}
                                className={cn("flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 group/item", "hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 hover:scale-[1.02]", "animate-in slide-in-from-top-2 fade-in-0")} // 📏 MODIFICABLE: p-3 padding, hover:scale-[1.02] efecto de zoom
                                style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'both' }} // ⚡ MODIFICABLE: 50ms velocidad de animación escalonada
                                onClick={() => setActiveDropdown(null)}
                              >
                                <div className="p-2 rounded-lg bg-gradient-to-br from-orange-400 to-red-500 text-white group-hover/item:scale-110 group-hover/item:rotate-3 transition-all duration-300 shadow-sm"> {/* 🎨 MODIFICABLE: Colores del contenedor del icono */}
                                  <item.icon className="h-4 w-4" /> {/* 📏 MODIFICABLE: h-4 w-4 tamaño del icono de categoría */}
                                </div>
                                <div className="flex-1">
                                  <span className="font-medium text-gray-700 group-hover/item:text-orange-600 transition-colors duration-300 block">{item.label}</span> {/* 🎨 MODIFICABLE: Colores del texto principal */}
                                  <span className="text-xs text-gray-500 group-hover/item:text-orange-500 transition-colors duration-300">Explorar {item.label.toLowerCase()}</span> {/* 📏 MODIFICABLE: text-xs tamaño del subtexto */}
                                </div>
                                <div className="opacity-0 group-hover/item:opacity-100 transition-opacity duration-300">
                                  <ChevronDown className="h-4 w-4 -rotate-90 text-orange-500" />
                                </div>
                              </Link>
                            ))}
                          </div>
                          {/* 🔗 ENLACE A TODOS LOS PRODUCTOS */}
                          <div className="mt-4 pt-3 border-t border-orange-100"> {/* 📏 MODIFICABLE: mt-4 pt-3 espaciado superior */}
                            <Link 
                              href="/products"
                              className="flex items-center justify-center gap-2 text-sm text-orange-600 hover:text-orange-700 font-medium transition-colors duration-300" // 📏 MODIFICABLE: text-sm tamaño del enlace
                              onClick={() => setActiveDropdown(null)}
                            >
                              Ver Todos los Productos {/* ✏️ MODIFICABLE: Texto del enlace general */}
                              <ChevronDown className="h-3 w-3 -rotate-90" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    // 🔗 ENLACES SIMPLES - Para páginas sin menú desplegable
                    <Link
                      href={link.href}
                      className={cn("px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 relative overflow-hidden", "hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 hover:text-orange-600", pathname === link.href ? "text-orange-600 bg-orange-50" : "text-gray-700")} // 📏 MODIFICABLE: px-4 py-3 padding, text-sm tamaño
                    >
                      <span className="relative z-10">{link.label}</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-500 opacity-0 hover:opacity-10 transition-opacity duration-300" /> {/* 🎨 MODIFICABLE: Colores del efecto hover de fondo */}
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            {/* 🔍 BARRA DE BÚSQUEDA DESKTOP - Solo visible en pantallas medianas y grandes */}
            <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-500 rounded-full opacity-0 group-hover:opacity-20 blur transition-all duration-300 pointer-events-none" /> {/* 🎨 MODIFICABLE: Colores del efecto glow en búsqueda */}
              <div className="relative flex items-center">
                <Input 
                  type="search" 
                  placeholder="Buscar productos..." // ✏️ MODIFICABLE: Texto del placeholder de búsqueda
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-11 w-64 lg:w-80 pl-4 pr-12 rounded-full border-2 border-gray-200 focus:border-orange-400 transition-all duration-300 bg-white/90 backdrop-blur-sm" // 📏 MODIFICABLE: h-11 altura, w-64 lg:w-80 anchos responsive, pl-4 pr-12 padding interno
                />
                <Button 
                  type="submit"
                  variant="ghost" 
                  size="icon" 
                  className="absolute right-1 h-9 w-9 rounded-full hover:bg-gradient-to-r hover:from-orange-400 hover:to-red-500 hover:text-white transition-all duration-300" // 📏 MODIFICABLE: h-9 w-9 tamaño del botón de búsqueda
                  aria-label="Buscar"
                >
                  <Search className="h-4 w-4" /> {/* 📏 MODIFICABLE: h-4 w-4 tamaño del icono de búsqueda */}
                </Button>
              </div>
            </form>

            {/* ⚡ ACCIONES DEL HEADER - Carrito de compras y menú móvil */}
            <div className="flex items-center space-x-2"> {/* 📏 MODIFICABLE: space-x-2 espaciado entre botones de acción */}
              {/* 🛒 ENLACE AL CARRITO - Con contador dinámico de productos */}
              <Link href="/cart" className="relative group">
                <Button variant="ghost" size="icon" className="h-11 w-11 hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 hover:text-orange-600 transition-all duration-300"> {/* 📏 MODIFICABLE: h-11 w-11 tamaño del botón del carrito */}
                  <ShoppingCart className="h-5 w-5" /> {/* 📏 MODIFICABLE: h-5 w-5 tamaño del icono del carrito */}
                  {/* 🔢 BADGE DEL CARRITO - Contador de productos con animación */}
                  {typeof window !== 'undefined' && itemCount > 0 && (
                    <span className="absolute -top-1 -right-1 h-5 w-5 bg-gradient-to-r from-orange-400 to-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold animate-bounce-gentle"> {/* 📏 MODIFICABLE: h-5 w-5 tamaño del badge, text-xs tamaño del número */}
                      {itemCount}
                    </span>
                  )}
                </Button>
              </Link>
              
              {/* 📱 MENÚ MÓVIL - Solo visible en pantallas pequeñas (hamburger menu) */}
              <div className="lg:hidden">
                <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-11 w-11 hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 hover:text-orange-600 transition-all duration-300">
                      <Menu className="h-6 w-6" /> {/* 📏 MODIFICABLE: h-6 w-6 tamaño del icono del menú hamburger */}
                    </Button>
                  </SheetTrigger>
                  {/* 📋 CONTENIDO DEL MENÚ MÓVIL - Panel lateral deslizante */}
                  <SheetContent side="right" className="w-[320px] p-0 glass"> {/* 📏 MODIFICABLE: w-[320px] ancho del menú móvil */}
                    <div className="flex flex-col h-full bg-gradient-to-br from-white via-orange-50/30 to-red-50/30"> {/* 🎨 MODIFICABLE: Colores de fondo del menú móvil */}
                      {/* 🏢 HEADER DEL MENÚ MÓVIL - Logo y botón de cerrar */}
                      <div className="flex justify-between items-center p-6 border-b border-orange-100"> {/* 📏 MODIFICABLE: p-6 padding del header móvil */}
                        <Link 
                          href="/" 
                          className="flex items-center gap-3 text-2xl font-bold text-gradient-houzze group" // 📏 MODIFICABLE: text-2xl tamaño del logo móvil, gap-3 espaciado
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <Image src="/Logo.png" alt="Logo Houzze Tec" width={32} height={32} className="rounded-lg group-hover:scale-110 transition-transform duration-300" /> {/* 📏 MODIFICABLE: width={32} height={32} tamaño del logo en menú móvil */}
                          Houzze Tec {/* ✏️ MODIFICABLE: Nombre en menú móvil */}
                        </Link>
                        <SheetClose asChild>
                          <Button variant="ghost" size="icon" className="hover:bg-red-100 hover:text-red-600 transition-colors duration-300">
                            <X className="h-5 w-5" />
                          </Button>
                        </SheetClose>
                      </div>
                      
                      {/* 🧭 NAVEGACIÓN MÓVIL - Lista de enlaces del menú */}
                      <nav className="flex flex-col space-y-2 p-6 flex-1"> {/* 📏 MODIFICABLE: space-y-2 espaciado entre elementos, p-6 padding general */}
                        {navLinks.map((link) => (
                          <div key={link.label}>
                            {link.hasDropdown ? (
                              <div>
                                <button
                                  onClick={() => handleDropdownToggle(link.label)}
                                  className="flex items-center justify-between w-full px-4 py-3 rounded-xl text-left font-medium hover:bg-gradient-to-r hover:from-orange-100 hover:to-red-100 transition-all duration-300" // 📏 MODIFICABLE: px-4 py-3 padding de botones móviles
                                >
                                  <span>{link.label}</span>
                                  <ChevronDown className={cn("h-4 w-4 transition-transform duration-300", activeDropdown === link.label ? "rotate-180" : "")} />
                                </button>
                                {/* 📂 SUBMENU MÓVIL - Categorías expandibles */}
                                <div className={cn("overflow-hidden transition-all duration-300", activeDropdown === link.label ? "max-h-64 opacity-100" : "max-h-0 opacity-0")}> {/* 📏 MODIFICABLE: max-h-64 altura máxima del submenu */}
                                  <div className="pl-4 pt-2 space-y-1"> {/* 📏 MODIFICABLE: pl-4 pt-2 padding del submenu, space-y-1 espaciado */}
                                    {link.dropdownItems?.map((item) => (
                                      <SheetClose asChild key={item.href}>
                                        <Link href={item.href} className="flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-white/80 transition-all duration-300"> {/* 📏 MODIFICABLE: space-x-3 px-4 py-2 espaciado y padding de subelementos */}
                                          <item.icon className="h-4 w-4 text-orange-500" />
                                          <span className="text-sm">{item.label}</span> {/* 📏 MODIFICABLE: text-sm tamaño del texto de categorías */}
                                        </Link>
                                      </SheetClose>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <SheetClose asChild>
                                <Link href={link.href} className={cn("block px-4 py-3 rounded-xl text-base font-medium transition-all duration-300", "hover:bg-gradient-to-r hover:from-orange-100 hover:to-red-100", pathname === link.href ? "bg-gradient-to-r from-orange-100 to-red-100 text-orange-600" : "text-gray-700")}> {/* 📏 MODIFICABLE: px-4 py-3 padding, text-base tamaño de enlaces móviles */}
                                  {link.label}
                                </Link>
                              </SheetClose>
                            )}
                          </div>
                        ))}
                      </nav>
                      
                      {/* 🔍 BÚSQUEDA MÓVIL - Campo de búsqueda en el pie del menú */}
                      <form onSubmit={handleSearchSubmit} className="p-6 border-t border-orange-100"> {/* 📏 MODIFICABLE: p-6 padding de la sección de búsqueda móvil */}
                        <div className="relative">
                          <Input 
                            type="search" 
                            placeholder="Buscar productos..." // ✏️ MODIFICABLE: Placeholder de búsqueda móvil
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pr-10 rounded-xl border-orange-200 focus:border-orange-400" // 📏 MODIFICABLE: pr-10 padding derecho para el icono
                          />
                          <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2" aria-label="Buscar productos">
                            <Search className="h-4 w-4 text-gray-400" />
                          </button>
                        </div>
                      </form>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      {/* 🌫️ OVERLAY DEL DROPDOWN - Fondo semitransparente cuando está activo el menú desplegable */}
      {activeDropdown && (
        <div 
          className="fixed inset-0 z-40 bg-black/5 backdrop-blur-sm transition-opacity duration-300" // 🎨 MODIFICABLE: bg-black/5 opacidad del overlay de fondo
          onClick={() => setActiveDropdown(null)}
        />
      )}
    </>
  );
}