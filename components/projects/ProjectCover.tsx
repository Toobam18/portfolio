import Image from 'next/image'
import type { Project } from '@/lib/projectsData'
import MotuIllustration from './MotuIllustration'
import CoopBoardIllustration from './CoopBoardIllustration'

interface ProjectCoverProps {
  project: Project
  /** `sizes` attribute for next/image, matched to the layout the cover sits in */
  sizes: string
  priority?: boolean
  /** 'fill' covers the box edge to edge; 'window' frames a screenshot like an app window anchored top-left */
  variant?: 'fill' | 'window'
  className?: string
}

const illustrationBg = {
  motu: 'bg-[#0f1a30]',
  'coop-tracker': 'bg-slate-100 dark:bg-slate-900',
} as const

/** The visual for a project: a real screenshot, or an illustration drawn in code. */
export default function ProjectCover({ project, sizes, priority, variant = 'fill', className = '' }: ProjectCoverProps) {
  const { cover } = project

  if (cover.kind === 'illustration') {
    const Illustration = cover.illustration === 'motu' ? MotuIllustration : CoopBoardIllustration
    return (
      <div role="img" aria-label={cover.alt} className={`absolute inset-0 flex items-center justify-center ${illustrationBg[cover.illustration]}`}>
        <Illustration className={`w-full h-full ${className}`} />
      </div>
    )
  }

  if (variant === 'window') {
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900">
        <div className="absolute left-6 top-6 sm:left-10 sm:top-10 -right-6 -bottom-6 rounded-tl-xl overflow-hidden border border-zinc-300/70 dark:border-zinc-700 shadow-2xl shadow-zinc-900/20">
          <Image
            src={cover.image.src}
            alt={cover.image.alt}
            fill
            sizes={sizes}
            priority={priority}
            className={`object-cover object-left-top ${className}`}
          />
        </div>
      </div>
    )
  }

  return (
    <Image
      src={cover.image.src}
      alt={cover.image.alt}
      fill
      sizes={sizes}
      priority={priority}
      className={`object-cover object-top ${className}`}
    />
  )
}
