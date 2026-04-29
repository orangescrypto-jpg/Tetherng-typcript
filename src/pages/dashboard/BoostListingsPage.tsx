import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Star, Rocket, Flame, ArrowRight, Eye, TrendingUp,
  CheckCircle2, Shield, ArrowLeft, BarChart3, Crown,
} from 'lucide-react';
import { cn } from '@/utils/cn';
import { formatCurrency } from '@/utils/formatCurrency';
import { LISTING_BOOST_OPTIONS } from '@/utils/constants';
import { useAuthStore } from '@/store/authStore';
import type { PropertyListing, ListingBoostType } from '@/types';

/* ─── Mock agent listings for boost selection ─── */
const AGENT_LISTINGS: PropertyListing[] = [
  {
    id: 'l1',
    agentId: 'u2',
    agent: { id: 'u2', firstName: 'Adebayo', lastName: 'Ogundimu', avatarUrl: '', isVerified: false },
    title: '3-Bed Flat in Yaba — Newly Renovated',
    propertyType: 'flat', listingType: 'rent',
    price: 1800000, priceLabel: 'per year',
    location: { state: 'Lagos', lga: 'Yaba', address: '24 Herbert Macaulay Way' },
    bedrooms: 3, bathrooms: 2, toilets: 3, parkingSpaces: 1,
    images: ['https://picsum.photos/boost-yaba/400/250.jpg'],
    boostType: 'none',
    isPropertyVerified: false, status: 'active',
    viewsCount: 312, inquiriesCount: 5, furnished: false,
    createdAt: '2024-10-15', updatedAt: '2024-10-15',
  },
  {
    id: 'l2',
    agentId: 'u2',
    agent: { id: 'u2', firstName: 'Adebayo', lastName: 'Ogundimu', avatarUrl: '', isVerified: false },
    title: 'Luxury 4-Bed Duplex — Lekki Phase 2',
    propertyType: 'duplex', listingType: 'rent',
    price: 6500000, priceLabel: 'per year',
    location: { state: 'Lagos', lga: 'Lekki', address: '15 Admiralty Way' },
    bedrooms: 4, bathrooms: 5, toilets: 6, parkingSpaces: 3,
    images: ['https://picsum.photos/boost-lekki/400/250.jpg'],
    boostType: 'featured',
    isPropertyVerified: false, status: 'active',
    viewsCount: 1247, inquiriesCount: 18, furnished: true,
    createdAt: '2024-10-10', updatedAt: '2024-10-10',
  },
  {
    id: 'l3',
    agentId: 'u2',
    agent: { id: 'u2', firstName: 'Adebayo', lastName: 'Ogundimu', avatarUrl: '', isVerified: false },
    title: '2-Bedroom Apartment — Gwarinpa Estate',
    propertyType: 'apartment', listingType: 'rent',
    price: 2800000, priceLabel: 'per year',
    location: { state: 'Abuja', lga: 'Gwarinpa', address: '18 GRA Phase 2' },
    bedrooms: 2, bathrooms: 2, toilets: 2, parkingSpaces: 1,
    images: ['https://picsum.photos/boost-gwari/400/250.jpg'],
    boostType: 'urgent',
    isPropertyVerified: false, status: 'active',
    viewsCount: 876, inquiriesCount: 9, furnished: false,
    createdAt: '2024-10-08', updatedAt: '2024-10-08',
  },
  {
    id: 'l4',
    agentId: 'u2',
    agent: { id: 'u2', firstName: 'Adebayo', lastName: 'Ogundimu', avatarUrl: '', isVerified: false },
    title: 'Commercial Office Space — Victoria Island',
    propertyType: 'commercial', listingType: 'rent',
    price: 15000000, priceLabel: 'per year',
    location: { state: 'Lagos', lga: 'Lagos Island', address: '45 Adeola Odeku, VI' },
    bedrooms: 0, bathrooms: 4, toilets: 4, parkingSpaces: 5,
    images: ['https://picsum.photos/boost-vi/400/250.jpg'],
    boostType: 'none',
    isPropertyVerified: false, status: 'active',
    viewsCount: 321, inquiriesCount: 5, furnished: false,
    createdAt: '2024-10-12', updatedAt: '2024-10-12',
  },
  { id: 'l5',
    agentId: 'u3',
    agent: { id: 'u3', firstName: 'Funke', lastName: 'Adesanya', avatarUrl: '', isVerified: true },
    title: '5-Bed Detached House — Maitama',
    propertyType: 'house', listingType: 'rent',
    price: 25000000, priceLabel: 'per year',
    location: { state: 'Abuja', lga: 'Maitama', address: '3 Aso Drive' },
    bedrooms: 5, bathrooms: 6, toilets: 7, parkingSpaces: 4,
    images: ['https://picsum/boost-mait/400/250.jpg'],
    boostType: 'none',
    isPropertyVerified: true, status: 'active',
    viewsCount: 4201, inquiriesCount: 56, furnished: true,
    createdAt: '2024-09-20', updatedAt: '2024-09-20',
  },
];

