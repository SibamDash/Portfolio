import { Router } from 'express';
import { db } from '../src/prisma/db';

const router = Router();

// GET /api/projects - Fetch all LIVE projects
router.get('/', async (req, res) => {
  try {
    const projects = await db.orm.public.Project.findMany({
      where: {
        status: { equals: 'LIVE' }
      }
    });
    
    // Sort manually as a fallback, or use orderBy if Prisma 8 supports it natively on findMany
    const sorted = [...projects].sort((a, b) => a.displayOrder - b.displayOrder);
    res.json(sorted);
  } catch (err) {
    console.error('Failed to fetch public projects:', err);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

// GET /api/projects/:slug - Fetch a single LIVE project by slug
router.get('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const projectArray = await db.orm.public.Project.findMany({
      where: {
        slug: { equals: slug },
        status: { equals: 'LIVE' }
      }
    });

    if (!projectArray || projectArray.length === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.json(projectArray[0]);
  } catch (err) {
    console.error(`Failed to fetch project ${req.params.slug}:`, err);
    res.status(500).json({ error: 'Failed to fetch project details' });
  }
});

export default router;
