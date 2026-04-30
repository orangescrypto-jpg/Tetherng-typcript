import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CheckCircle2, ArrowRight, Shield, Star,
  Eye, Users, BarChart3, Crown, Check,
} from 'lucide-react';
import { cn } from '@/utils/cn';
import { formatCurrency } from '@/utils/formatCurrency';
import { SUBSCRIPTION_PLANS } from '@/utils/constants';
import { useAuthStore } from '@/store/authStore';
import type { SubscriptionPlanSlug } from '@/types';

type CheckoutStep = 'select' | 'confirm' | 'success' | 'failed';

export default function SubscriptionPage() {
  const navigate = useNavigate();
  const { user, updateUser } = useAuthStore();
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlanSlug | null>(null);
  const [step, setStep] = useState<CheckoutStep>('select');
  const [interval, setInterval] = useState<'month' | 'year'>('month');

  const currentPlan = user?.subscriptionPlan || 'free';

  const getPlan = (slug: SubscriptionPlanSlug) => SUBSCRIPTION_PLANS.find((p) => p.slug === slug);
  const selected = selectedPlan ? getPlan(selectedPlan) : null;
  const yearlyDiscount = 0.8; // 20% off yearly
  const displayPrice = (price: number) => interval === 'year' ? Math.round(price * 12 * yearlyDiscount) : price;

  const handleSelectPlan = (slug: SubscriptionPlanSlug) => {
    if (slug === 'free') return;
    setSelectedPlan(slug);
    setStep('confirm');
  };

  const handlePay = async () => {
    if (!selected) return;

    setStep('confirm'); // show loading
    await new Promise((r) => setTimeout(r, 2000));
    setStep('success');
    updateUser({
      subscriptionPlan: selected.slug,
      subscriptionExpiry: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    });
  };

  if (step === 'success' && selected) {
    return (
      <div className="max-w-lg mx-auto py-16 text-center animate-fade-in">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-50 dark:bg-success/10 border-2 border-green-200 dark:border-success/20">
          <CheckCircle2 className="h-10 w-10 text-green-500 dark:text-success" />
        </div>
        <h1 className="mt-6 font-display text-2xl font-bold text-gray-900 dark:text-white">Payment Successful!</h1>
        <p className="mt-2 text-muted">You're now on the <span className="font-bold text-gray-900 dark:text-white">{selected.name}</span> plan</p>

        <div className="mt-8 rounded-2xl border border-green-200 dark:border-success/20 bg-green-50 dark:bg-success/5 p-5 text-left">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3">What's unlocked:</h3>
          <ul className="space-y-2.5">
            {selected.features.slice(0, 5).map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-500 dark:text-success" />
                {f}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <button onClick={() => navigate('/dashboard')} className="btn-primary px-6">
            Go to Dashboard <ArrowRight className="h-4 w-4" />
          </button>
          <button onClick={() => navigate('/dashboard/verification')} className="btn-outline px-6">
            <Shield className="h-4 w-4" /> Get Verified
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-display text-2xl font-bold text-gray-900 dark:text-white">Subscription Plans</h1>
        <p className="mt-1 text-sm text-muted">Choose the plan that matches your pipeline. Upgrade or downgrade anytime.</p>
      </div>

      {/* Current plan banner */}
      {currentPlan !== 'free' && (
        <div className="rounded-2xl border border-green-200 dark:border-success/20 bg-green-50 dark:bg-success/5 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Crown className="h-5 w-5 text-green-600 dark:text-success" />
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">You're on the <span className="uppercase">{currentPlan}</span> plan</p>
              {user?.subscriptionExpiry && (
                <p className="text-xs text-muted">Expires {new Date(user.subscriptionExpiry).toLocaleDateString('en-NG', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
              )}
            </div>
          </div>
          <button onClick={() => navigate('/dashboard/settings')} className="text-xs font-medium text-green-700 dark:text-success hover:underline">Manage</button>
        </div>
      )}

      {/* Interval toggle */}
      {step === 'select' && (
        <div className="flex items-center justify-center gap-3">
          <span className={cn('text-sm font-medium', interval === 'month' ? 'text-gray-900 dark:text-white' : 'text-muted')}>Monthly</span>
          <button
            onClick={() => setInterval(interval === 'month' ? 'year' : 'month')}
            className={cn(
              'relative h-7 w-12 rounded-full transition-colors duration-200',
              interval === 'year' ? 'bg-brand-600' : 'bg-gray-300 dark:bg-dark-400',
            )}
          >
            <span className={cn(
              'absolute top-0.5 left-0.5 h-6 w-6 rounded-full bg-white shadow-sm transition-transform duration-200',
              interval === 'year' ? 'translate-x-5' : 'translate-x-0',
            )} />
          </button>
          <span className={cn('text-sm font-medium', interval === 'year' ? 'text-gray-900 dark:text-white' : 'text-muted')}>Yearly</span>
          {interval === 'year' && (
            <span className="rounded-lg bg-green-50 dark:bg-success/10 px-2 py-0.5 text-xs font-bold text-green-700 dark:text-success border border-green-200 dark:border-success/20">Save 20%</span>
          )}
        </div>
      )}

      {/* Social proof bar */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { icon: Users, label: 'Agents on Pro+', value: '1,200+' },
          { icon: BarChart3, label: 'Avg. more leads', value: '4.7x' },
          { icon: Eye, label: 'Avg. more views', value: '5.2x' },
        ].map((stat) => (
          <div key={stat.label} className="rounded-xl bg-gray-50 dark:bg-dark-200/50 border border-gray-200 dark:border-dark-400 p-3 text-center">
            <stat.icon className="mx-auto h-4 w-4 text-brand-600 dark:text-brand-400" />
            <p className="mt-1.5 text-lg font-bold text-gray-900 dark:text-white">{stat.value}</p>
            <p className="text-[10px] text-muted">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* ─── SELECT STEP: Plan Cards ─── */}
      {step === 'select' && (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {SUBSCRIPTION_PLANS.map((plan) => {
            const isCurrent = currentPlan === plan.slug;
            const isPopular = plan.slug === 'pro';
            const price = displayPrice(plan.price);

            return (
              <div
                key={plan.slug}
                className={cn(
                  'relative rounded-2xl border-2 p-6 flex flex-col transition-all duration-300',
                  isPopular
                    ? 'pricing-popular scale-[1.02] xl:scale-105'
                    : isCurrent
                      ? 'border-green-400 dark:border-success bg-green-50/30 dark:bg-success/5'
                      : 'border-gray-200 dark:border-dark-400 bg-white dark:bg-dark-100 hover:border-gray-300 dark:hover:border-dark-500',
                )}
              >
                {isPopular && (
                  <span className="badge-featured self-start mb-3"><Star className="h-3 w-3" /> Most Popular</span>
                )}
                {isCurrent && (
                  <span className="badge-verified self-start mb-3"><CheckCircle2 className="h-3 w-3" /> Current Plan</span>
                )}

                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">{plan.name}</h3>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="font-display text-3xl font-bold text-gray-900 dark:text-white">
                      {plan.price === 0 ? 'Free' : formatCurrency(price)}
                    </span>
                    {plan.price > 0 && (
                      <span className="text-sm text-muted">
                        {interval === 'year' ? '/year' : `/${plan.interval}`}
                      </span>
                    )}
                  </div>
                  {interval === 'year' && plan.price > 0 && (
                    <p className="mt-0.5 text-xs text-muted line-through">{formatCurrency(plan.price * 12)}/year</p>
                  )}
                </div>

                {/* Max listings indicator */}
                <div className="mt-4">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-muted">Listings</span>
                    <span className={cn('font-bold', plan.maxListings >= 50 ? 'text-brand-600 dark:text-brand-400' : 'text-gray-900 dark:text-white')}>
                      {plan.maxListings === Infinity ? 'Unlimited' : plan.maxListings}
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full bg-gray-200 dark:bg-dark-400 overflow-hidden">
                    <div
                      className={cn('h-full rounded-full transition-all', plan.maxListings === Infinity ? 'w-full bg-gradient-to-r from-brand-500 to-gold-400' : plan.maxListings >= 50 ? 'w-5/6 bg-brand-500' : plan.maxListings >= 15 ? 'w-2/3 bg-brand-400' : 'w-1/4 bg-gray-400')}
                    />
                  </div>
                </div>

                {/* Features */}
                <ul className="mt-5 flex flex-col gap-2.5 flex-1">
                  {plan.features.map((f) => {
                    const isMonetization = f.toLowerCase().includes('lead') || f.toLowerCase().includes('ranking') || f.toLowerCase().includes('featured') || f.toLowerCase().includes('analytics');
                    return (
                      <li key={f} className="flex items-start gap-2 text-sm">
                        <Check className={cn('mt-0.5 h-4 w-4 shrink-0', isMonetization ? 'text-amber-500 dark:text-gold-400' : 'text-brand-600 dark:text-brand-400')} />
                        <span className={cn(isMonetization ? 'font-medium text-gray-900 dark:text-white' : 'text-gray-600 dark:text-muted')}>{f}</span>
                      </li>
                    );
                  })}
                </ul>

                {/* CTA */}
                <button
                  onClick={() => handleSelectPlan(plan.slug)}
                  disabled={isCurrent}
                  className={cn(
                    'mt-6 w-full text-center text-sm font-semibold py-3 rounded-xl transition-all',
                    isCurrent
                      ? 'bg-green-50 dark:bg-success/10 text-green-700 dark:text-success border border-green-200 dark:border-success/20 cursor-default'
                      : isPopular
                        ? 'btn-gold'
                        : plan.price === 0
                          ? 'btn-outline'
                          : 'btn-primary',
                  )}
                >
                  {isCurrent ? '✓ Active' : plan.price === 0 ? 'Downgrade' : `Subscribe`}
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* ─── CONFIRM STEP ─── */}
      {step === 'confirm' && selected && (
        <div className="max-w-md mx-auto animate-slide-up">
          <button onClick={() => setStep('select')} className="flex items-center gap-1.5 text-sm text-muted hover:text-gray-900 dark:hover:text-white transition-colors mb-6">
            <ArrowRight className="h-3.5 w-3.5 rotate-180" /> Back to plans
          </button>

          <div className="card p-6">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Confirm Subscription</h2>

            <div className="mt-5 rounded-xl border border-gray-200 dark:border-dark-400 bg-gray-50 dark:bg-dark-200/50 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={cn('flex h-10 w-10 items-center justify-center rounded-xl', selected.slug === 'pro' ? 'bg-gold-400/15 text-gold-400' : selected.slug === 'premium' ? 'bg-brand-500/15 text-brand-400' : 'bg-brand-500/15 text-brand-400')}>
                    <Crown className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">{selected.name} Plan</p>
                    <p className="text-xs text-muted">{interval === 'year' ? 'Yearly billing (20% off)' : 'Monthly billing'}</p>
                  </div>
                </div>
                <p className="text-lg font-bold text-gray-900 dark:text-white">{formatCurrency(displayPrice(selected.price))}</p>
              </div>
            </div>

            {/* What you get */}
            <div className="mt-5 space-y-2.5">
              <p className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wide">You'll unlock:</p>
              {selected.features.map((f) => (
                <div key={f} className="flex items-center gap-2.5 text-sm">
                  <Check className="h-4 w-4 text-brand-600 dark:text-brand-400 shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">{f}</span>
                </div>
              ))}
            </div>

            {/* Payment method */}
            <div className="mt-6 rounded-xl border border-gray-200 dark:border-dark-400 p-4">
              <p className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-3">Payment Method</p>
              <div className="space-y-2.5">
                <label className="flex items-center gap-3 cursor-pointer rounded-lg border border-brand-500 bg-brand-50 dark:bg-brand-500/5 p-3">
                  <input type="radio" name="payment" defaultChecked className="h-4 w-4 text-brand-600 focus:ring-brand-500/50" />
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-8 rounded bg-blue-600 flex items-center justify-center"><span className="text-[8px] font-bold text-white">PS</span></div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">Paystack</span>
                  </div>
                </label>
                <label className="flex items-center gap-3 cursor-pointer rounded-lg border border-gray-200 dark:border-dark-400 p-3 hover:border-gray-300 dark:hover:border-dark-500 transition-colors">
                  <input type="radio" name="payment" className="h-4 w-4 text-brand-600 focus:ring-brand-500/50" />
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-8 rounded bg-orange-500 flex items-center justify-center"><span className="text-[8px] font-bold text-white">FW</span></div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">Flutterwave</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Guarantee */}
            <div className="mt-5 flex items-start gap-2.5 rounded-xl bg-green-50 dark:bg-success/5 border border-green-200 dark:border-success/20 p-4">
              <Shield className="h-5 w-5 text-green-600 dark:text-success shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">7-day money-back guarantee</p>
                <p className="text-xs text-muted mt-0.5">Not satisfied? Get a full refund within 7 days, no questions asked.</p>
              </div>
            </div>

            <button onClick={handlePay} className="btn-gold w-full mt-6 py-3.5 text-base">
              Pay {formatCurrency(displayPrice(selected.price))} <ArrowRight className="h-4 w-4" />
            </button>

            <p className="mt-3 text-center text-[11px] text-muted">
              By subscribing, you agree to auto-renewal. Cancel anytime from settings.
            </p>
          </div>
        </div>
      )}

      {/* FAQ Section */}
      {step === 'select' && (
        <div className="card p-6">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-5">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: 'Can I cancel anytime?', a: 'Yes. Cancel from your dashboard settings. You keep access until the period you paid for ends. No partial refunds after 7 days.' },
              { q: 'What happens to my listings if I downgrade?', a: 'Your active listings stay active. If you exceed the lower plan limit, you can still edit existing ones but can\'t create new ones until you remove some.' },
              { q: 'Do you offer refunds?', a: 'Full refund within 7 days of purchase. After that, your subscription continues until the billing period ends.' },
              { q: 'Is the verification fee separate?', a: 'Yes. BVN verification is ₦2,500 one-time. Subscription plans do not include verification.' },
              { q: 'What payment methods do you accept?', a: 'We accept all Nigerian debit cards (Visa, Mastercard, Verve) via Paystack and Flutterwave. Bank transfer is also available.' },
            ].map((faq) => (
              <div key={faq.q} className="border-b border-gray-100 dark:border-dark-400/50 pb-4 last:border-0 last:pb-0">
                <p className="text-sm font-semibold text-gray-900 dark:text-white">{faq.q}</p>
                <p className="text-sm text-muted mt-1 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
