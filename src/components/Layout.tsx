import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore, useDataStore } from '../store';
import { Home, BookOpen, Code2, Target, FolderOpen, BarChart3, Trophy, Settings, Shield, LogOut, Menu, X, Bell, User, ChevronDown, Sparkles, Eye } from 'lucide-react';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const { notifications } = useDataStore();
  const location = useLocation();
  const navigate = useNavigate();

  const unreadCount = notifications.filter(n => !n.read).length;
  const isAdmin = user?.role === 'admin';

  const navItems = [
    { path: '/dashboard', icon: Home, label: 'Dashboard' },
    { path: '/learn', icon: BookOpen, label: 'Learn' },
    { path: '/playground', icon: Code2, label: 'Playground' },
    { path: '/visualizers', icon: Eye, label: 'Visualizers' },
    { path: '/challenges', icon: Target, label: 'Challenges' },
    { path: '/projects', icon: FolderOpen, label: 'Projects' },
    { path: '/progress', icon: BarChart3, label: 'Progress' },
    { path: '/achievements', icon: Trophy, label: 'Achievements' },
    { path: '/leaderboard', icon: Trophy, label: 'Leaderboard' },
    { path: '/settings/profile', icon: Settings, label: 'Settings' },
  ];

  if (isAdmin) {
    navItems.push({ path: '/admin', icon: Shield, label: 'Admin' });
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 bg-surface border-b border-border">
        <div className="flex items-center justify-between h-14 px-4">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-lg hover:bg-card transition-colors lg:block hidden">
              <Menu className="w-5 h-5 text-text-muted" />
            </button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 rounded-lg hover:bg-card transition-colors lg:hidden">
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-lg hidden sm:block">CSS Visual</span>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Link to="/playground" className="px-3 py-1.5 text-sm text-text-muted hover:text-text-primary transition-colors hidden md:block">
              Playground
            </Link>
            <Link to="/pricing" className="px-3 py-1.5 text-sm text-text-muted hover:text-text-primary transition-colors hidden md:block">
              Pricing
            </Link>
            
            <button className="relative p-2 rounded-lg hover:bg-card transition-colors">
              <Bell className="w-5 h-5 text-text-muted" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-accent rounded-full text-[10px] flex items-center justify-center text-white font-bold">
                  {unreadCount}
                </span>
              )}
            </button>

            <div className="relative">
              <button onClick={() => setUserMenuOpen(!userMenuOpen)} className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-card transition-colors">
                <div className="w-7 h-7 rounded-full bg-accent/20 flex items-center justify-center">
                  <User className="w-4 h-4 text-accent" />
                </div>
                <span className="text-sm hidden sm:block">{user?.name}</span>
                <ChevronDown className="w-3 h-3 text-text-muted hidden sm:block" />
              </button>
              {userMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-card border border-border rounded-xl shadow-xl py-2 animate-fade-in">
                  <div className="px-4 py-2 border-b border-border">
                    <p className="text-sm font-medium">{user?.name}</p>
                    <p className="text-xs text-text-muted">{user?.email}</p>
                    <span className={`inline-block mt-1 px-2 py-0.5 text-xs rounded-full ${user?.plan === 'pro' ? 'bg-pro/20 text-pro' : 'bg-card-elevated text-text-muted'}`}>
                      {user?.plan === 'pro' ? 'Pro' : 'Free'}
                    </span>
                  </div>
                  <Link to="/settings/profile" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-card-elevated transition-colors">
                    <Settings className="w-4 h-4 text-text-muted" /> Settings
                  </Link>
                  {isAdmin && (
                    <Link to="/admin" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-card-elevated transition-colors">
                      <Shield className="w-4 h-4 text-text-muted" /> Admin Panel
                    </Link>
                  )}
                  <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-card-elevated transition-colors w-full text-left text-error">
                    <LogOut className="w-4 h-4" /> Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className={`${sidebarOpen ? 'w-56' : 'w-0 lg:w-16'} ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} fixed lg:sticky top-14 left-0 h-[calc(100vh-3.5rem)] bg-surface border-r border-border transition-all duration-300 z-40 overflow-hidden`}>
          <nav className="p-3 space-y-1">
            {navItems.map(item => {
              const isActive = location.pathname === item.path || (item.path !== '/dashboard' && location.pathname.startsWith(item.path));
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${isActive ? 'bg-accent/10 text-accent' : 'text-text-muted hover:bg-card hover:text-text-primary'}`}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  <span className={`${!sidebarOpen && 'lg:hidden'} whitespace-nowrap`}>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Mobile overlay */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setMobileMenuOpen(false)} />
        )}

        {/* Main Content */}
        <main className="flex-1 min-h-[calc(100vh-3.5rem)] overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
