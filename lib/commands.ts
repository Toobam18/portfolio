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
  type LucideIcon,
} from 'lucide-react'

export interface CommandItem {
  id: string
  name: string
  description?: string
  icon: LucideIcon
  href?: string
  action?: () => void
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
    description: 'View my experience & leadership',
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
    action: () => {
      const isDark = document.documentElement.classList.contains('dark')
      document.documentElement.classList.toggle('dark', !isDark)
      localStorage.setItem('theme', isDark ? 'light' : 'dark')
    },
    keywords: ['theme', 'dark', 'light', 'mode', 'toggle'],
  },

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
    href: 'https://www.linkedin.com/in/tooba-malik-46369825a',
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

