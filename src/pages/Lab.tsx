import { ParticleSystem } from '@/components/lab/ParticleSystem'
import { Button } from '@/components/ui/button'
import { Play } from 'lucide-react'

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

export function Lab() {
  const experiments = [
    {
      id: 'particle-system',
      title: 'Interactive Particle System',
      description: 'A custom HTML5 Canvas particle engine that responds to mouse movement. Uses standard 2D context for high-performance rendering of hundreds of physics-based particles.',
      component: <ParticleSystem />,
      tags: ['Canvas API', 'TypeScript', 'Physics', 'Generative Art'],
      githubUrl: 'https://github.com/SibamDash'
    }
  ]

  return (
    <div className="container mx-auto px-4 md:px-8 py-12 md:py-16 animate-in fade-in duration-700">
      <div className="max-w-3xl mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 flex items-center gap-4">
          Engineering Lab <span className="text-primary"><Play className="w-8 h-8 md:w-10 md:h-10 fill-primary" /></span>
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          A collection of standalone technical experiments, WebGL shaders, interactive components, and algorithmic visualizations. 
          This is where I play with new APIs and push browser capabilities.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-16 lg:gap-24">
        {experiments.map((exp) => (
          <div key={exp.id} className="flex flex-col lg:flex-row gap-8 lg:gap-12 group">
            {/* Experiment Canvas Container */}
            <div className="w-full lg:w-2/3 aspect-[4/3] lg:aspect-video rounded-xl border border-zinc-800 bg-zinc-950 shadow-2xl overflow-hidden relative">
              <div className="absolute top-4 left-4 z-10 flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              
              <div className="w-full h-full pt-10 px-2 pb-2">
                {exp.component}
              </div>
            </div>

            {/* Experiment Metadata */}
            <div className="w-full lg:w-1/3 flex flex-col justify-center">
              <div className="mb-4 flex flex-wrap gap-2">
                {exp.tags.map(tag => (
                  <span key={tag} className="px-2.5 py-1 text-[10px] uppercase tracking-wider font-semibold bg-primary/10 text-primary rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
              <h2 className="text-3xl font-bold mb-4">{exp.title}</h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                {exp.description}
              </p>
              
              <div className="mt-auto">
                <Button asChild variant="outline" className="gap-2">
                  <a href={exp.githubUrl} target="_blank" rel="noreferrer">
                    <Github className="w-4 h-4" /> View Source Code
                  </a>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
