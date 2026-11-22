'use client'

import { motion } from 'framer-motion'
import { ArrowDown, Github, Linkedin, ExternalLink, Download, Mail } from 'lucide-react'
import Rich from './Rich'
import { heroStats } from '@/lib/heroStats'
import { fadeUp } from '@/lib/motion'

const socials = [
  { href: 'https://www.linkedin.com/in/tooba-malik186', label: 'LinkedIn', icon: Linkedin },
  { href: 'https://github.com/Toobam18', label: 'GitHub', icon: Github },
  { href: 'https://linktr.ee/ToobaM18', label: 'Linktree', icon: ExternalLink },
]

export default function Hero() {
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center px-4 pt-24 pb-20 overflow-hidden">
      {/* Background decorations */}
      {/* Soft background glow. Radial gradients instead of large blur filters, which are slow to paint on phones */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_30%_30%,rgba(203,213,225,0.55),transparent_35%),radial-gradient(circle_at_70%_70%,rgba(203,213,225,0.45),transparent_35%)] dark:bg-[radial-gradient(circle_at_30%_30%,rgba(30,41,59,0.6),transparent_35%),radial-gradient(circle_at_70%_70%,rgba(51,65,85,0.35),transparent_35%)]"
      />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } } }}
        className="relative z-10 max-w-4xl mx-auto text-center"
      >
        {/* Status badge */}
        <motion.p
          variants={fadeUp}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-8 rounded-full border border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-800/60 dark:bg-emerald-950/50 dark:text-emerald-200 text-sm font-medium"
        >
          <span className="relative flex w-2 h-2" aria-hidden="true">
            <span className="absolute inline-flex w-full h-full rounded-full bg-emerald-400 opacity-75 motion-safe:animate-ping" />
            <span className="relative inline-flex w-2 h-2 rounded-full bg-emerald-500" />
          </span>
          Open to Winter and Summer 2027 co-ops
        </motion.p>

        {/* Name and role render immediately (no fade) so the largest text paints right away */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-semibold tracking-tight mb-6 text-slate-800 dark:text-white">
          Tooba Malik
        </h1>
        <p className="text-xl sm:text-2xl text-slate-600 dark:text-slate-300 mb-4">
          Third-Year Software Engineering Student at{' '}
          <span className="font-semibold text-slate-800 dark:text-white">Ontario Tech University</span>
        </p>

        <motion.p variants={fadeUp} className="text-lg text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto">
          I build full-stack and AI software, and I measure what it changes.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-12">
          <button
            onClick={() => scrollTo('projects')}
            className="group px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-medium hover:bg-slate-700 dark:hover:bg-slate-200 transition-colors flex items-center gap-2 shadow-lg shadow-slate-900/10"
          >
            View Projects
            <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" aria-hidden="true" />
          </button>
          <a
            href="/resume.pdf"
            download="Tooba_Malik_Resume.pdf"
            className="px-6 py-3 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center gap-2 border border-slate-200 dark:border-slate-700 shadow-lg shadow-slate-900/5"
          >
            <Download className="w-4 h-4" aria-hidden="true" />
            Download Resume
          </a>
          <button
            onClick={() => scrollTo('contact')}
            className="px-6 py-3 border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 rounded-xl font-medium hover:border-slate-400 dark:hover:border-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors flex items-center gap-2"
          >
            <Mail className="w-4 h-4" aria-hidden="true" />
            Contact
          </button>
        </motion.div>

        {/* Proof stats, sourced from the data files */}
        <motion.ul
          variants={fadeUp}
          aria-label="Highlights"
          className="mx-auto mb-12 max-w-3xl grid sm:grid-cols-3 rounded-2xl border border-slate-200 dark:border-slate-700/80 bg-white/70 dark:bg-slate-900/60 divide-y sm:divide-y-0 sm:divide-x divide-slate-200 dark:divide-slate-700/80"
        >
          {heroStats.map((stat) => (
            <li key={stat} className="px-5 py-4 text-[15px] text-slate-700 dark:text-slate-300 [&_strong]:text-lg">
              <Rich text={stat} />
            </li>
          ))}
        </motion.ul>

        {/* Social Links */}
        <motion.div variants={fadeUp} className="flex justify-center gap-3">
          {socials.map(({ href, label, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${label} (opens in a new tab)`}
              className="p-3 rounded-xl bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700 transition-colors shadow-sm"
            >
              <Icon className="w-5 h-5" aria-hidden="true" />
            </a>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <div aria-hidden="true" className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden sm:block">
        <div className="w-6 h-10 rounded-full border-2 border-slate-300 dark:border-slate-600 flex justify-center pt-2">
          <div className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-500 motion-safe:animate-bounce" />
        </div>
      </div>
    </section>
  )
}
