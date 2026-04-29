import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Eye, EyeOff, ArrowRight, Loader2, CheckCircle2,
  User, Building2, Home,
} from 'lucide-react';
import { cn } from '@/utils/cn';
import { useAuthStore } from '@/store/authStore';

const signupSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: z.string().email('Enter a valid email address'),
  phone: z.string().min(10, 'Enter a valid phone number'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
  role: z.enum(['tenant', 'agent', 'landlord'], { required_error: 'Select your role' }),
  agreeTerms: z.literal(true, { errorMap: () => ({ message: 'You must accept the terms' }) }),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

type SignupFormData = z.infer<typeof signupSchema>;

type SignupRole = 'tenant' | 'agent' | 'landlord';

const ROLES: { value: SignupRole; label: string; description: string; icon: React.ElementType; color: string }[] = [
  {
    value: 'tenant',
    label: 'I want to Rent',
    description: 'Looking for a property to rent or buy',
    icon: Home,
    color: 'border-brand-500 bg-brand-500/10 text-brand-400',
  },
  {
    value: 'agent',
    label: 'I\'m an Agent',
    description: 'List properties and find tenants',
    icon: User,
    color: 'border-gold-400 bg-gold-400/10 text-gold-400',
  },
  {
    value: 'landlord',
    label: 'I\'m a Landlord',
    description: 'Rent out my own properties directly',
    icon: Building2,
    color: 'border-brand-300 bg-brand-300/10 text-brand-300',
  },
];

export default function SignupPage() {
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: { role: undefined },
  });

  const selectedRole = watch('role');
  const password = watch('password');

  const handleRoleSelect = async (role: SignupRole) => {
    setValue('role', role);
    await trigger('role');
    setTimeout(() => setStep(2), 200);
  };

  const onSubmit = async (data: SignupFormData) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));

    setAuth({
      id: 'u-new-' + Date.now(),
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      role: data.role,
      isVerified: false,
      verificationStatus: 'none',
      ...(data.role !== 'tenant' ? { subscriptionPlan: 'free' as const } : {}),
      createdAt: new Date().toISOString(),
    }, 'new-token-' + Date.now());

    navigate('/dashboard');
    setLoading(false);
  };

  const passwordStrength = (() => {
    if (!password) return { level: 0, label: '', color: '' };
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 1) return { level: 1, label: 'Weak', color: 'bg-danger' };
    if (score === 2) return { level: 2, label: 'Fair', color: 'bg-gold-400' };
    if (score === 3) return { level: 3, label: 'Good', color: 'bg-brand-400' };
    return { level: 4, label: 'Strong', color: 'bg-success' };
  })();

  return (
    <div>
      {/* Progress indicator */}
      <div className="mb-8">
        <div className="flex items-center gap-2">
          <div className={cn(
            'flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all',
            step === 1 ? 'bg-brand-500 text-white' : 'bg-success text-white',
          )}>
            {step === 1 ? '1' : <CheckCircle2 className="h-4 w-4" />}
          </div>
          <div className={cn('h-0.5 flex-1 rounded-full transition-colors', step === 2 ? 'bg-brand-500' : 'bg-surface-300')} />
          <div className={cn(
            'flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all',
            step === 2 ? 'bg-brand-500 text-white' : 'bg-surface-300 text-muted',
          )}>
            2
          </div>
        </div>
        <p className="mt-3 text-xs text-muted">
          {step === 1 ? 'Step 1 of 2 — Choose your role' : 'Step 2 of 2 — Fill your details'}
        </p>
      </div>

      {/* Step 1: Role Selection */}
      {step === 1 && (
        <div className="animate-fade-in">
          <h1 className="font-display text-2xl font-bold text-white sm:text-3xl">Join TetherNG</h1>
          <p className="mt-2 text-sm text-muted">How will you use the platform?</p>

          <div className="mt-8 space-y-3">
            {ROLES.map((role) => (
              <button
                key={role.value}
                onClick={() => handleRoleSelect(role.value)}
                className={cn(
                  'flex w-full items-center gap-4 rounded-2xl border-2 p-4 text-left transition-all duration-200',
                  selectedRole === role.value
                    ? role.color
                    : 'border-surface-300 bg-surface-100 hover:border-surface-400',
                )}
              >
                <div className={cn(
                  'flex h-12 w-12 shrink-0 items-center justify-center rounded-xl',
                  selectedRole === role.value
                    ? 'bg-white/10'
                    : 'bg-surface-200',
                )}>
                  <role.icon className={cn(
                    'h-6 w-6',
                    selectedRole === role.value ? 'text-current' : 'text-muted',
                  )} />
                </div>
                <div>
                  <p className={cn(
                    'font-semibold',
                    selectedRole === role.value ? 'text-white' : 'text-white/80',
                  )}>
                    {role.label}
                  </p>
                  <p className="text-xs text-muted mt-0.5">{role.description}</p>
                </div>
                {selectedRole === role.value && (
                  <CheckCircle2 className="ml-auto h-5 w-5 shrink-0 text-current" />
                )}
              </button>
            ))}
          </div>

          {errors.role && (
            <p className="mt-3 text-xs text-danger">{errors.role.message}</p>
          )}

          {selectedRole === 'agent' && (
            <div className="mt-6 rounded-xl bg-gold-400/5 border border-gold-400/20 p-4 animate-slide-up">
              <p className="text-xs font-bold text-gold-400">🎯 Agent Tip</p>
              <p className="mt-1 text-xs leading-relaxed text-muted">
                Verified agents get 3x more inquiries. You can verify your account right after signing up for just ₦2,500.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Step 2: Form */}
      {step === 2 && (
        <form onSubmit={handleSubmit(onSubmit)} className="animate-fade-in space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display text-2xl font-bold text-white sm:text-3xl">Create Account</h1>
              <p className="mt-1 text-xs text-muted capitalize">
                Signing up as {selectedRole}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setStep(1)}
              className="text-xs font-medium text-brand-400 hover:text-brand-300 transition-colors"
            >
              Change role
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-white">First Name</label>
              <input
                placeholder="Chidi"
                className={cn('input-field', errors.firstName && 'border-danger focus:border-danger focus:ring-danger/50')}
                {...register('firstName')}
              />
              {errors.firstName && <p className="mt-1 text-xs text-danger">{errors.firstName.message}</p>}
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-white">Last Name</label>
              <input
                placeholder="Okonkwo"
                className={cn('input-field', errors.lastName && 'border-danger focus:border-danger focus:ring-danger/50')}
                {...register('lastName')}
              />
              {errors.lastName && <p className="mt-1 text-xs text-danger">{errors.lastName.message}</p>}
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-white">Email Address</label>
            <input
              type="email"
              placeholder="you@example.com"
              className={cn('input-field', errors.email && 'border-danger focus:border-danger focus:ring-danger/50')}
              {...register('email')}
            />
            {errors.email && <p className="mt-1 text-xs text-danger">{errors.email.message}</p>}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-white">Phone Number</label>
            <div className="flex">
              <span className="inline-flex items-center rounded-l-xl border border-r-0 border-surface-300 bg-surface-200 px-3 text-sm text-muted">
                +234
              </span>
              <input
                placeholder="801 234 5678"
                className={cn('input-field rounded-l-none', errors.phone && 'border-danger focus:border-danger focus:ring-danger/50')}
                {...register('phone')}
              />
            </div>
            {errors.phone && <p className="mt-1 text-xs text-danger">{errors.phone.message}</p>}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-white">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Min 8 characters"
                className={cn('input-field pr-11', errors.password && 'border-danger focus:border-danger focus:ring-danger/50')}
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
            {password && (
              <div className="mt-2">
                <div className="flex gap-1">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className={cn(
                        'h-1 flex-1 rounded-full transition-colors',
                        i <= passwordStrength.level ? passwordStrength.color : 'bg-surface-300',
                      )}
                    />
                  ))}
                </div>
                <p className="mt-1 text-[10px] text-muted">{passwordStrength.label}</p>
              </div>
            )}
            {errors.password && <p className="mt-1 text-xs text-danger">{errors.password.message}</p>}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-white">Confirm Password</label>
            <input
              type="password"
              placeholder="Re-enter your password"
              className={cn('input-field', errors.confirmPassword && 'border-danger focus:border-danger focus:ring-danger/50')}
              {...register('confirmPassword')}
            />
            {errors.confirmPassword && <p className="mt-1 text-xs text-danger">{errors.confirmPassword.message}</p>}
          </div>

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              className="mt-0.5 h-4 w-4 rounded border-surface-300 bg-surface-50 text-brand-500 focus:ring-brand-500/50"
              {...register('agreeTerms')}
            />
            <span className="text-xs leading-relaxed text-muted">
              I agree to TetherNG's{' '}
              <Link to="/terms" className="text-brand-400 hover:underline">Terms of Service</Link>{' '}
              and{' '}
              <Link to="/privacy" className="text-brand-400 hover:underline">Privacy Policy</Link>
            </span>
          </label>
          {errors.agreeTerms && (
            <p className="-mt-3 text-xs text-danger">{errors.agreeTerms.message}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full py-3 text-base"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Creating account...
              </>
            ) : (
              <>
                Create Account
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </form>
      )}

      <p className="mt-6 text-center text-sm text-muted">
        Already have an account?{' '}
        <Link to="/login" className="font-semibold text-brand-400 hover:text-brand-300 transition-colors">
          Sign in
        </Link>
      </p>
    </div>
  );
}
