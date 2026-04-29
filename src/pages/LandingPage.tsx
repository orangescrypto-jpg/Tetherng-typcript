import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Shield, Star, Rocket, Flame, CheckCircle2,
  ArrowRight, Search, Building2, Users, Lock,
  TrendingUp, Eye, ChevronDown, Menu, X,
} from 'lucide-react';
import { cn } from '@/utils/cn';
import { formatCurrencyShort } from '@/utils/formatCurrency';

/* ─── Dummy data for visual fidelity ─── */
const FEATURED_LISTINGS = [
  {
    id: '1',
    title: 'Modern 3-Bedroom Duplex in Lekki Phase 1',
    location: 'Lekki, Lagos',
    price: 8500000,
    priceLabel: 'per year',
    image: 'https://picsum.photos/seed/tether-lekki/600/400.jpg',
    beds: 3,
    baths: 4,
    boostType: 'featured' as const,
    isPropertyVerified: true,
    agentVerified: true,
    viewsCount: 1247,
  },
  {
    id: '2',
    title: 'Luxury 2-Bed Apartment — Banana Island',
    location: 'Ikoyi, Lagos',
    price: 12000000,
    priceLabel: 'per year',
    image: 'https://picsum.photos/seed/tether-ikoyi/600/400.jpg',
    beds: 2,
    baths: 2,
    boostType: 'top_placement' as const,
    isPropertyVerified: true,
    agentVerified: true,
    viewsCount: 2103,
  },
  {
    id: '3',
    title: 'Spacious 4-Bed Terrace with Boys Quarter',
    location: 'Gwarinpa, Abuja',
    price: 4500000,
    priceLabel: 'per year',
    image: 'https://picsum.photos/seed/tether-abuja/600/400.jpg',
    beds: 4,
    baths: 5,
    boostType: 'urgent' as const,
    isPropertyVerified: false,
    agentVerified: true,
    viewsCount: 876,
  },
];

const STATS = [
  { label: 'Active Listings', value: '12,400+', icon: Building2 },
  { label: 'Verified Agents', value: '3,200+', icon: Users },
  { label: 'Secured Transactions', value: '₦8.7B+', icon: Lock },
  { label: 'Happy Tenants', value: '9,100+', icon: TrendingUp },
];

const TRUST_FEATURES = [
  {
    icon: Shield,
    title: 'Escrow Protection',
    description: 'Your rent is held securely until you move in and confirm everything is right. No more lost funds.',
  },
  {
    icon: CheckCircle2,
    title: 'BVN Verified Agents',
    description: 'Every agent on TetherNG has passed identity verification. Know exactly who you\'re dealing with.',
  },
  {
    icon: Building2,
    title: 'Property Verification',
    description: 'We physically verify properties before they get the green badge. What you see is what you get.',
  },
  {
    icon: Eye,
    title: 'Transparent Process',
    description: 'Track every step of your transaction in real-time. From deposit to move-in, nothing is hidden.',
  },
];

