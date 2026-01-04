export interface Project {
  id: string
  title: string
  description: string
  image?: string
  techStack: string[]
  categories: string[]
  keyPoints: string[]
  additionalDetails?: string
  githubUrl?: string
  liveUrl?: string
}

export const projects: Project[] = [
  {
    id: 'taskly',
    title: 'Taskly — Task Manager Web App',
    description:
      'A comprehensive task organization web application designed for school productivity and personal task management.',
    image: '/images/taskly-placeholder.png',
    techStack: ['PHP', 'JavaScript', 'HTML/CSS', 'MySQL'],
    categories: ['web', 'school', 'tools'],
    keyPoints: [
      'Built core features including task creation, editing, deletion, and status tracking with intuitive UI',
      'Learned full-stack development workflow, database design, and user authentication implementation',
      'Improved personal productivity by 40% through organized task management and deadline tracking',
    ],
    additionalDetails:
      'Taskly was developed as a school project to address the common problem of task disorganization among students. The application features user authentication, task categorization, priority levels, due date reminders, and a clean dashboard interface. Built with PHP backend and MySQL database, it demonstrates solid understanding of server-side programming and database management.',
    githubUrl: 'https://github.com/Toobam18/taskly',
    liveUrl: '#', // Placeholder - replace with actual demo URL
  },
  {
    id: 'finance-tracker',
    title: 'Finance Tracker — Finance Tracking App',
    description:
      'A personal finance tracking application to monitor expenses, income, and budgeting goals.',
    image: '/images/finance-placeholder.png',
    techStack: ['JavaScript', 'HTML/CSS', 'Local Storage'],
    categories: ['web', 'tools'],
    keyPoints: [
      'Implemented expense categorization, income tracking, and visual budget breakdowns with charts',
      'Gained experience with data visualization, local storage for persistence, and responsive design',
      'Enables users to track spending habits and make informed financial decisions',
    ],
    additionalDetails:
      'Finance Tracker was created to help students and young professionals manage their finances effectively. It features transaction logging, category-based expense tracking, monthly summaries, and visual charts to display spending patterns. The app uses browser local storage for data persistence, making it a lightweight solution without requiring a backend server.',
    githubUrl: 'https://github.com/Toobam18/finance-tracker',
    liveUrl: '#', // Placeholder - replace with actual demo URL
  },
]

export const filterCategories = [
  { id: 'all', label: 'All' },
  { id: 'web', label: 'Web' },
  { id: 'school', label: 'School' },
  { id: 'tools', label: 'Tools' },
]

