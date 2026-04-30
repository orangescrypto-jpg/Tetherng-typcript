import { useState, useRef, useCallback } from 'react';
import { Upload, X, AlertCircle, Film, ImageIcon } from 'lucide-react';
import { cn } from '@/utils/cn';

export interface UploadedFile {
  file: File;
  preview: string;
  sizeMB: number;
  type: 'image' | 'video';
}

interface FileUploadProps {
  files: UploadedFile[];
  onFilesChange: (files: UploadedFile[]) => void;
  maxImages?: number;
  maxImageSizeMB?: number;
  maxVideoSizeMB?: number;
  maxVideos?: number;
  acceptImages?: string;
  acceptVideos?: string;
  label?: string;
  hint?: string;
  disabled?: boolean;
}

export default function FileUpload({
  files,
  onFilesChange,
  maxImages = 8,
  maxImageSizeMB = 5,
  maxVideoSizeMB = 50,
  maxVideos = 1,
  acceptImages = 'image/jpeg,image/png,image/webp',
  acceptVideos = 'video/mp4,video/quicktime',
  label = 'Property Photos & Video',
  hint,
  disabled = false,
}: FileUploadProps) {
  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [dragOver, setDragOver] = useState(false);

  const imageCount = files.filter((f) => f.type === 'image').length;
  const videoCount = files.filter((f) => f.type === 'video').length;
  const canAddImages = imageCount < maxImages;
  const canAddVideo = videoCount < maxVideos;

  const clearErrors = () => setErrors([]);

  const processFiles = useCallback(
    (incoming: FileList | File[]) => {
      const newErrors: string[] = [];
      const newFiles: UploadedFile[] = [];

      Array.from(incoming).forEach((file) => {
        const isImage = file.type.startsWith('image/');
        const isVideo = file.type.startsWith('video/');

        if (!isImage && !isVideo) {
          newErrors.push(`"${file.name}" is not a supported format`);
          return;
        }

        if (isImage) {
          if (imageCount + newFiles.filter((f) => f.type === 'image').length >= maxImages) {
            newErrors.push(`Max ${maxImages} images allowed`);
            return;
          }
          if (file.size > maxImageSizeMB * 1024 * 1024) {
            newErrors.push(`"${file.name}" exceeds ${maxImageSizeMB}MB limit (${(file.size / 1024 / 1024).toFixed(1)}MB)`);
            return;
          }
        }

        if (isVideo) {
          if (!canAddVideo) {
            newErrors.push(`Max ${maxVideos} video allowed`);
            return;
          }
          if (file.size > maxVideoSizeMB * 1024 * 1024) {
            newErrors.push(`"${file.name}" exceeds ${maxVideoSizeMB}MB limit (${(file.size / 1024 / 1024).toFixed(1)}MB)`);
            return;
          }
        }

        newFiles.push({
          file,
          preview: URL.createObjectURL(file),
          sizeMB: +(file.size / 1024 / 1024).toFixed(2),
          type: isImage ? 'image' : 'video',
        });
      });

      setErrors(newErrors);
      if (newFiles.length > 0) {
        onFilesChange([...files, ...newFiles]);
      }

      // Auto-clear errors after 6 seconds
      if (newErrors.length > 0) {
        setTimeout(clearErrors, 6000);
      }
    },
    [files, onFilesChange, imageCount, canAddVideo, maxImages, maxVideos, maxImageSizeMB, maxVideoSizeMB],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      if (disabled) return;
      processFiles(e.dataTransfer.files);
    },
    [processFiles, disabled],
  );

  const removeFile = (index: number) => {
    URL.revokeObjectURL(files[index].preview);
    onFilesChange(files.filter((_, i) => i !== index));
  };

  const formatSize = (mb: number) => {
    if (mb < 1) return `${(mb * 1024).toFixed(0)}KB`;
    return `${mb}MB`;
  };

  return (
    <div className="space-y-3">
      {/* Label */}
      <div>
        <label className="block text-sm font-medium text-gray-900 dark:text-white">{label}</label>
        {hint && <p className="text-xs text-muted mt-0.5">{hint}</p>}
        <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-muted">
          <span>Images: up to {maxImages} × {maxImageSizeMB}MB each</span>
          <span className="text-gray-300 dark:text-dark-400">|</span>
          <span>Video: up to {maxVideos} × {maxVideoSizeMB}MB</span>
          <span className="text-gray-300 dark:text-dark-400">|</span>
          <span>JPG, PNG, WebP, MP4</span>
        </div>
      </div>

      {/* Error alerts */}
      {errors.length > 0 && (
        <div className="space-y-2 animate-slide-up">
          {errors.map((err, i) => (
            <div key={i} className="flex items-start gap-2 rounded-lg border border-red-200 dark:border-danger/20 bg-red-50 dark:bg-danger/5 px-3 py-2.5">
              <AlertCircle className="h-4 w-4 text-red-500 dark:text-danger shrink-0 mt-0.5" />
              <p className="text-xs text-red-600 dark:text-danger">{err}</p>
              <button onClick={clearErrors} className="ml-auto text-red-400 hover:text-red-600 dark:hover:text-danger">
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Upload zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); if (!disabled) setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={cn(
          'relative rounded-2xl border-2 border-dashed transition-all duration-200',
          dragOver
            ? 'border-brand-500 bg-brand-50 dark:bg-brand-500/10'
            : 'border-gray-300 dark:border-dark-400 hover:border-gray-400 dark:hover:border-dark-500 bg-gray-50/50 dark:bg-dark-200/30',
          disabled && 'opacity-50 pointer-events-none',
        )}
      >
        <div className="flex flex-col items-center justify-center py-8 px-4">
          <div className={cn(
            'flex h-14 w-14 items-center justify-center rounded-2xl transition-colors',
            dragOver
              ? 'bg-brand-100 dark:bg-brand-500/20 text-brand-600 dark:text-brand-400'
              : 'bg-gray-200 dark:bg-dark-300 text-muted',
          )}>
            <Upload className="h-6 w-6" />
          </div>
          <p className="mt-3 text-sm font-medium text-gray-700 dark:text-gray-300">
            {dragOver ? 'Drop files here' : 'Drag photos & video here'}
          </p>
          <p className="text-xs text-muted mt-1">or click the buttons below</p>

          <div className="mt-4 flex gap-3">
            <button
              type="button"
              disabled={!canAddImages || disabled}
              onClick={() => imageInputRef.current?.click()}
              className={cn(
                'inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all',
                canAddImages
                  ? 'bg-white dark:bg-dark-100 border border-gray-200 dark:border-dark-400 text-gray-700 dark:text-gray-300 hover:border-brand-500 hover:text-brand-600 dark:hover:text-brand-400 shadow-sm'
                  : 'bg-gray-100 dark:bg-dark-300 text-muted cursor-not-allowed',
              )}
            >
              <ImageIcon className="h-4 w-4" />
              Add Photos ({maxImages - imageCount} left)
            </button>
            <button
              type="button"
              disabled={!canAddVideo || disabled}
              onClick={() => videoInputRef.current?.click()}
              className={cn(
                'inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all',
                canAddVideo
                  ? 'bg-white dark:bg-dark-100 border border-gray-200 dark:border-dark-400 text-gray-700 dark:text-gray-300 hover:border-brand-500 hover:text-brand-600 dark:hover:text-brand-400 shadow-sm'
                  : 'bg-gray-100 dark:bg-dark-300 text-muted cursor-not-allowed',
              )}
            >
              <Film className="h-4 w-4" />
              Add Video {maxVideos - videoCount <= 0 && '(max reached)'}
            </button>
          </div>
        </div>

        {/* Hidden inputs */}
        <input
          ref={imageInputRef}
          type="file"
          accept={acceptImages}
          multiple
          className="hidden"
          onChange={(e) => {
            if (e.target.files) processFiles(e.target.files);
            e.target.value = '';
          }}
        />
        <input
          ref={videoInputRef}
          type="file"
          accept={acceptVideos}
          className="hidden"
          onChange={(e) => {
            if (e.target.files) processFiles(e.target.files);
            e.target.value = '';
          }}
        />
      </div>

      {/* File previews */}
      {files.length > 0 && (
        <div className="space-y-2">
          {/* Video first if present */}
          {files.filter((f) => f.type === 'video').map((file) => {
            const realIndex = files.indexOf(file);
            return (
              <div key={`video-${realIndex}`} className="flex items-center gap-3 rounded-xl border border-gray-200 dark:border-dark-400 bg-white dark:bg-dark-100 p-3 animate-slide-up">
                <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-lg bg-black">
                  <video src={file.preview} className="h-full w-full object-cover" muted />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Film className="h-5 w-5 text-white/80" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{file.file.name}</p>
                  <p className="text-xs text-muted mt-0.5">{formatSize(file.sizeMB)} · Video</p>
                  {/* Size warning if close to limit */}
                  {file.sizeMB > maxVideoSizeMB * 0.8 && (
                    <p className="text-[10px] text-amber-600 dark:text-gold-400 mt-0.5">⚠️ Large file — may take longer to upload</p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => removeFile(realIndex)}
                  className="p-1.5 rounded-lg text-muted hover:text-red-500 dark:hover:text-danger hover:bg-red-50 dark:hover:bg-danger/10 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            );
          })}

          {/* Images grid */}
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {files.filter((f) => f.type === 'image').map((file) => {
              const realIndex = files.indexOf(file);
              const imageIndex = files.slice(0, realIndex).filter((f) => f.type === 'image').length;
              return (
                <div key={`img-${realIndex}`} className="relative aspect-[4/3] overflow-hidden rounded-xl border border-gray-200 dark:border-dark-400 group animate-fade-in">
                  <img src={file.preview} alt="" className="h-full w-full object-cover" />
                  {/* Cover badge on first image */}
                  {imageIndex === 0 && (
                    <span className="absolute top-1.5 left-1.5 rounded-md bg-brand-600 px-1.5 py-0.5 text-[9px] font-bold text-white uppercase tracking-wide">Cover</span>
                  )}
                  {/* Size tag */}
                  <span className="absolute bottom-1.5 right-1.5 rounded-md bg-black/60 backdrop-blur-sm px-1.5 py-0.5 text-[9px] font-medium text-white">
                    {formatSize(file.sizeMB)}
                  </span>
                  {/* Size warning indicator */}
                  {file.sizeMB > maxImageSizeMB * 0.9 && (
                    <span className="absolute top-1.5 right-1.5 rounded-md bg-amber-500/90 px-1.5 py-0.5 text-[9px] font-bold text-white">LARGE</span>
                  )}
                  {/* Remove button */}
                  <button
                    type="button"
                    onClick={() => removeFile(realIndex)}
                    className="absolute top-1.5 right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500"
                    style={{ right: imageIndex === 0 && file.sizeMB > maxImageSizeMB * 0.9 ? '2.5rem' : undefined }}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              );
            })}

            {/* Add more image slot */}
            {canAddImages && (
              <button
                type="button"
                disabled={disabled}
                onClick={() => imageInputRef.current?.click()}
                className="aspect-[4/3] rounded-xl border-2 border-dashed border-gray-300 dark:border-dark-400 flex flex-col items-center justify-center gap-1.5 text-muted hover:border-brand-500 hover:text-brand-600 dark:hover:text-brand-400 transition-colors disabled:opacity-50 disabled:pointer-events-none"
              >
                <Upload className="h-5 w-5" />
                <span className="text-[10px] font-medium">Add</span>
              </button>
            )}
          </div>

          {/* File count summary */}
          <div className="flex items-center justify-between text-xs text-muted">
            <span>{imageCount} image{imageCount !== 1 ? 's' : ''}{videoCount > 0 ? ` · ${videoCount} video` : ''}</span>
            <span>Total: {formatSize(files.reduce((sum, f) => sum + f.sizeMB, 0))}</span>
          </div>
        </div>
      )}
    </div>
  );
}
