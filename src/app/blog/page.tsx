// @/app/blog/page.tsx
import { blogPosts } from '@/data/mock-data';
import BlogPostCard from '@/components/blog/blog-post-card';

export default function BlogPage() {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-3">
        <h1 className="text-4xl font-bold">Houzze Tec Blog</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Stay updated with the latest news, trends, and insights in the world of technology and smart living.
        </p>
      </div>
      
      {blogPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground py-12">No blog posts available yet. Check back soon!</p>
      )}
    </div>
  );
}