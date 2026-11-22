import { Code2, Globe, Wrench, Layers, type LucideIcon } from 'lucide-react'

interface SkillCategory {
  name: string
  icon: LucideIcon
  skills: string[]
}

// Mirrors the "Technical Skills" section of resume.pdf. Languages stay first.
export const skillCategories: SkillCategory[] = [
  {
    name: 'Languages',
    icon: Code2,
    skills: ['Python', 'Java', 'JavaScript', 'TypeScript', 'SQL', 'C++', 'PHP'],
  },
  {
    name: 'Frameworks and Libraries',
    icon: Layers,
    skills: ['React', 'React Native', 'Next.js', 'Node.js', 'Express', 'Flask', 'pandas', 'Chart.js', 'Tailwind CSS', 'Jest'],
  },
  {
    name: 'Databases and Web',
    icon: Globe,
    skills: ['PostgreSQL', 'MySQL', 'Supabase', 'HTML', 'CSS', 'WordPress'],
  },
  {
    name: 'Developer Tools',
    icon: Wrench,
    skills: ['Git', 'GitHub', 'GitHub Actions', 'VS Code', 'Figma', 'Expo', 'Vercel', 'Notion'],
  },
]
