import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft, Shield, CheckCircle2, Clock, AlertCircle,
  Eye, ArrowRight, FileText, Loader2, MapPin, Star,
  MessageSquare, Phone, Home,
} from 'lucide-react';
import { cn } from '@/utils/cn';
import { formatCurrency } from '@/utils/formatCurrency';
import { useAuthStore } from '@/store/authStore';
import type { EscrowStep } from '@/types';

/* ─── Mock escrow detail ─── */
const MOCK_ESCROW = {
  id: 'e1',
  listingId: 'p1',
  listing: {
    id: 'p1', title: 'Modern 3-Bedroom Duplex in Lekki Phase 1',
    description: 'Beautifully finished 3-bedroom duplex with ample parking space, fitted kitchen, POP ceilings, and 24/7 security in a serene estate.',
    images: ['https://picsum.photos/seed/esc-detail-1/600/400.jpg', 'https://picsum.photos/seed/esc-detail-2/600/400.jpg', 'https://picsum.photos/seed/esc-detail-3/600/400.jpg'],
    price: 8500000, priceLabel: 'per year',
    location: { state: 'Lagos', lga: 'Lekki', address: '15 Admiralty Way, Lekki Phase 1' },
    agent: { id: 'u3', firstName: 'Funke', lastName: 'Adesanya', avatarUrl: '', phone: '08055512345', isVerified: true },
    bedrooms: 3, bathrooms: 4, toilets: 5, parkingSpaces: 2,
  },
  tenantId: 'u1',
  agentId: 'u3',
  amount: 8500000,
  platformFee: 127500,
  currentStep: 'held' as EscrowStep,
  role: 'tenant' as const,
  depositPaidAt: '2024-10-20T10:30:00',
  fundsHeldAt: '2024-10-20T10:31:00',
  inspectionDate: '2024-10-27',
  createdAt: '2024-10-20T10:00:00',
  updatedAt: '2024-10-20T10:31:00',
};

const STEPS = [
  { key: 'initiated' as EscrowStep, label: 'Escrow Initiated', description: 'Transaction created, awaiting deposit from buyer/tenant', icon: FileText },
  { key: 'deposit' as EscrowStep, label: 'Deposit Made', description: 'Tenant/buyer has paid the full amount into escrow', icon: ArrowRight },
  { key: 'held' as EscrowStep, label: 'Funds Held Securely', description: 'Money is safely held by TetherNG — not yet released to agent', icon: Shield },
  { key: 'inspection' as EscrowStep, label: 'Inspection Period', description: 'Tenant/buyer visits the property to verify it matches the listing', icon: Eye },
  { key: 'released' as EscrowStep, label: 'Funds Released', description: 'Payment has been released to the agent/landlord', icon: CheckCircle2 },
];

const STEP_ORDER: EscrowStep[] = ['initiated', 'deposit', 'held', 'inspection', 'released'];

