import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Search, SlidersHorizontal, X, Star, Rocket, Flame,
  CheckCircle2, MapPin, Eye, ChevronDown, Grid3X3, List,
  Building2,
} from 'lucide-react';
import { cn } from '@/utils/cn';
import { formatCurrencyShort } from '@/utils/formatCurrency';
import { NIGERIAN_STATES, PROPERTY_TYPES } from '@/utils/constants';
import type { PropertyListing, ListingBoostType, PropertyType } from '@/types';

/* ─── Mock Listings Data ─── */
const ALL_LISTINGS: PropertyListing[] = [
  {
    id: 'p1', agentId: 'u3', agent: { id: 'u3', firstName: 'Funke', lastName: 'Adesanya', avatarUrl: '', isVerified: true },
    title: 'Modern 3-Bedroom Duplex in Lekki Phase 1', description: 'Beautifully finished duplex with ample parking space, fitted kitchen, and 24/7 security.',
    propertyType: 'duplex', listingType: 'rent', price: 8500000, priceLabel: 'per year',
    location: { state: 'Lagos', lga: 'Lekki', address: '15 Admiralty Way, Lekki Phase 1' },
    bedrooms: 3, bathrooms: 4, toilets: 5, parkingSpaces: 2, areaSqM: 280,
    furnished: true, images: ['https://picsum.photos/seed/list-lekki1/600/400.jpg'],
    boostType: 'featured', isPropertyVerified: true, status: 'active',
    viewsCount: 2340, inquiriesCount: 34, createdAt: '2024-10-01', updatedAt: '2024-10-01',
  },
  {
    id: 'p2', agentId: 'u3', agent: { id: 'u3', firstName: 'Funke', lastName: 'Adesanya', avatarUrl: '', isVerified: true },
    title: 'Luxury 2-Bed Apartment — Banana Island', description: 'Premium apartment with sea view, swimming pool access, and smart home features.',
    propertyType: 'apartment', listingType: 'rent', price: 12000000, priceLabel: 'per year',
    location: { state: 'Lagos', lga: 'Ikoyi', address: '8 Parkview Estate, Banana Island' },
    bedrooms: 2, bathrooms: 2, toilets: 2, parkingSpaces: 1, areaSqM: 150,
    furnished: true, images: ['https://picsum.photos/seed/list-ikoyi/600/400.jpg'],
    boostType: 'top_placement', isPropertyVerified: true, status: 'active',
    viewsCount: 3102, inquiriesCount: 48, createdAt: '2024-09-28', updatedAt: '2024-09-28',
  },
  {
    id: 'p3', agentId: 'u2', agent: { id: 'u2', firstName: 'Adebayo', lastName: 'Ogundimu', avatarUrl: '', isVerified: false },
    title: 'Spacious 4-Bed Terrace with Boys Quarter', description: 'Well-located terrace in a serene estate. BQ included, all rooms en-suite.',
    propertyType: 'house', listingType: 'sale', price: 85000000, priceLabel: 'for sale',
    location: { state: 'Abuja', lga: 'Gwarinpa', address: '12 Chile Crescent, Gwarinpa' },
    bedrooms: 4, bathrooms: 5, toilets: 6, parkingSpaces: 3, areaSqM: 350,
    furnished: false, images: ['https://picsum.photos/seed/list-gwari/600/400.jpg'],
    boostType: 'urgent', isPropertyVerified: false, status: 'active',
    viewsCount: 1876, inquiriesCount: 21, createdAt: '2024-10-05', updatedAt: '2024-10-05',
  },
  {
    id: 'p4', agentId: 'u2', agent: { id: 'u2', firstName: 'Adebayo', lastName: 'Ogundimu', avatarUrl: '', isVerified: false },
    title: 'Self-Contain Room in Yaba — Cheap Rent', description: 'Newly painted room with wardrobe, kitchenette, and prepaid meter.',
    propertyType: 'room', listingType: 'rent', price: 450000, priceLabel: 'per year',
    location: { state: 'Lagos', lga: 'Yaba', address: '24 Herbert Macaulay Way, Yaba' },
    bedrooms: 1, bathrooms: 1, toilets: 1, parkingSpaces: 0, areaSqM: 20,
    furnished: false, images: ['https://picsum.photos/seed/list-yaba/600/400.jpg'],
    boostType: 'none', isPropertyVerified: false, status: 'active',
    viewsCount: 543, inquiriesCount: 12, createdAt: '2024-10-10', updatedAt: '2024-10-10',
  },
  {
    id: 'p5', agentId: 'u3', agent: { id: 'u3', firstName: 'Funke', lastName: 'Adesanya', avatarUrl: '', isVerified: true },
    title: '5-Bed Detached House — Maitama', description: 'Luxurious detached house with pool, gym, and boys quarter in a secure estate.',
    propertyType: 'house', listingType: 'rent', price: 25000000, priceLabel: 'per year',
    location: { state: 'Abuja', lga: 'Maitama', address: '3 Aso Drive, Maitama' },
    bedrooms: 5, bathrooms: 6, toilets: 7, parkingSpaces: 4, areaSqM: 500,
    furnished: true, images: ['https://picsum.photos/seed/list-mait/600/400.jpg'],
    boostType: 'featured', isPropertyVerified: true, status: 'active',
    viewsCount: 4201, inquiriesCount: 56, createdAt: '2024-09-20', updatedAt: '2024-09-20',
  },
  {
    id: 'p6', agentId: 'u2', agent: { id: 'u2', firstName: 'Adebayo', lastName: 'Ogundimu', avatarUrl: '', isVerified: false },
    title: '2-Bed Flat in Port Harcourt — GRA', description: 'Spacious flat in a quiet GRA neighbourhood with good road network.',
    propertyType: 'flat', listingType: 'rent', price: 2800000, priceLabel: 'per year',
    location: { state: 'Rivers', lga: 'Port Harcourt', address: '18 GRA Phase 2, Port Harcourt' },
    bedrooms: 2, bathrooms: 2, toilets: 2, parkingSpaces: 1, areaSqM: 110,
    furnished: false, images: ['https://picsum.photos/seed/list-ph/600/400.jpg'],
    boostType: 'none', isPropertyVerified: false, status: 'active',
    viewsCount: 321, inquiriesCount: 5, createdAt: '2024-10-12', updatedAt: '2024-10-12',
  },
  {
    id: 'p7', agentId: 'u3', agent: { id: 'u3', firstName: 'Funke', lastName: 'Adesanya', avatarUrl: '', isVerified: true },
    title: 'Commercial Office Space — Victoria Island', description: 'Open-plan office space in a prime business district. 24/7 power and security.',
    propertyType: 'commercial', listingType: 'rent', price: 15000000, priceLabel: 'per year',
    location: { state: 'Lagos', lga: 'Lagos Island', address: '45 Adeola Odeku, VI' },
    bedrooms: 0, bathrooms: 4, toilets: 4, parkingSpaces: 5, areaSqM: 300,
    furnished: false, images: ['https://picsum.photos/seed/list-vi/600/400.jpg'],
    boostType: 'top_placement', isPropertyVerified: true, status: 'active',
    viewsCount: 1890, inquiriesCount: 15, createdAt: '2024-10-02', updatedAt: '2024-10-02',
  },
  {
    id: 'p8', agentId: 'u2', agent: { id: 'u2', firstName: 'Adebayo', lastName: 'Ogundimu', avatarUrl: '', isVerified: false },
    title: 'Plot of Land — Ibeju Lekki', description: 'Dry land with C of O, close to the Lekki Free Trade Zone. Good for investment.',
    propertyType: 'land', listingType: 'sale', price: 35000000, priceLabel: 'for sale',
    location: { state: 'Lagos', lga: 'Ibeju-Lekki', address: 'Lekki Free Trade Zone axis' },
    bedrooms: 0, bathrooms: 0, toilets: 0, parkingSpaces: 0, areaSqM: 600,
    furnished: false, images: ['https://picsum.photos/seed/list-land/600/400.jpg'],
    boostType: 'urgent', isPropertyVerified: false, status: 'active',
    viewsCount: 987, inquiriesCount: 18, createdAt: '2024-10-08', updatedAt: '2024-10-08',
  },
  {
    id: 'p9', agentId: 'u3', agent: { id: 'u3', firstName: 'Funke', lastName: 'Adesanya', avatarUrl: '', isVerified: true },
    title: '3-Bedroom Bungalow — Ibadan', description: 'Well-maintained bungalow in a gated street. Compound parking for 3 cars.',
    propertyType: 'house', listingType: 'sale', price: 45000000, priceLabel: 'for sale',
    location: { state: 'Oyo', lga: 'Ibadan', address: '22 Ring Road, Ibadan' },
    bedrooms: 3, bathrooms: 3, toilets: 4, parkingSpaces: 3, areaSqM: 200,
    furnished: false, images: ['https://picsum.photos/seed/list-ibd/600/400.jpg'],
    boostType: 'none', isPropertyVerified: false, status: 'active',
    viewsCount: 456, inquiriesCount: 7, createdAt: '2024-10-14', updatedAt: '2024-10-14',
  },
];

