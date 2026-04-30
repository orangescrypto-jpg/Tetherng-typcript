import { Link } from 'react-router-dom';
import { Shield, Users, Lock, FileText, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

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
      { label: 'Refund Policy', href: '/refund' }, // Fixed missing quote here
    ],
  },
];

export default function StaticPagesLayout() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-4 gap-12">
          {/* Logo */}
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
          ))} {/* Fixed: Removed extra </div> here */}

          {/* Bottom bar */}
          <div className="border-t border-gray-200 dark:border-dark-400 pt-8">
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
      </div>
    </div> {/* Fixed: Removed extra </div> at the very end */}
  );
}
