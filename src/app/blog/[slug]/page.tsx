// @/app/blog/[slug]/page.tsx
import { getBlogPostBySlug, blogPosts as allBlogPosts } from '@/data/mock-data';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, UserCircle } from 'lucide-react';
import {format} from 'date-fns';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface BlogPostPageParams {
  params: {
    slug: string;
  };
}

// Generate static paths for blog posts
export async function generateStaticParams() {
  return allBlogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPostDetailPage({ params }: BlogPostPageParams) {
  const post = getBlogPostBySlug(params.slug);

  if (!post) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold">Blog post not found</h1>
         <p className="text-muted-foreground">Sorry, we couldn't find the post you're looking for.</p>
        <Button asChild variant="link" className="mt-4">
          <Link href="/blog">Back to Blog</Link>
        </Button>
      </div>
    );
  }

  return (
    <article className="max-w-3xl mx-auto space-y-8 py-8">
      {post.imageUrl && (
        <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg">
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            className="object-cover"
            priority
            data-ai-hint={post.dataAiHint || 'blog header image'}
          />
        </div>
      )}
      
      <header className="space-y-3">
        <h1 className="text-4xl font-extrabold leading-tight lg:text-5xl">{post.title}</h1>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <div className="flex items-center">
            <CalendarDays className="h-4 w-4 mr-1.5" />
            <span>{format(new Date(post.date), 'MMMM d, yyyy')}</span>
          </div>
          <div className="flex items-center">
            <UserCircle className="h-4 w-4 mr-1.5" />
            <span>By {post.author}</span>
          </div>
        </div>
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary">{tag}</Badge>
            ))}
          </div>
        )}
      </header>
      
      <div
        className="prose prose-lg dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content || post.excerpt }} // Using excerpt if full content is placeholder
      />

      <div className="pt-8 border-t">
        <Button asChild variant="outline">
          <Link href="/blog"> &larr; Back to Blog</Link>
        </Button>
      </div>
    </article>
  );
}
