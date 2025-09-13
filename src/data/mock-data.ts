// @/data/mock-data.ts
import type { Plato, Category, BlogPost, } from '@/types';

/* ========================================
   GUÍA RÁPIDA DE PERSONALIZACIÓN
   ========================================
   
   🎨 COLORES: Líneas 20, 32, 44, etc. - Cambia los valores hex (#FF6B6B, #4ECDC4, etc.)
   📝 NOMBRES: Líneas 15, 27, 39, etc. - Modifica 'name' de categorías
   💰 PRECIOS: Líneas 130, 131, 194, etc. - Ajusta 'price' y 'originalPrice'
   🏷️ ETIQUETAS: Líneas 147, 212, etc. - Personaliza el array 'tags'
   🖼️ IMÁGENES: Líneas 135-142, 199-205, etc. - URLs de 'images'
   📱 ICONOS: Líneas 21, 33, 45, etc. - Emojis en 'icon'
   
   💡 TIP: Busca "PERSONALIZABLE" en los comentarios para encontrar secciones modificables
*/

// Categorías del restaurante
export const categories: Category[] = [
  {
    id: '1',
    name: 'Platos Principales', // PERSONALIZABLE: Nombre de la categoría
    slug: 'platos-principales', // PERSONALIZABLE: URL slug (debe coincidir con categorySlug en platos)
    image: 'https://placehold.co/400x300.png', // PERSONALIZABLE: Imagen de categoría
    description: 'Deliciosos platos principales preparados con ingredientes frescos y recetas tradicionales.', // PERSONALIZABLE: Descripción
    isPopular: true, // PERSONALIZABLE: Mostrar como categoría popular
    createdAt: new Date('2023-01-10T10:00:00Z').toISOString(), // Fecha de creación
  },
  {
    id: '2',
    name: 'Bebidas', // PERSONALIZABLE
    slug: 'bebidas', // PERSONALIZABLE
    image: 'https://placehold.co/400x300.png', // PERSONALIZABLE
    description: 'Refrescantes bebidas naturales, jugos frescos y sodas artesanales.', // PERSONALIZABLE
    isPopular: true, // PERSONALIZABLE
    createdAt: new Date('2023-01-11T10:00:00Z').toISOString(),
  },
  {
    id: '3',
    name: 'Postres', // PERSONALIZABLE
    slug: 'postres', // PERSONALIZABLE
    image: 'https://placehold.co/400x300.png', // PERSONALIZABLE
    description: 'Dulces y postres caseros para endulzar tu comida.', // PERSONALIZABLE
    isPopular: false, // PERSONALIZABLE
    createdAt: new Date('2023-01-12T10:00:00Z').toISOString(),
  },
  {
    id: '4',
    name: 'Entradas', // PERSONALIZABLE
    slug: 'entradas', // PERSONALIZABLE
    image: 'https://placehold.co/400x300.png', // PERSONALIZABLE
    description: 'Perfectas entradas para comenzar tu experiencia gastronómica.', // PERSONALIZABLE
    isPopular: true, // PERSONALIZABLE
    createdAt: new Date('2023-01-13T10:00:00Z').toISOString(),
  },
  {
    id: '5',
    name: 'Sopas', // PERSONALIZABLE
    slug: 'sopas', // PERSONALIZABLE
    image: 'https://placehold.co/400x300.png', // PERSONALIZABLE
    description: 'Sopas calientes y reconfortantes, perfectas para cualquier día.', // PERSONALIZABLE
    isPopular: false, // PERSONALIZABLE
    createdAt: new Date('2023-01-14T10:00:00Z').toISOString(),
  },
  {
    id: '6',
    name: 'Especiales', // PERSONALIZABLE
    slug: 'especiales', // PERSONALIZABLE
    image: 'https://placehold.co/400x300.png', // PERSONALIZABLE
    description: 'Platos especiales del chef, creaciones únicas y limitadas.', // PERSONALIZABLE
    isPopular: true, // PERSONALIZABLE
    createdAt: new Date('2023-01-15T10:00:00Z').toISOString(),
  }
];

// Helper para encontrar una categoría por slug (usado en platos mock)
const findCategoryBySlug = (slug: string): Category | undefined => categories.find(c => c.slug === slug);

