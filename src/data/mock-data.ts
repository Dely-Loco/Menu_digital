// @/data/mock-data.ts
import type { Product, Category, BlogPost, } from '@/types'; // Asegúrate de importar ProductImage y ProductReview

/* ========================================
   GUÍA RÁPIDA DE PERSONALIZACIÓN
   ========================================
   
   🎨 COLORES: Líneas 20, 32, 44, etc. - Cambia los valores hex (#FF6B6B, #4ECDC4, etc.)
   📝 NOMBRES: Líneas 15, 27, 39, etc. - Modifica 'name' de categorías
   💰 PRECIOS: Líneas 130, 131, 194, etc. - Ajusta 'price' y 'originalPrice'
   🏷️ ETIQUETAS: Líneas 147, 212, etc. - Personaliza el array 'tags'
   📊 STOCK: Líneas 145, 210, etc. - Cambia cantidad en 'stock'
   ⭐ RATING: Líneas 143, 208, etc. - Modifica 'rating' (0-5)
   🖼️ IMÁGENES: Líneas 135-142, 199-205, etc. - URLs de 'images'
   📱 ICONOS: Líneas 21, 33, 45, etc. - Emojis en 'icon'
   
   💡 TIP: Busca "PERSONALIZABLE" en los comentarios para encontrar secciones modificables
*/

// Enhanced Categories with more visual and marketing data
export const categories: Category[] = [
  {
    id: '1',
    name: 'Gadgets', // PERSONALIZABLE: Nombre de la categoría
    slug: 'gadgets', // PERSONALIZABLE: URL slug (debe coincidir con categorySlug en productos)
    image: 'https://placehold.co/400x300.png', // PERSONALIZABLE: Imagen de categoría
    description: 'Cutting-edge gadgets to simplify your life.', // PERSONALIZABLE: Descripción
    dataAiHint: 'gadgets technology', // Para SEO y búsquedas
    icon: '📱', // PERSONALIZABLE: Emoji o icono
    color: '#FF6B6B', // PERSONALIZABLE: Color principal de la categoría
    productsCount: 15, // PERSONALIZABLE: Número de productos (debe coincidir con productos reales)
    isPopular: true, // PERSONALIZABLE: Mostrar como categoría popular
    createdAt: new Date('2023-01-10T10:00:00Z').toISOString(), // Fecha de creación
  },
  {
    id: '2',
    name: 'Smart Home', // PERSONALIZABLE
    slug: 'smart-home', // PERSONALIZABLE
    image: 'https://placehold.co/400x300.png', // PERSONALIZABLE
    description: 'Automate and control your home with smart devices.', // PERSONALIZABLE
    dataAiHint: 'smart home',
    icon: '🏠', // PERSONALIZABLE
    color: '#4ECDC4', // PERSONALIZABLE: Color turquesa
    productsCount: 28, // PERSONALIZABLE
    isPopular: true, // PERSONALIZABLE
    createdAt: new Date('2023-01-11T10:00:00Z').toISOString(),
  },
  {
    id: '3',
    name: 'Accessories', // PERSONALIZABLE
    slug: 'accessories', // PERSONALIZABLE
    image: 'https://placehold.co/400x300.png', // PERSONALIZABLE
    description: 'Essential accessories for your tech gear.', // PERSONALIZABLE
    dataAiHint: 'tech accessories',
    icon: '🔌', // PERSONALIZABLE
    color: '#45B7D1', // PERSONALIZABLE: Color azul
    productsCount: 42, // PERSONALIZABLE
    isPopular: false, // PERSONALIZABLE: No mostrar como popular
    createdAt: new Date('2023-01-12T10:00:00Z').toISOString(),
  },
  {
    id: '4',
    name: 'Wearables', // PERSONALIZABLE
    slug: 'wearables', // PERSONALIZABLE
    image: 'https://placehold.co/400x300.png', // PERSONALIZABLE
    description: 'Stay connected and track your fitness with our wearables.', // PERSONALIZABLE
    dataAiHint: 'smartwatch fitness',
    icon: '⌚', // PERSONALIZABLE
    color: '#F7DC6F', // PERSONALIZABLE: Color amarillo
    productsCount: 18, // PERSONALIZABLE
    isPopular: true, // PERSONALIZABLE
    createdAt: new Date('2023-01-13T10:00:00Z').toISOString(),
  },
  {
    id: '5',
    name: 'Office Tech', // PERSONALIZABLE
    slug: 'office-tech', // PERSONALIZABLE
    image: 'https://placehold.co/400x300.png', // PERSONALIZABLE
    description: 'Boost productivity with our range of office technology.', // PERSONALIZABLE
    dataAiHint: 'office technology',
    icon: '💻', // PERSONALIZABLE
    color: '#BB8FCE', // PERSONALIZABLE: Color morado
    productsCount: 33, // PERSONALIZABLE
    isPopular: false, // PERSONALIZABLE
    createdAt: new Date('2023-01-14T10:00:00Z').toISOString(),
  },
  {
    id: '6',
    name: 'Gaming', // PERSONALIZABLE
    slug: 'gaming', // PERSONALIZABLE
    image: 'https://placehold.co/400x300.png', // PERSONALIZABLE
    description: 'Level up your gaming experience with pro gear.', // PERSONALIZABLE
    dataAiHint: 'gaming gear',
    icon: '🎮', // PERSONALIZABLE
    color: '#58D68D', // PERSONALIZABLE: Color verde
    productsCount: 24, // PERSONALIZABLE
    isPopular: true, // PERSONALIZABLE
    createdAt: new Date('2023-01-15T10:00:00Z').toISOString(),
  },
  {
    id: '7',
    name: 'Audio', // PERSONALIZABLE
    slug: 'audio', // PERSONALIZABLE
    image: 'https://placehold.co/400x300.png', // PERSONALIZABLE
    description: 'Premium audio equipment for audiophiles.', // PERSONALIZABLE
    dataAiHint: 'premium audio',
    icon: '🎧', // PERSONALIZABLE
    color: '#F1948A', // PERSONALIZABLE: Color rosa
    productsCount: 19, // PERSONALIZABLE
    isPopular: false, // PERSONALIZABLE
    createdAt: new Date('2023-01-16T10:00:00Z').toISOString(),
  }
];

