import { cn } from '@/lib/utils'
import { FolderOpen } from 'lucide-react'
import { type ReactNode } from 'react'

interface EmptyStateProps {
  title: string
  description?: string
  icon?: ReactNode
  action?: ReactNode
  className?: string
}

export function EmptyState({ title, description, icon, action, className }: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center rounded-xl border border-dashed p-8 text-center animate-in fade-in-50 duration-500", className)}>
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted/50 mb-4 text-muted-foreground">
        {icon || <FolderOpen className="h-10 w-10" />}
      </div>
      <h3 className="text-xl font-semibold">{title}</h3>
      {description && <p className="mb-4 mt-2 text-sm text-muted-foreground max-w-sm">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}
