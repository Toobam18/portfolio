import type { Metadata } from 'next'
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
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '500', '600', '700'],
})

const dancingScript = Dancing_Script({
  subsets: ['latin'],
  variable: '--font-script',
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'Tooba Malik — Portfolio',
  description: 'Aspiring Software Engineer | 2nd-year Software Engineering student at Ontario Tech University. Actively seeking 2026 co-op opportunities.',
  keywords: ['Software Engineering', 'Portfolio', 'Web Development', 'Ontario Tech University', 'Tooba Malik', 'Co-op'],
  authors: [{ name: 'Tooba Malik' }],
  openGraph: {
    title: 'Tooba Malik — Portfolio',
    description: 'Aspiring Software Engineer | 2nd-year Software Engineering student at Ontario Tech University',
    type: 'website',
  },
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
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
