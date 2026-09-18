import { useState, useEffect } from 'react'
import { ArrowRight, Loader2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ProjectCard } from '@/components/ProjectCard'

export function Home() {
  const [featuredProjects, setFeaturedProjects] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/projects')
        if (res.ok) {
          const data = await res.json()
          setFeaturedProjects(data.filter((p: any) => p.featured))
        }
      } catch (err) {
        console.error('Failed to fetch featured projects:', err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchProjects()
  }, [])

  return (
    <div className="container mx-auto px-4 md:px-8 py-12 md:py-24 animate-in fade-in duration-700">
      <section className="max-w-3xl mb-32">
        <h1 className="text-sm font-semibold tracking-widest text-primary uppercase mb-6">
          Software Engineer
        </h1>
        <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-8 leading-[1.1]">
          I build software systems that solve real problems.
        </h2>
        <p className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed">
          Backend systems, SaaS platforms, identity infrastructure and full-stack products designed for scale and clarity.
        </p>
        
        <div className="flex flex-wrap items-center gap-4">
          <Button asChild size="lg" className="rounded-full px-8">
            <Link to="/work">Explore Work</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-full px-8">
            <a href="https://github.com/SibamDash" target="_blank" rel="noreferrer">
              GitHub Profile
            </a>
          </Button>
        </div>
      </section>

      <section className="mb-32 max-w-3xl">
        <h3 className="text-sm font-semibold tracking-widest text-muted-foreground uppercase mb-6 flex items-center gap-3">
          Currently Building
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
          </span>
        </h3>
        <div className="p-8 rounded-2xl bg-muted/50 border border-border group transition-colors hover:border-primary/20">
          <h4 className="text-2xl font-bold mb-2">Enterprise IAM</h4>
          <p className="text-muted-foreground mb-4">Identity &middot; Authorization &middot; Security</p>
          <div className="flex items-center text-sm font-medium text-primary">
            <span className="bg-primary/10 px-3 py-1 rounded-full">In Development</span>
          </div>
        </div>
      </section>

      <section>
        <div className="flex items-end justify-between mb-12">
          <h3 className="text-3xl font-bold tracking-tight">Featured Work</h3>
          <Link to="/work" className="hidden md:flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group">
            View all projects <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map(project => (
              <ProjectCard key={project.id || project.slug} project={project} />
            ))}
          </div>
        )}

        <div className="mt-8 text-center md:hidden">
          <Button asChild variant="ghost" className="w-full group">
            <Link to="/work">
              View all projects <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
