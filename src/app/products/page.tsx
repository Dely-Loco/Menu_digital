// src/app/products/page.tsx
"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import type { Product } from "@/types";
import ProductCard from "@/components/shared/product-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Search, RefreshCw, Tag } from "lucide-react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

// Hook personalizado para debounce - PERSONALIZABLE: Cambia el delay (500ms por defecto)
function useDebounce(value: string, delay = 500) { // 🔧 MODIFICABLE: Ajusta el delay para búsqueda más rápida o lenta
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounced(value);
    }, delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debounced;
}

function ProductsPageContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParamsHook = useSearchParams();

  // Obtener parámetros de URL para mantener estado entre navegaciones
  const urlSearchQuery = searchParamsHook.get("search") || "";
  // 🆕 NUEVO: Obtener parámetro de descuento de la URL
  const urlSaleFilter = searchParamsHook.get("sale") === "true";

  // Estados para filtros - BÚSQUEDA Y DESCUENTO
  const [searchQuery, setSearchQuery] = useState(urlSearchQuery);
  // 🆕 NUEVO: Estado para filtro de descuento
  const [saleFilter, setSaleFilter] = useState(urlSaleFilter);

  // Estados para datos y UI
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  // Control de hidratación para evitar errores de SSR
  useEffect(() => { setMounted(true); }, []);

  // Sincronizar estados con parámetros de URL
  useEffect(() => { 
    setSearchQuery(urlSearchQuery); 
    setSaleFilter(urlSaleFilter);
  }, [urlSearchQuery, urlSaleFilter]);

  // Búsqueda con debounce para evitar muchas consultas
  const debouncedSearch = useDebounce(searchQuery);

  // Función principal para obtener productos con filtros aplicados
  const fetchProducts = useCallback(() => {
    setLoading(true); 
    setError(null);
    
    // Construir parámetros de consulta - BÚSQUEDA Y DESCUENTO
    const params = new URLSearchParams();
    if (debouncedSearch) params.append("search", debouncedSearch);
    // 🆕 NUEVO: Agregar parámetro de descuento
    if (saleFilter) params.append("sale", "true");
    
    const queryString = params.toString();

    // Actualizar URL sin recargar página
    if (mounted && typeof window !== 'undefined' && window.location.search !== (queryString ? `?${queryString}` : '')) {
        router.replace(`${pathname}${queryString ? `?${queryString}` : ''}`, { scroll: false });
    }
    
    // Realizar petición a API
    fetch(`/api/products?${queryString}`)
      .then(async (res) => { 
        if (!res.ok) { 
          const errBody = await res.text(); 
          throw new Error(`API Error: ${res.status} ${errBody}`); 
        } 
        return res.json(); 
      })
      .then(data => setProducts(Array.isArray(data) ? data : []))
      .catch(err => { setError(err.message); setProducts([]); })
      .finally(() => setLoading(false));
  }, [debouncedSearch, saleFilter, pathname, router, mounted]); // 🆕 NUEVO: Agregado saleFilter a dependencias

  // Ejecutar búsqueda cuando cambien los filtros
  useEffect(() => {
    if (mounted) fetchProducts();
  }, [fetchProducts, mounted]);

  // 🆕 NUEVO: Función para limpiar filtros
  const clearFilters = () => {
    setSearchQuery("");
    setSaleFilter(false);
  };

  // Loader inicial mientras el componente se monta
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
      {/* 🎨 TÍTULO PRINCIPAL - PERSONALIZABLE */}
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center md:text-left">
        {/* 🔧 MODIFICABLE: Cambia el texto, tamaño (text-3xl md:text-4xl), color, alineación */}
        Nuestros Productos
      </h1>
      
      {/* 🎨 PANEL DE BÚSQUEDA Y FILTROS - COMPLETAMENTE PERSONALIZABLE */}
      <div className="mb-10 p-5 md:p-6 bg-white shadow-xl rounded-2xl border border-gray-200/80">
        {/* 🔧 MODIFICABLE: Cambia padding (p-5 md:p-6), color de fondo (bg-white), sombra (shadow-xl), bordes (rounded-2xl) */}
        
        <div className="flex flex-col lg:flex-row items-center justify-center gap-4">
          {/* 🔧 MODIFICABLE: Cambia la alineación y distribución del contenedor */}
          
          {/* CAMPO DE BÚSQUEDA */}
          <div className="w-full max-w-md">
            {/* 🔧 MODIFICABLE: Cambia el ancho máximo (max-w-md) para hacer el campo más ancho o estrecho */}
            <Label htmlFor="search" className="block text-sm font-medium text-gray-800 mb-1.5">
              {/* 🔧 MODIFICABLE: Cambia texto, tamaño (text-sm), color (text-gray-800) */}
              Buscar Producto
            </Label>
            <div className="relative">
              <Input 
                id="search" 
                type="text" 
                placeholder="Nombre, marca, categoría..." 
                // 🔧 MODIFICABLE: Cambia el placeholder
                value={searchQuery} 
                onChange={(e) => setSearchQuery(e.target.value)} 
                className="pr-12 w-full h-10 text-sm"
                // 🔧 MODIFICABLE: Cambia altura (h-10), tamaño de texto (text-sm)
              />
              <Button 
                type="submit"
                variant="ghost" 
                size="icon" 
                className="absolute right-1 h-9 w-9 rounded-full hover:bg-gradient-to-r hover:from-orange-400 hover:to-red-500 hover:text-white transition-all duration-300"
               // 🔧 MODIFICABLE: Cambia colores del hover (hover:from-orange-400 hover:to-red-500), tamaño (h-9 w-9)
                aria-label="Buscar"
              >
                <Search className="h-4 w-4" />
                {/* 🔧 MODIFICABLE: Cambia tamaño del ícono (h-4 w-4) */}
              </Button>
            </div>
          </div>

          {/* 🆕 NUEVO: FILTRO DE DESCUENTOS */}
          <div className="flex flex-col items-center gap-2">
            <Label className="text-sm font-medium text-gray-800">
              Filtros
            </Label>
            <div className="flex gap-2">
              {/* Botón de filtro de descuentos */}
              <Button
                variant={saleFilter ? "default" : "outline"}
                size="sm"
                onClick={() => setSaleFilter(!saleFilter)}
                className={`flex items-center gap-2 transition-all duration-200 ${
                  saleFilter 
                    ? "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white" 
                    : "hover:bg-orange-50 hover:border-orange-300 hover:text-orange-700"
                }`}
                // 🔧 MODIFICABLE: Cambia colores del gradiente y estados hover
              >
                <Tag className="h-4 w-4" />
                {/* 🔧 MODIFICABLE: Cambia el ícono o su tamaño */}
                En Descuento
                {/* 🔧 MODIFICABLE: Cambia el texto del botón */}
              </Button>

              {/* Botón para limpiar filtros - Solo aparece si hay filtros activos */}
              {(searchQuery || saleFilter) && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="text-gray-600 hover:text-gray-800 hover:bg-gray-100 transition-all duration-200"
                  // 🔧 MODIFICABLE: Cambia colores y efectos hover
                >
                  Limpiar
                  {/* 🔧 MODIFICABLE: Cambia el texto */}
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* 🆕 NUEVO: Indicador de filtros activos */}
        {(searchQuery || saleFilter) && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex flex-wrap gap-2 text-sm text-gray-600">
              <span>Filtros activos:</span>
              {searchQuery && (
                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                  Búsqueda: &ldquo;{searchQuery}&rdquo;
                </span>
              )}
              {saleFilter && (
                <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs">
                  En Descuento
                </span>
              )}
            </div>
          </div>
        )}
      </div>
      
      {/* 🎨 ESTADO DE CARGA - PERSONALIZABLE */}
      {loading && !error && (
        <div className="flex flex-col items-center justify-center min-h-[300px] py-10 text-center">
          {/* 🔧 MODIFICABLE: Cambia altura mínima (min-h-[300px]), padding (py-10) */}
          <RefreshCw className="h-10 w-10 text-orange-500 animate-spin" />
          {/* 🔧 MODIFICABLE: Cambia tamaño (h-10 w-10) y color (text-orange-500) */}
          <p className="ml-3 mt-3 text-lg text-gray-600">
            {/* 🔧 MODIFICABLE: Cambia espaciado (ml-3 mt-3), tamaño (text-lg), color (text-gray-600) */}
            Cargando productos...
            {/* 🔧 MODIFICABLE: Cambia el texto */}
          </p>
        </div>
      )}
      
      {/* 🎨 ESTADO DE ERROR - PERSONALIZABLE */}
      {!loading && error && (
        <div className="text-center text-red-700 py-12 bg-red-50 p-6 rounded-lg shadow-md border border-red-200">
          {/* 🔧 MODIFICABLE: Cambia colores (text-red-700, bg-red-50, border-red-200), padding (py-12 p-6), bordes (rounded-lg) */}
          <h2 className="font-semibold text-xl mb-2">
            {/* 🔧 MODIFICABLE: Cambia tamaño (text-xl), peso (font-semibold), espaciado (mb-2) */}
            ¡Ups! Algo salió mal
            {/* 🔧 MODIFICABLE: Cambia el texto */}
          </h2>
          <p className="text-md">{error}</p>
          <p className="text-sm mt-4">
            {/* 🔧 MODIFICABLE: Cambia tamaño (text-sm) y espaciado (mt-4) */}
            Intenta refrescar la página o ajustar tu búsqueda.
            {/* 🔧 MODIFICABLE: Cambia el texto de ayuda */}
          </p>
        </div>
      )}
      
      {/* 🎨 GRID DE PRODUCTOS - MUY PERSONALIZABLE */}
      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8">
          {/* 🔧 MODIFICABLE: Ajusta columnas responsive (sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4) y espaciado (gap-x-6 gap-y-8) */}
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
              // 🔧 NOTA: El estilo de las tarjetas se personaliza en el componente ProductCard
            ))
          ) : (
            // 🎨 ESTADO SIN PRODUCTOS - PERSONALIZABLE
            <div className="col-span-full text-center py-16">
              {/* 🔧 MODIFICABLE: Cambia padding vertical (py-16) */}
              <Search className="mx-auto h-20 w-20 text-gray-300 mb-6" />
              {/* 🔧 MODIFICABLE: Cambia tamaño del ícono (h-20 w-20), color (text-gray-300), espaciado (mb-6) */}
              <h2 className="text-2xl font-semibold text-gray-700 mb-3">
                {/* 🔧 MODIFICABLE: Cambia tamaño (text-2xl), peso (font-semibold), color (text-gray-700) */}
                No se encontraron productos
                {/* 🔧 MODIFICABLE: Cambia el texto */}
              </h2>
              <p className="text-gray-600 max-w-md mx-auto">
                {/* 🔧 MODIFICABLE: Cambia color (text-gray-600) y ancho máximo (max-w-md) */}
                {saleFilter 
                  ? "No hay productos en descuento que coincidan con tu búsqueda."
                  : "Intenta con diferentes palabras clave para encontrar lo que buscas."
                }
                {/* 🔧 MODIFICABLE: Cambia el texto de ayuda */}
              </p>
            </div>
          )}
        </div>
      )}
    </main>
  );
}

