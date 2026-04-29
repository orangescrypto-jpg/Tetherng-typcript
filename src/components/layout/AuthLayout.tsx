import { Outlet, Navigate } from 'react-router-dom';
import { Shield } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';

export default function AuthLayout() {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="flex min-h-screen">
      {/* Left: branding panel (hidden on mobile) */}
      <div className="hidden lg:flex lg:w-[45%] relative overflow-hidden bg-surface-50 border-r border-surface-300/50">
        {/* Background effects */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-1/4 left-1/4 h-[500px] w-[500px] rounded-full bg-brand-500/8 blur-[120px]" />
          <div className="absolute bottom-1/4 right-0 h-[300px] w-[300px] rounded-full bg-gold-400/5 blur-[100px]" />
        </div>

        <div className="relative flex flex-col justify-between p-12">
          {/* Logo */}
          <div>
            <div className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <span className="font-display text-2xl font-bold text-white">
                Tether<span className="text-brand-400">NG</span>
              </span>
            </div>
          </div>

          {/* Center content */}
          <div className="max-w-sm">
            <h2 className="font-display text-3xl font-bold leading-tight text-white">
              Rent Safely.{' '}
              <span className="bg-gradient-to-r from-brand-400 to-brand-300 bg-clip-text text-transparent">
                Pay Securely.
              </span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted">
              TetherNG holds your rent in escrow until you've inspected and confirmed the property.
              No more scams, no more lost deposits.
            </p>

            {/* Trust indicators */}
            <div className="mt-10 space-y-4">
              {[
                { text: 'BVN-verified agents only', stat: '3,200+' },
                { text: 'Securely held transactions', stat: '₦8.7B+' },
                { text: 'Properties physically verified', stat: '12,400+' },
              ].map((item) => (
                <div key={item.text} className="flex items-center justify-between rounded-xl bg-surface-200/50 border border-surface-300/30 px-4 py-3">
                  <span className="text-sm text-muted">{item.text}</span>
                  <span className="text-sm font-bold text-brand-400">{item.stat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom */}
          <p className="text-xs text-muted">
            &copy; {new Date().getFullYear()} TetherNG. All rights reserved.
          </p>
        </div>
      </div>

      {/* Right: auth forms */}
      <div className="flex flex-1 items-center justify-center px-4 py-12 sm:px-6">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="mb-8 flex items-center gap-2.5 lg:hidden">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-500">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <span className="font-display text-xl font-bold text-white">
              Tether<span className="text-brand-400">NG</span>
            </span>
          </div>

          <Outlet />
        </div>
      </div>
    </div>
  );
}
