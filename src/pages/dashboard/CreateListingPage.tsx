import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft, ArrowRight, CheckCircle2, Star,
  Rocket, Flame, Eye, X, ImageIcon, Loader2, Shield,
} from 'lucide-react';
import { cn } from '@/utils/cn';
import { formatCurrency } from '@/utils/formatCurrency';
import { LISTING_BOOST_OPTIONS, NIGERIAN_STATES, PROPERTY_TYPES } from '@/utils/constants';
import type { ListingBoostType, PropertyType } from '@/types';
import FileUpload, { type UploadedFile } from '@/components/ui/FileUpload';

type Step = 1 | 2 | 3 | 4;

const STEPS = [
  { num: 1, label: 'Property Details' },
  { num: 2, label: 'Photos & Video' },
  { num: 3, label: 'Boost Listing' },
  { num: 4, label: 'Review & Publish' },
];

export default function CreateListingPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>(1);
  const [submitting, setSubmitting] = useState(false);

  /* Form state */
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [propertyType, setPropertyType] = useState<PropertyType | ''>('');
  const [listingType, setListingType] = useState<'rent' | 'sale'>('rent');
  const [price, setPrice] = useState('');
  const [state, setState] = useState('');
  const [lga, setLga] = useState('');
  const [address, setAddress] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [toilets, setToilets] = useState('');
  const [parking, setParking] = useState('');
  const [area, setArea] = useState('');
  const [furnished, setFurnished] = useState(false);
  const [boostType, setBoostType] = useState<ListingBoostType>('none');

  /* Real file uploads */
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  const imageCount = uploadedFiles.filter((f) => f.type === 'image').length;
  const videoCount = uploadedFiles.filter((f) => f.type === 'video').length;
  const coverPreview = uploadedFiles.find((f) => f.type === 'image')?.preview;

  const selectedBoost = LISTING_BOOST_OPTIONS.find((b) => b.type === boostType);
  const totalPrice = Number(price || 0) + (selectedBoost?.price || 0);
  const canProceedStep1 = title && propertyType && price && state;
  const canPublish = title && propertyType && price && state && imageCount > 0;

  const handlePublish = async () => {
    setSubmitting(true);
    // In production: upload files to cloud storage, then POST listing data to API
    // const formData = new FormData();
    // uploadedFiles.forEach(f => formData.append('files', f.file));
    // formData.append('title', title);
    // ... etc
    await new Promise((r) => setTimeout(r, 2000));
    setSubmitting(false);
    navigate('/dashboard/listings');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button onClick={() => navigate('/dashboard/listings')} className="p-2 rounded-lg text-muted hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-dark-200 transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <h1 className="font-display text-2xl font-bold text-gray-900 dark:text-white">Create New Listing</h1>
          <p className="text-sm text-muted">Add a property to your portfolio</p>
        </div>
      </div>

      {/* Stepper */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {STEPS.map((s) => (
          <button
            key={s.num}
            onClick={() => s.num < step && setStep(s.num as Step)}
            className={cn(
              'flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-all',
              step === s.num
                ? 'bg-brand-50 dark:bg-brand-500/10 border border-brand-200 dark:border-brand-500/20 text-brand-700 dark:text-brand-400'
                : s.num < step
                  ? 'bg-green-50 dark:bg-success/5 border border-green-200 dark:border-success/20 text-green-700 dark:text-success cursor-pointer'
                  : 'bg-gray-100 dark:bg-dark-200 border border-gray-200 dark:border-dark-400 text-muted',
            )}
          >
            {s.num < step ? <CheckCircle2 className="h-4 w-4" /> : <span className="text-xs font-bold">{s.num}</span>}
            <span className="hidden sm:inline">{s.label}</span>
          </button>
        ))}
      </div>

      {/* ─── Step 1: Property Details ─── */}
      {step === 1 && (
        <div className="card space-y-5 animate-fade-in">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Property Details</h2>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-900 dark:text-white">Listing Type</label>
            <div className="flex gap-3">
              {(['rent', 'sale'] as const).map((t) => (
                <button key={t} onClick={() => setListingType(t)} className={cn('flex-1 rounded-xl border-2 py-3 text-sm font-semibold capitalize transition-all', listingType === t ? 'border-brand-500 bg-brand-50 dark:bg-brand-500/10 text-brand-700 dark:text-brand-400' : 'border-gray-200 dark:border-dark-400 text-muted hover:border-gray-300 dark:hover:border-dark-500')}>
                  For {t}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-900 dark:text-white">Property Title</label>
            <input type="text" placeholder="e.g. Modern 3-Bedroom Duplex in Lekki" value={title} onChange={(e) => setTitle(e.target.value)} className="input-field" />
            <p className="mt-1 text-xs text-muted">Make it descriptive — listings with clear titles get 40% more views</p>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-900 dark:text-white">Property Type</label>
            <select value={propertyType} onChange={(e) => setPropertyType(e.target.value as PropertyType)} className="input-field">
              <option value="">Select type</option>
              {PROPERTY_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-900 dark:text-white">Description</label>
            <textarea placeholder="Describe the property features, neighborhood, amenities..." value={description} onChange={(e) => setDescription(e.target.value)} rows={4} className="input-field resize-none" />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-900 dark:text-white">Price (₦) <span className="text-muted font-normal">— {listingType === 'rent' ? 'annual rent' : 'sale price'}</span></label>
            <input type="number" placeholder="e.g. 5000000" value={price} onChange={(e) => setPrice(e.target.value)} className="input-field" />
            {price && <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">{formatCurrency(Number(price))}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-900 dark:text-white">State</label>
              <select value={state} onChange={(e) => setState(e.target.value)} className="input-field">
                <option value="">Select state</option>
                {NIGERIAN_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-900 dark:text-white">LGA / Area</label>
              <input type="text" placeholder="e.g. Lekki" value={lga} onChange={(e) => setLga(e.target.value)} className="input-field" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-900 dark:text-white">Address</label>
              <input type="text" placeholder="Street address" value={address} onChange={(e) => setAddress(e.target.value)} className="input-field" />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {[
              { label: 'Bedrooms', value: bedrooms, set: setBedrooms },
              { label: 'Bathrooms', value: bathrooms, set: setBathrooms },
              { label: 'Toilets', value: toilets, set: setToilets },
              { label: 'Parking', value: parking, set: setParking },
              { label: 'Area (sqm)', value: area, set: setArea },
            ].map((field) => (
              <div key={field.label}>
                <label className="mb-1.5 block text-xs font-medium text-gray-700 dark:text-gray-300">{field.label}</label>
                <input type="number" placeholder="0" value={field.value} onChange={(e) => field.set(e.target.value)} className="input-field text-sm py-2.5" />
              </div>
            ))}
          </div>

          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={furnished} onChange={(e) => setFurnished(e.target.checked)} className="h-4 w-4 rounded border-gray-300 dark:border-dark-400 bg-white dark:bg-dark-50 text-brand-600 focus:ring-brand-500/50" />
            <span className="text-sm text-gray-700 dark:text-gray-300">Property is furnished</span>
          </label>

          <div className="flex justify-end pt-2">
            <button onClick={() => setStep(2)} disabled={!canProceedStep1} className="btn-primary">
              Next: Photos <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* ─── Step 2: Real File Uploads ─── */}
      {step === 2 && (
        <div className="card space-y-5 animate-fade-in">
          <FileUpload
            files={uploadedFiles}
            onFilesChange={setUploadedFiles}
            maxImages={8}
            maxImageSizeMB={5}
            maxVideoSizeMB={50}
            maxVideos={1}
            label="Property Photos & Video"
            hint="First image will be used as the cover photo. Add a video tour to stand out."
          />

          {/* Tips */}
          <div className="rounded-xl bg-brand-50 dark:bg-brand-500/5 border border-brand-200 dark:border-brand-500/20 p-4">
            <p className="text-xs font-bold text-brand-700 dark:text-brand-400">📸 Tips for better photos</p>
            <ul className="mt-2 space-y-1 text-xs text-muted">
              <li>• Use good natural lighting — avoid dark or blurry shots</li>
              <li>• Show all rooms: living room, bedrooms, kitchen, bathrooms</li>
              <li>• Include exterior, compound, and street view</li>
              <li>• First photo is your cover — make it the most attractive</li>
              <li>• Landscape (horizontal) orientation works best on all devices</li>
              <li>• Video tours increase inquiries by 40%</li>
            </ul>
          </div>

          {/* Upload progress info */}
          {uploadedFiles.length > 0 && (
            <div className="rounded-xl border border-gray-200 dark:border-dark-400 bg-gray-50 dark:bg-dark-200/50 p-4">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-gray-900 dark:text-white">Upload Summary</span>
                <span className="text-muted">{imageCount} photo{imageCount !== 1 ? 's' : ''}{videoCount > 0 ? ` + ${videoCount} video` : ''}</span>
              </div>
              <div className="mt-2 h-1.5 rounded-full bg-gray-200 dark:bg-dark-400 overflow-hidden">
                <div
                  className="h-full rounded-full bg-brand-500 transition-all duration-500"
                  style={{ width: `${Math.min(100, (imageCount / 5) * 100)}%` }}
                />
              </div>
              <p className="mt-1.5 text-[11px] text-muted">
                {imageCount < 3 && 'Add at least 3 photos for better visibility'}
                {imageCount >= 3 && imageCount < 5 && 'Good start — add more photos for best results'}
                {imageCount >= 5 && imageCount < 8 && 'Great coverage! Consider adding all 8'}
                {imageCount >= 8 && '✅ Maximum photos reached'}
              </p>
            </div>
          )}

          <div className="flex justify-between pt-2">
            <button onClick={() => setStep(1)} className="btn-outline"><ArrowLeft className="h-4 w-4" /> Back</button>
            <button onClick={() => setStep(3)} className="btn-primary">Next: Boost <ArrowRight className="h-4 w-4" /></button>
          </div>
        </div>
      )}

      {/* ─── Step 3: Boost Selection ─── */}
      {step === 3 && (
        <div className="space-y-5 animate-fade-in">
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Boost Your Listing</h2>
            <p className="text-sm text-muted mt-1">Paid boosts significantly increase your visibility. Choose one or skip.</p>
          </div>

          <div className="rounded-xl bg-amber-50 dark:bg-gold-400/5 border border-amber-200 dark:border-gold-400/20 p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-100 dark:bg-gold-400/15">
              <Eye className="h-5 w-5 text-amber-600 dark:text-gold-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">Featured listings get 5x more views on average</p>
              <p className="text-xs text-muted">Agents who boost close deals 2x faster</p>
            </div>
          </div>

          <div className="space-y-3">
            {LISTING_BOOST_OPTIONS.map((option) => {
              const Icon = option.type === 'featured' ? Star : option.type === 'top_placement' ? Rocket : option.type === 'urgent' ? Flame : Eye;
              const isSelected = boostType === option.type;
              return (
                <button
                  key={option.type}
                  onClick={() => setBoostType(option.type)}
                  className={cn(
                    'w-full flex items-start gap-4 rounded-2xl border-2 p-5 text-left transition-all duration-200',
                    isSelected
                      ? 'border-brand-500 bg-brand-50 dark:bg-brand-500/10 shadow-glow-brand'
                      : option.type === 'none'
                        ? 'border-gray-200 dark:border-dark-400 bg-white dark:bg-dark-100 hover:border-gray-300 dark:hover:border-dark-500'
                        : 'border-gray-200 dark:border-dark-400 bg-white dark:bg-dark-100 hover:border-amber-300 dark:hover:border-gold-400/40',
                  )}
                >
                  <div className={cn(
                    'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl',
                    isSelected
                      ? 'bg-brand-100 dark:bg-brand-500/20 text-brand-600 dark:text-brand-400'
                      : option.type === 'none'
                        ? 'bg-gray-100 dark:bg-dark-200 text-muted'
                        : 'bg-amber-50 dark:bg-gold-400/10 text-amber-600 dark:text-gold-400',
                  )}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className={cn('text-sm font-bold', isSelected ? 'text-brand-700 dark:text-brand-400' : 'text-gray-900 dark:text-white')}>{option.label}</h3>
                      <span className={cn('text-sm font-bold shrink-0', option.price === 0 ? 'text-muted' : isSelected ? 'text-brand-700 dark:text-brand-400' : 'text-gray-900 dark:text-white')}>
                        {option.price === 0 ? 'Free' : formatCurrency(option.price)}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-muted leading-relaxed">{option.description}</p>
                  </div>
                  {isSelected && <CheckCircle2 className="h-5 w-5 shrink-0 text-brand-600 dark:text-brand-400 mt-0.5" />}
                </button>
              );
            })}
          </div>

          {boostType !== 'none' && price && (
            <div className="rounded-xl border border-gray-200 dark:border-dark-400 bg-white dark:bg-dark-100 p-5">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3">Payment Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm"><span className="text-muted">Listing price</span><span className="text-gray-900 dark:text-white">{formatCurrency(Number(price))}</span></div>
                <div className="flex justify-between text-sm"><span className="text-muted">{selectedBoost?.label}</span><span className="text-amber-600 dark:text-gold-400">{formatCurrency(selectedBoost?.price || 0)}</span></div>
                <div className="border-t border-gray-200 dark:border-dark-400 pt-2 flex justify-between text-sm font-bold"><span className="text-gray-900 dark:text-white">Total</span><span className="text-gray-900 dark:text-white">{formatCurrency(totalPrice)}</span></div>
              </div>
            </div>
          )}

          <div className="flex justify-between pt-2">
            <button onClick={() => setStep(2)} className="btn-outline"><ArrowLeft className="h-4 w-4" /> Back</button>
            <button onClick={() => setStep(4)} className="btn-primary">Next: Review <ArrowRight className="h-4 w-4" /></button>
          </div>
        </div>
      )}

      {/* ─── Step 4: Review & Publish ─── */}
      {step === 4 && (
        <div className="space-y-5 animate-fade-in">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Review & Publish</h2>

          {/* Live preview card */}
          <div className={cn(
            boostType === 'featured' ? 'listing-featured' : boostType === 'top_placement' ? 'listing-pinned' : boostType === 'urgent' ? 'listing-urgent' : 'card',
            'overflow-hidden',
          )}>
            <div className="relative aspect-[16/7] overflow-hidden">
              {coverPreview ? (
                <img src={coverPreview} alt="" className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gray-200 dark:bg-dark-300"><ImageIcon className="h-12 w-12 text-gray-400 dark:text-dark-500" /></div>
              )}
              <div className="absolute top-3 left-3 flex gap-2">
                {boostType === 'featured' && <span className="badge-featured"><Star className="h-3 w-3" /> Featured</span>}
                {boostType === 'top_placement' && <span className="inline-flex items-center gap-1 rounded-lg bg-brand-600/90 px-2.5 py-1 text-xs font-bold text-white"><Rocket className="h-3 w-3" /> Top</span>}
                {boostType === 'urgent' && <span className="badge-urgent"><Flame className="h-3 w-3" /> Urgent</span>}
                <span className={cn('rounded-lg px-2 py-1 text-[10px] font-bold uppercase', listingType === 'sale' ? 'bg-red-500/90 text-white' : 'bg-brand-600/90 text-white')}>For {listingType}</span>
              </div>
              {/* Video indicator */}
              {videoCount > 0 && (
                <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-lg bg-black/60 backdrop-blur-sm px-2.5 py-1.5">
                  <Film className="h-3.5 w-3.5 text-white" />
                  <span className="text-[11px] font-medium text-white">Video tour</span>
                </div>
              )}
            </div>
            <div className="p-5">
              <h3 className="font-semibold text-gray-900 dark:text-white">{title || 'Untitled Property'}</h3>
              <p className="text-sm text-muted mt-1">{lga}{state ? `, ${state}` : ''}</p>
              <p className="mt-2 text-lg font-bold text-brand-600 dark:text-brand-400">{price ? formatCurrency(Number(price)) : '—'} <span className="text-sm font-normal text-muted">{listingType === 'rent' ? 'per year' : 'for sale'}</span></p>
              <div className="mt-3 flex gap-4 text-xs text-muted">
                {bedrooms && <span>{bedrooms} Beds</span>}
                {bathrooms && <span>{bathrooms} Baths</span>}
                {area && <span>{area}sqm</span>}
                {furnished && <span>Furnished</span>}
              </div>
            </div>
          </div>

          {/* Details summary */}
          <div className="card">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3">Listing Details</h3>
            <div className="grid grid-cols-2 gap-y-2.5 gap-x-4 text-sm">
              <div><span className="text-muted">Type</span><p className="font-medium text-gray-900 dark:text-white capitalize">{propertyType || '—'}</p></div>
              <div><span className="text-muted">Price</span><p className="font-medium text-gray-900 dark:text-white">{price ? formatCurrency(Number(price)) : '—'}</p></div>
              <div><span className="text-muted">State</span><p className="font-medium text-gray-900 dark:text-white">{state || '—'}</p></div>
              <div><span className="text-muted">Address</span><p className="font-medium text-gray-900 dark:text-white truncate">{address || '—'}</p></div>
              <div><span className="text-muted">Media</span><p className="font-medium text-gray-900 dark:text-white">{imageCount} photo{imageCount !== 1 ? 's' : ''}{videoCount > 0 ? ` + ${videoCount} video` : ''}</p></div>
              <div><span className="text-muted">Boost</span><p className="font-medium text-gray-900 dark:text-white">{selectedBoost?.label || 'None (Free)'}</p></div>
            </div>
          </div>

          {/* Verification upsell */}
          <div className="rounded-xl border border-brand-200 dark:border-brand-500/20 bg-brand-50 dark:bg-brand-500/5 p-4 flex items-start gap-3">
            <Shield className="h-5 w-5 text-brand-600 dark:text-brand-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">Not verified yet?</p>
              <p className="text-xs text-muted mt-0.5">Verified agents get 3x more inquiries. Get your green badge for just ₦2,500.</p>
              <button onClick={() => navigate('/dashboard/verification')} className="text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline mt-1">Get Verified →</button>
            </div>
          </div>

          {!canPublish && (
            <div className="rounded-xl border border-amber-200 dark:border-gold-400/20 bg-amber-50 dark:bg-gold-400/5 p-4">
              <p className="text-xs font-bold text-amber-700 dark:text-gold-400">⚠️ Missing required fields</p>
              <p className="text-xs text-muted mt-1">Please go back and add: {!title && 'title, '}{!propertyType && 'property type, '}{!price && 'price, '}{!state && 'state, '}{imageCount === 0 && 'at least 1 photo'}</p>
            </div>
          )}

          <div className="flex justify-between pt-2">
            <button onClick={() => setStep(3)} className="btn-outline"><ArrowLeft className="h-4 w-4" /> Back</button>
            <button onClick={handlePublish} disabled={!canPublish || submitting} className="btn-gold px-8">
              {submitting ? <><Loader2 className="h-4 w-4 animate-spin" />Publishing...</> : <>Publish Listing <Rocket className="h-4 w-4" /></>}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
