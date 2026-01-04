'use client'

import { motion } from 'framer-motion'
import { ArrowDown, Github, Linkedin, ExternalLink, Download, Mail } from 'lucide-react'

export default function Hero() {
  const scrollToProjects = () => {
    const element = document.getElementById('projects')
    if (element) element.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToContact = () => {
    const element = document.getElementById('contact')
    if (element) element.scrollIntoView({ behavior: 'smooth' })
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-slate-200/50 dark:bg-slate-800/30 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-slate-300/40 dark:bg-slate-700/20 rounded-full blur-3xl" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-4xl mx-auto text-center"
      >
        {/* Name */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-semibold mb-6 text-slate-800 dark:text-white"
        >
          Tooba Malik
        </motion.h1>

        {/* Role */}
        <motion.p
          variants={itemVariants}
          className="text-xl sm:text-2xl text-slate-600 dark:text-slate-300 mb-4"
        >
          Software Engineering Student at{' '}
          <span className="font-semibold text-slate-800 dark:text-white">
            Ontario Tech University
          </span>
        </motion.p>

        {/* Co-op seeking */}
        <motion.p
          variants={itemVariants}
          className="text-lg sm:text-xl text-slate-500 dark:text-slate-400 mb-12 max-w-2xl mx-auto"
        >
          Aspiring software engineer actively seeking 2026 co-op opportunities.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          <motion.button
            onClick={scrollToProjects}
            className="group px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-medium hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors flex items-center gap-2 shadow-lg shadow-slate-900/10"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            View Projects
            <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
          </motion.button>

          <motion.a
            href="/resume.pdf"
            download
            className="group px-6 py-3 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center gap-2 border border-slate-200 dark:border-slate-700 shadow-lg shadow-slate-900/5"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Download className="w-4 h-4" />
            Download Resume
          </motion.a>

          <motion.button
            onClick={scrollToContact}
            className="group px-6 py-3 border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-xl font-medium hover:border-slate-400 dark:hover:border-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors flex items-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Mail className="w-4 h-4" />
            Contact
          </motion.button>
        </motion.div>

        {/* Social Links */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center gap-4"
        >
          <motion.a
            href="https://www.linkedin.com/in/tooba-malik-46369825a"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-xl bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-[#0077B5] border border-slate-200 dark:border-slate-700 hover:border-[#0077B5]/30 transition-all shadow-sm"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="LinkedIn"
          >
            <Linkedin className="w-5 h-5" />
          </motion.a>

          <motion.a
            href="https://github.com/Toobam18"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-xl bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700 transition-all shadow-sm"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="GitHub"
          >
            <Github className="w-5 h-5" />
          </motion.a>

          <motion.a
            href="https://linktr.ee/ToobaM18"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-xl bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-emerald-600 border border-slate-200 dark:border-slate-700 hover:border-emerald-500/30 transition-all shadow-sm"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Linktree"
          >
            <ExternalLink className="w-5 h-5" />
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-6 h-10 rounded-full border-2 border-slate-300 dark:border-slate-600 flex justify-center pt-2"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-500" />
        </motion.div>
      </motion.div>
    </section>
  )
}
