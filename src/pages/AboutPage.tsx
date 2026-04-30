import { Link } from 'react-router-dom';
import { Shield, Users, Lock, Eye, TrendingUp, Building2, Star } from 'lucide-react';

const STATS = [
  { label: 'Active Listings', value: '12,400+', icon: Building2 },
  { label: 'Verified Agents', value: '3,200+', icon: Users },
  { label: 'Secured Transactions', value: '₦8.7B+', icon: Lock },
  { label: 'Happy Clients', value: '9,100+', icon: TrendingUp },
  { label: 'Nigerian States', value: '24 states', icon: Eye },
];

const TEAM = [
  { name: 'Adewale Ogunwabi', role: 'Founder & CEO', image: 'https://i.pravatar.cc/seed/tetherng-ceo/80/80.jpg' },
  { name: 'Chidinma Eze', role: 'CTO & Co-Founder', image: 'https://i.pravatar.cc/seed/tetherno-cto/80/80.jpg' },
  { name: 'Blessing Udo', role: 'Head of Operations', image: 'https://i.pravatar.cc/seed/tetherng-ops/80/80.jpg' },
];

const VALUES = [
  { title: 'Transparency First', desc: 'Every transaction is visible to both parties in real-time. No hidden fees, no surprises.' },
  { title: 'Nigerian-First', desc: 'Built for the Nigerian market with Naira-based pricing, BVN verification, and local agent networks.' },
  { title: 'Security-First Architecture', desc: 'Bank-grade escrow infrastructure with encrypted data and regulated by Nigerian law.' },
  { title: 'Agent Empowerment', desc: 'Tools that help agents close more deals with verified badges and priority ranking.' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark">
      {/* Hero */}
      <section className="border-b border-gray-200 dark:border-dark-400 bg-white dark:bg-dark-50/50 py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="font-display text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
            About Tether<span className="text-brand-600 dark:text-brand-400">NG</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            We're building the trust layer Nigerian real estate has been missing — one escrow transaction at a time.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-gray-200 dark:border-dark-400 bg-white dark:bg-dark-50/50 py-14">
        <div className="mx-auto grid max-w-5xl grid grid-cols-2 sm:grid-cols-5 gap-6 px-4 sm:px-6 lg:px-8">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <stat.icon className="h-7 w-7 text-brand-600 dark:text-brand-400 mx-auto" />
              <p className="mt-2 font-display text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">{stat.value}</p>
              <p className="text-xs text-muted sm:text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Problem → Solution → Values → Team */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-heading">Why We Built TetherNG</h2>
            <p className="mt-2 text-muted max-w-2xl mx-auto">
              The problem was clear. Our approach is deliberate — solve the trust gap, not add more features.
            </p>
          </div>

          {/* Problem → Solution */}
          <div className="space-y-8">
            <div className="card-hover flex gap-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-50 dark:bg-danger/5 border border-red-200 dark:border-danger/20">
                <span className="font-display text-3xl font-black text-red-500 dark:text-danger">!</span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">The Problem</h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  70% of Nigerian renters have lost money to fake property listings. Agents can't prove they're legitimate. The market has zero trust.
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <ArrowRight className="h-8 w-8 text-gray-300 dark:text-dark-500" />
            </div>
            <div className="card-hover flex gap-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-50 dark:bg-brand-500/10 border border-brand-200 dark:border-brand-500/20">
                <Shield className="h-6 w-6 text-brand-600 dark:text-brand-400" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Our Solution</h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  Escrow that holds funds. Verification that proves identity. A dispute system when things go wrong. Transparency that builds confidence.
                </p>
              </div>
            </div>
          </div>

          {/* Values */}
          <div className="grid sm:grid-cols-2 gap-6">
            {VALUES.map((item) => (
              <div key={item.title} className="card-hover flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 dark:bg-brand-500/10 border border-brand-200 dark:border-brand-500/20">
                  <Shield className="h-5 w-5 text-brand-600 dark:text-brand-400" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white">{item.title}</h3>
                  <p className="mt-1 text-xs text-gray-600 dark:text-gray-400 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="border-t border-gray-200 dark:border-dark-400 bg-white dark:bg-dark-50/30 py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="badge-verified mb-3 inline-flex"><CheckCircle2 className="h-3 w-3" /> Backed by real people</span>
            <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white">Our Team</h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {TEAM.map((member) => (
              <div key={member.name} className="card-hover text-center">
                <img src={member.image} alt={member.name} className="mx-auto h-20 w-20 rounded-2xl object-cover border-2 border-gray-200 dark:border-dark-400 mb-4" />
                <h3 className="text-sm font-bold text-gray-900 dark:text-white">{member.name}</h3>
                <p className="text-xs font-semibold text-brand-600 dark:text-brand-400 mt-0.5">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-gray-200 dark:border-dark-400 bg-gray-50 dark:bg-dark/30 py-16 sm:py-24">
        <div className="mx-auto max-w-3xl text-center px-4 sm:px-6 lg:px-8">
          <h2 className="section-heading">Join the Mission</h2>
          <p className="mt-2 text-muted max-w-xl mx-auto">
            Whether you're a tenant looking for safety or an agent looking for more leads — TetherNG has a spot for you.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup" className="btn-primary px-8 py-3.5 text-base">
              Get Started <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/pricing" className="btn-gold px-8 py-3.5 text-base">
              View Plans <Star className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="border-t border-gray-200 dark:border-dark-400 bg-white dark:bg-dark-50/30 py-16 sm:py-24">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
          <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white">Contact Us</h2>
          <p className="mt-2 text-muted">Have a question or partnership inquiry? Reach out — we respond within 24 hours.</p>
        </div>

        <div className="mx-auto max-w-2xl mt-10 space-y-4">
          <div className="card-hover flex items-center gap-4 p-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 dark:bg-brand-500/10 border border-brand-200 dark:border-brand-500/20">
              <Shield className="h-6 w-6 text-brand-600 dark:text-brand-400" />
            </div>
            <div className="text-left flex-1">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white">Email</h3>
              <a href="mailto:hello@tether.ng" className="text-sm text-brand-600 dark:text-brand-400 hover:underline mt-1 inline-block">
                hello@tether.ng
              </a>
            </div>
          </div>

          <div className="card-hover flex items-center gap-4 p-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 dark:bg-dark-200 border border-gray-200 dark:border-dark-400">
              <Phone className="h-6 w-6 text-gray-500 dark:text-muted" />
            </div>
            <div className="text-left flex-1">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white">Phone</h3>
              <a href="tel:+2348012345678" className="text-sm text-brand-600 dark:text-brand-400 hover:underline mt-1 inline-block">
                +234 801 234 5678
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Social proof */}
      <section className="py-16 sm:py-24 bg-gray-50 dark:bg-dark/30">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="badge-verified mb-3 inline-flex"><CheckCircle2 className="h-3 w-3" /> Trusted by thousands</span>
            <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white sm:text-3xl">
              Backed by real users
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              { icon: '👤', label: 'Active Users', value: '2,847', color: 'text-brand-600 dark:text-brand-400' },
              { icon: '🏠', label: 'Properties', value: '12,400+', color: 'text-gold-400' },
              { icon: '🔒', label: 'Escrow Transactions', value: '4,312', color: 'text-brand-600 dark:text-brand-400' },
              { icon: '⭐', label: '5-Star Reviews', value: '1,847', color: 'text-amber-500' },
            ].map((item) => (
              <div key={item.label} className="card-hover text-center p-5">
                <p className="font-display text-2xl font-black text-gray-900 dark:text-white">{item.value}</p>
                <p className="text-xs text-muted mt-0.5">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <div className="border-t border-gray-200 dark:border-dark-400 bg-white dark:bg-dark-50/30 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-gray-100 dark:border-dark-400 pb-4 mb-8">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600">
                <Shield className="h-4 w-4 text-white" />
              </div>
              <span className="font-display text-lg font-bold text-gray-900 dark:text-white">
                Tether<span className="text-brand-600 dark:text-brand-400">NG</span>
              </span>
            </Link>
            <p className="text-xs text-gray-400 dark:text-dark-500">© {new Date().getFullYear()} TetherNG. All rights reserved.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
