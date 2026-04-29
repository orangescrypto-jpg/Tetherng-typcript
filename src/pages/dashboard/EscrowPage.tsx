import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Shield, ArrowRight, Eye, Clock, CheckCircle2,
  AlertCircle, ArrowDownUp, Filter, Search,
} from 'lucide-react';
import { cn } from '@/utils/cn';
import { formatCurrency } from '@/utils/formatCurrency';
import { useAuthStore } from '@/store/authStore';
import type { EscrowTransaction, EscrowStep } from '@/types';

/* ─── Mock Escrow Data ─── */
const TENANT_ESCROWS: EscrowTransaction[] = [
  {
    id: 'e1',
    listingId: 'p1',
    listing: { id: 'p1', title: 'Modern 3-Bedroom Duplex in Lekki Phase 1', images: ['https://picsum.photos/seed/esc-lekki/100/100.jpg'], price: 8500000, location: { state: 'Lagos', lga: 'Lekki', address: '15 Admiralty Way' }, agent: { id: 'u3', firstName: 'Funke', lastName: 'Adesanya', avatarUrl: '', isVerified: true } },
    tenantId: 'u1',
    agentId: 'u3',
    amount: 8500000,
    platformFee: 127500,
    currentStep: 'held',
    role: 'tenant',
    depositPaidAt: '2024-10-20T10:30:00',
    fundsHeldAt: '2024-10-20T10:31:00',
    createdAt: '2024-10-20T10:00:00',
    updatedAt: '2024-10-20T10:31:00',
  },
  {
    id: 'e2',
    listingId: 'p5',
    listing: { id: 'p5', title: '5-Bed Detached House — Maitama', images: ['https://picsum.photos/seed/esc-mait/100/100.jpg'], price: 25000000, location: { state: 'Abuja', lga: 'Maitama', address: '3 Aso Drive' }, agent: { id: 'u3', firstName: 'Funke', lastName: 'Adesanya', avatarUrl: '', isVerified: true } },
    tenantId: 'u1',
    agentId: 'u3',
    amount: 25000000,
    platformFee: 3750000,
    currentStep: 'inspection',
    role: 'tenant',
    depositPaidAt: '2024-10-18T14:00:00',
    fundsHeldAt: '2024-10-18T14:01:00',
    inspectionDate: '2024-10-22',
    createdAt: '2024-10-18T13:00:00',
    updatedAt: '2024-10-18T14:01:00',
  },
  {
    id: 'e3',
    listingId: 'p4',
    listing: { id: 'p4', title: 'Self-Contain Room in Yaba', images: ['https://picsum.photos/seed/esc-yaba/100/100.jpg'], price: 450000, location: { state: 'Lagos', lga: 'Yaba', address: '24 Herbert Macaulay Way' }, agent: { id: 'u2', firstName: 'Adebayo', lastName: 'Ogundimu', avatarUrl: '', isVerified: false } },
    tenantId: 'u1',
    agentId: 'u2',
    amount: 450000,
    platformFee: 67500,
    currentStep: 'released',
    role: 'tenant',
    depositPaidAt: '2024-09-15T09:00:00',
    fundsHeldAt: '2024-09-15T09:01:00',
    inspectionDate: '2024-09-18',
    releasedAt: '2024-09-20T16:00:00',
    createdAt: '2024-09-15T08:00:00',
    updatedAt: '2024-09-20T16:00:00',
  },
];

