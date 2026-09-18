import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Terminal } from 'lucide-react'

// Placeholder data based on Phase 3 spec requirements
const FEATURED_PROJECTS = [
  {
    id: 1,
    slug: 'enterprise-iam',
    name: 'Enterprise IAM',
    category: 'Identity · Authorization',
    description: 'A multi-tenant identity platform handling authentication, RBAC, and secure token issuance.',
    tags: ['Go', 'PostgreSQL', 'Redis'],
    status: 'IN DEVELOPMENT',
  },
  {
    id: 2,
    slug: 'multi-tenant-saas',
    name: 'Multi-Tenant SaaS',
    category: 'Backend · API',
    description: 'Core infrastructure for tenant isolation and billing integration.',
    tags: ['Node.js', 'TypeScript', 'Stripe'],
    status: 'LIVE',
  }
]

export function Home() {
  return (
    <div className="flex flex-col gap-24 pb-24">
      {/* Hero Section */}
      <section className="container mx-auto px-4 md:px-8 pt-24 md:pt-32">
        <div className="max-w-3xl flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <Badge variant="secondary" className="w-fit">SOFTWARE ENGINEER</Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground leading-[1.1]">
            I build software systems that solve real problems.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-[600px] leading-relaxed">
            Backend systems, SaaS platforms, identity infrastructure and full-stack products.
          </p>
          <div className="flex flex-wrap gap-4 mt-4">
            <Button asChild size="lg">
              <Link to="/work">Explore Work</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="https://github.com/SibamDash" target="_blank" rel="noreferrer">GitHub</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Current Focus Section */}
      <section className="container mx-auto px-4 md:px-8">
        <h2 className="text-sm font-semibold tracking-widest text-muted-foreground uppercase mb-6">Currently Building</h2>
        <Card className="max-w-2xl bg-secondary/30 border-primary/10">
          <CardHeader>
            <CardTitle className="text-xl">Enterprise IAM</CardTitle>
            <CardDescription>Identity · Authorization · Security</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm font-medium text-amber-500 dark:text-amber-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              IN DEVELOPMENT
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Featured Work Section */}
      <section className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Featured Work</h2>
          <Button asChild variant="ghost" className="hidden sm:inline-flex">
            <Link to="/work" className="group">
              View all <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {FEATURED_PROJECTS.map((project) => (
            <Link key={project.id} to={`/work/${project.slug}`} className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-xl">
              <Card className="h-full transition-colors hover:bg-muted/50">
                <CardHeader>
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <CardDescription className="mb-2">{project.category}</CardDescription>
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">{project.name}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm mb-6">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="bg-background">{tag}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        <Button asChild variant="outline" className="w-full mt-6 sm:hidden">
          <Link to="/work">View all projects</Link>
        </Button>
      </section>

      {/* Engineering Focus / Lab Preview */}
      <section className="container mx-auto px-4 md:px-8">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-8">Engineering Lab</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {['JWT Authentication', 'Redis Caching', 'PostgreSQL Indexing'].map((topic) => (
            <Card key={topic} className="bg-card">
              <CardHeader className="flex flex-row items-center gap-4 py-4">
                <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center text-primary">
                  <Terminal className="h-5 w-5" />
                </div>
                <CardTitle className="text-base">{topic}</CardTitle>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* Build Log & About Preview */}
      <section className="container mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8">
        <div>
          <h2 className="text-2xl font-bold tracking-tight mb-6">Build Log</h2>
          <div className="space-y-6 border-l border-border pl-6 relative">
            <div className="relative">
              <div className="absolute -left-[29px] top-1 h-3 w-3 rounded-full bg-primary ring-4 ring-background" />
              <p className="text-sm font-medium text-muted-foreground mb-1">2026.09.18</p>
              <p className="text-base font-medium">Established portfolio architecture and foundation</p>
            </div>
            <div className="relative">
              <div className="absolute -left-[29px] top-1 h-3 w-3 rounded-full bg-muted ring-4 ring-background" />
              <p className="text-sm font-medium text-muted-foreground mb-1">2026.09.11</p>
              <p className="text-base text-muted-foreground">Added tenant-aware authorization</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold tracking-tight mb-6">About</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              I'm a software engineer specializing in backend systems, distributed architectures, and modern web applications. 
            </p>
            <p>
              I focus on building reliable, scalable systems with clear technical foundations. When I'm not writing code, I'm usually exploring new infrastructure tools or optimizing database queries.
            </p>
            <Button asChild variant="link" className="p-0 h-auto font-medium">
              <Link to="/about">Read more about me <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

    </div>
  )
}
