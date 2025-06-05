// src/app/products/page.tsx
"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import type { Product } from "@/types";
import ProductCard from "@/components/shared/product-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Search, RefreshCw, XCircle, Tag } from "lucide-react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

// ============================================================================
// 🎨 GUÍA RÁPIDA DE PERSONALIZACIÓN
// ============================================================================
// 
// 📝 TÍTULOS Y TEXTOS:
// - Línea 80: Título principal (text-3xl md:text-4xl)
// - Línea 88: Placeholder de búsqueda
// - Línea 258: Mensaje "No se encontraron productos"
// 
// 🎨 COLORES Y ESTILOS:
// - Línea 85: Contenedor de búsqueda (shadow-xl, rounded-2xl)
// - Línea 100: Botón de búsqueda (hover:from-orange-400 hover:to-red-500)
// - Línea 113: Botón de descuento (from-orange-500 to-red-500)
// 
// 📐 TAMAÑOS Y ESPACIADO:
// - Línea 91: Altura del input de búsqueda (h-12)
// - Línea 206: Grid de productos (grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4)
// - Línea 206: Espaciado entre productos (gap-x-6 gap-y-8)
// 
// ⚡ TIEMPOS Y ANIMACIONES:
// - Línea 21: Delay del debounce (500ms por defecto)
// - Línea 100: Duración de transiciones (duration-300)
// 
// 🔧 FUNCIONALIDADES:
// - Línea 24-33: Hook de debounce personalizable
// - Línea 160: Función de reseteo de filtros
// - Línea 67: Parámetros de URL para filtros
// ============================================================================

// 🔧 Hook personalizado para debounce - PERSONALIZABLE: Cambia el delay por defecto (500ms)
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