const AGENT_ESCROWS: EscrowTransaction[] = [
  {
    id: 'e1',
    listingId: 'p1',
    listing: { id: 'p1', title: 'Modern 3-Bedroom Duplex in Lekki Phase 1', images: ['https://picsum.photos/seed/esc-lekki/100/100.jpg'], price: 8500000, location: { state: 'Lagos', lga: 'Lekki', address: '15 Admiralty Way' }, agent: { id: 'u3', firstName: 'Funke', lastName: 'Adesanya', avatarUrl: '', isVerified: true } },
    tenantId: 'u1',
    agentId: 'u3',
    amount: 8500000,
    platformFee: 127500,
    currentStep: 'held',
    role: 'agent',
    depositPaidAt: '2024-10-20T10:30:00',
    fundsHeldAt: '2024-10-20T10:31:00',
    createdAt: '2024-10-20T10:00:00',
    updatedAt: '2024-10-20T10:31:00',
  },
  {
    id: 'e2',
    listingId: 'p5',
    listing: { id: 'p5', title: '5-Bed Detached House — Maitama', images: ['https://picsum.photos/seed/esc-mait/100/100.jpg'], price: 25000000, location: { state: 'Abuja', lga: 'Maitama', address: '3 Aso Drive' }, agent: { id: 'u3', firstName: 'Funke', lastName: 'Adesanya', avatarUrl: '', isVerified: true } },
    tenantId: 'u1',
    agentId: 'u3',
    amount: 25000000,
    platformFee: 3750000,
    currentStep: 'inspection',
    role: 'agent',
    depositPaidAt: '2024-10-18T14:00:00',
    fundsHeldAt: '2024-10-18T14:01:00',
    inspectionDate: '2024-10-22',
    createdAt: '2024-10-18T13:00:00',
    updatedAt: '2024-10-18T14:01:00',
  },
  {
    id: 'e3',
    listingId: 'p4',
    listing: { id: 'p4', title: 'Self-Contain Room in Yaba', images: ['https://picsum.photos/seed/esc-yaba/100/100.jpg'], price: 450000, location: { state: 'Lagos', lga: 'Yaba', address: '24 Herbert Macaulay Way' }, agent: { id: 'u2', firstName: 'Adebayo', lastName: 'Ogundimu', avatarUrl: '', isVerified: false } },
    tenantId: 'u1',
    agentId: 'u2',
    amount: 450000,
    platformFee: 67500,
    currentStep: 'released',
    role: 'agent',
    depositPaidAt: '2024-09-15T09:00:00',
    fundsHeldAt: '2024-09-15T09:01:00',
    inspectionDate: '2024-09-18',
    releasedAt: '2024-09-20T16:00:00',
    createdAt: '2024-09-15T08:00:00',
    updatedAt: '2024-09-20T16:00:00',
  },
  {
    id: 'e4',
    listingId: 'p3',
    listing: { id: 'p3', title: 'Spacious 4-Bed Terrace — Gwarinpa', images: ['https://picsum.photos/seed/esc-gwari/100/100.jpg'], price: 85000000, location: { state: 'Abuja', lga: 'Gwarinpa', address: '12 Chile Crescent' }, agent: { id: 'u2', firstName: 'Adebayo', lastName: 'Ogundimu', avatarUrl: '', isVerified: false } },
    tenantId: 'u4',
    agentId: 'u2',
    amount: 85000000,
    platformFee: 12750000,
    currentStep: 'disputed',
    role: 'agent',
    depositPaidAt: '2024-10-10T11:00:00',
    fundsHeldAt: '2024-10-10T11:01:00',
    createdAt: '2024-10-10T10:00:00',
    updatedAt: '2024-10-15T09:00:00',
  },
];

type TabFilter = 'all' | 'active' | 'completed' | 'disputed';

