import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Shield, CheckCircle2, ArrowRight, Upload, AlertCircle,
  Loader2, X, Eye, EyeOff, FileText, UserCheck,
  Clock, ArrowLeft,
} from 'lucide-react';
import { cn } from '@/utils/cn';
import { formatCurrency } from '@/utils/formatCurrency';
import { VERIFICATION_PRICES } from '@/utils/constants';
import { useAuthStore } from '@/store/authStore';
import type { VerificationStatus } from '@/types';

type Step = 'intro' | 'pay' | 'upload' | 'submitted' | 'approved' | 'rejected';

export default function VerificationPage() {
  const navigate = useNavigate();
  const { user, updateUser } = useAuthStore();
  const [step, setStep] = useState<Step>(
    user?.verificationStatus === 'approved' ? 'approved' :
    user?.verificationStatus === 'pending' ? 'submitted' :
    user?.verificationStatus === 'rejected' ? 'rejected' : 'intro',
  );
  const [bvn, setBvn] = useState('');
  const [showBvn, setShowBvn] = useState(false);
  const [idFile, setIdFile] = useState<File | null>(null);
  const [idPreview, setIdPreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleIdUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      setError('ID document must not exceed 10MB');
      setTimeout(() => setError(''), 4000);
      return;
    }
    if (!file.type.startsWith('image/') && file.type !== 'application/pdf') {
      setError('Please upload a JPG, PNG, or PDF file');
      setTimeout(() => setError(''), 4000);
      return;
    }
    setIdFile(file);
    setError('');
    if (file.type.startsWith('image/')) {
      setIdPreview(URL.createObjectURL(file));
    } else {
      setIdPreview(null);
    }
  };

  const handlePay = async () => {
    setSubmitting(true);
    setError('');
    await new Promise((r) => setTimeout(r, 1500));
    setSubmitting(false);
    setStep('upload');
  };

  const handleSubmit = async () => {
    if (!bvn || bvn.length !== 11) {
      setError('Enter a valid 11-digit BVN');
      return;
    }
    if (!idFile) {
      setError('Please upload your ID document');
      return;
    }
    setSubmitting(true);
    setError('');
    await new Promise((r) => setTimeout(r, 2000));
    setSubmitting(false);
    updateUser({ verificationStatus: 'pending' });
    setStep('submitted');
  };

  /* ─── Approved State ─── */
  if (step === 'approved') {
    return (
      <div className="max-w-lg mx-auto py-12 text-center animate-fade-in">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-50 dark:bg-success/10 border-2 border-green-200 dark:border-success/20">
          <CheckCircle2 className="h-10 w-10 text-green-500 dark:text-success" />
        </div>
        <h1 className="mt-6 font-display text-2xl font-bold text-gray-900 dark:text-white">You're Verified!</h1>
        <p className="mt-2 text-muted">Your identity has been verified. The green badge is now visible on your profile and listings.</p>

        <div className="mt-8 grid grid-cols-3 gap-3">
          {[
            { label: 'Profile Badge', desc: 'Green checkmark', icon: UserCheck },
            { label: '3x More Inquiries', desc: 'Tenants trust you', icon: ArrowRight },
            { label: 'Escrow Access', desc: 'Receive payments', icon: Shield },
          ].map((item) => (
            <div key={item.label} className="card-hover flex flex-col items-center gap-2 p-4 text-center">
              <item.icon className="h-5 w-5 text-brand-600 dark:text-brand-400" />
              <p className="text-xs font-bold text-gray-900 dark:text-white">{item.label}</p>
              <p className="text-[10px] text-muted">{item.desc}</p>
            </div>
          ))}
        </div>

        <button onClick={() => navigate('/dashboard')} className="btn-primary mt-8 px-8">
          Back to Dashboard <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    );
  }

  /* ─── Submitted / Pending State ─── */
  if (step === 'submitted') {
    return (
      <div className="max-w-lg mx-auto py-12 text-center animate-fade-in">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-amber-50 dark:bg-gold-400/10 border-2 border-amber-200 dark:border-gold-400/20">
          <Clock className="h-10 w-10 text-amber-500 dark:text-gold-400 animate-pulse" />
        </div>
        <h1 className="mt-6 font-display text-2xl font-bold text-gray-900 dark:text-white">Verification In Progress</h1>
        <p className="mt-2 text-muted max-w-sm mx-auto">We're verifying your BVN and reviewing your ID document. This usually takes 1-24 hours.</p>

        <div className="mt-8 rounded-xl border border-amber-200 dark:border-gold-400/20 bg-amber-50 dark:bg-gold-400/5 p-5 text-left">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3">What happens next:</h3>
          <ul className="space-y-2.5">
            {[
              { text: 'BVN is checked against the NIBSS database', done: true },
              { text: 'Your ID document is reviewed by our team', done: true },
              { text: 'You receive an email once approved', done: false },
              { text: 'Green badge appears on your profile', done: false },
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-2.5 text-sm">
                {item.done ? (
                  <CheckCircle2 className="h-4 w-4 text-green-500 dark:text-success shrink-0" />
                ) : (
                  <div className="h-4 w-4 rounded-full border-2 border-amber-400 dark:border-gold-400 shrink-0" />
                )}
                <span className={item.done ? 'text-gray-500 dark:text-muted' : 'text-gray-700 dark:text-gray-300'}>{item.text}</span>
              </li>
            ))}
          </ul>
        </div>

        <button onClick={() => navigate('/dashboard')} className="btn-outline mt-8 px-8">
          Back to Dashboard
        </button>
      </div>
    );
  }

  /* ─── Rejected State ─── */
  if (step === 'rejected') {
    return (
      <div className="max-w-lg mx-auto py-12 animate-fade-in">
        <div className="text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-50 dark:bg-danger/10 border-2 border-red-200 dark:border-danger/20">
            <AlertCircle className="h-10 w-10 text-red-500 dark:text-danger" />
          </div>
          <h1 className="mt-6 font-display text-2xl font-bold text-gray-900 dark:text-white">Verification Failed</h1>
          <p className="mt-2 text-muted max-w-sm mx-auto">We couldn't verify your identity. This may be due to a mismatch between your BVN and ID document.</p>
        </div>

        <div className="mt-8 card p-5">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2">Common reasons:</h3>
          <ul className="space-y-2 text-sm text-muted">
            <li className="flex items-start gap-2"><AlertCircle className="h-4 w-4 text-red-500 shrink-0 mt-0.5" /> BVN does not match the name on your ID</li>
            <li className="flex items-start gap-2"><AlertCircle className="h-4 w-4 text-red-500 shrink-0 mt-0.5" /> ID document is blurry or unreadable</li>
            <li className="flex items-start gap-2"><AlertCircle className="h-4 w-4 text-red-500 shrink-0 mt-0.5" /> ID document is expired</li>
            <li className="flex items-start gap-2"><AlertCircle className="h-4 w-4 text-red-500 shrink-0 mt-0.5" /> BVN is not linked to a valid bank account</li>
          </ul>
        </div>

        <div className="mt-6 flex gap-3">
          <button onClick={() => { setStep('pay'); setError(''); }} className="btn-primary flex-1">
            Try Again <ArrowRight className="h-4 w-4" />
          </button>
          <button onClick={() => navigate('/dashboard')} className="btn-outline flex-1">
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  /* ─── Intro / Why Verify ─── */
  if (step === 'intro') {
    return (
      <div className="max-w-3xl mx-auto space-y-8">
        <button onClick={() => navigate('/dashboard')} className="flex items-center gap-1.5 text-sm text-muted hover:text-gray-900 dark:hover:text-white transition-colors">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Dashboard
        </button>

        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-50 dark:bg-brand-500/10 border border-brand-200 dark:border-brand-500/20">
            <Shield className="h-8 w-8 text-brand-600 dark:text-brand-400" />
          </div>
          <h1 className="mt-6 font-display text-2xl font-bold text-gray-900 dark:text-white">Get Your Verified Badge</h1>
          <p className="mt-2 text-muted max-w-md mx-auto">One-time BVN verification that builds trust with every client you interact with.</p>
        </div>

        {/* Trust stats */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { stat: '3.2x', label: 'More inquiries', desc: 'Verified agents get significantly more tenant leads' },
            { stat: '87%', label: 'Higher close rate', desc: 'Tenants prefer verified agents over unverified ones' },
            { stat: '₦2.5K', label: 'One-time fee', desc: 'Pay once, stay verified forever on TetherNG' },
          ].map((item) => (
            <div key={item.label} className="card-hover text-center p-5">
              <p className="font-display text-2xl font-bold text-brand-600 dark:text-brand-400">{item.stat}</p>
              <p className="text-sm font-semibold text-gray-900 dark:text-white mt-1">{item.label}</p>
              <p className="text-xs text-muted mt-0.5">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* What you get */}
        <div className="card p-6">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">What you get when verified</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { icon: CheckCircle2, title: 'Green verified badge', desc: 'Visible on your profile, listings, and messages', highlight: false },
              { icon: UserCheck, title: 'BVN-linked identity', desc: 'Clients can verify you are who you say you are', highlight: false },
              { icon: ArrowRight, title: 'Priority in search results', desc: 'Verified agents rank higher in listings', highlight: true },
              { icon: Shield, title: 'Escrow payout access', desc: 'Receive funds directly to your bank account', highlight: true },
              { icon: Eye, title: 'Profile views boost', desc: 'Your profile appears in the "Verified Agents" section', highlight: false },
              { icon: FileText, title: 'Property verification eligibility', desc: 'Only verified agents can verify their properties', highlight: true },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-3">
                <div className={cn('flex h-9 w-9 shrink-0 items-center justify-center rounded-lg', item.highlight ? 'bg-amber-50 dark:bg-gold-400/10 text-amber-600 dark:text-gold-400' : 'bg-gray-100 dark:bg-dark-200 text-muted')}>
                  <item.icon className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{item.title}</p>
                  <p className="text-xs text-muted mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How it works */}
        <div className="card p-6">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">How it works</h2>
          <div className="space-y-4">
            {[
              { step: '1', title: 'Pay verification fee', desc: `One-time payment of ${formatCurrency(VERIFICATION_PRICES.agent)} via Paystack or Flutterwave` },
              { step: '2', title: 'Enter your BVN', desc: 'Your 11-digit Bank Verification Number (find it in your bank app)' },
              { step: '3', title: 'Upload ID document', desc: 'Any valid government-issued ID (NIN slip, voter\'s card, passport, driver\'s license)' },
              { step: '4', title: 'Wait for review', desc: 'We verify your BVN against NIBSS and review your ID — usually within 1-24 hours' },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white">{item.step}</div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{item.title}</p>
                  <p className="text-xs text-muted mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <button onClick={() => setStep('pay')} className="btn-gold px-10 py-3.5 text-base">
            Verify My Identity — {formatCurrency(VERIFICATION_PRICES.agent)} <ArrowRight className="h-4 w-4" />
          </button>
          <p className="mt-2 text-xs text-muted">One-time fee · No recurring charges</p>
        </div>
      </div>
    );
  }

  /* ─── Payment Step ─── */
  if (step === 'pay') {
    return (
      <div className="max-w-md mx-auto animate-slide-up">
        <button onClick={() => setStep('intro')} className="flex items-center gap-1.5 text-sm text-muted hover:text-gray-900 dark:hover:text-white transition-colors mb-6">
          <ArrowRight className="h-3.5 w-3.5 rotate-180" /> Back
        </button>

        <div className="card p-6 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 dark:bg-gold-400/10 border border-amber-200 dark:border-gold-400/20">
            <Shield className="h-7 w-7 text-amber-600 dark:text-gold-400" />
          </div>
          <h2 className="mt-5 text-lg font-bold text-gray-900 dark:text-white">Verification Fee</h2>
          <p className="font-display text-3xl font-bold text-gray-900 dark:text-white mt-2">{formatCurrency(VERIFICATION_PRICES.agent)}</p>
          <p className="text-xs text-muted mt-1">One-time payment · No hidden charges</p>

          <div className="mt-6 space-y-2.5 text-left">
            <label className="flex items-center gap-3 cursor-pointer rounded-lg border border-brand-500 bg-brand-50 dark:bg-brand-500/5 p-3">
              <input type="radio" name="vpay" defaultChecked className="h-4 w-4 text-brand-600 focus:ring-brand-500/50" />
              <div className="flex items-center gap-2">
                <div className="h-6 w-8 rounded bg-blue-600 flex items-center justify-center"><span className="text-[8px] font-bold text-white">PS</span></div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">Paystack</span>
              </div>
            </label>
            <label className="flex items-center gap-3 cursor-pointer rounded-lg border border-gray-200 dark:border-dark-400 p-3 hover:border-gray-300 dark:hover:border-dark-500 transition-colors">
              <input type="radio" name="vpay" className="h-4 w-4 text-brand-600 focus:ring-brand-500/50" />
              <div className="flex items-center gap-2">
                <div className="h-6 w-8 rounded bg-orange-500 flex items-center justify-center"><span className="text-[8px] font-bold text-white">FW</span></div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">Flutterwave</span>
              </div>
            </label>
          </div>

          <button onClick={handlePay} disabled={submitting} className="btn-gold w-full mt-6 py-3.5 text-base">
            {submitting ? <><Loader2 className="h-4 w-4 animate-spin" />Processing...</> : <>Pay {formatCurrency(VERIFICATION_PRICES.agent)} <ArrowRight className="h-4 w-4" /></>}
          </button>

          <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-muted">
            <Shield className="h-3 w-3" /> Secured by 256-bit SSL encryption
          </div>
        </div>
      </div>
    );
  }

  /* ─── Upload Step ─── */
  if (step === 'upload') {
    return (
      <div className="max-w-lg mx-auto animate-slide-up">
        <div className="mb-6">
          <h1 className="font-display text-xl font-bold text-gray-900 dark:text-white">Submit Your Details</h1>
          <p className="text-sm text-muted mt-1">Payment received! Now enter your BVN and upload your ID.</p>
        </div>

        <div className="card space-y-6 p-6">
          {error && (
            <div className="flex items-start gap-2 rounded-lg border border-red-200 dark:border-danger/20 bg-red-50 dark:bg-danger/5 px-4 py-3">
              <AlertCircle className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
              <p className="text-sm text-red-600 dark:text-danger">{error}</p>
            </div>
          )}

          {/* BVN */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-900 dark:text-white">Bank Verification Number (BVN)</label>
            <p className="text-xs text-muted mb-2">Find this in your bank app under "BVN" or "Profile Settings"</p>
            <div className="relative">
              <input
                type={showBvn ? 'text' : 'password'}
                placeholder="Enter 11-digit BVN"
                value={bvn}
                onChange={(e) => setBvn(e.target.value.replace(/\D/g, '').slice(0, 11))}
                maxLength={11}
                className={cn('input-field pr-11 tracking-widest font-mono text-lg', error && bvn && 'border-red-500 dark:border-danger')}
              />
              <button type="button" onClick={() => setShowBvn(!showBvn)} className="absolute top-1/2 right-3 -translate-y-1/2 p-1 text-muted hover:text-gray-900 dark:hover:text-white">
                {showBvn ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {bvn && bvn.length === 11 && (
              <p className="mt-1.5 flex items-center gap-1.5 text-xs text-green-600 dark:text-success">
                <CheckCircle2 className="h-3 w-3" /> BVN format looks correct
              </p>
            )}
            {bvn && bvn.length < 11 && (
              <p className="mt-1.5 text-xs text-muted">{11 - bvn.length} more digit{11 - bvn.length !== 1 ? 's' : ''} needed</p>
            )}
          </div>

          {/* ID Upload */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-900 dark:text-white">ID Document</label>
            <p className="text-xs text-muted mb-2">NIN slip, Voter's card, International Passport, or Driver's License (max 10MB)</p>

            {idPreview ? (
              <div className="relative rounded-xl border border-gray-200 dark:border-dark-400 overflow-hidden">
                <img src={idPreview} alt="ID Preview" className="w-full max-h-56 object-contain bg-gray-100 dark:bg-dark-200" />
                <button onClick={() => { setIdFile(null); setIdPreview(null); }} className="absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white hover:bg-red-500 transition-colors">
                  <X className="h-4 w-4" />
                </button>
                {idFile && (
                  <div className="absolute bottom-2 left-2 rounded-md bg-black/60 backdrop-blur-sm px-2 py-1 text-[10px] font-medium text-white">
                    {idFile.name} ({(idFile.size / 1024 / 1024).toFixed(1)}MB)
                  </div>
                )}
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 dark:border-dark-400 py-10 cursor-pointer hover:border-brand-500 hover:bg-brand-50 dark:hover:bg-brand-500/5 transition-all">
                <Upload className="h-8 w-8 text-muted mb-2" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Click to upload ID</span>
                <span className="text-xs text-muted mt-0.5">JPG, PNG, or PDF · Max 10MB</span>
                <input type="file" accept="image/jpeg,image/png,image/webp,application/pdf" onChange={handleIdUpload} className="hidden" />
              </label>
            )}
          </div>

          {/* Name confirmation */}
          <div className="rounded-xl bg-amber-50 dark:bg-gold-400/5 border border-amber-200 dark:border-gold-400/20 p-4">
            <p className="text-xs font-bold text-amber-700 dark:text-gold-400">⚠️ Important</p>
            <p className="text-xs text-muted mt-1 leading-relaxed">The name on your BVN must match the name on your ID document. Mismatched names will cause verification to fail.</p>
          </div>

          <button onClick={handleSubmit} disabled={submitting} className="btn-gold w-full py-3.5 text-base">
            {submitting ? <><Loader2 className="h-4 w-4 animate-spin" />Submitting...</> : <>Submit for Verification <ArrowRight className="h-4 w-4" /></>}
          </button>
        </div>
      </div>
    );
  }

  return null;
}
