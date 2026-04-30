import { Shield, Lock, Eye, CheckCircle2, Server } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark">
      {/* Header bar */}
      <div className="border-b border-gray-200 dark:border-dark-400 bg-white dark:bg-dark-50/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600"><Shield className="h-4 w-4 text-white" /></div>
            <span className="font-display text-lg font-bold text-gray-900 dark:text-white">Tether<span className="text-brand-600 dark:text-brand-400">NG</span></span>
          </Link>
          <Link to="/login" className="btn-outline text-sm">Sign In</Link>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="flex items-center justify-center mx-auto mb-8">
          <div className="flex h-14 w-14 w-14 items-center justify-center rounded-2xl bg-brand-50 dark:bg-brand-500/10 border-2 border-brand-200 dark:border-brand-500/20">
            <Shield className="h-7 w-7 text-brand-600 dark:text-brand-400" />
          </div>
        </div>
        <h1 className="Privacy Policy</h1>
        <p className="mt-2 text-muted text-center">
          Last updated: October 2024
        </p>

        <div className="mt-10 card p-6 space-y-6 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">1. Information We Collect</h2>
          <p>We collect the following types of information:</p>
          <ul className="mt-3 space-y-3">
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="h-4 w-4 text-brand-600 dark:text-brand-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Personal Information</p>
                <p className="text-gray-600 dark:text-gray-400 mt-0.5">
                  Name, email, phone number, profile photo, and role (tenant, agent, landlord).
                </p>
              </div>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="h-4 w-4 text-brand-600 dark:text-brand-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Identity Verification Data</p>
                <p className="text-gray-600 dark:text-gray-400 mt-0.5">
                  BVN (encrypted, only last 4 digits stored), ID document, verification status.
                </p>
              </div>
            </li>
            <li className="div className="flex items-start gap-2.5">
              <CheckCircle2 className="h-4 w-4 text-brand-600 dark:text-brand-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Property Data</p>
                <p className="text-gray-600 dark:text-gray-400 mt-0.5">
                  Property details, images, pricing, location data, listing status.
                </p>
              </div>
            </li>
            <li className="div className="flex items-start gap-2.5">
              <CheckCircle2 className="h-4 w-4 text-brand-600 dark:text-brand-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Transaction Data</p>
                <p className="text-gray-600 dark:text-gray-400 mt-0.5">
                  Escrow transaction records, amounts, timestamps, dispute history.
                </p>
              </div>
            </li>
            <li className="div className="flex items-start gap-2.5">
              <CheckCircle2 className="h-4 w-4 text-brand-600 dark:text-brand-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Usage Data</p>
                <p className="text-gray-600 dark:text-gray-400 mt-0.5">
                  Pages visited, features used, session data, device info, time on site.
                </p>
              </div>
            </li>
            <li className="div className="flex items-start gap-2.5">
              <CheckCircle2 className="h-4 w-4 text-brand-600 dark:text-brand-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Technical Data</p>
                <p className="text-gray-600 dark:text-gray-400 mt-0.5">
                  Device type, browser version, IP address (anonymized), cookies, crash reports.
                </p>
              </div>
            </li>
            <li className="div className="flex items-start gap-2.5">
              <CheckCircle2 className="h-4 w-4 text-brand-600 dark:text-brand-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Communication Data</p>
                <p className="text-gray-600 dark:text-gray-400 mt-0.5">
                  Messages sent/received, phone calls made, email notifications sent.
                </p>
              </div>
            </li>
            <li className="div className="flex items-start gap-2.5">
              <CheckCircle2 className="h-4 w-4 text-brand-600 dark:text-brand-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Financial Data</p>
                <p className="text-gray-600 dark:text-gray-400 mt-0.5">
                  Transaction IDs, amounts (never stored in full), subscription plan type.
                </p>
              </div>
            </li>
          </ul>
        </div>

        <div className="mt-8 card p-6 space-y-5">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">2. How We Use Your Data</h2>
          <div className="space-y-3">
            <div className="flex items-start gap-2.5 text-sm text-gray-600 dark:text-gray-400">
              <CheckCircle2 className="h-4 w-4 text-brand-600 dark:text-brand-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Service Delivery</p>
                <p className="text-gray-600 dark:text-gray-400 mt-0.5">
                  We use your data to: create your account, show relevant listings, send notifications, provide customer support, and process transactions.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2.5 text-sm text-gray-600 dark:text-gray-400">
              <CheckCircle2 className="h-4 w-4 text-brand-600 dark:text-brand-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Analytics</p>
                <p className="text-gray-600 dark:text-gray-400 mt-0.5">
                  Anonymized usage trends to improve our platform, not tied to you personally.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2.5 text-sm text-gray-600 dark:text-gray-400">
              <CheckCircle2 className="h-4 w-4 text-brand-600 dark:text-brand-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Compliance & Security</p>
                <p className="text-gray-600 dark:text-gray-400 mt-0.5">
                  We share data only when required by law (NFCA, CBN, tax obligations) or to comply with valid legal requests.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2.5 text-sm text-gray-600 dark:text-gray-400">
              <CheckCircle2 className="h-4 w-4 text-brand-600 dark:text-brand-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Third-Party Services</p>
                <p className="text-gray-600 dark:text-gray-400 mt-0.5">
                  Paystack and/or Flutterwave for payments. Google for authentication. Firebase for hosting and data storage. SendGrid for transactional emails.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 card p-6 space-y-5 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">3. Data Storage & Security</h2>

          <div className="space-y-3">
            <div className="flex items-start gap-2.5">
              <Shield className="h-4 w-4 text-brand-600 dark:text-brand-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Firebase (Firestore + Storage)</p>
                <p className="text-gray-600 dark:text-gray-400 mt-0.5">
                  All data encrypted at rest and in transit. Firebase has SOC 2 Type II certification. We never store raw financial data.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Shield className="h-4 w-4 text-brand-600 dark:text-brand-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Encryption in Transit</p>
                <p className="data-[10px] text-gray-600 dark:text-gray-400 mt-0.5">
                  TLS 1.3 for all connections. HTTPS everywhere. Data encrypted at rest.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 text-sm text-gray-600 dark:text-gray-400">
              <Shield className="h-4 w-4 text-brand-600 dark:text-brand-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Data Retention</p>
                <p className="data-[10px] text-gray-600 dark:text-gray-400 mt-0.5">
                  We keep data only as long as your account is active. Deletion requests are processed within 30 days of request.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 text-sm text-gray-600 dark:text-gray-400">
              <Eye className="h-4 w-4 text-brand-600 dark:text-brand-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Your Rights</p>
                <p className="data-[10px] text-gray-600 dark:text-gray-400 mt-0.5">
                  You can request a full data export, account deletion, or data modification at any time. We comply within 72 hours.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Legal section */}
        <div className="mt-8 card p-6 space-y-5 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">4. Legal Basis</h2>
          <div className="space-y-3">
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="h-4 w-4 text-brand-600 dark:text-brand-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Nigeria Data Protection Act 2019 (NDPR)</p>
                <p className="text-gray-600 dark:text-gray-400 mt-0.5">
                  Legal basis for collecting and processing personal data in Nigeria. We act as a data controller.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2.5 text-sm text-gray-600 dark:text-gray-400">
              <CheckCircle2 className="h-4 w-4 text-brand-600 dark:text-brand-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">CBN Regulation 2021</p>
                <p className="text-gray-600 dark:text-gray-400 mt-0.5">
                  Required for BVN verification. We verify BVNs through approved CBN-licensed API calls.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2.5 text-sm text-gray-600 dark:text-gray-400">
              <CheckCircle2 className="h-4 w-4 text-brand-600 dark:text-brand-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Anti-Money Laundering</p>
                <p className="text-gray-600 dark:text-gray-400 mt-0.5">
                  All escrow transactions are monitored. Suspicious patterns are reported to relevant authorities.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact sidebar */}
        <div className="mt-8 grid sm:grid-cols-3 gap-4">
          <div className="card-hover">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 dark:bg-brand-500/10 border border-brand-200 dark:border-brand-500/20">
              <Mail className="h-5 w-5 text-brand-600 dark:text-brand-400" />
            </div>
            <div className="mt-3">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white">Email Us</h3>
              <p className="text-sm text-muted mt-0.5">info@tether.ng</p>
            </div>
          </div>

          <div className="card-hover">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-50 dark:bg-gold-400/10 border border-amber-200 dark:border-gold-400/20">
              <Phone className="h-5 w-5 text-amber-600 dark:text-gold-400" />
            </div>
            <div className="mt-3">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white">Call Us</h3>
              <p className="text-sm text-muted mt-0.5">+234 801 234 5678</p>
            </div>
          </div>

          <div className="card-hover">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 dark:bg-dark-200 border border-gray-200 dark:border-dark-400">
              <MapPin className="h-5 w-5 text-gray-500 dark:text-muted" />
            </div>
            <div className="mt-3">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white">Visit Us</h3>
              <p className="text-sm text-muted mt-0.5">Lagos, Nigeria</p>
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
                <span className="font-display text-lg font-bold text-gray-900 dark:text-white">
                  Tether<span className="text-brand-600 dark:text-brand-400">NG</span>
                </span>
              </Link>
              <p className="mt-4 text-sm leading-relaxed text-gray-500 dark:text-muted">
                Nigeria's most trusted property marketplace with secure escrow transactions.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Platform</h4>
              <ul className="mt-4 flex flex-col gap-2.5">
                <li><Link to="/listings" className="text-sm text-gray-500 dark:text-muted hover:text-gray-900 dark:hover:text-white transition-colors">Browse Listings</li>
                <Link to="/pricing" className="text-sm text-gray-500 dark:text-muted hover:text-gray-900 dark:hover:text-white transition-colors">Pricing</Link>
                <Link to="/how-it-works" className="text-sm text-gray-500 dark:text-muted hover:text-gray-900 dark:hover:text-white transition-colors">How It Works</Link>
                <Link to="/verification" className="text-sm text-gray-500 dark:text-muted hover:text-gray-900 dark:hover:text-white transition-colors">Get Verified</Link>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Company</h4>
              <ul className="mt-4 flex flex-col gap-2.5">
                <li><Link to="/about" className="text-sm text-gray-500 dark:text-muted hover:text-gray-900 dark:hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="/contact" className="text-sm text-gray-500 dark:text-muted hover:text-gray-900 dark:hover:text-white transition-colors">Contact</Link></li>
                <li><Link to="/careers" className="text-sm text-gray-500 dark:text-muted hover:text-gray-900 dark:hover:text-white transition-colors">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Legal</h4>
              <ul className="mt-4 flex flex-col gap-2.5">
                <Link to="/privacy" className="text-sm text-gray-500 dark:text-muted hover:text-gray-900 dark:hover:text-white transition-colors">Privacy Policy</Link></li>
                <Link to="/terms" className="text-sm text-gray-500 dark:text-muted hover:text-gray-900 dark:hover:text-white transition-colors">Terms of Service</Link></li>
                <Link to="/refund" className="text-sm text-gray-500 dark:text-muted hover:text-gray-900 dark:hover:text-white transition-colors">Refund Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-10 border-t border-gray-200 dark:border-dark-400 pt-6 text-center">
            <p className="text-xs text-gray-400 dark:text-muted">&copy; {new Date().getFullYear()} TetherNG. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
