// @/components/layout/header.tsx
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { 
  ShoppingCart, User, Menu, Search, X, ChevronDown, 
  Zap, Smartphone, Headphones, Watch, Monitor 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { useState, useEffect, useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useCart } from '@/context/CartContext'; // <--- 1. IMPORTA useCart

const navLinks = [
  { href: '/', label: 'Inicio' },
  { 
    href: '/products', 
    label: 'Productos',
    hasDropdown: true,
    dropdownItems: [
      { href: '/products?category=electronics', label: 'Electrónicos', icon: Zap },
      { href: '/products?category=smartphone', label: 'Celulares', icon: Smartphone },
      { href: '/products?category=audio', label: 'Audio', icon: Headphones },
      { href: '/products?category=wearables', label: 'Vestibles', icon: Watch }, // Etiqueta más corta
      { href: '/products?category=displays', label: 'Monitores', icon: Monitor },
    ]
  },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contáctanos' }, // Cambiado de 'Soporte' a 'Contáctanos' para ser más directo
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const pathname = usePathname();
  const router = useRouter();
  
  const { itemCount } = useCart(); // <--- 2. OBTÉN itemCount DEL CONTEXTO DEL CARRITO

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseEnter = (label: string) => setActiveDropdown(label);
  const handleMouseLeave = () => setTimeout(() => setActiveDropdown(null), 150);
  const handleDropdownMouseEnter = () => { if (activeDropdown) setActiveDropdown(activeDropdown); };
  const handleDropdownToggle = (label: string) => setActiveDropdown(activeDropdown === label ? null : label);

  const handleSearchSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsMobileMenuOpen(false); 
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
            
            <Link href="/" className="flex items-center group">
              <div className="relative">
                <div className={cn(
                  "absolute inset-0 rounded-xl transition-all duration-300",
                  "bg-gradient-to-br from-orange-400 to-red-500 opacity-0 group-hover:opacity-20 blur-lg"
                )} />
                <Image
                  src="/Logo.png"
                  alt="Logo Houzze Tec"
                  width={50}
                  height={50}
                  className="relative rounded-xl transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="ml-3 flex flex-col">
                <span className="text-2xl lg:text-3xl font-bold text-gradient-houzze transition-all duration-300 group-hover:scale-105">
                  Houzze Tec
                </span>
                <span className="text-xs text-gray-500 font-medium tracking-wider">
                  TECH INNOVATION STORE
                </span>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => (
                <div key={link.label} className="relative group"> {/* Usar link.label como key si href no es único para el root */}
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
                          (pathname.startsWith(link.href) || (pathname === "/products" && link.href === "/products")) && link.label === "Productos" ? "text-orange-600 bg-orange-50" : 
                          pathname === link.href && link.label !== "Productos" ? "text-orange-600 bg-orange-50" : "text-gray-700",
                          activeDropdown === link.label ? "text-orange-600 bg-orange-50" : ""
                        )}
                      >
                        <span>{link.label}</span>
                        <ChevronDown className={cn("h-4 w-4 transition-transform duration-300", activeDropdown === link.label ? "rotate-180 text-orange-600" : "")} />
                      </button>
                      <div className={cn(
                        "absolute top-full left-1/2 -translate-x-1/2 mt-1 w-80 transition-all duration-300 transform z-50",
                        activeDropdown === link.label ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2 pointer-events-none"
                      )}
                        onMouseEnter={handleDropdownMouseEnter}
                        onMouseLeave={handleMouseLeave}
                      >
                        <div className="absolute -top-1 left-0 right-0 h-1 bg-transparent" />
                        <div className="bg-white rounded-2xl shadow-2xl border border-orange-100 p-6 glass backdrop-blur-sm">
                          <div className="mb-4 pb-3 border-b border-orange-100">
                            <h3 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-orange-400 to-red-500"></div>
                              Categorías de Productos
                            </h3>
                          </div>
                          <div className="grid gap-2">
                            {link.dropdownItems?.map((item, index) => (
                              <Link
                                key={item.href}
                                href={item.href}
                                className={cn("flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 group/item", "hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 hover:scale-[1.02]", "animate-in slide-in-from-top-2 fade-in-0")}
                                style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'both' }}
                                onClick={() => setActiveDropdown(null)}
                              >
                                <div className="p-2 rounded-lg bg-gradient-to-br from-orange-400 to-red-500 text-white group-hover/item:scale-110 group-hover/item:rotate-3 transition-all duration-300 shadow-sm">
                                  <item.icon className="h-4 w-4" />
                                </div>
                                <div className="flex-1">
                                  <span className="font-medium text-gray-700 group-hover/item:text-orange-600 transition-colors duration-300 block">{item.label}</span>
                                  <span className="text-xs text-gray-500 group-hover/item:text-orange-500 transition-colors duration-300">Explorar {item.label.toLowerCase()}</span>
                                </div>
                                <div className="opacity-0 group-hover/item:opacity-100 transition-opacity duration-300">
                                  <ChevronDown className="h-4 w-4 -rotate-90 text-orange-500" />
                                </div>
                              </Link>
                            ))}
                          </div>
                          <div className="mt-4 pt-3 border-t border-orange-100">
                            <Link 
                              href="/products"
                              className="flex items-center justify-center gap-2 text-sm text-orange-600 hover:text-orange-700 font-medium transition-colors duration-300"
                              onClick={() => setActiveDropdown(null)}
                            >
                              Ver Todos los Productos
                              <ChevronDown className="h-3 w-3 -rotate-90" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={link.href}
                      className={cn("px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 relative overflow-hidden", "hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 hover:text-orange-600", pathname === link.href ? "text-orange-600 bg-orange-50" : "text-gray-700")}
                    >
                      <span className="relative z-10">{link.label}</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-500 opacity-0 hover:opacity-10 transition-opacity duration-300" />
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-500 rounded-full opacity-0 group-hover:opacity-20 blur transition-all duration-300 pointer-events-none" />
              <div className="relative flex items-center">
                <Input 
                  type="search" 
                  placeholder="Buscar productos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-11 w-64 lg:w-80 pl-4 pr-12 rounded-full border-2 border-gray-200 focus:border-orange-400 transition-all duration-300 bg-white/90 backdrop-blur-sm"
                />
                <Button 
                  type="submit"
                  variant="ghost" 
                  size="icon" 
                  className="absolute right-1 h-9 w-9 rounded-full hover:bg-gradient-to-r hover:from-orange-400 hover:to-red-500 hover:text-white transition-all duration-300"
                  aria-label="Buscar" // Añadir aria-label
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </form>

            <div className="flex items-center space-x-2">
              <Link href="/cart" className="relative group">
                <Button variant="ghost" size="icon" className="h-11 w-11 hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 hover:text-orange-600 transition-all duration-300">
                  <ShoppingCart className="h-5 w-5" />
                  {/* 3. USA itemCount PARA EL BADGE (mostrar solo si hay items) */}
                  {itemCount > 0 && (
                    <span className="absolute -top-1 -right-1 h-5 w-5 bg-gradient-to-r from-orange-400 to-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold animate-bounce-gentle">
                      {itemCount}
                    </span>
                  )}
                </Button>
              </Link>
              
              <div className="lg:hidden">
                <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-11 w-11 hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 hover:text-orange-600 transition-all duration-300">
                      <Menu className="h-6 w-6" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-[320px] p-0 glass">
                    <div className="flex flex-col h-full bg-gradient-to-br from-white via-orange-50/30 to-red-50/30">
                      <div className="flex justify-between items-center p-6 border-b border-orange-100">
                        <Link 
                          href="/" 
                          className="flex items-center gap-3 text-2xl font-bold text-gradient-houzze group" 
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <Image src="/Logo.png" alt="Logo Houzze Tec" width={32} height={32} className="rounded-lg group-hover:scale-110 transition-transform duration-300" />
                          Houzze Tec
                        </Link>
                        <SheetClose asChild>
                          <Button variant="ghost" size="icon" className="hover:bg-red-100 hover:text-red-600 transition-colors duration-300">
                            <X className="h-5 w-5" />
                          </Button>
                        </SheetClose>
                      </div>
                      <nav className="flex flex-col space-y-2 p-6 flex-1">
                        {navLinks.map((link) => (
                          <div key={link.label}> {/* Usar link.label como key aquí también */}
                            {link.hasDropdown ? (
                              <div>
                                <button
                                  onClick={() => handleDropdownToggle(link.label)}
                                  className="flex items-center justify-between w-full px-4 py-3 rounded-xl text-left font-medium hover:bg-gradient-to-r hover:from-orange-100 hover:to-red-100 transition-all duration-300"
                                >
                                  <span>{link.label}</span>
                                  <ChevronDown className={cn("h-4 w-4 transition-transform duration-300", activeDropdown === link.label ? "rotate-180" : "")} />
                                </button>
                                <div className={cn("overflow-hidden transition-all duration-300", activeDropdown === link.label ? "max-h-64 opacity-100" : "max-h-0 opacity-0")}>
                                  <div className="pl-4 pt-2 space-y-1">
                                    {link.dropdownItems?.map((item) => (
                                      <SheetClose asChild key={item.href}>
                                        <Link href={item.href} className="flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-white/80 transition-all duration-300">
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
                                <Link href={link.href} className={cn("block px-4 py-3 rounded-xl text-base font-medium transition-all duration-300", "hover:bg-gradient-to-r hover:from-orange-100 hover:to-red-100", pathname === link.href ? "bg-gradient-to-r from-orange-100 to-red-100 text-orange-600" : "text-gray-700")}>
                                  {link.label}
                                </Link>
                              </SheetClose>
                            )}
                          </div>
                        ))}
                      </nav>
                      <form onSubmit={handleSearchSubmit} className="p-6 border-t border-orange-100">
                        <div className="relative">
                          <Input 
                            type="search" 
                            placeholder="Buscar productos..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pr-10 rounded-xl border-orange-200 focus:border-orange-400"
                          />
                          <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2" aria-label="Buscar productos"> {/* Añadir aria-label */}
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
      {activeDropdown && (
        <div 
          className="fixed inset-0 z-40 bg-black/5 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setActiveDropdown(null)}
        />
      )}
    </>
  );
}