// 📄 Componente principal que contiene toda la lógica de filtros y búsqueda
function ProductsPageContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParamsHook = useSearchParams();

  // 🔗 Extracción de parámetros URL para mantener estado entre navegaciones
  const urlSearchQuery = searchParamsHook.get("search") || "";
  const urlCategory = searchParamsHook.get("category") || "all";
  const urlBrand = searchParamsHook.get("brand") || "all";
  const urlSort = searchParamsHook.get("sort") || "default";
  const urlMinPrice = searchParamsHook.get("minPrice") || "";
  const urlMaxPrice = searchParamsHook.get("maxPrice") || "";
  // 🏷️ FILTRO DE DESCUENTOS: Obtener parámetro de URL
  const urlSaleFilter = searchParamsHook.get("sale") === "true";

  // 📊 Estados del componente para filtros y datos
  const [selectedCategory, setSelectedCategory] = useState(urlCategory);
  const [selectedSort, setSelectedSort] = useState(urlSort);
  const [searchQuery, setSearchQuery] = useState(urlSearchQuery);
  const [minPrice, setMinPrice] = useState(urlMinPrice);
  const [maxPrice, setMaxPrice] = useState(urlMaxPrice);
  const [selectedBrand, setSelectedBrand] = useState(urlBrand);
  // 🏷️ FILTRO DE DESCUENTOS: Estado para el filtro
  const [saleFilter, setSaleFilter] = useState(urlSaleFilter);

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<{ slug: string; name: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  // 🔄 Control de hidratación para evitar errores SSR
  useEffect(() => { setMounted(true); }, []);

  // 🔗 SINCRONIZACIÓN: Sincronizar estados con parámetros de URL
  useEffect(() => { 
    setSearchQuery(urlSearchQuery); 
    setSaleFilter(urlSaleFilter);  // 🏷️ Sincronizar filtro de descuentos
  }, [urlSearchQuery, urlSaleFilter]);
  
  useEffect(() => { setSelectedCategory(urlCategory); }, [urlCategory]);
  useEffect(() => { setSelectedBrand(urlBrand); }, [urlBrand]);
  useEffect(() => { setSelectedSort(urlSort); }, [urlSort]);
  useEffect(() => { setMinPrice(urlMinPrice); }, [urlMinPrice]);
  useEffect(() => { setMaxPrice(urlMaxPrice); }, [urlMaxPrice]);

  // ⚡ Debounce para optimizar búsquedas (evita consultas excesivas)
  const debouncedSearch = useDebounce(searchQuery);

  // 📂 Carga inicial de categorías
  useEffect(() => {
    fetch("/api/categorias")
      .then((res) => { if (!res.ok) throw new Error('Error categorías'); return res.json(); })
      .then(setCategories)
      .catch(err => console.error("Error fetching categories:", err));
  }, []);

  // 🔍 Función principal para buscar productos con filtros
  const fetchProducts = useCallback(() => {
    setLoading(true); 
    setError(null);
    
    // 🔧 PARÁMETROS DE CONSULTA: Construir parámetros para la API
    const params = new URLSearchParams();
    if (selectedCategory !== "all") params.append("category", selectedCategory);
    if (selectedBrand !== "all") params.append("brand", selectedBrand);
    if (minPrice) params.append("minPrice", minPrice);
    if (maxPrice) params.append("maxPrice", maxPrice);
    if (debouncedSearch) params.append("search", debouncedSearch);
    if (selectedSort !== "default") params.append("sort", selectedSort);
    if (saleFilter) params.append("sale", "true");  // 🏷️ Agregar filtro de descuentos
    const queryString = params.toString();

    // 🔗 Actualización de URL sin recarga de página
    if (mounted && typeof window !== 'undefined' && window.location.search !== (queryString ? `?${queryString}` : '')) {
        router.replace(`${pathname}${queryString ? `?${queryString}` : ''}`, { scroll: false });
    }
    
    // 📡 Petición a la API de productos
    fetch(`/api/products?${queryString}`)
      .then(async (res) => { if (!res.ok) { const errBody = await res.text(); throw new Error(`API Error: ${res.status} ${errBody}`); } return res.json(); })
      .then(data => setProducts(Array.isArray(data) ? data : []))
      .catch(err => { setError(err.message); setProducts([]); })
      .finally(() => setLoading(false));
  // 🔄 DEPENDENCIAS: Incluir saleFilter en las dependencias del useCallback
  }, [selectedCategory, selectedBrand, minPrice, maxPrice, debouncedSearch, selectedSort, saleFilter, pathname, router, mounted]);

  // 🔄 Ejecutar búsqueda cuando cambien los filtros
  useEffect(() => {
    if (mounted) fetchProducts();
  }, [fetchProducts, mounted]);

  // 🧹 FUNCIÓN DE LIMPIEZA: Resetear todos los filtros
  const resetFilters = () => {
    setSelectedCategory("all"); 
    setSelectedSort("default"); 
    setSearchQuery("");
    setMinPrice(""); 
    setMaxPrice(""); 
    setSelectedBrand("all");
    setSaleFilter(false);  // 🏷️ Resetear filtro de descuentos
  };

  // ⏳ Loading inicial antes del montaje
  if (!mounted && loading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <RefreshCw className="h-10 w-10 text-orange-500 animate-spin" />
        <p className="ml-3 text-lg text-gray-600">Cargando...</p>
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* 📋 TÍTULO PRINCIPAL - PERSONALIZABLE: Cambia text-3xl md:text-4xl por el tamaño deseado */}
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center md:text-left">
        Nuestros Productos
      </h1>
      
      {/* 🔍 CONTENEDOR DE BÚSQUEDA - PERSONALIZABLE: Solo barra de búsqueda visible */}
      <div className="mb-10 max-w-2xl mx-auto">
        {/* 🎨 CONTENEDOR PRINCIPAL - PERSONALIZABLE: Cambia shadow-xl, rounded-2xl, colores */}
        <div className="p-5 md:p-6 bg-white shadow-xl rounded-2xl border border-gray-200/80">
          <div className="w-full">
            {/* 🏷️ LABEL DE BÚSQUEDA - PERSONALIZABLE: Modifica text-sm, font-medium, colores */}
            <Label htmlFor="search" className="block text-sm font-medium text-gray-800 mb-1.5">
              Buscar Producto
            </Label>
            <div className="relative">
              {/* 📝 INPUT DE BÚSQUEDA - PERSONALIZABLE: Cambia h-12, text-base, placeholder */}
              <Input 
                id="search" 
                type="text" 
                placeholder="Busca por nombre, marca, categoría..." 
                value={searchQuery} 
                onChange={(e) => setSearchQuery(e.target.value)} 
                className="pr-14 w-full h-12 text-base"
              />
              {/* 🔍 BOTÓN DE BÚSQUEDA - PERSONALIZABLE: Modifica colores hover, tamaño h-10 w-10 */}
              <Button 
                type="submit"
                variant="ghost" 
                size="icon" 
                className="absolute right-1 h-10 w-10 rounded-full hover:bg-gradient-to-r hover:from-orange-400 hover:to-red-500 hover:text-white transition-all duration-300"
                aria-label="Buscar"
              >
                <Search className="h-5 w-5" />
              </Button>
            </div>

            {/* 🏷️ CONTENEDOR DEL FILTRO DE DESCUENTOS */}
            <div className="mt-4 flex flex-col items-center gap-2">
              <div className="flex gap-2">
                {/* 🏷️ BOTÓN PRINCIPAL DEL FILTRO - PERSONALIZABLE: Cambia colores, gradientes */}
                <Button
                  variant={saleFilter ? "default" : "outline"}  // Cambia estilo según estado
                  size="sm"
                  onClick={() => setSaleFilter(!saleFilter)}   // Toggle del filtro
                  className={`flex items-center gap-2 transition-all duration-200 ${
                    saleFilter 
                      ? "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white" 
                      : "hover:bg-orange-50 hover:border-orange-300 hover:text-orange-700"
                  }`}
                >
                  <Tag className="h-4 w-4" />
                  En Descuento
                </Button>
                {/* 🧹 BOTÓN LIMPIAR (Condicional) - PERSONALIZABLE: Cambia colores hover */}
                {(searchQuery || saleFilter) && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={resetFilters}
                    className="text-gray-600 hover:text-gray-800 hover:bg-gray-100 transition-all duration-200"
                  >
                    Limpiar
                  </Button>
                )}
              </div>
            </div>

            {/* 📊 INDICADOR DE FILTROS ACTIVOS - PERSONALIZABLE: Cambia colores de badges */}
            {(searchQuery || saleFilter) && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex flex-wrap gap-2 text-sm text-gray-600">
                  <span>Filtros activos:</span>
                  {searchQuery && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                      Búsqueda: &ldquo;{searchQuery}&rdquo;
                    </span>
                  )}
                  {saleFilter && (  // 🏷️ Indicador específico para descuentos
                    <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs">
                      En Descuento
                    </span>
                  )}
                </div>
              </div>
            )}
            
            {/* 📊 Mostrar otros filtros activos si existen (vienen por URL) */}
            {(selectedCategory !== "all" || selectedBrand !== "all" || minPrice || maxPrice || selectedSort !== "default") && (
              <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-2 items-center text-sm text-blue-700">
                    <span className="font-medium">Otros filtros:</span>
                    {selectedCategory !== "all" && (
                      <span className="bg-blue-100 px-2 py-1 rounded">
                        Categoría: {categories.find(c => c.slug === selectedCategory)?.name || selectedCategory}
                      </span>
                    )}
                    {selectedBrand !== "all" && (
                      <span className="bg-blue-100 px-2 py-1 rounded">
                        Marca: {selectedBrand}
                      </span>
                    )}
                  </div>
                  <Button 
                    onClick={resetFilters} 
                    variant="outline" 
                    size="sm"
                    className="text-xs border-blue-300 hover:bg-blue-100 text-blue-700"
                  >
                    <XCircle className="mr-1 h-3 w-3" /> Limpiar Todo
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* ⏳ ESTADO DE CARGA - PERSONALIZABLE: Modifica spinner, colores, texto */}
      {loading && !error && (
        <div className="flex flex-col items-center justify-center min-h-[300px] py-10 text-center">
          <RefreshCw className="h-10 w-10 text-orange-500 animate-spin" />
          <p className="ml-3 mt-3 text-lg text-gray-600">Cargando productos...</p>
        </div>
      )}
      
      {/* ❌ ESTADO DE ERROR - PERSONALIZABLE: Cambia colores, texto, padding */}
      {!loading && error && (
        <div className="text-center text-red-700 py-12 bg-red-50 p-6 rounded-lg shadow-md border border-red-200">
          <h2 className="font-semibold text-xl mb-2">¡Ups! Algo salió mal</h2>
          <p className="text-md">{error}</p>
          <p className="text-sm mt-4">Intenta refrescar la página o ajustar tus filtros.</p>
        </div>
      )}
      
      {/* 🔲 GRID DE PRODUCTOS - PERSONALIZABLE: Modifica grid-cols para cantidad por fila, gap para espaciado */}
      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8">
          {products.length > 0 ? (
            products.map((product) => (
              // 🃏 NOTA: ProductCard es un componente separado donde puedes personalizar la presentación individual
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            /* 🔍 ESTADO SIN PRODUCTOS - PERSONALIZABLE: Cambia icon size, colores, texto */
            <div className="col-span-full text-center py-16">
              <Search className="mx-auto h-20 w-20 text-gray-300 mb-6" />
              <h2 className="text-2xl font-semibold text-gray-700 mb-3">
                No se encontraron productos
              </h2>
              {/* 📝 MENSAJE PERSONALIZADO CUANDO NO HAY PRODUCTOS */}
              <p className="text-gray-600 max-w-md mx-auto">
                {saleFilter 
                  ? "No hay productos en descuento que coincidan con tu búsqueda."  // Mensaje específico para descuentos
                  : "Intenta con diferentes palabras clave para encontrar lo que buscas."
                }
              </p>
            </div>
          )}
        </div>
      )}
    </main>
  );
}

