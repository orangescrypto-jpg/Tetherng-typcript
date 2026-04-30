import { Link } from 'react-router-dom';
import { AlertCircle, Clock, Shield, CreditCard, CheckCircle2 } from 'lucide-react';

export default function RefundPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark">
      <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h1 className="section-heading">Refund Policy</h1>
          <p className="text-muted mt-4">We want you to feel completely safe using TetherNG. If something goes wrong, we've got you covered.</p>
        </div>

        <div className="space-y-8">
          {/* Trust Banner */}
          <div className="flex items-center gap-4 rounded-2xl border border-brand-200 dark:border-brand-500/20 bg-brand-50 dark:bg-brand-500/5 p-5">
            <Shield className="h-8 w-8 text-brand-600 dark:text-brand-400 shrink-0" />
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white">100% Money-Back Guarantee</h3>
              <p className="text-sm text-muted mt-1">If we can't fix your issue, we will refund you fully. No questions asked.</p>
            </div>
          </div>

          <div className="card p-8 space-y-8 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">1. Verification Fee Refunds</h2>
              <p>If your identity verification fails due to no fault of your own (e.g., a system error on our end), you are entitled to a full refund of the ₦2,500 verification fee. However, if verification fails due to mismatched BVN/ID details provided by you, the fee is non-refundable.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">2. Subscription Refunds</h2>
              <p>We offer a 7-day money-back guarantee on all subscription plans. If you are unsatisfied with your subscription within the first 7 days, you can request a full refund. After 7 days, your subscription remains active until the end of the billing period, and no partial refunds will be issued.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">3. Listing Boost Refunds</h2>
              <p>Listing boost fees are non-refundable once the boost has been activated and your listing has started receiving increased visibility. If the boost fails to apply due to a technical glitch on our end, we will either re-apply the boost or issue a full refund.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">4. Escrow Disputes</h2>
              <p>If a dispute is raised and resolved in favor of the tenant, the funds held in escrow will be returned to the tenant's original payment method. If resolved in favor of the agent, funds will be disbursed to the agent minus the platform fee. TetherNG does not hold or claim the escrow funds as its own.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">5. How to Request a Refund</h2>
              <div className="bg-gray-50 dark:bg-dark-200 border border-gray-200 dark:border-dark-400 rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Request Process</h3>
                <ul className="space-y-2.5 text-sm text-muted">
                  <li className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-brand-600 dark:text-brand-400 shrink-0" />
                    Email us at <span className="font-semibold text-brand-600 dark:text-brand-400">support@tetherng.com</span> with your account email.
                  </li>
                  <li className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-amber-500 dark:text-gold-400 shrink-0" />
                    Include your Transaction ID or Order ID.
                  </li>
                  <li className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4 text-gray-500 dark:text-dark-400 shrink-0" />
                    Provide a brief reason for the refund.
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 dark:text-success shrink-0" />
                    Refunds are processed within 3-5 business days.
                  </li>
                </ul>
              </div>
            </section>
          </div>
        </div>

        <div className="text-center mt-16">
          <p className="text-muted mb-6">Still need help?</p>
          <Link to="/contact" className="btn-primary px-8 py-3.5 text-base">
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
