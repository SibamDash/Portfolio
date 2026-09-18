import { Router } from 'express';
import { db } from '../src/prisma/db';
import { requireAuth } from './auth';

const router = Router();
router.use(requireAuth);

router.get('/', async (req, res) => {
  try {
    const projects = await db.orm.public.Project.all();
    const sorted = [...projects].sort((a, b) => a.displayOrder - b.displayOrder);
    res.json(sorted);
  } catch (err) {
    console.error('Failed to fetch projects:', err);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

router.post('/', async (req, res) => {
  try {
    const data = req.body;
    
    // Validation function
    const isValidHttpUrl = (str: string) => {
      try {
        const url = new URL(str);
        return url.protocol === 'http:' || url.protocol === 'https:';
      } catch {
        return false;
      }
    };

    if (!data.repositoryUrl || !isValidHttpUrl(data.repositoryUrl)) {
      return res.status(400).json({ error: 'Valid repository URL is required' });
    }

    if (data.liveUrl && !isValidHttpUrl(data.liveUrl)) {
      return res.status(400).json({ error: 'Live URL must be a valid HTTP/HTTPS URL' });
    }

    // Convert arrays if needed, default to empty arrays for nested lists
    const newProject = await db.orm.public.Project.create({
      slug: data.slug,
      name: data.name,
      category: data.category,
      shortDescription: data.shortDescription || '',
      description: data.description || '',
      repositoryUrl: data.repositoryUrl,
      liveUrl: data.liveUrl || null,
      logoUrl: data.logoUrl || null,
      previewImageUrl: data.previewImageUrl || null,
      previewVideoUrl: data.previewVideoUrl || null,
      technologies: Array.isArray(data.technologies) ? data.technologies : [],
      featured: Boolean(data.featured),
      status: data.status || 'IN_DEVELOPMENT',
      displayOrder: Number(data.displayOrder) || 0,
      problem: data.problem || null,
      solution: data.solution || null,
      architecture: data.architecture || null,
      architectureNodes: data.architectureNodes || null,
      engineeringDecisions: Array.isArray(data.engineeringDecisions) ? data.engineeringDecisions : [],
      challenges: Array.isArray(data.challenges) ? data.challenges : [],
      results: Array.isArray(data.results) ? data.results : [],
      apiDocumentationUrl: data.apiDocumentationUrl || null,
      caseStudyEnabled: Boolean(data.caseStudyEnabled),
      githubMetadata: data.githubMetadata || null
    });
    
    res.status(201).json(newProject);
  } catch (err) {
    console.error('Failed to create project:', err);
    res.status(500).json({ error: 'Failed to create project' });
  }
});

export default router;