export default function EscrowDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [activeImage, setActiveImage] = useState(0);
  const [confirmAction, setConfirmAction] = useState<'confirm' | 'dispute' | 'release' | null>(null);
  const [processing, setProcessing] = useState(false);

  // In production: fetch escrow by id from Firestore
  const escrow = MOCK_ESCROW;
  const isTenant = escrow.role === 'tenant';
  const stepIndex = STEP_ORDER.indexOf(escrow.currentStep);
  const isActive = ['deposit', 'held', 'inspection'].includes(escrow.currentStep);

  const handleAction = async (action: 'confirm' | 'dispute' | 'release') => {
    setProcessing(true);
    await new Promise((r) => setTimeout(r, 1500));
    setProcessing(false);
    setConfirmAction(null);
    // In production: update Firestore document
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Back */}
      <button onClick={() => navigate('/dashboard/escrow')} className="flex items-center gap-1.5 text-sm text-muted hover:text-gray-900 dark:hover:text-white transition-colors">
        <ArrowLeft className="h-3.5 w-3.5" /> Back to Escrow
      </button>

      {/* Top trust banner */}
      <div className={cn(
        'rounded-2xl border p-5 flex items-center gap-4',
        isActive
          ? 'border-brand-200 dark:border-brand-500/20 bg-brand-50 dark:bg-brand-500/5'
          : escrow.currentStep === 'released'
            ? 'border-green-200 dark:border-success/20 bg-green-50 dark:bg-success/5'
            : 'border-red-200 dark:border-danger/20 bg-red-50 dark:bg-danger/5',
      )}>
        <div className={cn(
          'flex h-12 w-12 shrink-0 items-center justify-center rounded-xl',
          isActive ? 'bg-brand-100 dark:bg-brand-500/20 text-brand-600 dark:text-brand-400' :
          escrow.currentStep === 'released' ? 'bg-green-100 dark:bg-success/10 text-green-600 dark:text-success' :
          'bg-red-100 dark:bg-danger/10 text-red-600 dark:text-danger',
        )}>
          <Shield className="h-6 w-6" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-bold text-gray-900 dark:text-white">
            {isActive && 'Your money is protected by TetherNG escrow'}
            {escrow.currentStep === 'released' && 'Transaction completed successfully'}
            {escrow.currentStep === 'disputed' && 'This transaction is under dispute review'}
            {!isActive && escrow.currentStep !== 'released' && escrow.currentStep !== 'disputed' && 'Transaction in progress'}
          </p>
          {isActive && (
            <p className="text-xs text-muted mt-0.5">
              {formatCurrency(escrow.amount)} will be held until you confirm satisfaction. TetherNG will not release funds without your approval.
            </p>
          )}
        </div>
      </div>

      {/* Main content grid */}
      <div className="grid lg:grid-cols-5 gap-6">
        {/* Left: Property info (3 cols) */}
        <div className="lg:col-span-3 space-y-5">
          {/* Images */}
          <div className="rounded-2xl overflow-hidden border border-gray-200 dark:border-dark-400">
            <div className="relative aspect-[16/10]">
              <img src={escrow.listing.images[activeImage]} alt="" className="h-full w-full object-cover" />
              <div className="absolute top-3 left-3">
                <span className={cn(
                  'rounded-lg px-2.5 py-1 text-xs font-bold',
                  escrow.currentStep === 'released' ? 'bg-green-500/90 text-white' :
                  escrow.currentStep === 'disputed' ? 'bg-red-500/90 text-white' :
                  'bg-brand-600/90 text-white',
                )}>
                  {escrow.currentStep === 'released' ? '✓ COMPLETED' : escrow.currentStep === 'disputed' ? '⚠ DISPUTED' : '🔒 IN ESCROW'}
                </span>
              </div>
            </div>
            <div className="flex gap-2 p-2">
              {escrow.listing.images.map((img, i) => (
                <button key={i} onClick={() => setActiveImage(i)} className={cn('h-16 w-20 rounded-lg overflow-hidden border-2 transition-all', activeImage === i ? 'border-brand-500' : 'border-transparent hover:border-gray-300 dark:hover:border-dark-500')}>
                  <img src={img} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Property details */}
          <div className="card">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">{escrow.listing.title}</h2>
            <div className="mt-2 flex items-center gap-1.5 text-sm text-muted">
              <MapPin className="h-4 w-4 shrink-0" />{escrow.listing.location.address}, {escrow.listing.location.lga}, {escrow.listing.location.state}
            </div>
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{escrow.listing.description}</p>

            <div className="mt-4 grid grid-cols-4 gap-3 pt-4 border-t border-gray-100 dark:border-dark-400/50">
              <div><p className="text-xs text-muted">Price</p><p className="text-sm font-bold text-gray-900 dark:text-white">{formatCurrency(escrow.listing.price)}</p></div>
              <div><p className="text-xs text-muted">Bedrooms</p><p className="text-sm font-bold text-gray-900 dark:text-white">{escrow.listing.bedrooms}</p></div>
              <div><p className="text-xs text-muted">Bathrooms</p><p className="text-sm font-bold text-gray-900 dark:text-white">{escrow.listing.bathrooms}</p></div>
              <div><p className="text-xs text-muted">Parking</p><p className="text-sm font-bold text-gray-900 dark:text-white">{escrow.listing.parkingSpaces}</p></div>
            </div>
          </div>

          {/* Agent info */}
          <div className="card">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3">{isTenant ? 'Agent Information' : 'Tenant Information'}</h3>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-100 dark:bg-brand-500/20 text-sm font-bold text-brand-700 dark:text-brand-400">
                {escrow.listing.agent.firstName[0]}{escrow.listing.agent.lastName[0]}
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  {escrow.listing.agent.firstName} {escrow.listing.agent.lastName}
                  {escrow.listing.agent.isVerified && <CheckCircle2 className="inline h-4 w-4 text-green-600 dark:text-success ml-1.5" />}
                </p>
                <p className="text-xs text-muted">{escrow.listing.agent.phone}</p>
              </div>
            </div>
            <div className="mt-3 flex gap-2">
              <button className="btn-outline flex-1 py-2 text-sm"><MessageSquare className="h-3.5 w-3.5" /> Message</button>
              <button className="btn-outline flex-1 py-2 text-sm"><Phone className="h-3.5 w-3.5" /> Call</button>
            </div>
          </div>

          {/* Action buttons (only when active) */}
          {isActive && isTenant && (
            <div className="space-y-3">
              {/* Confirm satisfaction */}
              {escrow.currentStep === 'inspection' && (
                <div className="rounded-2xl border-2 border-green-200 dark:border-success/20 bg-green-50 dark:bg-success/5 p-5">
                  <div className="flex items-start gap-3">
                    <Home className="h-6 w-6 text-green-600 dark:text-success shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <h3 className="text-sm font-bold text-gray-900 dark:text-white">Confirm Property Satisfaction</h3>
                      <p className="text-xs text-muted mt-1 leading-relaxed">
                        Have you inspected the property and confirmed it matches the listing? Once you confirm, the full amount ({formatCurrency(escrow.amount)}) will be released to the agent.
                      </p>
                      <p className="text-xs font-bold text-red-600 dark:text-danger mt-2">⚠️ This action cannot be reversed.</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setConfirmAction('confirm')}
                    disabled={processing}
                    className="mt-4 w-full rounded-xl bg-green-600 hover:bg-green-500 px-5 py-3 text-sm font-bold text-white transition-all disabled:opacity-50"
                  >
                    {processing ? <Loader2 className="h-4 w-4 animate-spin inline mr-2" /> : 'Yes, I Confirm — Release Funds'}
                  </button>
                </div>
              )}

              {/* Dispute */}
              <button
                onClick={() => setConfirmAction('dispute')}
                className="w-full rounded-2xl border border-red-200 dark:border-danger/20 bg-red-50 dark:bg-danger/5 p-4 flex items-center gap-3 text-left hover:bg-red-100 dark:hover:bg-danger/10 transition-colors"
              >
                <AlertCircle className="h-6 w-6 text-red-500 dark:text-danger shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-red-700 dark:text-danger">Raise a Dispute</p>
                  <p className="text-xs text-muted mt-0.5">If the property doesn't match the listing or there's an issue</p>
                </div>
                <ArrowRight className="h-4 w-4 text-red-400 shrink-0" />
              </button>
            </div>
          )}

          {/* Agent release button */}
          {isActive && !isTenant && escrow.currentStep === 'inspection' && (
            <div className="rounded-2xl border border-green-200 dark:border-success/20 bg-green-50 dark:bg-success/5 p-5">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white">Tenant has confirmed satisfaction</h3>
              <p className="text-xs text-muted mt-1">Release {formatCurrency(escrow.amount)} to your bank account (minus {formatCurrency(escrow.platformFee)} platform fee)</p>
              <button
                onClick={() => setConfirmAction('release')}
                disabled={processing}
                className="mt-4 w-full btn-primary py-3 disabled:opacity-50"
              >
                {processing ? <><Loader2 className="h-4 w-4 animate-spin inline mr-2" />Processing...</> : <>Release Funds to My Account</>}
              </button>
            </div>
          )}
        </div>

        {/* Right: Stepper + Summary (2 cols) */}
        <div className="lg:col-span-2 space-y-5">
          {/* Escrow Stepper */}
          <div className="card p-5">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4">Transaction Progress</h3>
            <div className="space-y-3">
              {STEPS.map((step, i) => {
                const isCompleted = i < stepIndex;
                const isCurrent = step.key === escrow.currentStep;
                const isPending = i > stepIndex;

                let borderColor = 'border-gray-200 dark:border-dark-300';
                let bgColor = 'bg-gray-50 dark:bg-dark-200/50';
                let textColor = 'text-muted';
                let iconColor = 'text-gray-400 dark:text-dark-500';

                if (isCompleted) {
                  borderColor = 'border-green-200 dark:border-success/20';
                  bgColor = 'bg-green-50 dark:bg-success/5';
                  textColor = 'text-green-700 dark:text-success';
                  iconColor = 'text-green-600 dark:text-success';
                } else if (isCurrent) {
                  borderColor = 'border-brand-200 dark:border-brand-500/30';
                  bgColor = 'bg-brand-50 dark:bg-brand-500/10';
                  textColor = 'text-brand-700 dark:text-brand-400';
                  iconColor = 'text-brand-600 dark:text-brand-400';
                } else if (step.key === 'disputed' && escrow.currentStep === 'disputed') {
                  borderColor = 'border-red-200 dark:border-danger/20';
                  bgColor = 'bg-red-50 dark:bg-danger/5';
                  textColor = 'text-red-700 dark:text-danger';
                  iconColor = 'text-red-500 dark:text-danger';
                }

                return (
                  <div key={step.key} className={cn('rounded-xl border p-4 transition-all', borderColor, bgColor)}>
                    <div className="flex items-center gap-3">
                      <div className={cn('flex h-9 w-9 shrink-0 items-center justify-center rounded-lg', isCompleted ? 'bg-green-500' : isCurrent ? 'bg-brand-500' : 'bg-gray-300 dark:bg-dark-400')}>
                        {isCompleted ? <CheckCircle2 className="h-4 w-4 text-white" /> : <step.icon className={cn('h-4 w-4', iconColor)} />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={cn('text-sm font-semibold', textColor)}>{step.label}</p>
                        <p className={cn('text-[11px] mt-0.5 leading-snug', isCurrent ? 'text-gray-700 dark:text-gray-300' : 'text-muted')}>{step.description}</p>
                      </div>
                    </div>
                    {isCompleted && <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-1" />}
                    {isCurrent && <div className="w-2 h-2 rounded-full bg-brand-500 animate-pulse shrink-0 mt-1" />}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Payment Summary */}
          <div className="card p-5">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4">Payment Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted">Property Price</span>
                <span className="font-semibold text-gray-900 dark:text-white">{formatCurrency(escrow.amount)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted">TetherNG Fee (1.5%)</span>
                <span className="font-semibold text-amber-600 dark:text-gold-400">{formatCurrency(escrow.platformFee)}</span>
              </div>
              <div className="border-t border-gray-200 dark:border-dark-400 pt-3 flex justify-between text-sm">
                <span className="font-bold text-gray-900 dark:text-white">Total Paid</span>
                <span className="font-bold text-lg text-gray-900 dark:text-white">{formatCurrency(escrow.amount + escrow.platformFee)}</span>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted">Transaction ID</span>
                <span className="font-mono text-gray-700 dark:text-gray-300">ESC-{escrow.id.toUpperCase()}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted">Created</span>
                <span className="text-gray-700 dark:text-gray-300">{new Date(escrow.createdAt).toLocaleString('en-NG', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
              </div>
              {escrow.depositPaidAt && (
                <div className="flex justify-between text-xs">
                  <span className="text-muted">Deposit Paid</span>
                  <span className="text-gray-700 dark:text-gray-300">{new Date(escrow.depositPaidAt).toLocaleString('en-NG', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                </div>
              )}
              {escrow.inspectionDate && (
                <div className="flex justify-between text-xs">
                  <span className="text-muted">Inspection Date</span>
                  <span className="text-blue-600 dark:text-blue-400 font-medium">{new Date(escrow.inspectionDate).toLocaleDateString('en-NG', { weekday: 'short', day: 'numeric', month: 'short' })}</span>
                </div>
              )}
              {escrow.releasedAt && (
                <div className="flex justify-between text-xs">
                  <span className="text-muted">Released</span>
                  <span className="text-green-600 dark:text-success font-medium">{new Date(escrow.releasedAt).toLocaleString('en-NG', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                </div>
              )}
            </div>
          </div>

          {/* What happens next */}
          {isActive && (
            <div className="rounded-2xl border border-gray-200 dark:border-dark-400 bg-white dark:bg-dark-100 p-5">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3">
                {isTenant ? 'What happens next?' : 'What the tenant sees'}
              </h3>
              <div className="space-y-2.5">
                {isTenant ? (
                  <>
                    <div className="flex items-start gap-2.5 text-xs">
                      <Star className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                      <div><p className="font-medium text-gray-900 dark:text-white">Schedule an inspection visit</p><p className="text-muted">Visit the property in person to verify it matches the listing</p></div>
                    </div>
                    <div className="flex items-start gap-2.5 text-xs">
                      <Eye className="h-4 w-4 text-brand-600 dark:text-brand-400 shrink-0 mt-0.5" />
                      <div><p className="font-medium text-gray-900 dark:text-white">Compare to the listing</p><p className="text-muted">Check rooms, amenities, and neighborhood match what was advertised</p></div>
                    </div>
                    <div className="flex items-start gap-2.5 text-xs">
                      <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-success shrink-0 mt-0.5" />
                      <div><p className="font-medium text-gray-900 dark:text-white">Confirm or dispute</p><p className="text-muted">If satisfied, click "Release Funds". If not, raise a dispute for TetherNG to investigate</p></div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-start gap-2.5 text-xs">
                      <Clock className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                      <div><p className="font-medium text-gray-900 dark:text-white">Wait for inspection</p><p className="text-muted">The tenant will visit the property and verify it</p></div>
                    </div>
                    <div className="flex items-start gap-2.5 text-xs">
                      <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-success shrink-0 mt-0.5" />
                      <div><p className="font-medium text-gray-900 dark:text-white">Receive payment</p><p className="text-muted">Once confirmed, funds are released to your bank account</p></div>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ─── Confirm Modal ─── */}
      {confirmAction && (
        <>
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" onClick={() => setConfirmAction(null)} />
          <div className="fixed inset-x-4 top-1/2 z-50 mx-auto max-w-md -translate-y-1/2 rounded-2xl border border-gray-200 dark:border-dark-400 bg-white dark:bg-dark-100 shadow-card-hover p-6 animate-slide-up">
            {confirmAction === 'confirm' && (
              <>
                <div className="flex items-center justify-center mx-auto mb-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100 dark:bg-success/10 border-2 border-green-200 dark:border-success/20">
                    <CheckCircle2 className="h-7 w-7 text-green-600 dark:text-success" />
                  </div>
                </div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white text-center">Confirm Satisfaction?</h2>
                <p className="text-sm text-muted text-center mt-2">
                  You're about to release <span className="font-bold text-gray-900 dark:text-white">{formatCurrency(escrow.amount)}</span> to{' '}
                  <span className="font-semibold text-gray-900 dark:text-white">{escrow.listing.agent.firstName} {escrow.listing.agent.lastName}</span>.
                </p>
                <p className="text-xs text-red-600 dark:text-danger text-center mt-3 font-medium">
                  This action is irreversible. Only confirm if you've inspected the property and are fully satisfied.
                </p>
                <div className="mt-5 flex gap-3">
                  <button onClick={() => setConfirmAction(null)} className="btn-outline flex-1 py-2.5 text-sm">Cancel</button>
                  <button onClick={() => handleAction('confirm')} disabled={processing} className="bg-green-600 hover:bg-green-500 flex-1 py-2.5 text-sm font-bold text-white rounded-xl transition-all disabled:opacity-50">
                    {processing ? <Loader2 className="h-4 w-4 animate-spin inline" /> : 'Confirm Release'}
                  </button>
                </div>
              </>
            )}
            {confirmAction === 'dispute' && (
              <>
                <div className="flex items-center justify-center mx-auto mb-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-100 dark:bg-danger/10 border-2 border-red-200 dark:border-danger/20">
                    <AlertCircle className="h-7 w-7 text-red-600 dark:text-danger" />
                  </div>
                </div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white text-center">Raise a Dispute?</h2>
                <p className="text-sm text-muted text-center mt-2">
                  Our team will investigate and hold the funds until the dispute is resolved. This typically takes 3-5 business days.
                </p>
                <div className="mt-5 flex gap-3">
                  <button onClick={() => setConfirmAction(null)} className="btn-outline flex-1 py-2.5 text-sm">Cancel</button>
                  <button onClick={() => handleAction('dispute')} disabled={processing} className="bg-red-600 hover:bg-red-500 flex-1 py-2.5 text-sm font-bold text-white rounded-xl transition-all disabled:opacity-50">
                    {processing ? <Loader2 className="h-4 w-4 animate-spin inline" /> : 'Submit Dispute'}
                  </button>
                </div>
              </>
            )}
            {confirmAction === 'release' && (
              <>
                <div className="flex items-center justify-center mx-auto mb-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100 dark:bg-success/10 border-2 border-green-200 dark:border-success/20">
                    <CheckCircle2 className="h-7 w-7 text-green-600 dark:text-success" />
                  </div>
                </div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white text-center">Release Funds?</h2>
                <p className="text-sm text-muted text-center mt-2">
                  You'll receive <span className="font-bold text-gray-900 dark:text-white">{formatCurrency(escrow.amount)}</span> minus the platform fee of{' '}
                  <span className="font-bold text-gray-900 dark:text-white">{formatCurrency(escrow.platformFee)}</span>.
                </p>
                <div className="mt-5 flex gap-3">
                  <button onClick={() => setConfirmAction(null)} className="btn-outline flex-1 py-2.5 text-sm">Cancel</button>
                  <button onClick={() => handleAction('release')} disabled={processing} className="bg-green-600 hover:bg-green-500 flex-1 py-2.5 text-sm font-bold text-white rounded-xl transition-all disabled:opacity-50">
                    {processing ? <Loader2 className="h-4 w-4 animate-spin inline" /> : 'Release Now'}
                  </button>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
