import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Search, Bell, Menu, ChevronDown, LogOut,
  User, Settings, CheckCircle2, MessageSquare, Shield,
} from 'lucide-react';
import { cn } from '@/utils/cn';
import { useAuthStore } from '@/store/authStore';
import { useUIStore } from '@/store/uiStore';
import ThemeToggle from './ThemeToggle';

export default function TopBar() {
  const { user, logout } = useAuthStore();
  const { toggleSidebar } = useUIStore();
  const navigate = useNavigate();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-gray-200 dark:border-dark-400 bg-white/80 dark:bg-dark/80 backdrop-blur-xl px-4 sm:px-6">
      <div className="flex items-center gap-3 flex-1">
        <button className="lg:hidden p-2 rounded-lg text-gray-500 dark:text-muted hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-dark-200 transition-colors" onClick={toggleSidebar}>
          <Menu className="h-5 w-5" />
        </button>

        {/* Clickable logo — links back to landing page */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600">
            <Shield className="h-4 w-4 text-white" />
          </div>
          <span className="font-display text-lg font-bold text-gray-900 dark:text-white hidden sm:block">
            Tether<span className="text-brand-600 dark:text-brand-400">NG</span>
          </span>
        </Link>

        <div className={cn(
          'hidden sm:flex items-center gap-2 rounded-xl border px-3 py-2 transition-all duration-200 flex-1 max-w-md ml-4',
          searchFocused
            ? 'border-brand-500 bg-white dark:bg-dark-50 shadow-glow-brand'
            : 'border-gray-200 dark:border-dark-400 bg-gray-50 dark:bg-dark-50',
        )}>
          <Search className="h-4 w-4 text-muted shrink-0" />
          <input type="text" placeholder="Search properties, agents..." className="w-full bg-transparent text-sm text-gray-900 dark:text-white placeholder:text-muted outline-none" onFocus={() => setSearchFocused(true)} onBlur={() => setSearchFocused(false)} />
        </div>
      </div>

      <div className="flex items-center gap-1 sm:gap-2">
        <ThemeToggle className="hidden sm:flex" />

        <button onClick={() => navigate('/dashboard/messages')} className="relative p-2 rounded-lg text-gray-500 dark:text-muted hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-dark-200 transition-colors">
          <MessageSquare className="h-5 w-5" />
          <span className="absolute top-1 right-1 flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" /><span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" /></span>
        </button>

        <button onClick={() => navigate('/dashboard/notifications')} className="relative p-2 rounded-lg text-gray-500 dark:text-muted hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-dark-200 transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute top-0.5 right-0.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-amber-500 dark:bg-gold-400 px-1 text-[9px] font-bold text-white">5</span>
        </button>

        <div className="relative ml-1">
          <button onClick={() => setUserMenuOpen(!userMenuOpen)} className="flex items-center gap-2 rounded-xl px-2 py-1.5 hover:bg-gray-100 dark:hover:bg-dark-200 transition-colors">
            <div className="relative">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-100 dark:bg-brand-500/20 text-xs font-bold text-brand-700 dark:text-brand-400">
                {user?.firstName?.[0]}{user?.lastName?.[0]}
              </div>
              {user?.isVerified && (
                <div className="absolute -bottom-0.5 -right-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-green-500 dark:bg-success border-2 border-white dark:border-dark">
                  <CheckCircle2 className="h-2 w-2 text-white" />
                </div>
              )}
            </div>
            <span className="hidden md:block text-sm font-medium text-gray-900 dark:text-white">{user?.firstName}</span>
            <ChevronDown className={cn('hidden md:block h-4 w-4 text-muted transition-transform', userMenuOpen && 'rotate-180')} />
          </button>

          {userMenuOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />
              <div className="absolute right-0 top-full mt-2 z-50 w-56 rounded-xl border border-gray-200 dark:border-dark-400 bg-white dark:bg-dark-100 shadow-card-hover py-2 animate-slide-up">
                <div className="px-4 py-2.5 border-b border-gray-100 dark:border-dark-400/50">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{user?.firstName} {user?.lastName}</p>
                  <p className="text-xs text-muted">{user?.email}</p>
                  <div className="mt-1.5 flex items-center gap-1.5">
                    <span className={cn('rounded-md px-2 py-0.5 text-[10px] font-bold uppercase', user?.isVerified ? 'bg-green-50 dark:bg-success/15 text-green-700 dark:text-success' : 'bg-gray-100 dark:bg-dark-300/50 text-muted')}>
                      {user?.isVerified ? '✓ Verified' : 'Unverified'}
                    </span>
                    <span className="rounded-md bg-gray-100 dark:bg-dark-300/50 px-2 py-0.5 text-[10px] font-bold text-muted uppercase">{user?.role}</span>
                  </div>
                </div>
                <div className="py-1">
                  <button onClick={() => { setUserMenuOpen(false); navigate('/dashboard/settings'); }} className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-gray-600 dark:text-muted hover:bg-gray-50 dark:hover:bg-dark-200 hover:text-gray-900 dark:hover:text-white transition-colors">
                    <User className="h-4 w-4" /> Profile
                  </button>
                  <button onClick={() => { setUserMenuOpen(false); navigate('/dashboard/settings'); }} className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-gray-600 dark:text-muted hover:bg-gray-50 dark:hover:bg-dark-200 hover:text-gray-900 dark:hover:text-white transition-colors">
                    <Settings className="h-4 w-4" /> Settings
                  </button>
                  {!user?.isVerified && (
                    <button onClick={() => { setUserMenuOpen(false); navigate('/dashboard/verification'); }} className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-brand-600 dark:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-500/10 transition-colors">
                      <CheckCircle2 className="h-4 w-4" /> Get Verified
                    </button>
                  )}
                </div>
                <div className="border-t border-gray-100 dark:border-dark-400/50 pt-1">
                  <button onClick={handleLogout} className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-red-600 dark:text-danger hover:bg-red-50 dark:hover:bg-danger/10 transition-colors">
                    <LogOut className="h-4 w-4" /> Sign Out
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
