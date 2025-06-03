// @/app/blog/[slug]/page.tsx
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

// ✅ CORREGIDO: Tipo actualizado para Next.js 15
interface BlogPostPageParams {
  params: Promise<{
    slug: string;
  }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

// ✅ CORREGIDO: Ahora usa await params
export async function generateMetadata({ params }: BlogPostPageParams): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: 'Artículo no encontrado | Houzze Tec',
    };
  }

  const imageUrl = post.imageUrl || post.socialImage;

  return {
    title: `${post.title} | Blog Houzze Tec`,
    description: post.excerpt || post.metaDescription,
    openGraph: {
      title: post.title,
      description: post.excerpt || post.metaDescription,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      images: imageUrl ? [{ url: imageUrl, alt: post.title }] : [],
    },
  };
}

// ✅ OK: generación de rutas estáticas (sin cambios necesarios)
export async function generateStaticParams() {
  return allBlogPosts.map((post: BlogPost) => ({
    slug: post.slug,
  }));
}

// ✅ CORREGIDO: Función principal ahora usa await params
export default async function BlogPostDetailPage({ params }: BlogPostPageParams) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12 space-y-8">
      {post.imageUrl && (
        <div className="relative aspect-video rounded-lg overflow-hidden shadow-xl border border-gray-200">
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            className="object-cover"
            priority
            data-ai-hint={post.dataAiHint || 'imagen principal del blog'}
          />
        </div>
      )}

      <header className="space-y-4">
        <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight lg:text-5xl text-gray-900">
          {post.title}
        </h1>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500">
          <div className="flex items-center">
            <CalendarDays className="h-4 w-4 mr-1.5 text-orange-500" />
            <span>{format(new Date(post.date), "d 'de' MMMM, yyyy", { locale: es })}</span>
          </div>
          <div className="flex items-center">
            <UserCircle className="h-4 w-4 mr-1.5 text-orange-500" />
            <span>Por: {post.author}</span>
          </div>
          {post.category && (
            <Badge variant="outline" className="font-medium">{post.category}</Badge>
          )}
        </div>
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="hover:bg-gray-200 transition-colors">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </header>

      <div
        className="prose prose-lg dark:prose-invert max-w-none prose-img:rounded-lg prose-a:text-orange-600 hover:prose-a:text-orange-700"
        dangerouslySetInnerHTML={{ __html: post.content || post.excerpt }}
      />

      <div className="pt-8 mt-8 border-t border-gray-200">
        <Button asChild variant="outline" className="hover:bg-gray-100 transition-colors">
          <Link href="/blog">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver al Blog
          </Link>
        </Button>
      </div>
    </article>
  );
}