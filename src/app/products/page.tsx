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

export default function ProductsPage() {
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

  useEffect(() => {
    setSearchQuery(urlSearchQuery);
  }, [urlSearchQuery]);

  useEffect(() => {
    setSelectedCategory(urlCategory);
  }, [urlCategory]);

  useEffect(() => {
    setSelectedBrand(urlBrand);
  }, [urlBrand]);

  useEffect(() => {
    setSelectedSort(urlSort);
  }, [urlSort]);

  useEffect(() => {
    setMinPrice(urlMinPrice);
  }, [urlMinPrice]);

  useEffect(() => {
    setMaxPrice(urlMaxPrice);
  }, [urlMaxPrice]);

  const debouncedSearch = useDebounce(searchQuery);

  useEffect(() => {
    console.log(">>> debouncedSearch cambió a:", debouncedSearch);
  }, [debouncedSearch]);

  useEffect(() => {
    // setLoading(true); // setLoading se maneja dentro de fetchProducts
    fetch("/api/categorias")
      .then((res) => {
        if (!res.ok) throw new Error('Error al cargar categorías');
        return res.json();
      })
      .then(setCategories)
      .catch(err => {
        console.error("Error fetching categories:", err);
        // No establecer error principal aquí para no sobrescribir error de productos
      });
    
    fetch("/api/brands")
      .then((res) => {
        if (!res.ok) throw new Error('Error al cargar marcas');
        return res.json();
      })
      .then(setAllBrands)
      .catch(err => {
        console.error("Error fetching brands:", err);
      });
  }, []);

  const fetchProducts = useCallback(() => {
    console.log(">>> fetchProducts useCallback SE RE-CREÓ. Dependencias:", {
      selectedCategory, selectedBrand, minPrice, maxPrice, debouncedSearch, selectedSort
    });
    setLoading(true);
    setError(null);
    console.log(">>> fetchProducts CALLED. Current debouncedSearch:", debouncedSearch);
    
    const params = new URLSearchParams();
    if (selectedCategory !== "all") params.append("category", selectedCategory);
    if (selectedBrand !== "all") params.append("brand", selectedBrand);
    if (minPrice) params.append("minPrice", minPrice);
    if (maxPrice) params.append("maxPrice", maxPrice);
    if (debouncedSearch) params.append("search", debouncedSearch);
    if (selectedSort !== "default") params.append("sort", selectedSort);

    const queryString = params.toString();
    if (typeof window !== 'undefined' && window.location.search !== (queryString ? `?${queryString}` : '')) {
        router.replace(`${pathname}${queryString ? `?${queryString}` : ''}`, { scroll: false });
    }
    
    console.log('>>> Frontend: Parámetros enviados a /api/products:', queryString);

    fetch(`/api/products?${queryString}`)
      .then(async (res) => {
        console.log('>>> Frontend: API Response Status:', res.status, 'OK?:', res.ok);
        if (!res.ok) {
          const errorBody = await res.text();
          console.error('>>> Frontend: API Error Response Body:', errorBody);
          throw new Error(`Error al cargar productos (estado: ${res.status})`);
        }
        return res.json();
      })
      .then((data) => {
        console.log('>>> Frontend: Parsed JSON data:', data);
        setProducts(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error('>>> Frontend: Error en fetchProducts catch:', err);
        setError(err.message || "Ocurrió un error inesperado cargando productos.");
        setProducts([]);
      })
      .finally(() => setLoading(false));
  }, [
    selectedCategory, selectedBrand, minPrice, maxPrice, debouncedSearch,
    selectedSort, pathname, router
  ]);

  useEffect(() => {
    console.log(">>> useEffect QUE LLAMA a fetchProducts SE DISPARÓ (porque fetchProducts cambió).");
    fetchProducts();
  }, [fetchProducts]);

  const resetFilters = () => {
    setSelectedCategory("all");
    setSelectedSort("default");
    setSearchQuery("");
    setMinPrice("");
    setMaxPrice("");
    setSelectedBrand("all");
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center md:text-left">Nuestros Productos</h1>
      
      <div className="mb-8 p-4 md:p-6 bg-white shadow-lg rounded-xl border border-gray-200">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 items-end">
          <div className="lg:col-span-2 xl:col-span-1">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Buscar</label>
            <div className="relative">
              <Input id="search" type="text" placeholder="Buscar por nombre, marca..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pr-10" />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger id="category"><SelectValue placeholder="Todas" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las Categorías</SelectItem>
                {categories.map((cat) => (<SelectItem key={cat.slug} value={cat.slug}>{cat.name}</SelectItem>))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label htmlFor="brand" className="block text-sm font-medium text-gray-700 mb-1">Marca</label>
            <Select value={selectedBrand} onValueChange={setSelectedBrand}>
              <SelectTrigger id="brand"><SelectValue placeholder="Todas" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las Marcas</SelectItem>
                {allBrands.map((brandName) => (<SelectItem key={brandName} value={brandName}>{brandName}</SelectItem>))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-1">Ordenar Por</label>
            <Select value={selectedSort} onValueChange={setSelectedSort}>
              <SelectTrigger id="sort"><SelectValue placeholder="Defecto" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Defecto (Más recientes)</SelectItem>
                <SelectItem value="price-asc">Precio: Menor a Mayor</SelectItem>
                <SelectItem value="price-desc">Precio: Mayor a Menor</SelectItem>
                <SelectItem value="rating-desc">Popularidad (Rating)</SelectItem>
                <SelectItem value="name-asc">Nombre: A a Z</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:col-span-2 lg:col-span-2 xl:col-span-1 items-end">
            <div>
              <label htmlFor="min-price" className="block text-sm font-medium text-gray-700 mb-1">Precio Mín.</label>
              <Input id="min-price" type="number" placeholder="0" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
            </div>
            <div>
              <label htmlFor="max-price" className="block text-sm font-medium text-gray-700 mb-1">Precio Máx.</label>
              <Input id="max-price" type="number" placeholder="Cualquiera" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
            </div>
          </div>
           <Button onClick={resetFilters} variant="outline" className="sm:col-start-2 lg:col-start-auto xl:col-start-auto mt-4 sm:mt-0 self-end">
              <XCircle className="mr-2 h-4 w-4" /> Limpiar Filtros
            </Button>
        </div>
      </div>
      
      {/* =====> INICIO DE LA SECCIÓN DE RESULTADOS CORREGIDA <===== */}
      {loading ? (
        <div className="flex items-center justify-center min-h-[300px] py-10"> {/* Añadido py-10 para espaciado */}
          <RefreshCw className="h-10 w-10 text-orange-500 animate-spin" />
          <p className="ml-3 text-lg text-gray-600">Cargando productos...</p> {/* Mensaje de carga */}
        </div>
      ) : error ? (
        <div className="text-center text-red-700 py-12 bg-red-50 p-6 rounded-lg shadow-md border border-red-200">
            <h2 className="font-semibold text-xl mb-2">¡Ups! Algo salió mal</h2>
            <p className="text-md">{error}</p>
            <p className="text-sm mt-4">Intenta refrescar la página o ajustar tus filtros.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8"> {/* Ajustado gap */}
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="col-span-full text-center py-16">
              <Search className="mx-auto h-20 w-20 text-gray-400 mb-6" /> {/* Icono más grande */}
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">No se encontraron productos</h2>
              <p className="text-gray-600 max-w-md mx-auto">
                Intenta con diferentes palabras clave, categorías o ajustando los filtros de precio.
              </p>
            </div>
          )}
        </div>
      )}
      {/* =====> FIN DE LA SECCIÓN DE RESULTADOS <===== */}
    </main>
  );
}