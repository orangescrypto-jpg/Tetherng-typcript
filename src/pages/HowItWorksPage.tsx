import { Link } from 'react-router-dom';
import {
  Shield, Search, Eye, CheckCircle2, ArrowRight, Lock,
} from 'lucide-react';

const STEPS = [
  {
    step: '01',
    title: 'Find Your Property',
    description: 'Browse verified listings from trusted agents across Nigeria. Filter by location, type, price, and more.',
    icon: Search,
  },
  {
    step: '02',
    title: 'Start Escrow',
    description: 'Initiate a secure transaction — your money goes into escrow, not to the agent directly. No upfront risk.',
    icon: Lock,
  },
  {
    step: '03',
    title: 'Inspect & Confirm',
    description: 'Visit the property, verify it matches the listing, and confirm you\'re satisfied before funds are released.',
    icon: Eye,
  },
  {
    step: '04',
    title: 'Funds Released',
    description: 'Once you confirm, payment is released to the agent. Everyone wins. No more lost deposits.',
    icon: CheckCircle2,
  },
];

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark">
      {/* Hero */}
      <section className="border-b border-gray-200 dark:border-dark-400 bg-white dark:bg-dark-50/50 py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mb-6 flex justify-center gap-3">
            <Shield className="h-12 w-12 text-brand-600 dark:text-brand-400" />
          </div>
          <h1 className="font-display text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
            How TetherNG Works
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A simple, secure process that protects both buyers and sellers from start to finish.
          </p>
          <Link to="/listings" className="mt-8 btn-primary px-8 py-3.5 text-base">
            Find a Property <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Steps */}
      <section className="py-16 sm:py-24 bg-white dark:bg-dark-50/30">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step) => (
              <div key={step.step} className="card-hover group relative text-center">
                <span className="font-display text-5xl font-black text-gray-200 dark:text-dark-400 opacity-20 group-hover:opacity-30 transition-opacity">
                  {step.step}
                </span>
                <h3 className="mt-3 text-lg font-bold text-gray-900 dark:text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-500 dark:text-muted">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="section-heading">Without TetherNG vs. Traditional Renting</h2>
            <p className="mt-2 text-muted max-w-2xl mx-auto">
              See how we compare to the traditional rental process.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {/* Traditional */}
            <div className="card p-6 border-red-100 dark:border-danger/20 bg-red-50/30 dark:bg-danger/5">
              <h3 className="text-sm font-bold text-red-700 dark:text-danger">❌ Traditional Process</h3>
              <ul className="mt-4 space-y-3">
                {[
                  'Send money directly to an agent you found online or met in person',
                  'No guarantee the property matches the photos you saw online',
                  'Pay before inspecting — if it\'s fake, your money is gone',
                  'No impartial third party to hold anyone accountable',
                  'Disput resolution is difficult without evidence',
                  'Many tenants lose their full deposit without recourse',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-gray-600 dark:text-gray-400">
                    <span className="text-red-500 dark:text-danger shrink-0 mt-0.5">✕</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* TetherNG */}
            <div className="card p-6 border-green-100 dark:border-success/20 bg-green-50/30 dark:bg-success/5">
              <h3 className="text-sm font-bold text-green-700 dark:text-success">✓ With TetherNG</h3>
              <ul className="mt-4 space-y-3">
                {[
                  'Browse verified agents on a trusted marketplace',
                  'Pay into escrow — money stays safe until you confirm satisfaction',
                  'Inspect the property before releasing funds',
                  'TetherNG holds the money and mediates any disputes',
                  'Full refund if the property doesn\'t match the listing',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-gray-600 dark:text-gray-400">
                    <span className="text-green-600 dark:text-success shrink-0 mt-0.5">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* For Agents CTA */}
      <section className="border-t border-gray-200 dark:border-dark-400 bg-white dark:bg-dark-50/30 py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="section-heading">Built for Agents & Landlords</h2>
          <p className="mt-2 text-muted max-w-xl mx-auto">
            Join thousands of agents who use TetherNG to close deals faster with verified identities and priority visibility.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup" className="btn-primary px-8 py-3.5 text-base">
              Create Free Account <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/pricing" className="btn-gold px-8 py-3.5 text-base">
              View Plans <Star className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-24 bg-gray-50 dark:bg-dark">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="section-heading">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: 'Is TetherNG a real estate agent?',
                a: 'No. TetherNG is a marketplace platform that connects tenants with agents and landlords. We provide the escrow infrastructure to make transactions safe — we don\'t act as an agent ourselves.',
              },
              {
                q: 'How does the escrow actually work?',
                a: 'When you initiate escrow on a property, your full payment goes into a secure account, not to the agent. TetherNG holds the funds until you inspect the property and confirm satisfaction. If anything goes wrong, we can refund you in full.',
              },
              {
                q: 'What happens if the property doesn\'t match the listing?',
                a: 'You can raise a dispute and TetherNG will investigate. We hold the funds during review. If the property is indeed fake or materially different from the listing, you get a full refund.',
              },
              {
                q: 'Who pays the platform fee?',
                a: 'The tenant/buyer pays 1.5% platform fee on top of the property price. This covers escrow infrastructure, BVN verification, and dispute resolution.',
              },
              {
                q: 'Can I cancel an escrow after paying?',
                a: 'You can raise a dispute at any time before confirming satisfaction. Once confirmed, funds are released to the agent. We recommend inspecting thoroughly before confirming.',
              },
              {
                q: 'Is BVN verification safe?',
                a: 'Yes. We use the NIBSS BVN API — we never store your BVN. We only verify that it matches your ID document. The check happens through NIBSS\'s secure API, not on our servers.',
              },
              {
                q: 'What payment methods do you accept?',
                a: 'All Nigerian debit cards (Visa, Mastercard, Verve) via Paystack and Flutterwave. We also support bank transfer for subscription plans.',
              },
              {
                q: 'Can landlords use TetherNG?',
                'Yes! Landlords can list properties directly without an agent. You get all the same features — escrow, verification, and subscription plans.',
              },
              {
                q: 'How long does verification take?',
                a: 'Usually 1-24 hours for BVN check. ID document review takes 1-3 business days. Premium plan subscribers get priority review.',
              },
            ].map((faq, i) => (
              <div key={i} className="card-hover rounded-2xl p-6">
                <button
                  className="w-full text-left"
                  onClick={() => {
                    const el = document.getElementById(`faq-${i}`);
                    if (el) el.classList.toggle('bg-gray-100 dark:bg-dark-200/50');
                  }}
                >
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{faq.q}</h3>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{faq.a}</p>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-gray-200 dark:border-dark-400 bg-white dark:bg-dark-50/30 py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="section-heading">Ready to Transact Safely?</h2>
          <p className="mt-2 text-muted max-w-xl mx-auto">
            Join thousands of Nigerians who trust TetherNG for secure property deals.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup" className="btn-primary px-8 py-3.5 text-base">
              Create Free Account <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/pricing" className="btn-gold px-8 py-3.5 text-base">
              View Plans <Star className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
