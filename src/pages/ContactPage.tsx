import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Mail, Phone, MapPin, Send, ArrowRight, Loader2, CheckCircle2,
} from 'lucide-react';
import { cn } from '@/utils/cn';
import { NIGERIAN_STATES } from '@/utils/constants';

const contactSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: z.string().email('Enter a valid email'),
  phone: z.string().min(10, 'Enter a valid phone number'),
  state: z.string().min(1, 'Select a state'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(20, 'Message must be at least 20 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    formState: { errors: { email: _e } },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    // In production: send email via Firebase Cloud Function
    setLoading(false);
    setSubmitted(true);
    reset();
  };

  if (submitted) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 sm:px-6">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-50 dark:bg-success/10 border-2 border-green-200 dark:border-success/20">
          <CheckCircle2 className="h-10 w-10 text-green-500 dark:text-success" />
        </div>
        <h1 className="Message Sent!</h1>
        <p className="mt-2 text-muted text-center max-w-md">
          Thank you for reaching out. We typically respond within 24 hours on business days.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="btn-outline mt-6 px-8"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark">
      {/* Header bar */}
      <div className="border-b border-gray-200 dark:border-dark-400 bg-white dark:bg-dark-50/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600">
              <Shield className="h-4 w-4 text-white" />
            </div>
            <span className="font-display text-lg font-bold text-gray-900 dark:text-white">
              Tether<span className="text-brand-600 dark:text-brand-400">NG</span>
            </span>
          </Link>
          <Link to="/login" className="btn-outline text-sm">Sign In</Link>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center">
          <h1 className="font-display text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">Get in Touch</h1>
          <p className="mt-2 text-muted">
            Have a question, partnership inquiry, or support request? We'd love to hear from you.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-10 max-w-xl mx-auto space-y-5">
          <div className="grid grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-900 dark:text-white">
                First Name
              </label>
              <input
                type="text"
                placeholder="Chidi"
                className={cn('input-field', formState.errors.firstName && 'border-red-500 dark:border-danger focus:border-red-500 focus:ring-red-500/50')}
                {...register('firstName')}
              />
              {formState.errors.firstName && <p className="mt-1 text-xs text-red-600 dark:text-danger">{formState.errors.firstName.message}</p>}
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-900 dark:text-white">
                Last Name
              </label>
              <input
                type="text"
                placeholder="Okonkwo"
                className={cn('input-field', formState.errors.lastName && 'border-red-500 dark:border-danger focus:border-red-500 focus:ring-red-500/50')}
                {...register('lastName')}
              />
              {formState.errors.lastName && <p className="mt-1 text-xs text-red-600 dark:text-danger">{formState.errors.lastName.message}</p>}
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-900 dark:text-white">
              Email Address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className={cn('input-field', formState.errors.email && 'border-red-500 dark:border-danger focus:border-red-500 focus:ring-red-500/50')}
              {...register('email')}
            />
            {formState.errors.email && <p className="mt-1 text-xs text-red-600 dark:text-danger">{formState.errors.email.message}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-900 dark:text-white">
                Phone Number
              </label>
              <div className="flex">
                <span className="inline-flex items-center rounded-l-xl border border-r-0 border-gray-300 dark:border-dark-400 bg-gray-100 dark:bg-dark-200 px-4 py-3 text-sm text-muted">
                  +234
                </span>
                <input
                  type="tel"
                  placeholder="801 234 5678"
                  className={cn('input-field rounded-l-none pl-1', formState.errors.phone && 'border-red-500 dark:border-danger focus:border-red-500 focus:ring-red-500/50')}
                  {...register('phone')}
                />
              </div>
              {formState.errors.phone && <p className="mt-1 text-xs text-red-600 dark:text-danger">{formState.errors.phone.message}</p>}
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-900 dark:text-white">
                State
              </label>
              <select
                className="input-field appearance-none pr-10"
                {...register('state')}
              >
                <option value="">Select state</option>
                {NIGERIAN_STATES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-gray-400 dark:text-muted" />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-900 dark:text-white">
              Subject
            </label>
            <input
              type="text"
              placeholder="What's this about?"
              className={cn('input-field', formState.errors.subject && 'border-red-500 dark:border-danger focus:border-red-500 focus:ring-red-500/50')}
              {...register('subject')}
            />
            {formState.errors.subject && <p className="mt-1 text-xs text-red-600 dark:text-danger">{formState.errors.subject.message}</p>}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-900 dark:text-white">
              Message
            </label>
            <textarea
              placeholder="Tell us how we can help you..."
              rows={5}
              className={cn('input-field resize-none', formState.errors.message && 'border-red-500 dark:border-danger focus:border-red-500 focus:ring-red-500/50')}
              {...register('message')}
            />
            {formState.errors.message && <p className="mt-1 text-xs text-red-600 dark:text-danger">{formState.errors.message.message}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full py-3 text-base"
          >
            {loading ? (
              <>Send Message <Loader2 className="h-4 w-4 animate-spin /></>
            ) : (
              <>Send Message <Send className="h-4 w-4" /></>
            )}
          </button>
        </form>

        {/* Contact info sidebar */}
        <div className="mt-12 grid sm:grid-cols-3 gap-6">
          <div className="card-hover">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 dark:bg-brand-500/10 border border-brand-200 dark:border-brand-500/20">
              <Mail className="h-5 w-5 text-brand-600 dark:text-brand-400" />
            </div>
            <h3 className="text-sm font-bold text-gray-900 dark:text-white mt-3">Email Us</h3>
            <p className="text-sm text-muted mt-1">info@tether.ng</p>
          </div>

          <div className="card-hover">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-50 dark:bg-gold-400/10 border border-amber-200 dark:border-gold-400/20">
              <Phone className="h-5 w-5 text-amber-600 dark:text-gold-400" />
            </div>
            <h3 className="text-sm font-bold text-gray-900 dark:text-white mt-3">Call Us</h3>
            <p className="text-sm text-muted mt-1">+234 801 234 5678</p>
          </div>

          <div className="card-hover">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 dark:bg-dark-200 border border-gray-200 dark:border-dark-400">
              <MapPin className="h-5 w-5 text-gray-500 dark:text-muted" />
            </div>
            <h3 className="text-sm font-bold text-gray-900 dark:text-white mt-3">Visit Us</h3>
            <p className="text-sm text-muted mt-1">Lagos, Nigeria</p>
          </div>

          {/* FAQ */}
          <div className="card p-6 mt-8">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Frequently Asked Questions</h3>
            <div className="space-y-4">
              {[
                { q: 'How does TetherNG protect my money?', a: 'We hold your payment in escrow until you confirm the property is what you saw. The agent never touches your money directly. If there\'s a dispute, we hold funds until it\'s resolved.' },
                q: 'What is escrow?', a: 'Escrow is a financial arrangement where a third party (TetherNG) holds money until both parties confirm a transaction is fair and complete. Neither side can access the funds until both agree.' },
                q: 'Does Tether-ng charge tenants?', a: 'No. Creating an account, browsing listings, and initiating escrow are completely free for tenants. You only pay rent to the agent/landlord through escrow.' },
                q: 'How long does verification take?', a: 'Usually 1-24 hours for BVN verification, 2-5 days for property verification. We aim to be as fast as possible.' },
                q: 'Can I get a refund?', a: 'Yes. Full refund within 7 days for subscription plans. Escrow disputes are investigated within 3-5 business days. Property listings have a 3-day inspection window.' },
                q: 'Is Tether-ng licensed by CBN?', a: 'We are registered with the CBN and comply with all Nigerian financial regulations. Your money is held by a licensed trustee.' },
              ].map((faq, i) => (
                <div key={i} className="border-b border-gray-100 dark:border-dark-400/50 pb-4 last:border-0">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{faq.q}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Need ChevronDown for select */
import { ChevronDown } from 'lucide-react';
