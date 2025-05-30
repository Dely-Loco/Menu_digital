"use client";
import { useState, useEffect, useCallback } from "react";
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
import { Search, RefreshCw } from "lucide-react";
import { useSearchParams } from "next/navigation";

// ========== HOOK PERSONALIZADO PARA DEBOUNCE ==========
// Retrasa la ejecución de búsquedas para evitar múltiples requests mientras el usuario escribe
function useDebounce(value: string, delay = 400) {
  const [debounced, setDebounced] = useState(value);
  
  useEffect(() => {
    // Crea un timer que actualiza el valor después del delay especificado
    const handler = setTimeout(() => setDebounced(value), delay);
    
    // Cleanup: cancela el timer anterior si el valor cambia antes del delay
    return () => clearTimeout(handler);
  }, [value, delay]); // Se ejecuta cada vez que cambia el valor o delay
  
  return debounced; // Retorna el valor "retrasado"
}

export default function ProductsPage() {
  // ========== INICIALIZACIÓN CON URL PARAMS ==========
  // Obtiene parámetros de la URL para mantener estado al recargar/compartir
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all"; // Categoría desde URL o "all" por defecto
  const initialSort = searchParams.get("sort") || "default";     // Ordenamiento desde URL o "default"

  // ========== ESTADOS DE FILTROS ==========
  // Controlan los criterios de búsqueda y filtrado de productos
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedSort, setSelectedSort] = useState(initialSort);
  const [searchQuery, setSearchQuery] = useState(""); // Texto de búsqueda del usuario
  const [minPrice, setMinPrice] = useState("");       // Precio mínimo para filtrar
  const [maxPrice, setMaxPrice] = useState("");       // Precio máximo para filtrar
  const [selectedBrand, setSelectedBrand] = useState("all"); // Marca seleccionada

  // ========== ESTADOS DE DATOS ==========
  // Almacenan la información que se muestra en la UI
  const [products, setProducts] = useState<Product[]>([]);     // Lista de productos filtrados
  const [categories, setCategories] = useState<{ slug: string; name: string }[]>([]); // Categorías disponibles
  const [allBrands, setAllBrands] = useState<string[]>([]);    // Marcas disponibles
  const [loading, setLoading] = useState(false);               // Estado de carga para mostrar spinner
  const [error, setError] = useState<string | null>(null);     // Errores de API para mostrar al usuario

  // ========== DEBOUNCE PARA OPTIMIZACIÓN ==========
  // Aplica debounce a la búsqueda para evitar requests excesivos
  const debouncedSearch = useDebounce(searchQuery);

  // ========== CARGA INICIAL DE DATOS ESTÁTICOS ==========
  // Obtiene categorías y marcas una sola vez al montar el componente
  useEffect(() => {
    // Fetch de categorías disponibles para el select
    fetch("/api/categories")
      .then((res) => res.json())
      .then(setCategories); // Actualiza estado con las categorías
    
    // Fetch de marcas disponibles para el filtro
    fetch("/api/brands")
      .then((res) => res.json())
      .then(setAllBrands); // Actualiza estado con las marcas
  }, []); // Array vacío = solo se ejecuta una vez al montar

  // ========== FUNCIÓN PARA OBTENER PRODUCTOS FILTRADOS ==========
  const fetchProducts = useCallback(() => {
    setLoading(true);    // Activa indicador de carga
    setError(null);      // Limpia errores previos
    
    // Construye query string con todos los filtros activos
    const params = new URLSearchParams();
    
    // Solo agrega parámetros si tienen valores (evita parámetros vacíos)
    if (selectedCategory !== "all") params.append("category", selectedCategory);
    if (selectedBrand !== "all") params.append("brand", selectedBrand);
    if (minPrice) params.append("minPrice", minPrice);
    if (maxPrice) params.append("maxPrice", maxPrice);
    if (debouncedSearch) params.append("search", debouncedSearch); // Usa versión con debounce
    if (selectedSort !== "default") params.append("sort", selectedSort);

    // Realiza request con todos los filtros aplicados
    fetch(`/api/products?${params.toString()}`)
      .then((res) => {
        // Verifica si la respuesta es exitosa
        if (!res.ok) throw new Error("Error loading products");
        return res.json();
      })
      .then(setProducts)                    // Actualiza lista de productos
      .catch((err) => setError(err.message)) // Captura y muestra errores
      .finally(() => setLoading(false));     // Desactiva indicador de carga
  }, [
    // Dependencias: se re-ejecuta cuando cualquiera de estos valores cambia
    selectedCategory, 
    selectedBrand, 
    minPrice, 
    maxPrice, 
    debouncedSearch, // Importante: usa la versión con debounce
    selectedSort
  ]);

  // ========== EFECTO PARA RECARGAR PRODUCTOS ==========
  // Se ejecuta cada vez que cambian los filtros (gracias a useCallback)
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]); // Dependencia: la función fetchProducts

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Our Products</h1>
      
      {/* ========== PANEL DE FILTROS ==========*/}
      <div className="mb-8 p-6 bg-card rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
          
          {/* Campo de búsqueda con icono */}
          <div>
            <label htmlFor="search" className="block text-sm font-medium mb-1">
              Search
            </label>
            <div className="relative">
              <Input
                id="search"
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} // Actualiza estado en tiempo real
                className="pr-10" // Espacio para el icono
              />
              {/* Icono de búsqueda posicionado absolutamente */}
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
          </div>
          
          {/* Selector de categorías */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium mb-1">
              Category
            </label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger id="category">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {/* Mapea categorías dinámicamente desde la API */}
                {categories.map((cat) => (
                  <SelectItem key={cat.slug} value={cat.slug}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {/* Selector de marcas */}
          <div>
            <label htmlFor="brand" className="block text-sm font-medium mb-1">
              Brand
            </label>
            <Select value={selectedBrand} onValueChange={setSelectedBrand}>
              <SelectTrigger id="brand">
                <SelectValue placeholder="All Brands" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Brands</SelectItem>
                {/* Mapea marcas dinámicamente desde la API */}
                {allBrands.map((brand) => (
                  <SelectItem key={brand} value={brand}>
                    {brand}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {/* Selector de ordenamiento */}
          <div>
            <label htmlFor="sort" className="block text-sm font-medium mb-1">
              Sort by
            </label>
            <Select value={selectedSort} onValueChange={setSelectedSort}>
              <SelectTrigger id="sort">
                <SelectValue placeholder="Default" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="rating-desc">Popularity (Rating)</SelectItem>
                <SelectItem value="name-asc">Name: A to Z</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* ========== FILTROS DE PRECIO ==========*/}
          {/* Ocupa 2 columnas en layouts grandes para agrupar campos relacionados */}
          <div className="md:col-span-2 lg:col-span-2 grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="min-price" className="block text-sm font-medium mb-1">
                Min Price
              </label>
              <Input
                id="min-price"
                type="number" // Permite solo números
                placeholder="0"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="max-price" className="block text-sm font-medium mb-1">
                Max Price
              </label>
              <Input
                id="max-price"
                type="number" // Permite solo números
                placeholder="Any"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* ========== ÁREA DE CONTENIDO PRINCIPAL ==========*/}
      {/* Renderizado condicional basado en el estado de la aplicación */}
      {loading ? (
        // Estado de carga: muestra spinner centrado
        <div className="flex items-center justify-center min-h-[400px]">
          <RefreshCw className="h-8 w-8 animate-spin" />
        </div>
      ) : error ? (
        // Estado de error: muestra mensaje de error
        <div className="text-center text-red-500 py-12">{error}</div>
      ) : (
        // Estado normal: muestra grid de productos
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.length > 0 ? (
            // Si hay productos: renderiza cada ProductCard
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            // Si no hay productos: muestra mensaje de "no encontrado"
            <div className="col-span-full text-center py-12">
              <p className="text-lg text-muted-foreground">
                No products found matching your criteria.
              </p>
            </div>
          )}
        </div>
      )}
    </main>
  );
}