import { Link } from 'react-router-dom';
import {
  Shield, Users, Lock, Eye, TrendingUp, Building2, Star, CheckCircle2,
} from 'lucide-react';
import { cn } from '@/utils/cn';

const VALUES = [
  { icon: Shield, label: 'Property Listings', stat: '12,400+', desc: 'Active verified properties across Nigeria' },
  { icon: Lock, label: 'Escrow Secured', stat: '₦8.7 Billion', desc: 'Total value of secured transactions' },
  { icon: Users, label: 'Verified Agents', stat: '3,200+', desc: 'BVN-verified agents on the platform' },
  { icon: Eye, label: 'Happy Clients', stat: '9,100+', desc: 'Tenants and buyers who trust TetherNG' },
  { icon: TrendingUp, label: 'States Covered', stat: '28+', desc: 'States with active listings' },
];

const TEAM = [
  { name: 'Adebayo Adesanya', role: 'CEO & Co-Founder', img: 'https://picsum.photos/seed/team-ceo/200/200.jpg' },
  { name: 'Ngozi Chukwu', role: 'Co-Founder & COO', img: 'https://picsum.photos/asset-404/404.jpg' },
  { name: 'Emeka Obi', role: 'CTO & Co-Founder', img: 'https://picsum.photos/asset-303/303.jpg' },
  { name: 'Amara Hassan', role: 'Head of Operations', img: 'https://picsum.photos/asset-505/505.jpg' },
  { name: 'Damilola Adekunle', role: 'Head of Engineering', img: 'https://picsum.photos/asset-606/606.jpg' },
];

