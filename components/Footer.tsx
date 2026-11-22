import Link from 'next/link'
import { Github, Linkedin, ExternalLink } from 'lucide-react'

const socials = [
  { href: 'https://www.linkedin.com/in/tooba-malik186', label: 'LinkedIn', icon: Linkedin },
  { href: 'https://github.com/Toobam18', label: 'GitHub', icon: Github },
  { href: 'https://linktr.ee/ToobaM18', label: 'Linktree', icon: ExternalLink },
]

export default function Footer() {
  return (
    <footer className="py-12 px-4 border-t border-zinc-200 dark:border-zinc-800">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <div>
          <Link href="/" className="text-xl font-display font-semibold text-slate-800 dark:text-white">
            Tooba Malik
          </Link>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">© {new Date().getFullYear()} Tooba Malik</p>
        </div>

        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Built with Next.js, TypeScript and Tailwind CSS.{' '}
          <a
            href="https://github.com/Toobam18/portfolio"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-zinc-900 dark:text-white underline underline-offset-4 decoration-zinc-300 dark:decoration-zinc-600 hover:decoration-current"
          >
            View source
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </p>

        <ul className="flex items-center gap-2">
          {socials.map(({ href, label, icon: Icon }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${label} (opens in a new tab)`}
                className="block p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
              >
                <Icon className="w-5 h-5" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}
