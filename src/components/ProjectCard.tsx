import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ExternalLink, FileText } from 'lucide-react'
import { getProjectDestination } from '../lib/project-utils'
import { Badge } from './ui/badge'
import { Button } from './ui/button'

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

export type ProjectCardProps = {
  project: {
    id?: string;
    slug: string;
    name: string;
    category: string;
    shortDescription: string;
    repositoryUrl?: string | null;
    liveUrl?: string | null;
    previewImageUrl?: string | null;
    previewVideoUrl?: string | null;
    logoUrl?: string | null;
    technologies: string[];
    caseStudyEnabled?: boolean;
  }
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  // Automatic Live/GitHub fallback destination logic
  const destination = getProjectDestination({ liveUrl: project.liveUrl, repositoryUrl: project.repositoryUrl });
  const primaryActionText = destination?.label || 'View Project';
  const PrimaryIcon = destination?.type === 'live' ? ExternalLink : Github;
  const primaryDestination = destination?.url || '#';

  const cardContent = (
    <>
      {/* Project Image/Video Area */}
      <div className="relative aspect-video w-full overflow-hidden bg-muted">
        {project.previewVideoUrl ? (
          <video 
            src={project.previewVideoUrl} 
            autoPlay 
            muted 
            loop 
            playsInline 
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : project.previewImageUrl ? (
          <img 
            src={project.previewImageUrl} 
            alt={project.name} 
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground/30 bg-primary/5 border-b border-border/50">
            <span className="font-mono text-4xl opacity-50">{project.name.substring(0,2).toUpperCase()}</span>
          </div>
        )}
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:flex items-center justify-center p-6 text-center">
          <p className="text-sm font-medium text-white/90 line-clamp-3">
            {project.shortDescription}
          </p>
        </div>
      </div>

      {/* Project Details */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="text-xl font-bold tracking-tight mb-1 group-hover:text-primary transition-colors">
              {project.name}
            </h3>
            <p className="text-sm text-muted-foreground">
              {project.category}
            </p>
          </div>
          {project.logoUrl && (
            <div className="w-10 h-10 rounded-full bg-muted/50 overflow-hidden flex items-center justify-center shrink-0">
              <img src={project.logoUrl} alt="" className="w-6 h-6 object-contain" />
            </div>
          )}
        </div>

        <motion.div 
          animate={{ opacity: isHovered ? 0 : 1, height: isHovered ? 0 : 'auto' }}
          className="text-muted-foreground flex items-center justify-between mt-auto overflow-hidden"
        >
          <span className="text-sm truncate pr-4 mt-2">{project.shortDescription}</span>
          <PrimaryIcon className="h-4 w-4 shrink-0 opacity-50" />
        </motion.div>

        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col gap-4 mt-2 overflow-hidden"
            >
              {/* Technologies */}
              <div className="flex flex-wrap gap-1.5 mt-2">
                {project.technologies.slice(0, 4).map((tech) => (
                  <Badge key={tech} variant="secondary" className="text-[10px] uppercase font-semibold tracking-wider">
                    {tech}
                  </Badge>
                ))}
                {project.technologies.length > 4 && (
                  <Badge variant="outline" className="text-[10px] uppercase font-semibold text-muted-foreground">
                    +{project.technologies.length - 4} more
                  </Badge>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-3 mt-auto border-t border-border/50">
                {project.caseStudyEnabled && (
                  <Link 
                    to={`/work/${project.slug}`}
                    onClick={(e) => e.stopPropagation()}
                    className="flex-1 flex items-center justify-center gap-2 bg-secondary/80 hover:bg-secondary text-secondary-foreground text-xs font-medium py-2 px-3 rounded-md transition-colors"
                  >
                    <FileText className="h-3.5 w-3.5" />
                    Case Study
                  </Link>
                )}
                <Button asChild size="sm" variant={project.caseStudyEnabled ? 'outline' : 'default'} className="flex-1 gap-2">
                  <a href={primaryDestination} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}>
                    <PrimaryIcon className="h-3.5 w-3.5" />
                    {primaryActionText}
                  </a>
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );

  const wrapperProps = project.caseStudyEnabled 
    ? { to: `/work/${project.slug}` }
    : { href: primaryDestination, target: "_blank", rel: "noreferrer" };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col rounded-2xl border bg-card text-card-foreground shadow-sm overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-primary/20 h-[380px]"
    >
      {project.caseStudyEnabled ? (
        <Link {...wrapperProps as any} className="block w-full h-full flex flex-col">
          {cardContent}
        </Link>
      ) : (
        <a {...wrapperProps as any} className="block w-full h-full flex flex-col">
          {cardContent}
        </a>
      )}
    </motion.div>
  )
}
