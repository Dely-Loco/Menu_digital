// @/app/blog/page.tsx
import { blogPosts } from '@/data/mock-data';
import BlogPostCard from '@/components/blog/blog-post-card'; // Asumo que este componente está creado y funciona
import { Metadata } from 'next'; // Para metadatos

export const metadata: Metadata = {
  title: 'Blog | Houzze Tec',
  description: 'Explora nuestros artículos sobre tecnología, gadgets, hogar inteligente y más. Mantente al día con Houzze Tec.',
};

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-10 md:py-12 space-y-10"> {/* Ajustado padding y space */}
      <div className="text-center space-y-3">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">Blog <span className="text-gradient-houzze">Houzze Tec</span></h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {/* TRADUCIDO */}
          Mantente al día con las últimas noticias, tendencias y consejos del mundo de la tecnología y la vida inteligente.
        </p>
      </div>
      
      {blogPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 py-16 text-lg"> {/* Aumentado padding y tamaño de texto */}
          {/* TRADUCIDO */}
          Aún no hay artículos en el blog. ¡Vuelve pronto!
        </p>
      )}
    </div>
  );
}