import Hero from '@/components/Hero'
import About from '@/components/About'
import Education from '@/components/Education'
import Projects from '@/components/Projects'
import Skills from '@/components/Skills'
import Experience from '@/components/Experience'
import Resume from '@/components/Resume'
import Contact from '@/components/Contact'

export default function Home() {
  return (
    <div className="mesh-gradient">
      <Hero />
      <About />
      <Education />
      <Projects />
      <Skills />
      <Experience />
      <Resume />
      <Contact />
    </div>
  )
}

