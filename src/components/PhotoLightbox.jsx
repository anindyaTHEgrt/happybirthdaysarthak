import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function PhotoLightbox({ photos, currentIndex, onClose, onPrev, onNext }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onPrev, onNext]);

  if (currentIndex === null || !photos || !photos[currentIndex]) return null;

  const currentPhoto = photos[currentIndex];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-caption"
    >
      <div className="relative max-w-4xl w-full flex flex-col items-center">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close photo preview"
          className="absolute -top-12 right-0 p-2 bg-obsidian text-gold border-2 border-black hover:bg-black pixel-btn !p-2"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Navigation Previous */}
        <button
          onClick={onPrev}
          aria-label="Previous photo"
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 pixel-btn pixel-btn-dark !p-2 hidden sm:flex"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Photo Container */}
        <div className="photo-frame max-h-[70vh] flex flex-col items-center justify-center overflow-hidden bg-black">
          <img
            src={currentPhoto.image?.startsWith('http') || currentPhoto.image?.startsWith('data:') ? currentPhoto.image : `${import.meta.env.BASE_URL}${currentPhoto.image?.replace(/^\//, '')}`}
            alt={currentPhoto.alt || currentPhoto.title || 'Memory photo'}
            className="max-h-[60vh] max-w-full w-auto object-contain"
          />
        </div>

        {/* Navigation Next */}
        <button
          onClick={onNext}
          aria-label="Next photo"
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 pixel-btn pixel-btn-dark !p-2 hidden sm:flex"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

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

          {/* Mobile Next/Prev Buttons */}
          <div className="flex sm:hidden justify-between items-center mt-3 pt-2 border-t border-obsidian/20">
            <button onClick={onPrev} className="pixel-btn pixel-btn-dark !py-1 !px-3 !text-[10px]">
              ← PREV
            </button>
            <button onClick={onNext} className="pixel-btn pixel-btn-dark !py-1 !px-3 !text-[10px]">
              NEXT →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
