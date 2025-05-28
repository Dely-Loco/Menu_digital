// @/app/products/[id]/page.tsx
import { getProductBySlug, products as allProducts } from '@/data/mock-data';
import ImageGallery from '@/components/product/image-gallery';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ProductCard from '@/components/shared/product-card';
import Link from 'next/link';

interface ProductPageParams {
  params: {
    id: string; // This will be the slug
  };
}

// Generate static paths for products
export async function generateStaticParams() {
  return allProducts.map((product) => ({
    id: product.slug,
  }));
}


export default function ProductDetailPage({ params }: ProductPageParams) {
  const product = getProductBySlug(params.id);

  if (!product) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold">Product not found</h1>
        <p className="text-muted-foreground">Sorry, we couldn't find the product you're looking for.</p>
        <Button asChild variant="link" className="mt-4">
          <Link href="/products">Back to Products</Link>
        </Button>
      </div>
    );
  }

  const relatedProducts = allProducts
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="space-y-12">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        <ImageGallery images={product.images} altText={product.name} dataAiHint={product.dataAiHint} />
        
        <div className="space-y-6">
          <h1 className="text-3xl lg:text-4xl font-bold">{product.name}</h1>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-5 h-5 ${i < Math.round(product.rating) ? 'fill-current' : 'text-gray-300'}`} />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">({product.reviewsCount} reviews)</span>
            <Separator orientation="vertical" className="h-5"/>
            <Badge variant="outline">{product.brand}</Badge>
          </div>

          <p className="text-3xl font-bold text-primary">${product.price.toFixed(2)}</p>
          {product.originalPrice && (
            <p className="text-lg text-muted-foreground line-through">
              Was ${product.originalPrice.toFixed(2)}
            </Badge>
          )}

          <p className="text-foreground/80 leading-relaxed">{product.description}</p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button size="lg" className="flex-1 bg-gradient-to-r from-[#FF4500] to-[#FF8C00] hover:opacity-90 text-primary-foreground">
              <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
            </Button>
            <Button size="lg" variant="outline" className="flex-1">
              <Heart className="mr-2 h-5 w-5" /> Add to Wishlist
            </Button>
          </div>
          
          <div className="text-sm text-muted-foreground">
            {product.stock > 0 ? `${product.stock} units in stock` : 'Out of stock'}
          </div>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="specs">
              <AccordionTrigger className="text-lg font-semibold">Technical Specifications</AccordionTrigger>
              <AccordionContent>
                <p className="whitespace-pre-wrap text-sm text-foreground/90">{product.technicalSpec || 'No specifications available.'}</p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="reviews">
              <AccordionTrigger className="text-lg font-semibold">Customer Reviews</AccordionTrigger>
              <AccordionContent>
                <p className="text-sm text-foreground/90">Customer reviews will be displayed here. (Placeholder)</p>
                {/* Placeholder for review list */}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="space-y-6 pt-8 border-t">
          <h2 className="text-2xl font-bold">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
