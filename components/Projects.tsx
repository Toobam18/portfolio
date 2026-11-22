'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import SectionHeader from './SectionHeader'
import FeaturedProjectCard from './projects/FeaturedProjectCard'
import ProjectCard from './projects/ProjectCard'
import { projects } from '@/lib/projectsData'
import { fadeUp, stagger } from '@/lib/motion'

const featured = projects.filter((p) => p.featured)
const others = projects.filter((p) => !p.featured)

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="projects" aria-labelledby="projects-title" className="py-24 sm:py-28 px-4 bg-zinc-50/60 dark:bg-zinc-900/40">
      <div className="max-w-6xl mx-auto">
        <motion.div ref={ref} variants={stagger} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
          <motion.div variants={fadeUp}>
            <SectionHeader
              id="projects-title"
              eyebrow="Projects"
              title="Selected Work"
              description="Each project has a full case study: the problem, what I built, the architecture and the measured results."
            />
          </motion.div>

          <div className="space-y-8">
            {featured.map((project, i) => (
              <motion.div key={project.id} variants={fadeUp}>
                <FeaturedProjectCard project={project} flip={i % 2 === 1} />
              </motion.div>
            ))}
          </div>

          <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {others.map((project) => (
              <motion.div key={project.id} variants={fadeUp}>
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
