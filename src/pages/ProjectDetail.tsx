import { useParams, Link } from 'react-router-dom'
import { ExternalLink, ArrowLeft, Terminal, Layout, CheckCircle2, AlertTriangle } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { getProjectDestination } from '../lib/project-utils'

const Github = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
)
import { Button } from '@/components/ui/button'

export function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>()

  // Mock project data based on the slug. In real implementation, this comes from an API/Database.
  const project = {
    name: slug === 'enterprise-iam' ? 'Enterprise IAM' : 'Project Detail',
    category: 'Identity · Authorization',
    shortDescription: 'A multi-tenant identity platform handling authentication, RBAC, and secure token issuance.',
    repositoryUrl: 'https://github.com/SibamDash/iam-platform',
    liveUrl: undefined,
    technologies: ['Go', 'PostgreSQL', 'Redis', 'Docker', 'JWT'],
    status: 'IN DEVELOPMENT',
    overview: 'Built a scalable, multi-tenant Identity and Access Management platform to replace a fragmented set of legacy authentication services. The system centralizes identity and issues secure, short-lived tokens.',
    problem: 'The previous architecture relied on each microservice handling its own user sessions and authorization checks, leading to duplicated logic, inconsistent security policies, and an inability to centrally revoke access.',
    solution: 'Implemented an API Gateway pattern where a centralized IAM service handles all authentication and issues JWTs. Downstream services only need to verify the JWT signature and extract scopes.',
    architecture: 'The system uses Go for high-concurrency API handling, PostgreSQL for persistent identity storage, and Redis for token blocklisting and rate-limiting.',
    engineeringDecisions: [
      'Used Go to minimize memory footprint during high traffic spikes.',
      'Implemented refresh token rotation to mitigate token theft.',
      'Used Redis for session invalidation instead of database polling.'
    ],
    challenges: [
      'Handling cross-tenant data isolation required careful database row-level security design.',
      'Token blocklisting latency had to be kept under 5ms.'
    ],
    results: [
      'Reduced average authentication latency by 40%.',
      'Unified security policy across 12 downstream services.',
      'Zero downtime during migration.'
    ]
  }

  const destination = getProjectDestination({ liveUrl: project.liveUrl, repositoryUrl: project.repositoryUrl });
  const primaryDestination = destination?.url || '#';

  return (
    <div className="container mx-auto px-4 md:px-8 py-12 md:py-16 pb-24 animate-in fade-in duration-700">
      <Button asChild variant="ghost" className="mb-8 -ml-4 text-muted-foreground">
        <Link to="/work"><ArrowLeft className="mr-2 h-4 w-4" /> Back to projects</Link>
      </Button>
      
      {/* Hero Section */}
      <div className="max-w-4xl">
        <div className="flex items-center gap-3 mb-4">
          <Badge variant="secondary">{project.category}</Badge>
          <Badge variant="outline" className="text-amber-500 border-amber-500/20 bg-amber-500/10">
            {project.status}
          </Badge>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">{project.name}</h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-8">
          {project.shortDescription}
        </p>

        <div className="flex flex-wrap items-center gap-4 mb-12">
          <Button asChild size="lg" className="gap-2">
            <a href={primaryDestination} target="_blank" rel="noreferrer">
              {project.liveUrl ? <ExternalLink className="h-4 w-4" /> : <Github className="h-4 w-4" />}
              {project.liveUrl ? 'Visit Live Project' : 'View Source Code'}
            </a>
          </Button>
          {project.liveUrl && (
            <Button asChild size="lg" variant="outline" className="gap-2">
              <a href={project.repositoryUrl} target="_blank" rel="noreferrer">
                <Github className="h-4 w-4" />
                GitHub Repository
              </a>
            </Button>
          )}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12 lg:gap-24">
        
        {/* Left Column: Case Study Sections */}
        <div className="space-y-16">
          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Layout className="h-5 w-5 text-muted-foreground" /> Overview</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">{project.overview}</p>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-destructive/5 rounded-xl p-6 border border-destructive/10">
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2 text-destructive"><AlertTriangle className="h-5 w-5" /> The Problem</h3>
              <p className="text-muted-foreground leading-relaxed">{project.problem}</p>
            </div>
            <div className="bg-primary/5 rounded-xl p-6 border border-primary/10">
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2 text-primary"><CheckCircle2 className="h-5 w-5" /> The Solution</h3>
              <p className="text-muted-foreground leading-relaxed">{project.solution}</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Architecture</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">{project.architecture}</p>
            {/* Placeholder for architecture diagram */}
            <div className="aspect-video w-full rounded-xl border border-dashed bg-muted flex items-center justify-center text-muted-foreground">
              Architecture Diagram Placeholder
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Key Engineering Decisions</h2>
            <ul className="space-y-4">
              {project.engineeringDecisions.map((decision, i) => (
                <li key={i} className="flex gap-4">
                  <div className="h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5 text-sm font-semibold">{i + 1}</div>
                  <p className="text-muted-foreground leading-relaxed">{decision}</p>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Challenges & Outcomes</h2>
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold mb-3">Technical Challenges</h3>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  {project.challenges.map((challenge, i) => (
                    <li key={i}>{challenge}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3">Results</h3>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  {project.results.map((result, i) => (
                    <li key={i}>{result}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column: Sidebar Metadata */}
        <div>
          <div className="sticky top-24 space-y-8 bg-card rounded-xl border p-6">
            <div>
              <h3 className="font-semibold mb-4 flex items-center gap-2"><Terminal className="h-4 w-4 text-muted-foreground" /> Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map(tech => (
                  <Badge key={tech} variant="secondary">{tech}</Badge>
                ))}
              </div>
            </div>
            
            <div className="border-t pt-6">
              <h3 className="font-semibold mb-4">Links</h3>
              <ul className="space-y-3">
                {project.liveUrl && (
                  <li>
                    <a href={project.liveUrl} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                      <ExternalLink className="h-4 w-4" /> Live Application
                    </a>
                  </li>
                )}
                <li>
                  <a href={project.repositoryUrl} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                    <Github className="h-4 w-4" /> Source Code
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