// Helper para encontrar una categoría por slug (usado en productos mock)
const findCategoryBySlug = (slug: string): Category | undefined => categories.find(c => c.slug === slug);

// Enhanced Products with rich data for advanced features
export const products: Product[] = [
  {
    id: '1', // ID único del producto
    name: 'Quantum Smart Speaker X1', // PERSONALIZABLE: Nombre del producto
    slug: 'quantum-smart-speaker-x1', // PERSONALIZABLE: URL slug único
    description: 'Experience immersive sound and AI assistance with the Quantum X1. Features voice control, multi-room audio, and seamless integration with your smart home ecosystem.', // PERSONALIZABLE: Descripción completa
    shortDescription: 'AI-powered smart speaker with premium audio quality', // PERSONALIZABLE: Descripción corta para tarjetas
    technicalSpec: 'Connectivity: Wi-Fi, Bluetooth 5.0. Drivers: 3" Woofer, 1" Tweeter. AI: Integrated HouzzeAI. Power: 30W.', // PERSONALIZABLE: Especificaciones técnicas
    price: 129.99, // PERSONALIZABLE: Precio actual
    originalPrice: 159.99, // PERSONALIZABLE: Precio original (para mostrar descuentos)
    discountPercentage: 19, // PERSONALIZABLE: Porcentaje de descuento
    categorySlug: 'smart-home', // PERSONALIZABLE: Debe coincidir con slug de categoría
    category: findCategoryBySlug('smart-home'), // Se calcula automáticamente
    brand: 'Quantum Audio', // PERSONALIZABLE: Marca del producto
    images: [ // PERSONALIZABLE: Array de imágenes del producto
      { id: 'img-1-1', url: 'https://placehold.co/600x600.png', alt: 'Quantum Smart Speaker X1 Image 1', order: 0, isPrimary: true },
      { id: 'img-1-2', url: 'https://placehold.co/600x600.png', alt: 'Quantum Smart Speaker X1 Image 2', order: 1, isPrimary: false },
      { id: 'img-1-3', url: 'https://placehold.co/600x600.png', alt: 'Quantum Smart Speaker X1 Image 3', order: 2, isPrimary: false },
      { id: 'img-1-4', url: 'https://placehold.co/600x600.png', alt: 'Quantum Smart Speaker X1 Image 4', order: 3, isPrimary: false },
    ],
    rating: 4.8, // PERSONALIZABLE: Rating del producto (0-5)
    reviewsCount: 256, // PERSONALIZABLE: Número de reseñas
    stock: 50, // PERSONALIZABLE: Cantidad en stock
    isFeatured: true, // PERSONALIZABLE: Mostrar como producto destacado
    isNew: false, // PERSONALIZABLE: Marcar como producto nuevo
    isBestseller: true, // PERSONALIZABLE: Marcar como bestseller
    tags: ['smart speaker', 'ai assistant', 'audio'], // PERSONALIZABLE: Etiquetas para búsqueda
    dataAiHint: 'smart speaker', // Para optimización de búsqueda
    features: ['Voice Control', 'Multi-room Audio', 'Smart Home Integration', 'Premium Sound'], // PERSONALIZABLE: Características principales
    colors: ['Charcoal Black', 'Arctic White', 'Forest Green'], // PERSONALIZABLE: Colores disponibles
    dimensions: '6.5" H x 4.1" D', // PERSONALIZABLE: Dimensiones
    weight: '2.65 lbs', // PERSONALIZABLE: Peso
    warranty: '2 years', // PERSONALIZABLE: Garantía
    shippingInfo: 'Free shipping, arrives in 2-3 days', // PERSONALIZABLE: Información de envío
    inWishlist: false, // Estado de lista de deseos
    compareCount: 12, // Contador de comparaciones
    reviews: [ // PERSONALIZABLE: Array de reseñas
      {
        id: 'review-1-1',
        user: 'Alex Johnson', // PERSONALIZABLE: Nombre del usuario
        rating: 5, // PERSONALIZABLE: Rating de la reseña (1-5)
        comment: 'Amazing sound quality and the AI is incredibly responsive!', // PERSONALIZABLE: Comentario
        date: '2024-07-20T10:00:00Z', // PERSONALIZABLE: Fecha de la reseña
        verified: true // PERSONALIZABLE: Compra verificada
      },
      {
        id: 'review-1-2',
        user: 'Sarah Chen', // PERSONALIZABLE
        rating: 4, // PERSONALIZABLE
        comment: 'Great product, easy setup, love the multi-room feature.', // PERSONALIZABLE
        date: '2024-07-18T15:30:00Z', // PERSONALIZABLE
        verified: true // PERSONALIZABLE
      }
    ],
    createdAt: new Date('2023-02-01T12:00:00Z').toISOString(), // Fecha de creación del producto
  },
  {
    id: '2',
    name: 'Nova Smartwatch Pro', // PERSONALIZABLE
    slug: 'nova-smartwatch-pro', // PERSONALIZABLE
    description: 'Track your fitness, stay connected, and manage your day with the Nova Smartwatch Pro. AMOLED display, 14-day battery life, and advanced health monitoring.', // PERSONALIZABLE
    shortDescription: 'Premium smartwatch with 14-day battery and health monitoring', // PERSONALIZABLE
    technicalSpec: 'Display: 1.4" AMOLED. Battery: Up to 14 days. Sensors: HR, SpO2, GPS. Water Resistance: 5ATM.', // PERSONALIZABLE
    price: 199.50, // PERSONALIZABLE: Precio sin descuento
    categorySlug: 'wearables', // PERSONALIZABLE
    category: findCategoryBySlug('wearables'),
    brand: 'Nova Gear', // PERSONALIZABLE
    images: [ // PERSONALIZABLE
      { id: 'img-2-1', url: 'https://placehold.co/600x600.png', alt: 'Nova Smartwatch Pro Image 1', order: 0, isPrimary: true },
      { id: 'img-2-2', url: 'https://placehold.co/600x600.png', alt: 'Nova Smartwatch Pro Image 2', order: 1, isPrimary: false },
      { id: 'img-2-3', url: 'https://placehold.co/600x600.png', alt: 'Nova Smartwatch Pro Image 3', order: 2, isPrimary: false },
    ],
    rating: 4.6, // PERSONALIZABLE
    reviewsCount: 180, // PERSONALIZABLE
    stock: 75, // PERSONALIZABLE
    isFeatured: true, // PERSONALIZABLE
    isNew: true, // PERSONALIZABLE: Marcado como nuevo
    isBestseller: false, // PERSONALIZABLE
    tags: ['smartwatch', 'fitness tracker', 'wearable tech'], // PERSONALIZABLE
    dataAiHint: 'smartwatch modern',
    features: ['AMOLED Display', '14-Day Battery', 'Health Monitoring', 'GPS Tracking', 'Water Resistant'], // PERSONALIZABLE
    colors: ['Midnight Black', 'Rose Gold', 'Silver Steel'], // PERSONALIZABLE
    dimensions: '46 x 39 x 10.9 mm', // PERSONALIZABLE
    weight: '52g (without strap)', // PERSONALIZABLE
    warranty: '1 year', // PERSONALIZABLE
    shippingInfo: 'Free shipping, arrives in 1-2 days', // PERSONALIZABLE
    inWishlist: false,
    compareCount: 8,
    reviews: [ // PERSONALIZABLE
      {
        id: 'review-2-1',
        user: 'Mike Rodriguez', // PERSONALIZABLE
        rating: 5, // PERSONALIZABLE
        comment: 'Battery life is incredible, exactly as advertised!', // PERSONALIZABLE
        date: '2024-07-22T11:00:00Z', // PERSONALIZABLE
        verified: true // PERSONALIZABLE
      }
    ],
    createdAt: new Date('2023-03-10T12:00:00Z').toISOString(),
  },
  {
    id: '3',
    name: 'ErgoTech Keyboard K5', // PERSONALIZABLE
    slug: 'ergotech-keyboard-k5', // PERSONALIZABLE
    description: 'Maximize your comfort and productivity with the ErgoTech K5 wireless mechanical keyboard. Customizable RGB, programmable keys, and ergonomic design.', // PERSONALIZABLE
    shortDescription: 'Wireless mechanical keyboard with RGB and ergonomic design', // PERSONALIZABLE
    technicalSpec: 'Type: Mechanical (Brown Switches). Connectivity: Bluetooth, 2.4GHz Wireless, USB-C. Backlight: RGB per key.', // PERSONALIZABLE
    price: 89.00, // PERSONALIZABLE
    categorySlug: 'office-tech', // PERSONALIZABLE
    category: findCategoryBySlug('office-tech'),
    brand: 'ErgoTech', // PERSONALIZABLE
    images: [ // PERSONALIZABLE
      { id: 'img-3-1', url: 'https://placehold.co/600x600.png', alt: 'ErgoTech Keyboard K5 Image 1', order: 0, isPrimary: true },
      { id: 'img-3-2', url: 'https://placehold.co/600x600.png', alt: 'ErgoTech Keyboard K5 Image 2', order: 1, isPrimary: false },
    ],
    rating: 4.9, // PERSONALIZABLE: Rating muy alto
    reviewsCount: 320, // PERSONALIZABLE
    stock: 120, // PERSONALIZABLE: Buen stock
    isFeatured: false, // PERSONALIZABLE
    isNew: false, // PERSONALIZABLE
    isBestseller: true, // PERSONALIZABLE: Es bestseller
    tags: ['keyboard', 'mechanical keyboard', 'office setup'], // PERSONALIZABLE
    dataAiHint: 'ergonomic keyboard',
    features: ['Mechanical Switches', 'RGB Backlighting', 'Wireless Connectivity', 'Programmable Keys'], // PERSONALIZABLE
    colors: ['Space Gray', 'Pure White'], // PERSONALIZABLE
    dimensions: '17.3" x 5.1" x 1.6"', // PERSONALIZABLE
    weight: '2.2 lbs', // PERSONALIZABLE
    warranty: '2 years', // PERSONALIZABLE
    shippingInfo: 'Free shipping, arrives in 2-3 days', // PERSONALIZABLE
    inWishlist: false,
    compareCount: 15,
    reviews: [], // PERSONALIZABLE: Sin reseñas aún
    createdAt: new Date('2023-04-05T12:00:00Z').toISOString(),
  },
  {
    id: '4',
    name: 'Aura LED Smart Bulb Pack (4)', // PERSONALIZABLE
    slug: 'aura-led-smart-bulb-pack', // PERSONALIZABLE
    description: 'Transform your home lighting with Aura Smart Bulbs. Millions of colors, tunable whites, and voice control compatibility.', // PERSONALIZABLE
    shortDescription: '4-pack of RGB smart bulbs with voice control', // PERSONALIZABLE
    technicalSpec: 'Type: LED E26. Colors: RGB + Tunable White (2700K-6500K). Lumens: 800lm per bulb. Connectivity: Wi-Fi.', // PERSONALIZABLE
    price: 49.99, // PERSONALIZABLE: Precio con descuento
    originalPrice: 69.99, // PERSONALIZABLE: Precio original
    discountPercentage: 29, // PERSONALIZABLE: Descuento del 29%
    categorySlug: 'smart-home', // PERSONALIZABLE
    category: findCategoryBySlug('smart-home'),
    brand: 'Aura Home', // PERSONALIZABLE
    images: [ // PERSONALIZABLE
        { id: 'img-4-1', url: 'https://placehold.co/600x600.png', alt: 'Aura LED Image 1', order: 0, isPrimary: true },
        { id: 'img-4-2', url: 'https://placehold.co/600x600.png', alt: 'Aura LED Image 2', order: 1, isPrimary: false },
        { id: 'img-4-3', url: 'https://placehold.co/600x600.png', alt: 'Aura LED Image 3', order: 2, isPrimary: false }
    ],
    rating: 4.5, // PERSONALIZABLE
    reviewsCount: 150, // PERSONALIZABLE
    stock: 200, // PERSONALIZABLE: Alto stock
    isFeatured: true, // PERSONALIZABLE
    isNew: false, // PERSONALIZABLE
    isBestseller: false, // PERSONALIZABLE
    tags: ['smart bulb', 'led lighting', 'home automation'], // PERSONALIZABLE
    dataAiHint: 'smart bulb',
    features: ['16M Colors', 'Voice Control', 'Schedule & Timer', 'Energy Efficient'], // PERSONALIZABLE
    colors: ['Negro Sigiloso', 'Blanco Ártico'], // PERSONALIZABLE
    warranty: '2 years', // PERSONALIZABLE
    shippingInfo: 'Free shipping, arrives in 2-3 days', // PERSONALIZABLE
    inWishlist: false,
    compareCount: 6,
    reviews: [], // PERSONALIZABLE: Sin reseñas
    createdAt: new Date('2023-05-01T10:00:00Z').toISOString(),
  },
  // ... Puedes continuar agregando más productos siguiendo este patrón
];

// BLOGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG

// Enhanced Blog Posts with more metadata
export const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'watchos-26-polar-grit-x2-nuevos-relojes-inteligentes-2025', // PERSONALIZABLE: URL del blog post
    title: 'WatchOS 26 y Polar Grit X2: la nueva generación de relojes inteligentes para entrenamiento y vida diaria', // PERSONALIZABLE: Título
    excerpt: 'Apple impulsa la experiencia con watchOS 26 y su nuevo diseño “Liquid Glass”, mientras Polar lanza el Grit X2, un reloj de aventura con navegación avanzada y gran autonomía.', // PERSONALIZABLE: Resumen
    content: `
    <p>Apple presentó oficialmente watchOS 26 durante la última WWDC, con un rediseño visual “Liquid Glass” y potentes mejoras:</p>
      <ul>
        <li><strong>Workout Buddy</strong>: un coach personal durante tus entrenamientos</li>
        <li>Widgets y accesibilidad: traducción en vivo, subtítulos y más</li>
        <li>Mayor integración de inteligencia artificial en apps nativas</li>
      </ul>

      <p>Por otro lado, Polar ha introducido el <strong>Grit X2</strong>, un reloj robusto pensado para deportistas y aventureros:</p>
      <ul>
        <li>Pantalla AMOLED + cristal de zafiro</li>
        <li>GPS dual junto con mapas offline y navegación giro a giro</li>
        <li>Monitoreo completo de salud: ECG, SpO₂, temperatura y más</li>
        <li>Hasta 90 horas de autonomía en modo ahorro</li>
      </ul>

      <p>🔄 <strong>Comparativa rápida</strong>:</p>
      <table>
        <tr><th>Aspecto</th><th>watchOS 26</th><th>Polar Grit X2</th></tr>
        <tr><td>Enfoque</td><td>Vida diaria y entreno</td><td>Aventura y deporte</td></tr>
        <tr><td>Autonomía</td><td>~18–24 h</td><td>hasta 90 h</td></tr>
        <tr><td>Nuevas funciones</td><td>IA, accesibilidad, traducción</td><td>GPS dual, mapas offline, herramientas deportivas</td></tr>
      </table>

      <p>Ambos son excelentes opciones, dependiendo de tu estilo de vida. Si entrenas y haces deporte, el Grit X2 te cubre. Si usas iPhone y quieres funciones diarias con IA, el Apple Watch es tu mejor opción.</p>
    `, // PERSONALIZABLE: Contenido completo
    author: 'Pablo Henao', // PERSONALIZABLE: Autor
    authorTitle: 'Tecnología y Tendencias', // PERSONALIZABLE: Título del autor
    authorImage: 'https://placehold.co/100x100.png', // PERSONALIZABLE: Foto del autor
    date: '2025-06-09T12:00:00Z', // PERSONALIZABLE: Fecha de publicación
    readTime: '7 min read', // PERSONALIZABLE: Tiempo de lectura estimado
    imageUrl: 'https://cdn.mos.cms.futurecdn.net/FkGweMeB7hdPgaSFQdgsfj-1200-80.jpg', // PERSONALIZABLE: Imagen principal
    tags: ['relojes inteligentes', 'smartwatch', 'tecnología', 'Polar', 'Apple'], // PERSONALIZABLE: Etiquetas
    dataAiHint: 'relojes inteligentes smartwatch 2025',
    category: 'Tecnología', // PERSONALIZABLE: Categoría del blog
    featured: true, // PERSONALIZABLE: Mostrar como destacado
    views: 0, // PERSONALIZABLE: Número de vistas
    likes: 0, // PERSONALIZABLE: Número de likes
  },
  {
    id: '2',
    slug: 'celulares-carga-rapida-2025', // PERSONALIZABLE
    title: 'Los Celulares con carga rápida más potentes de 2025: velocidad y autonomía sin límites', // PERSONALIZABLE
    excerpt: 'Descubre los smartphones de 2025 que lideran en carga rápida: baterías de gran capacidad, tecnologías innovadoras y autonomía para todo el día. ¿Cuál es el mejor para ti?', // PERSONALIZABLE
    content: `
    <p>En 2025, la carga rápida se ha convertido en un factor clave para elegir un móvil. Las principales marcas compiten por ofrecer baterías que se recargan en minutos y tecnologías que cuidan la salud del dispositivo a largo plazo.</p>
    <ul>
      <li><strong>Xiaomi 15 Ultra</strong>: carga de 120W, batería de 5.500 mAh, 100% en solo 15 minutos.</li>
      <li><strong>Realme GT 7 Pro</strong>: carga de 150W, batería de 5.400 mAh, protección avanzada contra sobrecalentamiento.</li>
      <li><strong>OnePlus 13 Pro</strong>: carga de 100W, batería de 5.000 mAh, modo inteligente para optimizar la vida útil.</li>
      <li><strong>Samsung Galaxy S25 Ultra</strong>: carga de 65W, batería de 5.500 mAh, carga adaptativa y optimización por IA.</li>
    </ul>
    <p>La tendencia es clara: más potencia, menos tiempo de espera y mayor seguridad. Además, muchos modelos incluyen carga inalámbrica rápida y sistemas de gestión energética inteligentes.</p>
    <p>🔄 <strong>Comparativa rápida</strong>:</p>
    <table>
      <tr><th>Modelo</th><th>Carga rápida</th><th>Batería</th><th>Extras</th></tr>
      <tr><td>Xiaomi 15 Ultra</td><td>120W</td><td>5.500 mAh</td><td>100% en 15 min</td></tr>
      <tr><td>Realme GT 7 Pro</td><td>150W</td><td>5.400 mAh</td><td>Protección avanzada</td></tr>
      <tr><td>OnePlus 13 Pro</td><td>100W</td><td>5.000 mAh</td><td>Modo inteligente</td></tr>
      <tr><td>Samsung S25 Ultra</td><td>65W</td><td>5.500 mAh</td><td>Carga adaptativa IA</td></tr>
    </table>
    <p>Si buscas cargar tu móvil en minutos y olvidarte del cargador durante el día, estos modelos son tu mejor opción en 2025. Elige según tu marca favorita y las funciones extra que más te interesen.</p>
  `, // PERSONALIZABLE
    author: 'Pablo Henao', // PERSONALIZABLE
    authorTitle: 'Tecnología y Tendencias', // PERSONALIZABLE
    authorImage: 'https://placehold.co/100x100.png', // PERSONALIZABLE
    date: '2025-06-09T16:43:00Z', // PERSONALIZABLE
    readTime: '6 min read', // PERSONALIZABLE
    imageUrl: 'https://i.pinimg.com/736x/84/38/2a/84382a5c7b660d8716ce96ec65f6df69.jpg', // PERSONALIZABLE
    tags: ['móviles', 'carga rápida', 'smartphones', 'tecnología', '2025'], // PERSONALIZABLE
    dataAiHint: 'moviles carga rapida 2025 smartphones',
    category: 'Tecnología', // PERSONALIZABLE
    featured: false, // PERSONALIZABLE
    views: 0, // PERSONALIZABLE
    likes: 0, // PERSONALIZABLE
  },
  {
    id: '3',
    slug: 'guia-airpods-2025-modelos-precios-comparativa', // PERSONALIZABLE
    title: 'Guía AirPods 2025: comparativa, precios y cuál elegir según tus necesidades', // PERSONALIZABLE
    excerpt: 'Descubre todos los modelos de AirPods disponibles en 2025: desde los AirPods 4 básicos hasta los AirPods Max. Analizamos sus características, precios y cuál es el más recomendable según tu perfil.', // PERSONALIZABLE
    content: `
    <p>Apple ha convertido los AirPods en una familia completa de auriculares para todos los gustos y necesidades. En 2025, la gama se divide en tres grandes grupos: estándar, Pro e incluso los AirPods Max de diadema. ¿No sabes cuál elegir? Aquí tienes una guía rápida con lo más importante de cada modelo.</p>
    
    <ul>
      <li><strong>AirPods 4</strong>: el modelo más asequible (149€), diseño clásico, estuche compacto con USB-C y <strong>audio espacial con seguimiento</strong>. Procesador Apple H2 y excelente integración con el ecosistema Apple.</li>
      <li><strong>AirPods 4 con cancelación de ruido</strong>: por 199€, añaden <strong>cancelación activa de ruido</strong>, modo ambiente y altavoz en el estuche para localización. Muy recomendados por su comodidad y cancelación sorprendente.</li>
      <li><strong>AirPods Pro 2</strong>: la opción más completa (279€), con mejor cancelación de ruido, reducción de sonidos fuertes, amplificación de conversación y almohadillas de silicona. Son los más vendidos y mejor valorados.</li>
      <li><strong>AirPods Max</strong>: los supraaurales premium (579€), con audio espacial, cancelación de ruido y ahora con USB-C. No tienen resistencia al agua ni el chip más nuevo, pero ofrecen una experiencia audiófila y diseño exclusivo.</li>
    </ul>
    
    <p>Todos los modelos destacan por su fácil conectividad, calidad de sonido y perfecta integración con dispositivos Apple. Las valoraciones en Amazon son sobresalientes en toda la gama, especialmente en los AirPods Pro 2.</p>
    
    <p>🔄 <strong>Comparativa rápida</strong>:</p>
    <table>
      <tr><th>Modelo</th><th>Precio</th><th>Cancelación de ruido</th><th>Audio espacial</th><th>Chip</th><th>Extras</th></tr>
      <tr><td>AirPods 4</td><td>149€</td><td>No</td><td>Sí</td><td>H2</td><td>USB-C, estuche compacto</td></tr>
      <tr><td>AirPods 4 c/ cancelación</td><td>199€</td><td>Sí</td><td>Sí</td><td>H2</td><td>Modo ambiente, altavoz estuche</td></tr>
      <tr><td>AirPods Pro 2</td><td>279€</td><td>Mejorada</td><td>Sí</td><td>H2</td><td>Almohadillas, reducción sonidos fuertes</td></tr>
      <tr><td>AirPods Max</td><td>579€</td><td>Sí</td><td>Sí</td><td>H1</td><td>Supraaural, USB-C, diseño premium</td></tr>
    </table>
    
    <p><strong>Recomendación:</strong> Si buscas la mejor relación calidad-precio y la experiencia más completa, los <strong>AirPods Pro 2</strong> son la apuesta segura en 2025. Para quienes priorizan el precio, los AirPods 4 cumplen perfectamente. Y si quieres lo más premium y un diseño de diadema, los AirPods Max son tu opción.</p>
  `, // PERSONALIZABLE
    author: 'Pablo Henao', // PERSONALIZABLE
    authorTitle: 'Tecnología y Tendencias', // PERSONALIZABLE
    authorImage: 'https://placehold.co/100x100.png', // PERSONALIZABLE
    date: '2025-06-09T16:53:00Z', // PERSONALIZABLE
    readTime: '7 min read', // PERSONALIZABLE
    imageUrl: 'https://res.cloudinary.com/dztrfptfn/image/upload/v1749506358/Los_mejores_Airpods_2025_zdjgzl.png', // PERSONALIZABLE
    tags: ['AirPods', 'auriculares', 'Apple', 'audio', 'tecnología', '2025'], // PERSONALIZABLE
    dataAiHint: 'guía airpods 2025 modelos precios comparativa',
    category: 'Tecnología', // PERSONALIZABLE
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

// Enhanced helper functions
export const getFeaturedProducts = (): Product[] => products.filter(p => p.isFeatured);
export const getNewProducts = (): Product[] => products.filter(p => p.isNew);
export const getBestsellerProducts = (): Product[] => products.filter(p => p.isBestseller);
export const getProductBySlug = (slug: string): Product | undefined => products.find(p => p.slug === slug);
export const getProductsByCategory = (categorySlug: string): Product[] => products.filter(p => p.categorySlug === categorySlug);
export const getCategoryBySlug = (slug: string): Category | undefined => categories.find(c => c.slug === slug);
export const getBlogPostBySlug = (slug: string): BlogPost | undefined => blogPosts.find(p => p.slug === slug);
export const getProductsByBrand = (brand: string): Product[] => products.filter(p => p.brand === brand);
export const getProductsByPriceRange = (min: number, max: number): Product[] => products.filter(p => p.price >= min && p.price <= max);
export const getProductsOnSale = (): Product[] => products.filter(p => p.originalPrice && p.originalPrice > p.price);
export const getPopularCategories = (): Category[] => categories.filter(c => c.isPopular);
export const getFeaturedBlogPosts = (): BlogPost[] => blogPosts.filter(p => p.featured);

// Search functionality - Función de búsqueda inteligente
export const searchProducts = (query: string): Product[] => {
  const searchTerm = query.toLowerCase();
  return products.filter(p =>
    p.name.toLowerCase().includes(searchTerm) ||
    p.description.toLowerCase().includes(searchTerm) ||
    (p.tags && p.tags.some((tag: string) => tag.toLowerCase().includes(searchTerm))) ||
    (p.brand && p.brand.toLowerCase().includes(searchTerm))
  );
};

// Filter products by multiple criteria - Filtros avanzados
export const filterProducts = (filters: {
  category?: string; // Filtro por categorySlug
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  inStock?: boolean;
}): Product[] => {
  return products.filter(product => {
    if (filters.category && product.categorySlug !== filters.category) return false;
    if (filters.brand && product.brand !== filters.brand) return false;
    if (filters.minPrice && product.price < filters.minPrice) return false;
    if (filters.maxPrice && product.price > filters.maxPrice) return false;
    if (filters.minRating && product.rating < filters.minRating) return false;
    if (filters.inStock && product.stock <= 0) return false;
    return true;
  });
};

// Get unique brands - Obtener todas las marcas únicas
export const getAllBrands = (): string[] => {
  return [...new Set(products.filter(p => p.brand).map(p => p.brand as string))].sort();
};

// Get price range - Obtener rango de precios min/max
export const getPriceRange = (): { min: number; max: number } => {
  if (products.length === 0) return { min: 0, max: 0 };
  const prices = products.map(p => p.price);
  return {
    min: Math.min(...prices),
    max: Math.max(...prices)
  };
};

/* ========================================
   PROCESAMIENTO AUTOMÁTICO DE DATOS
   ========================================
   Esta sección agrega automáticamente hints de AI
   y procesa las imágenes. NO MODIFICAR.
*/

// Enhanced data processing with AI hints
categories.forEach(cat => {
  if (!cat.dataAiHint) {
    cat.dataAiHint = cat.name.toLowerCase();
  }
});

products.forEach(prod => {
  if (!prod.dataAiHint) {
    prod.dataAiHint = prod.name.split(' ').slice(0, 2).join(' ').toLowerCase();
  }
  // Agregar hints de AI a las URLs de imágenes
  prod.images = prod.images.map(img => ({
    ...img,
    url: `${img.url}?data-ai-hint=${encodeURIComponent(prod.dataAiHint as string)}`
  }));
});

blogPosts.forEach(post => {
  if (post.imageUrl && !post.imageUrl.includes('data-ai-hint')) {
    post.imageUrl = `${post.imageUrl}?data-ai-hint=${encodeURIComponent(post.dataAiHint as string)}`;
  }
  if (post.authorImage && !post.authorImage.includes('data-ai-hint')) {
    post.authorImage = `${post.authorImage}?data-ai-hint=${encodeURIComponent('author profile photo')}`;
  }
});