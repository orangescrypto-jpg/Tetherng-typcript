import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, Shield, ArrowRight, Loader2 } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import type { User, UserRole } from '@/types';

const loginSchema = z.object({
  email: z.string().email('Enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

/* ─── Dummy users for demo ─── */
const DEMO_USERS: Record<string, { password: string; user: User }> = {
  'tenant@tether.ng': {
    password: 'password',
    user: {
      id: 'u1',
      email: 'tenant@tether.ng',
      firstName: 'Chidi',
      lastName: 'Okonkwo',
      phone: '08012345678',
      role: 'tenant',
      isVerified: false,
      verificationStatus: 'none',
      createdAt: '2024-01-15',
    },
  },
  'agent@tether.ng': {
    password: 'password',
    user: {
      id: 'u2',
      email: 'agent@tether.ng',
      firstName: 'Adebayo',
      lastName: 'Ogundimu',
      phone: '08098765432',
      role: 'agent',
      isVerified: false,
      verificationStatus: 'none',
      subscriptionPlan: 'free',
      createdAt: '2024-02-10',
    },
  },
  'premium@tether.ng': {
    password: 'password',
    user: {
      id: 'u3',
      email: 'premium@tether.ng',
      firstName: 'Funke',
      lastName: 'Adesanya',
      phone: '08055512345',
      role: 'agent',
      isVerified: true,
      verificationStatus: 'approved',
      subscriptionPlan: 'pro',
      subscriptionExpiry: '2025-03-10',
      createdAt: '2024-01-05',
    },
  },
};

export default function LoginPage() {
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    setError('');

    // Simulate API call
    await new Promise((r) => setTimeout(r, 1200));

    const demo = DEMO_USERS[data.email.toLowerCase()];
    if (demo && demo.password === data.password) {
      setAuth(demo.user, 'demo-token-' + demo.user.id);
      navigate('/dashboard');
    } else {
      setError('Invalid email or password. Try a demo account below.');
    }

    setLoading(false);
  };

  const quickLogin = (email: string) => {
    setAuth(DEMO_USERS[email].user, 'demo-token-' + DEMO_USERS[email].user.id);
    navigate('/dashboard');
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-white sm:text-3xl">Welcome back</h1>
        <p className="mt-2 text-sm text-muted">
          Sign in to access your dashboard and listings.
        </p>
      </div>

      {/* Error alert */}
      {error && (
        <div className="mb-6 rounded-xl border border-danger/20 bg-danger/5 px-4 py-3 text-sm text-danger">
          {error}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-white">Email Address</label>
          <input
            type="email"
            placeholder="you@example.com"
            className={cn(
              'input-field',
              errors.email && 'border-danger focus:border-danger focus:ring-danger/50',
            )}
            {...register('email')}
          />
          {errors.email && (
            <p className="mt-1.5 text-xs text-danger">{errors.email.message}</p>
          )}
        </div>

        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <label className="text-sm font-medium text-white">Password</label>
            <Link to="/forgot-password" className="text-xs font-medium text-brand-400 hover:text-brand-300 transition-colors">
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              className={cn(
                'input-field pr-11',
                errors.password && 'border-danger focus:border-danger focus:ring-danger/50',
              )}
              {...register('password')}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 right-3 -translate-y-1/2 p-1 text-muted hover:text-white transition-colors"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1.5 text-xs text-danger">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full py-3 text-base"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Signing in...
            </>
          ) : (
            <>
              Sign In
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </form>

      {/* Divider */}
      <div className="my-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-surface-300" />
        <span className="text-xs text-muted">or continue with</span>
        <div className="h-px flex-1 bg-surface-300" />
      </div>

      {/* Social login placeholders */}
      <div className="grid grid-cols-2 gap-3">
        <button className="btn-outline py-2.5 text-sm">
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Google
        </button>
        <button className="btn-outline py-2.5 text-sm">
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
          </svg>
          Apple
        </button>
      </div>

      {/* Demo accounts */}
      <div className="mt-8 rounded-xl border border-surface-300 bg-surface-100/50 p-4">
        <div className="flex items-center gap-2 mb-3">
          <Shield className="h-4 w-4 text-brand-400" />
          <span className="text-xs font-bold text-brand-400 uppercase tracking-wide">Demo Accounts</span>
        </div>
        <div className="space-y-2">
          {[
            { email: 'tenant@tether.ng', label: 'Tenant', desc: 'Standard tenant view' },
            { email: 'agent@tether.ng', label: 'Agent (Free)', desc: 'Free plan — sees upsells' },
            { email: 'premium@tether.ng', label: 'Agent (Pro)', desc: 'Pro plan + verified' },
          ].map((demo) => (
            <button
              key={demo.email}
              onClick={() => quickLogin(demo.email)}
              className="flex w-full items-center justify-between rounded-lg bg-surface-200/50 border border-surface-300/30 px-3 py-2.5 text-left transition-all hover:border-brand-500/30 hover:bg-brand-500/5"
            >
              <div>
                <span className="text-xs font-semibold text-white">{demo.label}</span>
                <p className="text-[10px] text-muted">{demo.desc}</p>
              </div>
              <span className="text-[10px] text-muted font-mono">{demo.email}</span>
            </button>
          ))}
          <p className="text-[10px] text-muted mt-2">Password for all: <span className="font-mono text-white/60">password</span></p>
        </div>
      </div>

      {/* Sign up link */}
      <p className="mt-6 text-center text-sm text-muted">
        Don't have an account?{' '}
        <Link to="/signup" className="font-semibold text-brand-400 hover:text-brand-300 transition-colors">
          Create one free
        </Link>
      </p>
    </div>
  );
}

/* Need cn import */
import { cn } from '@/utils/cn';
