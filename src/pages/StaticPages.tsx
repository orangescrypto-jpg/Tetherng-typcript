import { Link, useLocation } from 'react-router-dom';
import { Shield, Mail, Phone, MapPin, Users, ArrowRight } from 'lucide-react';

const FOOTER_LINKS = [
  {
    title: 'Platform',
    links: [
      { label: 'Browse Listings', href: '/listings' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'How It Works', href: '/#how-it-works' },
      { label: 'Get Verified', href: '/dashboard/verification' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Careers', href: '/careers' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Refund Policy', href: '/refund' },
    ],
  },
];

/* ─── Reusable UI Components ─── */
function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="text-center mb-12">
      <h1 className="font-display text-4xl font-bold text-gray-900 dark:text-white">{title}</h1>
      {subtitle && <p className="mt-4 text-lg text-muted max-w-2xl mx-auto">{subtitle}</p>}
    </div>
  );
}

function SectionHeading({ title }: { title: string }) {
  return <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{title}</h2>;
}

/* ─── Page Content Components ─── */
function AboutContent() {
  return (
    <div className="space-y-16">
      <PageHeader title="About TetherNG" subtitle="Nigeria's most trusted property marketplace with secure escrow transactions." />
      
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <SectionHeading title="Our Mission" />
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            At TetherNG, we are on a mission to eliminate fraud and distrust in the Nigerian real estate market. We believe finding a home or renting a property shouldn't feel like a gamble.
          </p>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            By leveraging secure escrow technology, rigorous agent verification, and transparent listings, we've built a platform where buyers, tenants, and agents can transact with absolute peace of mind.
          </p>
        </div>
        <div className="bg-brand-50 dark:bg-brand-500/5 border border-brand-200 dark:border-brand-500/20 rounded-2xl p-8 flex flex-col items-center justify-center text-center">
          <Shield className="h-16 w-16 text-brand-600 dark:text-brand-400 mb-4" />
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Secure by Default</h3>
          <p className="mt-2 text-sm text-muted max-w-xs">Every transaction is protected by our institutional-grade escrow system.</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-8">
        {[
          { icon: Shield, title: 'Trust & Safety', desc: 'BVN-verified agents and property inspections ensure you deal with legitimate professionals.' },
          { icon: Users, title: 'Community First', desc: 'We prioritize the experience of everyday Nigerians looking for safe housing solutions.' },
          { icon: MapPin, title: 'Pan-Nigerian Reach', desc: 'From Lagos to Abuja, Port Harcourt to Ibadan, we are building a nationwide network of trust.' },
        ].map((item) => (
          <div key={item.title} className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 dark:bg-dark-200 mb-4">
              <item.icon className="h-6 w-6 text-brand-600 dark:text-brand-400" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white">{item.title}</h3>
            <p className="mt-2 text-sm text-muted">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ContactContent() {
  return (
    <div className="space-y-12">
      <PageHeader title="Contact Us" subtitle="Have a question, dispute, or partnership inquiry? We'd love to hear from you." />
      
      <div className="grid md:grid-cols-5 gap-12">
        <div className="md:col-span-2 space-y-6">
          <div className="card p-6 space-y-4">
            <div className="flex items-start gap-4">
              <Mail className="h-5 w-5 text-brand-600 dark:text-brand-400 mt-1 shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Email Us</h3>
                <p className="text-sm text-muted mt-1">support@tetherng.com</p>
                <p className="text-xs text-muted">Typical reply within 2 hours</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Phone className="h-5 w-5 text-brand-600 dark:text-brand-400 mt-1 shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Call Us</h3>
                <p className="text-sm text-muted mt-1">+234 (0) 812 345 6789</p>
                <p className="text-xs text-muted">Mon-Fri, 9am to 6pm WAT</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <MapPin className="h-5 w-5 text-brand-600 dark:text-brand-400 mt-1 shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Office</h3>
                <p className="text-sm text-muted mt-1">45 Admiralty Way, Victoria Island,<br />Lagos, Nigeria.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-3">
          <form className="card p-8 space-y-5">
            <SectionHeading title="Send a Message" />
            <div className="grid sm:grid-cols-2 gap-4">
              <input type="text" placeholder="Full Name" className="input-field" />
              <input type="email" placeholder="Email Address" className="input-field" />
            </div>
            <input type="text" placeholder="Subject (e.g., Escrow Issue, Partnership)" className="input-field" />
            <textarea rows={5} placeholder="How can we help you?" className="input-field resize-none" />
            <button type="button" className="btn-primary w-full flex items-center justify-center gap-2">
              Send Message <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function CareersContent() {
  return (
    <div className="space-y-12">
      <PageHeader title="Join Our Team" subtitle="Help us build the future of real estate in Nigeria. We're looking for passionate problem solvers." />
      
      <div className="card p-8 bg-brand-50 dark:bg-brand-500/5 border border-brand-200 dark:border-brand-500/20">
        <div className="grid md:grid-cols-3 gap-6 text-center">
          {['Remote Friendly', 'Competitive Pay', 'Real Impact'].map((perk) => (
            <div key={perk}>
              <p className="font-bold text-brand-700 dark:text-brand-400">{perk}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <SectionHeading title="Open Positions" />
        {[
          { title: 'Senior Full-Stack Engineer', dept: 'Engineering', location: 'Remote (Nigeria)', type: 'Full-time' },
          { title: 'Product Designer', dept: 'Design', location: 'Lagos / Hybrid', type: 'Full-time' },
          { title: 'Operations & Escrow Specialist', dept: 'Operations', location: 'Lagos', type: 'Full-time' },
          { title: 'Growth Marketing Manager', dept: 'Marketing', location: 'Remote', type: 'Full-time' },
        ].map((job) => (
          <div key={job.title} className="card-hover flex flex-col sm:flex-row sm:items-center justify-between p-6 gap-4">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">{job.title}</h3>
              <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-muted">
                <span className="bg-gray-100 dark:bg-dark-200 px-2 py-0.5 rounded">{job.dept}</span>
                <span className="bg-gray-100 dark:bg-dark-200 px-2 py-0.5 rounded">{job.location}</span>
                <span className="bg-gray-100 dark:bg-dark-200 px-2 py-0.5 rounded">{job.type}</span>
              </div>
            </div>
            <button className="btn-outline text-sm shrink-0">Apply Now</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function PrivacyContent() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <PageHeader title="Privacy Policy" subtitle="Last updated: May 2026" />
      <div className="card p-8 space-y-8 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
        <section>
          <SectionHeading title="1. Information We Collect" />
          <p>We collect information you provide directly, such as your name, email address, phone number, Bank Verification Number (BVN), and government-issued ID when you create an account or apply for agent verification.</p>
        </section>
        <section>
          <SectionHeading title="2. How We Use Your Information" />
          <p>Your data is used to verify your identity, facilitate secure escrow transactions, match you with properties, communicate updates, and improve our platform's security features. We strictly do not sell your personal data to third parties.</p>
        </section>
        <section>
          <SectionHeading title="3. Data Sharing & Escrow" />
          <p>For escrow transactions, necessary information (such as transaction amounts and agent contact details) is shared between the transacting parties (tenant and agent) to fulfill the service. Financial processing is handled by PCI-compliant partners like Paystack and Flutterwave.</p>
        </section>
        <section>
          <SectionHeading title="4. Data Security" />
          <p>We implement industry-standard security measures, including 256-bit SSL encryption, to protect your personal information. While no system is 100% secure, we continuously monitor and update our practices to safeguard your data.</p>
        </section>
        <section>
          <SectionHeading title="5. Your Rights" />
          <p>You have the right to access, update, or delete your personal data at any time via your account settings. If you wish to delete your account entirely, please contact our support team.</p>
        </section>
        <p className="text-xs text-muted pt-4 border-t border-gray-100 dark:border-dark-400">If you have questions about this policy, please contact us at privacy@tetherng.com.</p>
      </div>
    </div>
  );
}

function TermsContent() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <PageHeader title="Terms of Service" subtitle="Last updated: May 2026" />
      <div className="card p-8 space-y-8 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
        <section>
          <SectionHeading title="1. Acceptance of Terms" />
          <p>By accessing or using TetherNG, you agree to be bound by these Terms. If you do not agree to these terms, please do not use our platform.</p>
        </section>
        <section>
          <SectionHeading title="2. User Accounts" />
          <p>You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account. You must provide accurate, current, and complete information during registration.</p>
        </section>
        <section>
          <SectionHeading title="3. Escrow Transactions" />
          <p>TetherNG acts as an intermediary holding funds in escrow until predefined conditions are met. We are not a party to the underlying transaction between the tenant and the agent. Release of funds is strictly based on user confirmation or dispute resolution outcomes.</p>
        </section>
        <section>
          <SectionHeading title="4. Prohibited Activities" />
          <p>Users are prohibited from posting fraudulent listings, attempting to bypass escrow protocols, harassing other users, or using the platform for any illegal activities under Nigerian law. Violation of these rules will result in immediate account suspension.</p>
        </section>
        <section>
          <SectionHeading title="5. Limitation of Liability" />
          <p>TetherNG provides the platform "as is" without warranties of any kind. We do not guarantee the accuracy of listings, the condition of properties, or the behavior of users outside our platform. Our total liability shall not exceed the fees paid by you to use the service.</p>
        </section>
        <p className="text-xs text-muted pt-4 border-t border-gray-100 dark:border-dark-400">For legal inquiries, contact legal@tetherng.com.</p>
      </div>
    </div>
  );
}

function RefundContent() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <PageHeader title="Refund Policy" subtitle="We want you to feel completely safe using TetherNG." />
      <div className="card p-8 space-y-8 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
        <section>
          <SectionHeading title="1. Verification Fee Refunds" />
          <p>If your identity verification fails due to no fault of your own (e.g., a system error on our end), you are entitled to a full refund of the ₦2,500 verification fee. If verification fails due to mismatched BVN/ID details provided by you, the fee is non-refundable.</p>
        </section>
        <section>
          <SectionHeading title="2. Subscription Refunds" />
          <p>We offer a 7-day money-back guarantee on all subscription plans. If you are unsatisfied with your subscription within the first 7 days, you can request a full refund. After 7 days, your subscription will remain active until the end of the billing period, and no partial refunds will be issued.</p>
        </section>
        <section>
          <SectionHeading title="3. Boost & Promotion Refunds" />
          <p>Listing boost fees are non-refundable once the boost has been activated and your listing has started receiving increased visibility. If the boost fails to apply due to a technical glitch on our end, we will either re-apply the boost or issue a full refund.</p>
        </section>
        <section>
          <SectionHeading title="4. Escrow Disputes" />
          <p>If a dispute is raised and resolved in favor of the tenant, the funds held in escrow will be returned to the tenant's original payment method. If resolved in favor of the agent, funds will be disbursed to the agent minus the platform fee. TetherNG does not hold or claim the escrow funds.</p>
        </section>
        <section className="bg-green-50 dark:bg-success/5 border border-green-200 dark:border-success/20 rounded-xl p-6">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">How to Request a Refund</h3>
          <p>To initiate a refund, please email us at <span className="font-semibold text-brand-600 dark:text-brand-400">support@tetherng.com</span> with your account email, transaction ID, and reason for the request. Refunds are processed within 3-5 business days.</p>
        </section>
      </div>
    </div>
  );
}

/* ─── Main Router Component ─── */
export default function StaticPagesLayout() {
  const location = useLocation();
  const slug = location.pathname.split('/')[1] || 'about';

  const renderContent = () => {
    switch (slug) {
      case 'about': return <AboutContent />;
      case 'contact': return <ContactContent />;
      case 'careers': return <CareersContent />;
      case 'privacy': return <PrivacyContent />;
      case 'terms': return <TermsContent />;
      case 'refund': return <RefundContent />;
      default: return <AboutContent />; // Fallback
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-dark">
      {/* Main Page Content */}
      <main className="flex-1">
        <div className="mx-auto max-w-6xl w-full px-4 py-16 sm:px-6 lg:px-8">
          {renderContent()}
        </div>
      </main>

      {/* Footer - Always visible at the bottom */}
      <footer className="border-t border-gray-200 dark:border-dark-400 bg-white dark:bg-dark-50/80 mt-auto">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-4">
            {/* Logo & Description */}
            <div>
              <Link to="/" className="flex items-center gap-2.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-600">
                  <Shield className="h-5 w-5 text-white" />
                </div>
                <span className="font-display text-xl font-bold text-gray-900 dark:text-white">
                  Tether<span className="text-brand-600 dark:text-brand-400">NG</span>
                </span>
              </Link>
              <p className="mt-4 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                Nigeria's most trusted property marketplace with secure escrow transactions.
                No more scams, no more guesswork — just safe, transparent property deals.
              </p>
            </div>

            {/* Link Sections */}
            {FOOTER_LINKS.map((section) => (
              <div key={section.title}>
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white">{section.title}</h4>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {section.links.map((link) => (
                    <li key={link.label} className="text-sm text-gray-500 dark:text-muted hover:text-gray-900 dark:hover:text-white transition-colors">
                      <Link to={link.href}>{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-200 dark:border-dark-400 mt-12 pt-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <Link to="/" className="flex items-center gap-2.5">
                <Shield className="h-4 w-4 text-brand-600 dark:text-brand-400" />
                <span className="font-display text-lg font-bold text-gray-900 dark:text-white">
                  Tether<span className="text-brand-600 dark:text-brand-400">NG</span>
                </span>
              </Link>
              <p className="text-xs text-gray-400 dark:text-dark-400">&copy; {new Date().getFullYear()} TetherNG. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
