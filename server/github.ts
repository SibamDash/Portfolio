import { Router } from 'express';
import { requireAuth } from './auth';

const router = Router();

// Apply auth middleware
router.use(requireAuth);

/**
 * Parses a GitHub URL into owner and repo.
 * e.g. "https://github.com/SibamDash/Portfolio" -> { owner: "SibamDash", repo: "Portfolio" }
 */
function parseGithubUrl(url: string) {
  try {
    const parsed = new URL(url);
    if (parsed.hostname !== 'github.com') return null;
    const parts = parsed.pathname.split('/').filter(Boolean);
    if (parts.length < 2) return null;
    return { owner: parts[0], repo: parts[1] };
  } catch (e) {
    return null;
  }
}

router.post('/import', async (req, res) => {
  const { repositoryUrl } = req.body;
  if (!repositoryUrl) {
    return res.status(400).json({ error: 'Repository URL is required' });
  }

  const parsed = parseGithubUrl(repositoryUrl);
  if (!parsed) {
    return res.status(400).json({ error: 'Invalid GitHub repository URL' });
  }

  const { owner, repo } = parsed;
  const headers: Record<string, string> = {
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': 'Portfolio-App'
  };

  if (process.env.GITHUB_TOKEN) {
    headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`;
  }

  try {
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`, { headers });
    
    if (!response.ok) {
      if (response.status === 404) {
        return res.status(404).json({ error: 'Repository not found or is private' });
      }
      if (response.status === 403) {
        return res.status(403).json({ error: 'GitHub API rate limit exceeded' });
      }
      return res.status(response.status).json({ error: 'Failed to fetch repository metadata' });
    }

    const data = await response.json();

    const normalizedData = {
      name: data.name,
      slug: data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      repositoryUrl: data.html_url,
      shortDescription: data.description || '',
      description: data.description || '',
      technologies: data.topics || [],
      githubMetadata: {
        stars: data.stargazers_count,
        forks: data.forks_count,
        language: data.language,
        updatedAt: data.updated_at
      }
    };

    // If language exists but isn't in topics, add it
    if (data.language && !normalizedData.technologies.includes(data.language.toLowerCase())) {
      normalizedData.technologies.push(data.language);
    }

    res.json(normalizedData);
  } catch (err) {
    console.error('GitHub API error:', err);
    res.status(500).json({ error: 'Internal server error while communicating with GitHub' });
  }
});

export default router;
