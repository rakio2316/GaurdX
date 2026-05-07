import { useState } from 'react';
import { useAuth } from './hooks/useAuth';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import UserManagement from './pages/UserManagement';
import Detections from './pages/Detections';
import Alerts from './pages/Alerts';
import DataLogs from './pages/DataLogs';
import Robots from './pages/Robots';
import LiveFeed from './pages/LiveFeed';
import { 
  Shield, 
  LayoutDashboard, 
  Users, 
  LogOut, 
  Loader2, 
  Video, 
  ShieldAlert, 
  Bell, 
  Database, 
  Bot,
  Search,
  Settings
} from 'lucide-react';
import { cn } from './lib/utils';
import { auth } from './lib/firebase';
import { signOut } from 'firebase/auth';

type Page = 'dashboard' | 'live-feed' | 'detections' | 'alerts' | 'data-logs' | 'robots' | 'users' | 'settings';

export default function App() {
  const { user, profile, loading } = useAuth();
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#090E14] text-cyan-500 font-mono">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="animate-spin w-8 h-8" />
          <span className="tracking-[0.3em] text-xs font-bold uppercase">System Initializing</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  const navItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'live-feed', icon: Video, label: 'Live Feed' },
    { id: 'detections', icon: Shield, label: 'Detections' },
    { id: 'alerts', icon: Bell, label: 'Alerts', badge: 2 },
    { id: 'data-logs', icon: Database, label: 'Data Logs' },
    { id: 'robots', icon: Bot, label: 'Robots' },
  ];

  const renderContent = () => {
    switch (currentPage) {
      case 'dashboard': return <Dashboard />;
      case 'live-feed': return <LiveFeed />;
      case 'detections': return <Detections />;
      case 'alerts': return <Alerts />;
      case 'data-logs': return <DataLogs />;
      case 'robots': return <Robots />;
      case 'users': return <UserManagement />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-[#090E14] text-[#E2E8F0] font-sans selection:bg-cyan-500/30 selection:text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0F1720] border-r border-[#1E293B] flex flex-col z-20">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 bg-cyan-500/10 rounded-lg flex items-center justify-center text-cyan-500 border border-cyan-500/20">
              <Shield className="w-6 h-6" fill="currentColor" fillOpacity={0.2} />
            </div>
            <div>
              <h1 className="font-bold text-lg tracking-tight leading-none text-white">GaurdX</h1>
              <p className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest mt-1">
                Aerial Defense
              </p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id as Page)}
              className={cn(
                "w-full flex items-center justify-between px-4 py-3 text-sm font-medium transition-all rounded-lg group",
                currentPage === item.id 
                  ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20" 
                  : "text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800/50"
              )}
            >
              <div className="flex items-center gap-3">
                <item.icon className={cn("w-4 h-4", currentPage === item.id ? "text-cyan-400" : "text-zinc-500 group-hover:text-zinc-300")} />
                {item.label}
              </div>
              {item.badge && (
                <span className="bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                  {item.badge}
                </span>
              )}
            </button>
          ))}

          {profile?.role === 'admin' && (
            <div className="pt-4 mt-4 border-t border-zinc-800/50">
              <button
                onClick={() => setCurrentPage('users')}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all rounded-lg",
                  currentPage === 'users' 
                    ? "bg-purple-500/10 text-purple-400 border border-purple-500/20" 
                    : "text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800/50"
                )}
              >
                <Users className="w-4 h-4" />
                Personnel
              </button>
            </div>
          )}
        </nav>

        <div className="p-4 mt-auto space-y-2">
          <div className="bg-[#161F2A] border border-[#1E293B] rounded-xl p-4 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-green-500">System Online</span>
              </div>
              <Settings className="w-3 h-3 text-zinc-600 hover:text-zinc-400 cursor-pointer" />
            </div>
            <p className="text-[9px] text-zinc-500 uppercase leading-none">All subsystems operational</p>
          </div>
          
          <button
            onClick={() => signOut(auth)}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-zinc-500 hover:text-red-400 hover:bg-red-900/10 transition-all rounded-lg"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden flex flex-col">
        {/* Global Header */}
        <header className="h-16 border-b border-[#1E293B] flex items-center justify-between px-8 bg-[#090E14]/80 backdrop-blur-sm z-10">
          <div className="flex items-center gap-6 text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
            <div className="flex items-center gap-2 text-green-500">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
              Connected
            </div>
            <div>19:59:47</div>
            <div>May 01, 2026</div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-600" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="bg-[#0F1720] border border-[#1E293B] rounded-full pl-9 pr-4 py-1.5 text-xs w-64 focus:outline-none focus:border-cyan-500/50 transition-all font-mono"
              />
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/20 rounded-lg text-green-500 text-[10px] font-bold uppercase tracking-widest">
              <Shield className="w-3 h-3" />
              Secure
            </div>
            <div className="relative">
              <Bell className="w-5 h-5 text-zinc-400 cursor-pointer hover:text-white transition-all" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 border-2 border-[#090E14] rounded-full" />
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-auto bg-[#090E14] p-8">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