// Componente wrapper con Suspense para manejo de carga
export default function ProductsPageWrapper() {
  return (
    <Suspense fallback={
      // 🎨 FALLBACK DE SUSPENSE - PERSONALIZABLE
      <div className="flex justify-center items-center min-h-screen">
        {/* 🔧 MODIFICABLE: Cambia altura (min-h-screen) */}
        <RefreshCw className="h-12 w-12 text-orange-500 animate-spin" />
        {/* 🔧 MODIFICABLE: Cambia tamaño (h-12 w-12) y color (text-orange-500) */}
        <p className="ml-4 text-xl text-gray-700">
          {/* 🔧 MODIFICABLE: Cambia espaciado (ml-4), tamaño (text-xl), color (text-gray-700) */}
          Cargando página de productos...
          {/* 🔧 MODIFICABLE: Cambia el texto */}
        </p>
      </div>
    }>
      <ProductsPageContent />
    </Suspense>
  );
}

/*
🎯 GUÍA RÁPIDA DE PERSONALIZACIÓN - VERSIÓN CON FILTRO DE DESCUENTOS

📐 CAMBIOS REALIZADOS:
- ✅ Agregado filtro de descuentos con botón toggle
- ✅ Indicador de filtros activos
- ✅ Botón "Limpiar" que aparece cuando hay filtros
- ✅ Sincronización con URL para mantener estado
- ✅ Mensaje específico cuando no hay productos en descuento
- ✅ Mantenido el mismo estilo y estructura existente

🔧 NUEVOS ELEMENTOS PERSONALIZABLES:
1. Botón de descuento (línea 181): Cambia colores del gradiente
2. Indicadores de filtros activos (línea 205): Personaliza colores y forma
3. Botón "Limpiar" (línea 193): Ajusta estilo y comportamiento
4. Texto del filtro: Cambia "En Descuento" por otro texto
5. Mensajes sin productos: Diferentes mensajes según filtros activos

🎨 COLORES DEL FILTRO DE DESCUENTOS:
- Activo: bg-gradient-to-r from-orange-500 to-red-500
- Hover activo: hover:from-orange-600 hover:to-red-600
- Inactivo hover: hover:bg-orange-50 hover:border-orange-300

🚀 CÓMO USAR:
1. Reemplaza tu archivo route.ts con el código del primer artifact
2. Reemplaza tu archivo page.tsx con el código del segundo artifact
3. Ahora puedes usar <Link href="/products?sale=true"> en cualquier parte
4. El filtro se activa automáticamente y se mantiene en la URL

✨ FUNCIONALIDADES NUEVAS:
- Botón toggle para filtrar productos en descuento
- Los filtros se reflejan en la URL (?sale=true)
- Indicador visual de filtros activos
- Botón para limpiar todos los filtros
- Mensaje específico cuando no hay productos en descuento
- Compatible con búsqueda simultánea

🔗 TU LINK FUNCIONARÁ ASÍ:
<Link href="/products?sale=true">Ver Ofertas</Link>
*/