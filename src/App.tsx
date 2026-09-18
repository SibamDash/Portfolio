import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ErrorBoundary } from './components/ErrorBoundary'

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<div className="p-8"><h1 className="text-2xl font-bold">Sibam Dash — Portfolio</h1></div>} />
          {/* Placeholder routes */}
          <Route path="/work" element={<div>Work</div>} />
          <Route path="/work/:slug" element={<div>Project Detail</div>} />
          <Route path="/lab" element={<div>Lab</div>} />
          <Route path="/about" element={<div>About</div>} />
          <Route path="/contact" element={<div>Contact</div>} />
          
          {/* Admin placeholder routes */}
          <Route path="/admin" element={<div>Admin Dashboard</div>} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  )
}

export default App
