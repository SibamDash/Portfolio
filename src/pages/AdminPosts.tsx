import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Loader2, FileText, Trash2, Globe, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function AdminPosts() {
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/admin/posts');
      if (!res.ok) throw new Error('Failed to fetch posts');
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const deletePost = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;
    try {
      const res = await fetch(`/api/admin/posts/${id}`, { method: 'DELETE' });
      if (res.ok) fetchPosts();
    } catch (err) {
      console.error('Failed to delete post:', err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-100">Blog Posts</h1>
          <p className="text-sm text-zinc-400">Manage technical writing and essays.</p>
        </div>
        <Button asChild className="gap-2">
          <Link to="/admin/posts/new">
            <Plus className="h-4 w-4" />
            New Post
          </Link>
        </Button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-zinc-600" />
        </div>
      ) : posts.length === 0 ? (
        <div className="rounded-xl border border-dashed border-zinc-800 bg-zinc-900/50 p-12 text-center flex flex-col items-center justify-center">
          <FileText className="h-10 w-10 text-zinc-600 mb-4" />
          <h3 className="text-lg font-medium text-zinc-300">No posts yet</h3>
          <p className="text-sm text-zinc-500 mb-4">Start writing your first technical post.</p>
          <Button asChild variant="outline">
            <Link to="/admin/posts/new">Create Post</Link>
          </Button>
        </div>
      ) : (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 overflow-hidden">
          <table className="w-full text-sm text-left">
            <thead className="bg-zinc-950/50 text-zinc-400 border-b border-zinc-800">
              <tr>
                <th className="px-4 py-3 font-medium">Title</th>
                <th className="px-4 py-3 font-medium w-32">Status</th>
                <th className="px-4 py-3 font-medium hidden md:table-cell">Date</th>
                <th className="px-4 py-3 font-medium text-right w-24">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50">
              {posts.map(post => (
                <tr key={post.id} className="hover:bg-zinc-800/20 transition-colors">
                  <td className="px-4 py-3">
                    <div className="font-medium text-zinc-200">{post.title}</div>
                    <div className="text-xs text-zinc-500 font-mono mt-0.5">/{post.slug}</div>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={post.published ? 'default' : 'secondary'} className="text-[10px] gap-1">
                      {post.published ? <Globe className="h-3 w-3" /> : <Lock className="h-3 w-3" />}
                      {post.published ? 'PUBLISHED' : 'DRAFT'}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell text-zinc-400">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Button variant="ghost" size="icon" onClick={() => deletePost(post.id)} className="h-8 w-8 text-zinc-500 hover:text-red-400">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
