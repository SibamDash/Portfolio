import { ProjectCard } from '@/components/ProjectCard'

// Mock data to use until Database phase
const PROJECTS = [
  {
    id: 1,
    slug: 'enterprise-iam',
    name: 'Enterprise IAM',
    category: 'Identity · Authorization',
    shortDescription: 'A multi-tenant identity platform handling authentication, RBAC, and secure token issuance.',
    description: 'A multi-tenant identity platform handling authentication, RBAC, and secure token issuance. Replaced a legacy monolith with a modern microservice architecture.',
    repositoryUrl: 'https://github.com/SibamDash/iam-platform',
    technologies: ['Go', 'PostgreSQL', 'Redis', 'Docker'],
    status: 'IN DEVELOPMENT',
  },
  {
    id: 2,
    slug: 'multi-tenant-saas',
    name: 'Multi-Tenant SaaS',
    category: 'Backend · API',
    shortDescription: 'Core infrastructure for tenant isolation and billing integration.',
    description: 'Core infrastructure for tenant isolation and billing integration.',
    repositoryUrl: 'https://github.com/SibamDash/saas-core',
    liveUrl: 'https://example.com',
    technologies: ['Node.js', 'TypeScript', 'Stripe'],
    status: 'LIVE',
  },
  {
    id: 3,
    slug: 'glausco-crm',
    name: 'GLAUSCO CRM',
    category: 'Full-Stack',
    shortDescription: 'A custom CRM built for a local agency to track leads and communications.',
    description: 'A custom CRM built for a local agency to track leads and communications. Supports email parsing and webhook integrations.',
    repositoryUrl: 'https://github.com/SibamDash/glausco-crm',
    technologies: ['React', 'Express', 'PostgreSQL'],
    status: 'ARCHIVED',
  },
  {
    id: 4,
    slug: 'event-notifier',
    name: 'Event-Driven Notifier',
    category: 'Systems',
    shortDescription: 'High-throughput event consumption and notification dispatching service.',
    description: 'High-throughput event consumption and notification dispatching service.',
    repositoryUrl: 'https://github.com/SibamDash/event-notifier',
    technologies: ['Go', 'RabbitMQ', 'WebSockets'],
    status: 'LIVE',
  }
]

export function Work() {
  return (
    <div className="container mx-auto px-4 md:px-8 py-16 md:py-24 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="max-w-2xl mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Work</h1>
        <p className="text-xl text-muted-foreground">
          A selection of projects and systems I've built, ranging from backend infrastructure to full-stack products.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
        {PROJECTS.map((project) => (
          <ProjectCard key={project.id} project={project as any} />
        ))}
      </div>
    </div>
  )
}
