// @/app/products/page.tsx
"use client"; // For client-side filtering/sorting interactions

import { useState, useMemo, Suspense } from 'react';
import type { Product } from '@/types';
import { products as allProducts, categories } from '@/data/mock-data';
import ProductCard from '@/components/shared/product-card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { RefreshCw } from 'lucide-react';


function ProductFilters({
  selectedCategory, setSelectedCategory,
  selectedSort, setSelectedSort,
  searchQuery, setSearchQuery,
  minPrice, setMinPrice,
  maxPrice, setMaxPrice,
  selectedBrand, setSelectedBrand,
  allBrands
} : {
  selectedCategory: string; setSelectedCategory: (value: string) => void;
  selectedSort: string; setSelectedSort: (value: string) => void;
  searchQuery: string; setSearchQuery: (value: string) => void;
  minPrice: string; setMinPrice: (value: string) => void;
  maxPrice: string; setMaxPrice: (value: string) => void;
  selectedBrand: string; setSelectedBrand: (value: string) => void;
  allBrands: string[];
}) {
  return (
    <div className="mb-8 p-6 bg-card rounded-lg shadow">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
        <div>
          <label htmlFor="search" className="block text-sm font-medium mb-1">Search</label>
          <div className="relative">
            <Input
              id="search"
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium mb-1">Category</label>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger id="category">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat.slug} value={cat.slug}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label htmlFor="brand" className="block text-sm font-medium mb-1">Brand</label>
          <Select value={selectedBrand} onValueChange={setSelectedBrand}>
            <SelectTrigger id="brand">
              <SelectValue placeholder="All Brands" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Brands</SelectItem>
              {allBrands.map((brand) => (
                <SelectItem key={brand} value={brand}>
                  {brand}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label htmlFor="sort" className="block text-sm font-medium mb-1">Sort by</label>
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
        <div className="md:col-span-2 lg:col-span-2 grid grid-cols-2 gap-4">
            <div>
                <label htmlFor="min-price" className="block text-sm font-medium mb-1">Min Price</label>
                <Input id="min-price" type="number" placeholder="0" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
            </div>
            <div>
                <label htmlFor="max-price" className="block text-sm font-medium mb-1">Max Price</label>
                <Input id="max-price" type="number" placeholder="Any" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
            </div>
        </div>
      </div>
    </div>
  );
}


function CatalogContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const initialFilter = searchParams.get('filter') || 'default';

  const [products, setProducts] = useState<Product[]>(allProducts);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedSort, setSelectedSort] = useState(initialFilter);
  const [searchQuery, setSearchQuery] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('all');

  const allBrands = useMemo(() => Array.from(new Set(allProducts.map(p => p.brand))).sort(), []);


  const filteredAndSortedProducts = useMemo(() => {
    let tempProducts = [...allProducts];

    if (searchQuery) {
      tempProducts = tempProducts.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (selectedCategory !== 'all') {
      tempProducts = tempProducts.filter(product => product.category === selectedCategory);
    }

    if (selectedBrand !== 'all') {
      tempProducts = tempProducts.filter(product => product.brand === selectedBrand);
    }

    if (minPrice) {
      tempProducts = tempProducts.filter(product => product.price >= parseFloat(minPrice));
    }
    if (maxPrice) {
      tempProducts = tempProducts.filter(product => product.price <= parseFloat(maxPrice));
    }
    
    if (initialFilter === 'featured') {
        tempProducts = tempProducts.filter(p => p.isFeatured);
    }


    switch (selectedSort) {
      case 'price-asc':
        tempProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        tempProducts.sort((a, b) => b.price - a.price);
        break;
      case 'rating-desc':
        tempProducts.sort((a, b) => b.rating - a.rating);
        break;
      case 'name-asc':
        tempProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        // Default sort or handle 'default' case
        break;
    }

    return tempProducts;
  }, [searchQuery, selectedCategory, selectedSort, minPrice, maxPrice, selectedBrand, initialFilter]);

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">Our Products</h1>
      <ProductFilters 
        selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}
        selectedSort={selectedSort} setSelectedSort={setSelectedSort}
        searchQuery={searchQuery} setSearchQuery={setSearchQuery}
        minPrice={minPrice} setMinPrice={setMinPrice}
        maxPrice={maxPrice} setMaxPrice={setMaxPrice}
        selectedBrand={selectedBrand} setSelectedBrand={setSelectedBrand}
        allBrands={allBrands}
      />

      {filteredAndSortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAndSortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-muted-foreground">No products found matching your criteria.</p>
          <Button variant="link" onClick={() => {
            setSearchQuery('');
            setSelectedCategory('all');
            setSelectedSort('default');
            setMinPrice('');
            setMaxPrice('');
            setSelectedBrand('all');
          }}>Clear Filters</Button>
        </div>
      )}
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div>Loading filters...</div>}>
      <CatalogContent />
    </Suspense>
  )
}
