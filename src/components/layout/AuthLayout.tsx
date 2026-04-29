import { Outlet, Navigate } from 'react-router-dom';
import { Shield } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import ThemeToggle from './ThemeToggle';

export default function AuthLayout() {
  const { isAuthenticated } = useAuthStore();
  if (isAuthenticated) return <Navigate to="/dashboard" replace />;

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-dark">
      <div className="hidden lg:flex lg:w-[45%] relative overflow-hidden bg-white dark:bg-dark-50 border-r border-gray-200 dark:border-dark-400">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-1/4 left-1/4 h-[500px] w-[500px] rounded-full bg-brand-100/50 dark:bg-brand-500/8 blur-[120px]" />
          <div className="absolute bottom-1/4 right-0 h-[300px] w-[300px] rounded-full bg-amber-100/40 dark:bg-gold-400/5 blur-[100px]" />
        </div>
        <div className="relative flex flex-col justify-between p-12">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600"><Shield className="h-5 w-5 text-white" /></div>
              <span className="font-display text-2xl font-bold text-gray-900 dark:text-white">Tether<span className="text-brand-600 dark:text-brand-400">NG</span></span>
            </div>
            <ThemeToggle />
          </div>
          <div className="max-w-sm">
            <h2 className="font-display text-3xl font-bold leading-tight text-gray-900 dark:text-white">
              Transact Safely.{' '}
              <span className="bg-gradient-to-r from-brand-600 to-brand-500 dark:from-brand-400 dark:to-brand-300 bg-clip-text text-transparent">Pay Securely.</span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-gray-600 dark:text-muted">
              TetherNG holds your payment in escrow until you've inspected and confirmed the property. No more scams, no more lost deposits.
            </p>
            <div className="mt-10 space-y-4">
              {[
                { text: 'BVN-verified agents only', stat: '3,200+' },
                { text: 'Securely held transactions', stat: '₦8.7B+' },
                { text: 'Properties physically verified', stat: '12,400+' },
              ].map((item) => (
                <div key={item.text} className="flex items-center justify-between rounded-xl bg-gray-50 dark:bg-dark-200/50 border border-gray-200 dark:border-dark-400/30 px-4 py-3">
                  <span className="text-sm text-gray-600 dark:text-muted">{item.text}</span>
                  <span className="text-sm font-bold text-brand-600 dark:text-brand-400">{item.stat}</span>
                </div>
              ))}
            </div>
          </div>
          <p className="text-xs text-muted">&copy; {new Date().getFullYear()} TetherNG. All rights reserved.</p>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center px-4 py-12 sm:px-6">
        <div className="w-full max-w-md">
          <div className="mb-8 flex items-center justify-between lg:hidden">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600"><Shield className="h-5 w-5 text-white" /></div>
              <span className="font-display text-xl font-bold text-gray-900 dark:text-white">Tether<span className="text-brand-600 dark:text-brand-400">NG</span></span>
            </div>
            <ThemeToggle />
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
