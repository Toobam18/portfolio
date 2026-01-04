'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Code2, Users, Wrench } from 'lucide-react'

const highlights = [
  {
    icon: Code2,
    title: 'Web Development',
    description: 'Building responsive and user-friendly web applications with modern technologies.',
    color: 'primary',
  },
  {
    icon: Users,
    title: 'Team-Based Projects',
    description: 'Collaborating with teams to deliver impactful solutions through effective communication.',
    color: 'accent',
  },
  {
    icon: Wrench,
    title: 'Building Practical Tools',
    description: 'Creating tools that solve real problems and improve everyday productivity.',
    color: 'emerald',
  },
]

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

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

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'primary':
        return {
          bg: 'bg-primary-100 dark:bg-primary-900/30',
          text: 'text-primary-600 dark:text-primary-400',
          border: 'border-primary-200 dark:border-primary-800',
        }
      case 'accent':
        return {
          bg: 'bg-accent-100 dark:bg-accent-900/30',
          text: 'text-accent-600 dark:text-accent-400',
          border: 'border-accent-200 dark:border-accent-800',
        }
      case 'emerald':
        return {
          bg: 'bg-emerald-100 dark:bg-emerald-900/30',
          text: 'text-emerald-600 dark:text-emerald-400',
          border: 'border-emerald-200 dark:border-emerald-800',
        }
      default:
        return {
          bg: 'bg-zinc-100 dark:bg-zinc-800',
          text: 'text-zinc-600 dark:text-zinc-400',
          border: 'border-zinc-200 dark:border-zinc-700',
        }
    }
  }

  return (
    <section id="about" className="py-24 px-4">
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
              About Me
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-2 text-zinc-900 dark:text-white">
              Who I Am
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto mt-4 rounded-full" />
          </motion.div>

          {/* About Text */}
          <motion.div
            variants={itemVariants}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Hi! I&apos;m <span className="font-medium text-zinc-900 dark:text-white">Tooba</span>, 
              a second-year Software Engineering student at Ontario Tech University with a passion 
              for creating meaningful digital experiences. I enjoy diving into new technologies, 
              solving challenging problems, and turning ideas into reality through code.
            </p>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed mt-4">
              When I&apos;m not coding, you can find me exploring new tech trends, working on 
              personal projects, or collaborating with fellow students on innovative solutions. 
              I believe in continuous learning and always strive to improve my skills.
            </p>
          </motion.div>

          {/* Highlight Cards */}
          <motion.div
            variants={containerVariants}
            className="grid md:grid-cols-3 gap-6"
          >
            {highlights.map((item) => {
              const colors = getColorClasses(item.color)
              return (
                <motion.div
                  key={item.title}
                  variants={itemVariants}
                  className={`group p-6 rounded-2xl bg-white dark:bg-zinc-900 border ${colors.border} card-hover`}
                >
                  <div
                    className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <item.icon className={`w-6 h-6 ${colors.text}`} />
                  </div>
                  <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              )
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

