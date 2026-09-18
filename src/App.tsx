import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ThemeProvider } from './components/theme-provider';
import { AuthProvider } from './contexts/AuthContext';
import { RootLayout } from './layouts/RootLayout';
import { Home } from './pages/Home';
import { Work } from './pages/Work';
import { ProjectDetail } from './pages/ProjectDetail';
import AdminLogin from './pages/AdminLogin';
import { ProtectedRoute } from './components/ProtectedRoute';
import AdminLayout from './layouts/AdminLayout';
import AdminProjects from './pages/AdminProjects';
import AdminProjectNew from './pages/AdminProjectNew';
import { Navigate } from 'react-router-dom';

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="system" storageKey="portfolio-theme">
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route element={<RootLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/work" element={<Work />} />
                <Route path="/work/:slug" element={<ProjectDetail />} />
                <Route path="/lab" element={<div className="container mx-auto px-4 md:px-8 py-16">Lab</div>} />
                <Route path="/about" element={<div className="container mx-auto px-4 md:px-8 py-16">About</div>} />
                <Route path="/contact" element={<div className="container mx-auto px-4 md:px-8 py-16">Contact</div>} />
                <Route path="/resume" element={<div className="container mx-auto px-4 md:px-8 py-16">Resume</div>} />
              </Route>
              
              {/* Admin Auth Route */}
              <Route path="/admin/login" element={<AdminLogin />} />

              {/* Protected Admin Routes */}
              <Route element={<ProtectedRoute />}>
                <Route element={<AdminLayout />}>
                  <Route path="/admin" element={<Navigate to="/admin/projects" replace />} />
                  <Route path="/admin/projects" element={<AdminProjects />} />
                  <Route path="/admin/projects/new" element={<AdminProjectNew />} />
                  <Route path="/admin/settings" element={<div className="p-8 text-zinc-100">Settings Coming Soon</div>} />
                </Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
