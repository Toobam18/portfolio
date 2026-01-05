'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Send, Mail, Copy, Check, Github, Linkedin, ExternalLink } from 'lucide-react'

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const [copied, setCopied] = useState(false)
  const email = 'tooba.malik@ontariotechu.net'

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      const textArea = document.createElement('textarea')
      textArea.value = email
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <section id="contact" className="py-24 px-4 bg-zinc-50/50 dark:bg-zinc-900/50">
      <div className="max-w-4xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
        >
          <div className="grid md:grid-cols-5 gap-8">
            {/* LEFT SIDE */}
            <div className="md:col-span-2 space-y-6">
              <div className="p-6 bg-white dark:bg-zinc-900 rounded-2xl border">
                <div className="flex items-center gap-3 mb-4">
                  <Mail className="w-5 h-5 text-primary-600" />
                  <h3 className="font-medium">Email</h3>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-primary-600 text-sm break-all">{email}</span>
                  <button onClick={copyEmail} type="button" aria-label="Copy email">
                    {copied ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="p-6 bg-white dark:bg-zinc-900 rounded-2xl border space-y-3">
                <a
                  href="https://www.linkedin.com/in/tooba-malik186"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex gap-2 items-center"
                >
                  <Linkedin className="w-5 h-5" /> LinkedIn
                </a>

                <a
                  href="https://github.com/Toobam18"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex gap-2 items-center"
                >
                  <Github className="w-5 h-5" /> GitHub
                </a>

                <a
                  href="https://linktr.ee/ToobaM18"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex gap-2 items-center"
                >
                  <ExternalLink className="w-5 h-5" /> Linktree
                </a>
              </div>
            </div>

            {/* FORM */}
            <div className="md:col-span-3">
              <form
                action="https://formspree.io/f/xykzopaa"
                method="POST"
                className="p-6 bg-white dark:bg-zinc-900 rounded-2xl border space-y-5"
              >
                {/* Email subject */}
                <input type="hidden" name="_subject" value="New Portfolio Message" />

                <input
                  name="name"
                  placeholder="Name"
                  required
                  className="w-full px-4 py-3 rounded-xl border"
                />

                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  required
                  className="w-full px-4 py-3 rounded-xl border"
                />

                <textarea
                  name="message"
                  rows={5}
                  placeholder="Message"
                  required
                  className="w-full px-4 py-3 rounded-xl border resize-none"
                />

                <button
                  type="submit"
                  className="w-full flex justify-center items-center gap-2 px-6 py-3 bg-zinc-900 text-white rounded-xl"
                >
                  <Send className="w-5 h-5" />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
