// src/app/tag/[tag]/page.tsx
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { blogPosts } from '@/data/mock-data';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export async function generateStaticParams() {
  const tags = new Set(blogPosts.flatMap(post => post.tags || []));
  return Array.from(tags).map(tag => ({ tag }));
}

export default async function TagPage({ params }: { params: { tag: string } }) {
  const { tag } = params;
  const decodedTag = decodeURIComponent(tag);
  const filteredPosts = blogPosts.filter(post =>
    (post.tags || []).includes(decodedTag)
  );

  if (filteredPosts.length === 0) {
    notFound();
  }

  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12 space-y-10">
      <h1 className="text-3xl font-bold text-gray-900">
        Artículos etiquetados con <Badge variant="outline">#{decodedTag}</Badge>
      </h1>

      {filteredPosts.map(post => (
        <article key={post.slug} className="space-y-2 border-b pb-4">
          <Link href={`/blog/${post.slug}`}>
            <h2 className="text-2xl font-semibold text-orange-600 hover:underline">
              {post.title}
            </h2>
          </Link>
          <p className="text-gray-600 text-sm">
            {format(new Date(post.date), "d 'de' MMMM, yyyy", { locale: es })}
          </p>
          <p className="text-gray-700">{post.excerpt}</p>
        </article>
      ))}
    </section>
  );
}
