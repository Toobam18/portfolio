// Wrap the RESULT part of a bullet in **double asterisks** to emphasize it. Never emphasize tool names.

export type Experience = {
  id: string
  role: string
  organization: string
  date: string
  location?: string
  /** 'tech' roles form the main timeline; 'community' roles go in Leadership and Community */
  group: 'tech' | 'community'
  points: string[]
  skills?: string[]
  /** Optional proof stat shown in the hero */
  heroStat?: string
}

export const experiences: Experience[] = [
  {
    id: 'exp-mtm',
    role: 'Software Developer Intern',
    organization: 'Meet the Motivators',
    date: 'Jul 2026 to Present',
    location: 'Remote',
    group: 'tech',
    points: [
      'Built 6 cross-platform screens for iOS and Android with React Native, Expo and Supabase using reusable components, **cutting duplicate UI code by 40%** and shipping both platforms from one codebase.',
      'Designed interactive Figma prototypes and validated user flows with stakeholders before development, **reducing post-build revision requests by 30%**.',
      'Redesigned the organization’s WordPress pages by restructuring layouts and content hierarchy, **increasing user engagement by 50%**.',
    ],
    skills: ['React Native', 'Expo', 'Supabase', 'Figma', 'WordPress', 'GitHub'],
    heroStat: '**6** cross-platform screens shipped',
  },
  {
    id: 'exp-robotics',
    role: 'Web Developer',
    organization: 'Ontario Tech Robotics Club (ARC Competition)',
    date: 'Oct 2025 to Present',
    location: 'Oshawa, ON',
    group: 'tech',
    points: [
      'Developed and maintained responsive competition and event pages using mobile-first layouts, **increasing site traffic by 35%** during competition season.',
      'Streamlined site navigation through iterative frontend updates reviewed via GitHub pull requests, **cutting time to find competition information by 50%**.',
    ],
    skills: ['JavaScript', 'HTML', 'CSS', 'Git', 'GitHub'],
  },
  {
    id: 'exp-marketing',
    role: 'Digital Marketing Intern',
    organization: 'Counselling for the Health of It',
    date: 'Mar 2026 to May 2026',
    location: 'Remote',
    group: 'tech',
    points: [
      'Created SEO-optimized LinkedIn and Google Business Profile content, **increasing the client’s profile views by 35% in 3 months**.',
      'Analyzed engagement metrics and keyword research to deliver data-driven content recommendations, **raising post engagement by 20%**.',
    ],
    skills: ['SEO', 'Analytics', 'Content Strategy'],
  },
  {
    id: 'exp-tutor',
    role: 'Private Tutor',
    organization: 'Self-Employed',
    date: 'Jan 2025 to Present',
    location: 'Durham Region',
    group: 'community',
    points: [
      'Taught Grade 11 chemistry and physics, Advanced Functions and Calculus through personalized one-on-one lessons, **improving students’ test scores and confidence**.',
      'Explained complex technical concepts in simple terms with visual aids and practice problems, a skill I now use when presenting software to stakeholders.',
    ],
    skills: ['Communication', 'Mentorship', 'STEM Teaching'],
  },
]

export const techExperiences = experiences.filter((e) => e.group === 'tech')
export const communityExperiences = experiences.filter((e) => e.group === 'community')
