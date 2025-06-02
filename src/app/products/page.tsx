// src/app/products/page.tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import Link from 'next/link';
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
import { Search, RefreshCw, XCircle } from "lucide-react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Label } from "@/components/ui/label";

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

// Helper para formatear precios (si no lo tienes global)
const formatCurrencyCOP = (value?: number): string => {
  if (typeof value !== 'number') return '$0';
  return value.toLocaleString('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
};


export default function ProductsPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParamsHook = useSearchParams();

  // Leer parámetros de la URL en cada renderización para sincronización
  const urlSearchQuery = searchParamsHook.get("search") || "";
  const urlCategory = searchParamsHook.get("category") || "all";
  const urlBrand = searchParamsHook.get("brand") || "all";
  const urlSort = searchParamsHook.get("sort") || "default";
  const urlMinPrice = searchParamsHook.get("minPrice") || "";
  const urlMaxPrice = searchParamsHook.get("maxPrice") || "";

  // Estados locales para los filtros
  const [selectedCategory, setSelectedCategory] = useState(urlCategory);
  const [selectedSort, setSelectedSort] = useState(urlSort);
  const [searchQuery, setSearchQuery] = useState(urlSearchQuery);
  const [minPrice, setMinPrice] = useState(urlMinPrice);
  const [maxPrice, setMaxPrice] = useState(urlMaxPrice);
  const [selectedBrand, setSelectedBrand] = useState(urlBrand);

  // Estados para datos y UI
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<{ slug: string; name: string }[]>([]);
  const [allBrands, setAllBrands] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);


  // Efectos para sincronizar estados con URL params
  useEffect(() => { setSearchQuery(urlSearchQuery); }, [urlSearchQuery]);
  useEffect(() => { setSelectedCategory(urlCategory); }, [urlCategory]);
  useEffect(() => { setSelectedBrand(urlBrand); }, [urlBrand]);
  useEffect(() => { setSelectedSort(urlSort); }, [urlSort]);
  useEffect(() => { setMinPrice(urlMinPrice); }, [urlMinPrice]);
  useEffect(() => { setMaxPrice(urlMaxPrice); }, [urlMaxPrice]);

  const debouncedSearch = useDebounce(searchQuery);

  // Carga inicial de categorías y marcas
  useEffect(() => {
    setMounted(true); // Indicar que el componente ya se montó en el cliente
    // Fetch de categorías
    fetch("/api/categorias") // Corregido a /api/categorias
      .then((res) => {
        if (!res.ok) { console.error("Error status categorías:", res.status); throw new Error('Error al cargar categorías');}
        return res.json();
      })
      .then(setCategories)
      .catch(err => {
        console.error("Error fetching categories:", err);
        // Podrías establecer un error específico para categorías si quieres
      });
    
    // Fetch de marcas
    fetch("/api/brands") // Asumo que esta API existe y devuelve string[]
      .then((res) => {
        if (!res.ok) { console.error("Error status marcas:", res.status); throw new Error('Error al cargar marcas');}
        return res.json();
      })
      .then(setAllBrands)
      .catch(err => {
        console.error("Error fetching brands:", err);
      });
  }, []); // Se ejecuta solo una vez al montar

  // Función para obtener productos filtrados
  const fetchProducts = useCallback(() => {
    setLoading(true);
    setError(null);
    
    const params = new URLSearchParams();
    if (selectedCategory !== "all") params.append("category", selectedCategory);
    if (selectedBrand !== "all") params.append("brand", selectedBrand);
    if (minPrice) params.append("minPrice", minPrice);
    if (maxPrice) params.append("maxPrice", maxPrice);
    if (debouncedSearch) params.append("search", debouncedSearch);
    if (selectedSort !== "default") params.append("sort", selectedSort);

    const queryString = params.toString();
    // Actualizar URL solo si los parámetros han cambiado
    if (mounted && typeof window !== 'undefined' && window.location.search !== (queryString ? `?${queryString}` : '')) {
        router.replace(`${pathname}${queryString ? `?${queryString}` : ''}`, { scroll: false });
    }
    
    fetch(`/api/products?${queryString}`)
      .then(async (res) => {
        if (!res.ok) {
          const errorBody = await res.text();
          console.error('Frontend: API Error Response Body para productos:', errorBody);
          throw new Error(`Error al cargar productos (estado: ${res.status})`);
        }
        return res.json();
      })
      .then((data) => {
        setProducts(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error('Frontend: Error en fetchProducts catch:', err);
        setError(err.message || "Ocurrió un error cargando productos.");
        setProducts([]);
      })
      .finally(() => setLoading(false));
  }, [
    selectedCategory, selectedBrand, minPrice, maxPrice, debouncedSearch,
    selectedSort, pathname, router, mounted // Añadido mounted para evitar replace en el primer render del servidor
  ]);

  // Efecto para recargar productos cuando los filtros cambian
  useEffect(() => {
    if(mounted) { // Solo fetchear productos si el componente está montado
        fetchProducts();
    }
  }, [fetchProducts, mounted]); // Ahora depende de mounted también

  const resetFilters = () => {
    setSelectedCategory("all");
    setSelectedSort("default");
    setSearchQuery("");
    setMinPrice("");
    setMaxPrice("");
    setSelectedBrand("all");
    // La URL se actualizará por fetchProducts
  };

  // Si aún no se ha montado en el cliente, podrías mostrar un loader más genérico
  // o simplemente no renderizar los filtros hasta que mounted sea true.
  // Por ahora, el loader principal de 'loading' cubrirá esto.

  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center md:text-left">Nuestros Productos</h1>
      
      {/* Panel de Filtros */}
      <div className="mb-10 p-4 md:p-6 bg-white shadow-xl rounded-2xl border border-gray-200/80">
        <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-12 items-end">
          
          {/* Búsqueda */}
          <div className="lg:col-span-4 xl:col-span-3">
            <Label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1.5">Buscar Producto</Label>
            <div className="relative">
              <Input id="search" type="text" placeholder="Escribe nombre, marca, etiqueta..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pr-10 w-full text-sm py-2.5" />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
          
          {/* Categoría */}
          <div className="lg:col-span-3 xl:col-span-2">
            <Label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1.5">Categoría</Label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger id="category" className="w-full text-sm py-2.5"><SelectValue placeholder="Todas" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Seleccionar</SelectItem>
                {categories.map((cat) => (<SelectItem key={cat.slug} value={cat.slug}>{cat.name}</SelectItem>))}
              </SelectContent>
            </Select>
          </div>
          
          {/* Marca */}
          <div className="lg:col-span-3 xl:col-span-2">
            <Label htmlFor="brand" className="block text-sm font-medium text-gray-700 mb-1.5">Marca</Label>
            <Select value={selectedBrand} onValueChange={setSelectedBrand}>
              <SelectTrigger id="brand" className="w-full text-sm py-2.5"><SelectValue placeholder="Todas" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Seleccionar</SelectItem>
                {allBrands.map((brandName) => (<SelectItem key={brandName} value={brandName}>{brandName}</SelectItem>))}
              </SelectContent>
            </Select>
          </div>
          
          {/* Ordenar Por */}
          <div className="lg:col-span-2 xl:col-span-2">
            <Label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-1.5">Ordenar Por</Label>
            <Select value={selectedSort} onValueChange={setSelectedSort}>
              <SelectTrigger id="sort" className="w-full text-sm py-2.5"><SelectValue placeholder="Defecto" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Seleccionar</SelectItem>
                <SelectItem value="price-asc">Precio: Menor a Mayor</SelectItem>
                <SelectItem value="price-desc">Precio: Mayor a Menor</SelectItem>
                <SelectItem value="rating-desc">Popularidad</SelectItem>
                <SelectItem value="name-asc">Nombre: A a Z</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Precio Mín. */}
          <div className="xl:col-span-1">
            <Label htmlFor="min-price" className="block text-sm font-medium text-gray-700 mb-1.5">$ Mín.</Label>
            <Input id="min-price" type="number" placeholder="0" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} className="w-full text-sm py-2.5" />
          </div>

          {/* Precio Máx. */}
          <div className="xl:col-span-1">
            <Label htmlFor="max-price" className="block text-sm font-medium text-gray-700 mb-1.5">$ Máx.</Label>
            <Input id="max-price" type="number" placeholder="Cualquiera" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} className="w-full text-sm py-2.5" />
          </div>
          
          {/* Botón Limpiar Filtros */}
          <div className="lg:col-span-full xl:col-span-1 flex items-end"> {/* Ocupa todo el ancho en LG, luego se ajusta */}
            <Button onClick={resetFilters} variant="outline" className="w-full text-sm py-2.5 border-gray-300 hover:bg-gray-100">
                <XCircle className="mr-1.5 h-4 w-4" /> Limpiar
            </Button>
          </div>
        </div>
      </div>
      
      {/* Sección de Resultados */}
      {loading && !error && ( // Mostrar loader solo si está cargando y no hay error previo
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
      
      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="col-span-full text-center py-16">
              <Search className="mx-auto h-20 w-20 text-gray-300 mb-6" /> {/* Icono más sutil */}
              <h2 className="text-2xl font-semibold text-gray-700 mb-3">No se encontraron productos</h2>
              <p className="text-gray-500 max-w-md mx-auto">
                Intenta con diferentes palabras clave o ajustando los filtros.
              </p>
            </div>
          )}
        </div>
      )}
    </main>
  );
}