import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ThemeProvider } from './components/theme-provider';
import { AuthProvider } from './contexts/AuthContext';
import { RootLayout } from './layouts/RootLayout';
import { Home } from './pages/Home';
import { Work } from './pages/Work';
import { ProjectDetail } from './pages/ProjectDetail';
import { Lab } from './pages/Lab';
import { Blog } from './pages/Blog';
import { BlogPost } from './pages/BlogPost';
import AdminLogin from './pages/AdminLogin';
import { ProtectedRoute } from './components/ProtectedRoute';
import AdminLayout from './layouts/AdminLayout';
import AdminProjects from './pages/AdminProjects';
import AdminProjectNew from './pages/AdminProjectNew';
import { AdminPosts } from './pages/AdminPosts';
import { AdminPostNew } from './pages/AdminPostNew';
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
                <Route path="/lab" element={<Lab />} />
                <Route path="/writing" element={<Blog />} />
                <Route path="/writing/:slug" element={<BlogPost />} />
                <Route path="/about" element={<div className="container mx-auto px-4 md:px-8 py-16">About (Coming Soon)</div>} />
                <Route path="/contact" element={<div className="container mx-auto px-4 md:px-8 py-16">Contact (Coming Soon)</div>} />
                <Route path="/resume" element={<div className="container mx-auto px-4 md:px-8 py-16">Resume (Coming Soon)</div>} />
              </Route>
              
              {/* Admin Auth Route */}
              <Route path="/admin/login" element={<AdminLogin />} />

              {/* Protected Admin Routes */}
              <Route element={<ProtectedRoute />}>
                <Route element={<AdminLayout />}>
                  <Route path="/admin" element={<Navigate to="/admin/projects" replace />} />
                  <Route path="/admin/projects" element={<AdminProjects />} />
                  <Route path="/admin/projects/new" element={<AdminProjectNew />} />
                  <Route path="/admin/posts" element={<AdminPosts />} />
                  <Route path="/admin/posts/new" element={<AdminPostNew />} />
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
