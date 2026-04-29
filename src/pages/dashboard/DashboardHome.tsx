import { Link } from 'react-router-dom';
import {
  Shield, Building2, Eye, MessageSquare, TrendingUp,
  ArrowRight, PlusCircle, Star, Rocket, Flame,
  CheckCircle2, AlertCircle, CreditCard,
} from 'lucide-react';
import { cn } from '@/utils/cn';
import { formatCurrencyShort } from '@/utils/formatCurrency';
import { useAuthStore } from '@/store/authStore';
import type { PropertyListing } from '@/types';

const TENANT_STATS = [
  { label: 'Saved Properties', value: '8', icon: Building2, color: 'text-brand-400' },
  { label: 'Active Escrow', value: '1', icon: Shield, color: 'text-gold-400' },
  { label: 'Messages', value: '12', icon: MessageSquare, color: 'text-brand-300' },
  { label: 'Profile Views', value: '34', icon: Eye, color: 'text-muted' },
];

const AGENT_STATS = [
  { label: 'Active Listings', value: '7', icon: Building2, color: 'text-brand-400' },
  { label: 'Total Views', value: '4,820', icon: Eye, color: 'text-gold-400' },
  { label: 'Inquiries', value: '23', icon: MessageSquare, color: 'text-brand-300' },
  { label: 'Escrow Revenue', value: '₦2.4M', icon: TrendingUp, color: 'text-success' },
];

const RECENT_LISTINGS: PropertyListing[] = [
  {
    id: 'l1',
    agentId: 'u2',
    agent: { id: 'u2', firstName: 'Adebayo', lastName: 'Ogundimu', isVerified: false },
    title: '3-Bed Flat in Yaba — Newly Renovated',
    description: '',
    propertyType: 'flat',
    listingType: 'rent',
    price: 1800000,
    priceLabel: 'per year',
    location: { state: 'Lagos', lga: 'Yaba', address: '24 Herbert Macaulay Way' },
    bedrooms: 3, bathrooms: 2, toilets: 3, parkingSpaces: 1,
    images: ['https://picsum.photos/seed/dash-yaba/400/250.jpg'],
    boostType: 'none',
    isPropertyVerified: false,
    status: 'active',
    viewsCount: 312,
    inquiriesCount: 5,
    furnished: false,
    createdAt: '2024-10-15',
    updatedAt: '2024-10-15',
  },
  {
    id: 'l2',
    agentId: 'u2',
    agent: { id: 'u2', firstName: 'Adebayo', lastName: 'Ogundimu', isVerified: false },
    title: 'Luxury 4-Bed Duplex — Lekki Phase 2',
    description: '',
    propertyType: 'duplex',
    listingType: 'rent',
    price: 6500000,
    priceLabel: 'per year',
    location: { state: 'Lagos', lga: 'Lekki', address: '15 Admiralty Way' },
    bedrooms: 4, bathrooms: 5, toilets: 6, parkingSpaces: 3,
    images: ['https://picsum.photos/seed/dash-lekki/400/250.jpg'],
    boostType: 'featured',
    isPropertyVerified: false,
    status: 'active',
    viewsCount: 1247,
    inquiriesCount: 18,
    furnished: true,
    createdAt: '2024-10-10',
    updatedAt: '2024-10-10',
  },
  {
    id: 'l3',
    agentId: 'u2',
    agent: { id: 'u2', firstName: 'Adebayo', lastName: 'Ogundimu', isVerified: false },
    title: '2-Bedroom Apartment — Gwarinpa Estate',
    description: '',
    propertyType: 'apartment',
    listingType: 'sale',
    price: 45000000,
    priceLabel: 'for sale',
    location: { state: 'Abuja', lga: 'Gwarinpa', address: '8 Constitution Ave' },
    bedrooms: 2, bathrooms: 2, toilets: 2, parkingSpaces: 1,
    images: ['https://picsum.photos/seed/dash-gwari/400/250.jpg'],
    boostType: 'urgent',
    isPropertyVerified: false,
    status: 'active',
    viewsCount: 876,
    inquiriesCount: 9,
    furnished: false,
    createdAt: '2024-10-08',
    updatedAt: '2024-10-08',
  },
];

