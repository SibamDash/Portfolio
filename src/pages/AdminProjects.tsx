import { useState, useEffect } from 'react';
import { Plus, MoreHorizontal, ExternalLink, GitBranch, LayoutDashboard } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';

type Project = {
  id: string;
  name: string;
  category: string;
  status: string;
  featured: boolean;
  repositoryUrl: string;
  liveUrl: string | null;
  updatedAt: string;
};

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/admin/projects');
        if (!res.ok) throw new Error('Failed to fetch projects');
        const data = await res.json();
        setProjects(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'LIVE':
        return <span className="inline-flex items-center rounded-full bg-emerald-400/10 px-2 py-1 text-xs font-medium text-emerald-400 ring-1 ring-inset ring-emerald-400/20">Live</span>;
      case 'IN_DEVELOPMENT':
        return <span className="inline-flex items-center rounded-full bg-blue-400/10 px-2 py-1 text-xs font-medium text-blue-400 ring-1 ring-inset ring-blue-400/20">Development</span>;
      case 'ARCHIVED':
        return <span className="inline-flex items-center rounded-full bg-zinc-400/10 px-2 py-1 text-xs font-medium text-zinc-400 ring-1 ring-inset ring-zinc-400/20">Archived</span>;
      default:
        return <span className="inline-flex items-center rounded-full bg-zinc-400/10 px-2 py-1 text-xs font-medium text-zinc-400 ring-1 ring-inset ring-zinc-400/20">{status}</span>;
    }
  };

  return (
    <div className="flex-1 space-y-8 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100">Projects</h2>
          <p className="text-sm text-zinc-400">
            Manage your portfolio projects and case studies.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="default" asChild>
            <Link to="/admin/projects/new" className="flex items-center gap-2">
              <Plus size={16} />
              New Project
            </Link>
          </Button>
        </div>
      </div>

      <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 backdrop-blur-xl overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-zinc-500">Loading projects...</div>
        ) : error ? (
          <div className="p-8 text-center text-red-400">{error}</div>
        ) : projects.length === 0 ? (
          <div className="flex min-h-[400px] flex-col items-center justify-center p-8 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-zinc-800/50 mb-4">
              <LayoutDashboard className="h-10 w-10 text-zinc-500" />
            </div>
            <h3 className="text-lg font-medium text-zinc-200">No projects yet</h3>
            <p className="text-sm text-zinc-400 mt-1 mb-6 max-w-sm">
              You haven't added any projects to your portfolio. Create your first project to get started.
            </p>
            <Button variant="default" asChild>
              <Link to="/admin/projects/new" className="flex items-center gap-2">
                <Plus size={16} />
                New Project
              </Link>
            </Button>
          </div>
        ) : (
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm text-left">
              <thead className="border-b border-zinc-800 [&_tr]:border-b bg-zinc-900/80">
                <tr className="border-b border-zinc-800 transition-colors hover:bg-zinc-800/50 data-[state=selected]:bg-zinc-800">
                  <th className="h-12 px-4 align-middle font-medium text-zinc-400">Name</th>
                  <th className="h-12 px-4 align-middle font-medium text-zinc-400">Status</th>
                  <th className="h-12 px-4 align-middle font-medium text-zinc-400">Category</th>
                  <th className="h-12 px-4 align-middle font-medium text-zinc-400">Links</th>
                  <th className="h-12 px-4 align-middle font-medium text-zinc-400 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0">
                {projects.map((project) => (
                  <tr key={project.id} className="border-b border-zinc-800 transition-colors hover:bg-zinc-800/20">
                    <td className="p-4 align-middle">
                      <div className="font-medium text-zinc-200">{project.name}</div>
                      {project.featured && <span className="text-[10px] text-yellow-500 font-medium">FEATURED</span>}
                    </td>
                    <td className="p-4 align-middle">
                      {getStatusBadge(project.status)}
                    </td>
                    <td className="p-4 align-middle text-zinc-400">
                      {project.category}
                    </td>
                    <td className="p-4 align-middle">
                      <div className="flex gap-2">
                        {project.repositoryUrl && (
                          <a href={project.repositoryUrl} target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-zinc-300">
                            <GitBranch size={16} />
                          </a>
                        )}
                        {project.liveUrl && (
                          <a href={project.liveUrl} target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-zinc-300">
                            <ExternalLink size={16} />
                          </a>
                        )}
                      </div>
                    </td>
                    <td className="p-4 align-middle text-right">
                      <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-zinc-800 hover:text-zinc-100 h-8 w-8 text-zinc-400">
                        <MoreHorizontal size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