type ViewMode = 'grid' | 'list';

export default function ListingsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [listingType, setListingType] = useState<'all' | 'rent' | 'sale'>('all');
  const [selectedState, setSelectedState] = useState('');
  const [selectedPropertyType, setSelectedPropertyType] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [filtersOpen, setFiltersOpen] = useState(false);

  /* ─── Filter + Sort Logic ─── */
  const filtered = useMemo(() => {
    let result = [...ALL_LISTINGS];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (l) =>
          l.title.toLowerCase().includes(q) ||
          l.location.state.toLowerCase().includes(q) ||
          l.location.lga.toLowerCase().includes(q) ||
          l.location.address.toLowerCase().includes(q),
      );
    }
    if (listingType !== 'all') result = result.filter((l) => l.listingType === listingType);
    if (selectedState) result = result.filter((l) => l.location.state === selectedState);
    if (selectedPropertyType) result = result.filter((l) => l.propertyType === selectedPropertyType);
    if (minPrice) result = result.filter((l) => l.price >= Number(minPrice));
    if (maxPrice) result = result.filter((l) => l.price <= Number(maxPrice));
    if (bedrooms) result = result.filter((l) => l.bedrooms >= Number(bedrooms));
    if (verifiedOnly) result = result.filter((l) => l.isPropertyVerified || l.agent.isVerified);
    if (featuredOnly) result = result.filter((l) => l.boostType === 'featured' || l.boostType === 'top_placement');

    // Sort: pinned/top first, then featured, then urgent, then by views
    result.sort((a, b) => {
      const boostOrder: Record<ListingBoostType, number> = { top_placement: 0, featured: 1, urgent: 2, none: 3 };
      if (boostOrder[a.boostType] !== boostOrder[b.boostType]) return boostOrder[a.boostType] - boostOrder[b.boostType];
      return b.viewsCount - a.viewsCount;
    });

    return result;
  }, [searchQuery, listingType, selectedState, selectedPropertyType, minPrice, maxPrice, bedrooms, verifiedOnly, featuredOnly]);

  const activeFilterCount = [selectedState, selectedPropertyType, minPrice, maxPrice, bedrooms].filter(Boolean).length + (verifiedOnly ? 1 : 0) + (featuredOnly ? 1 : 0);

  const clearFilters = () => {
    setSelectedState(''); setSelectedPropertyType(''); setMinPrice(''); setMaxPrice(''); setBedrooms(''); setVerifiedOnly(false); setFeaturedOnly(false); setListingType('all');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark">
      {/* Header bar */}
      <div className="border-b border-gray-200 dark:border-dark-400 bg-white dark:bg-dark-50/80 backdrop-blur-xl sticky top-0 z-30">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="font-display text-2xl font-bold text-gray-900 dark:text-white">Browse Properties</h1>
              <p className="text-sm text-muted mt-0.5">{filtered.length} properties found</p>
            </div>
            <div className="flex items-center gap-2">
              {/* Rent / Sale toggle */}
              <div className="flex rounded-xl border border-gray-200 dark:border-dark-400 bg-gray-100 dark:bg-dark-200 p-1">
                {(['all', 'rent', 'sale'] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setListingType(type)}
                    className={cn(
                      'rounded-lg px-4 py-1.5 text-sm font-medium transition-all capitalize',
                      listingType === type
                        ? 'bg-white dark:bg-dark-100 text-gray-900 dark:text-white shadow-sm'
                        : 'text-muted hover:text-gray-900 dark:hover:text-white',
                    )}
                  >
                    {type}
                  </button>
                ))}
              </div>
              {/* View toggle */}
              <div className="hidden sm:flex rounded-xl border border-gray-200 dark:border-dark-400 bg-gray-100 dark:bg-dark-200 p-1">
                <button onClick={() => setViewMode('grid')} className={cn('rounded-lg p-1.5 transition-all', viewMode === 'grid' ? 'bg-white dark:bg-dark-100 text-gray-900 dark:text-white shadow-sm' : 'text-muted')}><Grid3X3 className="h-4 w-4" /></button>
                <button onClick={() => setViewMode('list')} className={cn('rounded-lg p-1.5 transition-all', viewMode === 'list' ? 'bg-white dark:bg-dark-100 text-gray-900 dark:text-white shadow-sm' : 'text-muted')}><List className="h-4 w-4" /></button>
              </div>
              {/* Filter toggle */}
              <button onClick={() => setFiltersOpen(!filtersOpen)} className={cn('btn-outline relative py-2 text-sm', filtersOpen && 'border-brand-500 bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-400')}>
                <SlidersHorizontal className="h-4 w-4" />
                Filters
                {activeFilterCount > 0 && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-600 text-[10px] font-bold text-white">{activeFilterCount}</span>
                )}
              </button>
            </div>
          </div>

          {/* Search bar */}
          <div className="mt-4 flex gap-3">
            <div className="flex flex-1 items-center gap-3 rounded-xl border border-gray-200 dark:border-dark-400 bg-gray-50 dark:bg-dark-50 px-4 py-2.5 focus-within:border-brand-500 focus-within:ring-1 focus-within:ring-brand-500/30 transition-all">
              <Search className="h-4 w-4 text-muted shrink-0" />
              <input type="text" placeholder="Search by title, location, address..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-transparent text-sm text-gray-900 dark:text-white placeholder:text-muted outline-none" />
              {searchQuery && <button onClick={() => setSearchQuery('')} className="text-muted hover:text-gray-900 dark:hover:text-white"><X className="h-4 w-4" /></button>}
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex gap-6">
          {/* ─── Filters Sidebar ─── */}
          <div className={cn(
            'shrink-0 transition-all duration-300',
            filtersOpen ? 'w-72 block' : 'w-0 hidden',
          )}>
            <div className="sticky top-36 space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white">Filters</h3>
                {activeFilterCount > 0 && (
                  <button onClick={clearFilters} className="text-xs font-medium text-brand-600 dark:text-brand-400 hover:underline">Clear all</button>
                )}
              </div>

              {/* State */}
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">State</label>
                <select value={selectedState} onChange={(e) => setSelectedState(e.target.value)} className="input-field text-sm py-2.5">
                  <option value="">All States</option>
                  {NIGERIAN_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              {/* Property Type */}
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">Property Type</label>
                <select value={selectedPropertyType} onChange={(e) => setSelectedPropertyType(e.target.value)} className="input-field text-sm py-2.5">
                  <option value="">All Types</option>
                  {PROPERTY_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
                </select>
              </div>

              {/* Price Range */}
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">Price Range (₦)</label>
                <div className="flex gap-2">
                  <input type="number" placeholder="Min" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} className="input-field text-sm py-2.5" />
                  <input type="number" placeholder="Max" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} className="input-field text-sm py-2.5" />
                </div>
              </div>

              {/* Bedrooms */}
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">Min Bedrooms</label>
                <select value={bedrooms} onChange={(e) => setBedrooms(e.target.value)} className="input-field text-sm py-2.5">
                  <option value="">Any</option>
                  {[1, 2, 3, 4, 5].map((n) => <option key={n} value={n}>{n}+</option>)}
                </select>
              </div>

              {/* Toggles */}
              <div className="space-y-3 pt-2 border-t border-gray-200 dark:border-dark-400">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" checked={verifiedOnly} onChange={(e) => setVerifiedOnly(e.target.checked)} className="h-4 w-4 rounded border-gray-300 dark:border-dark-400 bg-white dark:bg-dark-50 text-brand-600 focus:ring-brand-500/50" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Verified only</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" checked={featuredOnly} onChange={(e) => setFeaturedOnly(e.target.checked)} className="h-4 w-4 rounded border-gray-300 dark:border-dark-400 bg-white dark:bg-dark-50 text-amber-500 focus:ring-amber-500/50" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Featured only</span>
                </label>
              </div>

              {/* Boost CTA for agents */}
              <div className="rounded-xl border border-amber-200 dark:border-gold-400/20 bg-amber-50 dark:bg-gold-400/5 p-4">
                <p className="text-xs font-bold text-amber-700 dark:text-gold-400">🚀 Are you an agent?</p>
                <p className="text-xs text-muted mt-1">Featured listings get 5x more views. Boost yours now.</p>
                <Link to="/login" className="btn-gold mt-3 w-full text-xs py-2">Boost Your Listing</Link>
              </div>
            </div>
          </div>

          {/* ─── Listings Grid/List ─── */}
          <div className="flex-1 min-w-0">
            {/* Active filter tags */}
            {activeFilterCount > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedState && <FilterTag label={selectedState} onRemove={() => setSelectedState('')} />}
                {selectedPropertyType && <FilterTag label={PROPERTY_TYPES.find((t) => t.value === selectedPropertyType)?.label || ''} onRemove={() => setSelectedPropertyType('')} />}
                {minPrice && <FilterTag label={`Min: ₦${Number(minPrice).toLocaleString()}`} onRemove={() => setMinPrice('')} />}
                {maxPrice && <FilterTag label={`Max: ₦${Number(maxPrice).toLocaleString()}`} onRemove={() => setMaxPrice('')} />}
                {bedrooms && <FilterTag label={`${bedrooms}+ Beds`} onRemove={() => setBedrooms('')} />}
                {verifiedOnly && <FilterTag label="Verified" onRemove={() => setVerifiedOnly(false)} />}
                {featuredOnly && <FilterTag label="Featured" onRemove={() => setFeaturedOnly(false)} />}
              </div>
            )}

            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <Building2 className="h-12 w-12 text-gray-300 dark:text-dark-400" />
                <p className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">No properties found</p>
                <p className="mt-1 text-sm text-muted">Try adjusting your filters or search query</p>
                <button onClick={clearFilters} className="btn-outline mt-4 text-sm">Clear All Filters</button>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((listing) => (
                  <ListingCard key={listing.id} listing={listing} />
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {filtered.map((listing) => (
                  <ListingRow key={listing.id} listing={listing} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Filter Tag ─── */
function FilterTag({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-lg bg-brand-50 dark:bg-brand-500/10 border border-brand-200 dark:border-brand-500/20 px-2.5 py-1 text-xs font-medium text-brand-700 dark:text-brand-400">
      {label}
      <button onClick={onRemove} className="hover:text-brand-900 dark:hover:text-white"><X className="h-3 w-3" /></button>
    </span>
  );
}

/* ─── Grid Card ─── */
function ListingCard({ listing }: { listing: PropertyListing }) {
  const wrapperClass = {
    none: 'card-hover',
    featured: 'listing-featured',
    top_placement: 'listing-pinned',
    urgent: 'listing-urgent',
  }[listing.boostType];

  return (
    <div className={cn(wrapperClass, 'group cursor-pointer')}>
      <div className="relative aspect-[16/10] overflow-hidden rounded-xl">
        <img src={listing.images[0]} alt={listing.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          {listing.boostType === 'featured' && <span className="badge-featured"><Star className="h-3 w-3" /> Featured</span>}
          {listing.boostType === 'top_placement' && <span className="inline-flex items-center gap-1 rounded-lg bg-brand-600/90 px-2.5 py-1 text-xs font-bold text-white"><Rocket className="h-3 w-3" /> Top</span>}
          {listing.boostType === 'urgent' && <span className="badge-urgent"><Flame className="h-3 w-3" /> Urgent</span>}
          {listing.isPropertyVerified && <span className="badge-verified"><CheckCircle2 className="h-3 w-3" /> Verified</span>}
        </div>
        {/* Listing type tag */}
        <div className="absolute top-3 right-3">
          <span className={cn('rounded-lg px-2 py-1 text-[10px] font-bold uppercase', listing.listingType === 'sale' ? 'bg-red-500/90 text-white' : 'bg-brand-600/90 text-white')}>
            For {listing.listingType}
          </span>
        </div>
        {/* Price */}
        <div className="absolute bottom-3 left-3">
          <span className="rounded-lg bg-black/60 backdrop-blur-sm px-3 py-1.5 text-sm font-bold text-white">
            {formatCurrencyShort(listing.price)} <span className="text-xs font-normal text-white/70">{listing.priceLabel}</span>
          </span>
        </div>
      </div>
      <div className="mt-4 px-1 pb-1">
        <h3 className="font-semibold text-gray-900 dark:text-white leading-snug line-clamp-2 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">{listing.title}</h3>
        <div className="mt-1.5 flex items-center gap-1 text-xs text-muted">
          <MapPin className="h-3 w-3 shrink-0" />{listing.location.lga}, {listing.location.state}
        </div>
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs text-muted">
            {listing.bedrooms > 0 && <span>{listing.bedrooms} Bed{listing.bedrooms > 1 ? 's' : ''}</span>}
            {listing.bedrooms > 0 && listing.bathrooms > 0 && <span className="h-1 w-1 rounded-full bg-gray-300 dark:bg-dark-400" />}
            {listing.bathrooms > 0 && <span>{listing.bathrooms} Bath{listing.bathrooms > 1 ? 's' : ''}</span>}
            {listing.areaSqM && <><span className="h-1 w-1 rounded-full bg-gray-300 dark:bg-dark-400" /><span>{listing.areaSqM}sqm</span></>}
          </div>
          {listing.boostType !== 'none' && (
            <span className="flex items-center gap-1 text-[10px] font-medium text-amber-600 dark:text-gold-400"><Eye className="h-3 w-3" />{listing.viewsCount.toLocaleString()}</span>
          )}
        </div>
        {listing.agent.isVerified && (
          <div className="mt-3 flex items-center gap-1.5 border-t border-gray-100 dark:border-dark-400/50 pt-3">
            <div className="h-5 w-5 rounded-full bg-green-50 dark:bg-brand-500/20 flex items-center justify-center"><CheckCircle2 className="h-3 w-3 text-green-600 dark:text-success" /></div>
            <span className="text-xs text-muted">{listing.agent.firstName} {listing.agent.lastName} · Verified</span>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── List Row ─── */
function ListingRow({ listing }: { listing: PropertyListing }) {
  const wrapperClass = {
    none: 'card-hover',
    featured: 'listing-featured',
    top_placement: 'listing-pinned',
    urgent: 'listing-urgent',
  }[listing.boostType];

  return (
    <div className={cn(wrapperClass, 'group cursor-pointer flex gap-4 p-3')}>
      <div className="relative h-28 w-36 sm:h-32 sm:w-44 shrink-0 overflow-hidden rounded-xl">
        <img src={listing.images[0]} alt={listing.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
        <div className="absolute top-2 left-2 flex gap-1">
          {listing.boostType === 'featured' && <span className="badge-featured text-[9px] py-0.5"><Star className="h-2.5 w-2.5" /></span>}
          {listing.boostType === 'urgent' && <span className="badge-urgent text-[9px] py-0.5"><Flame className="h-2.5 w-2.5" /></span>}
          {listing.isPropertyVerified && <span className="badge-verified text-[9px] py-0.5"><CheckCircle2 className="h-2.5 w-2.5" /></span>}
        </div>
        <div className="absolute top-2 right-2">
          <span className={cn('rounded px-1.5 py-0.5 text-[9px] font-bold uppercase', listing.listingType === 'sale' ? 'bg-red-500/90 text-white' : 'bg-brand-600/90 text-white')}>{listing.listingType}</span>
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-between min-w-0 py-1">
        <div>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white truncate group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">{listing.title}</h3>
          <div className="mt-1 flex items-center gap-1 text-xs text-muted"><MapPin className="h-3 w-3" />{listing.location.lga}, {listing.location.state}</div>
        </div>
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 text-[11px] text-muted">
            {listing.bedrooms > 0 && <span>{listing.bedrooms} Bed</span>}
            {listing.bathrooms > 0 && <span>{listing.bathrooms} Bath</span>}
            {listing.areaSqM && <span>{listing.areaSqM}sqm</span>}
            <span className="flex items-center gap-1"><Eye className="h-3 w-3" />{listing.viewsCount}</span>
          </div>
          <div className="text-right">
            <span className="text-sm font-bold text-brand-600 dark:text-brand-400">{formatCurrencyShort(listing.price)}</span>
            <p className="text-[10px] text-muted">{listing.priceLabel}</p>
          </div>
        </div>
        {listing.agent.isVerified && (
          <div className="flex items-center gap-1.5 border-t border-gray-100 dark:border-dark-400/50 pt-2 mt-1">
            <CheckCircle2 className="h-3 w-3 text-green-600 dark:text-success" />
            <span className="text-[11px] text-muted">{listing.agent.firstName} {listing.agent.lastName}</span>
          </div>
        )}
      </div>
    </div>
  );
}
