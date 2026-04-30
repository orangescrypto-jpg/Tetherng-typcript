import { Routes, Route } from 'react-router-dom';
import ThemeInitializer from '@/components/layout/ThemeInitializer';
import LandingPage from '@/pages/LandingPage';
import ListingsPage from '@/pages/ListingsPage';
import AuthLayout from '@/components/layout/AuthLayout';
import DashboardLayout from '@/components/layout/DashboardLayout';
import LoginPage from '@/pages/auth/LoginPage';
import SignupPage from '@/pages/auth/SignupPage';
import ForgotPasswordPage from '@/pages/auth/ForgotPasswordPage';
import DashboardHome from '@/pages/dashboard/DashboardHome';
import CreateListingPage from '@/pages/dashboard/CreateListingPage';
import SubscriptionPage from '@/pages/dashboard/SubscriptionPage';
import VerificationPage from '@/pages/dashboard/VerificationPage';
import EscrowPage from '@/pages/dashboard/EscrowPage';
import EscrowDetailPage from '@/pages/escrow/EscrowDetailPage';
import SettingsPage from '@/pages/dashboard/SettingsPage';
import StaticPages from '@/pages/StaticPages';
import BoostListingsPage from '@/pages/dashboard/BoostListingsPage';

function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100 dark:bg-dark-200 border border-gray-200 dark:border-dark-400">
        <span className="text-2xl">🚧</span>
      </div>
      <h1 className="mt-6 font-display text-2xl font-bold text-gray-900 dark:text-white">{title}</h1>
      <p className="mt-2 text-sm text-muted">Coming soon</p>
    </div>
  );
}

export default function App() {
  return (
    <>
      <ThemeInitializer />
      <Routes>
        {/* Public */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/listings" element={<ListingsPage />} />
        <Route path="/pricing" element={<SubscriptionPage />} />

        {/* Auth */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        </Route>

        {/* Dashboard */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardHome />} />
          <Route path="/dashboard/listings" element={<PlaceholderPage title="My Listings" />} />
          <Route path="/dashboard/listings/new" element={<CreateListingPage />} />
          <Route path="/dashboard/saved" element={<PlaceholderPage title="Saved Properties" />} />
          <Route path="/dashboard/escrow" element={<EscrowPage />} />
          <Route path="/dashboard/escrow/:id" element={<EscrowDetailPage />} />
          <Route path="/dashboard/messages" element={<PlaceholderPage title="Messages" />} />
          <Route path="/dashboard/notifications" element={<PlaceholderPage title="Notifications" />} />
          <Route path="/dashboard/subscription" element={<SubscriptionPage />} />
          <Route path="/dashboard/verification" element={<VerificationPage />} />
          <Route path="/dashboard/boost" element={<BoostListingsPage />} />
          <Route path="/dashboard/settings" element={<SettingsPage />} />
        </Route>

        {/* Static pages */}
        <Route path="/about" element={<StaticPages />} />
        <Route path="/contact" element={<StaticPages />} />
        <Route path="/privacy" element={<StaticPages />} />
        <Route path="/terms" element={<StaticPages />} />
        <Route path="/refund" element={<StaticPages />} />
      </Routes>
    </>
  );
}
