import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Shield, Phone, Mail, MapPin, Send, Loader2, CheckCircle2, ArrowRight, AlertCircle } from 'lucide-react';
import { cn } from '@/utils/cn';

const NIGERIAN_STATES = [
  { value: '', label: 'Select state' },
  { value: 'lagos', label: 'Lagos' },
  { value: 'abuja', label: 'Abuja' },
  { value: 'rivers', label: 'Port Harcourt' },
  { value: 'oyo', label: 'Ibadan' },
  { value: 'kano', label: 'Kano' },
  { value: 'enugu', label: 'Enugu' },
  { value: 'delta', label: 'Delta' },
];

const SUBJECT_OPTIONS = [
  { value: 'general', label: 'General Inquiry' },
  { value: 'listing', label: 'Listing Issue' },
  { value: 'escrow', label: 'Escrow Issue' },
  { value: 'verification', label: 'Verification Issue' },
  { value: 'partnership', label: 'Partnership Inquiry' },
  { value: 'complaint', label: 'File a Complaint' },
];

const ISSUE_TYPES = [
  { value: 'cant-find', label: "I can't find a property" },
  { value: 'scam-suspect', label: 'I think this is a scam' },
  { value: 'agent-unresponsive', label: 'Agent isn\'t responding' },
  ];
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ name: string; email: string; state: string; subject: string; message: string; issueType: string; description: string }>({
    resolver: zod.object({
      name: z.string().min(2, 'Name is required'),
      email: z.string().email('Enter a valid email address'),
      state: z.string().min(1, 'Select your state'),
      subject: z.string().min(1, 'Select a subject'),
      message: z.string().min(10, 'Tell us what you need help with (min 10 characters)'),
      description: z.string().optional(),
      issueType: z.string().optional(),
    }),
  });

  const handleFormSubmit = async (data) => {
    setSubmitted(true);
    await new Promise((r) => setTimeout(r, 1500));
    setSubmitted(false);
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark">
      {/* Header */}
      <section className="border-b border-gray-200 dark:border-dark-400 bg-white dark:bg-dark-50/50 py-16 sm:py-24">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 dark:bg-brand-500/10 border border-2 border-brand-200 dark:border-brand-500/20">
            <AlertCircle2 className="h-7 w-7 text-brand-600 dark:text-brand-400" />
          </div>
          <h1 className="font-display text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">Contact Us</h1>
          <p className="mt-2 text-muted max-w-md mx-auto">
            Have a question, issue, or partnership inquiry? We respond within 24 hours.
          </p>
        </div>
      </section>

      {/* Contact form */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
            <div className="card p-6 sm:p-8">
              {sent ? (
                <div className="animate-fade-in text-center py-8">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-50 dark:bg-success/10 border-2 border-green-200 dark:border-success/20">
                    <CheckCircle2 className="h-8 w-8 text-green-500 dark:text-success" />
                  </div>
                  <h2 className="Message Sent!</h2>
                  <p className="text-sm text-muted mt-2">
                    We received your message. We'll get back to you within 24 hours at <span className="text-brand-600 dark:text-brand-400">{data.email}</span>
                  </p>
                  <button
                    onClick={() => { setSent(false); setSubmitted(false); }}
                    className="btn-outline mt-6 inline-flex items-center gap-2"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit((data) => { handleFormSubmit(data); })}>
                  {submitted ? (
                    <div className="flex items-center justify-center py-12">
                      <Loader2 className="h-8 w-8 text-brand-600 dark:text-brand-400 animate-spin" />
                    <p className="text-sm text-muted mt-3">Sending...</p>
                    </div>
                  ) : (
                    <div className="space-y-5">
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-900 dark:text-white">Full Name</label>
                        <input
                          type="text"
                          placeholder="Your full name"
                          className={cn('input-field', errors.name && 'border-red-500 dark:border-danger focus:border-red-500 dark:focus:border-danger focus:ring-red-500/50'}
                          {...register('name')}
                        />
                        {errors.name && <p className="mt-1 text-xs text-red-600 dark:text-danger">{errors.name.message}</p>}
                      </div>

                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-900 dark:text-white">Email Address</label>
                        <input
                          type="email"
                          placeholder="you@example.com"
                          className={cn('input-field', errors.email && 'border-red-500 dark:border-danger focus:border-red-500 dark:focus:border-danger focus:ring-red-500/50'}
                          {...register('email')}
                        />
                        {errors.email && <p className="mt-1 text-xs text-red-600 dark:text-danger">{errors.email.message}</p>}
                      </div>

                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-900 dark:text-white">State</label>
                        <select
                          className={cn('input-field appearance-none pr-10', errors.state && 'border-red-500 dark:border-danger'}
                          {...register('state')}
                        >
                          <option value="">Select your state</option>
                            {NIGERIAN_STATES.map((s) => (
                              <option key={s.value} value={s.value}>{s.label}</option>
                            ))}
                          </select>
                          <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-gray-400 dark:text-muted" />
                        />
                        </div>
                      </div>

                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-900 dark:text-white">Subject</label>
                        <select
                          className={cn('input-field appearance-none pr-10', errors.subject && 'border-red-500 dark:border-danger'}
                          {...register('subject')}
                        >
                          <option value="">Select a subject</option>
                          {SUBJECT_OPTIONS.map((s) => (
                            <option key={s.value} value={s.value}>{s.label}</option>
                          </option>
                        >
                        </select>
                        <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-gray-400 dark:text-muted" />
                        </div>
                      </div>

                      {/* Issue type (only shows if subject is "Listing Issue" or "Escrow Issue" or "Verification Issue") */}
                      {(data.subject === 'listing-issue' || data.subject === 'escrow-issue' || data.subject === 'verification-issue') && (
                        <div>
                          <label className="mb-1.5 block text-sm font-medium text-gray-900 dark:text-white">What type of issue?</label>
                          <select
                            className={cn('input-field appearance-none pr-10', errors.issueType && 'border-red-500 dark:border-danger'}
                            {...register('issueType')}
                          >
                            <option value="">Select issue type</option>
                            {ISSUE_TYPES.map((t) => (
                              <option key={t.value} value={t.value}>{t.label}</option>
                            ))}
                          </select>
                          <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-gray-400 dark:text-muted" />
                        </div>
                      )}

                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-900 dark:text-white">Message</label>
                        <textarea
                          placeholder="Describe your issue in detail. Include property link if applicable."
                          rows={5}
                          className={cn('input-field resize-none', errors.message && 'border-red-500 dark:border-danger focus:border-red-500 dark:focus:ring-red-500/50'}
                          {...register('message')}
                        />
                        {errors.message && <p className="mt-1 text-xs text-red-600 dark:text-danger">{errors.message.message}</p>}
                      </div>

                      <button
                        type="submit"
                        disabled={submitted}
                        className="btn-primary w-full mt-2 py-3 text-base"
                      >
                        {submitted ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <>
                            Send Message <ArrowRight className="h-4 w-4" />
                          </>
                        )}
                      </button>
                    </form>
                  )}
              )}
            </div>

            {/* Contact sidebar info */}
            <div className="mt-8 grid sm:grid-cols-3 gap-4">
              <div className="card-hover">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 dark:bg-brand-500/10 border border-brand-200 dark:border-brand-500/20">
                  <Shield className="h-5 w-5 text-brand-600 dark:text-brand-400" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white">Email Us</h3>
                  <a href="mailto:hello@tether.ng" className="text-sm text-brand-600 dark:text-brand-400 hover:underline mt-1 inline-block">
                    hello@tether.ng
                  </a>
                </div>
              </div>
              <div className="card-hover">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 dark:bg-dark-200 border border-gray-200 dark:border-dark-400">
                  <Phone className="h-5 w-5 text-gray-400 dark:text-muted" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white">Call Us</h3>
                  <a href="tel:+2348012345678" className="text-sm text-brand-600 dark:text-brand-400 hover:underline mt-1 inline-flex items-center gap-1">
                    +234 801 234 5678
                  </a>
                </div>
              </div>
              <div className="card-hover">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 dark:bg-dark-200 border border-gray-200 dark:border-dark-400">
                  <MapPin className="h-5 w-5 text-gray-400 dark:text-muted" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white">Visit Us</h3>
                  <p className="text-xs text-muted mt-0.5">Lagos, Nigeria</p>
                </div>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <div className="mt-6 rounded-2xl border border-green-200 dark:border-success/20 bg-green-50/30 dark:bg-success/5 p-6 text-center">
              <div className="flex items-center justify-center mx-auto mb-3">
                <div className="h-10 w-10 items-center justify-center rounded-full bg-green-500">
                  <svg className="h-5 w-5 text-white" viewBox="0 24 24" fill="#25D366" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Chat on WhatsApp</h3>
              <p className="text-sm text-muted mt-1">For faster response</p>
              <a
                href="https://wa.me/2348012345678"
                className="btn-primary mt-4 inline-flex items-center gap-2 px-8 py-3 text-base"
                target="_blank"
              >
                Open Chat <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <div className="border-t border-gray-200 dark:border-dark-400 bg-gray-50 dark:bg-dark-30 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between border-b border-gray-100 dark:border-dark-400 pb-4 mb-8">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600">
                <Shield className="h-4 w-4 text-white" />
              </div>
              <span className="font-display text-lg font-bold text-gray-900 dark:text-white">
                Tether<span className="text-brand-600 dark:text-brand-400">NG</span>
              </span>
            </Link>
            <p className="text-xs text-gray-400 dark:text-dark-500">&copy; {new Date().getFullYear()} TetherNG. All rights reserved.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
