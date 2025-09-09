// src/app/menu/page.tsx
"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import type { Plato } from "@/types";
import ProductCard from "@/components/shared/product-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Search, RefreshCw, XCircle, ChefHat, Clock } from "lucide-react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

// Hook personalizado para debounce
function useDebounce(value: string, delay = 500) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounced(value);
    }, delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debounced;
}

// Componente principal del menú
function MenuPageContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParamsHook = useSearchParams();

  // Parámetros de URL
  const urlSearchQuery = searchParamsHook.get("search") || "";
  const urlCategory = searchParamsHook.get("category") || "all";
  const urlSort = searchParamsHook.get("sort") || "featured";

  // Estados del componente
  const [selectedCategory, setSelectedCategory] = useState(urlCategory);
  const [selectedSort, setSelectedSort] = useState(urlSort);
  const [searchQuery, setSearchQuery] = useState(urlSearchQuery);
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
  const [showAvailableOnly, setShowAvailableOnly] = useState(true);

  const [platos, setPlatos] = useState<Plato[]>([]);
  const [categories, setCategories] = useState<{ id: string; name: string; slug: string; platosCount: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  // Control de hidratación
  useEffect(() => { setMounted(true); }, []);

  // Sincronización con URL
  useEffect(() => { setSearchQuery(urlSearchQuery); }, [urlSearchQuery]);
  useEffect(() => { setSelectedCategory(urlCategory); }, [urlCategory]);
  useEffect(() => { setSelectedSort(urlSort); }, [urlSort]);

  // Debounce para búsqueda
  const debouncedSearch = useDebounce(searchQuery);

  // Carga de categorías
  useEffect(() => {
    fetch("/api/categorias")
      .then((res) => { 
        if (!res.ok) throw new Error('Error al cargar categorías'); 
        return res.json(); 
      })
      .then((data) => {
        // Adaptar la respuesta de la API
        const formattedCategories = data.categorias || data || [];
        setCategories(formattedCategories);
      })
      .catch(err => {
        console.error("Error fetching categories:", err);
        setCategories([]);
      });
  }, []);

  // Función para buscar platos
  const fetchPlatos = useCallback(() => {
    setLoading(true); 
    setError(null);
    
    // Construir parámetros para la API
    const params = new URLSearchParams();
    if (selectedCategory !== "all") params.append("category", selectedCategory);
    if (debouncedSearch) params.append("search", debouncedSearch);
    if (selectedSort !== "featured") params.append("sort", selectedSort);
    if (showFeaturedOnly) params.append("featured", "true");
    if (showAvailableOnly) params.append("available", "true");
    
    const queryString = params.toString();

    // Actualizar URL
    if (mounted && typeof window !== 'undefined' && window.location.search !== (queryString ? `?${queryString}` : '')) {
        router.replace(`${pathname}${queryString ? `?${queryString}` : ''}`, { scroll: false });
    }
    
    // Petición a la API
    fetch(`/api/products?${queryString}`)
      .then(async (res) => { 
        if (!res.ok) { 
          throw new Error(`Error del servidor: ${res.status}`); 
        } 
        return res.json(); 
      })
      .then(data => {
        // Adaptar respuesta de la API
        const platosData = data.products || data || [];
        setPlatos(Array.isArray(platosData) ? platosData : []);
      })
      .catch(err => { 
        setError(err.message); 
        setPlatos([]); 
      })
      .finally(() => setLoading(false));
  }, [selectedCategory, debouncedSearch, selectedSort, showFeaturedOnly, showAvailableOnly, pathname, router, mounted]);

  // Ejecutar búsqueda cuando cambien los filtros
  useEffect(() => {
    if (mounted) fetchPlatos();
  }, [fetchPlatos, mounted]);

  // Función para resetear filtros
  const resetFilters = () => {
    setSelectedCategory("all"); 
    setSelectedSort("featured"); 
    setSearchQuery("");
    setShowFeaturedOnly(false);
    setShowAvailableOnly(true);
  };

  // Loading inicial
  if (!mounted && loading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <div className="text-center space-y-4">
          <RefreshCw className="h-12 w-12 text-orange-500 animate-spin mx-auto" />
          <p className="text-lg text-gray-600">Cargando nuestro delicioso menú...</p>
        </div>
      </div>
    );
  }

  const hasActiveFilters = searchQuery || selectedCategory !== "all" || showFeaturedOnly || !showAvailableOnly || selectedSort !== "featured";

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50/30 to-red-50/30">
      <div className="container mx-auto px-4 py-8">
        {/* Header del menú */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full mb-4">
            <ChefHat className="h-5 w-5" />
            <span className="font-medium">Menú Digital</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Nuestros <span className="text-orange-600">Deliciosos</span> Platos
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
            Descubre los sabores auténticos de la Comuna 13. Cada plato preparado con amor y los mejores ingredientes.
          </p>
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-100 to-red-100 text-orange-800 px-4 py-2 rounded-full border border-orange-200">
            <span className="text-sm">📱 Escanea, explora y disfruta nuestro menú</span>
          </div>
        </div>

        {/* Barra de búsqueda y filtros */}
        <div className="max-w-4xl mx-auto mb-10">
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 md:p-8">
            
            {/* Búsqueda principal */}
            <div className="mb-6">
              <Label htmlFor="search" className="block text-sm font-semibold text-gray-800 mb-2">
                ¿Qué te provoca comer hoy?
              </Label>
              <div className="relative">
                <Input 
                  id="search" 
                  type="text" 
                  placeholder="Busca platos, ingredientes, sabores..." 
                  value={searchQuery} 
                  onChange={(e) => setSearchQuery(e.target.value)} 
                  className="h-14 text-lg pl-5 pr-14 rounded-2xl border-2 border-gray-200 focus:border-orange-400 bg-gray-50/50"
                />
                <Button 
                  type="button"
                  variant="ghost" 
                  size="icon" 
                  className="absolute right-2 top-2 h-10 w-10 rounded-xl hover:bg-gradient-to-r hover:from-orange-400 hover:to-red-500 hover:text-white transition-all duration-300"
                >
                  <Search className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Filtros de categorías */}
            <div className="mb-6">
              <Label className="block text-sm font-semibold text-gray-800 mb-3">
                Categorías
              </Label>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={selectedCategory === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory("all")}
                  className={selectedCategory === "all" 
                    ? "bg-gradient-to-r from-orange-500 to-red-500 text-white" 
                    : "hover:bg-orange-50 hover:border-orange-300"
                  }
                >
                  Todos los Platos
                </Button>
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.slug ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category.slug)}
                    className={selectedCategory === category.slug
                      ? "bg-gradient-to-r from-orange-500 to-red-500 text-white" 
                      : "hover:bg-orange-50 hover:border-orange-300"
                    }
                  >
                    {category.name}
                    {category.platosCount && (
                      <Badge variant="secondary" className="ml-2 bg-white/20">
                        {category.platosCount}
                      </Badge>
                    )}
                  </Button>
                ))}
              </div>
            </div>

            {/* Filtros rápidos */}
            <div className="mb-6">
              <Label className="block text-sm font-semibold text-gray-800 mb-3">
                Filtros Rápidos
              </Label>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={showFeaturedOnly ? "default" : "outline"}
                  size="sm"
                  onClick={() => setShowFeaturedOnly(!showFeaturedOnly)}
                  className={showFeaturedOnly
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                    : "hover:bg-purple-50 hover:border-purple-300"
                  }
                >
                  <ChefHat className="h-4 w-4 mr-2" />
                  Especiales del Chef
                </Button>
                <Button
                  variant={showAvailableOnly ? "default" : "outline"}
                  size="sm"
                  onClick={() => setShowAvailableOnly(!showAvailableOnly)}
                  className={showAvailableOnly
                    ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                    : "hover:bg-green-50 hover:border-green-300"
                  }
                >
                  <Clock className="h-4 w-4 mr-2" />
                  Disponible Ahora
                </Button>
              </div>
            </div>

            {/* Ordenamiento */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex flex-wrap gap-2">
                <Label className="text-sm font-semibold text-gray-800 flex items-center">
                  Ordenar por:
                </Label>
                <select
                  value={selectedSort}
                  onChange={(e) => setSelectedSort(e.target.value)}
                  className="text-sm bg-white border border-gray-300 rounded-lg px-3 py-1 hover:border-orange-300 focus:border-orange-400 focus:outline-none"
                >
                  <option value="featured">Destacados</option>
                  <option value="name-asc">Nombre A-Z</option>
                  <option value="name-desc">Nombre Z-A</option>
                  <option value="price-asc">Precio: Menor a Mayor</option>
                  <option value="price-desc">Precio: Mayor a Menor</option>
                  <option value="newest">Más Recientes</option>
                </select>
              </div>

              {/* Botón limpiar filtros */}
              {hasActiveFilters && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={resetFilters}
                  className="text-gray-600 hover:text-red-600 hover:border-red-300 hover:bg-red-50"
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Limpiar Filtros
                </Button>
              )}
            </div>

            {/* Indicadores de filtros activos */}
            {hasActiveFilters && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex flex-wrap gap-2 items-center text-sm">
                  <span className="text-gray-600 font-medium">Filtros activos:</span>
                  {searchQuery && (
                    <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                      Búsqueda: &quot;{searchQuery}&quot;
                    </Badge>
                  )}
                  {selectedCategory !== "all" && (
                    <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                      {categories.find(c => c.slug === selectedCategory)?.name || selectedCategory}
                    </Badge>
                  )}
                  {showFeaturedOnly && (
                    <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                      <ChefHat className="h-3 w-3 mr-1" />
                      Especiales
                    </Badge>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Estado de carga */}
        {loading && !error && (
          <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
            <RefreshCw className="h-12 w-12 text-orange-500 animate-spin mb-4" />
            <p className="text-xl text-gray-600">Preparando nuestros platos más deliciosos...</p>
            <p className="text-sm text-gray-500 mt-2">Un momentito por favor</p>
          </div>
        )}
        
        {/* Estado de error */}
        {!loading && error && (
          <div className="text-center py-16 bg-red-50 rounded-3xl border border-red-200 max-w-2xl mx-auto">
            <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <XCircle className="h-8 w-8 text-red-600" />
            </div>
            <h2 className="font-bold text-xl text-red-800 mb-2">Ups! Algo salió mal</h2>
            <p className="text-red-600 mb-4">{error}</p>
            <p className="text-sm text-red-500">Intenta refrescar la página o contacta con nosotros</p>
            <Button 
              onClick={() => window.location.reload()} 
              className="mt-4 bg-red-600 hover:bg-red-700"
            >
              Refrescar Página
            </Button>
          </div>
        )}
        
        {/* Grid de platos */}
        {!loading && !error && (
          <>
            {/* Contador de resultados */}
            {platos.length > 0 && (
              <div className="text-center mb-8">
                <p className="text-gray-600">
                  {platos.length === 1 
                    ? "Encontramos 1 plato delicioso" 
                    : `Encontramos ${platos.length} platos deliciosos`
                  }
                  {hasActiveFilters && " que coinciden con tu búsqueda"}
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
              {platos.length > 0 ? (
                platos.map((plato, index) => (
                  <ProductCard 
                    key={plato.id} 
                    product={plato} 
                    priority={index < 4} // Prioridad para las primeras 4 imágenes
                  />
                ))
              ) : (
                /* Estado sin platos */
                <div className="col-span-full text-center py-20">
                  <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Search className="h-12 w-12 text-gray-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-700 mb-3">
                    No encontramos platos
                  </h2>
                  <p className="text-gray-600 max-w-md mx-auto mb-6">
                    {searchQuery 
                      ? `No tenemos platos que coincidan con &quot;${searchQuery}&quot;. Intenta con otras palabras clave.`
                      : "No hay platos disponibles en este momento con los filtros seleccionados."
                    }
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    {hasActiveFilters && (
                      <Button onClick={resetFilters} variant="outline">
                        Ver Todo el Menú
                      </Button>
                    )}
                    <Button 
                      onClick={() => router.push('/contact')} 
                      className="bg-orange-600 hover:bg-orange-700"
                    >
                      Contáctanos
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {/* Información final del restaurante */}
        {!loading && !error && (
          <div className="text-center mt-16 py-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              ¡Gracias por explorar nuestro menú!
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Para hacer tu pedido, llama a tu mesero o usa el botón de WhatsApp para domicilios.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="bg-white/20 px-6 py-3 rounded-full backdrop-blur-sm">
                <span className="font-semibold">📍 Comuna 13, Medellín</span>
              </div>
              <div className="bg-white/20 px-6 py-3 rounded-full backdrop-blur-sm">
                <span className="font-semibold">🕒 Lun - Dom: 10:00 AM - 10:00 PM</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

// Wrapper con Suspense
export default function MenuPageWrapper() {
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center min-h-screen"></div>
    }>
      <MenuPageContent />
    </Suspense>
  );
}