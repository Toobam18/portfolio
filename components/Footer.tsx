'use client'

import { Github, Linkedin, ExternalLink, Heart } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="py-12 px-4 border-t border-zinc-200 dark:border-zinc-800">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Copyright */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <motion.button
              onClick={scrollToTop}
              className="text-xl font-display font-semibold text-slate-800 dark:text-white"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Tooba Malik
            </motion.button>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              © {currentYear} Tooba Malik. All rights reserved.
            </p>
          </div>

          {/* Built With */}
          <div className="flex items-center gap-1 text-sm text-zinc-500 dark:text-zinc-400">
            <span>Built with</span>
            <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            <span>using</span>
            <span className="font-medium text-zinc-700 dark:text-zinc-300">Next.js</span>
            <span>&</span>
            <span className="font-medium text-zinc-700 dark:text-zinc-300">Tailwind</span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            <motion.a
              href="https://www.linkedin.com/in/tooba-malik186"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-[#0077B5] hover:bg-[#0077B5]/10 dark:hover:bg-[#0077B5]/20 transition-all"
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
              className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all"
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
              className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-[#43E660] hover:bg-[#43E660]/10 dark:hover:bg-[#43E660]/20 transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Linktree"
            >
              <ExternalLink className="w-5 h-5" />
            </motion.a>
          </div>
        </div>
      </div>
    </footer>
  )
}

