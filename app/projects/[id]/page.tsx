import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { projects, getProject, projectFullName, type Project } from '@/lib/projectsData'
import { architectureDiagrams } from '@/lib/architectureDiagrams'
import Rich from '@/components/Rich'
import ProjectCover from '@/components/projects/ProjectCover'
import ProjectLinks from '@/components/projects/ProjectLinks'
import TechTags from '@/components/projects/TechTags'
import ArchitectureDiagram from '@/components/projects/ArchitectureDiagram'
import SearchDemo from '@/components/projects/SearchDemo'

export const dynamicParams = false

export function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }))
}

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const project = getProject(params.id)
  if (!project) return {}
  const title = projectFullName(project)
  return {
    title,
    description: project.summary,
    alternates: { canonical: `/projects/${project.id}` },
    openGraph: {
      type: 'article',
      title,
      description: project.summary,
      url: `/projects/${project.id}`,
      siteName: 'Tooba Malik',
      images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Tooba Malik, Software Engineering Student. Open to 2027 co-ops.' }],
    },
    twitter: { card: 'summary_large_image', title, description: project.summary, images: ['/opengraph-image'] },
  }
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section aria-labelledby={id} className="py-12 border-t border-zinc-200 dark:border-zinc-800">
      <h2 id={id} className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white mb-6">
        {title}
      </h2>
      {children}
    </section>
  )
}

