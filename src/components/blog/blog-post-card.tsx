// @/components/blog/blog-post-card.tsx
import Image from 'next/image';
import Link from 'next/link';
import type { BlogPost } from '@/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, UserCircle } from 'lucide-react';
import {format} from 'date-fns';

interface BlogPostCardProps {
  post: BlogPost;
}

export default function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <Card className="flex flex-col h-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg">
      {post.imageUrl && (
        <Link href={`/blog/${post.slug}`} className="block">
          <CardHeader className="p-0 relative aspect-video">
            <Image
              src={post.imageUrl}
              alt={post.title}
              width={400}
              height={225}
              className="object-cover w-full h-full"
              data-ai-hint="blog post image"
            />
          </CardHeader>
        </Link>
      )}
      <CardContent className="p-6 flex-grow">
        <Link href={`/blog/${post.slug}`} className="block">
          <CardTitle className="text-xl font-semibold mb-2 hover:text-primary transition-colors">
            {post.title}
          </CardTitle>
        </Link>
        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{post.excerpt}</p>
        
        <div className="flex items-center text-xs text-muted-foreground mb-1">
          <CalendarDays className="h-3.5 w-3.5 mr-1.5" />
          {format(new Date(post.date), 'MMMM d, yyyy')}
        </div>
        <div className="flex items-center text-xs text-muted-foreground">
          <UserCircle className="h-3.5 w-3.5 mr-1.5" />
          {post.author}
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <div className="w-full">
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
              ))}
            </div>
          )}
          <Link href={`/blog/${post.slug}`} className="text-sm font-medium text-primary hover:underline">
            Read More &rarr;
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}