/* ─── Simulated boost results ─── */
function getBoostedListing(listing: PropertyListing, boostType: ListingBoostType): PropertyListing {
  return {
    ...listing,
    boostType,
    viewsCount: listing.viewsCount * (boostType === 'featured' ? 5 : boostType === 'top_placement' ? 8 : boostType === 'urgent' ? 3 : 1),
  };
}

type BoostMode = 'select-listing' | 'select-boost' | 'confirm' | 'success';

export default function BoostListingsPage() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [mode, setMode] = useState<BoostMode>('select-listing');
  const [selectedListingId, setSelectedListingId] = useState<string | null>(null);
  const [selectedBoost, setSelectedBoost] = useState<ListingBoostType>('none');
  const [processing, setProcessing] = useState(false);
  const [boostedId, setBoostedId] = useState<string | null>(null);

  const selectedListing = AGENT_LISTINGS.find((l) => l.id === selectedListingId);
  const boostOption = LISTING_BOOST_OPTIONS.find((b) => b.type === selectedBoost);
  const previewListing = selectedListing && selectedBoost !== 'none' ? getBoostedListing(selectedListing, selectedBoost) : selectedListing;

  const handleBoost = async () => {
    if (!selectedListingId || !selectedBoost || selectedBoost === 'none') return;
    setProcessing(true);
    await new Promise((r) => setTimeout(r, 1800));
    setProcessing(false);
    setMode('success');
    setBoostedId(selectedListingId);
  };

  /* ─── SELECT LISTING MODE ─── */
  if (mode === 'select-listing') {
    const activeListings = AGENT_LISTINGS.filter((l) => l.status === 'active');
    const boostedListings = AGENT_LISTINGS.filter((l) => l.boostType !== 'none');

    return (
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold text-gray-900 dark:text-white">Boost a Listing</h1>
            <p className="mt-1 text-sm text-muted">Select one of your active listings to boost for more visibility</p>
          </div>
        </div>

        {boostedListListings.length > 0 && (
          <div className="rounded-2xl border border-amber-200 dark:border-gold-400/20 bg-amber-50 dark:bg-gold-400/5 p-4 flex items-center gap-3">
            <TrendingUp className="h-5 w-5 text-amber-600 dark:text-gold-400" />
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">{boostedListings.length} listing{boostedListListings.length !== 1 ? 's already boosted' : ' is boosted'} — getting {boostedListings.reduce((sum, l) => sum + (l.boostType === 'featured' ? 5 : 3)}x more views combined</p>
            </div>
          </div>
        )}

        {activeListings.length === 0 ? (
          <div className="card flex flex-col items-center justify-center py-16 text-center">
            <BarChart3 className="h-12 w-12 text-gray-300 dark:text-dark-400" />
            <p className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">No active listings to boost</p>
            <p className="mt-1 text-sm text-muted">Create a listing first, then come back here to boost it</p>
            <Link to="/dashboard/listings/new" className="btn-primary mt-4 px-8">
              Create Listing <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {activeListings.map((listing) => {
              const isBoosted = listing.boostType !== 'none';
              return (
                <button
                  key={listing.id}
                  onClick={() => { setSelectedListingId(listing.id); setSelectedBoost('none'); setMode('select-boost'); }}
                  className={cn(
                    'w-full flex items-center gap-4 rounded-2xl border-2 p-4 text-left transition-all',
                    isBoosted
                      ? 'border-amber-400/50 dark:border-gold-400/40 bg-amber-50/50 dark:bg-gold-400/5 shadow-glow-gold hover:shadow-[0_8px_25px_rgba(212,168,83,0.15)]'
                      : 'border-gray-200 dark:border-dark-400 bg-white dark:bg-dark-100 hover:border-gray-300 dark:hover:border-dark-500',
                  )}
                >
                  <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-xl">
                    <img src={listing.images[0]} alt="" className="h-full w-full object-cover" loading="lazy" />
                    {isBoosted && (
                      <div className="absolute top-2 left-2">
                        <span className="badge-featured text-[9px] py-0.5"><Star className="h-2.5 w-2.5" /> Featured</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white truncate">{listing.title}</h3>
                    <div className="flex items-center gap-2 mt-1 text-xs text-muted">
                      <span>{listing.location.lga}, {listing.location.state}</span>
                      <span className="h-1 w-1 rounded-full bg-gray-300 dark:bg-dark-400" />
                      <span className="text-brand-600 dark:text-brand-400 font-semibold">{formatCurrency(listing.price)}</span>
                    </div>
                  </div>
                  {isBoosted && (
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <Eye className="h-3 w-3 text-gold-400" />
                      <span className="text-[10px] font-bold text-gold-400">
                        {listing.viewsCount.toLocaleString()} views
                      </span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  /* ─── SELECT BOOST TYPE MODE ─── */
  if (mode === 'select-boost' && selectedListing) {
    return (
      <div className="max-w-2xl mx-auto animate-slide-up">
        {/* Back button */}
        <button onClick={() => { setSelectedListingId(null); setMode('select-listing'); }} className="flex items-center gap-1.5 text-sm text-muted hover:text-gray-900 dark:hover:text-white transition-colors mb-6">
          <ArrowRight className="h-3.5 w-3.5 rotate-180" /> Back to listings
        </button>

        {/* Property mini card */}
        <div className="listing-pinned p-3">
          <div className="relative aspect-[16/8] overflow-hidden rounded-xl -mx-3 -mt-8">
            <img src={previewListing.images[0]} alt="" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute bottom-2 left-3">
              <span className="rounded-lg bg-black/60 backdrop-blur-sm px-2.5 py-1 text-xs font-bold text-white">
                {formatCurrency(previewListing.price)}
              </span>
            </div>
          </div>

          <div className="px-1 pb-1">
            <h2 className="font-display text-xl font-bold text-gray-900 dark:text-white">Boost: {LISTING_BOOST_OPTIONS.find((b) => b.type === selectedBoost)?.label}</h2>
            <p className="mt-1 text-sm text-muted">{previewListing.location.lga}, {previewListing.location.state}</p>
          </div>
        </div>

        {/* Boost options */}
        <div className="space-y-3">
          {LISTING_BOOST_OPTIONS.filter((b) => b.type !== 'none').map((option) => {
            const Icon = option.type === 'featured' ? Star : option.type === 'top_placement' ? Rocket : Flame;
            const isSelected = selectedBoost === option.type;
            const previewWithBoost = selected && previewListing
              ? getBoostedListing(previewListing, option.type)
              : previewListing;
            const viewMultiplier = option.type === 'featured' ? 5 : option.type === 'top_placement' ? 8 : 3;

            return (
              <button
                key={option.type}
                onClick={() => setSelectedBoost(option.type)}
                className={cn(
                  'w-full flex items-start gap-4 rounded-2xl border-2 p-5 text-left transition-all duration-200',
                  isSelected
                    ? 'border-brand-500 bg-brand-50 dark:bg-brand-500/10 shadow-glow-brand'
                    : 'border-gray-200 dark:border-dark-400 bg-white dark:bg-dark-100 hover:border-gray-300 dark:hover:border-dark-500',
                )}
              >
                <div className={cn(
                  'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl',
                  isSelected
                    ? 'bg-brand-100 dark:bg-brand-500/20 text-brand-600 dark:text-brand-400'
                    : option.type === 'featured'
                      ? 'bg-amber-100 dark:bg-gold-400/10 text-amber-600 dark:text-gold-400'
                      : option.type === 'urgent'
                        ? 'bg-red-100 dark:bg-danger/10 text-red-600 dark:text-danger'
                        : 'bg-gray-100 dark:bg-dark-200 text-muted',
                )}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className={cn('text-sm font-bold', isSelected ? 'text-brand-700 dark:text-brand-400' : 'text-gray-900 dark:text-white'}>
                      {option.label}
                    </h3>
                    <span className={cn(
                      'text-sm font-bold',
                      option.price === 0 ? 'Free' : isSelected ? 'text-brand-700 dark:text-brand-400' : 'text-gray-900 dark:text-white',
                    )}>
                      {option.price === 0 ? 'Free' : formatCurrency(option.price)}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-muted leading-relaxed">{option.description}</p>
                </div>
                {isSelected && (
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-brand-600 dark:text-brand-400 mt-1" />
                )}
              </button>
            );
          })}

          {/* Preview comparison */}
          {selectedBoost !== 'none' && (
            <div className="rounded-2xl border border-gray-200 dark:border-dark-400 bg-white dark:bg-dark-100 p-5">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3">Preview</h3>
              <div className="flex items-center gap-6">
                {/* Current */}
                <div className="flex-1">
                  <p className="text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-1">Current</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">{listing.viewsCount.toLocaleString()} views</p>
                </div>
                <div className="text-gray-300 dark:text-dark-500 text-2xl font-display">→</div>
                {/* Boosted */}
                <div className="flex-1">
                  <p className="text-xs font-medium text-amber-700 dark:text-gold-400 uppercase tracking-wide mb-1">{selectedBoost.label}</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">{(previewListing.viewsCount).toLocaleString()} views</p>
                </div>
              </div>
              <div className="mt-3 rounded-xl bg-brand-50 dark:bg-brand-500/5 border border-brand-200 dark:border-brand-500/20 p-4 text-center">
                <p className="text-sm font-bold text-brand-700 dark:text-brand-400">
                  <span className="text-lg font-display">{viewMultiplier}x</span>
                  <span className="text-sm font-medium text-brand-600 dark:text-brand-400">more views</span>
                </p>
                <p className="text-xs text-muted mt-1">Based on average boost performance data</p>
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <button onClick={() => { setSelectedListingId(null); setMode('select-listing'); setSelectedBoost('none'); }} className="btn-outline flex-1 py-2.5 text-sm">
              <ArrowRight className="h-4 w-4 rotate-180" /> Choose Different Listing
            </button>
            <button
              onClick={handleBoost}
              disabled={processing}
              className={cn(
                'flex-1 py-2.5 text-sm font-bold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed',
                selectedBoost === 'featured' ? 'btn-gold' : 'btn-primary',
              )}
            >
              {processing ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-r-2 border-gray-300 dark:border-dark-400 border-t-transparent" />
                  Processing...
                </>
              ) : (
                <>
                  <span className={selectedBoost === 'featured' ? '' : ''}>
                    {selectedBoost?.label} — {formatCurrency(selectedBoost?.price || 0)}
                  </span>
                </>
              )}
            </button>
          </div>
        </div>
    );
  }

  /* ─── SUCCESS STATE ─── */
  if (mode === 'success') {
    const boostedListing = AGENT_LISTINGS.find((l) => l.id === boostedId);
    const boostType = LISTING_BOOST_OPTIONS.find((b) => boostedListing?.boostType === 'boosted');
    const preview = boostedListing ? getBoostedListing(boostedListing, boostedListing.boostType) : null;

    return (
      <div className="max-w-lg mx-auto py-16 text-center animate-fade-in">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-50 dark:bg-success/10 border-2 border-green-200 dark:border-success/20">
          <CheckCircle2 className="h-10 w-10 text-green-500 dark:text-success" />
        </div>
        <h1 className="Boost Activated!</h1>
        <p className="mt-2 text-muted">
          {preview ? `"${preview?.title}" is now getting ${boostType?.label?.toLowerCase()} visibility` : 'Your listing has been boosted!'}
        </p>

        {preview && (
          <div className="mt-8 rounded-2xl border border-green-200 dark:border-success/20 bg-green-50 dark:bg-success/5 p-5 text-left">
            <div className="relative aspect-[16/9] overflow-hidden rounded-xl">
              <img src={preview?.images[0]} alt="" className="h-full w-full object-cover" />
              {preview?.boostType === 'featured' && (
                <div className="absolute top-3 left-3">
                  <span className="badge-featured text-[10px] py-0.5"><Star className="h-2.5 w-2.5" /> Featured</span>
                </div>
              )}
              <div className="absolute bottom-2 left-3">
                <span className="rounded-lg bg-black/60 backdrop-blur-sm px-2.5 py-1 text-xs font-bold text-white">
                  {formatCurrency(preview?.price)}
                </span>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted">Views</span>
                <span className="font-bold text-gray-900 dark:text-white">{preview?.viewsCount?.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted">Boost type</span>
                <span className={cn(
                  'text-xs font-bold',
                  boostType === 'featured' ? 'text-amber-600 dark:text-gold-400' : 'text-gray-900 dark:text-white',
                )}>
                  {boostType?.label}
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 flex flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/dashboard/listings" className="btn-outline px-8 py-3">
            View All Listings
          </Link>
          <Link to="/dashboard/verification" className="btn-gold px-8 py-3">
            <Shield className="h-4 w-4" /> Get Verified
          </Link>
        </div>
      </div>
    );
  }

  return null;
}