// Platos del restaurante
export const platos: Plato[] = [
  {
    id: '1', // ID único del plato
    name: 'Bandeja Paisa Tradicional', // PERSONALIZABLE: Nombre del plato
    slug: 'bandeja-paisa-tradicional', // PERSONALIZABLE: URL slug único
    description: 'La auténtica bandeja paisa con frijoles rojos, arroz blanco, carne molida, chicharrón, chorizo, morcilla, plátano maduro, arepa y aguacate. Un plato completo que representa la tradición culinaria antioqueña.', // PERSONALIZABLE: Descripción completa
    shortDescription: 'Plato típico antioqueño completo con todos los acompañamientos tradicionales', // PERSONALIZABLE: Descripción corta
    price: 28000, // PERSONALIZABLE: Precio actual en pesos colombianos
    originalPrice: 32000, // PERSONALIZABLE: Precio original (para mostrar descuentos)
    discountPercentage: 12, // PERSONALIZABLE: Porcentaje de descuento
    categorySlug: 'platos-principales', // PERSONALIZABLE: Debe coincidir con slug de categoría
    category: findCategoryBySlug('platos-principales'), // Se calcula automáticamente
    images: [ // PERSONALIZABLE: Array de imágenes del plato
      { id: 'img-1-1', url: 'https://placehold.co/600x600.png', alt: 'Bandeja Paisa Tradicional', order: 0, isPrimary: true },
      { id: 'img-1-2', url: 'https://placehold.co/600x600.png', alt: 'Bandeja Paisa vista lateral', order: 1, isPrimary: false },
    ],
    available: true, // PERSONALIZABLE: Disponible o no
    isFeatured: true, // PERSONALIZABLE: Mostrar como plato destacado
    tags: ['tradicional', 'completo', 'antioqueño'], // PERSONALIZABLE: Etiquetas para búsqueda
    inWishlist: false, // Estado de lista de deseos
    createdAt: new Date('2023-02-01T12:00:00Z').toISOString(), // Fecha de creación
  },
  {
    id: '2',
    name: 'Sancocho Trifásico', // PERSONALIZABLE
    slug: 'sancocho-trifasico', // PERSONALIZABLE
    description: 'Delicioso sancocho preparado con pollo, cerdo y res, acompañado de yuca, plátano, mazorca, papa y cilantro fresco. Una sopa abundante y nutritiva perfecta para compartir.', // PERSONALIZABLE
    shortDescription: 'Sancocho de tres carnes con vegetales frescos', // PERSONALIZABLE
    price: 22000, // PERSONALIZABLE
    categorySlug: 'sopas', // PERSONALIZABLE
    category: findCategoryBySlug('sopas'),
    images: [ // PERSONALIZABLE
      { id: 'img-2-1', url: 'https://placehold.co/600x600.png', alt: 'Sancocho Trifásico', order: 0, isPrimary: true },
      { id: 'img-2-2', url: 'https://placehold.co/600x600.png', alt: 'Sancocho servido', order: 1, isPrimary: false },
    ],
    available: true, // PERSONALIZABLE
    isFeatured: true, // PERSONALIZABLE
    tags: ['sancocho', 'sopa', 'tres carnes'], // PERSONALIZABLE
    inWishlist: false,
    createdAt: new Date('2023-03-10T12:00:00Z').toISOString(),
  },
  {
    id: '3',
    name: 'Arepa de Huevo', // PERSONALIZABLE
    slug: 'arepa-de-huevo', // PERSONALIZABLE
    description: 'Crujiente arepa frita rellena de huevo batido, una delicia costeña perfecta para cualquier momento del día. Se sirve caliente y dorada.', // PERSONALIZABLE
    shortDescription: 'Arepa costeña frita con huevo adentro', // PERSONALIZABLE
    price: 8000, // PERSONALIZABLE
    categorySlug: 'entradas', // PERSONALIZABLE
    category: findCategoryBySlug('entradas'),
    images: [ // PERSONALIZABLE
      { id: 'img-3-1', url: 'https://placehold.co/600x600.png', alt: 'Arepa de Huevo', order: 0, isPrimary: true },
    ],
    available: true, // PERSONALIZABLE
    isFeatured: false, // PERSONALIZABLE
    tags: ['arepa', 'huevo', 'frita'], // PERSONALIZABLE
    inWishlist: false,
    createdAt: new Date('2023-04-05T12:00:00Z').toISOString(),
  },
  {
    id: '4',
    name: 'Jugo de Lulo Natural', // PERSONALIZABLE
    slug: 'jugo-de-lulo-natural', // PERSONALIZABLE
    description: 'Refrescante jugo natural de lulo, una fruta exótica colombiana con sabor agridulce único. Preparado al momento sin azúcar adicional.', // PERSONALIZABLE
    shortDescription: 'Jugo natural de lulo fresco sin azúcar', // PERSONALIZABLE
    price: 6000, // PERSONALIZABLE
    originalPrice: 7000, // PERSONALIZABLE
    discountPercentage: 14, // PERSONALIZABLE
    categorySlug: 'bebidas', // PERSONALIZABLE
    category: findCategoryBySlug('bebidas'),
    images: [ // PERSONALIZABLE
        { id: 'img-4-1', url: 'https://placehold.co/600x600.png', alt: 'Jugo de Lulo', order: 0, isPrimary: true },
        { id: 'img-4-2', url: 'https://placehold.co/600x600.png', alt: 'Lulo fresco', order: 1, isPrimary: false },
    ],
    available: true, // PERSONALIZABLE
    isFeatured: true, // PERSONALIZABLE
    tags: ['natural', 'lulo', 'sin azúcar'], // PERSONALIZABLE
    inWishlist: false,
    createdAt: new Date('2023-05-01T10:00:00Z').toISOString(),
  },
  {
    id: '5',
    name: 'Flan de Coco', // PERSONALIZABLE
    slug: 'flan-de-coco', // PERSONALIZABLE
    description: 'Cremoso flan casero de coco con caramelo natural. Un postre suave y delicado que combina la dulzura del coco con la textura sedosa del flan tradicional.', // PERSONALIZABLE
    shortDescription: 'Postre casero de coco con caramelo', // PERSONALIZABLE
    price: 9000, // PERSONALIZABLE
    categorySlug: 'postres', // PERSONALIZABLE
    category: findCategoryBySlug('postres'),
    images: [ // PERSONALIZABLE
      { id: 'img-5-1', url: 'https://placehold.co/600x600.png', alt: 'Flan de Coco', order: 0, isPrimary: true },
    ],
    available: true, // PERSONALIZABLE
    isFeatured: false, // PERSONALIZABLE
    tags: ['postre', 'coco', 'casero'], // PERSONALIZABLE
    inWishlist: false,
    createdAt: new Date('2023-06-01T10:00:00Z').toISOString(),
  },
  {
    id: '6',
    name: 'Cazuela de Mariscos del Chef', // PERSONALIZABLE
    slug: 'cazuela-mariscos-chef', // PERSONALIZABLE
    description: 'Exquisita cazuela con camarones, langostinos, pulpo y mejillones en salsa de coco y culantro. Una creación especial del chef que combina los sabores del mar con especias colombianas.', // PERSONALIZABLE
    shortDescription: 'Cazuela especial con variedad de mariscos frescos', // PERSONALIZABLE
    price: 45000, // PERSONALIZABLE
    categorySlug: 'especiales', // PERSONALIZABLE
    category: findCategoryBySlug('especiales'),
    images: [ // PERSONALIZABLE
      { id: 'img-6-1', url: 'https://placehold.co/600x600.png', alt: 'Cazuela de Mariscos', order: 0, isPrimary: true },
      { id: 'img-6-2', url: 'https://placehold.co/600x600.png', alt: 'Mariscos frescos', order: 1, isPrimary: false },
    ],
    available: true, // PERSONALIZABLE
    isFeatured: true, // PERSONALIZABLE
    tags: ['mariscos', 'especial', 'chef'], // PERSONALIZABLE
    inWishlist: false,
    createdAt: new Date('2023-07-01T10:00:00Z').toISOString(),
  },
  {
    id: '7',
    name: 'Empanadas Valluna (3 unidades)', // PERSONALIZABLE
    slug: 'empanadas-valluna', // PERSONALIZABLE
    description: 'Tres deliciosas empanadas vallunas doradas y crujientes, rellenas de papa, carne desmechada y guiso casero. Se sirven con ají picante y suero costeño.', // PERSONALIZABLE
    shortDescription: 'Empanadas tradicionales con papa y carne (3 und)', // PERSONALIZABLE
    price: 12000, // PERSONALIZABLE
    categorySlug: 'entradas', // PERSONALIZABLE
    category: findCategoryBySlug('entradas'),
    images: [ // PERSONALIZABLE
      { id: 'img-7-1', url: 'https://placehold.co/600x600.png', alt: 'Empanadas Valluna', order: 0, isPrimary: true },
    ],
    available: true, // PERSONALIZABLE
    isFeatured: false, // PERSONALIZABLE
    tags: ['empanadas', 'valluna', 'tradicional'], // PERSONALIZABLE
    inWishlist: false,
    createdAt: new Date('2023-08-01T10:00:00Z').toISOString(),
  },
  {
    id: '8',
    name: 'Limonada de Coco', // PERSONALIZABLE
    slug: 'limonada-de-coco', // PERSONALIZABLE
    description: 'Refrescante limonada preparada con coco natural, limón fresco y un toque de menta. Perfecta para los días calurosos, se sirve bien fría con hielo.', // PERSONALIZABLE
    shortDescription: 'Bebida refrescante de coco y limón con menta', // PERSONALIZABLE
    price: 8000, // PERSONALIZABLE
    categorySlug: 'bebidas', // PERSONALIZABLE
    category: findCategoryBySlug('bebidas'),
    images: [ // PERSONALIZABLE
      { id: 'img-8-1', url: 'https://placehold.co/600x600.png', alt: 'Limonada de Coco', order: 0, isPrimary: true },
    ],
    available: true, // PERSONALIZABLE
    isFeatured: false, // PERSONALIZABLE
    tags: ['limonada', 'coco', 'refrescante'], // PERSONALIZABLE
    inWishlist: false,
    createdAt: new Date('2023-09-01T10:00:00Z').toISOString(),
  }
];

