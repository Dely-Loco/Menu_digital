// src/app/menu/[id]/page.tsx
import { getAllPlatos, getPlatoBySlug } from '@/lib/queries';
import type { Plato } from '@/types';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowLeft, 
  Clock, 
  ChefHat, 
  MapPin, 
  Leaf,
  Flame,
  Award,
  Heart,
  Camera,
  Info,
  Mail,
  Star
} from 'lucide-react';

// Función para generar metadatos dinámicos
export async function generateMetadata({ 
  params 
}: { 
  params: { id: string } 
}): Promise<Metadata> {
  const { id } = params;
  const plato = await getPlatoBySlug(id);
  
  if (!plato) {
    return {
      title: 'Plato no encontrado | Dely Loco',
      description: 'El plato que buscas no está disponible en nuestro menú.',
    };
  }

  return {
    title: `${plato.name} | Menú Digital Dely Loco`,
    description: plato.shortDescription || plato.description,
    keywords: `${plato.name}, Dely Loco, Comuna 13, Medellín, comida casera, ${plato.category?.name || 'plato'}, ${plato.tags?.join(', ') || ''}`,
    openGraph: {
      title: `${plato.name} | Dely Loco Comuna 13`,
      description: plato.shortDescription || plato.description,
      images: plato.images.length > 0 ? [{
        url: plato.images[0].url,
        width: 600,
        height: 600,
        alt: plato.name
      }] : [],
      locale: 'es_CO',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${plato.name} | Dely Loco`,
      description: plato.shortDescription || plato.description,
      images: plato.images.length > 0 ? [plato.images[0].url] : [],
    },
  };
}

// Función para generar parámetros estáticos
export async function generateStaticParams() {
  try {
    const platosData = await getAllPlatos(1, 100);
    return platosData.map((plato: Plato) => ({ 
      id: plato.slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

// Función principal de la página
export default async function PlatoDetailPage({ 
  params 
}: { 
  params: { id: string } 
}) {
  const { id } = params;
  const plato = await getPlatoBySlug(id);
  
  if (!plato) {
    notFound();
  }

  // Función helper para obtener ícono de etiqueta con más variedad
  const getTagIcon = (tag: string) => {
    const tagLower = tag.toLowerCase();
    if (tagLower.includes('picante') || tagLower.includes('spicy') || tagLower.includes('ají')) {
      return <Flame className="h-3 w-3" />;
    }
    if (tagLower.includes('vegano') || tagLower.includes('vegetariano') || tagLower.includes('vegan') || tagLower.includes('verde')) {
      return <Leaf className="h-3 w-3" />;
    }
    if (tagLower.includes('especial') || tagLower.includes('premium') || tagLower.includes('chef') || tagLower.includes('recomendado')) {
      return <Award className="h-3 w-3" />;
    }
    if (tagLower.includes('popular') || tagLower.includes('favorito') || tagLower.includes('bestseller')) {
      return <Star className="h-3 w-3" />;
    }
    return <Heart className="h-3 w-3" />;
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50/30 to-red-50/30">
      <div className="container mx-auto px-4 py-8">
        
        {/* Navegación de regreso mejorada */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <Link 
              href="/menu"
              className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium transition-all duration-300 hover:gap-3"
            >
              <ArrowLeft className="h-5 w-5" />
              Volver al Menú
            </Link>
            
            {/* Breadcrumb */}
            <div className="hidden sm:flex items-center text-sm text-gray-500">
              <Link href="/menu" className="hover:text-orange-600">Menú</Link>
              <span className="mx-2">/</span>
              {plato.category && (
                <>
                  <Link 
                    href={`/menu?category=${plato.category.slug}`} 
                    className="hover:text-orange-600"
                  >
                    {plato.category.name}
                  </Link>
                  <span className="mx-2">/</span>
                </>
              )}
              <span className="font-medium text-gray-700 truncate max-w-32">{plato.name}</span>
            </div>
          </div>
        </div>

        {/* Layout principal */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Columna izquierda - Galería de imágenes mejorada */}
          <div className="lg:sticky lg:top-8">
            <div className="space-y-4">
              {/* Imagen principal */}
              <div className="group relative aspect-square bg-gradient-to-br from-orange-50 to-red-50 rounded-3xl border-2 border-orange-200 overflow-hidden shadow-xl">
                {plato.images && plato.images.length > 0 ? (
                  <>
                    <Image
                      src={plato.images[0].url}
                      alt={plato.images[0].alt || plato.name}
                      width={600}
                      height={600}
                      className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <p className="font-bold text-lg">{plato.name}</p>
                        <p className="text-sm opacity-90">{plato.category?.name}</p>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="bg-orange-100 p-6 rounded-full mb-4 mx-auto w-fit">
                        <Camera className="h-16 w-16 text-orange-400" />
                      </div>
                      <p className="text-orange-600 font-medium text-lg mb-2">Imagen no disponible</p>
                      <p className="text-orange-500 text-sm">Próximamente foto de este delicioso plato</p>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Galería de miniaturas */}
              {plato.images && plato.images.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                  {plato.images.slice(1, 5).map((image, index) => (
                    <div 
                      key={index}
                      className="group aspect-square rounded-xl overflow-hidden border-2 border-orange-200 bg-orange-50 hover:border-orange-400 transition-all duration-300 cursor-pointer"
                    >
                      <Image
                        src={image.url}
                        alt={image.alt || `${plato.name} - Vista ${index + 2}`}
                        width={120}
                        height={120}
                        className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Badge de imagen */}
              {plato.images && plato.images.length > 0 && (
                <div className="text-center">
                  <Badge variant="outline" className="bg-white/80 backdrop-blur-sm">
                    {plato.images.length === 1 ? '1 foto' : `${plato.images.length} fotos`} disponible{plato.images.length > 1 ? 's' : ''}
                  </Badge>
                </div>
              )}
            </div>
          </div>

          {/* Columna derecha - Información del plato */}
          <div className="space-y-8">
            
            {/* Header del plato */}
            <div>
              <div className="flex flex-wrap gap-3 mb-6">
                {plato.isFeatured && (
                  <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg animate-pulse">
                    <ChefHat className="h-3 w-3 mr-1" />
                    Especial del Chef
                  </Badge>
                )}
                {plato.available ? (
                  <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg">
                    <Clock className="h-3 w-3 mr-1" />
                    Disponible Ahora
                  </Badge>
                ) : (
                  <Badge variant="secondary" className="bg-red-100 text-red-700 border border-red-200">
                    Temporalmente Agotado
                  </Badge>
                )}
                {plato.originalPrice && plato.originalPrice > plato.price && (
                  <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg animate-bounce">
                    ¡En Oferta!
                  </Badge>
                )}
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                {plato.name}
              </h1>

              {plato.shortDescription && (
                <div className="bg-orange-50 p-4 rounded-2xl border border-orange-200 mb-6">
                  <p className="text-xl text-gray-700 leading-relaxed italic">
                    &ldquo;{plato.shortDescription}&rdquo;
                  </p>
                </div>
              )}

              {plato.category && (
                <Link 
                  href={`/menu?category=${plato.category.slug}`}
                  className="inline-flex items-center gap-2 bg-orange-100 hover:bg-orange-200 text-orange-700 px-4 py-2 rounded-full mb-6 transition-colors duration-300 font-medium"
                >
                  <span className="text-sm">Ver más de {plato.category.name}</span>
                </Link>
              )}
            </div>

            {/* Descripción */}
            <Card className="shadow-lg border-orange-200">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Info className="h-6 w-6 text-orange-600" />
                  Descripción del Plato
                </h3>
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed text-xl font-medium">
                    {plato.description}
                  </p>
                </div>
                
                <div className="mt-6 p-4 bg-orange-50 rounded-xl border border-orange-200">
                  <p className="text-orange-800 text-sm">
                    Cada plato es preparado con ingredientes frescos y recetas tradicionales de la Comuna 13
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Precio */}
            <Card className="border-orange-200 bg-gradient-to-r from-gray-50 to-orange-50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 mb-1">Precio</p>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-bold text-orange-600">
                        ${plato.price.toLocaleString()}
                      </span>
                      {plato.originalPrice && plato.originalPrice > plato.price && (
                        <div className="flex items-center gap-2">
                          <span className="text-lg text-gray-500 line-through">
                            ${plato.originalPrice.toLocaleString()}
                          </span>
                          <Badge className="bg-red-500 text-white">
                            {plato.discountPercentage}% OFF
                          </Badge>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="bg-orange-100 p-3 rounded-xl">
                      <p className="text-orange-800 font-medium text-sm">Disponible en mesa</p>
                      <p className="text-orange-700 text-xs">Llama a tu mesero</p>
                    </div>
                  </div>
                </div>
                
                {plato.originalPrice && plato.originalPrice > plato.price && (
                  <div className="mt-4 p-3 bg-green-50 rounded-xl border border-green-200">
                    <p className="text-green-700 font-medium text-center">
                      Promoción especial: Ahorra ${(plato.originalPrice - plato.price).toLocaleString()}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Etiquetas */}
            {plato.tags && plato.tags.length > 0 && (
              <Card className="shadow-lg">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    Características Especiales
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {plato.tags.map((tag, index) => (
                      <Badge 
                        key={index}
                        variant="outline"
                        className="bg-white border-orange-300 text-orange-700 hover:bg-orange-50 text-base py-3 px-4 transition-all duration-300 hover:scale-105"
                      >
                        {getTagIcon(tag)}
                        <span className="ml-2 capitalize font-medium">{tag}</span>
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Info restaurante */}
            <Card className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 shadow-xl">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  🍽️ Restaurante Dely Loco
                </h3>
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 flex-shrink-0" />
                      <span>Comuna 13, Medellín - Antioquia</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 flex-shrink-0" />
                      <span>Lun - Dom: 12:00 PM - 8:00 PM</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <span>📱</span>
                      <span>301 405 6704</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 flex-shrink-0" />
                      <span className="text-sm">delylococomuna13@gmail.com</span>
                    </div>
                  </div>
                </div>
                
                <Separator className="my-6 bg-white/20" />
                
                <div className="text-center">
                  <p className="text-lg opacity-95 mb-4">
                    Comida casera preparada con amor y los mejores ingredientes de la región. 
                    ¡Sabores auténticos de la Comuna 13!
                  </p>
                  
                  <div className="bg-white/10 rounded-xl border border-white/20 p-4">
                    <p className="text-sm font-medium">
                      💡 <strong>¿Estás en el restaurante?</strong> Pregunta a tu mesero por las recomendaciones del chef
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Navegación */}
            <Card className="shadow-lg">
              <CardContent className="p-8 text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  Explora Más Opciones
                </h3>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild variant="outline" size="lg" className="flex-1 sm:flex-none">
                    <Link href="/menu">
                      Ver Todo el Menú
                    </Link>
                  </Button>
                  {plato.category && (
                    <Button asChild size="lg" className="bg-orange-600 hover:bg-orange-700 flex-1 sm:flex-none">
                      <Link href={`/menu?category=${plato.category.slug}`}>
                        Más {plato.category.name}
                      </Link>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
