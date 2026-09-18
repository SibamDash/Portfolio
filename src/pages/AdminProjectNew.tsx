import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GitBranch, Loader2 } from 'lucide-react';
import { Button } from '../components/ui/button';

export default function AdminProjectNew() {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2>(1);
  
  // Step 1 State
  const [repoUrl, setRepoUrl] = useState('');
  const [isImporting, setIsImporting] = useState(false);
  const [importError, setImportError] = useState('');

  // Step 2 State
  const [formData, setFormData] = useState<any>({
    name: '',
    slug: '',
    repositoryUrl: '',
    liveUrl: '',
    shortDescription: '',
    description: '',
    category: 'BACKEND',
    technologies: [],
    status: 'IN_DEVELOPMENT',
    featured: false,
    displayOrder: 0,
    githubMetadata: null,
    architectureNodes: null
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleImport = async (e: React.FormEvent) => {
    e.preventDefault();
    setImportError('');
    setIsImporting(true);

    try {
      const res = await fetch('/api/admin/github/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ repositoryUrl: repoUrl })
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Failed to import repository metadata');
      }
      
      setFormData({
        ...formData,
        ...data,
        repositoryUrl: repoUrl
      });
      setStep(2);
    } catch (err: any) {
      setImportError(err.message);
    } finally {
      setIsImporting(false);
    }
  };

  const handleSave = async (status: string) => {
    setIsSaving(true);
    
    try {
      const finalData = {
        ...formData,
        status,
        technologies: typeof formData.technologies === 'string' 
          ? formData.technologies.split(',').map((t: string) => t.trim()).filter(Boolean)
          : formData.technologies
      };
      
      const res = await fetch('/api/admin/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalData)
      });
      
      if (!res.ok) {
        throw new Error('Failed to create project');
      }
      
      navigate('/admin/projects');
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to save');
    } finally {
      setIsSaving(false);
    }
  };

  if (step === 1) {
    return (
      <div className="flex-1 space-y-8 p-8 pt-6 max-w-2xl mx-auto w-full">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100">Add Project</h2>
          <p className="text-sm text-zinc-400">
            Import a project directly from GitHub. We'll automatically fetch the repository metadata.
          </p>
        </div>

        <form onSubmit={handleImport} className="space-y-6 rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-200">GitHub Repository URL <span className="text-red-400">*</span></label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <GitBranch size={16} className="text-zinc-500" />
              </div>
              <input
                type="url"
                required
                placeholder="https://github.com/username/repo"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                className="w-full rounded-lg border border-zinc-800 bg-zinc-950 pl-10 pr-4 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-zinc-700 focus:outline-none focus:ring-1 focus:ring-zinc-700 transition-colors"
              />
            </div>
          </div>

          {importError && (
            <div className="rounded-md bg-red-950/50 p-3 text-sm text-red-400 border border-red-900/50">
              {importError}
            </div>
          )}

          <div className="flex justify-end gap-3">
            <Button variant="outline" type="button" onClick={() => navigate('/admin/projects')}>
              Cancel
            </Button>
            <Button variant="default" type="submit" disabled={isImporting || !repoUrl}>
              {isImporting ? (
                <>
                  <Loader2 size={16} className="mr-2 animate-spin" />
                  Importing...
                </>
              ) : 'Import Metadata'}
            </Button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-8 p-8 pt-6 max-w-4xl mx-auto w-full pb-20">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-100">Review & Publish</h2>
        <p className="text-sm text-zinc-400">
          Review the imported metadata and add additional details before publishing.
        </p>
      </div>

      <div className="space-y-8">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Left Column */}
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-200">Project Name <span className="text-red-400">*</span></label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm text-zinc-100 focus:border-zinc-700 focus:outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-200">Slug <span className="text-red-400">*</span></label>
              <input
                type="text"
                required
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm text-zinc-100 focus:border-zinc-700 focus:outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-200">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm text-zinc-100 focus:border-zinc-700 focus:outline-none"
              >
                <option value="BACKEND">Backend</option>
                <option value="FULL_STACK">Full Stack</option>
                <option value="SYSTEMS">Systems</option>
                <option value="EXPERIMENT">Experiment</option>
                <option value="OTHER">Other</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-200">Technologies (comma separated)</label>
              <input
                type="text"
                value={typeof formData.technologies === 'string' ? formData.technologies : formData.technologies.join(', ')}
                onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm text-zinc-100 focus:border-zinc-700 focus:outline-none"
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-200">Repository URL <span className="text-red-400">*</span></label>
              <input
                type="url"
                required
                value={formData.repositoryUrl}
                onChange={(e) => setFormData({ ...formData, repositoryUrl: e.target.value })}
                className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm text-zinc-100 focus:border-zinc-700 focus:outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-200">Live URL (optional)</label>
              <input
                type="url"
                value={formData.liveUrl}
                onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm text-zinc-100 focus:border-zinc-700 focus:outline-none"
                placeholder="https://"
              />
            </div>
            
            <div className="flex items-center gap-4 pt-4">
              <label className="flex items-center gap-2 text-sm font-medium text-zinc-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="rounded border-zinc-800 bg-zinc-900 text-zinc-100 focus:ring-1 focus:ring-zinc-700"
                />
                Feature on Homepage
              </label>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-200">Short Description <span className="text-red-400">*</span></label>
          <textarea
            required
            rows={2}
            value={formData.shortDescription}
            onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
            className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm text-zinc-100 focus:border-zinc-700 focus:outline-none"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-200">Full Description</label>
          <textarea
            rows={4}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm text-zinc-100 focus:border-zinc-700 focus:outline-none"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-200">Architecture Nodes (JSON)</label>
          <textarea
            rows={4}
            value={formData.architectureNodes ? JSON.stringify(formData.architectureNodes, null, 2) : ''}
            onChange={(e) => {
              try {
                const parsed = e.target.value ? JSON.parse(e.target.value) : null;
                setFormData({ ...formData, architectureNodes: parsed });
              } catch (err) {
                // Ignore parse errors while typing, but ideally handle validation
              }
            }}
            placeholder={'[\n  { "id": "client", "type": "frontend", "label": "React Client", "description": "UI" }\n]'}
            className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm text-zinc-100 focus:border-zinc-700 focus:outline-none font-mono"
          />
          <p className="text-xs text-zinc-500">Optional: Raw JSON to generate the architecture diagram in the case study.</p>
        </div>

        <div className="flex justify-end gap-3 pt-6 border-t border-zinc-800">
          <Button variant="outline" type="button" onClick={() => setStep(1)} disabled={isSaving}>
            Back
          </Button>
          <Button variant="outline" type="button" onClick={() => handleSave('IN_DEVELOPMENT')} disabled={isSaving}>
            {isSaving ? <Loader2 size={16} className="animate-spin" /> : 'Save Draft'}
          </Button>
          <Button variant="default" type="button" onClick={() => handleSave('LIVE')} disabled={isSaving}>
            {isSaving ? <Loader2 size={16} className="animate-spin" /> : 'Publish Project'}
          </Button>
        </div>
      </div>
    </div>
  );
}
