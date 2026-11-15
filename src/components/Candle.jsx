import React, { useState } from 'react';
import { audioEngine } from '../utils/audioSystem';

export default function Candle({ id, isLit, onExtinguish, index }) {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    if (isLit) {
      audioEngine.playSfx('blow');
      onExtinguish(id);
    }
  };

  return (
    <div className="flex flex-col items-center select-none">
      <button
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label={`Birthday Candle #${index + 1} (${isLit ? 'Lit - Click to blow out' : 'Extinguished'})`}
        disabled={!isLit}
        className={`focus:outline-none focus:ring-2 focus:ring-gold p-1 flex flex-col items-center transition-transform ${
          isLit ? 'cursor-pointer hover:scale-110 active:scale-95' : 'cursor-default opacity-80'
        }`}
      >
        {/* Flame or Smoke */}
        <div className="h-8 w-6 flex items-end justify-center relative">
          {isLit ? (
            <div className={`anim-candle ${isHovered ? 'scale-125' : ''}`}>
              {/* Flame Pixels */}
              <div className="w-3.5 h-5 relative flex items-center justify-center">
                <div className="w-3.5 h-4.5 bg-ferrari rounded-t-full shadow-lg" />
                <div className="w-2.5 h-3.5 bg-gold rounded-t-full absolute bottom-0" />
                <div className="w-1.5 h-2 bg-white rounded-t-full absolute bottom-0.5" />
              </div>
            </div>
          ) : (
            /* Smoke puff */
            <div className="anim-smoke text-mutedGrey text-xs font-pixel">
              ☁
            </div>
          )}
        </div>

        {/* Candle Wick */}
        <div className="w-0.5 h-2 bg-black" />

        {/* Candle Body (Striped Ferrari Red & Gold) */}
        <div className="w-3.5 h-12 border-2 border-black flex flex-col overflow-hidden bg-sandstone shadow-pixel-sm">
          <div className="h-2.5 bg-ferrari" />
          <div className="h-2 bg-gold" />
          <div className="h-2.5 bg-ferrari" />
          <div className="h-2 bg-gold" />
          <div className="h-2.5 bg-ferrari" />
        </div>
      </button>

      {/* Tiny label */}
      <span className="font-mono text-[9px] text-mutedGrey mt-1">
        {isLit ? '🔥' : '💨'}
      </span>
    </div>
  );
}
