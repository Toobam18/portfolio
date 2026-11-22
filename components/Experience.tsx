'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Calendar, MapPin } from 'lucide-react'
import SectionHeader from './SectionHeader'
import Rich from './Rich'
import TechTags from './projects/TechTags'
import { techExperiences, communityExperiences, type Experience as ExperienceType } from '@/lib/experienceData'
import { fadeUp, stagger } from '@/lib/motion'

function Meta({ exp }: { exp: ExperienceType }) {
  return (
    <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-zinc-500 dark:text-zinc-400 sm:justify-end sm:text-right">
      <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
        <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
        {exp.date}
      </span>
      {exp.location && (
        <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
          <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
          {exp.location}
        </span>
      )}
    </div>
  )
}

function Bullets({ points }: { points: string[] }) {
  return (
    <ul className="mt-4 space-y-2.5 text-[15px] text-zinc-600 dark:text-zinc-400 leading-relaxed">
      {points.map((point, i) => (
        <li key={i} className="flex gap-3">
          <span aria-hidden="true" className="mt-2.5 w-1 h-1 rounded-full bg-zinc-400 dark:bg-zinc-500 flex-shrink-0" />
          <span>
            <Rich text={point} />
          </span>
        </li>
      ))}
    </ul>
  )
}

export default function Experience() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="experience" aria-labelledby="experience-title" className="py-24 sm:py-28 px-4 bg-zinc-50/60 dark:bg-zinc-900/40">
      <div className="max-w-4xl mx-auto">
        <motion.div ref={ref} variants={stagger} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
          <motion.div variants={fadeUp}>
            <SectionHeader id="experience-title" eyebrow="Experience" title="Where I’ve Worked" />
          </motion.div>

          {/* Main timeline: tech roles */}
          <ol className="relative border-l border-zinc-200 dark:border-zinc-800 ml-2 sm:ml-3 space-y-8">
            {techExperiences.map((exp) => (
              <motion.li key={exp.id} variants={fadeUp} className="relative pl-7 sm:pl-10">
                <span
                  aria-hidden="true"
                  className="absolute -left-[7px] top-7 w-3.5 h-3.5 rounded-full bg-primary-500 ring-4 ring-[color:var(--background)]"
                />
                <article className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-6">
                    <div>
                      <h3 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-white">{exp.role}</h3>
                      <p className="mt-0.5 text-[15px] text-zinc-600 dark:text-zinc-400">{exp.organization}</p>
                    </div>
                    <Meta exp={exp} />
                  </div>
                  <Bullets points={exp.points} />
                  {exp.skills && exp.skills.length > 0 && (
                    <div className="mt-5 pt-5 border-t border-zinc-100 dark:border-zinc-800">
                      <TechTags tags={exp.skills} label={`Skills used at ${exp.organization}`} />
                    </div>
                  )}
                </article>
              </motion.li>
            ))}
          </ol>

          {/* Leadership and Community */}
          {communityExperiences.length > 0 && (
            <motion.div variants={fadeUp} className="mt-16">
              <h3 className="text-xs font-semibold tracking-[0.18em] uppercase text-zinc-500 dark:text-zinc-400 mb-5">
                Leadership and Community
              </h3>
              <div className="grid gap-5">
                {communityExperiences.map((exp) => (
                  <article
                    key={exp.id}
                    className="p-6 rounded-2xl bg-white/70 dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-6">
                      <div>
                        <h4 className="text-lg font-semibold text-zinc-900 dark:text-white">{exp.role}</h4>
                        <p className="mt-0.5 text-[15px] text-zinc-600 dark:text-zinc-400">{exp.organization}</p>
                      </div>
                      <Meta exp={exp} />
                    </div>
                    <Bullets points={exp.points} />
                  </article>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
