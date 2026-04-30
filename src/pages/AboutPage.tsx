import { Link } from 'react-router-dom';
import { Shield, Users, MapPin, CheckCircle2 } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark">
      <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="section-heading text-4xl md:text-5xl">About TetherNG</h1>
          <p className="mt-6 text-lg text-muted max-w-2xl mx-auto">
            Nigeria's most trusted property marketplace. We are on a mission to eliminate fraud and bring transparency to real estate transactions.
          </p>
        </div>

        {/* Mission Statement */}
        <div className="bg-white dark:bg-dark-100 border border-gray-200 dark:border-dark-400 rounded-2xl p-8 mb-16 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-50 dark:bg-brand-500/10 border border-brand-200 dark:border-brand-500/20 mb-6">
            <Shield className="h-8 w-8 text-brand-600 dark:text-brand-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Mission</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
            To completely remove the fear of property scams in Nigeria. We leverage smart escrow technology, strict agent verification, and a community-first approach so that every Naira spent on property is protected until the buyer is fully satisfied.
          </p>
        </div>

        {/* Why TetherNG? */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-12">Why TetherNG?</h2>
          <div className="grid sm:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-green-50 dark:bg-success/10 border border-green-200 dark:border-success/20 mb-4">
                <CheckCircle2 className="h-7 w-7 text-green-600 dark:text-success" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">100% Secure</h3>
              <p className="mt-2 text-sm text-muted">Funds are held safely in escrow until you confirm the property matches the listing.</p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-amber-50 dark:bg-gold-400/10 border border-amber-200 dark:border-gold-400/20 mb-4">
                <Users className="h-7 w-7 text-amber-600 dark:text-gold-400" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Verified Agents</h3>
              <p className="mt-2 text-sm text-muted">Every agent is BVN-verified so you know exactly who you are dealing with.</p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-gray-100 dark:bg-dark-200 border border-gray-200 dark:border-dark-400 mb-4">
                <MapPin className="h-7 w-7 text-gray-500 dark:text-dark-400" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Pan-Nigerian</h3>
              <p className="mt-2 text-sm text-mutedAvailable across all 36 states including Lagos, Abuja, Port Harcourt, and more.</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-brand-50 dark:bg-brand-500/5 border border-brand-200 dark:border-brand-500/20 rounded-2xl p-10">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Ready to transact safely?</h2>
          <p className="text-muted mb-6 max-w-md mx-auto">Join thousands of Nigerians who have found peace of mind using TetherNG.</p>
          <Link to="/signup" className="btn-primary inline-flex items-center gap-2 px-8 py-3.5 text-base">
            Get Started Free <Shield className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