function Prose({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="space-y-4 text-[17px] leading-relaxed text-zinc-700 dark:text-zinc-300 max-w-3xl">
      {paragraphs.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </div>
  )
}

function MotuDetails() {
  const algorithms = [
    { name: 'Uniform Cost Search (UCS)', type: 'Uninformed', picks: 'f(n) = g(n): cost so far', best: 'Yes' },
    { name: 'Greedy Best-First', type: 'Informed', picks: 'f(n) = h(n): estimate to goal', best: 'Not always' },
    { name: 'A*', type: 'Informed', picks: 'f(n) = g(n) + h(n): both', best: 'Yes' },
  ]
  const heuristics = [
    { mode: 'Distance (m)', h: 'Straight-line Euclidean distance to the goal' },
    { mode: 'Time (s)', h: 'Straight-line distance ÷ 1.34 m/s, plus floor changes' },
    { mode: 'Weather (s)', h: 'Same as time, because weather adds to the cost, not to the estimate' },
  ]
  const evaluation = [
    { what: 'Search space size', how: 'Varying the number of buildings, floors and rooms' },
    { what: 'Path and obstacle density', how: 'Changing the number of stairwells, elevators and entrances' },
    { what: 'Cost distribution', how: 'Applying a crowding multiplier to travel times' },
    { what: 'Start-to-goal distance', how: 'Same floor, different floors and different buildings' },
  ]
  const th = 'px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400'
  const td = 'px-4 py-3 text-sm text-zinc-700 dark:text-zinc-300 align-top'

  return (
    <>
      <Section id="algorithms" title="Search algorithms compared">
        <div className="overflow-x-auto rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
          <table className="w-full min-w-[560px]">
            <caption className="sr-only">Comparison of UCS, Greedy Best-First and A*</caption>
            <thead className="bg-zinc-50 dark:bg-zinc-800/60">
              <tr>
                <th scope="col" className={th}>Algorithm</th>
                <th scope="col" className={th}>Type</th>
                <th scope="col" className={th}>Picks the next node by</th>
                <th scope="col" className={th}>Guarantees the best route</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              {algorithms.map((a) => (
                <tr key={a.name}>
                  <th scope="row" className={`${td} font-semibold text-zinc-900 dark:text-white`}>{a.name}</th>
                  <td className={td}>{a.type}</td>
                  <td className={`${td} font-mono text-[13px]`}>{a.picks}</td>
                  <td className={td}>
                    <span
                      className={`inline-block px-2 py-0.5 rounded-md text-xs font-semibold ${
                        a.best === 'Yes'
                          ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200'
                          : 'bg-amber-50 text-amber-800 dark:bg-amber-950 dark:text-amber-200'
                      }`}
                    >
                      {a.best}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400 max-w-3xl">
          BFS is included as a baseline: it finds the route with the fewest steps, which is not always the cheapest.
        </p>
      </Section>

      <Section id="heuristics" title="Cost and heuristics">
        <p className="text-[17px] leading-relaxed text-zinc-700 dark:text-zinc-300 max-w-3xl mb-6">
          Cost covers everything that affects the route: distance, time, weather, indoor preference and blocked hallways.
          Elevators add 0 m of distance but add wait and ride time. Each cost mode has its own heuristic, and{' '}
          <strong className="font-semibold text-primary-700 dark:text-primary-300">none of them overestimate, so A* always finds the best route</strong>.
        </p>
        <dl className="grid md:grid-cols-3 gap-4">
          {heuristics.map((h) => (
            <div key={h.mode} className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5">
              <dt className="text-sm font-semibold text-zinc-900 dark:text-white">{h.mode}</dt>
              <dd className="mt-1.5 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{h.h}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section id="evaluation" title="How we evaluated it">
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <p className="text-[17px] leading-relaxed text-zinc-700 dark:text-zinc-300">
              We ran 30+ randomized trials and reported averages for total path cost, nodes expanded, execution time,
              success rate and optimality. As a correctness check, A* and UCS must always return the same path cost.
            </p>
          </div>
          <dl className="divide-y divide-zinc-200 dark:divide-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
            {evaluation.map((e) => (
              <div key={e.what} className="px-5 py-3.5">
                <dt className="text-sm font-semibold text-zinc-900 dark:text-white">{e.what}</dt>
                <dd className="text-sm text-zinc-600 dark:text-zinc-400">{e.how}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      <Section id="demo" title="Try it: A* vs UCS">
        <p className="text-[17px] leading-relaxed text-zinc-700 dark:text-zinc-300 max-w-3xl mb-6">
          A small version of the idea. Walls are closed hallways and amber cells are crowded hallways that cost more to
          cross. Run both algorithms and compare how much of the grid each one has to explore.
        </p>
        <SearchDemo />
      </Section>
    </>
  )
}

function ProjectNav({ project }: { project: Project }) {
  const i = projects.findIndex((p) => p.id === project.id)
  const prev = projects[(i - 1 + projects.length) % projects.length]
  const next = projects[(i + 1) % projects.length]
  const card =
    'group flex-1 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-lg hover:shadow-zinc-900/5 transition-all'
  return (
    <nav aria-label="More projects" className="mt-4 pt-12 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row gap-4">
      <Link href={`/projects/${prev.id}`} className={card}>
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" aria-hidden="true" />
          Previous project
        </span>
        <span className="block mt-1.5 font-semibold text-zinc-900 dark:text-white">{prev.title}</span>
        <span className="block text-sm text-zinc-600 dark:text-zinc-400">{prev.subtitle}</span>
      </Link>
      <Link href={`/projects/${next.id}`} className={`${card} sm:text-right`}>
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          Next project
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </span>
        <span className="block mt-1.5 font-semibold text-zinc-900 dark:text-white">{next.title}</span>
        <span className="block text-sm text-zinc-600 dark:text-zinc-400">{next.subtitle}</span>
      </Link>
    </nav>
  )
}

export default function ProjectPage({ params }: { params: { id: string } }) {
  const project = getProject(params.id)
  if (!project) notFound()

  const diagrams = architectureDiagrams[project.id] ?? []
  const teamLine =
    project.teamSize === 1
      ? 'Solo'
      : `Team of ${project.teamSize}${project.team ? ` with ${project.team.join(', ')}` : ''}`

  return (
    <article className="mesh-gradient px-4 pt-28 pb-24">
      <div className="max-w-5xl mx-auto">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          All projects
        </Link>

        {/* Header */}
        <header className="mt-8">
          <p className="text-primary-700 dark:text-primary-300 text-xs font-semibold tracking-[0.18em] uppercase">
            Case study
          </p>
          <h1 className="mt-3 font-display text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-zinc-900 dark:text-white">
            {project.title}
          </h1>
          <p className="mt-2 text-xl sm:text-2xl text-zinc-600 dark:text-zinc-300">{project.subtitle}</p>
          <p className="mt-5 text-lg leading-relaxed text-zinc-700 dark:text-zinc-300 max-w-3xl">{project.summary}</p>

          <dl className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-px rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-200 dark:bg-zinc-800">
            {[
              ['Role', project.role],
              ['Team', teamLine],
              ['Date', project.date],
              ['Context', project.context],
            ].map(([k, v]) => (
              <div key={k} className="bg-white dark:bg-zinc-900 px-5 py-4">
                <dt className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">{k}</dt>
                <dd className="mt-1 text-sm font-medium text-zinc-900 dark:text-zinc-100">{v}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <TechTags tags={project.techStack} />
            <ProjectLinks project={project} size="md" />
          </div>
        </header>

        {/* Hero visual */}
        <div className="relative mt-10 aspect-[16/10] rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800 shadow-2xl shadow-zinc-900/10 dark:shadow-black/40">
          <ProjectCover project={project} sizes="(min-width: 1024px) 1024px, 100vw" priority />
        </div>

        {/* Results */}
        <section aria-labelledby="results" className="py-12">
          <h2 id="results" className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white mb-6">
            Results
          </h2>
          <dl className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {project.results.slice(0, 4).map((r) => (
              <div key={r.label} className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 sm:p-6 flex flex-col-reverse">
                <dt className="mt-2 text-sm leading-snug text-zinc-600 dark:text-zinc-400">{r.label}</dt>
                <dd className="text-3xl sm:text-4xl font-semibold tracking-tight text-primary-700 dark:text-primary-300">{r.value}</dd>
              </div>
            ))}
          </dl>
          {project.results.length > 4 && (
            <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
              Also: {project.results.slice(4).map((r) => `${r.value} ${r.label}`).join(', ')}.
            </p>
          )}
        </section>

        <Section id="problem" title="The problem">
          <Prose paragraphs={project.problem} />
        </Section>

        <Section id="built" title="What I built">
          <Prose paragraphs={project.solution} />
          <div className="mt-8 grid lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-4">Key features</h3>
              <ul className="space-y-2.5 text-[15px] text-zinc-700 dark:text-zinc-300 leading-relaxed">
                {project.features.map((f) => (
                  <li key={f} className="flex gap-3">
                    <span aria-hidden="true" className="mt-2.5 w-1.5 h-1.5 rounded-full bg-primary-500 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-4">Impact</h3>
              <ul className="space-y-2.5 text-[15px] text-zinc-700 dark:text-zinc-300 leading-relaxed">
                {project.keyPoints.map((p, i) => (
                  <li key={i} className="flex gap-3">
                    <span aria-hidden="true" className="mt-2.5 w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-500 flex-shrink-0" />
                    <span>
                      <Rich text={p} />
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        <Section id="architecture" title="Architecture">
          <ul className="mb-8 grid md:grid-cols-3 gap-4">
            {project.architecture.map((a) => (
              <li key={a} className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300 border-l-2 border-primary-300 dark:border-primary-700 pl-4">
                {a}
              </li>
            ))}
          </ul>
          <div className="space-y-6">
            {diagrams.map((d, i) => (
              <div key={d.title}>
                {diagrams.length > 1 && (
                  <h3 className="text-sm font-semibold text-zinc-900 dark:text-white mb-3">{d.title}</h3>
                )}
                <ArchitectureDiagram diagram={d} id={`${project.id}-diagram-${i}`} />
              </div>
            ))}
          </div>
        </Section>

        {project.id === 'motu' && <MotuDetails />}

        {project.images.length > 0 && (
          <Section id="screenshots" title="Screenshots">
            <div className="grid md:grid-cols-2 gap-6">
              {project.images.map((img, i) => (
                <figure key={img.src} className={project.images.length % 2 === 1 && i === 0 ? 'md:col-span-2' : ''}>
                  <a
                    href={img.src}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800 hover:shadow-xl hover:shadow-zinc-900/10 transition-shadow"
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      width={img.width}
                      height={img.height}
                      sizes={project.images.length % 2 === 1 && i === 0 ? '(min-width: 1024px) 1024px, 100vw' : '(min-width: 768px) 50vw, 100vw'}
                      className="w-full h-auto"
                    />
                    <span className="sr-only">Open full-size image in a new tab</span>
                  </a>
                  {img.caption && (
                    <figcaption className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">{img.caption}</figcaption>
                  )}
                </figure>
              ))}
            </div>
          </Section>
        )}

        <Section id="learned" title="What I learned">
          <p className="text-[17px] leading-relaxed text-zinc-700 dark:text-zinc-300 max-w-3xl">{project.learned}</p>
        </Section>

        <ProjectNav project={project} />
      </div>
    </article>
  )
}
