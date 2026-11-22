'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { GraduationCap, MapPin, Calendar } from 'lucide-react'
import SectionHeader from './SectionHeader'

// Mirrors the "Education" section of resume.pdf
const education = {
  school: 'Ontario Tech University',
  degree: 'Bachelor of Engineering in Software Engineering (Co-op)',
  dates: 'Sep 2024 to Apr 2028',
  location: 'Oshawa, ON',
  graduation: 'Third year, expected graduation April 2028',
  coursework: [
    'Data Structures',
    'Algorithms',
    'Object-Oriented Programming and Design',
    'Database Systems',
    'Requirements Engineering',
    'Software Design and Architecture',
    'Operating Systems',
    'Web Programming',
    'Digital Systems and Computer Architecture',
    'Discrete Mathematics',
    'Statistics and Probability',
    'Linear Algebra',
  ],
}

export default function Education() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
    },
  }

  return (
    <section id="education" aria-labelledby="education-title" className="py-24 sm:py-28 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15 } } }}
        >
          <motion.div variants={itemVariants}>
            <SectionHeader id="education-title" eyebrow="Education" title="Academic Background" />
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="p-6 sm:p-8 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800"
          >
            <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary-50 dark:bg-primary-900/40 flex items-center justify-center flex-shrink-0">
                <GraduationCap className="w-6 h-6 text-primary-700 dark:text-primary-300" aria-hidden="true" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-white">
                  {education.degree}
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 mt-0.5">{education.school}</p>
                <div className="flex flex-wrap gap-x-5 gap-y-1 mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" aria-hidden="true" />
                    {education.dates}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4" aria-hidden="true" />
                    {education.location}
                  </span>
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2">
                  {education.graduation}
                </p>
              </div>
            </div>

            <h4 className="text-sm font-semibold text-zinc-900 dark:text-white mb-3">
              Relevant Coursework
            </h4>
            <ul aria-label="Relevant coursework" className="flex flex-wrap gap-2">
              {education.coursework.map((course) => (
                <li
                  key={course}
                  className="px-3 py-1.5 text-sm bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-lg"
                >
                  {course}
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
