// @/components/layout/header.tsx
"use client"; // Directiva de Next.js 13+ para indicar que es un Client Component

// Importaciones necesarias para el componente
import Link from 'next/link'; // Componente de Next.js para navegación optimizada
import Image from 'next/image'; // Componente de Next.js para imágenes optimizadas
import { 
  ShoppingCart, User, Menu, Search, X, ChevronDown, 
  Zap, Smartphone, Headphones, Watch, Monitor 
} from 'lucide-react'; // Iconos de la librería Lucide React
import { Button } from '@/components/ui/button'; // Componente de botón personalizado
import { Input } from '@/components/ui/input'; // Componente de input personalizado
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet'; // Componentes para el menú móvil (Sheet/Drawer)
import { useState, useEffect } from 'react'; // Hooks de React para estado y efectos
import { usePathname } from 'next/navigation'; // Hook de Next.js para obtener la ruta actual
import { cn } from '@/lib/utils'; // Utilidad para combinar clases CSS condicionalmente

/**
 * CONFIGURACIÓN DE NAVEGACIÓN
 * Define la estructura del menú principal con dropdowns y categorías
 */
const navLinks = [
  { href: '/', label: 'Home' }, // Enlace simple a la página principal
  { 
    href: '/products', 
    label: 'Products',
    hasDropdown: true, // Indica que este enlace tiene un menú desplegable
    dropdownItems: [ // Elementos del menú desplegable con iconos
      { href: '/products/electronics', label: 'Electronics', icon: Smartphone },
      { href: '/products/smart-home', label: 'Smart Home', icon: Zap },
      { href: '/products/audio', label: 'Audio', icon: Headphones },
      { href: '/products/wearables', label: 'Wearables', icon: Watch },
      { href: '/products/displays', label: 'Displays', icon: Monitor },
    ]
  },
  { href: '/blog', label: 'Blog' },
  { href: '/support', label: 'Support' },
];

/**
 * COMPONENTE PRINCIPAL DEL HEADER
 * Header responsive con navegación, búsqueda y carrito de compras
 */
