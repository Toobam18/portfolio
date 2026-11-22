import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { Project } from '@/lib/projectsData'
import Rich from '@/components/Rich'
import ProjectCover from './ProjectCover'
import ProjectLinks from './ProjectLinks'
import TechTags from './TechTags'

/** Standard card. The title link is stretched over the whole card; GitHub and demo links sit above it. */
export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group relative flex flex-col h-full rounded-2xl overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-zinc-900/5 dark:hover:shadow-black/30 focus-within:ring-2 focus-within:ring-primary-500">
      <div className="relative aspect-[16/10] overflow-hidden border-b border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800">
        <ProjectCover
          project={project}
          sizes="(min-width: 1024px) 384px, (min-width: 768px) 50vw, 100vw"
          className="transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>

      <div className="flex flex-col flex-1 p-6">
        <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
          {project.context}
          <span aria-hidden="true"> · </span>
          <span className="sr-only">, </span>
          {project.date}
        </p>
        <h3 className="mt-2 text-lg font-semibold text-zinc-900 dark:text-white leading-snug">
          <Link
            href={`/projects/${project.id}`}
            className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
          >
            {project.title}
          </Link>
        </h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">{project.subtitle}</p>

        <ul className="mt-4 space-y-2.5 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
          {project.keyPoints.slice(0, 2).map((point, i) => (
            <li key={i} className="flex gap-2.5">
              <span aria-hidden="true" className="mt-2 w-1 h-1 rounded-full bg-zinc-400 dark:bg-zinc-500 flex-shrink-0" />
              <span>
                <Rich text={point} />
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-5">
          <TechTags tags={project.techStack} />
        </div>

        <div className="mt-auto pt-6 flex items-center justify-between gap-3">
          <span aria-hidden="true" className="inline-flex items-center gap-1.5 whitespace-nowrap text-sm font-medium text-primary-700 dark:text-primary-300">
            Read the case study
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </span>
          <ProjectLinks project={project} size="compact" />
        </div>
      </div>
    </article>
  )
}