// Blog posts sobre gastronomía colombiana
export const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'historia-bandeja-paisa-plato-tradicional-colombia', // PERSONALIZABLE: URL del blog post
    title: 'Historia de la Bandeja Paisa: El Plato que Representa a Colombia', // PERSONALIZABLE: Título
    excerpt: 'Descubre el origen y la evolución de la bandeja paisa, el plato más emblemático de la gastronomía antioqueña y uno de los símbolos culinarios de Colombia.', // PERSONALIZABLE: Resumen
    content: `
    <p>La bandeja paisa es mucho más que un plato: es un símbolo de la identidad antioqueña y un tesoro de la gastronomía colombiana. Este abundante plato tiene sus raíces en la cultura campesina de Antioquia.</p>
    
    <h3>Orígenes Históricos</h3>
    <p>La bandeja paisa nació de la necesidad de los trabajadores rurales de consumir comidas abundantes y nutritivas que les dieran energía para las largas jornadas de trabajo en las montañas antioqueñas.</p>
    
    <ul>
      <li><strong>Frijoles rojos</strong>: Base fundamental, fuente de proteína vegetal</li>
      <li><strong>Arroz blanco</strong>: Carbohidrato esencial para la energía</li>
      <li><strong>Carne molida</strong>: Proteína animal accesible</li>
      <li><strong>Chicharrón</strong>: Grasa necesaria para el trabajo físico intenso</li>
      <li><strong>Plátano maduro</strong>: Dulzura natural y más carbohidratos</li>
    </ul>
    
    <h3>Evolución del Plato</h3>
    <p>Con el tiempo, la bandeja paisa se ha convertido en un símbolo de hospitalidad y abundancia. Cada ingrediente tiene su propósito y juntos crean una sinfonía de sabores que representa la diversidad de la región antioqueña.</p>
    
    <p>Hoy en día, este plato trasciende fronteras y es reconocido internacionalmente como uno de los platos más representativos de Colombia, siendo una experiencia culinaria obligatoria para quienes visitan el país.</p>
    `, // PERSONALIZABLE: Contenido completo
    author: 'Pablo Henao', // PERSONALIZABLE: Autor
    authorTitle: 'Chef y Especialista en Gastronomía Colombiana', // PERSONALIZABLE: Título del autor
    authorImage: 'https://placehold.co/100x100.png', // PERSONALIZABLE: Foto del autor
    date: '2025-06-09T12:00:00Z', // PERSONALIZABLE: Fecha de publicación
    readTime: '5 min read', // PERSONALIZABLE: Tiempo de lectura estimado
    imageUrl: 'https://placehold.co/800x400.png', // PERSONALIZABLE: Imagen principal
    tags: ['bandeja paisa', 'gastronomía colombiana', 'tradición', 'Antioquia'], // PERSONALIZABLE: Etiquetas
    category: 'Cultura Gastronómica', // PERSONALIZABLE: Categoría del blog
    featured: true, // PERSONALIZABLE: Mostrar como destacado
    views: 0, // PERSONALIZABLE: Número de vistas
    likes: 0, // PERSONALIZABLE: Número de likes
  },
  {
    id: '2',
    slug: 'secretos-sancocho-perfecto-receta-tradicional', // PERSONALIZABLE
    title: 'Los Secretos del Sancocho Perfecto: Receta Tradicional Familiar', // PERSONALIZABLE
    excerpt: 'Aprende los secretos mejor guardados para preparar un sancocho auténtico como el que hacían nuestras abuelas, con todos los tips y técnicas tradicionales.', // PERSONALIZABLE
    content: `
    <p>El sancocho es más que una sopa: es un abrazo en un plato, una tradición que une a las familias colombianas alrededor de la mesa. Preparar un buen sancocho requiere paciencia, amor y algunos secretos que hoy compartimos contigo.</p>
    
    <h3>Ingredientes Fundamentales</h3>
    <p>Un buen sancocho trifásico requiere selección cuidadosa de ingredientes:</p>
    <ul>
      <li>Carnes frescas: pollo, cerdo y res en proporciones equilibradas</li>
      <li>Verduras de temporada: yuca, plátano verde, mazorca tierna</li>
      <li>Hierbas aromáticas: cilantro, cebolla larga, ajo</li>
    </ul>
    
    <h3>El Secreto del Sabor</h3>
    <p>El verdadero secreto está en el orden de cocción. Primero se cocinan las carnes más duras, luego se van agregando los demás ingredientes según su tiempo de cocción. El cilantro se añade al final para preservar su frescura.</p>
    
    <p>La paciencia es clave: un buen sancocho necesita al menos 2 horas de cocción lenta para que todos los sabores se integren perfectamente.</p>
    `, // PERSONALIZABLE
    author: 'Pablo Henao', // PERSONALIZABLE
    authorTitle: 'Chef y Especialista en Gastronomía Colombiana', // PERSONALIZABLE
    authorImage: 'https://placehold.co/100x100.png', // PERSONALIZABLE
    date: '2025-06-10T14:30:00Z', // PERSONALIZABLE
    readTime: '6 min read', // PERSONALIZABLE
    imageUrl: 'https://placehold.co/800x400.png', // PERSONALIZABLE
    tags: ['sancocho', 'receta tradicional', 'cocina colombiana', 'familia'], // PERSONALIZABLE
    category: 'Recetas', // PERSONALIZABLE
    featured: false, // PERSONALIZABLE
    views: 0, // PERSONALIZABLE
    likes: 0, // PERSONALIZABLE
  },
  {
    id: '3',
    slug: 'frutas-exoticas-colombia-jugos-naturales', // PERSONALIZABLE
    title: 'Frutas Exóticas de Colombia: Un Mundo de Sabores en Jugos Naturales', // PERSONALIZABLE
    excerpt: 'Explora la increíble diversidad de frutas tropicales colombianas y descubre por qué nuestros jugos naturales son únicos en el mundo.', // PERSONALIZABLE
    content: `
    <p>Colombia es uno de los países con mayor biodiversidad frutal del mundo. Nuestra privilegiada ubicación geográfica y variedad de climas nos permite cultivar frutas únicas que sorprenden a locales y visitantes.</p>
    
    <h3>Frutas Únicas de Colombia</h3>
    <ul>
      <li><strong>Lulo</strong>: Con su sabor agridulce único, es perfecto para jugos refrescantes</li>
      <li><strong>Guanábana</strong>: Cremosa y dulce, ideal para batidos y postres</li>
      <li><strong>Curuba</strong>: Ácida y aromática, perfecta para jugos energizantes</li>
      <li><strong>Borojó</strong>: Conocida por sus propiedades energéticas y afrodisíacas</li>
    </ul>
    
    <h3>Beneficios Nutricionales</h3>
    <p>Estas frutas no solo son deliciosas, sino también nutritivas. Son ricas en vitaminas, minerales y antioxidantes que fortalecen el sistema inmunológico y aportan energía natural.</p>
    
    <p>En nuestro restaurante preparamos todos nuestros jugos al momento, sin conservantes ni azúcares añadidos, para que disfrutes del sabor auténtico de estas maravillosas frutas colombianas.</p>
    `, // PERSONALIZABLE
    author: 'Pablo Henao', // PERSONALIZABLE
    authorTitle: 'Chef y Especialista en Gastronomía Colombiana', // PERSONALIZABLE
    authorImage: 'https://placehold.co/100x100.png', // PERSONALIZABLE
    date: '2025-06-11T10:15:00Z', // PERSONALIZABLE
    readTime: '4 min read', // PERSONALIZABLE
    imageUrl: 'https://placehold.co/800x400.png', // PERSONALIZABLE
    tags: ['frutas exóticas', 'jugos naturales', 'biodiversidad', 'Colombia'], // PERSONALIZABLE
    category: 'Ingredientes', // PERSONALIZABLE
    featured: true, // PERSONALIZABLE
    views: 0, // PERSONALIZABLE
    likes: 0, // PERSONALIZABLE
  },
];

