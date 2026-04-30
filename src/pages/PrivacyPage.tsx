import { Link } from 'react-router-dom';
import { Shield, Lock, CheckCircle2, Eye, Server } from 'lucide-react';

export default function PrivacyPage() {
  const sections = [
    {
      title: 'What we collect',
      items: [
        { label: 'Account info', desc: 'Name, email, phone, profile photo' },
        { label: 'Property data', desc: 'Title, description, price, location, images' },
        { label: 'Transaction data', desc: 'Escrow amounts, timestamps, status changes' },
        { label: 'Technical data', desc: 'IP address, device type, browser info' },
        { label: 'Usage data', desc: 'Pages visited, features used, click data' },
      ],
    },
    {
      title: 'How we use your data',
      items: [
        { label: 'Service delivery', desc: 'Running the escrow infrastructure and marketplace' },
        { label: 'Product improvement', desc: 'Analyzing usage to improve the platform' },
        { label: 'Communication', desc: 'Responding to inquiries and support tickets' },
        {label: 'Analytics', desc: 'Understanding how the platform is used' },
        { label: 'Security', desc: 'Protecting your data with encryption and access control' },
      ],
    },
    {
      title: 'How we protect your data',
      items: [
        { label: 'Encryption', desc: 'All data is encrypted in transit and at rest' },
        { label: 'Access control', desc: 'You control who sees your data' },
        {label: 'Server security', desc: 'Regular security audits and penetration testing' },
        { label: 'Data retention', desc: 'We only keep data as long as needed for the service' },
      ],
    },
    {
      title: 'Your rights',
      items: [
        { label: 'Access your data', desc: 'Download a copy of everything we store' },
        { label: 'Correct errors', desc: 'Request corrections or deletion of your data' },
        { label: 'Data portability', desc: 'Take your data with you if you leave' },
        { label: 'Account deletion', desc: 'Delete your account and all associated data permanently' },
        { label: 'GDPR compliance', desc: 'We comply with Nigerian data protection regulations' },
        { label: 'Cookie preferences', desc: 'Control which cookies we set on your device' },
      ],
    },
    {
      title: 'Cookies',
      items: [
        { label: 'Essential cookies', desc: 'Required for login sessions and security' },
        { label: 'Analytics cookies', desc: 'Helps us improve the platform' },
        { label: 'Advertising cookies', desc: 'Show relevant ads based on your browsing' },
        { label: 'Preference cookies', desc: 'Remember your display and filter choices' },
      ],
    },
    {
      title: 'Third-party services',
      items: [
        { label: 'Paystack', desc: 'Payment processing for subscriptions and boosts' },
        { label: 'Flutterwave', desc: 'Alternative payment processor for subscriptions' },
        { label: 'Google Auth', desc: 'Social login via Google' },
        { label: 'Firebase', desc: 'Backend infrastructure' },
        { label: 'Cloudinary', desc: 'Image and video hosting' },
        { label: 'Vercel', desc: 'Deployment and hosting' },
        { label: 'Google Analytics', desc: 'Analytics dashboard' },
        { label: 'Font CDN', desc: 'Typography loading' },
        { label: 'Mapbox', desc: 'Map integration' },
      ],
    },
    {
      title: 'Data retention',
      items: [
        { label: 'Active data', desc: 'Used for daily operations — deleted after 30 days' },
        { label: 'Archived data', desc: 'Kept for legal/tax purposes only — not shown to users' },
        {label: 'Deleted data', desc: 'Permanently removed within 30 days of request' },
        { label: 'Why 30 days?', desc: 'We only keep data we actually need for legal and compliance' },
      ],
    },
    {
      title: 'Contact us about privacy',
      items: [
        { label: 'Email', desc: 'hello@tether.ng' },
        { label: 'Phone', desc: '+234 801 234 5678' },
        { label: 'WhatsApp', desc: 'Quick answers on WhatsApp' },
        { label: 'X (X)', desc: '@TetherNG' },
      ],
    },
    {
      title: 'Updates to this policy',
      items: [
        { label: 'Last updated', desc: 'January 2025' },
        { label: 'Who updates', desc: 'TetherNG team only' },
        { label: 'Major changes', desc: 'Added subscription plans, property verification, boost system' },
        { label: 'Minor changes', desc: 'UI improvements, bug fixes, copy updates' },
        { label: 'Your rights', desc: 'Clear, plain-language, no legalese' },
        { label: 'Questions?', desc: 'Contact hello@tether.ng or DM @TetherNG on WhatsApp' },
      ],
    },
    },
    {
      title: 'Data processors',
      items: [
        { label: 'Location', desc: 'Nigeria (Lagos, Abuja, Port Harcourt, etc.)' },
        { label: 'Storage', desc: 'Firebase Firestore + Cloud Storage' },
        { label: 'Hosting', desc: 'Vercel' },
        { label: 'Analytics', desc: 'Google Analytics' },
        { label: 'Auth', desc: 'Firebase Auth + Google Auth' },
        { label: 'DNS', desc: 'Cloudflare' },
      ],
    },
  ];

  const Section = ({ title, items, card?: boolean }) => (
    <section className={card p-6">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white">{title}</h3>
      <ul className="mt-4 space-y-2.5">
        {items.map((item) => (
          <li key={item.label} className="flex items-start gap-2.5 text-sm text-gray-600 dark:text-gray-400">
            <span className="text-gray-400 dark:text-dark-400 shrink-0 mt-0.5">•</span>
            <span className="text-gray-700 dark:text-gray-300">{item.desc}</span>
          </li>
        ))}
      </ul>
    </section>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark">
      {/* Header */}
      <section className="border-b border-gray-200 dark:border-dark-400 bg-white dark:bg-dark-50/50 py-16 sm:py-24">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <h1 className="font-display text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
            Privacy Policy
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 max-w-md mx-auto">
            We believe in transparency. This policy explains exactly what data we collect, why we collect it, and how you can control it.
          </p>
        </div>
      </section>

      {/* Content sections */}
      {sections.map((section, i) => (
        <section key={i} className={i < sections.length - 1 && 'border-b border-gray-200 dark:border-dark-400 bg-white dark:bg-dark-50/50 py-14 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">{section.title}</h2>
          <ul className="mt-4 space-y-2.5">
            {section.items.map((item) => (
              <li className="flex items-start gap-2.5 text-sm text-gray-600 dark:text-gray-400">
                <span className="text-gray-400 dark:text-dark-500 shrink-0 mt-0.5">•</span>
                <span className="text-gray-700 dark:text-gray-300">{item.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Footer */}
      <div className="border-t border-gray-200 dark:border-dark-400 bg-gray-50 dark:bg-dark-30 py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between border-b border-gray-100 dark:border-dark-400 pb-4 mb-8">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600">
                <Shield className="h-4 w-4 text-white" />
              </div>
              <span className="font-display text-lg font-bold text-gray-900 dark:text-white">
                Tether<span className="text-brand-600 dark:text-brand-400">NG</span>
              </span>
            </Link>
            <p className="text-xs text-gray-400 dark:text-dark-500">&copy; {new Date().getFullYear()} TetherNG. All rights reserved.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

---

## File 5: `src/pages/TermsPage.tsx`

```tsx
import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';

const SECTIONS = [
  {
    title: '1. Acceptance',
    items: [
      { label: 'Binding agreement', desc: 'By using TetherNG, you agree to these terms' },
      { label: 'Age requirement', desc: 'You must be at least 18 years old' },
      { label: 'Account responsibility', desc: 'You are responsible for your account activity' },
      { label: 'Content ownership', desc: 'You own the content you post' },
    ],
  },
  {
    title: '2. Listings',
    items: [
      { label: 'Accurate listings', desc: 'You must describe properties accurately — no fake listings allowed' },
      { label: 'No spam', desc: 'No duplicate or misleading property posts' },
      { label: 'Image rights', desc: 'Only upload images you own or are licensed to share' },
      { label: 'Valid photos', desc: 'No stock photos or misleading images' },
    ],
  },
  {
    title: '3. Payments & Escrow',
    items: [
      { label: 'Escrow only', desc: 'All property deals must go through TetherNG escrow — no direct payments to agents' },
      { label: 'No advance fee fraud', desc: 'Never ask for payment before inspection' },
      { label: 'No off-platform deals', desc: 'Don\'t try to bypass escrow to avoid fees' },
    ],
  },
    {
    title: '4. Verification',
    items: [
      { label: 'BVN is optional for tenants', desc: 'Tenants don\'t need to verify to browse or use escrow' },
      { label: 'BVN required for agents', desc: 'Agents must verify before listing or receiving escrow payouts' },
      { label: 'Verified agents rank higher', desc: 'Verified agents get priority in search results' },
      { label: 'No sharing BVN data', desc: 'Your BVN is validated via secure API — never stored by us' },
    ],
  },
    {
    title: '5. Subscriptions',
    items: [
      { label: 'Cancel anytime', desc: 'Cancel your plan at any time, keep access until period ends' },
      { label: 'No lock-in', desc: 'No forced auto-renewal — you stay in control' },
      { label: 'Proration period', desc: 'Keeps your access during the paid period even if cancelled' },
      { label: 'No hidden fees', desc: 'What you see is what you get — no surprises' },
    ],
  },
    {
    title: '6. Content Rules',
    {
      label: 'No illegal content', desc: 'No scams, fraud, or illegal activity on the platform' },
      { label: 'Account deletion', desc: 'You can delete your account and all data permanently' },
      { label: 'Content license', desc: 'You keep rights to content you created on TetherNG' },
      { label: 'AI-generated content', desc: 'AI-generated content must be labeled as such' },
      { label: 'No malware', desc: 'No viruses, exploits, or harmful code' },
    ],
  },
    {
    title: '7. Refund Policy',
    items: [
      { label: '7-day window', desc: 'Full refund available within 7 days of payment' },
      { label: 'Clear criteria', desc: 'Refunds are processed within 3-5 business days' },
      { label: 'Partial refund', desc: 'Partial refunds available if partial service was delivered' },
      { label: 'Manual review', desc: 'Complex cases reviewed by human before refund' },
      { label: 'Non-refundable', desc: 'Escrow release to verified agents is final — not refundable' },
    ],
  },
    {
      title: '8. Intellectual Property',
    },
    },
    {
      title: '9. Data portability',
    items: [
      { label: 'Export your data', desc: 'Download everything in standard formats (CSV, JSON)' },
      { label: 'API access', desc: 'API available for developers and integrations' },
      { label: 'Deletion request', desc: 'Request account and data deletion from support team' },
      { label: 'Retention period', desc: 'Data kept for legal compliance (30 days after deletion)' },
      { label: 'No lock-in', desc: 'No long-term data retention' },
    },
    {
      title: '10. Changes to this policy',
    items: [
      { label: 'Notice before changes', desc: 'We notify 30 days before any changes' },
      { label: 'Major changes', desc: 'Significant changes get email notification' },
      { label: 'Minor changes', desc: 'Small tweaks don\'t require notice' },
      { label: 'Effective date', desc: 'Changes take effect immediately on publish' },
      { label: 'Contact support', desc: 'Email hello@tether.ng for questions' },
    ],
    },
    {
      'title: '11. Contact',
    },
    {
      title: 'Email: hello@tether.ng',
        desc: 'Email us at hello@tether.ng for support, partnerships, or general inquiries.',
      },
      { label: 'Phone: +234 801 234 5678',
      },
    },
    {
      title: '12. Miscellaneous',
    },
    {
      'label: 'Governing law', desc: 'Nigeria Data Protection Regulation (2019)' },
      { label: 'DPR compliance', desc: 'Registered with NITDA' },
      { label: 'Offshore hosting', desc: 'Data stored in Nigeria (Lagos)' },
      { label: 'Contact support', desc: 'hello@tether.ng or @TetherNG on WhatsApp' },
    },
    },
    {
      title: '13. Your rights under NDPR',
    },
    {
      'label: 'Access
