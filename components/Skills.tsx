'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import SkillsChart from './SkillsChart'
import { skillCategories, currentlyLearning } from '@/lib/skillsData'

export default function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
    <section id="skills" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <span className="text-primary-600 dark:text-primary-400 text-sm font-medium tracking-wider uppercase">
              Expertise
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-2 text-zinc-900 dark:text-white">
              Skills & Technologies
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto mt-4 rounded-full" />
          </motion.div>

          {/* Skills Chart */}
          <motion.div variants={itemVariants} className="mb-16">
            <SkillsChart />
          </motion.div>

          {/* Skills Grid by Category */}
          <motion.div
            variants={containerVariants}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
          >
            {skillCategories.map((category) => (
              <motion.div
                key={category.name}
                variants={itemVariants}
                className="p-6 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${category.bgColor}`}
                  >
                    <category.icon className={`w-5 h-5 ${category.textColor}`} />
                  </div>
                  <h3 className="font-semibold text-zinc-900 dark:text-white">
                    {category.name}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 text-sm bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-lg"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Currently Learning */}
          <motion.div
            variants={itemVariants}
            className="p-6 bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 rounded-2xl border border-primary-200/50 dark:border-primary-800/50"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <h3 className="font-semibold text-zinc-900 dark:text-white">
                Currently Learning
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {currentlyLearning.map((item) => (
                <span
                  key={item}
                  className="px-4 py-2 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-xl text-sm font-medium shadow-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

