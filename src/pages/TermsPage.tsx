import { Link } from 'react-router-dom';
import { ArrowLeft, XCircle, FileText, Shield } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark">
      <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted hover:text-brand-600 dark:hover:text-brand-400 transition-colors mb-12">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <div className="text-center mb-16">
          <h1 className="section-heading text-4xl md:text-5xl">Terms of Service</h1>
          <p className="text-muted mt-4">Last updated: June 2025</p>
        </div>

        <div className="space-y-8">
          <div className="flex items-center gap-4 rounded-2xl border border-brand-200 dark:border-brand-500/20 bg-brand-50 dark:bg-brand-500/5 p-5">
            <Shield className="h-8 w-8 text-brand-600 dark:text-brand-400 shrink-0" />
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white">Your Safety Matters</h3>
              <p className="text-sm text-muted mt-1">These terms exist to protect both you and our community. Please read them carefully.</p>
            </div>
          </div>

          <div className="card p-8 space-y-8 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">1. Acceptance of Terms</h2>
              <p>By accessing or using TetherNG, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this platform.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">2. Eligibility</h2>
              <p>You must be at least 18 years old to use this platform. By using TetherNG, you represent and warrant that you are at least 18 years of age and have the legal capacity to enter into binding agreements.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">3. Account Responsibilities</h2>
              <p>You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must immediately notify TetherNG of any unauthorized use of your account.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">4. Property Listings</h2>
              <p>Agents are solely responsible for the accuracy of their property listings. TetherNG does not verify property ownership or listing accuracy. Users are encouraged to conduct independent due diligence before entering into any transaction.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">5. Escrow Services</h2>
              <p>TetherNG provides an escrow service to facilitate secure transactions. Funds held in escrow are not owned by TetherNG and will be disbursed according to the terms agreed upon by both parties or as determined through our dispute resolution process.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">6. Prohibited Activities</h2>
              <div className="space-y-2 mt-3">
                <div className="flex items-start gap-2">
                  <XCircle className="h-4 w-4 text-red-500 dark:text-red-400 shrink-0 mt-0.5" />
                  <span>Posting fraudulent or misleading property listings</span>
                </div>
                <div className="flex items-start gap-2">
                  <XCircle className="h-4 w-4 text-red-500 dark:text-red-400 shrink-0 mt-0.5" />
                  <span>Attempting to bypass the escrow system</span>
                </div>
                <div className="flex items-start gap-2">
                  <XCircle className="h-4 w-4 text-red-500 dark:text-red-400 shrink-0 mt-0.5" />
                  <span>Creating multiple accounts to manipulate the platform</span>
                </div>
                <div className="flex items-start gap-2">
                  <XCircle className="h-4 w-4 text-red-500 dark:text-red-400 shrink-0 mt-0.5" />
                  <span>Harassing, threatening, or abusing other users</span>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">7. Dispute Resolution</h2>
              <p>Any disputes arising from transactions on TetherNG will be resolved through our internal dispute resolution process. If a resolution cannot be reached, disputes shall be settled through arbitration in accordance with Nigerian law.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">8. Limitation of Liability</h2>
              <p>TetherNG acts as an intermediary platform and shall not be liable for any indirect, incidental, or consequential damages arising from the use of our platform, including but not limited to loss of funds, property disputes, or failed transactions.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">9. Modifications</h2>
              <p>We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting. Your continued use of the platform after any changes constitutes acceptance of the new terms.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">10. Contact</h2>
              <p>For questions about these Terms of Service, please contact us at <span className="text-brand-600 dark:text-brand-400 font-semibold">legal@tetherng.com</span>.</p>
            </section>
          </div>

          <div className="flex items-center gap-4 rounded-2xl border border-green-200 dark:border-green-500/20 bg-green-50 dark:bg-green-500/5 p-5">
            <FileText className="h-8 w-8 text-green-600 dark:text-green-400 shrink-0" />
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white">Need a printed copy?</h3>
              <p className="text-sm text-muted mt-1">You can print this page for your records at any time.</p>
            </div>
          </div>
        </div>

        <div className="text-center mt-16">
          <p className="text-muted mb-6">Have questions about our terms?</p>
          <Link to="/contact" className="btn-primary px-8 py-3.5 text-base">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
