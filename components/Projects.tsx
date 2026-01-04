'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import ProjectCard from './ProjectCard'
import { projects, filterCategories } from '@/lib/projectsData'

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('all')
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const filteredProjects =
    activeFilter === 'all'
      ? projects
      : projects.filter((project) => project.categories.includes(activeFilter))

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
    <section id="projects" className="py-24 px-4 bg-zinc-50/50 dark:bg-zinc-900/50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <span className="text-primary-600 dark:text-primary-400 text-sm font-medium tracking-wider uppercase">
              Portfolio
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-2 text-zinc-900 dark:text-white">
              Featured Projects
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto mt-4 rounded-full" />
            <p className="text-zinc-600 dark:text-zinc-400 mt-4 max-w-2xl mx-auto">
              Here are some of the projects I&apos;ve worked on. Each one taught me something new and helped me grow as a developer.
            </p>
          </motion.div>

          {/* Filter Chips */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-2 mb-12"
          >
            {filterCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveFilter(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeFilter === category.id
                    ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900'
                    : 'bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-700 border border-zinc-200 dark:border-zinc-700'
                }`}
              >
                {category.label}
              </button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            variants={containerVariants}
            className="grid md:grid-cols-2 gap-6"
          >
            {filteredProjects.map((project) => (
              <motion.div key={project.id} variants={itemVariants} layout>
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </motion.div>

          {filteredProjects.length === 0 && (
            <motion.p
              variants={itemVariants}
              className="text-center text-zinc-500 dark:text-zinc-400 py-12"
            >
              No projects found in this category.
            </motion.p>
          )}
        </motion.div>
      </div>
    </section>
  )
}

