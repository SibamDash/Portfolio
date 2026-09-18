import { Router } from 'express';
import { db } from '../src/prisma/db';
import { requireAuth } from './auth';

const router = Router();

// Apply auth middleware to all routes in this router
router.use(requireAuth);

router.get('/', async (req, res) => {
  try {
    const projects = await db.orm.public.Project.all();
    // Sort by display order manually if orderBy is not easily known, or try to use orderBy if supported.
    // For now, sorting in memory is safe enough for a portfolio with < 100 projects.
    const sorted = [...projects].sort((a, b) => a.displayOrder - b.displayOrder);
    res.json(sorted);
  } catch (err) {
    console.error('Failed to fetch projects:', err);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

export default router;
