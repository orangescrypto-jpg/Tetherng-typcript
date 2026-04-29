import { Outlet, Navigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import { useAuthStore } from '@/store/authStore';

export default function DashboardLayout() {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-surface-0">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
