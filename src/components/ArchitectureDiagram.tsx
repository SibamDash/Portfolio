import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Server, Database, Monitor, Cloud, Key, Box, ArrowRight } from 'lucide-react';
import clsx from 'clsx';

export type ArchNode = {
  id: string;
  type: 'frontend' | 'backend' | 'database' | 'auth' | 'cloud' | 'service';
  label: string;
  description?: string;
};

type ArchitectureDiagramProps = {
  nodes: ArchNode[];
};

export function ArchitectureDiagram({ nodes }: ArchitectureDiagramProps) {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  if (!nodes || nodes.length === 0) return null;

  const getIcon = (type: ArchNode['type']) => {
    switch (type) {
      case 'frontend': return Monitor;
      case 'backend': return Server;
      case 'database': return Database;
      case 'auth': return Key;
      case 'cloud': return Cloud;
      default: return Box;
    }
  };

  const getColorClass = (type: ArchNode['type']) => {
    switch (type) {
      case 'frontend': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
      case 'backend': return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
      case 'database': return 'text-purple-400 bg-purple-400/10 border-purple-400/20';
      case 'auth': return 'text-amber-400 bg-amber-400/10 border-amber-400/20';
      case 'cloud': return 'text-sky-400 bg-sky-400/10 border-sky-400/20';
      default: return 'text-zinc-400 bg-zinc-400/10 border-zinc-400/20';
    }
  };

  return (
    <div className="w-full relative py-8 px-4 sm:px-8 bg-zinc-950/50 rounded-2xl border border-zinc-800/50 overflow-x-auto">
      <div className="min-w-max flex items-center justify-start sm:justify-center gap-4 sm:gap-8 mx-auto relative">
        {nodes.map((node, index) => {
          const Icon = getIcon(node.type);
          const colorClass = getColorClass(node.type);
          const isDimmed = hoveredNode !== null && hoveredNode !== node.id;
          
          return (
            <div key={node.id} className="flex items-center gap-4 sm:gap-8">
              <div 
                className="relative group"
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
              >
                <motion.div
                  animate={{ opacity: isDimmed ? 0.3 : 1, scale: hoveredNode === node.id ? 1.05 : 1 }}
                  transition={{ duration: 0.2 }}
                  className={clsx(
                    "flex flex-col items-center justify-center p-4 sm:p-6 rounded-xl border w-32 sm:w-40 text-center transition-shadow cursor-default relative z-10",
                    colorClass,
                    hoveredNode === node.id ? 'shadow-lg shadow-black/50' : 'shadow-sm'
                  )}
                >
                  <Icon className="w-8 h-8 sm:w-10 sm:h-10 mb-3 opacity-80" />
                  <span className="font-semibold text-sm sm:text-base leading-tight">
                    {node.label}
                  </span>
                </motion.div>
                
                {/* Tooltip */}
                <AnimatePresence>
                  {hoveredNode === node.id && node.description && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-48 sm:w-56 p-3 rounded-lg bg-zinc-900 border border-zinc-800 shadow-xl z-20"
                    >
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-zinc-900 border-t border-l border-zinc-800 rotate-45" />
                      <p className="relative z-10 text-xs sm:text-sm text-zinc-300 text-left leading-relaxed">
                        {node.description}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Arrow (unless it's the last node) */}
              {index < nodes.length - 1 && (
                <div className={clsx(
                  "hidden sm:flex transition-opacity duration-200 text-zinc-700",
                  isDimmed ? "opacity-30" : "opacity-100"
                )}>
                  <ArrowRight className="w-6 h-6" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
