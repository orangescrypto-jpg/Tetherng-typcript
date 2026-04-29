import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft, ArrowRight, Loader2, Mail, CheckCircle2 } from 'lucide-react';
import { cn } from '@/utils/cn';

const forgotSchema = z.object({
  email: z.string().email('Enter a valid email address'),
});

type ForgotFormData = z.infer<typeof forgotSchema>;

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [sentEmail, setSentEmail] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotFormData>({
    resolver: zodResolver(forgotSchema),
  });

  const onSubmit = async (data: ForgotFormData) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSentEmail(data.email);
    setSent(true);
    setLoading(false);
  };

  if (sent) {
    return (
      <div className="text-center animate-fade-in">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success/10 border border-success/20">
          <CheckCircle2 className="h-8 w-8 text-success" />
        </div>
        <h1 className="mt-6 font-display text-2xl font-bold text-white">Check Your Email</h1>
        <p className="mt-2 text-sm text-muted">
          We sent a password reset link to <span className="font-medium text-white">{sentEmail}</span>
        </p>
        <p className="mt-1 text-xs text-muted">
          Didn't receive it? Check your spam folder or{' '}
          <button onClick={() => setSent(false)} className="text-brand-400 hover:underline">try again</button>
        </p>
        <Link to="/login" className="btn-outline mt-8 inline-flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Sign In
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Link to="/login" className="inline-flex items-center gap-1.5 text-xs font-medium text-muted hover:text-white transition-colors mb-8">
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to Sign In
      </Link>

      <div className="mb-8">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500/10 border border-brand-500/20 mb-4">
          <Mail className="h-6 w-6 text-brand-400" />
        </div>
        <h1 className="font-display text-2xl font-bold text-white">Forgot Password?</h1>
        <p className="mt-2 text-sm text-muted">
          Enter your email address and we'll send you a link to reset your password.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-white">Email Address</label>
          <input
            type="email"
            placeholder="you@example.com"
            className={cn('input-field', errors.email && 'border-danger focus:border-danger focus:ring-danger/50')}
            {...register('email')}
          />
          {errors.email && <p className="mt-1.5 text-xs text-danger">{errors.email.message}</p>}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full py-3 text-base"
        >
          {loading ? (
            <><Loader2 className="h-4 w-4 animate-spin" /> Sending...</>
          ) : (
            <>Send Reset Link <ArrowRight className="h-4 w-4" /></>
          )}
        </button>
      </form>
    </div>
  );
}
