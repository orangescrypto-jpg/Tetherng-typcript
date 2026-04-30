import { Link } from 'react-router-dom';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark">
      <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h1 className="section-heading">Privacy Policy</h1>
          <p className="text-muted mt-4">Last updated: May 2026</p>
        </div>

        <div className="card p-8 space-y-10 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">1. Information We Collect</h2>
            <p>We collect information you provide directly, such as your name, email address, phone number, Bank Verification Number (BVN), and government-issued ID when you create an account or apply for agent verification. We also collect property listing details, transaction history, and usage data to improve our platform.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">2. How We Use Your Information</h2>
            <p>Your data is used to verify your identity, facilitate secure escrow transactions, match you with properties, communicate updates, and improve our platform's security features. We strictly do not sell your personal data to third parties without your explicit consent.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">3. Data Sharing & Escrow</h2>
            <p>For escrow transactions, necessary information (such as transaction amounts and agent contact details) is shared between the transacting parties (tenant and agent) to fulfill the service. Financial processing is handled by PCI-compliant partners like Paystack and Flutterwave.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">4. Data Security</h2>
            <p>We implement industry-standard security measures, including 256-bit SSL encryption, to protect your personal information. While no system is 100% secure, we continuously monitor and update our practices to safeguard your data against unauthorized access, alteration, or disclosure.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">5. Cookies & Tracking</h2>
            <p>We use essential cookies to keep you logged in and remember your preferences. We do not use invasive tracking cookies. You can disable non-essential cookies in your browser settings at any time.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">6. Your Rights</h2>
            <p>You have the right to access, update, or delete your personal data at any time via your account settings. If you wish to delete your account entirely, please contact our support team at <span className="font-semibold text-brand-600 dark:text-brand-400">support@tetherng.com</span> and we will process your request within 3-5 business days.</p>
          </section>
        </div>

        <div className="text-center mt-12">
          <Link to="/contact" className="btn-outline px-8 py-3 text-base">
            Contact Us About This Policy
          </Link>
        </div>
      </div>
    </div>
  );
}
