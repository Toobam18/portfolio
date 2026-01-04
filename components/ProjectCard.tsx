'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Github, ChevronDown, ChevronUp } from 'lucide-react'
import Image from 'next/image'
import { Project } from '@/lib/projectsData'

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="group bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 card-hover">
      {/* Project Image */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary-100 to-accent-100 dark:from-primary-900/20 dark:to-accent-900/20">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-6xl font-bold text-zinc-300 dark:text-zinc-700">
              {project.title.charAt(0)}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Project Info */}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-2">
          {project.title}
        </h3>

        <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-4">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 text-xs font-medium rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Key Points */}
        <ul className="space-y-2 mb-4">
          {project.keyPoints.slice(0, isExpanded ? undefined : 2).map((point, index) => (
            <li
              key={index}
              className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2 flex-shrink-0" />
              {point}
            </li>
          ))}
        </ul>

        {/* Expanded Details */}
        <AnimatePresence>
          {isExpanded && project.additionalDetails && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-4"
            >
              <div className="p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl">
                <h4 className="text-sm font-medium text-zinc-900 dark:text-white mb-2">
                  More Details
                </h4>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  {project.additionalDetails}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {project.additionalDetails && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1 text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 mb-4 transition-colors"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="w-4 h-4" />
                Show less
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4" />
                More details
              </>
            )}
          </button>
        )}

        {/* Action Button */}
        {project.githubUrl && (
          <motion.a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-xl text-sm font-medium hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Github className="w-4 h-4" />
            View on GitHub
          </motion.a>
        )}
      </div>
    </div>
  )
}
