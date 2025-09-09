// src/components/layout/header.tsx
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { 
  Menu, Search, X, ChevronDown, 
  Utensils, IceCream, Coffee, Salad, Phone, MapPin
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

// Configuración de navegación adaptada para menú digital
const navLinks = [
  { href: '/', label: 'Inicio' },
  { 
    href: '/menu', 
    label: 'Nuestro Menú',
    hasDropdown: true,
    dropdownItems: [
      { href: '/menu?category=platos-fuertes', label: 'Platos Fuertes', icon: Utensils },
      { href: '/menu?category=entradas', label: 'Entradas & Aperitivos', icon: Salad },
      { href: '/menu?category=postres', label: 'Postres', icon: IceCream },
      { href: '/menu?category=bebidas', label: 'Bebidas & Jugos', icon: Coffee },
    ]
  },
  { href: '/about', label: 'Nosotros' },
  { href: '/contact', label: 'Ubicación' },
];

// Información real del restaurante Dely Loco
const restaurantInfo = {
  phone: "+57 301 4056704",
  address: "Comuna 13, Medellín",
  hours: "Lun - Dom: 12:00 PM - 8:00 PM"
};

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const pathname = usePathname();
  const router = useRouter();

  // Efecto de scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Dropdown handlers
  const handleMouseEnter = (label: string) => setActiveDropdown(label);
  const handleMouseLeave = () => setTimeout(() => setActiveDropdown(null), 150);
  const handleDropdownMouseEnter = () => { if (activeDropdown) setActiveDropdown(activeDropdown); };
  const handleDropdownToggle = (label: string) => setActiveDropdown(activeDropdown === label ? null : label);

  // Buscador - redirige a la página del menú con filtro
  const handleSearchSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/menu?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsMobileMenuOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <>
      <header className={cn(
        "sticky top-0 z-50 transition-all duration-500 ease-in-out",
        isScrolled 
          ? "bg-white/95 backdrop-blur-lg border-b border-orange-100 shadow-xl shadow-orange-500/10"
          : "bg-white border-b border-gray-200 shadow-lg"
      )}>
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            
            {/* Logo y marca */}
            <Link href="/" className="flex items-center group">
              <div className="relative">
                <div className="absolute inset-0 rounded-xl transition-all duration-300 bg-gradient-to-br from-orange-400 to-red-500 opacity-0 group-hover:opacity-20 blur-lg" />
                <Image
                  src="/Logo.png"
                  alt="Logo Dely Loco"
                  width={50}
                  height={50}
                  className="relative rounded-xl transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="ml-3 flex flex-col">
                <span className="text-2xl lg:text-3xl font-extrabold transition-all duration-300 group-hover:scale-105 bg-gradient-to-r from-yellow-400 via-red-500 to-green-500 text-transparent bg-clip-text drop-shadow-md">
                  Dely Loco
                </span>
                <span className="text-xs text-gray-500 font-medium tracking-wider">
                  COMUNA 13 • MEDELLÍN
                </span>
              </div>
            </Link>

            {/* Menú Desktop */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => (
                <div key={link.label} className="relative group">
                  {link.hasDropdown ? (
                    <div 
                      onMouseEnter={() => handleMouseEnter(link.label)}
                      onMouseLeave={handleMouseLeave}
                      className="relative"
                    >
                      <button
                        className={cn(
                          "flex items-center space-x-1 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300",
                          "hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 hover:text-orange-600",
                          pathname.startsWith('/menu') ? "text-orange-600 bg-orange-50" : "text-gray-700",
                          activeDropdown === link.label ? "text-orange-600 bg-orange-50" : ""
                        )}
                      >
                        <span>{link.label}</span>
                        <ChevronDown className={cn("h-4 w-4 transition-transform duration-300", activeDropdown === link.label ? "rotate-180 text-orange-600" : "")} />
                      </button>
                      
                      {/* Dropdown del menú */}
                      <div className={cn(
                        "absolute top-full left-1/2 -translate-x-1/2 mt-1 w-80 transition-all duration-300 transform z-50",
                        activeDropdown === link.label ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2 pointer-events-none"
                      )}
                        onMouseEnter={handleDropdownMouseEnter}
                        onMouseLeave={handleMouseLeave}
                      >
                        <div className="bg-white rounded-2xl shadow-2xl border border-orange-100 p-6 backdrop-blur-sm">
                          <div className="mb-4 pb-3 border-b border-orange-100">
                            <h3 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-orange-400 to-red-500"></div>
                              Categorías del Menú
                            </h3>
                          </div>
                          <div className="grid gap-2">
                            {link.dropdownItems?.map((item, index) => (
                              <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                  "flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 group/item", 
                                  "hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 hover:scale-[1.02]", 
                                  "animate-in slide-in-from-top-2 fade-in-0"
                                )}
                                style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'both' }}
                                onClick={() => setActiveDropdown(null)}
                              >
                                <div className="p-2 rounded-lg bg-gradient-to-br from-orange-400 to-red-500 text-white group-hover/item:scale-110 transition-all duration-300 shadow-sm">
                                  <item.icon className="h-4 w-4" />
                                </div>
                                <div className="flex-1">
                                  <span className="font-medium text-gray-700 group-hover/item:text-orange-600">{item.label}</span>
                                  <p className="text-xs text-gray-500 mt-0.5">Ver todos los platos</p>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={link.href}
                      className={cn(
                        "px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 relative overflow-hidden", 
                        "hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 hover:text-orange-600", 
                        pathname === link.href ? "text-orange-600 bg-orange-50" : "text-gray-700"
                      )}
                    >
                      <span>{link.label}</span>
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            {/* Barra de búsqueda desktop */}
            <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center relative group">
              <Input 
                type="search" 
                placeholder="Buscar platos, ingredientes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-11 w-64 lg:w-80 pl-4 pr-12 rounded-full border-2 border-gray-200 focus:border-orange-400 transition-all duration-300 bg-white/90"
              />
              <Button 
                type="submit" 
                variant="ghost" 
                size="icon" 
                className="absolute right-1 h-9 w-9 rounded-full hover:bg-gradient-to-r hover:from-orange-400 hover:to-red-500 hover:text-white transition-all duration-300"
              >
                <Search className="h-4 w-4" />
              </Button>
            </form>

            {/* Información de contacto + menú móvil */}
            <div className="flex items-center space-x-2">
              {/* Botón de teléfono (solo desktop) */}
              <div className="hidden xl:flex items-center space-x-4">
                <a 
                  href={`tel:${restaurantInfo.phone}`}
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-full transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  <Phone className="h-4 w-4" />
                  <span className="font-medium text-sm">{restaurantInfo.phone}</span>
                </a>
              </div>

              {/* Menú móvil */}
              <div className="lg:hidden">
                <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-11 w-11 hover:text-orange-600">
                      <Menu className="h-6 w-6" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-[320px] p-0">
                    <div className="flex flex-col h-full bg-gradient-to-br from-white via-orange-50/30 to-red-50/30">
                      {/* Header del menú móvil */}
                      <div className="flex justify-between items-center p-6 border-b border-orange-100">
                        <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 text-xl font-bold">
                          <Image src="/Logo.png" alt="Logo Dely Loco" width={32} height={32} className="rounded-lg" />
                          <div>
                            <div className="text-lg font-bold bg-gradient-to-r from-yellow-400 via-red-500 to-green-500 text-transparent bg-clip-text">
                              Dely Loco
                            </div>
                            <div className="text-xs text-gray-500 -mt-1">Comuna 13</div>
                          </div>
                        </Link>
                        <SheetClose asChild>
                          <Button variant="ghost" size="icon" className="hover:text-red-600">
                            <X className="h-5 w-5" />
                          </Button>
                        </SheetClose>
                      </div>

                      {/* Navegación móvil */}
                      <nav className="flex flex-col space-y-2 p-6 flex-1">
                        {navLinks.map((link) => (
                          <div key={link.label}>
                            {link.hasDropdown ? (
                              <div>
                                <button
                                  onClick={() => handleDropdownToggle(link.label)}
                                  className="flex items-center justify-between w-full px-4 py-3 rounded-xl font-medium hover:bg-gradient-to-r hover:from-orange-100 hover:to-red-100 transition-all duration-300"
                                >
                                  <span>{link.label}</span>
                                  <ChevronDown className={cn("h-4 w-4 transition-transform duration-300", activeDropdown === link.label ? "rotate-180" : "")} />
                                </button>
                                <div className={cn("overflow-hidden transition-all duration-300", activeDropdown === link.label ? "max-h-64 opacity-100" : "max-h-0 opacity-0")}>
                                  <div className="pl-4 pt-2 space-y-1">
                                    {link.dropdownItems?.map((item) => (
                                      <SheetClose asChild key={item.href}>
                                        <Link 
                                          href={item.href} 
                                          className="flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-white/80 transition-all duration-200"
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
                              <SheetClose asChild>
                                <Link 
                                  href={link.href} 
                                  className={cn(
                                    "block px-4 py-3 rounded-xl text-base font-medium hover:bg-gradient-to-r hover:from-orange-100 hover:to-red-100 transition-all duration-300", 
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

                      {/* Información de contacto en móvil */}
                      <div className="p-6 border-t border-orange-100 space-y-3">
                        <a 
                          href={`tel:${restaurantInfo.phone}`}
                          className="flex items-center space-x-3 p-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-all duration-300"
                        >
                          <Phone className="h-5 w-5" />
                          <div>
                            <div className="font-medium">Llamar ahora</div>
                            <div className="text-sm opacity-90">{restaurantInfo.phone}</div>
                          </div>
                        </a>
                        
                        <div className="flex items-center space-x-3 p-3 bg-blue-50 text-blue-700 rounded-xl">
                          <MapPin className="h-5 w-5" />
                          <div>
                            <div className="font-medium text-sm">{restaurantInfo.address}</div>
                            <div className="text-xs opacity-75">{restaurantInfo.hours}</div>
                          </div>
                        </div>
                      </div>

                      {/* Buscador móvil */}
                      <form onSubmit={handleSearchSubmit} className="p-6 border-t border-orange-100">
                        <div className="relative">
                          <Input 
                            type="search" 
                            placeholder="Buscar en el menú..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pr-10 rounded-xl border-orange-200 focus:border-orange-400"
                          />
                          <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2">
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

      {/* Overlay para dropdown */}
      {activeDropdown && (
        <div 
          className="fixed inset-0 z-40 bg-black/5 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setActiveDropdown(null)}
        />
      )}
    </>
  );
}