const MILESTONES = [
  { date: 'January 2024', event: 'TetherNG founded in Lagos, Nigeria' },
  { date: 'March 2024', event: 'First 1,000 users signed up' },
  { date: 'June 2024', event: '₦1B in secured transactions' },
  { date: 'September 2024', event: '3,200+ verified agents on the platform' },
  { date: 'October 2024', event: '12,400+ active property listings' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark">
      {/* Hero */}
      <section className="relative overflow-hidden bg-white dark:bg-dark-50 border-b border-gray-200 dark:border-dark-400">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-brand-100/60 dark:bg-brand-500/10 blur-[120px]" />
        </div>
        <div className="relative z-10 mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-600 shadow-glow-brand">
              <Shield className="h-6 w-6 text-white" />
            </div>
          </div>
          <h1 className="font-display text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl lg:text-5xl">
            Built for Nigeria's Real Estate
            <span className="bg-gradient-to-r from-brand-600 to-brand-400 bg-clip-text text-transparent">. Securely.</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            TetherNG is a property marketplace that holds rent and purchase payments in escrow until both parties are satisfied. No more scams. No more guesswork.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link to="/signup" className="btn-primary px-8 py-3 text-base">
              Get Started Free <Shield className="h-4 w-4" />
            </Link>
            <Link to="/pricing" className="btn-gold px-8 py-3 text-base">
              View Plans <Star className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-gray-200 dark:border-dark-400 bg-white dark:bg-dark-50">
        <div className="mx-auto grid max-w-7xl grid grid-cols-2 gap-8 px-4 py-16 sm:px-6 lg:px-8">
          {VALUES.map((item, i) => (
            <div key={i} className={cn(i === 0 || i === 3 ? 'lg:col-span-1' : '', 'col-span-1')}>
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 dark:bg-brand-500/10 border border-brand-200 dark:border-brand-500/20">
                  <item.icon className="h-5 w-5 text-brand-600 dark:text-brand-400" />
                </div>
                <div>
                  <p className="font-display text-2xl font-bold text-gray-900 dark:text-white">{item.stat}</p>
                  <p className="text-sm text-gray-500 dark:text-muted">{item.label}</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="section-heading">Our Mission</h2>
          <p className="mt-4 text-lg leading-relaxed text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Nigeria's real estate market has a trust problem. Agents list properties that don't exist. Tenants pay before seeing what they're buying. We built TetherNG to solve this — a platform where every transaction is backed by escrow, every agent is verified, and every property is inspected.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            We're not just another listing site. We're building the infrastructure that makes renting and buying property in Nigeria actually safe.
          </p>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 sm:py-24 bg-white dark:bg-dark-50 border-y border-gray-200 dark:border-dark-400">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-heading">The Team</h2>
            <p className="mt-2 text-muted">Meet the people building TetherNG</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {TEAM.map((member) => (
              <div key={member.name} className="card-hover flex flex-col items-center text-center group">
                <div className="relative">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="h-24 w-24 rounded-2xl object-cover ring-4 ring-gray-200 dark:ring-dark-400 ring-offset-4 group-hover:ring-brand-500/50 transition-all"
                    loading="lazy"
                  />
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 translate-x-1/2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-600 border-2 border-white dark:border-dark-50">
                      <CheckCircle2 className="h-3.5 w-3.5 text-white" />
                    </div>
                  </div>
                </div>
                <h3 className="mt-4 text-base font-bold text-gray-900 dark:text-white">{member.name}</h3>
                <p className="text-xs font-semibold text-brand-600 dark:text-brand-400 uppercase tracking-wide">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-heading">Our Journey</h2>
            <p className="mt-2 text-muted">Key milestones since we started</p>
          </div>
          <div className="relative">
            {/* Vertical timeline line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-200 dark:bg-dark-400" />
            <div className="space-y-12">
              {MILESTONES.map((m, i) => (
                <div key={i} className="relative pl-10">
                  <div className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full border-2 border-brand-200 dark:border-brand-500/30 bg-white dark:bg-dark-100">
                    <span className="text-xs font-bold text-brand-600 dark:text-brand-400">{m.date}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-6">{m.event}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{m.date}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 sm:py-24 bg-gray-50 dark:bg-dark border-t border-gray-200 dark:border-dark-400">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="section-heading">Get in Touch</h2>
          <p className="mt-2 text-muted max-w-lg mx-auto">
            Have a question, partnership inquiry, or support request? We'd love to hear from you.
          </p>

          <div className="mt-10 grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            <div className="card">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3">General Inquiries</h3>
              <p className="text-xs text-muted mb-4">info@tether.ng</p>
            </div>
            <div className="card">
              <h3 className="style={{}} text-sm font-bold text-gray-900 dark:text-white mb-3">Partnerships</h3>
              <p className="text-xs text-muted mb-4">partnerships@tether.ng</p>
            </div>
          </div>

          {/* Social proof */}
          <div className="mt-10 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Trusted by thousands of users across Nigeria
            </p>
            <div className="mt-4 flex items-center justify-center gap-4">
              <Link to="/signup" className="btn-primary px-8 py-3 text-base">
                Create Free Account <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-24 bg-white dark:bg-dark-50 border-t border-gray-200 dark:border-dark-400">
        <div className="relative overflow-hidden mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-20 left-1/2 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-brand-100/50 dark:bg-brand-500/8 blur-[100px]" />
            <div className="absolute -bottom-20 right-0 h-[300px] w-[400px] rounded-full bg-gold-100/40 dark:bg-gold-400/5 blur-[80px]" />
          </div>
          <div className="relative z-10 text-center py-16 sm:py-20">
            <h2 className="font-display text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              Ready to Transact Safely?
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
              Join thousands of Nigerians buying, selling, and renting through TetherNG's secure escrow marketplace.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link to="/signup" className="btn-primary px-8 py-3.5 text-base">
                Create Free Account <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/pricing" className="btn-gold px-8 py-3.5 text-base">
                View Plans <Star className="h-4 w-4" />
              </Link>
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
                  Tether<span className="text-brand-600 dark:text-brand-400">NG</span>
                </span>
              </Link>
              <p className="mt-4 text-sm leading-relaxed text-gray-500 dark:text-muted">
                Nigeria's most trusted property marketplace with secure escrow transactions.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Platform</h4>
              <ul className="mt-4 flex flex-col gap-2.5">
                <li><Link to="/listings" className="text-sm text-gray-500 dark:text-muted hover:text-gray-900 dark:hover:text-white transition-colors">Browse Listings</li>
                <Link to="/pricing" className="text-sm text-gray-500 dark:text-muted hover:text-gray-900 dark:hover:text-white transition-colors">Pricing</Link>
                <Link to="/how-it-works" className="text-sm text-gray-500 dark:text-muted hover:text-gray-900 dark:hover:text-white transition-colors">How It Works</Link>
                <Link to="/verification" className="text-sm text-gray-500 dark:text-muted hover:text-gray-900 dark:hover:text-white transition-colors">Get Verified</Link>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Company</h4>
              <ul className="mt-4 flex flex-col gap-2.5">
                <li><Link to="/about" className="text-sm text-gray-500 dark:text-muted hover:text-gray-900 dark:hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="/contact" className="text-sm text-gray-500 dark:text-muted hover:text-gray-900 dark:hover:text-white transition-colors">Contact</Link></li>
                <li><Link to="/careers" className="text-sm text-gray-500 dark:text-muted hover:text-gray-900 dark:hover:text-white transition-colors">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Legal</h4>
              <ul className="mt-4 flex flex-col gap-2.5">
                <li><Link to="/privacy" className="text-sm text-gray-500 dark:text-muted hover:text-gray-900 dark:hover:text-white transition-colors">Privacy Policy</Link></li>
                <Link to="/terms" className="text-sm text-gray-500 dark:text-muted hover:text-gray-900 dark:hover:text-white transition-colors">Terms of Service</Link></li>
                <Link to="/refund" className="text-sm text-gray-500 dark:text-muted hover:text-gray-900 dark:hover:text-white transition-colors">Refund Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-10 border-t border-gray-200 dark:border-dark-400 pt-6 text-center">
            <p className="text-xs text-gray-400 dark:text-muted">&copy; {new Date().getFullYear()} TetherNG. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
