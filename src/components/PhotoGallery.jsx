import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import PhotoLightbox from './PhotoLightbox';

export default function PhotoGallery({ photos }) {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const offset = direction === 'left' ? -320 : 320;
      scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    setLightboxIndex((prev) => (prev > 0 ? prev - 1 : photos.length - 1));
  };

  const handleNext = () => {
    setLightboxIndex((prev) => (prev < photos.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="w-full relative py-2">
      {/* Scroll controls for desktop */}
      <div className="flex items-center justify-between mb-2">
        <span className="font-pixel text-[11px] text-gold uppercase tracking-wider">
          Memory Album ({photos.length} Captured Moments)
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => scroll('left')}
            className="pixel-btn pixel-btn-dark !p-1.5"
            aria-label="Scroll photo gallery left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="pixel-btn pixel-btn-dark !p-1.5"
            aria-label="Scroll photo gallery right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Horizontal Scroll Track */}
      <div
        ref={scrollContainerRef}
        className="flex gap-4 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scrollbar-thin focus:outline-none"
        tabIndex={0}
        role="region"
        aria-label="Horizontal photo memories carousel"
      >
        {photos.map((photo, index) => (
          <div
            key={photo.id || index}
            onClick={() => setLightboxIndex(index)}
            className="snap-center shrink-0 w-64 sm:w-72 pixel-box bg-obsidian-card p-3 cursor-pointer group transition-all duration-200 hover:-translate-y-1 hover:border-gold flex flex-col justify-between"
          >
            {/* Photo Thumbnail */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-black border-2 border-black photo-frame">
              <img
                src={photo.image}
                alt={photo.alt || photo.title || 'Memory photo'}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                <span className="font-pixel text-[10px] bg-black/80 px-2 py-1 border border-gold text-gold flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5" /> EXPAND
                </span>
              </div>
            </div>

            {/* Info */}
            <div className="mt-3">
              <h4 className="font-pixel text-xs text-gold truncate">
                {photo.title || `Memory #${index + 1}`}
              </h4>
              <p className="font-sans text-xs text-mutedGrey mt-1 line-clamp-2 leading-relaxed">
                {photo.caption}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <PhotoLightbox
          photos={photos}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}
    </div>
  );
}
