import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import PhotoLightbox from './PhotoLightbox';
import { audioEngine } from '../utils/audioSystem';

export default function PhotoGallery({ photos = [] }) {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef(null);
  const activeIndexRef = useRef(0);
  const programmaticScrollRef = useRef(false);
  const programmaticTimerRef = useRef(null);

  useEffect(() => () => clearTimeout(programmaticTimerRef.current), []);

  const updateActive = (i) => {
    activeIndexRef.current = i;
    setActiveIndex(i);
  };

  // Helper to resolve URLs with base path
  const resolveImageUrl = (img) => {
    if (!img) return '';
    if (img.startsWith('http') || img.startsWith('data:')) return img;
    const base = import.meta.env.BASE_URL || '/';
    return `${base}${img.replace(/^\//, '')}`;
  };

  // Scroll to a card by centering it; lock scroll-sync until the animation settles
  const scrollToIndex = (index) => {
    const container = scrollContainerRef.current;
    if (!container || photos.length === 0) return;
    const target = container.querySelectorAll('.gallery-card')[index];
    if (!target) return;

    updateActive(index);
    programmaticScrollRef.current = true;
    clearTimeout(programmaticTimerRef.current);
    programmaticTimerRef.current = setTimeout(() => {
      programmaticScrollRef.current = false;
    }, 700);

    const left = target.offsetLeft - (container.clientWidth - target.clientWidth) / 2;
    container.scrollTo({ left: Math.max(0, left), behavior: 'smooth' });
  };

  const handlePrevCard = () => {
    audioEngine.playSfx('click');
    const cur = activeIndexRef.current;
    scrollToIndex(cur > 0 ? cur - 1 : photos.length - 1);
  };

  const handleNextCard = () => {
    audioEngine.playSfx('click');
    const cur = activeIndexRef.current;
    scrollToIndex(cur < photos.length - 1 ? cur + 1 : 0);
  };

  // Sync activeIndex on manual drag/touch scroll only
  const handleScroll = () => {
    if (programmaticScrollRef.current) return;
    const container = scrollContainerRef.current;
    if (!container || photos.length === 0) return;
    const cards = container.querySelectorAll('.gallery-card');
    const containerCenter = container.scrollLeft + container.clientWidth / 2;

    let closestIdx = 0;
    let minDistance = Infinity;
    cards.forEach((card, idx) => {
      const dist = Math.abs(containerCenter - (card.offsetLeft + card.clientWidth / 2));
      if (dist < minDistance) {
        minDistance = dist;
        closestIdx = idx;
      }
    });

    if (closestIdx !== activeIndexRef.current) updateActive(closestIdx);
  };

  const handlePrevLightbox = () => {
    audioEngine.playSfx('click');
    setLightboxIndex((prev) => (prev > 0 ? prev - 1 : photos.length - 1));
  };

  const handleNextLightbox = () => {
    audioEngine.playSfx('click');
    setLightboxIndex((prev) => (prev < photos.length - 1 ? prev + 1 : 0));
  };

  const handleCloseLightbox = () => {
    if (lightboxIndex !== null) scrollToIndex(lightboxIndex);
    setLightboxIndex(null);
  };

  return (
    <div className="w-full relative py-2">
      {/* Scroll controls and active counter in header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="font-pixel text-[11px] text-gold uppercase tracking-wider">
            Memory Album
          </span>
          <span className="font-mono text-[10px] text-sandstone bg-black/60 px-2 py-0.5 border border-gold/40">
            {activeIndex + 1} / {photos.length}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrevCard}
            className="pixel-btn pixel-btn-dark !p-1.5 hover:scale-105 active:scale-95"
            aria-label="Scroll photo gallery left"
            title="Previous Memory"
          >
            <ChevronLeft className="w-4 h-4 text-gold" />
          </button>
          <button
            type="button"
            onClick={handleNextCard}
            className="pixel-btn pixel-btn-dark !p-1.5 hover:scale-105 active:scale-95"
            aria-label="Scroll photo gallery right"
            title="Next Memory"
          >
            <ChevronRight className="w-4 h-4 text-gold" />
          </button>
        </div>
      </div>

      {/* Carousel Track with Side Overlay Buttons */}
      <div className="relative group">
        {/* Floating Left Arrow */}
        <button
          type="button"
          onClick={handlePrevCard}
          className="absolute left-1 top-1/2 -translate-y-1/2 z-20 pixel-btn pixel-btn-dark !p-2 shadow-pixel-lg hover:scale-110 active:scale-95 bg-black/80 border-2 border-gold hidden sm:flex items-center justify-center"
          aria-label="Previous Photo"
          title="Previous Photo"
        >
          <ChevronLeft className="w-5 h-5 text-gold" />
        </button>

        {/* Horizontal Scroll Track (relative so card.offsetLeft is measured against it) */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="relative flex gap-4 overflow-x-auto pb-4 pt-1 px-2 sm:px-10 snap-x snap-proximity scrollbar-thin focus:outline-none"
          tabIndex={0}
          role="region"
          aria-label="Horizontal photo memories carousel"
        >
          {photos.map((photo, index) => (
            <div
              key={photo.id || index}
              onClick={() => {
                audioEngine.playSfx('click');
                setLightboxIndex(index);
              }}
              className={`gallery-card snap-center shrink-0 w-64 sm:w-72 pixel-box p-3 cursor-pointer group/card transition-all duration-200 hover:-translate-y-1 flex flex-col justify-between ${index === activeIndex
                  ? 'border-gold bg-obsidian shadow-pixel-gold'
                  : 'border-black bg-obsidian-card hover:border-gold'
                }`}
            >
              {/* Photo Thumbnail */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-black border-2 border-black photo-frame">
                <img
                  src={resolveImageUrl(photo.image)}
                  alt={photo.alt || photo.title || 'Memory photo'}
                  className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover/card:opacity-100 transition-opacity flex items-center justify-center text-white">
                  <span className="font-pixel text-[10px] bg-black/85 px-2 py-1 border border-gold text-gold flex items-center gap-1.5 shadow-pixel">
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

        {/* Floating Right Arrow */}
        <button
          type="button"
          onClick={handleNextCard}
          className="absolute right-1 top-1/2 -translate-y-1/2 z-20 pixel-btn pixel-btn-dark !p-2 shadow-pixel-lg hover:scale-110 active:scale-95 bg-black/80 border-2 border-gold hidden sm:flex items-center justify-center"
          aria-label="Next Photo"
          title="Next Photo"
        >
          <ChevronRight className="w-5 h-5 text-gold" />
        </button>
      </div>

      {/* Pagination dots below carousel */}
      <div className="flex items-center justify-center gap-2 mt-2">
        {photos.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => {
              audioEngine.playSfx('click');
              scrollToIndex(i);
            }}
            className={`w-2.5 h-2.5 transition-all border border-black ${i === activeIndex
                ? 'bg-gold scale-125 shadow-pixel-sm'
                : 'bg-mutedGrey/40 hover:bg-gold/60'
              }`}
            aria-label={`Go to memory ${i + 1}`}
            title={`Memory #${i + 1}`}
          />
        ))}
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <PhotoLightbox
          photos={photos}
          currentIndex={lightboxIndex}
          onClose={handleCloseLightbox}
          onPrev={handlePrevLightbox}
          onNext={handleNextLightbox}
        />
      )}
    </div>
  );
}