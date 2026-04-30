import { Shield, CheckCircle2, FileText, Users, Star, Rocket } from 'lucide-react';
import { cn } from '@/utils/cn';

const SECTIONS = [
  {
    title: '1. Acceptance of Terms',
    content: [
      'By creating an account on TetherNG ("Platform"), you agree to these terms.',
      'By using TetherNG, you confirm that you have read, understood, and agree to these Terms of Service.',
    ],
  },
  {
    title: '2. Account Registration',
    content: [
      'You must be at least 18 years old to create an account. Account information must be accurate — fake accounts are removed immediately and permanently.',
      'Multiple accounts per person are not allowed. Each person may have one agent or tenant account.',
      'You are responsible for keeping your login credentials secure.',
      'You must not use the platform for any illegal, fraudulent, or unlicensed activity.',
    ],
  },
  {
    title: '3. Property Listings',
    content: [
      'All property listings must be real and accurate. Fake listings will be removed and the account penalized.',
      'You represent and warrant that you are authorized to list the property.',
      'You must include accurate pricing and property details. Misleading listings will be removed.',
      'Duplicate listings across multiple accounts will be merged or removed.',
      'TetherNG does not act as a real estate agency. We are a marketplace platform only.',
    ],
  },
  {
    title: '4. Escrow Transactions',
    content: [
      'Escrow is a service, not a guarantee. TetherNG holds funds as a third party — we do not guarantee property conditions.',
      'TetherNG is not a party to any real estate transaction between you and the agent.',
      'If a dispute occurs, TetherNG will investigate and hold funds until resolution.',
      'By initiating escrow, you accept that you understand the process and release TetherNG from liability.',
    ],
  },
  {
    title: '5. Verification & BVN',
    content: [
      'BVN verification is optional but strongly recommended for agents to build trust with tenants.',
      'Your BVN is sent to a CBN-licensed API for verification — we only store the last 4 digits.',
      'BVN data is encrypted at rest. Only you can see the full BVN in your bank app.',
      'Verification can be revoked at any time by the user or by TetherNG if misused.',
    ],
  },
  {
    title: '6. Subscription Plans',
    content: [
      'Subscription plans are optional. Free tier has limited features. Paid plans unlock more visibility and leads access.',
      'Subscription renews automatically at the end of each period. Cancel anytime before renewal.',
      'If you cancel mid-period, access continues until the period ends. No partial refunds after 7 days.',
      'TetherNG reserves the right to modify plan features at any time with 30 days notice.',
    ],
  },
  {
    title: '7. Payments',
    },
    'content: [
      'All payments are processed through Paystack or Flutterwave — we never see your card details.',
      'TetherNG does not store, log, or have access to your card information.',
      'Refund requests are processed within 7 business days to your original payment method.',
    ],
  },
  {
    title: '8. Intellectual Property',
    content: [
      'All content on TetherNG is either user-generated or properly licensed content.',
      'You retain ownership of your listing content. TetherNG has a license to display it.',
      'If you believe someone is using your content without permission, file a DMCA or email us at ip@tether.ng.',
    ],
  },
  {
    title: '9. Limitation of Liability',
    },
    'content: [
      'TetherNG is a platform, not a real estate agency or financial institution.',
      'We are not responsible for accuracy of listings, agent claims, or property conditions.',
      'We do not guarantee property conditions, availability, or agent identities.',
      'Our liability is limited to the platform itself — not the listings or transactions.',
    ],
  },
  {
    title: '10. User Content',
    },
    'content: [
      'You retain all rights to your listing content (text, images, videos).',
      'TetherNG has a license to display your content on the platform.',
      'You grant TetherNG a non-exclusive, non-transferable license to display your property.',
      'You can request removal of your content at any time by contacting us.',
    ],
  },
  {
    title: '11. Data Export',
  },
    'content: [
      'You can export all your data at any time from your dashboard settings.',
      'Exports are processed within 72 hours via email delivery to your verified email.',
      'After 30 days of deletion, data is permanently removed from our servers.',
      'We comply with data removal requests from NDA/CBN within 72 hours.',
    ],
  },
  {
    title: '12. Modifications',
  },
    'content: [
      'We may update these Terms at any time by posting updated versions on this page.',
      'Continued use of the platform after changes means you accept the new terms.',
      'We will notify existing users of material changes via email notification.',
    ],
  },
  {
    title: '13. Communications',
    },
    'content: [
      'We may send you important emails about your account, transactions, or our services.',
      'You can opt out of marketing emails from your dashboard settings at any time.',
      'Important emails (verification, escrow status) will always be sent regardless.',
    ],
  },
  {
    title: '14. Cookie Usage',
    },
    'content: [
      'We use cookies for: login sessions, preferences, analytics, and ad delivery tracking.',
      'Cookies are essential for core functionality and cannot be fully disabled.',
      'You can manage cookies in your browser settings or your device settings.',
    ],
  },
  {
    'title: '15. Governing Law',
    },
    'content: [
      'This Terms are governed by Nigerian law — Federal Republic of Nigeria 2019 Act and Data Protection Regulation 2019 (NDPR).',
      'Disputes are resolved by Nigerian courts (Lagos State High Court or FCT).',
      'We comply with NDPR data minimization — we only collect what we need to.',
    ],
  },
  {
    title: '16. Account Termination',
  },
    'content: [
      'You can delete your account at any time from your dashboard settings.',
      'Deletion is permanent and processes within 30 days.',
      'Activity logs are anonymized before deletion.'],
  },
  {
    'title: '17. Third-Party Links',
    },
    'content: [
      'Links to Paystack, Flutterwave, Firebase, Google, Google on our platform are secure external services.',
      'We do not pass your data to third parties beyond what's needed.',
      'External services have their own privacy policies you should also review.',
    ],
  },
  {
    'title: '18. Updates to Terms',
    },
    'content: [
      'Major changes will be announced on this page with an effective date in the changelog below.',
      'Continued use means you accept any modifications to these terms.',
    ],
  },
  {
    'title: '19. Contact Us',
    },
    'content: [
      'For questions, disputes, complaints, or legal inquiries:',
      'Email: legal@tether.ng',
      'Phone: +234 801 234 5678',
      'Legal: TetherNG Legal, Victoria Island, Lagos, Nigeria.',
    ],
  },
  {
    'title: '20. Severability',
    },
    'content: [
      'TetherNG may be dissolved at any time without prior notice due to management decision.',
      'In that case, we will give 30 days notice to export your data.',
      'All users will be notified via email before any platform shutdown.',
    ],
  },
  {
    'title: '21. Final Clause',
  },
    'content: [
      'These terms are governed by and interpreted under the laws of the Federal Republic of Nigeria.',
      'By using TetherNG, you agree to the exclusive jurisdiction of the Lagos State High Court of Lagos (Cyber Division).',
    ],
  },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark">
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-dark-400 bg-white dark:bg-dark-50/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600">
              <Shield className="h-4 w-4 text-white" />
            </div>
            <span className="font-display text-lg font-bold text-gray-900 dark:text-white">
              Tether<span className="text-brand-600 dark:text-brand-400">NG</span>
            </span>
          </Link>
          <Link to="/login" className="btn-outline text-sm">Sign In</Link>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="mb-8">
          <h1 className="font-display text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">Terms of Service</h1>
          <p className="text-xs text-muted mt-1">Last updated: October 2024</p>
        </div>

        <div className="card p-6 sm:p-8 space-y-5 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          {SECTIONS.map((section, i) => (
            <div key={i} className={cn(i === SECTIONS.length - 1 && 'border-b border-gray-100 dark:border-dark-400/50 pb-4 last:border-0'}>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">{section.title}</h3>
              {section.content.map((item) => (
                <li key={item.text.slice(0, item.text.indexOf('.') + 1)} className="flex items-start gap-2.5 text-gray-600 dark:text-gray-400">
                  <CheckCircle2 className="h-4 w-4 text-brand-600 dark:text-brand-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{item.text}</p>
                    <p className="text-gray-500 dark:text-gray-400 mt-0.5">{item.text.slice(item.text.indexOf('.') + 1)}</p>
                  </div>
                </li>
              ))}
            </div>
          ))}

          {/* Legal banner */}
          <div className="mt-8 rounded-2xl border border-gray-200 dark:border-dark-400 bg-gray-50 dark:bg-dark-200/50 p-6 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            <p className="font-semibold text-gray-900 dark:text-white">⚠️ Important Legal Notice</p>
            <p className="text-gray-500 dark:text-muted mt-1">
              By using TetherNG, you acknowledge that this platform is a marketplace and not a real estate agency. We provide the platform and escrow service only. Verify agents yourself and inspect properties before paying.
            </p>
          </div>

          {/* CTA */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto">
              Ready to get started?
            </p>
            <div className="mt-4 flex flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/signup" className="btn-primary px-8 py-3.5 text-base">
                Create Free Account <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/login" className="btn-outline px-8 py-3.5 text-base">
                Sign In <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-dark-400 bg-gray-50 dark:bg-dark-50/30 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <Link to="/" className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600">
                  <Shield className="h-4 w-4 text-white" />
                </div>
                <span className="font-display text-lg font-bold text-gray-900 dark:text-white">Tether<span className="text-brand-600 dark:text-brand-400">NG</span>
              </Link>
              <p className="mt-4 text-sm leading-relaxed text-gray-500 dark:text-muted">
                Nigeria's most trusted property marketplace with secure escrow transactions.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Platform</h4>
              <ul className="mt-4 flex flex-col gap-2.5">
                <Link to="/listings" className="text-sm text-gray-500 dark:text-muted hover:text-gray-900 dark:hover:text-white transition-colors">Browse Listings</Link>
                <Link to="/pricing" className="text-sm text-gray-500 dark:text-muted hover:text-gray-900 dark:hover:text-white transition-colors">Pricing</Link>
                <Link to="/how-it-works" className="text-sm text-gray-500 dark:text-muted hover:text-gray-900 dark:hover:text-white transition-colors">How It Works</Link>
                <Link to="/verification" className="text-sm text-gray-500 dark:text-muted hover:text-gray-900 dark:hover:text-white transition-colors">Get Verified</Link>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Company</h4>
              <ul className="mt-4 flex flex-col gap-2.5">
                <Link to="/about" className="text-sm text-gray-500 dark:text-muted hover:text-gray-900 dark:hover:text-white transition-colors">About Us</Link>
                <Link to="/contact" className="text-sm text-gray-500 dark:text-muted hover:text-gray-900 dark:hover:text-white transition-colors">Contact</Link>
                <Link to="/careers" className="text-sm text-gray-500 dark:text-muted hover:text-gray-900 dark:hover:text-white transition-colors">Careers</Link>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Legal</h4>
              <ul className="mt-4 flex flex-col gap-2.5">
                <Link to="/privacy" className="text-sm text-gray-500 dark:text-muted hover:text-gray-900 dark:hover:text-white transition-colors">Privacy Policy</Link>
                <Link to="/terms" className="text-sm text-gray-500 dark:text-muted hover:text-gray-900 dark:hover:text-white transition-colors">Terms of Service</Link>
                <Link to="/refund" className="text-sm text-gray-500 dark:text-muted hover:text-gray-900 dark:hover:text-white transition-colors">Refund Policy</Link>
              </ul>
            </div>
          </div>
          <div className="mt-10 border-t border-gray-200 dark:border-dark-400 pt-6 text-center">
            <p className="text-xs text-gray-400 dark:text-muted">&copy; {new Date().getFullYear()} TetherNG. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  </div>
  );
}
