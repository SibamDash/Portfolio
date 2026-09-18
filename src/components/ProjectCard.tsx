import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ExternalLink, FileText, PlayCircle } from 'lucide-react'

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
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export interface ProjectData {
  id: string | number
  slug: string
  name: string
  category: string
  shortDescription: string
  repositoryUrl: string
  liveUrl?: string
  previewImageUrl?: string
  previewVideoUrl?: string
  technologies: string[]
  status: string
}

interface ProjectCardProps {
  project: ProjectData
  className?: string
}

export function ProjectCard({ project, className }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  // Automatic Live/GitHub fallback destination logic
  const primaryDestination = project.liveUrl ? project.liveUrl : project.repositoryUrl
  const primaryActionText = project.liveUrl ? 'Live Project' : 'GitHub Repo'
  const PrimaryIcon = project.liveUrl ? ExternalLink : Github

  return (
    <motion.div
      className={cn("relative group w-full outline-none", className)}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={() => setIsHovered(!isHovered)}
      layout
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <Card className="h-full overflow-hidden border-border bg-card transition-colors hover:border-primary/50 cursor-pointer">
        <motion.div layout="position" className="p-6 flex flex-col h-full z-10 relative bg-card">
          <div className="flex items-start justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{project.category}</span>
          </div>
          <h3 className="text-2xl font-bold tracking-tight mb-2">{project.name}</h3>
          
          {/* Base state visibility */}
          <motion.div 
            initial={false}
            animate={{ opacity: isHovered ? 0 : 1, height: isHovered ? 0 : 'auto' }}
            className="text-muted-foreground flex items-center justify-between mt-auto"
          >
             <span className="text-sm truncate pr-4">{project.shortDescription}</span>
             <PlayCircle className="h-5 w-5 opacity-50 shrink-0" />
          </motion.div>

          {/* Hover state content */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="flex flex-col gap-4 mt-4 overflow-hidden"
              >
                {/* Media Preview */}
                {(project.previewImageUrl || project.previewVideoUrl) ? (
                  <div className="aspect-video w-full rounded-md overflow-hidden bg-muted relative">
                    {project.previewVideoUrl ? (
                      <video src={project.previewVideoUrl} autoPlay muted loop playsInline className="object-cover w-full h-full" />
                    ) : (
                      <img src={project.previewImageUrl} alt={project.name} className="object-cover w-full h-full" />
                    )}
                  </div>
                ) : (
                  <div className="aspect-video w-full rounded-md bg-primary/5 flex items-center justify-center text-muted-foreground border border-dashed">
                    <span className="text-sm">No preview available</span>
                  </div>
                )}

                <p className="text-sm text-foreground">{project.shortDescription}</p>

                <div className="flex flex-wrap gap-2">
                  {project.technologies.map(tech => (
                    <Badge key={tech} variant="secondary" className="text-xs">{tech}</Badge>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-3 mt-2 pt-4 border-t border-border">
                  <Button asChild size="sm" className="gap-2">
                    <a href={primaryDestination} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}>
                      <PrimaryIcon className="h-4 w-4" />
                      {primaryActionText}
                    </a>
                  </Button>
                  <Button asChild size="sm" variant="outline" className="gap-2">
                    <Link to={`/work/${project.slug}`} onClick={(e) => e.stopPropagation()}>
                      <FileText className="h-4 w-4" />
                      Case Study
                    </Link>
                  </Button>
                  {project.liveUrl && (
                    <Button asChild size="sm" variant="ghost" className="gap-2 px-2 ml-auto">
                      <a href={project.repositoryUrl} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} title="Source Code">
                        <Github className="h-4 w-4" />
                        <span className="sr-only">GitHub</span>
                      </a>
                    </Button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </Card>
    </motion.div>
  )
}
