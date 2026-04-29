import type { SubscriptionPlan, ListingBoostOption } from '@/types';

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    slug: 'free',
    name: 'Free',
    price: 0,
    interval: 'month',
    features: [
      'Up to 3 active listings',
      'Basic visibility',
      'Standard support',
    ],
    maxListings: 3,
    leadsAccess: false,
    verifiedBadge: false,
  },
  {
    slug: 'basic',
    name: 'Basic',
    price: 5000,
    interval: 'month',
    features: [
      'Up to 15 active listings',
      'Verified agent badge',
      'Priority email support',
      'Basic analytics',
    ],
    maxListings: 15,
    verifiedBadge: true,
    leadsAccess: false,
  },
  {
    slug: 'pro',
    name: 'Pro',
    price: 20000,
    interval: 'month',
    features: [
      'Up to 50 active listings',
      'Verified agent badge',
      'Priority ranking in search',
      'Access to tenant leads',
      'Advanced analytics',
      'Dedicated support',
    ],
    maxListings: 50,
    highlighted: true,
    rankBoost: 2,
    leadsAccess: true,
    verifiedBadge: true,
  },
  {
    slug: 'premium',
    name: 'Premium',
    price: 50000,
    interval: 'month',
    features: [
      'Unlimited listings',
      'Verified agent badge',
      'Top priority ranking',
      'Exclusive tenant leads',
      'Full analytics suite',
      'Featured listing slot (1/month)',
      'Dedicated account manager',
      'Property verification discount',
    ],
    maxListings: Infinity,
    rankBoost: 5,
    leadsAccess: true,
    verifiedBadge: true,
  },
];

export const LISTING_BOOST_OPTIONS: ListingBoostOption[] = [
  {
    type: 'none',
    label: 'Free Listing',
    description: 'Standard visibility, shown in regular search results',
    price: 0,
    icon: 'eye',
  },
  {
    type: 'featured',
    label: 'Featured Listing',
    description: 'Larger card with gold border, shown prominently in results. Gets 5x more views on average.',
    price: 3000,
    icon: 'star',
  },
  {
    type: 'top_placement',
    label: 'Top of Search',
    description: 'Pinned to the very top of search results for 7 days. Maximum visibility guaranteed.',
    price: 5000,
    icon: 'rocket',
  },
  {
    type: 'urgent',
    label: 'Urgent Sale Badge',
    description: 'Bold red urgency badge signals serious sellers. Attracts ready-to-buy tenants.',
    price: 2000,
    icon: 'flame',
  },
];

export const NIGERIAN_STATES = [
  'Lagos', 'Abuja', 'Rivers', 'Oyo', 'Kano', 'Ogun', 'Kaduna',
  'Enugu', 'Delta', 'Anambra', 'Edo', 'Ondo', 'Akwa Ibom', 'Imo',
  'Cross River', 'Plateau', 'Benue', 'Ekiti', 'Kwara', 'Niger',
  'Borno', 'Sokoto', 'Abia', 'Bauchi', 'Gombe', 'Kebbi', 'Jigawa',
  'Yobe', 'Taraba', 'Nasarawa', 'Zamfara', 'Katsina', 'Kogi',
  'Osun', 'Bayelsa', 'Ebonyi', 'Adamawa', 'Taraba',
] as const;

export const PROPERTY_TYPES = [
  { value: 'apartment', label: 'Apartment' },
  { value: 'house', label: 'House' },
  { value: 'duplex', label: 'Duplex' },
  { value: 'flat', label: 'Flat' },
  { value: 'room', label: 'Room / Self-contain' },
  { value: 'land', label: 'Land' },
  { value: 'commercial', label: 'Commercial Space' },
] as const;

export const ESCROW_STEPS = [
  { key: 'initiated', label: 'Escrow Initiated', description: 'Transaction created, awaiting deposit' },
  { key: 'deposit', label: 'Deposit Made', description: 'Tenant has paid into escrow' },
  { key: 'held', label: 'Funds Held', description: 'Money is securely held by TetherNG' },
  { key: 'inspection', label: 'Inspection Period', description: 'Tenant verifies the property' },
  { key: 'released', label: 'Funds Released', description: 'Payment released to agent/landlord' },
] as const;

export const VERIFICATION_PRICES = {
  agent: 2500,
  property: 5000,
} as const;