// 🎭 Wrapper con Suspense para manejar la carga de la página
export default function ProductsPageWrapper() {
  return (
    <Suspense fallback={
      /* ⏳ FALLBACK DE SUSPENSE - PERSONALIZABLE: Modifica spinner, colores, texto */
      <div className="flex justify-center items-center min-h-screen">
        <RefreshCw className="h-12 w-12 text-orange-500 animate-spin" />
        <p className="ml-4 text-xl text-gray-700">Cargando página de productos...</p>
      </div>
    }>
      <ProductsPageContent />
    </Suspense>
  );
}

// ============================================================================
// 🎨 GUÍA COMPLETA DE PERSONALIZACIÓN
// ============================================================================
//
// 📐 TAMAÑOS Y DIMENSIONES:
// - Títulos: text-xs, text-sm, text-base, text-lg, text-xl, text-2xl, text-3xl, text-4xl
// - Alturas: h-8, h-10, h-12, h-16 (para inputs y botones)
// - Anchos: w-full, w-1/2, w-1/3, max-w-sm, max-w-md, max-w-lg, max-w-xl, max-w-2xl
// - Padding: p-2, p-4, p-6, p-8 (espaciado interno)
// - Margin: m-2, m-4, m-6, m-8, mb-4, mt-4 (espaciado externo)
//
// 🎨 COLORES PRINCIPALES:
// - Naranja: orange-50, orange-100, orange-300, orange-400, orange-500, orange-600
// - Rojo: red-50, red-100, red-300, red-400, red-500, red-600
// - Azul: blue-50, blue-100, blue-300, blue-400, blue-500, blue-600
// - Gris: gray-50, gray-100, gray-300, gray-400, gray-500, gray-600, gray-700, gray-800
//
// 📱 RESPONSIVE (PANTALLAS):
// - sm: (640px+) - Tablets pequeñas
// - md: (768px+) - Tablets
// - lg: (1024px+) - Desktop pequeño
// - xl: (1280px+) - Desktop grande
//
// 🔲 GRID DE PRODUCTOS:
// - 1 columna móvil: grid-cols-1
// - 2 columnas tablet: sm:grid-cols-2
// - 3 columnas desktop: md:grid-cols-3
// - 4 columnas desktop grande: lg:grid-cols-4
// - Espaciado: gap-x-4 gap-y-6 (horizontal y vertical)
//
// ⚡ ANIMACIONES Y TRANSICIONES:
// - Duración: duration-200, duration-300, duration-500
// - Efectos: transition-all, transition-colors, transition-transform
// - Hover: hover:scale-105, hover:shadow-lg, hover:bg-color
//
// 🎭 EFECTOS VISUALES:
// - Sombras: shadow-sm, shadow, shadow-lg, shadow-xl
// - Bordes redondeados: rounded, rounded-lg, rounded-xl, rounded-2xl
// - Bordes: border, border-2, border-gray-200, border-orange-300
//
// 🔧 COMPONENTES PERSONALIZABLES:
// - ProductCard: El componente individual de cada producto
// - Input: Campo de búsqueda principal
// - Button: Botones de filtro y acciones
// - Label: Etiquetas de los campos
//
// 📊 ESTADOS DE LA APLICACIÓN:
// - Loading: Spinner de carga
// - Error: Mensaje de error
// - Empty: Sin productos encontrados
// - Success: Productos mostrados
// ============================================================================