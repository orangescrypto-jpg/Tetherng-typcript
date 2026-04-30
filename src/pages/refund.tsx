import { Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function RefundPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark">
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-dark-400 bg-white dark:bg-dark-50/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600">
              <Shield className="h-4 w-4 text-white" />
            </div>
            <span className="font-display text-lg font-bold text-gray-900 dark:text-white">Tether<span className="text-brand-600 dark:text-brand-400">NG</span>
            </span>
          </Link>
          <Link to="/login" className="btn-outline text-sm">Sign In</Link>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center mb-10">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 dark:bg-danger/10 border-2 border-red-200 dark:border-danger/20">
            <AlertCircle className="h-8 w-8 text-red-500 dark:text-danger" />
          </div>
          <h1 className="Refund Policy</h1>
          <p className="mt-2 text-muted text-center max-w-lg mx-auto">
            understand the refund policy and how it works before requesting one.
          </p>
        </div>

        {/* Refund policy */}
        <div className="card p-6 space-y-5 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Refund Policy</h2>
          <p className="text-xs text-muted mb-4">
            We want every transaction on TetherNG to be fair and transparent. Here's how our refund policy works.
          </p>
        </div>

        <div className="space-y-4 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          <h3 className="h-5 font-bold text-gray-900 dark:text-white">1. Who Can Request a Refund?</h3>
          <p className="text-gray-600 dark:text-gray-400 mt-1.5">
            <span className="font-semibold text-gray-900 dark:text-white">Tenants</span> can request refunds on escrow transactions within 7 days of confirming satisfaction. This covers:
          </p>
          <ul className="mt-2 space-y-2">
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="h-4 w-4 text-brand-600 dark:text-brand-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Property doesn't match listing</p>
                <p className="text-gray-600 dark:text-gray-400 mt-0.5">
                  The property you received doesn't match what was listed. TetherNG will investigate within 48 hours and resolve it.
                </p>
              </div>
            </li>
            <li className="li className="flex items-start gap-2.5">
              <CheckCircle2 className="h-4 w-4 text-brand-600 dark:text-brand-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Property conditions differ from listing</p>
                <p className="text-gray-600 dark:text-gray-400 mt-0.5">
                  The kitchen is different from what was shown. The listing was modified. We'll verify and fix it.
                </p>
              </div>
            </li>
            <li className="li className="flex items-start gap-2.5">
              <CheckCircle2 className="h-4 w-4 text-brand-600 dark:text-brand-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Property inspection failed</p>
                <p className="text-gray-600 dark:text-gray-400 mt-0.5">
                  The property has significant issues that weren't in the listing. We can't release funds.
                </p>
              </div>
            </li>
            <li className="li className="flex items-start gap-2.5">
              <CheckCircle2 className="h-4 w-4 text-brand-600 dark:text-brand-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Changed your mind?</p>
                <p className="text-gray-600 dark:text-gray-400 mt-0.5">
                  You have 24 hours after confirming to change your decision.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-2.5 text-sm text-gray-600 dark:text-gray-400">
              <CheckCircle2 className="h-4 w-4 text-brand-600 dark:text-brand-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">External marketplace</p>
                <p className="text-gray-600 dark:text-gray-400 mt-0.5">
                  Listed the same property on another platform and want TetherNG to verify it.
                </p>
              </div>
            </li>
            <li className="li className="flex items-start gap-2.5 text-sm text-gray-600 dark:text-gray-400">
              <CheckCircle2 className="h-4 w-4 text-brand-600 dark:text-brand-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Third-party payment</p>
                <p className="text-gray-600 dark:text-gray-400 mt-0.5">
                  If you paid through a third-party platform, that's your business. We don't intervene.
                </p>
              </div>
            </li>
          </ul>

          <div className="mt-8 rounded-2xl border border-gray-200 dark:border-dark-400 bg-gray-50 dark:bg-dark-200/50 p-6 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            <h2 className="h-5 font-bold text-gray-900 dark:text-white">Quick Answers</h2>
            <div className="space-y-3">
              {[
                { q: 'How long do refunds take?', a: 'Refunds are processed within 7 business days. We verify the dispute and release funds to the appropriate party within that window.' },
                { q: 'Do I get the full refund?', a: 'You receive the full amount minus the 1.5% platform fee. Deductions for early refunds may apply.' },
                { q: 'Can I get a partial refund?', a: 'Partial refunds are not supported — it\'s all or nothing.' },
                { q: 'The agent disappeared?', a: 'If the agent deletes the listing mid-escrow, the escrow is cancelled and you get a full refund.' },
                { q: 'What if I\'m not satisfied at inspection?', a: 'You have until inspection day (24 hours after deposit) to inspect and confirm satisfaction or dispute.' },
                { q: 'What if I\'m not satisfied after inspection?', a: 'You have until 7 days post-inspection to request a refund. After that, the agent can request release and funds are released to them.' },
              ],
            </div>
          </div>

          {/* CTA */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500 dark:text-muted max-w-md mx-auto">
              Ready to get started?
            </p>
            <div className="mt-4 flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/signup" className="btn-primary px-8 py-3.5 text-base">
                Create Free Account <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/pricing" className="btn-gold px-8 py-3.5 text-base">
                View Plans <Star className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Legal disclaimer */}
          <div className="mt-12 rounded-2xl border border-gray-200 dark:border-dark-400 bg-gray-50 dark:bg-dark-200/50 p-6 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            <p className="font-semibold text-gray-900 dark:text-white">
              Note:
            </p>
            <p className="text-gray-600 dark:text-gray-400 mt-0.5">
              This refund policy applies to services rendered through TetherNG directly (subscription plans). Third-party transactions are outside our control.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
