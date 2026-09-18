import { db } from './db'

async function main() {
  console.log('Seeding database with initial projects...')

  const projects = [
    {
      slug: 'enterprise-iam',
      name: 'Enterprise IAM',
      category: 'Identity · Authorization',
      shortDescription: 'A multi-tenant identity platform handling authentication, RBAC, and secure token issuance.',
      description: 'A multi-tenant identity platform handling authentication, RBAC, and secure token issuance. Replaced a legacy monolith with a modern microservice architecture.',
      repositoryUrl: 'https://github.com/SibamDash/iam-platform',
      technologies: ['Go', 'PostgreSQL', 'Redis', 'Docker'],
      status: 'IN_DEVELOPMENT',
      featured: true,
      displayOrder: 1,
      results: [],
      challenges: [],
      engineeringDecisions: []
    },
    {
      slug: 'multi-tenant-saas',
      name: 'Multi-Tenant SaaS',
      category: 'Backend · API',
      shortDescription: 'Core infrastructure for tenant isolation and billing integration.',
      description: 'Core infrastructure for tenant isolation and billing integration.',
      repositoryUrl: 'https://github.com/SibamDash/saas-core',
      liveUrl: 'https://example.com',
      technologies: ['Node.js', 'TypeScript', 'Stripe'],
      status: 'LIVE',
      featured: true,
      displayOrder: 2,
      results: [],
      challenges: [],
      engineeringDecisions: []
    },
    {
      slug: 'glausco-crm',
      name: 'GLAUSCO CRM',
      category: 'Full-Stack',
      shortDescription: 'A custom CRM built for a local agency to track leads and communications.',
      description: 'A custom CRM built for a local agency to track leads and communications. Supports email parsing and webhook integrations.',
      repositoryUrl: 'https://github.com/SibamDash/glausco-crm',
      technologies: ['React', 'Express', 'PostgreSQL'],
      status: 'ARCHIVED',
      featured: false,
      displayOrder: 3,
      results: [],
      challenges: [],
      engineeringDecisions: []
    },
    {
      slug: 'event-notifier',
      name: 'Event-Driven Notifier',
      category: 'Systems',
      shortDescription: 'High-throughput event consumption and notification dispatching service.',
      description: 'High-throughput event consumption and notification dispatching service.',
      repositoryUrl: 'https://github.com/SibamDash/event-notifier',
      technologies: ['Go', 'RabbitMQ', 'WebSockets'],
      status: 'LIVE',
      featured: false,
      displayOrder: 4,
      results: [],
      challenges: [],
      architecture: 'The system uses Go for high-concurrency API handling, PostgreSQL for persistent identity storage, and Redis for token blocklisting and rate-limiting.',
      architectureNodes: [
        { id: 'client', type: 'frontend', label: 'Web/Mobile Client', description: 'Consumes API and stores JWT securely' },
        { id: 'gateway', type: 'service', label: 'API Gateway', description: 'Routes requests and verifies JWT signatures' },
        { id: 'iam', type: 'auth', label: 'IAM Service', description: 'Go service handling auth, RBAC, and token issuance' },
        { id: 'cache', type: 'database', label: 'Redis Cache', description: 'Fast token blocklisting and rate limiting' },
        { id: 'db', type: 'database', label: 'PostgreSQL', description: 'Persistent identity and tenant storage' }
      ],
      engineeringDecisions: []
    }
  ]

  for (const project of projects) {
    await db.orm.public.Project.create(project)
    console.log(`Created project: ${project.name}`)
  }

  console.log('Seeding complete.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
