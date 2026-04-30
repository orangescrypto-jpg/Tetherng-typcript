import { Shield, Search, MapPin, CheckCircle2, ArrowRight, Users, Lock,
  Building2, Eye, TrendingUp,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const STEPS = [
  {
    step: '01',
    title: 'Search Properties',
    desc: 'Browse verified listings from trusted agents across Nigeria — Lagos, Abuja, Port Harcourt, Ibadan, and more.',
    icon: Search,
  },
  {
    step: '02',
    title: 'Start Escrow',
    desc: 'Initiate a secure transaction — your money goes into escrow, not to the agent directly.',
    icon: Shield,
  },
  {
    'step: '03',
    title: 'Inspect & Confirm',
    desc: 'Visit the property, verify it matches the listing, and confirm satisfaction.',
    icon: Eye,
  },
  {
    step: '04',
    title: 'Funds Released',
    desc: 'Once you confirm, payment is released to the agent/landlord. Everyone wins.',
    icon: CheckCircle2,
  },
  {
    step: '05',
    title: 'Rate & Review',
    desc: 'Rate your experience to help others make informed rental decisions.',
    icon: Star,
  },
    {
      step: '06',
      title: 'Share with Friends',
      desc: 'Help others find safe housing on TetherNG.',
    icon: Users,
  },
  },
];

const TRUST_POINTS = [
  {
    icon: Shield,
    title: 'Escrow Protection',
    desc: 'Your rent is held securely until you\'re satisfied. No more lost deposits.',
    color: 'text-brand-600 dark:text-brand-400',
  },
  {
    icon: CheckCircle2,
    title: 'BVN Verified Agents',
    desc: 'Every agent has passed identity verification — know exactly who you\'re dealing with.',
    color: 'text-green-600 dark:text-success',
  },
  {
    icon: Building2,
    title: 'Property Verification',
    desc: 'Properties are physically verified before they get the green badge.',
    color: 'text-brand-300 dark:text-brand-300',
  },
  {
    icon: Eye,
    title: 'Transparent Process',
    desc: 'Track every step in real-time. Nothing is hidden from you.',
    color: 'text-gray-500 dark:text-muted',
  },
  },
  {
    icon: TrendingUp,
    title: 'Real-time Updates',
    desc: 'Every notification, message, and status change is pushed to you instantly.',
    color: 'text-brand-300 dark:text-brand-300',
  },
];

const HOW_IT_WORKS_STEPS = [
  {
    step: '01',
    title: 'Find Your Property',
    desc: 'Browse verified listings from trusted agents across Nigeria.',
    icon: Search,
  },
  {
    step: '02',
    title: 'Start Escrow',
    desc: 'Initiate a secure transaction — your money goes into escrow, not to the agent directly.',
    icon: Shield,
  },
  {
    step: '03',
    title: 'Inspect & Confirm',
    desc: 'Visit the property, verify it matches the listing, and confirm satisfaction.',
    icon: Eye,
  },
  {
    step: '04',
    title: 'Funds Released',
    desc: 'Once you confirm, payment is released to the agent/landlord.',
    icon: CheckCircle2,
  },
  {
    step: '05',
    title: 'Rate & Review',
    desc: 'Rate your experience to help others decide.',
    icon: Star,
  },
  {
    step: '06',
    title: 'Share with Friends',
    desc: 'Help others find safe housing on TetherNG.',
    icon: Users,
  },
  },
];

