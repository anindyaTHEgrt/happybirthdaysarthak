import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function PhotoLightbox({ photos, currentIndex, onClose, onPrev, onNext }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowLeft') { e.preventDefault(); onPrev(); }
      else if (e.key === 'ArrowRight') { e.preventDefault(); onNext(); }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onPrev, onNext]);

  if (currentIndex === null || !photos || !photos[currentIndex]) return null;

  const currentPhoto = photos[currentIndex];

  const resolveImageUrl = (img) => {
    if (!img) return '';
    if (img.startsWith('http') || img.startsWith('data:')) return img;
    const base = import.meta.env.BASE_URL || '/';
    return `${base}${img.replace(/^\//, '')}`;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-caption"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative max-w-4xl w-full flex flex-col items-center">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close photo preview"
          className="absolute -top-12 right-0 p-2 bg-obsidian text-gold border-2 border-black hover:bg-black pixel-btn !p-2"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Photo Container with direct side arrow navigation */}
        <div className="relative w-full flex items-center justify-center">
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
            aria-label="Previous photo"
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 pixel-btn pixel-btn-dark !p-2.5 sm:!p-3.5 shadow-pixel-lg hover:scale-110 active:scale-95 border-2 border-gold flex items-center justify-center"
            title="Previous Photo"
          >
            <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7 text-gold" />
          </button>

          <div className="photo-frame max-h-[70vh] flex flex-col items-center justify-center overflow-hidden bg-black mx-auto">
            <img
              src={resolveImageUrl(currentPhoto.image)}
              alt={currentPhoto.alt || currentPhoto.title || 'Memory photo'}
              className="max-h-[60vh] max-w-full w-auto object-contain"
            />
          </div>

          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            aria-label="Next photo"
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 pixel-btn pixel-btn-dark !p-2.5 sm:!p-3.5 shadow-pixel-lg hover:scale-110 active:scale-95 border-2 border-gold flex items-center justify-center"
            title="Next Photo"
          >
            <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 text-gold" />
          </button>
        </div>

        {/* Photo Info Banner */}
        <div className="pixel-box-sandstone mt-3 w-full p-4 text-obsidian shadow-pixel">
          <div className="flex items-center justify-between border-b border-obsidian/20 pb-1 mb-2">
            <h3 className="font-pixel text-xs sm:text-sm text-ferrari font-bold">
              {currentPhoto.title || `Memory #${currentIndex + 1}`}
            </h3>
            <span className="font-mono text-xs font-bold text-obsidian/70">
              {currentIndex + 1} / {photos.length}
            </span>
          </div>
          <p id="lightbox-caption" className="font-sans text-sm font-medium leading-relaxed">
            {currentPhoto.caption}
          </p>

          {/* Bottom Navigation controls */}
          <div className="flex justify-between items-center mt-3 pt-2 border-t border-obsidian/20">
            <button
              type="button"
              onClick={onPrev}
              className="pixel-btn pixel-btn-dark !py-1.5 !px-3 !text-[10px] flex items-center gap-1"
            >
              <ChevronLeft className="w-3.5 h-3.5" /> PREV
            </button>
            <span className="font-pixel text-[8px] sm:text-[9px] text-obsidian/60 hidden sm:inline">
              TAP ARROWS OR USE ← / → KEYS
            </span>
            <button
              type="button"
              onClick={onNext}
              className="pixel-btn pixel-btn-dark !py-1.5 !px-3 !text-[10px] flex items-center gap-1"
            >
              NEXT <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}