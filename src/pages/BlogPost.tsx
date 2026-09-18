import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Loader2, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/posts/${slug}`);
        if (!res.ok) throw new Error('Post not found');
        const data = await res.json();
        setPost(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPost();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 md:px-8 py-24 flex justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="container mx-auto px-4 md:px-8 py-24 text-center">
        <h1 className="text-3xl font-bold mb-4">Post not found</h1>
        <p className="text-muted-foreground mb-8">The article you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <Link to="/writing">Browse all posts</Link>
        </Button>
      </div>
    );
  }

  return (
    <article className="container mx-auto px-4 md:px-8 py-12 md:py-16 animate-in fade-in duration-700">
      <div className="max-w-3xl mx-auto">
        <div className="mb-10">
          <Link to="/writing" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-8 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to all posts
          </Link>
          <time dateTime={post.publishedAt || post.createdAt} className="block text-sm text-muted-foreground mb-2">
            {new Date(post.publishedAt || post.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </time>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 leading-tight">
            {post.title}
          </h1>
          {post.excerpt && (
            <p className="text-xl text-muted-foreground leading-relaxed">
              {post.excerpt}
            </p>
          )}
        </div>
        
        {/* Render markdown using prose from @tailwindcss/typography */}
        <div className="prose prose-zinc dark:prose-invert max-w-none 
                        prose-headings:font-bold prose-headings:tracking-tight 
                        prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                        prose-pre:bg-zinc-950 prose-pre:border prose-pre:border-zinc-800
                        prose-img:rounded-xl">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
      </div>
    </article>
  );
}
