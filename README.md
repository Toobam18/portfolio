# Tooba Malik — Personal Portfolio

A modern, interactive portfolio website built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.

![Portfolio Preview](./public/images/preview.png)

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Install dependencies:**

```bash
npm install
```

2. **Run the development server:**

```bash
npm run dev
```

3. **Open your browser:**

Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
portfolio/
├── app/
│   ├── layout.tsx      # Root layout with providers
│   ├── page.tsx        # Main page component
│   └── globals.css     # Global styles & custom font
├── components/
│   ├── Navbar.tsx      # Sticky navigation
│   ├── Hero.tsx        # Hero section
│   ├── About.tsx       # About section
│   ├── Projects.tsx    # Projects section
│   ├── ProjectCard.tsx # Individual project card
│   ├── Skills.tsx      # Skills section
│   ├── SkillsChart.tsx # Recharts visualization
│   ├── Experience.tsx  # Experience timeline
│   ├── Resume.tsx      # Resume viewer
│   ├── Contact.tsx     # Contact form
│   ├── Footer.tsx      # Footer component
│   ├── CustomCursor.tsx    # Custom cursor effect
│   ├── CommandPalette.tsx  # Ctrl+K command palette
│   ├── TabTitle.tsx        # Tab title behavior
│   └── ThemeProvider.tsx   # Theme context provider
├── lib/
│   ├── sections.ts     # Navigation sections
│   ├── commands.ts     # Command palette commands
│   ├── projectsData.ts # ⭐ Edit your projects here
│   ├── skillsData.ts   # ⭐ Edit your skills here
│   ├── experienceData.ts # ⭐ Edit your experience here
│   └── utils.ts        # Utility functions
└── public/
    ├── fonts/          # Add AutumnInNovember.ttf here
    ├── images/         # Add project images here
    └── resume.pdf      # Add your resume here
```

## ✏️ Customization Guide

### Adding Your Resume

1. Place your resume PDF in `/public/resume.pdf`
2. The portfolio will automatically display and enable downloads

### Adding the Custom Font

1. Download or locate `AutumnInNovember.ttf` (or `.otf`)
2. Place it in `/public/fonts/AutumnInNovember.ttf`
3. The hero name will automatically use this font

### Updating Projects

Edit `/lib/projectsData.ts`:

```typescript
export const projects: Project[] = [
  {
    id: 'unique-id',
    title: 'Project Title',
    description: 'Short description',
    image: '/images/project-image.png', // Optional
    techStack: ['Tech1', 'Tech2'],
    categories: ['web', 'school', 'tools'], // For filtering
    keyPoints: [
      'Feature 1',
      'What you learned',
      'Impact',
    ],
    additionalDetails: 'Longer description shown on expand',
    githubUrl: 'https://github.com/...',
    liveUrl: 'https://...', // Optional
  },
]
```

### Updating Skills

Edit `/lib/skillsData.ts`:

```typescript
export const skillCategories = [
  {
    name: 'Frontend',
    icon: Code2,
    skills: ['HTML', 'CSS', 'JavaScript', 'React'],
    bgColor: 'bg-blue-100 dark:bg-blue-900/30',
    textColor: 'text-blue-600 dark:text-blue-400',
  },
  // Add more categories...
]

export const currentlyLearning = ['Next.js', 'TypeScript', ...]

export const skillChartData = [
  { skill: 'JavaScript', level: 80 },
  // Add more skills for the chart...
]
```

### Updating Experience

Edit `/lib/experienceData.ts`:

```typescript
export const experiences: Experience[] = [
  {
    id: 'exp-1',
    role: 'Your Role',
    organization: 'Organization Name',
    date: 'Start — End',
    location: 'Location', // Optional
    type: 'experience', // or 'leadership'
    points: [
      'Achievement 1',
      'Achievement 2',
    ],
    skills: ['Skill1', 'Skill2'], // Optional
  },
]
```

### Setting Up Contact Form

1. Go to [Formspree](https://formspree.io/) and create a free account
2. Create a new form and copy your form ID
3. Replace `YOUR_FORM_ID` in `/components/Contact.tsx`:

```typescript
const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
```

### Adding Project Images

1. Add images to `/public/images/`
2. Reference them in `projectsData.ts`:

```typescript
image: '/images/your-image.png',
```

Recommended size: 800x450px (16:9 aspect ratio)

## 🎨 Features

- **Dark/Light Mode**: System preference detection with manual toggle
- **Custom Cursor**: Animated cursor (disabled on touch devices)
- **Command Palette**: Press `Ctrl + K` to open
- **Tab Title**: Changes when you leave the page
- **Smooth Scrolling**: Active section highlighting
- **Animations**: Framer Motion reveal on scroll
- **Skills Chart**: Recharts radar/bar visualization
- **Contact Form**: Formspree integration
- **Fully Responsive**: Mobile-first design

## 🌐 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Deploy with one click

### Other Platforms

```bash
# Build for production
npm run build

# Start production server
npm start
```

## 📝 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Theme**: next-themes
- **Icons**: Lucide React

## 📧 Contact

- **Email**: tooba.malik@ontariotechu.net
- **GitHub**: [Toobam18](https://github.com/Toobam18)
- **LinkedIn**: [Tooba Malik](https://www.linkedin.com/in/tooba-malik-46369825a)
- **Linktree**: [ToobaM18](https://linktr.ee/ToobaM18)

---

Built with ❤️ by Tooba Malik

