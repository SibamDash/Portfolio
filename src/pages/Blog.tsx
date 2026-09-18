import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Loader2, ArrowRight } from 'lucide-react';

export function Blog() {
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/posts');
        if (!res.ok) throw new Error('Failed to fetch posts');
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="container mx-auto px-4 md:px-8 py-12 md:py-16 animate-in fade-in duration-700">
      <div className="max-w-3xl mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">Writing & Thoughts</h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Essays, tutorials, and technical deep-dives into software engineering, architecture, and design.
        </p>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-32">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : posts.length === 0 ? (
        <p className="text-muted-foreground">No articles published yet. Check back soon!</p>
      ) : (
        <div className="grid grid-cols-1 gap-12 md:gap-16 max-w-4xl">
          {posts.map((post) => (
            <article key={post.id} className="group flex flex-col items-start justify-between">
              <div className="flex items-center gap-x-4 text-xs mb-4">
                <time dateTime={post.publishedAt || post.createdAt} className="text-muted-foreground">
                  {new Date(post.publishedAt || post.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
              </div>
              <div className="group relative">
                <h3 className="mt-3 text-2xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                  <Link to={`/writing/${post.slug}`}>
                    <span className="absolute inset-0" />
                    {post.title}
                  </Link>
                </h3>
                {post.excerpt && (
                  <p className="mt-5 line-clamp-3 text-base leading-6 text-muted-foreground">
                    {post.excerpt}
                  </p>
                )}
              </div>
              <div className="mt-6 flex items-center gap-x-2 text-sm font-medium leading-6 text-primary group-hover:underline">
                Read article <ArrowRight className="h-4 w-4" />
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