export default function Header() {
  // ESTADOS DEL COMPONENTE
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Estado del menú móvil
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null); // Dropdown actualmente abierto
  const [isScrolled, setIsScrolled] = useState(false); // Si el usuario ha hecho scroll
  const [searchQuery, setSearchQuery] = useState(''); // Término de búsqueda actual
  const pathname = usePathname(); // Ruta actual para resaltar enlaces activos

  /**
   * EFECTO PARA DETECTAR SCROLL
   * Cambia el estilo del header cuando el usuario hace scroll
   */
  useEffect(() => {
    const handleScroll = () => {
      // Cambia el estado cuando el scroll supera los 10px
      setIsScrolled(window.scrollY > 10);
    };
    
    // Agregar y limpiar el event listener
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /**
   * MANEJO DE DROPDOWNS - VERSIÓN MEJORADA
   * Funciones para controlar la apertura/cierre de menús desplegables
   */
  
  // Abre el dropdown al pasar el mouse (con mejor UX)
  const handleMouseEnter = (label: string) => {
    setActiveDropdown(label);
  };

  // Cierra el dropdown con un pequeño delay para evitar cierres accidentales
  const handleMouseLeave = () => {
    setTimeout(() => {
      setActiveDropdown(null);
    }, 150); // Delay de 150ms para mejor experiencia de usuario
  };

  // Mantiene el dropdown abierto cuando el cursor está sobre él
  const handleDropdownMouseEnter = () => {
    if (activeDropdown) {
      setActiveDropdown(activeDropdown); // Reafirma que debe mantenerse abierto
    }
  };

  // Toggle para dispositivos móviles (toque/click)
  const handleDropdownToggle = (label: string) => {
    setActiveDropdown(activeDropdown === label ? null : label);
  };

  return (
    <>
      {/* HEADER PRINCIPAL CON SCROLL EFFECT */}
      <header className={cn(
        "sticky top-0 z-50 transition-all duration-500 ease-in-out", // Posición fija con transiciones suaves
        // Estilos condicionales basados en el scroll
        isScrolled 
          ? "bg-white/95 backdrop-blur-lg border-b border-orange-100 shadow-xl shadow-orange-500/10" // Estilo al hacer scroll
          : "bg-white border-b border-gray-200 shadow-lg" // Estilo inicial
      )}>
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            
            {/* SECCIÓN DEL LOGO Y MARCA */}
            <Link href="/" className="flex items-center group">
              <div className="relative">
                {/* Efecto de glow al hacer hover */}
                <div className={cn(
                  "absolute inset-0 rounded-xl transition-all duration-300",
                  "bg-gradient-to-br from-orange-400 to-red-500 opacity-0 group-hover:opacity-20 blur-lg"
                )} />
                {/* Logo optimizado con Next.js Image */}
                <Image
                  src="/Logo.png"
                  alt="Houzze Tec Logo"
                  width={50}
                  height={50}
                  className="relative rounded-xl transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              {/* Texto de la marca con efectos */}
              <div className="ml-3 flex flex-col">
                <span className="text-2xl lg:text-3xl font-bold text-gradient-houzze transition-all duration-300 group-hover:scale-105">
                  Houzze Tec
                </span>
                <span className="text-xs text-gray-500 font-medium tracking-wider">
                  TECH INNOVATION
                </span>
              </div>
            </Link>

            {/* NAVEGACIÓN DESKTOP CON MEGA MENÚ AVANZADO */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => (
                <div key={link.href} className="relative group">
                  {link.hasDropdown ? (
                    // ELEMENTO CON DROPDOWN
                    <div 
                      // Eventos de mouse optimizados para mejor UX
                      onMouseEnter={() => handleMouseEnter(link.label)}
                      onMouseLeave={handleMouseLeave}
                      className="relative"
                    >
                      {/* BOTÓN DEL DROPDOWN */}
                      <button
                        className={cn(
                          "flex items-center space-x-1 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300",
                          "hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 hover:text-orange-600",
                          // Resalta si la ruta actual coincide
                          pathname.startsWith(link.href) ? "text-orange-600 bg-orange-50" : "text-gray-700",
                          // Estilo especial cuando el dropdown está activo
                          activeDropdown === link.label ? "text-orange-600 bg-orange-50" : ""
                        )}
                      >
                        <span>{link.label}</span>
                        {/* Icono de chevron que rota cuando está activo */}
                        <ChevronDown className={cn(
                          "h-4 w-4 transition-transform duration-300",
                          activeDropdown === link.label ? "rotate-180 text-orange-600" : ""
                        )} />
                      </button>

                      {/* MEGA DROPDOWN MEJORADO */}
                      <div className={cn(
                        // Posicionamiento y animaciones avanzadas
                        "absolute top-full left-1/2 -translate-x-1/2 mt-1 w-80 transition-all duration-300 transform z-50",
                        activeDropdown === link.label 
                          ? "opacity-100 visible translate-y-0" // Estado visible
                          : "opacity-0 invisible -translate-y-2 pointer-events-none" // Estado oculto
                      )}
                      // Mantener abierto cuando el cursor está sobre el dropdown
                      onMouseEnter={handleDropdownMouseEnter}
                      onMouseLeave={handleMouseLeave}
                      >
                        {/* Área invisible para conectar botón con dropdown */}
                        <div className="absolute -top-1 left-0 right-0 h-1 bg-transparent" />
                        
                        {/* CONTENIDO DEL DROPDOWN */}
                        <div className="bg-white rounded-2xl shadow-2xl border border-orange-100 p-6 glass backdrop-blur-sm">
                          {/* HEADER DEL DROPDOWN */}
                          <div className="mb-4 pb-3 border-b border-orange-100">
                            <h3 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-orange-400 to-red-500"></div>
                              Product Categories
                            </h3>
                          </div>
                          
                          {/* LISTA DE ELEMENTOS DEL DROPDOWN */}
                          <div className="grid gap-2">
                            {link.dropdownItems?.map((item, index) => (
                              <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                  "flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 group/item",
                                  "hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 hover:scale-[1.02]",
                                  // Animación escalonada para cada elemento
                                  "animate-in slide-in-from-top-2 fade-in-0"
                                )}
                                style={{
                                  // Delay progresivo para animación escalonada
                                  animationDelay: `${index * 50}ms`,
                                  animationFillMode: 'both'
                                }}
                                // Cerrar dropdown al hacer clic
                                onClick={() => setActiveDropdown(null)}
                              >
                                {/* ICONO CON EFECTOS */}
                                <div className="p-2 rounded-lg bg-gradient-to-br from-orange-400 to-red-500 text-white group-hover/item:scale-110 group-hover/item:rotate-3 transition-all duration-300 shadow-sm">
                                  <item.icon className="h-4 w-4" />
                                </div>
                                {/* CONTENIDO DEL ELEMENTO */}
                                <div className="flex-1">
                                  <span className="font-medium text-gray-700 group-hover/item:text-orange-600 transition-colors duration-300 block">
                                    {item.label}
                                  </span>
                                  {/* Descripción secundaria */}
                                  <span className="text-xs text-gray-500 group-hover/item:text-orange-500 transition-colors duration-300">
                                    Explore {item.label.toLowerCase()}
                                  </span>
                                </div>
                                {/* FLECHA INDICADORA */}
                                <div className="opacity-0 group-hover/item:opacity-100 transition-opacity duration-300">
                                  <ChevronDown className="h-4 w-4 -rotate-90 text-orange-500" />
                                </div>
                              </Link>
                            ))}
                          </div>
                          
                          {/* FOOTER DEL DROPDOWN */}
                          <div className="mt-4 pt-3 border-t border-orange-100">
                            <Link 
                              href="/products"
                              className="flex items-center justify-center gap-2 text-sm text-orange-600 hover:text-orange-700 font-medium transition-colors duration-300"
                              onClick={() => setActiveDropdown(null)}
                            >
                              View All Products
                              <ChevronDown className="h-3 w-3 -rotate-90" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    // ENLACES NORMALES (sin dropdown)
                    <Link
                      href={link.href}
                      className={cn(
                        "px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 relative overflow-hidden",
                        "hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 hover:text-orange-600",
                        // Resalta si es la página actual
                        pathname === link.href ? "text-orange-600 bg-orange-50" : "text-gray-700"
                      )}
                    >
                      <span className="relative z-10">{link.label}</span>
                      {/* Efecto de overlay al hacer hover */}
                      <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-500 opacity-0 hover:opacity-10 transition-opacity duration-300" />
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            {/* BARRA DE BÚSQUEDA AVANZADA */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="relative group">
                {/* Efecto de glow en la búsqueda */}
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-500 rounded-full opacity-0 group-hover:opacity-20 blur transition-all duration-300" />
                <div className="relative flex items-center">
                  {/* INPUT DE BÚSQUEDA */}
                  <Input 
                    type="search" 
                    placeholder="Search amazing tech..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-11 w-64 lg:w-80 pl-4 pr-12 rounded-full border-2 border-gray-200 focus:border-orange-400 transition-all duration-300 bg-white/90 backdrop-blur-sm"
                  />
                  {/* BOTÓN DE BÚSQUEDA */}
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="absolute right-1 h-9 w-9 rounded-full hover:bg-gradient-to-r hover:from-orange-400 hover:to-red-500 hover:text-white transition-all duration-300"
                  >
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* SECCIÓN DE ACCIONES DEL USUARIO */}
            <div className="flex items-center space-x-2">
              
              {/* CARRITO CON BADGE DE CANTIDAD */}
              <Link href="/cart" className="relative group">
                <Button variant="ghost" size="icon" className="h-11 w-11 hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 hover:text-orange-600 transition-all duration-300">
                  <ShoppingCart className="h-5 w-5" />
                  {/* Badge animado con cantidad */}
                  <span className="absolute -top-1 -right-1 h-5 w-5 bg-gradient-to-r from-orange-400 to-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold animate-bounce-gentle">
                    3
                  </span>
                </Button>
              </Link>

              {/* BOTÓN DE CUENTA DE USUARIO (COMENTADO) */}
              {/*
              <Link href="/login">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-11 w-11 hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 hover:text-orange-600 transition-all duration-300"
                >
                  <User className="h-5 w-5" />
                </Button>
              </Link>
              */}

              {/* MENÚ MÓVIL (SHEET/DRAWER) */}
              <div className="lg:hidden">
                <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                  {/* TRIGGER DEL MENÚ MÓVIL */}
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-11 w-11 hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 hover:text-orange-600 transition-all duration-300">
                      <Menu className="h-6 w-6" />
                    </Button>
                  </SheetTrigger>
                  
                  {/* CONTENIDO DEL MENÚ MÓVIL */}
                  <SheetContent side="right" className="w-[320px] p-0 glass">
                    <div className="flex flex-col h-full bg-gradient-to-br from-white via-orange-50/30 to-red-50/30">
                      
                      {/* HEADER DEL MENÚ MÓVIL */}
                      <div className="flex justify-between items-center p-6 border-b border-orange-100">
                        <Link 
                          href="/" 
                          className="flex items-center gap-3 text-2xl font-bold text-gradient-houzze group" 
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <Image
                            src="/Logo.png"
                            alt="Houzze Tec Logo"
                            width={32}
                            height={32}
                            className="rounded-lg group-hover:scale-110 transition-transform duration-300"
                          />
                          Houzze Tec
                        </Link>
                        {/* BOTÓN PARA CERRAR */}
                        <SheetClose asChild>
                          <Button variant="ghost" size="icon" className="hover:bg-red-100 hover:text-red-600 transition-colors duration-300">
                            <X className="h-5 w-5" />
                          </Button>
                        </SheetClose>
                      </div>

                      {/* NAVEGACIÓN MÓVIL */}
                      <nav className="flex flex-col space-y-2 p-6 flex-1">
                        {navLinks.map((link) => (
                          <div key={link.href}>
                            {link.hasDropdown ? (
                              // ELEMENTO CON DROPDOWN EN MÓVIL
                              <div>
                                <button
                                  onClick={() => handleDropdownToggle(link.label)}
                                  className="flex items-center justify-between w-full px-4 py-3 rounded-xl text-left font-medium hover:bg-gradient-to-r hover:from-orange-100 hover:to-red-100 transition-all duration-300"
                                >
                                  <span>{link.label}</span>
                                  <ChevronDown className={cn(
                                    "h-4 w-4 transition-transform duration-300",
                                    activeDropdown === link.label ? "rotate-180" : ""
                                  )} />
                                </button>
                                {/* DROPDOWN MÓVIL CON ANIMACIÓN */}
                                <div className={cn(
                                  "overflow-hidden transition-all duration-300",
                                  activeDropdown === link.label ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
                                )}>
                                  <div className="pl-4 pt-2 space-y-1">
                                    {link.dropdownItems?.map((item) => (
                                      <SheetClose asChild key={item.href}>
                                        <Link
                                          href={item.href}
                                          className="flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-white/80 transition-all duration-300"
                                        >
                                          <item.icon className="h-4 w-4 text-orange-500" />
                                          <span className="text-sm">{item.label}</span>
                                        </Link>
                                      </SheetClose>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            ) : (
                              // ENLACES NORMALES EN MÓVIL
                              <SheetClose asChild>
                                <Link
                                  href={link.href}
                                  className={cn(
                                    "block px-4 py-3 rounded-xl text-base font-medium transition-all duration-300",
                                    "hover:bg-gradient-to-r hover:from-orange-100 hover:to-red-100",
                                    // Resalta la página actual
                                    pathname === link.href ? "bg-gradient-to-r from-orange-100 to-red-100 text-orange-600" : "text-gray-700"
                                  )}
                                >
                                  {link.label}
                                </Link>
                              </SheetClose>
                            )}
                          </div>
                        ))}
                      </nav>

                      {/* BÚSQUEDA EN MÓVIL */}
                      <div className="p-6 border-t border-orange-100">
                        <div className="relative">
                          <Input 
                            type="search" 
                            placeholder="Search products..." 
                            className="w-full pr-10 rounded-xl border-orange-200 focus:border-orange-400"
                          />
                          <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        </div>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* OVERLAY PARA CERRAR DROPDOWN AL HACER CLIC FUERA */}
      {activeDropdown && (
        <div 
          className="fixed inset-0 z-40 bg-black/5 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setActiveDropdown(null)}
        />
      )}
    </>
  );
}