import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display, Dancing_Script } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CustomCursor from '@/components/CustomCursor'
import CommandPalette from '@/components/CommandPalette'
import TabTitle from '@/components/TabTitle'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['600'],
  display: 'swap',
  preload: false,
})

const dancingScript = Dancing_Script({
  subsets: ['latin'],
  variable: '--font-script',
  weight: ['600'],
  display: 'swap',
  preload: false,
})

const SITE_URL = 'https://toobamalik.vercel.app'
const DESCRIPTION =
  'Tooba Malik, third-year Software Engineering (Co-op) student at Ontario Tech University. Full-stack and AI projects with measured results. Open to Winter and Summer 2027 co-ops.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Tooba Malik | Software Engineering Student',
    template: '%s | Tooba Malik',
  },
  description: DESCRIPTION,
  keywords: ['Tooba Malik', 'Software Engineering', 'Ontario Tech University', 'Co-op', 'Portfolio', 'Full-Stack', 'Python', 'React', 'PostgreSQL', 'AI'],
  authors: [{ name: 'Tooba Malik', url: SITE_URL }],
  creator: 'Tooba Malik',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: 'Tooba Malik',
    title: 'Tooba Malik | Software Engineering Student',
    description: DESCRIPTION,
    locale: 'en_CA',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tooba Malik | Software Engineering Student',
    description: DESCRIPTION,
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fafafa' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} ${dancingScript.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          <CustomCursor />
          <CommandPalette />
          <TabTitle />
          <Navbar />
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[200] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-white focus:text-zinc-900 focus:shadow-lg"
          >
            Skip to content
          </a>
          <main id="main" className="min-h-screen">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
