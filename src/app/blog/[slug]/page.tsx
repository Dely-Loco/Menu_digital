// src/app/blog/[slug]/page.tsx
import { getBlogPostBySlug, blogPosts as allBlogPosts } from '@/data/mock-data';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CalendarDays, UserCircle, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import type { BlogPost } from '@/types';

// ✅ Interfaz actualizada para Next.js 15
interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

// ✅ Función para generar metadata con await params
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  
  // Intentar obtener el post para metadata más específica
  try {
    const post = await getBlogPostBySlug(slug);
    
    if (!post) {
      return {
        title: 'Artículo no encontrado | Blog',
        description: `No se encontró el artículo: ${slug}`,
      };
    }

    const imageUrl = post.imageUrl || post.socialImage;

    return {
      title: `${post.title} | Blog`,
      description: post.excerpt || post.metaDescription || `Artículo del blog sobre ${post.title}`,
      openGraph: {
        title: post.title,
        description: post.excerpt || post.metaDescription,
        type: 'article',
        publishedTime: post.date,
        authors: [post.author],
        images: imageUrl ? [{ url: imageUrl, alt: post.title }] : [],
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: post.excerpt || post.metaDescription,
        images: imageUrl ? [imageUrl] : [],
      },
    };
  } catch {
    // Fallback si hay error al obtener el post
    return {
      title: `Blog Post: ${slug}`,
      description: `Artículo del blog sobre ${slug}`,
    };
  }
}

// ✅ Generación de rutas estáticas (opcional)
export async function generateStaticParams() {
  try {
    return allBlogPosts.map((post: BlogPost) => ({
      slug: post.slug,
    }));
  } catch {
    // Si no hay blogPosts disponibles, retornar array vacío
    return [];
  }
}

// ✅ Componente principal con await params
export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  
  // Intentar obtener el post
  let post;
  try {
    post = await getBlogPostBySlug(slug);
  } catch {
    console.error(`Error fetching blog post: ${slug}`);
    notFound();
  }
  
  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Imagen principal del artículo */}
      {post.imageUrl && (
        <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg border border-gray-200 mb-8">
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
          />
        </div>
      )}

      {/* Header del artículo */}
      <header className="space-y-6 mb-8">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-gray-900 dark:text-gray-100">
          {post.title}
        </h1>
        
        {/* Metadata del artículo */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center">
            <CalendarDays className="h-4 w-4 mr-2 text-blue-500" />
            <time dateTime={post.date}>
              {format(new Date(post.date), "d 'de' MMMM, yyyy", { locale: es })}
            </time>
          </div>
          
          <div className="flex items-center">
            <UserCircle className="h-4 w-4 mr-2 text-blue-500" />
            <span>Por: {post.author}</span>
          </div>
          
          {post.category && (
            <Badge variant="outline" className="font-medium">
              {post.category}
            </Badge>
          )}
        </div>

        {/* Tags del artículo */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {post.tags.map((tag) => (
              <Link href={`/blog/tag/${tag}`} key={tag} className="no-underline">
                <Badge
                  variant="secondary"
                  className="hover:bg-blue-100 dark:hover:bg-blue-900 text-blue-800 dark:text-blue-200 transition-colors cursor-pointer"
                >
                  #{tag}
                </Badge>
              </Link>
            ))}
          </div>
        )}
      </header>

      {/* Contenido del artículo */}
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <div
          className="prose-headings:text-gray-900 dark:prose-headings:text-gray-100 
                     prose-p:text-gray-700 dark:prose-p:text-gray-300
                     prose-a:text-blue-600 dark:prose-a:text-blue-400 
                     prose-a:no-underline hover:prose-a:underline
                     prose-strong:text-gray-900 dark:prose-strong:text-gray-100
                     prose-img:rounded-lg prose-img:shadow-md"
          dangerouslySetInnerHTML={{ 
            __html: post.content || post.excerpt || '<p>Contenido no disponible</p>' 
          }}
        />
      </div>

      {/* Navegación y acciones */}
      <footer className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <Button asChild variant="outline" className="group">
            <Link href="/blog" className="flex items-center">
              <ArrowLeft className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" />
              Volver al Blog
            </Link>
          </Button>
          
          {/* Información adicional del post */}
          {post.readTime && (
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Tiempo de lectura: {post.readTime} min
            </div>
          )}
        </div>
      </footer>
    </article>
  );
}