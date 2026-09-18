import { useState, useEffect } from 'react'
import { ProjectCard } from '@/components/ProjectCard'
import { Loader2 } from 'lucide-react'

export function Work() {
  const [projects, setProjects] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/projects')
        if (!res.ok) throw new Error('Failed to fetch projects')
        const data = await res.json()
        setProjects(data)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }
    fetchProjects()
  }, [])

  return (
    <div className="container mx-auto px-4 md:px-8 py-12 md:py-16 animate-in fade-in duration-700">
      <div className="max-w-3xl mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">Work & Projects</h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          A selection of projects ranging from backend systems and APIs to full-stack applications and open-source experiments.
        </p>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : error ? (
        <div className="text-center text-red-500 py-12">{error}</div>
      ) : projects.length === 0 ? (
        <div className="text-center text-muted-foreground py-24">No public projects available at the moment.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 gap-y-12">
          {projects.map(project => (
            <ProjectCard key={project.id || project.slug} project={project} />
          ))}
        </div>
      )}
    </div>
  )
}
