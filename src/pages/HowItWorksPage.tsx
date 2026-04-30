import { Link } from 'react-router-dom';
import { UserPlus, Search, Shield, CheckCircle2 } from 'lucide-react';

const steps = [
  {
    num: '01',
    icon: UserPlus,
    title: 'Create an Account',
    description: 'Sign up for free in under 2 minutes. No hidden charges, no paperwork required.',
    color: 'bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-400 border-brand-200 dark:border-brand-500/20',
  },
  {
    num: '02',
    icon: Search,
    title: 'Find a Property',
    description: 'Browse thousands of verified listings across all 36 states with advanced search filters.',
    color: 'bg-gray-100 dark:bg-dark-200 text-gray-600 dark:text-dark-400 border-gray-200 dark:border-dark-400',
  },
  {
    num: '03',
    icon: Shield,
    title: 'Pay via Escrow',
    description: 'Your money is held securely in escrow until you confirm the property matches the listing.',
    color: 'bg-gold-400/10 dark:bg-gold-400/10 text-gold-400 border-gold-400/20 dark:border-gold-400/20',
  },
  {
    num: '04',
    icon: CheckCircle2,
    title: 'Confirm Satisfaction',
    description: 'Inspect the property and confirm everything matches. Funds are then released to the agent.',
    color: 'bg-green-50 dark:bg-success/10 text-green-600 dark:text-success border-green-200 dark:border-success/20',
  },
];

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark">
      <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="section-heading text-4xl md:text-5xl">How It Works</h1>
          <p className="text-muted mt-4">Transact with confidence in 4 simple steps. TetherNG holds your money securely until you are completely satisfied.</p>
        </div>

        <div className="relative">
          <div className="absolute left-1/2 top-10 bottom-0 w-px bg-gray-300 dark:bg-dark-400 hidden sm:block" />

          <div className="space-y-12">
            {steps.map((step) => (
              <div key={step.num} className="relative flex gap-6">
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border-2 ${step.color}`}>
                  <step.icon className="h-6 w-6" />
                </div>
                <div className="flex-1 bg-white dark:bg-dark-100 border border-gray-200 dark:border-dark-400 rounded-2xl p-6 shadow-sm hover:shadow-card-hover transition-all">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">{step.title}</h3>
                  <p className="text-sm text-muted mt-2 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-16">
          <p className="text-lg text-muted mb-6">Ready to get started?</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup" className="btn-primary px-8 py-3.5 text-base">
              Create Free Account
            </Link>
            <Link to="/listings" className="btn-outline px-8 py-3.5 text-base">
              Browse Listings
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
