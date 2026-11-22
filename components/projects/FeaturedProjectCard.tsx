import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { Project } from '@/lib/projectsData'
import Rich from '@/components/Rich'
import ProjectCover from './ProjectCover'
import ProjectLinks from './ProjectLinks'
import TechTags from './TechTags'

/** Full-width card with the visual beside the text. `flip` puts the visual on the right. */
export default function FeaturedProjectCard({ project, flip = false }: { project: Project; flip?: boolean }) {
  return (
    <article className="group relative grid lg:grid-cols-2 rounded-3xl overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 transition-shadow duration-300 hover:shadow-2xl hover:shadow-zinc-900/5 dark:hover:shadow-black/30 focus-within:ring-2 focus-within:ring-primary-500">
      <div
        className={`relative aspect-[16/10] lg:aspect-auto lg:min-h-[460px] overflow-hidden bg-zinc-100 dark:bg-zinc-800 border-b lg:border-b-0 border-zinc-200 dark:border-zinc-800 ${
          flip ? 'lg:order-2 lg:border-l' : 'lg:border-r'
        }`}
      >
        <ProjectCover
          project={project}
          sizes="(min-width: 1024px) 576px, 100vw"
          variant="window"
          className="transition-transform duration-700 group-hover:scale-[1.02]"
        />
      </div>

      <div className="flex flex-col p-7 sm:p-9">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-medium">
          <span className="px-2 py-0.5 rounded-full bg-primary-50 text-primary-800 dark:bg-primary-900/40 dark:text-primary-200 uppercase tracking-wider">
            {project.category}
          </span>
          <span className="text-zinc-500 dark:text-zinc-400">
            {project.context}
            <span aria-hidden="true"> · </span>
            <span className="sr-only">, </span>
            {project.date}
          </span>
        </div>

        <h3 className="mt-4 font-display text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white">
          <Link
            href={`/projects/${project.id}`}
            className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
          >
            {project.title}
          </Link>
        </h3>
        <p className="mt-1 text-base font-medium text-zinc-600 dark:text-zinc-300">{project.subtitle}</p>
        <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{project.summary}</p>

        <dl className="mt-6 grid grid-cols-3 gap-3">
          {project.results.slice(0, 3).map((r) => (
            <div key={r.label} className="rounded-xl bg-zinc-50 dark:bg-zinc-800/60 px-3 py-3">
              <dt className="sr-only">{r.label}</dt>
              <dd>
                <span className="block whitespace-nowrap text-lg sm:text-xl font-semibold tracking-tight text-primary-700 dark:text-primary-300">
                  {r.value}
                </span>
                <span aria-hidden="true" className="block mt-0.5 text-[11px] leading-snug text-zinc-600 dark:text-zinc-400">
                  {r.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>

        <ul className="mt-6 space-y-2.5 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
          {project.keyPoints.map((point, i) => (
            <li key={i} className="flex gap-2.5">
              <span aria-hidden="true" className="mt-2 w-1 h-1 rounded-full bg-zinc-400 dark:bg-zinc-500 flex-shrink-0" />
              <span>
                <Rich text={point} />
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-6">
          <TechTags tags={project.techStack} />
        </div>

        <div className="mt-auto pt-7 flex flex-wrap items-center justify-between gap-3">
          <span aria-hidden="true" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-700 dark:text-primary-300">
            Read the case study
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </span>
          <ProjectLinks project={project} />
        </div>
      </div>
    </article>
  )
}
