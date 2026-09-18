import { Link, Outlet } from 'react-router-dom'
import { ThemeToggle } from '@/components/ThemeToggle'

export function RootLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans antialiased transition-colors duration-300">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between mx-auto px-4 md:px-8">
          <div className="flex gap-6 md:gap-10">
            <Link to="/" className="flex items-center space-x-2">
              <span className="inline-block font-bold">SIBAM DASH</span>
            </Link>
            <nav className="flex items-center gap-6 text-sm font-medium">
              <Link to="/work" className="transition-colors hover:text-foreground/80">Work</Link>
              <Link to="/lab" className="transition-colors hover:text-foreground/80">Lab</Link>
              <Link to="/about" className="transition-colors hover:text-foreground/80">About</Link>
              <Link to="/resume" className="transition-colors hover:text-foreground/80">Resume</Link>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <nav className="flex items-center space-x-2">
              <a href="https://github.com/SibamDash" target="_blank" rel="noreferrer" className="text-sm font-medium transition-colors hover:text-foreground/80 hidden sm:inline-block">GitHub</a>
              <a href="https://linkedin.com/in/SibamDash" target="_blank" rel="noreferrer" className="text-sm font-medium transition-colors hover:text-foreground/80 hidden sm:inline-block">LinkedIn</a>
              <ThemeToggle />
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row mx-auto px-4 md:px-8 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Sibam Dash. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
