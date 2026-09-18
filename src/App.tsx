import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ErrorBoundary } from './components/ErrorBoundary'
import { ThemeProvider } from './components/theme-provider'
import { RootLayout } from './layouts/RootLayout'
import { Home } from './pages/Home'

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="system" storageKey="portfolio-theme">
        <BrowserRouter>
          <Routes>
            <Route element={<RootLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/work" element={<div className="container mx-auto px-4 md:px-8 py-16">Work</div>} />
              <Route path="/work/:slug" element={<div className="container mx-auto px-4 md:px-8 py-16">Project Detail</div>} />
              <Route path="/lab" element={<div className="container mx-auto px-4 md:px-8 py-16">Lab</div>} />
              <Route path="/about" element={<div className="container mx-auto px-4 md:px-8 py-16">About</div>} />
              <Route path="/contact" element={<div className="container mx-auto px-4 md:px-8 py-16">Contact</div>} />
              <Route path="/resume" element={<div className="container mx-auto px-4 md:px-8 py-16">Resume</div>} />
            </Route>
            
            {/* Admin routes (without RootLayout) */}
            <Route path="/admin" element={<div>Admin Dashboard</div>} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </ErrorBoundary>
  )
}

export default App