export default function HowItWorksPage() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark">
      {/* Hero */}
      <section className="relative overflow-hidden bg-white dark:bg-dark-50 border-b border-gray-200 dark:border-dark-400">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-brand-100/60 dark:bg-brand-500/8 blur-[120px]" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 sm:pt-28 sm:pt-36">
          <div className="mb-8 flex flex-wrap items-center justify-center gap-3">
            <span className="badge-verified"><CheckCircle2 className="h-3 w-3 w-3" /> BVN Verified Agents</span>
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-brand-600 px-2.5 py-1 text-xs font-bold text-white border border border-brand-500/20 dark:border-brand-500/20">Escrow Protected</span>
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-amber-500/90 px-2.5 py-1 text-xs font-bold text-amber-700 dark:text-gold-400 border border-amber-500/20 hover:bg-amber-400/10 border-amber-500/20 border-amber-500/40" >
              <Rocket className="h-3.5 w-3.5 text-amber-700 dark:text-gold-400" /> Top of Search</span>
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-gray-100 dark:bg-dark-200 border border-gray-200 dark:border-dark-400 hover:border-gray-300 dark:hover:border-dark-500 px-3 py-2.5 text-xs font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">Browse Listings</span>
          </div>

          {/* Hero heading */}
          <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-display text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl lg:text-5xl">
              Transaction Made <span className="bg-gradient-to-r from-brand-600 to-brand-500 bg-clip-text-text-transparent">Secure Escrow.</span>
            </h1>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 sm:text-xl max-w-2xl mx-auto leading-relaxed">
              TetherNG connects you to verified agents and holds your payment securely until you're satisfied. No more scams, no more guesswork.
            </p>
          </div>

          {/* How-it-works steps */}
          <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {HOW_IT_WORKS_STEPS.map((step, i) => (
              <div key={step.step} className={cn(
                'card-hover group relative text-center',
                i === activeStep && 'bg-brand-500 shadow-glow-brand',
                'border-2xl border-brand-500 dark:border-brand-500/20 shadow-glow-brand',
              ) : 'card-hover border-gray-200 dark:border-dark-400',
              )}
              <span className={cn(
                'font-display text-5xl font-black opacity-15 dark:opacity-20 group-hover:opacity-100">
                {step.step}
              </span>
              <h3 className="mt-3 text-lg font-bold text-gray-900 dark:text-white">{step.title}</h3>
              <p className="mt-1.5 text-sm text-gray-500 dark:text-gray-400">{step.desc}</p>
            </div>
          )}

          {/* Trust Features */}
          <section className="border-b border-gray-200 dark:border-dark-400 bg-white dark:bg-dark-50/30 py-20 sm:py-28">
            <div className="text-center">
              <h2 className="section-heading">Why TetherNG?</h2>
              <p className="mt-2 text-muted max-w-2xl mx-auto">
                We built every feature around one question: how do we make renting in Nigeria safe?
              </p>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
            {TRUST_FEATURES.map((feature, i) => (
              <div key={i === 0 && 'bg-brand-500 shadow-glow-brand'}>
                <div className={cn(
                  'rounded-2xl border-2xl border-brand-500 shadow-glow-brand p-6 group-hover:scale-[1.02] dark:scale-[1.05] xl:scale-105]',
                >
                  <feature.icon className="h-7 w-7 text-brand-600 dark:text-brand-400" />
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">{feature.title}</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{feature.desc}</p>
                </div>
              </div>
              <div className={cn(
                'rounded-2xl border-2xl border-gray-200 dark:border-dark-400 bg-gray-50 dark:bg-dark-200/50 border-gray-200 dark:border-dark-400 group-hover:scale-[1.02] dark:scale-[1.05]">
                <feature.icon className="h-7 w-7 text-gray-400 dark:text-dark-500" />
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{feature.title}</h3>
                <p className="text-xs text-gray-500 dark:text-muted mt-1">{feature.desc}</p>
              </div>
              <div className={cn(
                'rounded-2xl border-2xl border-2xl border-gray-200 dark:border-dark-400 bg-gray-50 dark:bg-dark-200/50 border-gray-200 dark:border-dark-400 group-hover:scale-[1.02] dark:scale-[1.05]',
              )}
              <div className={cn(
                'rounded-2xl border-2xl border-2xl border-gray-200 dark:border-dark-400 bg-gray-50 dark:bg-dark-200/50 border-gray-200 dark:border-dark-400 group-hover:scale-[1.02]",
              )}>
                <feature.icon className="h-7 w-7 text-gray-400 dark:text-dark-500" />
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{feature.title}</h3>
                <p className="text-xs text-gray-500 dark:text-muted mt-1">{feature.desc}</p>
              </div>
              <div className={cn(
                'rounded-2xl border-2xl border-2xl border-gray-200 dark:border-dark-400 bg-gray-50 dark:bg-dark-200/50 border-gray-200 dark:border-dark-400 group-hover:scale-[1.02]',
              )}>
                <feature.icon className="h-7 w-7 text-gray-400 dark:text-dark-500" />
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{feature.title}</h3>
                <p className="text-xs text-gray-500 dark:text-muted mt-1.5">{feature.desc}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-28 bg-white dark:bg-dark-50/30 border-t border-gray-200 dark:border-dark-400">
        <div className="relative overflow-hidden mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="pointer-events-none absolute inset-0 z-0">
            <div className="absolute top-0 left-0 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-brand-100/60 dark:bg-brand-500/8 blur-[100px]" />
          </div>
          <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex items-center justify-center gap-3 mb-8">
              <span className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-3 py-1.5 text-xs font-bold text-white shadow-glow-brand">
                <Shield className="h-4 w-4 text-white" />
                Escrow Protected
              </span>
            </div>
            <p className="mt-6 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400 max-w-lg mx-auto">
                Secure escrow marketplace for buying, selling, and renting in Nigeria.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-dark-400 bg-gray-50 dark:bg-dark-50/30 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <Link to="/" className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600">
                  <Shield className="h-4 w-4 text-white" />
                </div>
                <span className="font-display text-lg font-bold text-gray-900 dark:text-white">
                  Tether<span className="text-brand-600 dark:text-brand-400" />NG
                </span>
              </Link>
              <p className="mt-4 text-sm leading-relaxed text-gray-500 dark:text-muted">
                Nigeria's most trusted property marketplace with secure escrow transactions.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Platform</h4>
              <ul className="mt-4 flex flex-col gap-2.5">
                <Link to="/listings" className="text-sm text-gray-500 dark:text-muted hover:text-gray-900 dark:hover:text-white transition-colors">Browse Listings</Link>
                <Link to="/pricing" className="text-sm text-gray-500 dark:text-muted hover:text-gray-900 dark:hover:text-white transition-colors">Pricing</Link>
                <Link to="/how-it-works" className="text-sm text-gray-500 dark:text-muted hover:text-gray-900 dark:hover:text-white transition-colors">How It Works</Link>
                <Link to="/verification" className="text-sm text-gray-500 dark:text-muted hover:text-gray-900 dark:hover:text-white transition-colors">Get Verified</Link>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Company</h4>
              <ul className="mt-4 flex flex flex-col gap-2.5">
                <Link to="/about" className="text-sm text-gray-500 dark:text-muted hover:text-gray-900 dark:hover:text-white transition-colors">About Us</Link>
                <Link to="/contact" className="text-sm text-gray-500 dark:text-muted hover:text-gray-900 dark:hover:text-white transition-colors">Contact</Link>
                <Link to="/careers" className="text-sm text-gray-500 dark:text-muted hover:text-gray-900 dark:hover:text-white transition-colors">Careers</Link>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Legal</h4>
              <ul className="mt-4 flex flex flex-col gap-2.5">
                <Link to="/privacy" className="text-sm text-gray-500 dark:text-muted hover:text-gray-900 dark:hover:text-white transition-colors">Privacy Policy</Link>
                <Link to="/terms" className="text-sm text-gray-500 dark:text-muted hover:text-gray-900 dark:hover:text-white transition-colors">Terms of Service</Link>
                <Link to="/refund" className="text-sm text-gray-500 dark:text-muted hover:text-gray-900 dark:hover:text-white transition-colors">Refund Policy</Link>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Legal</h4>
              <ul className="mt-4 flex flex flex-col gap-2.5">
                <Link to="/about" className="text-sm text-gray-500 dark:text-muted hover:text-gray-900 dark:hover:text-white transition-colors">About Us</Link>
                <Link to="/contact" className="text-sm text-gray-500 dark:text-muted hover:text-gray-900 dark:hover:text-white transition-colors">Contact</Link>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Technical</h4>
              <ul className="mt-4 flex flex flex-col gap-2.5">
                <Link to="/listings" className="text-sm text-gray-500 dark:text-muted hover:text-gray-900 dark:hover:text-white transition-colors">Browse Listings</Link>
                <Link to="/pricing" className="text-sm text-gray-500 dark:text-muted hover:text-gray-900 dark:hover:text-white transition-colors">Pricing</Link>
                <Link to="/verification" className="text-sm text-gray-500 dark:text-muted hover:text-gray-900 dark:hover:text-white transition-colors">Verification</Link>
              </ul>
            </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Legal</h4>
              <ul className="mt-4 flex flex flex-col gap-2.5">
                <Link to="/privacy" className="text-sm text-gray-500 dark:text-muted hover:text-gray-900 dark:hover:text-white transition-colors">Privacy Policy</Link>
                <Link to="/terms" className="text-sm text-gray-500 dark:text-muted hover:text-gray-900 dark:hover:text-white transition-colors">Terms of Service</Link>
                <Link to="/refund" className="text-sm text-gray-500 dark:text-muted hover:text-gray-900 dark:hover:text-white transition-colors">Refund Policy</Link>
              </ul>
            </div>
          </div>
          <div className="mt-10 border-t border-gray-200 dark:border-dark-400 pt-6 text-center">
            <p className="text-xs text-gray-400 dark:text-muted">
              &copy; {new Date().getFullYear()} TetherNG. All rights reserved.
            </p>
          </div>
        </div>
      </section>
    </div>
  </div>
  );
}
