import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  User, Shield, CheckCircle2, Camera, Trash2, Eye, EyeOff,
  ArrowRight, Loader2, AlertCircle, Bell,
} from 'lucide-react';
import { cn } from '@/utils/cn';
import { useAuthStore } from '@/store/authStore';

const profileSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: z.string().email('Enter a valid email').or(z.literal('keep-current', { errorMap: () => ({ message: 'Keep current email' }) })),
  phone: z.string().min(10, 'Enter a valid phone number').or(z.literal('keep-current', { errorMap: () => ({ message: 'Keep current phone' }) })),
});

type ProfileFormData = z.infer<typeof profileSchema>;

const passwordSchema = z.object({
  currentPassword: z.string().min(6, 'Enter current password to confirm'),
  newPassword: z.string().min(8, 'Min 8 characters required'),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

type PasswordData = z.infer<typeof passwordSchema>;

export default function SettingsPage() {
  const navigate = useNavigate();
  const { user, updateUser, logout } = useAuthStore();
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'notifications' | 'danger'>('profile');
  const [profileMsg, setProfileMsg] = useState<{ type: 'success' | 'error'; message: string }>({ type: 'success', message: '' });
  const [passwordMsg, setPasswordMsg] = useState<{ type: 'success' | 'error'; message: string }>({ type: 'success', message: '' });
  const [deleteMsg, setDeleteMsg] = useState<{ show: boolean; message: string }>({ show: false, message: '' });

  // Profile form
  const {
    register: profileRegister,
    handleSubmit: handleProfileSubmit,
    formState: { errors: profileErrors },
    reset: profileReset,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      phone: user?.phone || '',
    },
  });

  // Password form
  const {
    register: pwRegister,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: pwErrors },
    reset: pwReset,
  } = useForm<PasswordData>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { currentPassword: '', newPassword: '', confirmPassword: '' },
  });

  const onProfileSubmit = async (data: ProfileFormData) => {
    setProfileMsg({ type: 'success', message: 'Profile updated successfully!' });
    updateUser({
      firstName: data.firstName || user?.firstName,
      lastName: data.lastName || user?.lastName,
      email: data.email === 'keep-current' ? user?.email : data.email,
      phone: data.phone === 'keep-current' ? user?.phone : data.phone,
    });
    profileReset();
  };

  const onPasswordSubmit = async (data: PasswordData) => {
    setPasswordMsg({ type: 'success', message: 'Password changed successfully!' });
    pwReset();
  };

  const handleDeleteAccount = () => {
    setDeleteMsg({ show: true, message: '' });
  };

  const confirmDelete = async () => {
    setDeleteMsg({ show: false, message: '' });
    setDeleteMsg({ show: false, message: 'Account deleted. Redirecting...' });
    await new Promise((r) => setTimeout(r, 1500));
    logout();
    navigate('/');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <h1 className="font-display text-2xl font-bold text-gray-900 dark:text-white">Account Settings</h1>
      <p className="text-sm text-muted">Manage your profile, security, and notification preferences.</p>

      {/* Tabs */}
      <div className="flex rounded-xl border border-gray-200 dark:border-dark-400 bg-gray-100 dark:bg-dark-200 p-1">
        {[
          { key: 'profile', label: 'Profile & Identity', icon: User },
          { key: 'security', label: 'Password & Security', icon: Shield },
          { key: 'notifications', label: 'Notifications', icon: Bell },
          { key: 'danger', label: 'Danger Zone', icon: AlertCircle },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => { setActiveTab(tab.key as typeof activeTab); setPasswordMsg({ type: 'success', message: '' }); }}
            className={cn(
              'flex-1 flex items-center gap-2 py-2.5 text-sm font-medium transition-all',
              activeTab === tab.key
                ? 'bg-white dark:bg-dark-100 text-gray-900 dark:text-white border-b-2 border-brand-500 text-brand-600 dark:text-brand-400'
                : 'text-muted hover:text-gray-900 dark:hover:text-white',
            )}
          >
            <tab.icon className="h-4 w-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* ─── PROFILE TAB ─── */}
      {activeTab === 'profile' && (
        <div className="card animate-fade-in space-y-6">
          {profileMsg.message && (
            <div className={cn(
              'rounded-xl border p-4 animate-slide-up',
              profileMsg.type === 'error'
                ? 'border-red-200 dark:border-danger/20 bg-red-50 dark:bg-danger/5'
                : 'border-green-200 dark:border-success/20 bg-green-50 dark:bg-success/5',
            )}>
              <p className={cn(
                'text-sm font-medium',
                profileMsg.type === 'error' ? 'text-red-600 dark:text-danger' : 'text-green-700 dark:text-success',
              )}>
                {profileMsg.message}
              </p>
            </div>
          )}

          <form onSubmit={handleProfileSubmit(onProfileSubmit)} className="space-y-5">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Personal Information</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-900 dark:text-white">First Name</label>
                <input
                  type="text"
                  placeholder="Chidi"
                  className={cn('input-field', profileMsg.message ? 'border-red-500 dark:border-danger' : '')}
                  {...profileRegister('firstName')}
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
                <input
                  type="text"
                  placeholder="Okonkwo"
                  className={cn('input-field', profileMsg.message ? 'border-red-500 dark:border-danger' : '')}
                  {...profileRegister('lastName')}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-900 dark:text-white">Email Address</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className={cn('input-field', profileMsg.message ? 'border-red-500 dark:border-danger' : '')}
                  {...profileRegister('email')}
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-900 dark:text-white">Phone Number</label>
                <input
                  type="tel"
                  placeholder="080 1234 5678"
                  className={cn('input-field', profileMsg.message ? 'border-red-500 dark:border-danger' : '')}
                  {...profileRegister('phone')}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={profileMsg.type === 'success'}
              className="btn-primary w-full py-3 text-sm disabled:opacity-50"
            >
              {profileMsg.type === 'success' ? (
                <>✓ Saved</>
              ) : (
                <>Save Changes</>
              )}
            </button>
          </form>
        </div>
      )}

      {/* ─── SECURITY TAB ─── */}
      {activeTab === 'security' && (
        <div className="card animate-fade-in space-y-6">
          {/* Profile status */}
          <div className="rounded-xl border border-gray-200 dark:border-dark-400 bg-white dark:bg-dark-100 p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 dark:bg-dark-200 text-lg font-bold text-gray-500 dark:text-dark-400">
                {user?.firstName?.[0]}{user?.lastName?.[0]}
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  {user?.firstName} {user?.lastName}
                </p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className={cn(
                    'rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide',
                    user?.isVerified
                      ? 'bg-green-50 dark:bg-success/15 text-green-700 dark:text-success border border-green-200 dark:border-success/20'
                      : 'bg-gray-100 dark:bg-dark-300 text-muted border border-gray-200 dark:border-dark-400',
                  )}>
                    {user?.isVerified ? '✓ Verified' : 'Unverified'}
                  </span>
                </div>
              </div>
            </div>

            {/* Password change */}
            {passwordMsg.message && (
              <div className={cn(
                'rounded-xl border p-4 animate-slide-up mt-6',
                passwordMsg.type === 'error'
                  ? 'border-red-200 dark:border-danger/20 bg-red-50 dark:bg-danger/5'
                  : 'border-green-200 dark:border-success/20 bg-green-50 dark:bg-success/5',
              )}>
                <p className={cn(
                  'text-sm font-medium',
                  passwordMsg.type === 'error' ? 'text-red-600 dark:text-danger' : 'text-green-700 dark:text-success',
                )}>
                  {passwordMsg.message}
                </p>
              </div>
            )}

            {!passwordMsg.message && (
              <form onSubmit={handlePasswordSubmit(onPasswordSubmit)} className="space-y-5 mt-6">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">Change Password</h2>
                <p className="text-sm text-muted">You'll need your current password to set a new one.</p>

                <div className="space-y-4">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-900 dark:text-white">Current Password</label>
                    <input
                      type="password"
                      placeholder="Enter current password"
                      className="input-field"
                      {...pwRegister('currentPassword')}
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-900 dark:text-white">New Password</label>
                    <input
                      type="password"
                      placeholder="Min 8 characters"
                      className="input-field"
                      {...pwRegister('newPassword')}
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-900 dark:text-white">Confirm New Password</label>
                    <input
                      type="password"
                      placeholder="Re-enter new password"
                      className="input-field"
                      {...pwRegister('confirmPassword')}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={passwordMsg.type === 'success'}
                  className="btn-primary w-full py-3 text-sm disabled:opacity-50"
                >
                  Update Password
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ─── NOTIFICATIONS TAB ─── */}
      {activeTab === 'notifications' && (
        <div className="card animate-fade-in space-y-5">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Notification Preferences</h2>
          <p className="text-sm text-muted">Choose what notifications you receive.</p>

          <div className="space-y-4">
            {[
              { label: 'Email Notifications', desc: 'Receive emails for new inquiries, escrow updates, and platform news', default: true },
              { label: 'Push Notifications', desc: 'Get browser push notifications for real-time updates', default: true },
              { label: 'SMS Notifications', desc: 'Get SMS alerts for time-sensitive updates (requires phone verification)', default: false },
              { label: 'Marketing Emails', desc: 'Occasional promotional emails about new features and offers', default: false },
            ].map((pref) => (
              <label key={pref.label} className="flex items-center justify-between rounded-xl border border-gray-200 dark:border-dark-400 bg-white dark:bg-dark-100 p-4 hover:border-gray-300 dark:hover:border-dark-500 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 dark:bg-dark-200">
                    <Bell className="h-5 w-5 text-gray-500 dark:text-dark-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{pref.label}</p>
                    <p className="text-xs text-muted mt-0.5">{pref.desc}</p>
                  </div>
                </div>
                <div className="flex h-6 w-11 items-center">
                  <label className="relative inline-flex h-5 w-11 cursor-pointer">
                    <input type="checkbox"
                      defaultChecked={pref.default}
                      className="h-5 w-11 cursor-pointer appearance-none rounded-full border-2 border-gray-300 dark:border-dark-400 bg-white dark:bg-dark-50 checked:bg-brand-600 checked:border-brand-600 checked:bg-brand-600 focus:ring-0 focus:ring-0 focus:ring-brand-500/25 text-brand-600 focus:ring-offset-0 cursor-pointer"
                    />
                  </label>
                </div>
              </label>
            ))}
          </div>

          {/* Danger Zone */}
          <div className="rounded-2xl border-2 border-red-200 dark:border-danger/20 bg-red-50 dark:bg-danger/5 p-5">
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="h-6 w-6 text-red-500 dark:text-danger" />
              <div>
                <h2 className="text-lg font-bold text-red-700 dark:text-danger">Danger Zone</h2>
                <p className="text-sm text-red-600 dark:text-red-400 mt-1">These actions are permanent and cannot be undone.</p>
              </div>
            </div>

            {/* Delete account */}
            {deleteMsg.show ? (
              <div className="rounded-xl border-2 border-red-200 dark:border-danger/20 bg-white dark:bg-dark-100 p-5 text-center animate-slide-up">
                <p className="text-sm font-semibold text-red-700 dark:text-danger">
                  Are you sure you want to delete your account?
                </p>
                <p className="text-xs text-red-600 dark:text-red-400 mt-2">
                  This will permanently delete your profile, listings, escrow history, and all data. This cannot be undone.
                </p>
                <div className="mt-4 flex flex-col sm:flex-row gap-3">
                  <button onClick={() => setDeleteMsg({ show: false, message: '' })} className="btn-outline flex-1 py-2.5 text-sm">
                    Cancel
                  </button>
                  <button onClick={confirmDelete} className="btn-danger flex-1 py-2.5 text-sm">
                    {deleteMsg.message ? (
                      <span className="flex items-center justify-center gap-1.5">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Deleting...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-1.5">
                        <Trash2 className="h-4 w-4" />
                        Delete Account
                      </span>
                    )}
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setDeleteMsg({ show: true, message: '' })}
                className="w-full rounded-xl border-2 border-dashed border-red-300 dark:border-danger/50 bg-white dark:bg-dark-100 p-5 text-center hover:bg-red-50 dark:hover:bg-danger/10 transition-colors"
              >
                <Trash2 className="h-6 w-6 text-red-400 dark:text-danger mx-auto" />
                <p className="mt-2 text-sm font-semibold text-red-700 dark:text-danger">Delete Account</p>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
