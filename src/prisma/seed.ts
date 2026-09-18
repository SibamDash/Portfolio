import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

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
    }
  ]

  for (const project of projects) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: project,
      create: project,
    })
    console.log(`Upserted project: ${project.name}`)
  }

  console.log('Seeding complete.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
