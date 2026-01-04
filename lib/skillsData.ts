import {
  Code2,
  Server,
  Database,
  Wrench,
  BookOpen,
  type LucideIcon,
} from 'lucide-react'

interface SkillCategory {
  name: string
  icon: LucideIcon
  skills: string[]
  bgColor: string
  textColor: string
}

export const skillCategories: SkillCategory[] = [
  {
    name: 'Frontend',
    icon: Code2,
    skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Tailwind CSS'],
    bgColor: 'bg-blue-100 dark:bg-blue-900/30',
    textColor: 'text-blue-600 dark:text-blue-400',
  },
  {
    name: 'Backend',
    icon: Server,
    skills: ['PHP', 'Node.js', 'Python', 'Java'],
    bgColor: 'bg-green-100 dark:bg-green-900/30',
    textColor: 'text-green-600 dark:text-green-400',
  },
  {
    name: 'Databases',
    icon: Database,
    skills: ['MySQL', 'MongoDB', 'SQLite'],
    bgColor: 'bg-purple-100 dark:bg-purple-900/30',
    textColor: 'text-purple-600 dark:text-purple-400',
  },
  {
    name: 'Tools',
    icon: Wrench,
    skills: ['Git', 'GitHub', 'VS Code', 'Figma', 'Postman'],
    bgColor: 'bg-orange-100 dark:bg-orange-900/30',
    textColor: 'text-orange-600 dark:text-orange-400',
  },
  {
    name: 'Fundamentals',
    icon: BookOpen,
    skills: ['Data Structures', 'Algorithms', 'OOP', 'Problem Solving'],
    bgColor: 'bg-pink-100 dark:bg-pink-900/30',
    textColor: 'text-pink-600 dark:text-pink-400',
  },
]

export const currentlyLearning = [
  'Next.js',
  'TypeScript',
  'Docker',
  'Cloud Services (AWS/Vercel)',
  'System Design',
]

export const skillChartData = [
  { skill: 'JavaScript', level: 80 },
  { skill: 'HTML/CSS', level: 85 },
  { skill: 'PHP', level: 70 },
  { skill: 'Python', level: 65 },
  { skill: 'React', level: 60 },
  { skill: 'MySQL', level: 70 },
]

