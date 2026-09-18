import { Router } from 'express';
import { db } from '../src/prisma/db';
import { requireAuth } from './auth';

export const adminPostsRouter = Router();
export const publicPostsRouter = Router();

// --- PUBLIC ROUTES (/api/posts) ---

// Get all published posts
publicPostsRouter.get('/', async (req, res) => {
  try {
    const posts = await db.orm.public.Post.findMany({
      where: {
        published: { equals: true }
      }
    });
    // Sort by createdAt descending (or publishedAt if available)
    const sorted = [...posts].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    res.json(sorted);
  } catch (err) {
    console.error('Failed to fetch public posts:', err);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

// Get single published post by slug
publicPostsRouter.get('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const posts = await db.orm.public.Post.findMany({
      where: {
        slug: { equals: slug },
        published: { equals: true }
      }
    });

    if (!posts || posts.length === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json(posts[0]);
  } catch (err) {
    console.error(`Failed to fetch post ${req.params.slug}:`, err);
    res.status(500).json({ error: 'Failed to fetch post details' });
  }
});

// --- ADMIN ROUTES (/api/admin/posts) ---
adminPostsRouter.use(requireAuth);

// Get all posts (including drafts)
adminPostsRouter.get('/', async (req, res) => {
  try {
    const posts = await db.orm.public.Post.findMany({});
    const sorted = [...posts].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    res.json(sorted);
  } catch (err) {
    console.error('Failed to fetch admin posts:', err);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

// Create new post
adminPostsRouter.post('/', async (req, res) => {
  try {
    const data = req.body;
    
    if (!data.slug || !data.title || !data.content) {
      return res.status(400).json({ error: 'Slug, title, and content are required' });
    }

    const newPost = await db.orm.public.Post.create({
      slug: data.slug,
      title: data.title,
      excerpt: data.excerpt || null,
      content: data.content,
      published: data.published || false,
      publishedAt: data.published ? new Date().toISOString() : null,
    });

    res.status(201).json(newPost);
  } catch (err: any) {
    console.error('Failed to create post:', err);
    if (err.message && err.message.includes('UniqueConstraintViolation')) {
      return res.status(400).json({ error: 'A post with this slug already exists' });
    }
    res.status(500).json({ error: 'Failed to create post' });
  }
});

// Delete a post
adminPostsRouter.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db.orm.public.Post.delete({ where: { id: { equals: id } } });
    res.status(200).json({ success: true });
  } catch (err) {
    console.error('Failed to delete post:', err);
    res.status(500).json({ error: 'Failed to delete post' });
  }
});
