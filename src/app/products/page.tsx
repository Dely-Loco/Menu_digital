// src/app/products/page.tsx
"use client";

import { useState, useEffect, useCallback, Suspense } from "react"; // Añadido Suspense
import type { Product } from "@/types";
import ProductCard from "@/components/shared/product-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label"; // Asegúrate de tener este componente o usa <label> HTML
import { Search, RefreshCw, XCircle, Filter, ChevronDown, ChevronUp, SlidersHorizontal } from "lucide-react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

// Hook useDebounce
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

// El componente principal que usa los hooks y la lógica de cliente
function ProductsPageContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParamsHook = useSearchParams();

  const urlSearchQuery = searchParamsHook.get("search") || "";
  const urlCategory = searchParamsHook.get("category") || "all";
  const urlBrand = searchParamsHook.get("brand") || "all";
  const urlSort = searchParamsHook.get("sort") || "default";
  const urlMinPrice = searchParamsHook.get("minPrice") || "";
  const urlMaxPrice = searchParamsHook.get("maxPrice") || "";

  const [selectedCategory, setSelectedCategory] = useState(urlCategory);
  const [selectedSort, setSelectedSort] = useState(urlSort);
  const [searchQuery, setSearchQuery] = useState(urlSearchQuery);
  const [minPrice, setMinPrice] = useState(urlMinPrice);
  const [maxPrice, setMaxPrice] = useState(urlMaxPrice);
  const [selectedBrand, setSelectedBrand] = useState(urlBrand);

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<{ slug: string; name: string }[]>([]);
  const [allBrands, setAllBrands] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  // Estado para controlar la visibilidad de los filtros
  const [showFilters, setShowFilters] = useState(false);
  const [isFilterTransitioning, setIsFilterTransitioning] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => { setSearchQuery(urlSearchQuery); }, [urlSearchQuery]);
  useEffect(() => { setSelectedCategory(urlCategory); }, [urlCategory]);
  useEffect(() => { setSelectedBrand(urlBrand); }, [urlBrand]);
  useEffect(() => { setSelectedSort(urlSort); }, [urlSort]);
  useEffect(() => { setMinPrice(urlMinPrice); }, [urlMinPrice]);
  useEffect(() => { setMaxPrice(urlMaxPrice); }, [urlMaxPrice]);

  const debouncedSearch = useDebounce(searchQuery);

  useEffect(() => {
    fetch("/api/categorias")
      .then((res) => { if (!res.ok) throw new Error('Error categorías'); return res.json(); })
      .then(setCategories)
      .catch(err => console.error("Error fetching categories:", err));
    
    fetch("/api/brands")
      .then((res) => { if (!res.ok) throw new Error('Error marcas'); return res.json(); })
      .then(setAllBrands)
      .catch(err => console.error("Error fetching brands:", err));
  }, []);

  const fetchProducts = useCallback(() => {
    setLoading(true); setError(null);
    const params = new URLSearchParams();
    if (selectedCategory !== "all") params.append("category", selectedCategory);
    if (selectedBrand !== "all") params.append("brand", selectedBrand);
    if (minPrice) params.append("minPrice", minPrice);
    if (maxPrice) params.append("maxPrice", maxPrice);
    if (debouncedSearch) params.append("search", debouncedSearch);
    if (selectedSort !== "default") params.append("sort", selectedSort);
    const queryString = params.toString();

    if (mounted && typeof window !== 'undefined' && window.location.search !== (queryString ? `?${queryString}` : '')) {
        router.replace(`${pathname}${queryString ? `?${queryString}` : ''}`, { scroll: false });
    }
    
    fetch(`/api/products?${queryString}`)
      .then(async (res) => { if (!res.ok) { const errBody = await res.text(); throw new Error(`API Error: ${res.status} ${errBody}`); } return res.json(); })
      .then(data => setProducts(Array.isArray(data) ? data : []))
      .catch(err => { setError(err.message); setProducts([]); })
      .finally(() => setLoading(false));
  }, [selectedCategory, selectedBrand, minPrice, maxPrice, debouncedSearch, selectedSort, pathname, router, mounted]);

  useEffect(() => {
    if (mounted) fetchProducts();
  }, [fetchProducts, mounted]);

  const resetFilters = () => {
    setSelectedCategory("all"); setSelectedSort("default"); setSearchQuery("");
    setMinPrice(""); setMaxPrice(""); setSelectedBrand("all");
  };

  // Función para toggle de filtros con animación
  const toggleFilters = useCallback(() => {
    setIsFilterTransitioning(true);
    setShowFilters(prev => !prev);
    
    // Reset transition state después de la animación
    setTimeout(() => {
      setIsFilterTransitioning(false);
    }, 300);
  }, []);

  // Contar filtros activos
  const activeFiltersCount = [
    selectedCategory !== "all",
    selectedBrand !== "all", 
    selectedSort !== "default",
    minPrice !== "",
    maxPrice !== "",
    searchQuery !== ""
  ].filter(Boolean).length;

  if (!mounted && loading) { // Muestra un loader inicial más simple si aún no está montado y está cargando
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <RefreshCw className="h-10 w-10 text-orange-500 animate-spin" />
        <p className="ml-3 text-lg text-gray-600">Cargando...</p>
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header con título y botón de filtros */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 sm:mb-0 text-center sm:text-left">
          Nuestros Productos
        </h1>
        
        {/* Botón para mostrar/ocultar filtros */}
        <div className="flex items-center justify-center sm:justify-end">
          <Button
            onClick={toggleFilters}
            variant="outline"
            disabled={isFilterTransitioning}
            className={`
              relative overflow-hidden transition-all duration-300 ease-in-out
              ${showFilters 
                ? 'bg-orange-50 border-orange-200 text-orange-700 hover:bg-orange-100' 
                : 'hover:bg-gray-50'
              }
              ${isFilterTransitioning ? 'scale-95' : 'hover:scale-105'}
            `}
          >
            <div className="flex items-center space-x-2">
              <SlidersHorizontal className={`h-4 w-4 transition-transform duration-300 ${showFilters ? 'rotate-180' : ''}`} />
              <span className="font-medium">
                {showFilters ? 'Ocultar Filtros' : 'Mostrar Filtros'}
              </span>
              {activeFiltersCount > 0 && (
                <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-orange-500 rounded-full animate-pulse">
                  {activeFiltersCount}
                </span>
              )}
              {showFilters ? (
                <ChevronUp className="h-4 w-4 transition-transform duration-300" />
              ) : (
                <ChevronDown className="h-4 w-4 transition-transform duration-300" />
              )}
            </div>
          </Button>
        </div>
      </div>

      {/* Contenedor de filtros colapsable */}
      <div className={`
        mb-8 overflow-hidden transition-all duration-500 ease-in-out
        ${showFilters 
          ? 'max-h-96 opacity-100 transform translate-y-0' 
          : 'max-h-0 opacity-0 transform -translate-y-4'
        }
      `}>
        <div className={`
          p-5 md:p-6 bg-gradient-to-br from-white to-gray-50 shadow-xl rounded-2xl border border-gray-200/80
          transition-all duration-500 ease-in-out
          ${showFilters ? 'transform scale-100' : 'transform scale-95'}
        `}>
          {/* Indicador visual de filtros activos */}
          {activeFiltersCount > 0 && (
            <div className="mb-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Filter className="h-4 w-4 text-orange-600" />
                  <span className="text-sm font-medium text-orange-800">
                    {activeFiltersCount} filtro{activeFiltersCount !== 1 ? 's' : ''} activo{activeFiltersCount !== 1 ? 's' : ''}
                  </span>
                </div>
                <Button
                  onClick={resetFilters}
                  variant="ghost"
                  size="sm"
                  className="text-orange-600 hover:text-orange-800 hover:bg-orange-100 h-7 px-2"
                >
                  <XCircle className="h-3 w-3 mr-1" />
                  Limpiar todo
                </Button>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-12 items-end">
            <div className="lg:col-span-3 xl:col-span-4">
              <Label htmlFor="search" className="block text-sm font-medium text-gray-800 mb-1.5">Buscar Producto</Label>
              <div className="relative">
                <Input id="search" type="text" placeholder="Nombre, marca, etiqueta..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pr-10 w-full h-10 text-sm"/>
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
            <div className="lg:col-span-3 xl:col-span-2">
              <Label htmlFor="category" className="block text-sm font-medium text-gray-800 mb-1.5">Categoría</Label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger id="category" className="w-full h-10 text-sm data-[placeholder]:text-gray-500"><SelectValue placeholder="Todas" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Seleccionar</SelectItem>
                  {categories.map((cat) => (<SelectItem key={cat.slug} value={cat.slug}>{cat.name}</SelectItem>))}
                </SelectContent>
              </Select>
            </div>
            <div className="lg:col-span-3 xl:col-span-2">
              <Label htmlFor="brand" className="block text-sm font-medium text-gray-800 mb-1.5">Marca</Label>
              <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                <SelectTrigger id="brand" className="w-full h-10 text-sm data-[placeholder]:text-gray-500"><SelectValue placeholder="Todas" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Seleccionar</SelectItem>
                  {allBrands.map((brandName) => (<SelectItem key={brandName} value={brandName}>{brandName}</SelectItem>))}
                </SelectContent>
              </Select>
            </div>
            <div className="lg:col-span-3 xl:col-span-2">
              <Label htmlFor="sort" className="block text-sm font-medium text-gray-800 mb-1.5">Ordenar Por</Label>
              <Select value={selectedSort} onValueChange={setSelectedSort}>
                <SelectTrigger id="sort" className="w-full h-10 text-sm data-[placeholder]:text-gray-500"><SelectValue placeholder="Defecto" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Seleccionar</SelectItem>
                  <SelectItem value="price-asc">Precio: Menos a Mayor</SelectItem>
                  <SelectItem value="price-desc">Precio: Mayor a Menor</SelectItem>
                  <SelectItem value="rating-desc">Popularidad</SelectItem>
                  <SelectItem value="name-asc">Nombre: A a Z</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="lg:col-span-2 xl:col-span-1">
              <Label htmlFor="min-price" className="block text-sm font-medium text-gray-800 mb-1.5">$ Mín.</Label>
              <Input id="min-price" type="number" placeholder="0" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} className="w-full h-10 text-sm"/>
            </div>
            <div className="lg:col-span-2 xl:col-span-1">
              <Label htmlFor="max-price" className="block text-sm font-medium text-gray-800 mb-1.5">$ Máx.</Label>
              <Input id="max-price" type="number" placeholder="Cualquiera" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} className="w-full h-10 text-sm"/>
            </div>
          </div>
        </div>
      </div>
      
      {loading && !error && (
        <div className="flex flex-col items-center justify-center min-h-[300px] py-10 text-center">
          <RefreshCw className="h-10 w-10 text-orange-500 animate-spin" />
          <p className="ml-3 mt-3 text-lg text-gray-600">Cargando productos...</p>
        </div>
      )}
      
      {!loading && error && (
        <div className="text-center text-red-700 py-12 bg-red-50 p-6 rounded-lg shadow-md border border-red-200">
            <h2 className="font-semibold text-xl mb-2">¡Ups! Algo salió mal</h2>
            <p className="text-md">{error}</p>
            <p className="text-sm mt-4">Intenta refrescar la página o ajustar tus filtros.</p>
        </div>
      )}
      
      {/* Barra de estado de productos */}
      {!loading && !error && (
        <div className="flex items-center justify-between mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">
              Mostrando <span className="font-semibold text-gray-900">{products.length}</span> producto{products.length !== 1 ? 's' : ''}
            </span>
            {activeFiltersCount > 0 && (
              <span className="text-xs text-orange-600 bg-orange-100 px-2 py-1 rounded-full">
                Filtrado
              </span>
            )}
          </div>
          
          {/* Botón rápido para mostrar filtros si están ocultos */}
          {!showFilters && (
            <Button
              onClick={toggleFilters}
              variant="ghost"
              size="sm"
              className="text-gray-600 hover:text-gray-900"
            >
              <Filter className="h-4 w-4 mr-1" />
              Filtrar
            </Button>
          )}
        </div>
      )}
      
      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="col-span-full text-center py-16">
              <Search className="mx-auto h-20 w-20 text-gray-300 mb-6" />
              <h2 className="text-2xl font-semibold text-gray-700 mb-3">No se encontraron productos</h2>
              <p className="text-gray-600 max-w-md mx-auto mb-4">
                Intenta con diferentes palabras clave o ajustando los filtros.
              </p>
              {activeFiltersCount > 0 && (
                <Button
                  onClick={resetFilters}
                  variant="outline"
                  className="mt-2"
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Limpiar filtros
                </Button>
              )}
            </div>
          )}
        </div>
      )}
    </main>
  );
}

// El componente de página Wrapper que usa Suspense
export default function ProductsPageWrapper() {
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center min-h-screen">
        <RefreshCw className="h-12 w-12 text-orange-500 animate-spin" />
        <p className="ml-4 text-xl text-gray-700">Cargando página de productos...</p>
      </div>
    }>
      <ProductsPageContent />
    </Suspense>
  );
}