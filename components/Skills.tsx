'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import SectionHeader from './SectionHeader'
import { skillCategories } from '@/lib/skillsData'
import { fadeUp, stagger } from '@/lib/motion'

export default function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="skills" aria-labelledby="skills-title" className="py-24 sm:py-28 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div ref={ref} variants={stagger} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
          <motion.div variants={fadeUp}>
            <SectionHeader id="skills-title" eyebrow="Skills" title="Tools I Build With" />
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-5">
            {skillCategories.map((category) => (
              <motion.div
                key={category.name}
                variants={fadeUp}
                className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800"
              >
                <h3 className="flex items-center gap-3 font-semibold text-zinc-900 dark:text-white">
                  <span className="w-9 h-9 rounded-lg flex items-center justify-center bg-primary-50 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300">
                    <category.icon className="w-[18px] h-[18px]" aria-hidden="true" />
                  </span>
                  {category.name}
                </h3>
                <ul className="mt-4 flex flex-wrap gap-2" aria-label={category.name}>
                  {category.skills.map((skill) => (
                    <li
                      key={skill}
                      className="px-3 py-1.5 text-sm rounded-lg bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
