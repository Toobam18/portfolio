'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Calendar, MapPin } from 'lucide-react'
import { experiences } from '@/lib/experienceData'

export default function Experience() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  }

  return (
    <section id="experience" className="py-24 px-4 bg-zinc-50/50 dark:bg-zinc-900/50">
      <div className="max-w-4xl mx-auto">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <span className="text-primary-600 dark:text-primary-400 text-sm font-medium tracking-wider uppercase">
              Journey
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-2 text-zinc-900 dark:text-white">
              Experience & Leadership
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto mt-4 rounded-full" />
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-0.5 h-full bg-zinc-200 dark:bg-zinc-800" />

            {/* Timeline Items */}
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                variants={itemVariants}
                className={`relative mb-12 last:mb-0 ${
                  index % 2 === 0 ? 'md:pr-1/2' : 'md:pl-1/2 md:ml-auto'
                }`}
              >
                <div
                  className={`flex flex-col md:flex-row items-start gap-4 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-primary-500 border-4 border-white dark:border-zinc-900 z-10" />

                  {/* Content Card */}
                  <div
                    className={`ml-8 md:ml-0 md:w-[calc(50%-2rem)] ${
                      index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'
                    }`}
                  >
                    <div className="p-6 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 card-hover">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
                            {exp.role}
                          </h3>
                          <p className="text-primary-600 dark:text-primary-400 font-medium">
                            {exp.organization}
                          </p>
                        </div>
                        <span
                          className={`px-3 py-1 text-xs font-medium rounded-full ${
                            exp.type === 'leadership'
                              ? 'bg-accent-100 dark:bg-accent-900/30 text-accent-700 dark:text-accent-300'
                              : 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                          }`}
                        >
                          {exp.type === 'leadership' ? 'Leadership' : 'Experience'}
                        </span>
                      </div>

                      {/* Meta */}
                      <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400 mb-4">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {exp.date}
                        </span>
                        {exp.location && (
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {exp.location}
                          </span>
                        )}
                      </div>

                      {/* Description Points */}
                      <ul className="space-y-2">
                        {exp.points.map((point, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2 flex-shrink-0" />
                            {point}
                          </li>
                        ))}
                      </ul>

                      {/* Skills/Tags */}
                      {exp.skills && (
                        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                          {exp.skills.map((skill) => (
                            <span
                              key={skill}
                              className="px-2 py-1 text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 rounded"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