/* ─── Component ─── */
export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchLocation, setSearchLocation] = useState('');

  return (
    <div className="min-h-screen bg-surface-0">
      {/* ─── Navigation ─── */}
      <header className="glass fixed top-0 left-0 right-0 z-50 border-b border-surface-300/50">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-500">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <span className="font-display text-xl font-bold text-white">
              Tether<span className="text-brand-400">NG</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-8 md:flex">
            <a href="#listings" className="text-sm font-medium text-muted transition-colors hover:text-white">Listings</a>
            <a href="#how-it-works" className="text-sm font-medium text-muted transition-colors hover:text-white">How It Works</a>
            <a href="#pricing" className="text-sm font-medium text-muted transition-colors hover:text-white">Pricing</a>
            <Link to="/login" className="btn-outline text-sm">Sign In</Link>
            <Link to="/signup" className="btn-primary text-sm">Get Started</Link>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-muted hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="animate-slide-up border-t border-surface-300/50 bg-surface-50/95 backdrop-blur-xl md:hidden">
            <div className="flex flex-col gap-1 px-4 py-4">
              <a href="#listings" className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted hover:bg-surface-200 hover:text-white" onClick={() => setMobileMenuOpen(false)}>Listings</a>
              <a href="#how-it-works" className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted hover:bg-surface-200 hover:text-white" onClick={() => setMobileMenuOpen(false)}>How It Works</a>
              <a href="#pricing" className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted hover:bg-surface-200 hover:text-white" onClick={() => setMobileMenuOpen(false)}>Pricing</a>
              <div className="mt-2 flex flex-col gap-2 border-t border-surface-300/50 pt-3">
                <Link to="/login" className="btn-outline text-sm" onClick={() => setMobileMenuOpen(false)}>Sign In</Link>
                <Link to="/signup" className="btn-primary text-sm" onClick={() => setMobileMenuOpen(false)}>Get Started</Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* ─── Hero Section ─── */}
      <section className="relative overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28">
        {/* Background effects */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-brand-500/8 blur-[120px]" />
          <div className="absolute top-40 right-0 h-[300px] w-[400px] rounded-full bg-gold-400/5 blur-[100px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Trust badges row */}
          <div className="mb-8 flex flex-wrap items-center justify-center gap-3">
            <span className="badge-verified"><CheckCircle2 className="h-3 w-3" /> BVN Verified Agents</span>
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-brand-500/10 px-2.5 py-1 text-xs font-semibold text-brand-400 border border-brand-500/20">
              <Lock className="h-3 w-3" /> Escrow Protected
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-gold-400/10 px-2.5 py-1 text-xs font-semibold text-gold-400 border border-gold-400/20">
              <Star className="h-3 w-3" /> Premium Listings
            </span>
          </div>

          {/* Heading */}
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Rent With Confidence.{' '}
              <span className="bg-gradient-to-r from-brand-400 to-brand-300 bg-clip-text text-transparent">
                Pay With Escrow.
              </span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted sm:text-xl">
              TetherNG connects you to verified agents and holds your rent securely until you're satisfied.
              No more scams, no more guesswork — just safe, transparent rentals.
            </p>
          </div>

          {/* Search bar */}
          <div className="mx-auto mt-10 max-w-2xl">
            <div className="flex flex-col gap-3 rounded-2xl border border-surface-300 bg-surface-100 p-3 shadow-card sm:flex-row sm:items-center">
              <div className="flex flex-1 items-center gap-3 rounded-xl bg-surface-50 px-4 py-3">
                <Search className="h-5 w-5 text-muted shrink-0" />
                <input
                  type="text"
                  placeholder="Search properties, locations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent text-sm text-white placeholder:text-muted outline-none"
                />
              </div>
              <div className="relative flex-1 sm:max-w-[200px]">
                <select
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="input-field appearance-none pr-10"
                >
                  <option value="">All Locations</option>
                  <option value="lagos">Lagos</option>
                  <option value="abuja">Abuja</option>
                  <option value="port-harcourt">Port Harcourt</option>
                  <option value="ibadan">Ibadan</option>
                </select>
                <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-muted" />
              </div>
              <Link
                to="/listings"
                className="btn-primary flex items-center justify-center gap-2 px-6 py-3 sm:py-3.5"
              >
                <Search className="h-4 w-4" />
                Search
              </Link>
            </div>
          </div>

          {/* Agent CTA */}
          <div className="mt-8 text-center">
            <p className="text-sm text-muted">
              Are you an agent?{' '}
              <Link to="/pricing" className="font-semibold text-gold-400 hover:text-gold-300 transition-colors">
                Boost your listings and get more leads <ArrowRight className="inline h-3.5 w-3.5" />
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* ─── Stats Bar ─── */}
      <section className="border-y border-surface-300/50 bg-surface-50/50">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-10 sm:px-6 md:grid-cols-4 lg:px-8">
          {STATS.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center text-center gap-2">
              <stat.icon className="h-6 w-6 text-brand-400" />
              <span className="font-display text-2xl font-bold text-white sm:text-3xl">{stat.value}</span>
              <span className="text-xs font-medium text-muted sm:text-sm">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Featured Listings ─── */}
      <section id="listings" className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="section-heading">Featured Properties</h2>
              <p className="mt-2 text-muted">Handpicked premium listings from verified agents</p>
            </div>
            <div className="flex gap-2">
              <span className="badge-featured cursor-pointer"><Star className="h-3 w-3" /> Featured</span>
              <span className="badge-urgent cursor-pointer"><Flame className="h-3 w-3" /> Urgent</span>
            </div>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURED_LISTINGS.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link to="/listings" className="btn-outline inline-flex items-center gap-2 px-8 py-3">
              View All Properties <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── How It Works ─── */}
      <section id="how-it-works" className="border-y border-surface-300/50 bg-surface-50/30 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="section-heading">How TetherNG Works</h2>
            <p className="mt-3 text-muted max-w-2xl mx-auto">
              A simple, secure process that protects both tenants and agents from start to finish.
            </p>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              { step: '01', title: 'Find Your Property', desc: 'Browse verified listings from trusted agents across Nigeria.', color: 'text-brand-400' },
              { step: '02', title: 'Start Escrow', desc: 'Initiate a secure transaction — your money goes into escrow, not to the agent directly.', color: 'text-gold-400' },
              { step: '03', title: 'Inspect & Confirm', desc: 'Visit the property, verify it matches the listing, and confirm satisfaction.', color: 'text-brand-300' },
              { step: '04', title: 'Funds Released', desc: 'Once you confirm, payment is released to the agent. Everyone wins.', color: 'text-success' },
            ].map((item) => (
              <div key={item.step} className="card-hover group relative text-center">
                <span className={cn('font-display text-5xl font-black opacity-20 transition-opacity group-hover:opacity-40', item.color)}>
                  {item.step}
                </span>
                <h3 className="mt-3 text-lg font-bold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Trust Features ─── */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="section-heading">Why Trust TetherNG?</h2>
            <p className="mt-3 text-muted max-w-2xl mx-auto">
              We built every feature around one question: how do we make renting in Nigeria actually safe?
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {TRUST_FEATURES.map((feature) => (
              <div key={feature.title} className="card-hover flex gap-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-500/10 border border-brand-500/20">
                  <feature.icon className="h-6 w-6 text-brand-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{feature.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Agent Pricing Teaser ─── */}
      <section id="pricing" className="border-y border-surface-300/50 bg-surface-50/30 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="badge-featured mb-4 inline-flex"><Star className="h-3 w-3" /> For Agents & Landlords</span>
            <h2 className="section-heading">Grow Your Business on TetherNG</h2>
            <p className="mt-3 text-muted max-w-2xl mx-auto">
              From free listings to premium subscriptions — choose the plan that fits your pipeline.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { name: 'Free', price: '₦0', period: 'forever', cta: 'Get Started', featured: false, features: ['3 active listings', 'Basic visibility', 'Standard support'] },
              { name: 'Basic', price: '₦5K', period: '/month', cta: 'Upgrade', featured: false, features: ['15 listings', 'Verified badge', 'Email support', 'Basic analytics'] },
              { name: 'Pro', price: '₦20K', period: '/month', cta: 'Go Pro', featured: true, features: ['50 listings', 'Priority ranking', 'Tenant leads access', 'Advanced analytics', 'Dedicated support'] },
              { name: 'Premium', price: '₦50K', period: '/month', cta: 'Go Premium', featured: false, features: ['Unlimited listings', 'Top ranking', 'Exclusive leads', '1 free featured/month', 'Account manager'] },
            ].map((plan) => (
              <div
                key={plan.name}
                className={cn(
                  'rounded-2xl border p-6 flex flex-col transition-all duration-300',
                  plan.featured
                    ? 'pricing-popular scale-[1.02]'
                    : 'border-surface-300 bg-surface-100 hover:border-surface-400',
                )}
              >
                {plan.featured && (
                  <span className="badge-featured self-start mb-3"><Star className="h-3 w-3" /> Most Popular</span>
                )}
                <div>
                  <h3 className="text-lg font-bold text-white">{plan.name}</h3>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="font-display text-3xl font-bold text-white">{plan.price}</span>
                    <span className="text-sm text-muted">{plan.period}</span>
                  </div>
                </div>
                <ul className="mt-6 flex flex-col gap-3 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-muted">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/pricing"
                  className={cn(
                    'mt-6 w-full text-center text-sm font-semibold py-3 rounded-xl transition-all',
                    plan.featured
                      ? 'btn-gold'
                      : 'btn-outline hover:border-brand-500',
                  )}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA Section ─── */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl border border-surface-300 bg-surface-100 p-10 sm:p-16 text-center">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -top-20 left-1/2 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-brand-500/10 blur-[100px]" />
            </div>
            <div className="relative">
              <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
                Ready to Rent Safely?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-muted">
                Join thousands of Nigerians who've found their next home through TetherNG's secure escrow marketplace.
              </p>
              <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Link to="/signup" className="btn-primary px-8 py-3.5 text-base">
                  Create Free Account <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/pricing" className="btn-gold px-8 py-3.5 text-base">
                  Boost Your Listing <Rocket className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="border-t border-surface-300/50 bg-surface-50/30 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <Link to="/" className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500">
                  <Shield className="h-4 w-4 text-white" />
                </div>
                <span className="font-display text-lg font-bold text-white">
                  Tether<span className="text-brand-400">NG</span>
                </span>
              </Link>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                Nigeria's most trusted rental marketplace with secure escrow transactions.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Platform</h4>
              <ul className="mt-4 flex flex-col gap-2.5">
                <li><Link to="/listings" className="text-sm text-muted hover:text-white transition-colors">Browse Listings</Link></li>
                <li><Link to="/pricing" className="text-sm text-muted hover:text-white transition-colors">Pricing</Link></li>
                <li><Link to="/how-it-works" className="text-sm text-muted hover:text-white transition-colors">How It Works</Link></li>
                <li><Link to="/verification" className="text-sm text-muted hover:text-white transition-colors">Get Verified</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Company</h4>
              <ul className="mt-4 flex flex-col gap-2.5">
                <li><Link to="/about" className="text-sm text-muted hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="/contact" className="text-sm text-muted hover:text-white transition-colors">Contact</Link></li>
                <li><Link to="/careers" className="text-sm text-muted hover:text-white transition-colors">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Legal</h4>
              <ul className="mt-4 flex flex-col gap-2.5">
                <li><Link to="/privacy" className="text-sm text-muted hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="text-sm text-muted hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link to="/refund" className="text-sm text-muted hover:text-white transition-colors">Refund Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-10 border-t border-surface-300/50 pt-6 text-center">
            <p className="text-xs text-muted">&copy; {new Date().getFullYear()} TetherNG. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ─── Listing Card Sub-component ─── */
function ListingCard({ listing }: { listing: typeof FEATURED_LISTINGS[number] }) {
  const boostConfig: Record<string, { wrapper: string; badge: { type: string } | null }> = {
    featured: { wrapper: 'listing-featured', badge: { type: 'featured' } },
    top_placement: { wrapper: 'listing-pinned', badge: { type: 'pinned' } },
    urgent: { wrapper: 'listing-urgent', badge: { type: 'urgent' } },
  };

  const config = boostConfig[listing.boostType] || { wrapper: 'card-hover', badge: null };
  const hasBoost = listing.boostType === 'featured' || listing.boostType === 'top_placement' || listing.boostType === 'urgent';

  return (
    <div className={cn(config.wrapper, 'group cursor-pointer')}>
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden rounded-xl">
        <img
          src={listing.image}
          alt={listing.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Badges stack */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          {config.badge?.type === 'featured' && (
            <span className="badge-featured"><Star className="h-3 w-3" /> Featured</span>
          )}
          {config.badge?.type === 'pinned' && (
            <span className="inline-flex items-center gap-1 rounded-lg bg-brand-500/90 px-2.5 py-1 text-xs font-bold text-white"><Rocket className="h-3 w-3" /> Top of Search</span>
          )}
          {config.badge?.type === 'urgent' && (
            <span className="badge-urgent"><Flame className="h-3 w-3" /> Urgent</span>
          )}
          {listing.isPropertyVerified && (
            <span className="badge-verified"><CheckCircle2 className="h-3 w-3" /> Verified</span>
          )}
        </div>

        {/* Price overlay */}
        <div className="absolute bottom-3 left-3">
          <span className="rounded-lg bg-black/60 backdrop-blur-sm px-3 py-1.5 text-sm font-bold text-white">
            {formatCurrencyShort(listing.price)}
            <span className="ml-1 text-xs font-normal text-white/70">{listing.priceLabel}</span>
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="mt-4 px-1 pb-1">
        <h3 className="font-semibold text-white leading-snug line-clamp-2 group-hover:text-brand-300 transition-colors">
          {listing.title}
        </h3>
        <p className="mt-1.5 text-sm text-muted">{listing.location}</p>
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs text-muted">
            <span>{listing.beds} Bed{listing.beds > 1 ? 's' : ''}</span>
            <span className="h-1 w-1 rounded-full bg-surface-400" />
            <span>{listing.baths} Bath{listing.baths > 1 ? 's' : ''}</span>
          </div>
          {hasBoost && (
            <span className="text-[10px] font-medium text-gold-400">
              {listing.viewsCount.toLocaleString()} views
            </span>
          )}
        </div>

        {/* Agent verified indicator */}
        {listing.agentVerified && (
          <div className="mt-3 flex items-center gap-1.5 border-t border-surface-300/50 pt-3">
            <div className="h-5 w-5 rounded-full bg-brand-500/20 flex items-center justify-center">
              <CheckCircle2 className="h-3 w-3 text-success" />
            </div>
            <span className="text-xs text-muted">Verified Agent</span>
          </div>
        )}
      </div>
    </div>
  );
}
