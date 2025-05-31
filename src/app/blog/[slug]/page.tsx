// @/app/blog/[slug]/page.tsx
import { getBlogPostBySlug, blogPosts as allBlogPosts } from '@/data/mock-data';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CalendarDays, UserCircle, ArrowLeft } from 'lucide-react'; // Añadido ArrowLeft
import { format } from 'date-fns';
import { es } from 'date-fns/locale'; // Importar locale en español para date-fns
import { notFound } from 'next/navigation'; // Importar notFound
import type { Metadata, ResolvingMetadata } from 'next'; // Para metadatos dinámicos
import type { BlogPost } from '@/types'; // Asumo que tienes este tipo

interface BlogPostPageParams {
  params: {
    slug: string;
  };
}

// Generar metadatos dinámicos para SEO
export async function generateMetadata(
  { params }: BlogPostPageParams,
  parent: ResolvingMetadata // Opcional, para acceder a metadatos del padre
): Promise<Metadata> {
  const post = getBlogPostBySlug(params.slug);

  if (!post) {
    return {
      title: 'Artículo no encontrado | Houzze Tec',
    };
  }

  // Obtener la URL de la imagen para OpenGraph
  const imageUrl = post.imageUrl || (post.socialImage ? post.socialImage : undefined);

  return {
    title: `${post.title} | Blog Houzze Tec`,
    description: post.excerpt || post.metaDescription, // Usar metaDescription si existe
    openGraph: {
      title: post.title,
      description: post.excerpt || post.metaDescription,
      type: 'article',
      publishedTime: post.date, // Asume que post.date es un string ISO
      authors: [post.author],
      images: imageUrl ? [{ url: imageUrl, alt: post.title }] : [],
    },
    // Puedes añadir más metadatos como keywords, etc.
  };
}


// Generate static paths for blog posts
export async function generateStaticParams() {
  return allBlogPosts.map((post: BlogPost) => ({ // Tipar post aquí
    slug: post.slug,
  }));
}

export default function BlogPostDetailPage({ params }: BlogPostPageParams) {
  const post = getBlogPostBySlug(params.slug);

  if (!post) {
    // notFound() es la forma correcta de mostrar una página 404 en App Router
    notFound(); 
  }

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12 space-y-8"> {/* Ajustado padding */}
      {post.imageUrl && (
        <div className="relative aspect-video rounded-lg overflow-hidden shadow-xl border border-gray-200">
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            className="object-cover"
            priority // Carga esta imagen con prioridad
            data-ai-hint={post.dataAiHint || 'imagen principal del blog'}
          />
        </div>
      )}
      
      <header className="space-y-4"> {/* Aumentado space-y */}
        <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight lg:text-5xl text-gray-900">
          {post.title}
        </h1>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500"> {/* Ajustado gap */}
          <div className="flex items-center">
            <CalendarDays className="h-4 w-4 mr-1.5 text-orange-500" />
            {/* Formatear fecha en español */}
            <span>{format(new Date(post.date), 'd \'de\' MMMM, yyyy', { locale: es })}</span>
          </div>
          <div className="flex items-center">
            <UserCircle className="h-4 w-4 mr-1.5 text-orange-500" />
            <span>Por: {post.author}</span> {/* TRADUCIDO */}
          </div>
          {/* Mostrar categoría si existe */}
          {post.category && (
            <Badge variant="outline" className="font-medium">{post.category}</Badge>
          )}
        </div>
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="hover:bg-gray-200 transition-colors">
                {/* Podrías hacer que las etiquetas sean enlaces a una página de búsqueda por etiqueta */}
                {/* <Link href={`/blog/tags/${tag.toLowerCase().replace(/\s+/g, '-')}`}>{tag}</Link> */}
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </header>
      
      {/* Usar 'prose' para estilizar el contenido HTML. Tailwind necesita el plugin @tailwindcss/typography */}
      {/* Si 'post.content' no es HTML sino texto plano con saltos de línea, usa whitespace-pre-wrap en un <p> */}
      <div
        className="prose prose-lg dark:prose-invert max-w-none prose-img:rounded-lg prose-a:text-orange-600 hover:prose-a:text-orange-700"
        dangerouslySetInnerHTML={{ __html: post.content || post.excerpt }}
      />

      <div className="pt-8 mt-8 border-t border-gray-200"> {/* Separador más sutil y margen */}
        <Button asChild variant="outline" className="hover:bg-gray-100 transition-colors">
          <Link href="/blog"> 
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver al Blog {/* TRADUCIDO */}
          </Link>
        </Button>
      </div>
    </article>
  );
}