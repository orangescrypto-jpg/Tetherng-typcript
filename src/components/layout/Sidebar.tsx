import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Search, Heart, Shield, MessageSquare,
  Bell, Settings, PlusCircle, Building2, CreditCard,
  CheckCircle2, X, Tag,
} from 'lucide-react';
import { cn } from '@/utils/cn';
import { useAuthStore } from '@/store/authStore';
import { useUIStore } from '@/store/uiStore';
import type { UserRole } from '@/types';

interface NavItem {
  label: string;
  path: string;
  icon: React.ElementType;
  badge?: string;
  badgeColor?: string;
}

const NAV_ITEMS: Record<UserRole, NavItem[]> = {
  tenant: [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Browse Listings', path: '/listings', icon: Search },
    { label: 'Saved Properties', path: '/dashboard/saved', icon: Heart },
    { label: 'My Escrow', path: '/dashboard/escrow', icon: Shield },
    { label: 'Messages', path: '/dashboard/messages', icon: MessageSquare, badge: '3', badgeColor: 'bg-danger' },
    { label: 'Notifications', path: '/dashboard/notifications', icon: Bell, badge: '5', badgeColor: 'bg-gold-400' },
    { label: 'Settings', path: '/dashboard/settings', icon: Settings },
  ],
  agent: [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'My Listings', path: '/dashboard/listings', icon: Building2 },
    { label: 'Create Listing', path: '/dashboard/listings/new', icon: PlusCircle },
    { label: 'Boost Listing', path: '/dashboard/boost', icon: Tag },
    { label: 'Escrow Deals', path: '/dashboard/escrow', icon: Shield },
    { label: 'Messages', path: '/dashboard/messages', icon: MessageSquare, badge: '7', badgeColor: 'bg-danger' },
    { label: 'Notifications', path: '/dashboard/notifications', icon: Bell, badge: '2', badgeColor: 'bg-gold-400' },
    { label: 'Subscription', path: '/dashboard/subscription', icon: CreditCard },
    { label: 'Get Verified', path: '/dashboard/verification', icon: CheckCircle2 },
    { label: 'Settings', path: '/dashboard/settings', icon: Settings },
  ],
  landlord: [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'My Properties', path: '/dashboard/listings', icon: Building2 },
    { label: 'Add Property', path: '/dashboard/listings/new', icon: PlusCircle },
    { label: 'Boost Listing', path: '/dashboard/boost', icon: Tag },
    { label: 'Escrow Deals', path: '/dashboard/escrow', icon: Shield },
    { label: 'Messages', path: '/dashboard/messages', icon: MessageSquare },
    { label: 'Notifications', path: '/dashboard/notifications', icon: Bell },
    { label: 'Subscription', path: '/dashboard/subscription', icon: CreditCard },
    { label: 'Get Verified', path: '/dashboard/verification', icon: CheckCircle2 },
    { label: 'Settings', path: '/dashboard/settings', icon: Settings },
  ],
  admin: [
    { label: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { label: 'Users', path: '/admin/users', icon: Building2 },
    { label: 'Listings', path: '/admin/listings', icon: Building2 },
    { label: 'Escrow', path: '/admin/escrow', icon: Shield },
    { label: 'Verification', path: '/admin/verification', icon: CheckCircle2 },
    { label: 'Settings', path: '/admin/settings', icon: Settings },
  ],
};

