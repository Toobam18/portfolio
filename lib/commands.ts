import {
  Home,
  User,
  FolderOpen,
  Code2,
  Briefcase,
  FileText,
  Mail,
  Github,
  Linkedin,
  ExternalLink,
  Sun,
  Moon,
  Download,
  GraduationCap,
  Layers,
  type LucideIcon,
} from 'lucide-react'
import { projects, projectFullName } from './projectsData'

export interface CommandContext {
  toggleTheme: () => void
}

export interface CommandItem {
  id: string
  name: string
  description?: string
  icon: LucideIcon
  href?: string
  action?: (ctx: CommandContext) => void
  keywords?: string[]
}

export const commands: CommandItem[] = [
  // Navigation
  {
    id: 'nav-home',
    name: 'Go to Home',
    description: 'Navigate to the hero section',
    icon: Home,
    href: '#hero',
    keywords: ['home', 'top', 'start', 'hero'],
  },
  {
    id: 'nav-about',
    name: 'Go to About',
    description: 'Learn more about me',
    icon: User,
    href: '#about',
    keywords: ['about', 'me', 'bio', 'introduction'],
  },
  {
    id: 'nav-education',
    name: 'Go to Education',
    description: 'View my education and coursework',
    icon: GraduationCap,
    href: '#education',
    keywords: ['education', 'school', 'university', 'coursework', 'degree'],
  },
  {
    id: 'nav-projects',
    name: 'Go to Projects',
    description: 'View my portfolio projects',
    icon: FolderOpen,
    href: '#projects',
    keywords: ['projects', 'work', 'portfolio'],
  },
  {
    id: 'nav-skills',
    name: 'Go to Skills',
    description: 'See my technical skills',
    icon: Code2,
    href: '#skills',
    keywords: ['skills', 'tech', 'technologies', 'stack'],
  },
  {
    id: 'nav-experience',
    name: 'Go to Experience',
    description: 'View my experience and leadership',
    icon: Briefcase,
    href: '#experience',
    keywords: ['experience', 'work', 'leadership', 'timeline'],
  },
  {
    id: 'nav-resume',
    name: 'Go to Resume',
    description: 'View my resume',
    icon: FileText,
    href: '#resume',
    keywords: ['resume', 'cv', 'curriculum'],
  },
  {
    id: 'nav-contact',
    name: 'Go to Contact',
    description: 'Get in touch with me',
    icon: Mail,
    href: '#contact',
    keywords: ['contact', 'email', 'message', 'reach'],
  },

  // Actions
  {
    id: 'action-download-resume',
    name: 'Download Resume',
    description: 'Download my resume as PDF',
    icon: Download,
    action: () => {
      const link = document.createElement('a')
      link.href = '/resume.pdf'
      link.download = 'Tooba_Malik_Resume.pdf'
      link.click()
    },
    keywords: ['download', 'resume', 'pdf', 'cv'],
  },
  {
    id: 'action-toggle-theme',
    name: 'Toggle Theme',
    description: 'Switch between light and dark mode',
    icon: Sun,
    action: ({ toggleTheme }) => toggleTheme(),
    keywords: ['theme', 'dark', 'light', 'mode', 'toggle'],
  },

  // Case studies
  ...projects.map<CommandItem>((p) => ({
    id: `project-${p.id}`,
    name: `Open ${p.title} case study`,
    description: projectFullName(p),
    icon: Layers,
    href: `/projects/${p.id}`,
    keywords: ['project', 'case study', p.title.toLowerCase(), ...p.techStack.map((t) => t.toLowerCase())],
  })),

  // External Links
  {
    id: 'link-github',
    name: 'Open GitHub',
    description: 'View my GitHub profile',
    icon: Github,
    href: 'https://github.com/Toobam18',
    keywords: ['github', 'code', 'repos', 'repositories'],
  },
  {
    id: 'link-linkedin',
    name: 'Open LinkedIn',
    description: 'Connect on LinkedIn',
    icon: Linkedin,
    href: 'https://www.linkedin.com/in/tooba-malik186',
    keywords: ['linkedin', 'connect', 'professional', 'network'],
  },
  {
    id: 'link-linktree',
    name: 'Open Linktree',
    description: 'View all my links',
    icon: ExternalLink,
    href: 'https://linktr.ee/ToobaM18',
    keywords: ['linktree', 'links', 'all'],
  },
]

