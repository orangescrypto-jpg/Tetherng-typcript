/* ─── User Roles ─── */
export type UserRole = 'tenant' | 'agent' | 'landlord' | 'admin';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: UserRole;
  avatarUrl?: string;
  isVerified: boolean;
  verificationStatus: VerificationStatus;
  subscriptionPlan?: SubscriptionPlanSlug;
  subscriptionExpiry?: string;
  createdAt: string;
}

/* ─── Verification ─── */
export type VerificationStatus = 'none' | 'pending' | 'approved' | 'rejected';
export type VerificationType = 'agent' | 'property';

export interface VerificationRequest {
  id: string;
  userId: string;
  type: VerificationType;
  status: VerificationStatus;
  bvn?: string;
  idDocumentUrl?: string;
  propertyId?: string;
  amountPaid: number;
  paidAt: string;
  reviewedAt?: string;
  rejectionReason?: string;
  createdAt: string;
}

/* ─── Subscription Plans ─── */
export type SubscriptionPlanSlug = 'free' | 'basic' | 'pro' | 'premium';

export interface SubscriptionPlan {
  slug: SubscriptionPlanSlug;
  name: string;
  price: number; // in Naira
  interval: 'month' | 'year';
  features: string[];
  maxListings: number;
  highlighted?: boolean;
  rankBoost?: number;
  leadsAccess: boolean;
  verifiedBadge: boolean;
}

/* ─── Listing Types ─── */
export type ListingBoostType = 'none' | 'featured' | 'top_placement' | 'urgent';

export interface ListingBoostOption {
  type: ListingBoostType;
  label: string;
  description: string;
  price: number;
  icon: string;
}

export type PropertyType = 'apartment' | 'house' | 'duplex' | 'flat' | 'room' | 'land' | 'commercial';
export type ListingStatus = 'draft' | 'active' | 'paused' | 'sold' | 'rented';

export interface PropertyListing {
  id: string;
  agentId: string;
  agent: Pick<User, 'id' | 'firstName' | 'lastName' | 'avatarUrl' | 'isVerified'>;
  title: string;
  description: string;
  propertyType: PropertyType;
  listingType: 'rent' | 'sale';
  price: number;
  priceLabel: string;
  location: {
    state: string;
    lga: string;
    address: string;
  };
  bedrooms: number;
  bathrooms: number;
  toilets: number;
  parkingSpaces: number;
  areaSqM?: number;
  furnished: boolean;
  images: string[];
  videoUrl?: string;
  boostType: ListingBoostType;
  isPropertyVerified: boolean;
  status: ListingStatus;
  viewsCount: number;
  inquiriesCount: number;
  createdAt: string;
  updatedAt: string;
}

/* ─── Escrow ─── */
export type EscrowStep = 'initiated' | 'deposit' | 'held' | 'inspection' | 'released' | 'disputed' | 'refunded';
export type EscrowRole = 'tenant' | 'agent';

export interface EscrowTransaction {
  id: string;
  listingId: string;
  listing: Pick<PropertyListing, 'id' | 'title' | 'images' | 'price' | 'location' | 'agent'>;
  tenantId: string;
  agentId: string;
  amount: number;
  platformFee: number;
  currentStep: EscrowStep;
  role: EscrowRole;
  depositPaidAt?: string;
  fundsHeldAt?: string;
  inspectionDate?: string;
  releasedAt?: string;
  createdAt: string;
  updatedAt: string;
}

/* ─── Messaging ─── */
export interface Conversation {
  id: string;
  participants: Pick<User, 'id' | 'firstName' | 'lastName' | 'avatarUrl'>[];
  listingId: string;
  lastMessage: string;
  lastMessageAt: string;
  unreadCount: number;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  readAt?: string;
  createdAt: string;
}

/* ─── Notifications ─── */
export type NotificationType = 'lead' | 'payment' | 'verification' | 'escrow' | 'system';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  actionUrl?: string;
  createdAt: string;
}

/* ─── Payment ─── */
export interface PaymentIntent {
  id: string;
  amount: number;
  currency: 'NGN';
  description: string;
  metadata: Record<string, string>;
  status: 'pending' | 'completed' | 'failed';
  gateway: 'paystack' | 'flutterwave';
  authorizationUrl?: string;
  reference: string;
  createdAt: string;
}

/* ─── Filters ─── */
export interface ListingFilters {
  query?: string;
  state?: string;
  propertyType?: PropertyType;
  listingType?: 'rent' | 'sale';
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  boostType?: ListingBoostType;
  verifiedOnly?: boolean;
  furnished?: boolean;
  page?: number;
  limit?: number;
}

/* ─── API Response ─── */
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  }