/* ─── Upsell Banner Component ─── */
function UpsellBanner({ role }: { role: UserRole }) {
  if (role === 'tenant') return null;

  const navigate = useNavigate();
  const { user } = useAuthStore();

  const showVerificationUpsell = user?.verificationStatus !== 'approved';
  const showSubscriptionUpsell = user?.subscriptionPlan === 'free' || !user?.subscriptionPlan;

  if (!showVerificationUpsell && !showSubscriptionUpsell) return null;

  return (
    <div className="mx-3 mt-4 space-y-3">
      {showVerificationUpsell && (
        <button
          onClick={() => navigate('/dashboard/verification')}
          className="w-full rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 p-3.5 text-left transition-all hover:shadow-glow-brand hover:scale-[1.01] active:scale-[0.99]"
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-white" />
            <span className="text-xs font-bold text-white">Get Verified</span>
          </div>
          <p className="mt-1 text-[11px] leading-snug text-white/70">
            Build trust with tenants — verify your identity for ₦2,500
          </p>
        </button>
      )}
      {showSubscriptionUpsell && (
        <button
          onClick={() => navigate('/dashboard/subscription')}
          className="w-full rounded-xl bg-gradient-to-r from-gold-500 to-gold-400 p-3.5 text-left transition-all hover:shadow-glow-gold hover:scale-[1.01] active:scale-[0.99]"
        >
          <div className="flex items-center gap-2">
            <CreditCard className="h-4 w-4 text-surface-0" />
            <span className="text-xs font-bold text-surface-0">Upgrade Plan</span>
          </div>
          <p className="mt-1 text-[11px] leading-snug text-surface-0/70">
            Get priority ranking & tenant leads from ₦5K/month
          </p>
        </button>
      )}
    </div>
  );
}

/* ─── Main Sidebar ─── */
export default function Sidebar() {
  const { user } = useAuthStore();
  const { sidebarOpen, setSidebarOpen } = useUIStore();
  const role = user?.role || 'tenant';
  const items = NAV_ITEMS[role];

  return (
    <>
      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={cn(
          'fixed top-0 left-0 z-50 flex h-full w-[270px] flex-col border-r border-surface-300/50 bg-surface-50 transition-transform duration-300 lg:static lg:translate-x-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        {/* Logo area */}
        <div className="flex h-16 items-center justify-between px-5 border-b border-surface-300/50">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500">
              <Shield className="h-4 w-4 text-white" />
            </div>
            <span className="font-display text-lg font-bold text-white">
              Tether<span className="text-brand-400">NG</span>
            </span>
          </div>
          <button
            className="lg:hidden p-1 rounded-lg text-muted hover:text-white hover:bg-surface-200 transition-colors"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* User profile mini */}
        <div className="px-4 py-4 border-b border-surface-300/30">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-500/20 text-sm font-bold text-brand-400">
                {user?.firstName?.[0]}{user?.lastName?.[0]}
              </div>
              {user?.isVerified && (
                <div className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-success border-2 border-surface-50">
                  <CheckCircle2 className="h-2.5 w-2.5 text-white" />
                </div>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-white truncate">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-xs text-muted capitalize">{role}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <div className="space-y-0.5">
            {items.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 group',
                    isActive
                      ? 'bg-brand-500/10 text-brand-400 border border-brand-500/20'
                      : 'text-muted hover:bg-surface-200/50 hover:text-white border border-transparent',
                  )
                }
              >
                <item.icon className="h-[18px] w-[18px] shrink-0 transition-colors" />
                <span className="flex-1">{item.label}</span>
                {item.badge && (
                  <span className={cn(
                    'flex h-5 min-w-[20px] items-center justify-center rounded-full px-1.5 text-[10px] font-bold text-white',
                    item.badgeColor || 'bg-danger',
                  )}>
                    {item.badge}
                  </span>
                )}
              </NavLink>
            ))}
          </div>

          {/* Upsell banners */}
          <UpsellBanner role={role} />
        </nav>

        {/* Bottom: plan status */}
        {role !== 'tenant' && role !== 'admin' && (
          <div className="border-t border-surface-300/50 px-4 py-4">
            <div className="rounded-xl bg-surface-200/50 p-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-muted">Current Plan</span>
                <span className={cn(
                  'text-xs font-bold',
                  user?.subscriptionPlan && user.subscriptionPlan !== 'free'
                    ? 'text-gold-400'
                    : 'text-muted',
                )}>
                  {(user?.subscriptionPlan || 'free').toUpperCase()}
                </span>
              </div>
              {(!user?.subscriptionPlan || user.subscriptionPlan === 'free') && (
                <button
                  onClick={() => window.location.href = '/dashboard/subscription'}
                  className="mt-2 w-full rounded-lg bg-gold-400/10 border border-gold-400/20 py-2 text-[11px] font-bold text-gold-400 transition-all hover:bg-gold-400/20"
                >
                  UPGRADE NOW →
                </button>
              )}
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
