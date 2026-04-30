import { Link } from 'react-router-dom';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark">
      <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h1 className="section-heading">Terms of Service</h1>
          <p className="text-muted mt-4">Last updated: May 2026</p>
        </div>

        <div className="card p-8 space-y-10 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">1. Acceptance of Terms</h2>
            <p>By accessing or using TetherNG, you agree to be bound by these Terms. If you do not agree to these terms, please do not use our platform. These terms apply to all users, agents, landlords, and visitors.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">2. Account Registration & Eligibility</h2>
            <p>You must be at least 18 years old to use this service. You are responsible for maintaining the confidentiality of your account and password. You agree to provide accurate, current, and complete information during registration. Each user is allowed only one account.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">3. Listing Rules</h2>
            <p>Agents are solely responsible for the accuracy of their listings (price, location, images, descriptions). Fake, misleading, or fraudulent listings will result in immediate account ban and potential legal action. Duplicate listings are strictly prohibited.</p>
          </section>

          <section>
            <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-4">4. Escrow Transactions</h2>
            <p>TetherNG acts as an intermediary holding funds in escrow until predefined conditions are met. We are not a party to the underlying transaction between the tenant and the agent. Release of funds is strictly based on explicit user confirmation. Misuse of the escrow system will result in a permanent ban.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">5. Monetization</h2>
            <p>TetherNG charges platform fees for specific value-added services (Verification, Boosts, Subscriptions). These prices are clearly displayed before payment. All payments are processed securely via Paystack or Flutterwave.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">6. Prohibited Activities</h2>
            <ul className="list-disc list-inside text-muted space-y-2 ml-4">
              <li>Posting fake, misleading, or fraudulent property listings.</li>
              <li>Attempting to bypass the escrow system or direct users off-platform.</li>
              <li>Harassing, threatening, or abusing other users or platform staff.</li>
              <li>Using the platform for any illegal activities under Nigerian law.</li>
              <li>Creating multiple accounts to manipulate search rankings or reviews.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">7. Limitation of Liability</h2>
            <p>To the fullest extent permitted by applicable law, TetherNG shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of the use of our platform, even if we were advised of the possibility of such damages.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">8. Governing Law</h2>
            <p>These terms shall be governed by and construed in accordance with the Federal Republic of Nigeria laws, without regard to its conflict of law provisions.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">9. Changes to Terms</h2>
            <p>We reserve the right to modify these terms at any time. Continued use of the platform after changes are posted constitutes acceptance of the new terms. We will notify users of major changes via email or a platform notification.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
