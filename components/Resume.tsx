'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Download, FileText, ExternalLink } from 'lucide-react'

const RESUME_URL = '/resume.pdf'

export default function Resume() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  // 🔒 Fallback so loader never blocks forever
  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 1200)
    return () => clearTimeout(t)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
    },
  }

  return (
    <section id="resume" className="py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <span className="text-primary-600 dark:text-primary-400 text-sm font-medium tracking-wider uppercase">
              Resume
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-2 text-zinc-900 dark:text-white">
              My Resume
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto mt-4 rounded-full" />
          </motion.div>

          {/* Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-4 mb-8"
          >
            <motion.a
              href={RESUME_URL}
              download="Tooba Malik Final Resume.pdf"
              className="flex items-center gap-2 px-6 py-3 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-xl font-medium hover:bg-zinc-800 dark:hover:bg-zinc-100"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Download className="w-5 h-5" />
              Download PDF
            </motion.a>

            <motion.a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-xl font-medium hover:bg-zinc-50 dark:hover:bg-zinc-800"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ExternalLink className="w-5 h-5" />
              Open in New Tab
            </motion.a>
          </motion.div>

          {/* Viewer */}
          <motion.div
            variants={itemVariants}
            className="relative bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden"
          >
            {/* Loader */}
            {isLoading && !hasError && (
              <div className="absolute inset-0 flex items-center justify-center bg-zinc-50 dark:bg-zinc-800 z-10">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
                  <p className="text-zinc-500 dark:text-zinc-400">
                    Loading resume...
                  </p>
                </div>
              </div>
            )}

            {/* Error */}
            {hasError ? (
              <div className="flex flex-col items-center justify-center py-20 px-4">
                <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mb-4">
                  <FileText className="w-8 h-8 text-zinc-400" />
                </div>
                <h3 className="text-lg font-medium text-zinc-900 dark:text-white mb-2">
                  Resume preview unavailable
                </h3>
                <p className="text-zinc-500 dark:text-zinc-400 text-center mb-6">
                  Please open or download the PDF directly.
                </p>
                <a
                  href={RESUME_URL}
                  download="Tooba Malik Final Resume.pdf"
                  className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                >
                  <Download className="w-4 h-4" />
                  Download PDF
                </a>
              </div>
            ) : (
              <iframe
                src={`${RESUME_URL}#view=FitH`}
                className="w-full h-[700px] border-0"
                title="Resume"
                onLoad={() => setIsLoading(false)}
                onError={() => {
                  setIsLoading(false)
                  setHasError(true)
                }}
              />
            )}
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="text-center text-sm text-zinc-500 dark:text-zinc-400 mt-6"
          >
            Having trouble viewing? Download the PDF directly above.
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