const STEP_CONFIG: Record<EscrowStep, { label: string; color: string; bg: string }> = {
  initiated: { label: 'Initiated', color: 'text-gray-500 dark:text-muted', bg: 'bg-gray-200 dark:bg-dark-400' },
  deposit: { label: 'Deposit Made', color: 'text-amber-600 dark:text-gold-400', bg: 'bg-amber-500' },
  held: { label: 'Funds Held Securely', color: 'text-brand-600 dark:text-brand-400', bg: 'bg-brand-500' },
  inspection: { label: 'Inspection Period', color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-500' },
  released: { label: 'Funds Released', color: 'text-green-600 dark:text-success', bg: 'bg-green-500' },
  disputed: { label: 'Disputed', color: 'text-red-600 dark:text-danger', bg: 'bg-red-500' },
  refunded: { label: 'Refunded', color: 'text-gray-500 dark:text-muted', bg: 'bg-gray-400' },
};

const STEP_ORDER: EscrowStep[] = ['initiated', 'deposit', 'held', 'inspection', 'released'];

export default function EscrowPage() {
  const { user } = useAuthStore();
  const isAgent = user?.role === 'agent' || user?.role === 'landlord';
  const [tab, setTab] = useState<TabFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const escrows = isAgent ? AGENT_ESCROWS : TENANT_ESCROWS;

  const filtered = escrows.filter((e) => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      if (!e.listing.title.toLowerCase().includes(q) && !e.listing.location.lga.toLowerCase().includes(q)) return false;
    }
    if (tab === 'active') return ['deposit', 'held', 'inspection'].includes(e.currentStep);
    if (tab === 'completed') return e.currentStep === 'released';
    if (tab === 'disputed') return e.currentStep === 'disputed';
    return true;
  });

  const totalActive = escrows.filter((e) => ['deposit', 'held', 'inspection'].includes(e.currentStep)).length;
  const totalCompleted = escrows.filter((e) => e.currentStep === 'released').length;
  const totalDisputed = escrows.filter((e) => e.currentStep === 'disputed').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-gray-900 dark:text-white">Escrow Transactions</h1>
          <p className="text-sm text-muted mt-0.5">
            {isAgent ? 'Track payments from tenants' : 'Track your secure payments to agents'}
          </p>
        </div>
        {isAgent && (
          <Link to="/listings" className="btn-primary shrink-0 text-sm">
            <Shield className="h-4 w-4" /> How Escrow Works
          </Link>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="card-hover">
          <div className="flex items-center justify-between">
            <Clock className="h-5 w-5 text-amber-600 dark:text-gold-400" />
          </div>
          <p className="mt-2 font-display text-2xl font-bold text-gray-900 dark:text-white">{totalActive}</p>
          <p className="text-xs text-muted">Active Deals</p>
        </div>
        <div className="card-hover">
          <div className="flex items-center justify-between">
            <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-success" />
          </div>
          <p className="mt-2 font-display text-2xl font-bold text-gray-900 dark:text-white">{totalCompleted}</p>
          <p className="text-xs text-muted">Completed</p>
        </div>
        <div className="card-hover">
          <div className="flex items-center justify-between">
            <AlertCircle className="h-5 w-5 text-red-500 dark:text-danger" />
          </div>
          <p className="mt-2 font-display text-2xl font-bold text-gray-900 dark:text-white">{totalDisputed}</p>
          <p className="text-xs text-muted">Disputes</p>
        </div>
      </div>

      {/* Trust banner */}
      <div className="rounded-2xl border border-brand-200 dark:border-brand-500/20 bg-brand-50 dark:bg-brand-500/5 p-4 flex items-center gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-100 dark:bg-brand-500/20">
          <Shield className="h-5 w-5 text-brand-600 dark:text-brand-400" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-gray-900 dark:text-white">
            {isAgent ? 'Funds are held by TetherNG until the tenant confirms satisfaction' : 'Your money is held by TetherNG until you confirm the property is correct'}
          </p>
          <p className="text-xs text-muted mt-0.5">TetherNG charges {isAgent ? '1.5%' : '1.5%'} platform fee on all escrow transactions</p>
        </div>
        <Shield className="h-8 w-8 text-brand-300 dark:text-brand-600 shrink-0 opacity-50" />
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <div className="flex rounded-xl border border-gray-200 dark:border-dark-400 bg-gray-100 dark:bg-dark-200 p-1">
          {([
            { key: 'all', label: 'All' },
            { key: 'active', label: 'Active' },
            { key: 'completed', label: 'Completed' },
            { key: 'disputed', label: 'Disputed' },
          ] as const).map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={cn(
                'rounded-lg px-4 py-1.5 text-sm font-medium transition-all',
                tab === t.key ? 'bg-white dark:bg-dark-100 text-gray-900 dark:text-white shadow-sm' : 'text-muted hover:text-gray-900 dark:hover:text-white',
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-gray-200 dark:border-dark-400 bg-gray-100 dark:bg-dark-200 px-3 py-1.5 flex-1 sm:max-w-xs">
          <Search className="h-4 w-4 text-muted shrink-0" />
          <input type="text" placeholder="Search by property..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-transparent text-sm text-gray-900 dark:text-white placeholder:text-muted outline-none" />
        </div>
      </div>

      {/* Escrow list */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Shield className="h-12 w-12 text-gray-300 dark:text-dark-400" />
          <p className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">No transactions found</p>
          <p className="mt-1 text-sm text-muted">
            {isAgent ? 'Transactions appear when tenants start escrow on your listings' : 'Start an escrow transaction from any property listing'}
          </p>
          <Link to="/listings" className="btn-outline mt-4 text-sm">Browse Properties</Link>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((escrow) => (
            <EscrowRow key={escrow.id} escrow={escrow} />
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Escrow Row Component ─── */
function EscrowRow({ escrow }: { escrow: EscrowTransaction }) {
  const navigate = useNavigate();
  const stepConfig = STEP_CONFIG[escrow.currentStep];
  const stepIndex = STEP_ORDER.indexOf(escrow.currentStep);

  return (
    <button
      onClick={() => navigate(`/dashboard/escrow/${escrow.id}`)}
      className="w-full card-hover flex flex-col sm:flex-row sm:items-center gap-4 p-4 text-left"
    >
      {/* Property image */}
      <div className="relative h-20 w-full sm:h-20 sm:w-28 shrink-0 overflow-hidden rounded-xl">
        <img src={escrow.listing.images[0]} alt="" className="h-full w-full object-cover" />
        {/* Status dot */}
        <div className={cn('absolute top-2 right-2 h-3 w-3 rounded-full', stepConfig.bg)} />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white truncate group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
          {escrow.listing.title}
        </h3>
        <p className="text-xs text-muted mt-0.5">{escrow.listing.location.lga}, {escrow.listing.location.state}</p>

        <div className="mt-2 flex items-center gap-3">
          {/* Amount */}
          <span className="text-sm font-bold text-gray-900 dark:text-white">{formatCurrency(escrow.amount)}</span>
          <span className="text-[10px] text-muted">·</span>
          {/* Status */}
          <span className={cn('text-xs font-semibold', stepConfig.color)}>{stepConfig.label}</span>
        </div>

        {/* Progress dots */}
        <div className="mt-3 flex items-center gap-1.5">
          {STEP_ORDER.map((step, i) => (
            <div key={step} className={cn('h-1.5 flex-1 rounded-full transition-colors', i <= stepIndex ? stepConfig.bg : 'bg-gray-200 dark:bg-dark-400')} />
          ))}
        </div>
      </div>

      {/* Meta */}
      <div className="sm:text-right flex sm:flex-col items-start sm:items-end gap-1 shrink-0">
        {/* Agent/Tenant info */}
        <div className="flex items-center gap-1.5">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 dark:bg-dark-200 text-[10px] font-bold text-muted">
            {escrow.listing.agent.firstName[0]}{escrow.listing.agent.lastName[0]}
          </div>
          <span className="text-xs text-muted">
            {escrow.listing.agent.firstName} {escrow.listing.agent.lastName}
          </span>
          {escrow.listing.agent.isVerified && <CheckCircle2 className="h-3 w-3 text-green-600 dark:text-success" />}
        </div>
        <p className="text-[10px] text-muted">{new Date(escrow.createdAt).toLocaleDateString('en-NG', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
        <ArrowRight className="h-4 w-4 text-muted group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors hidden sm:block" />
      </div>
    </button>
  );
}

import { useNavigate } from 'react-router-dom';
