import { Github, ExternalLink } from 'lucide-react'
import type { Project } from '@/lib/projectsData'

/**
 * GitHub and live demo links. Renders nothing for links that don't exist, so there are never dead buttons.
 * `compact` shows icon-only buttons (with accessible labels) for small cards.
 */
export default function ProjectLinks({ project, size = 'sm' }: { project: Project; size?: 'sm' | 'md' | 'compact' }) {
  if (!project.githubUrl && !project.liveUrl) return null

  if (size === 'compact') {
    const icon =
      'inline-flex items-center justify-center w-9 h-9 rounded-lg border border-zinc-200 text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:text-white dark:hover:bg-zinc-800 transition-colors'
    return (
      <div className="relative z-10 flex gap-2">
        {project.githubUrl && (
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className={icon} title="GitHub repository">
            <Github className="w-4 h-4" aria-hidden="true" />
            <span className="sr-only">{project.title} on GitHub (opens in a new tab)</span>
          </a>
        )}
        {project.liveUrl && (
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={icon} title="Live demo">
            <ExternalLink className="w-4 h-4" aria-hidden="true" />
            <span className="sr-only">{project.title} live demo (opens in a new tab)</span>
          </a>
        )}
      </div>
    )
  }

  const pad = size === 'md' ? 'px-5 py-2.5 text-sm' : 'px-3.5 py-2 text-xs'
  return (
    <div className="relative z-10 flex flex-wrap gap-2">
      {project.githubUrl && (
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-2 rounded-lg font-medium bg-zinc-900 text-white hover:bg-zinc-700 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200 transition-colors ${pad}`}
        >
          <Github className="w-4 h-4" aria-hidden="true" />
          GitHub
          <span className="sr-only">repository for {project.title} (opens in a new tab)</span>
        </a>
      )}
      {project.liveUrl && (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-2 rounded-lg font-medium border border-zinc-300 text-zinc-800 hover:bg-zinc-100 dark:border-zinc-600 dark:text-zinc-100 dark:hover:bg-zinc-800 transition-colors ${pad}`}
        >
          <ExternalLink className="w-4 h-4" aria-hidden="true" />
          Live demo
          <span className="sr-only">of {project.title} (opens in a new tab)</span>
        </a>
      )}
    </div>
  )
}
