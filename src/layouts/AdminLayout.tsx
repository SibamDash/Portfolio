import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LayoutDashboard, LogOut, Settings } from 'lucide-react';

export default function AdminLayout() {
  const { logout } = useAuth();
  const location = useLocation();

  const navItems = [
    { name: 'Projects', path: '/admin/projects', icon: LayoutDashboard },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="flex min-h-screen bg-zinc-950 text-zinc-50">
      {/* Sidebar */}
      <aside className="w-64 border-r border-zinc-900 bg-zinc-950/50 flex flex-col">
        <div className="p-6">
          <Link to="/admin" className="text-lg font-semibold tracking-tight text-zinc-100">
            Portfolio Admin
          </Link>
        </div>
        
        <nav className="flex-1 space-y-1 px-4">
          {navItems.map((item) => {
            const isActive = location.pathname.startsWith(item.path);
            const Icon = item.icon;
            
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                  isActive 
                    ? 'bg-zinc-900 text-zinc-100 font-medium' 
                    : 'text-zinc-400 hover:bg-zinc-900/50 hover:text-zinc-200'
                }`}
              >
                <Icon size={18} className={isActive ? 'text-zinc-100' : 'text-zinc-500'} />
                {item.name}
              </Link>
            );
          })}
        </nav>
        
        <div className="p-4 mt-auto">
          <button
            onClick={logout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-zinc-400 hover:bg-zinc-900/50 hover:text-zinc-200 transition-colors"
          >
            <LogOut size={18} className="text-zinc-500" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-0 overflow-auto bg-zinc-950">
        <Outlet />
      </main>
    </div>
  );
}
