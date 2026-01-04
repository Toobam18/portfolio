'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Send, Mail, Copy, Check, Github, Linkedin, ExternalLink } from 'lucide-react'

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [copied, setCopied] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const email = 'tooba.malik@ontariotechu.net'

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

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Using Formspree - Replace YOUR_FORM_ID with your actual Formspree form ID
      const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', message: '' })
      } else {
        setSubmitStatus('error')
      }
    } catch {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback for older browsers
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  return (
    <section id="contact" className="py-24 px-4 bg-zinc-50/50 dark:bg-zinc-900/50">
      <div className="max-w-4xl mx-auto">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <span className="text-primary-600 dark:text-primary-400 text-sm font-medium tracking-wider uppercase">
              Get in Touch
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-2 text-zinc-900 dark:text-white">
              Contact Me
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto mt-4 rounded-full" />
            <p className="text-zinc-600 dark:text-zinc-400 mt-4 max-w-xl mx-auto">
              Have a question or want to work together? Feel free to reach out!
            </p>
          </motion.div>

          <div className="grid md:grid-cols-5 gap-8">
            {/* Contact Info */}
            <motion.div variants={itemVariants} className="md:col-span-2 space-y-6">
              {/* Email Card */}
              <div className="p-6 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center">
                    <Mail className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-zinc-900 dark:text-white">Email</h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                      Preferred contact method
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={`mailto:${email}`}
                    className="text-primary-600 dark:text-primary-400 hover:underline text-sm break-all"
                  >
                    {email}
                  </a>
                  <button
                    onClick={copyEmail}
                    className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                    title="Copy email"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4 text-zinc-400" />
                    )}
                  </button>
                </div>
              </div>

              {/* Social Links */}
              <div className="p-6 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800">
                <h3 className="font-medium text-zinc-900 dark:text-white mb-4">
                  Connect with me
                </h3>
                <div className="flex gap-3">
                  <a
                    href="https://www.linkedin.com/in/tooba-malik186"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 p-3 rounded-xl bg-[#0077B5]/10 text-[#0077B5] hover:bg-[#0077B5]/20 transition-colors"
                  >
                    <Linkedin className="w-5 h-5" />
                    <span className="text-sm font-medium">LinkedIn</span>
                  </a>
                  <a
                    href="https://github.com/Toobam18"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 p-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                  >
                    <Github className="w-5 h-5" />
                    <span className="text-sm font-medium">GitHub</span>
                  </a>
                </div>
                <a
                  href="https://linktr.ee/ToobaM18"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 mt-3 p-3 rounded-xl bg-[#43E660]/10 text-[#43E660] hover:bg-[#43E660]/20 transition-colors"
                >
                  <ExternalLink className="w-5 h-5" />
                  <span className="text-sm font-medium">Linktree</span>
                </a>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div variants={itemVariants} className="md:col-span-3">
              <form
                onSubmit={handleSubmit}
                className="p-6 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800"
              >
                <div className="space-y-5">
                  {/* Name Field */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className={`w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-800 border ${
                        errors.name
                          ? 'border-red-500'
                          : 'border-zinc-200 dark:border-zinc-700'
                      } text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none`}
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      className={`w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-800 border ${
                        errors.email
                          ? 'border-red-500'
                          : 'border-zinc-200 dark:border-zinc-700'
                      } text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                    )}
                  </div>

                  {/* Message Field */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Your message..."
                      rows={5}
                      className={`w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-800 border ${
                        errors.message
                          ? 'border-red-500'
                          : 'border-zinc-200 dark:border-zinc-700'
                      } text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none resize-none`}
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-500">{errors.message}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-xl font-medium hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </div>

                {/* Status Messages */}
                <AnimatePresence>
                  {submitStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl text-green-700 dark:text-green-300 text-sm"
                    >
                      Thank you! Your message has been sent successfully.
                    </motion.div>
                  )}

                  {submitStatus === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-700 dark:text-red-300 text-sm"
                    >
                      Oops! Something went wrong. Please try again or email me directly.
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </motion.div>
          </div>

          {/* Toast Notification */}
          <AnimatePresence>
            {copied && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                className="fixed bottom-6 left-1/2 -translate-x-1/2 px-4 py-3 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-xl shadow-lg flex items-center gap-2 z-50"
              >
                <Check className="w-5 h-5 text-green-500" />
                Email copied to clipboard!
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}

