'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Code2, Route, Users } from 'lucide-react'
import SectionHeader from './SectionHeader'
import { fadeUp, stagger } from '@/lib/motion'

const highlights = [
  {
    icon: Code2,
    title: 'Full-stack web and mobile',
    description: 'React Native and React frontends on Flask, Express and Supabase backends, with PostgreSQL underneath.',
  },
  {
    icon: Route,
    title: 'AI and algorithms',
    description: 'Search, admissible heuristics and benchmarking, from A* campus routing to SQL views that answer planning questions.',
  },
  {
    icon: Users,
    title: 'Team delivery',
    description: 'Shipping in teams of three and four with pull request reviews, shared schemas and stakeholder-tested prototypes.',
  },
]

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" aria-labelledby="about-title" className="py-24 sm:py-28 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div ref={ref} variants={stagger} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
          <motion.div variants={fadeUp}>
            <SectionHeader id="about-title" eyebrow="About" title="Who I Am" />
          </motion.div>

          <motion.div variants={fadeUp} className="max-w-3xl mx-auto text-center mb-14 space-y-4">
            <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
              I&apos;m <span className="font-medium text-zinc-900 dark:text-white">Tooba Malik</span>, a third-year
              Software Engineering (Co-op) student at Ontario Tech University. I build full-stack applications and AI tools,
              and I enjoy the whole path from understanding what users need to shipping reliable, tested software.
            </p>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
              I&apos;m most interested in backend systems, databases and automation, and I&apos;m seeking a Winter or
              Summer 2027 co-op.
            </p>
          </motion.div>

          <motion.ul variants={stagger} className="grid md:grid-cols-3 gap-5">
            {highlights.map((item) => (
              <motion.li
                key={item.title}
                variants={fadeUp}
                className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800"
              >
                <span className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 bg-primary-50 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300">
                  <item.icon className="w-5 h-5" aria-hidden="true" />
                </span>
                <h3 className="font-semibold text-zinc-900 dark:text-white mb-1.5">{item.title}</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{item.description}</p>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </section>
  )
}