export default function DashboardHome() {
  const { user } = useAuthStore();
  const isAgent = user?.role === 'agent' || user?.role === 'landlord';
  const stats = isAgent ? AGENT_STATS : TENANT_STATS;

  return (
    <div className="space-y-8">
      {/* Welcome header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">
            Welcome back, {user?.firstName} 👋
          </h1>
          <p className="mt-1 text-sm text-muted">
            {isAgent
              ? "Here's how your listings are performing today."
              : 'Find your next home from verified agents.'}
          </p>
        </div>
        {isAgent && (
          <Link to="/dashboard/listings/new" className="btn-primary shrink-0">
            <PlusCircle className="h-4 w-4" />
            New Listing
          </Link>
        )}
      </div>

      {/* Upsell banners (AGENT ONLY) */}
      {isAgent && (
        <div className="grid gap-4 sm:grid-cols-2">
          {user?.verificationStatus !== 'approved' && (
            <Link
              to="/dashboard/verification"
              className="group flex items-center gap-4 rounded-2xl border border-brand-500/20 bg-gradient-to-r from-brand-600/20 to-brand-500/10 p-5 transition-all hover:border-brand-500/40 hover:shadow-glow-brand"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-500/20 border border-brand-500/30">
                <CheckCircle2 className="h-6 w-6 text-brand-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-white">Get Verified — ₦2,500</p>
                <p className="text-xs text-muted mt-0.5">
                  Verified agents get 3x more tenant inquiries
                </p>
              </div>
              <ArrowRight className="h-5 w-5 text-brand-400 shrink-0 group-hover:translate-x-1 transition-transform" />
            </Link>
          )}

          {(!user?.subscriptionPlan || user.subscriptionPlan === 'free') && (
            <Link
              to="/dashboard/subscription"
              className="group flex items-center gap-4 rounded-2xl border border-gold-400/20 bg-gradient-to-r from-gold-500/15 to-gold-400/5 p-5 transition-all hover:border-gold-400/40 hover:shadow-glow-gold"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold-400/20 border border-gold-400/30">
                <CreditCard className="h-6 w-6 text-gold-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-white">Upgrade to Pro — ₦20K/mo</p>
                <p className="text-xs text-muted mt-0.5">
                  Priority ranking + tenant leads access
                </p>
              </div>
              <ArrowRight className="h-5 w-5 text-gold-400 shrink-0 group-hover:translate-x-1 transition-transform" />
            </Link>
          )}
        </div>
      )}

      {/* Stats cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="card-hover">
            <div className="flex items-center justify-between">
              <stat.icon className={cn('h-5 w-5', stat.color)} />
            </div>
            <p className="mt-3 font-display text-2xl font-bold text-white">{stat.value}</p>
            <p className="mt-0.5 text-xs text-muted">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Agent: Recent listings + boost CTAs */}
      {isAgent && (
        <div>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold text-white">Your Recent Listings</h2>
            <Link to="/dashboard/listings" className="text-sm font-medium text-brand-400 hover:text-brand-300 transition-colors flex items-center gap-1">
              View all <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {RECENT_LISTINGS.map((listing) => (
              <div key={listing.id} className="card-hover flex gap-4">
                <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-xl sm:h-24 sm:w-36">
                  <img
                    src={listing.images[0]}
                    alt={listing.title}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                  {listing.boostType !== 'none' && (
                    <div className="absolute top-1.5 left-1.5">
                      {listing.boostType === 'featured' && (
                        <span className="badge-featured text-[9px] py-0.5"><Star className="h-2.5 w-2.5" /> Featured</span>
                      )}
                      {listing.boostType === 'urgent' && (
                        <span className="badge-urgent text-[9px] py-0.5"><Flame className="h-2.5 w-2.5" /> Urgent</span>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex flex-1 flex-col justify-between min-w-0 py-0.5">
                  <div>
                    <h3 className="text-sm font-semibold text-white truncate">{listing.title}</h3>
                    <p className="text-xs text-muted mt-0.5">{listing.location.address}</p>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-4 text-[11px] text-muted">
                      <span className="flex items-center gap-1"><Eye className="h-3 w-3" />{listing.viewsCount}</span>
                      <span className="flex items-center gap-1"><MessageSquare className="h-3 w-3" />{listing.inquiriesCount}</span>
                    </div>
                    <span className="text-sm font-bold text-brand-400">
                      {formatCurrencyShort(listing.price)}
                    </span>
                  </div>
                </div>

                {listing.boostType === 'none' && (
                  <Link
                    to={`/dashboard/listings/${listing.id}/boost`}
                    className="hidden sm:flex flex-col items-center justify-center gap-1.5 shrink-0 rounded-xl border border-gold-400/20 bg-gold-400/5 px-3 py-2 hover:bg-gold-400/10 transition-colors self-center"
                  >
                    <Rocket className="h-4 w-4 text-gold-400" />
                    <span className="text-[9px] font-bold text-gold-400 uppercase">Boost</span>
                  </Link>
                )}
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-xl border border-surface-300 bg-surface-100 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gold-400/10">
                <Rocket className="h-4 w-4 text-gold-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Boost your listings for more visibility</p>
                <p className="text-xs text-muted">Featured listings get 5x more views on average</p>
              </div>
            </div>
            <Link to="/dashboard/boost" className="btn-gold shrink-0 text-sm py-2.5">
              <Rocket className="h-3.5 w-3.5" />
              Boost Now
            </Link>
          </div>
        </div>
      )}

      {/* Tenant: Quick actions */}
      {!isAgent && (
        <div className="grid gap-4 sm:grid-cols-3">
          <Link to="/listings" className="card-hover flex flex-col items-center gap-3 p-6 text-center group">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500/10 border border-brand-500/20 group-hover:bg-brand-500/20 transition-colors">
              <Building2 className="h-6 w-6 text-brand-400" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">Browse Listings</p>
              <p className="text-xs text-muted mt-1">Find verified properties near you</p>
            </div>
          </Link>
          <Link to="/dashboard/escrow" className="card-hover flex flex-col items-center gap-3 p-6 text-center group">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold-400/10 border border-gold-400/20 group-hover:bg-gold-400/20 transition-colors">
              <Shield className="h-6 w-6 text-gold-400" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">My Escrow</p>
              <p className="text-xs text-muted mt-1">Track your active transactions</p>
            </div>
          </Link>
          <Link to="/dashboard/saved" className="card-hover flex flex-col items-center gap-3 p-6 text-center group">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface-300/50 border border-surface-300 group-hover:bg-surface-300 transition-colors">
              <Star className="h-6 w-6 text-muted group-hover:text-gold-400 transition-colors" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">Saved Properties</p>
              <p className="text-xs text-muted mt-1">Your shortlisted homes</p>
            </div>
          </Link>
        </div>
      )}

      {/* Activity feed */}
      <div className="card">
        <h2 className="text-lg font-bold text-white mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {[
            { icon: Eye, text: 'Your listing "3-Bed Flat in Yaba" received 24 new views', time: '2 hours ago', color: 'text-brand-400' },
            { icon: MessageSquare, text: 'New inquiry from Chidi O. about "Luxury 4-Bed Duplex"', time: '5 hours ago', color: 'text-gold-400' },
            { icon: Shield, text: 'Escrow deposit of ₦1.8M received for Yaba flat', time: '1 day ago', color: 'text-success' },
            { icon: AlertCircle, text: 'Your verification documents were reviewed — action needed', time: '2 days ago', color: 'text-danger' },
          ].map((activity, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="mt-0.5">
                <activity.icon className={cn('h-4 w-4', activity.color)} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-white">{activity.text}</p>
                <p className="text-xs text-muted mt-0.5">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
