'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Mail, Copy, Check, Github, Linkedin, ArrowUpRight } from 'lucide-react'
import SectionHeader from './SectionHeader'
import { fadeUp, stagger } from '@/lib/motion'

const EMAIL = 'tooba.m186@gmail.com'

const links = [
  {
    href: 'https://www.linkedin.com/in/tooba-malik186',
    label: 'LinkedIn',
    detail: 'linkedin.com/in/tooba-malik186',
    icon: Linkedin,
  },
  {
    href: 'https://github.com/Toobam18',
    label: 'GitHub',
    detail: 'github.com/Toobam18',
    icon: Github,
  },
]

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard can be blocked; the address is visible and selectable anyway.
    }
  }

  return (
    <section id="contact" aria-labelledby="contact-title" className="py-24 sm:py-28 px-4 bg-zinc-50/60 dark:bg-zinc-900/40">
      <div className="max-w-4xl mx-auto">
        <motion.div ref={ref} variants={stagger} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
          <motion.div variants={fadeUp}>
            <SectionHeader
              id="contact-title"
              eyebrow="Contact"
              title="Get in Touch"
              description="I am seeking a Winter or Summer 2027 software engineering co-op. I welcome inquiries about roles and projects, and email is the best way to reach me."
            />
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center gap-5"
          >
            <span className="w-12 h-12 rounded-xl flex items-center justify-center bg-primary-50 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300 flex-shrink-0">
              <Mail className="w-6 h-6" aria-hidden="true" />
            </span>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Email</h3>
              <a
                href={`mailto:${EMAIL}`}
                className="text-lg sm:text-xl font-semibold text-zinc-900 dark:text-white hover:text-primary-700 dark:hover:text-primary-300 break-all transition-colors"
              >
                {EMAIL}
              </a>
            </div>
            <button
              onClick={copyEmail}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border border-zinc-300 dark:border-zinc-600 text-zinc-800 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              {copied ? (
                <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
              ) : (
                <Copy className="w-4 h-4" aria-hidden="true" />
              )}
              {copied ? 'Copied' : 'Copy email'}
            </button>
            <span className="sr-only" role="status" aria-live="polite">
              {copied ? 'Email address copied to clipboard' : ''}
            </span>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-5 grid sm:grid-cols-2 gap-5">
            {links.map(({ href, label, detail, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center gap-4 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-lg hover:shadow-zinc-900/5 transition-all"
              >
                <span className="w-11 h-11 rounded-xl flex items-center justify-center bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-100">
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </span>
                <span className="flex-1 min-w-0">
                  <span className="block font-semibold text-zinc-900 dark:text-white">{label}</span>
                  <span className="block text-sm text-zinc-600 dark:text-zinc-400 truncate">{detail}</span>
                </span>
                <ArrowUpRight
                  className="w-5 h-5 text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors"
                  aria-hidden="true"
                />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