/* ========================================
   FUNCIONES HELPER - NO MODIFICAR
   ========================================
   Estas funciones procesan automáticamente los datos
   y proporcionan utilidades para filtrar y buscar
*/

// Helper functions para platos
export const getFeaturedPlatos = (): Plato[] => platos.filter(p => p.isFeatured);
export const getAvailablePlatos = (): Plato[] => platos.filter(p => p.available);
export const getPlatoBySlug = (slug: string): Plato | undefined => platos.find(p => p.slug === slug);
export const getPlatosByCategory = (categorySlug: string): Plato[] => platos.filter(p => p.categorySlug === categorySlug);
export const getCategoryBySlug = (slug: string): Category | undefined => categories.find(c => c.slug === slug);
export const getBlogPostBySlug = (slug: string): BlogPost | undefined => blogPosts.find(p => p.slug === slug);
export const getPlatosByPriceRange = (min: number, max: number): Plato[] => platos.filter(p => p.price >= min && p.price <= max);
export const getPlatosOnSale = (): Plato[] => platos.filter(p => p.originalPrice && p.originalPrice > p.price);
export const getPopularCategories = (): Category[] => categories.filter(c => c.isPopular);
export const getFeaturedBlogPosts = (): BlogPost[] => blogPosts.filter(p => p.featured);

// Función de búsqueda para platos
export const searchPlatos = (query: string): Plato[] => {
  const searchTerm = query.toLowerCase();
  return platos.filter(p =>
    p.name.toLowerCase().includes(searchTerm) ||
    p.description.toLowerCase().includes(searchTerm) ||
    (p.tags && p.tags.some((tag: string) => tag.toLowerCase().includes(searchTerm)))
  );
};

// Filtros avanzados para platos
export const filterPlatos = (filters: {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  available?: boolean;
}): Plato[] => {
  return platos.filter(plato => {
    if (filters.category && plato.categorySlug !== filters.category) return false;
    if (filters.minPrice && plato.price < filters.minPrice) return false;
    if (filters.maxPrice && plato.price > filters.maxPrice) return false;
    if (filters.available !== undefined && plato.available !== filters.available) return false;
    return true;
  });
};

// Obtener rango de precios
export const getPriceRange = (): { min: number; max: number } => {
  if (platos.length === 0) return { min: 0, max: 0 };
  const prices = platos.map(p => p.price);
  return {
    min: Math.min(...prices),
    max: Math.max(...prices)
  };
};