import React, { useState } from 'react';
import { Trophy, Flag, Shield, Award, Sparkles, ChevronRight, CheckCircle2 } from 'lucide-react';
import { birthdayContent } from '../data/birthdayContent';
import { useGame } from '../context/GameContext';
import { audioEngine } from '../utils/audioSystem';

/* ─────────────── Injected keyframe styles ─────────────── */
const raceStyles = `
  @keyframes marquee {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  @keyframes flicker {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0.4; }
  }
  @keyframes crowdWave {
    0%, 100% { transform: scaleY(1); }
    50%       { transform: scaleY(1.6); }
  }
  @keyframes speedLine {
    0%   { transform: translateX(-100%); opacity: 0; }
    30%  { opacity: 0.7; }
    100% { transform: translateX(200%); opacity: 0; }
  }
  @keyframes lensFlare {
    0%, 100% { opacity: 0; transform: scale(0.6); }
    50%       { opacity: 0.6; transform: scale(1.2); }
  }
  @keyframes pitLightBlink {
    0%, 100% { background: #ff2a00; }
    33%       { background: #FFD700; }
    66%       { background: #22c55e; }
  }
  .anim-marquee { animation: marquee 18s linear infinite; }
  .anim-flicker { animation: flicker 1.8s ease-in-out infinite; }
  .anim-crowd   { animation: crowdWave 0.6s ease-in-out infinite; }
  .anim-speedln { animation: speedLine 2.4s linear infinite; }
  .anim-lens    { animation: lensFlare 3s ease-in-out infinite; }
  .anim-pit-lt  { animation: pitLightBlink 1.2s step-end infinite; }
`;

/* ─────────────── Sub-components ─────────────── */

/** Grandstand silhouette with animated pixel crowd dots */
function Grandstand({ side = 'left' }) {
  const rows = 3;
  const cols = 14;
  return (
    <div className={`absolute top-16 ${side === 'left' ? 'left-0 w-24 sm:w-36' : 'right-0 w-24 sm:w-36'} flex flex-col gap-0.5`}
         style={{ zIndex: 0 }}>
      {/* Stand structure */}
      <div className="w-full" style={{ background: 'linear-gradient(180deg, #1a1a1a 0%, #2d2d2d 100%)', border: '2px solid #000', padding: '4px 2px' }}>
        {Array.from({ length: rows }).map((_, r) => (
          <div key={r} className="flex gap-0.5 mb-0.5" style={{ animationDelay: `${r * 0.2}s` }}>
            {Array.from({ length: cols }).map((_, c) => {
              const colors = ['#e53e3e','#ffffff','#2563eb','#fbbf24','#16a34a','#9333ea'];
              const col = colors[(r * cols + c) % colors.length];
              return (
                <div
                  key={c}
                  className="anim-crowd"
                  style={{
                    width: 5, height: 6,
                    background: col,
                    border: '1px solid #000',
                    animationDelay: `${(r * cols + c) * 0.07}s`,
                    animationDuration: `${0.5 + (c % 3) * 0.15}s`,
                  }}
                />
              );
            })}
          </div>
        ))}
      </div>
      {/* Stand base bleacher */}
      <div style={{ background: '#111', height: 10, border: '2px solid #000' }} />
    </div>
  );
}

/** Neon pit-lane light strip */
function PitLaneLight({ left }) {
  return (
    <div className="absolute bottom-20 flex flex-col gap-1 items-center" style={{ left, zIndex: 2 }}>
      <div style={{ width: 6, height: 40, background: '#222', border: '1px solid #444', borderRadius: 2 }} />
      <div className="anim-pit-lt" style={{ width: 8, height: 8, borderRadius: 2, border: '1px solid #000' }} />
    </div>
  );
}

/** Speed lines streaking across the track */
function SpeedLines() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 1 }}>
      {[12, 30, 50, 68, 82].map((top, i) => (
        <div
          key={i}
          className="anim-speedln absolute h-0.5 w-24"
          style={{
            top: `${top}%`,
            left: 0,
            background: 'rgba(255,255,255,0.4)',
            animationDelay: `${i * 0.5}s`,
            animationDuration: `${1.6 + i * 0.3}s`,
          }}
        />
      ))}
    </div>
  );
}

export default function FerrariGrandPrix() {
  const { state, dispatch, unlockAchievement, nextScene } = useGame();
  const [carDrivesOff, setCarDrivesOff] = useState(false);

  const collectibles = [
    { id: 'helmet', name: 'Scuderia Racing Helmet', icon: 'assets/sprites/racing-helmet.svg' },
    { id: 'flag',   name: 'Chequered Flag',         icon: 'assets/sprites/checkered-flag.svg' },
    { id: 'trophy', name: 'Grand Prix Winner Trophy',icon: 'assets/sprites/golden-trophy.svg' }
  ];

  const collectedCount = state.collectedRaceItems.length;
  const isAllCollected = collectedCount >= collectibles.length;

  const handleCollect = (item) => {
    if (state.collectedRaceItems.includes(item.id)) return;
    audioEngine.playSfx('collect');
    dispatch({ type: 'COLLECT_RACE_ITEM', payload: item.id });
    if (state.collectedRaceItems.length + 1 >= collectibles.length) {
      setTimeout(() => { audioEngine.playSfx('podium'); unlockAchievement('pole-position'); }, 500);
    }
  };

  const handleContinue = () => {
    setCarDrivesOff(true);
    audioEngine.playSfx('countdown-go');
    setTimeout(() => nextScene(), 1000);
  };

  return (
    <div className="min-h-screen w-full relative flex flex-col justify-between items-center overflow-hidden select-none px-4 pt-16 pb-8"
         style={{ background: '#0d0d12' }}>
      <style>{raceStyles}</style>

      {/* ── Sky + Track gradient ── */}
      <div className="absolute inset-0 -z-10"
           style={{ background: 'linear-gradient(180deg, #0d0010 0%, #1a0010 25%, #2b0014 45%, #1a1a1a 60%, #111 100%)' }} />

      {/* ── Star field ── */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {Array.from({ length: 50 }).map((_, i) => (
          <div key={i} className="absolute rounded-full"
               style={{
                 width: i % 5 === 0 ? 2 : 1, height: i % 5 === 0 ? 2 : 1,
                 background: '#fff', opacity: 0.4 + (i % 4) * 0.15,
                 top: `${(i * 37) % 55}%`, left: `${(i * 61) % 100}%`,
               }} />
        ))}
      </div>

      {/* ── Grandstands left & right ── */}
      <Grandstand side="left" />
      <Grandstand side="right" />

      {/* ── Neon track edge glow ── */}
      <div className="absolute left-0 right-0 pointer-events-none"
           style={{ top: '58%', height: 3, background: 'linear-gradient(90deg, transparent, #ff2a00 20%, #ff2a00 80%, transparent)', zIndex: 1, filter: 'blur(2px)', opacity: 0.7 }} />
      <div className="absolute left-0 right-0 pointer-events-none"
           style={{ top: '82%', height: 3, background: 'linear-gradient(90deg, transparent, #ff2a00 20%, #ff2a00 80%, transparent)', zIndex: 1, filter: 'blur(2px)', opacity: 0.7 }} />

      {/* ── Pit-lane traffic lights ── */}
      <PitLaneLight left="8%" />
      <PitLaneLight left="22%" />
      <PitLaneLight left="72%" />
      <PitLaneLight left="88%" />

      {/* ── Lens flare (top-right spotlight) ── */}
      <div className="anim-lens absolute pointer-events-none"
           style={{ top: '5%', right: '8%', width: 60, height: 60,
                    background: 'radial-gradient(circle, rgba(255,220,80,0.7) 0%, transparent 70%)',
                    borderRadius: '50%', zIndex: 2 }} />

      {/* ── Top chequered banner ── */}
      <div className="absolute top-0 left-0 right-0 h-5 overflow-hidden" style={{ zIndex: 5 }}>
        <div className="anim-marquee flex" style={{ width: '200%' }}>
          {Array.from({ length: 40 }).map((_, i) => (
            <div key={i} className={`flex-shrink-0 h-5 w-5 ${(Math.floor(i / 1) + (i % 2)) % 2 === 0 ? 'bg-white' : 'bg-black'}`} />
          ))}
        </div>
      </div>

      {/* ── Side curb stripes ── */}
      <div className="absolute top-16 left-0 w-5 h-full flex flex-col" style={{ zIndex: 3, opacity: 0.9 }}>
        {Array.from({ length: 24 }).map((_, i) => (
          <div key={i} className={`flex-shrink-0 h-7 w-full ${i % 2 === 0 ? 'bg-[#e53e3e]' : 'bg-white'}`} />
        ))}
      </div>
      <div className="absolute top-16 right-0 w-5 h-full flex flex-col" style={{ zIndex: 3, opacity: 0.9 }}>
        {Array.from({ length: 24 }).map((_, i) => (
          <div key={i} className={`flex-shrink-0 h-7 w-full ${i % 2 === 0 ? 'bg-white' : 'bg-[#e53e3e]'}`} />
        ))}
      </div>

      {/* ── Track perspective lines ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
        {/* Centre dashed line */}
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="absolute"
               style={{ top: `${60 + i * 3}%`, left: '48%', width: '4%', height: 3, background: '#FFD700', opacity: 0.6 }} />
        ))}
      </div>

      {/* ── Speed lines on track ── */}
      <SpeedLines />

      {/* ── HEADER ── */}
      <div className="text-center z-10 max-w-2xl relative">
        <div className="inline-block px-3 py-1 font-pixel text-[10px] sm:text-xs shadow-pixel-sm mb-2 text-white font-bold"
             style={{ background: '#e53e3e', border: '2px solid #000' }}>
          🏎️ {birthdayContent.racingTrackTitle}
        </div>
        <h2 className="font-pixel text-lg sm:text-2xl text-pixelWhite font-bold drop-shadow-lg">
          The Grand Prix Challenge
        </h2>
        <p className="font-sans text-xs sm:text-sm text-gold mt-1">{birthdayContent.racingInstructions}</p>
      </div>

      {/* ── Collectibles ── */}
      <div className="w-full max-w-lg z-10 mt-3">
        <div className="pixel-box p-3 border-2 border-black" style={{ background: 'rgba(10,10,10,0.85)' }}>
          <div className="flex items-center justify-between mb-2">
            <span className="font-pixel text-[10px] text-mutedGrey uppercase">Racing Gear Collected:</span>
            <span className="font-mono text-xs text-gold font-bold">{collectedCount} / {collectibles.length}</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {collectibles.map((item) => {
              const isCollected = state.collectedRaceItems.includes(item.id);
              return (
                <button
                  key={item.id}
                  onClick={() => handleCollect(item)}
                  disabled={isCollected}
                  className={`p-2 border-2 flex flex-col items-center justify-center transition-all ${
                    isCollected
                      ? 'border-grass bg-grass/20 text-white cursor-default shadow-pixel-sm'
                      : 'border-gold bg-obsidian hover:scale-105 active:scale-95 cursor-pointer shadow-pixel'
                  }`}
                >
                  <img src={item.icon} alt={item.name} className={`w-10 h-10 pixelated ${isCollected ? 'filter-none' : 'anim-float'}`} />
                  <span className="font-pixel text-[8px] mt-1.5 text-center line-clamp-1">{item.name}</span>
                  <span className={`font-mono text-[9px] mt-0.5 font-bold ${isCollected ? 'text-grass' : 'text-gold'}`}>
                    {isCollected ? '✓ COLLECTED' : '+ TAP ME'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Main Area: Track or Podium ── */}
      <div className="w-full max-w-2xl my-4 flex flex-col items-center z-10">
        {isAllCollected ? (
          <div className="w-full flex flex-col items-center animate-bounce-pixel">
            {/* Spotlight beams behind podium */}
            <div className="relative w-full flex justify-center mb-2">
              {[-30, 0, 30].map((deg, i) => (
                <div key={i} className="absolute bottom-0 anim-lens"
                     style={{
                       width: 60, height: 120,
                       background: `conic-gradient(from ${deg}deg at 50% 100%, rgba(255,215,0,0.15), transparent 30deg)`,
                       animationDelay: `${i * 0.5}s`,
                     }} />
              ))}
            </div>

            <div className="relative flex items-end justify-center gap-1 sm:gap-2 mb-2">
              <div className="w-20 sm:w-28 h-20 border-2 border-black flex flex-col items-center justify-between p-2"
                   style={{ background: '#254A35' }}>
                <span className="font-pixel text-xs text-mutedGrey">2</span>
                <span className="font-mono text-[9px] text-mutedGrey">OTHERS</span>
              </div>
              <div className="w-28 sm:w-40 h-32 border-4 border-black flex flex-col items-center justify-between p-2 shadow-pixel-gold"
                   style={{ background: 'linear-gradient(135deg, #e53e3e, #b91c1c)' }}>
                <div className="flex flex-col items-center -mt-10">
                  <img src="assets/sprites/golden-trophy.svg" alt="P1 Champion Trophy" className="w-16 h-16 pixelated drop-shadow-lg anim-float" />
                  <div className="font-pixel text-[10px] text-obsidian px-2 py-0.5 border border-black font-bold" style={{ background: '#FFD700' }}>
                    ★ {birthdayContent.playerNickname} ★
                  </div>
                </div>
                <div className="font-pixel text-2xl text-white font-bold drop-shadow">P1</div>
                <div className="font-pixel text-[8px] text-gold uppercase">WORLD CHAMPION</div>
              </div>
              <div className="w-20 sm:w-28 h-16 border-2 border-black flex flex-col items-center justify-between p-2"
                   style={{ background: '#254A35' }}>
                <span className="font-pixel text-xs text-mutedGrey">3</span>
                <span className="font-mono text-[9px] text-mutedGrey">REST</span>
              </div>
            </div>

            <div className="pixel-box-sandstone p-4 w-full text-obsidian text-center shadow-pixel-lg mt-2">
              <h3 className="font-pixel text-sm sm:text-base font-bold" style={{ color: '#e53e3e' }}>
                "{birthdayContent.podiumHeading}"
              </h3>
              <p className="font-sans text-xs sm:text-sm text-obsidian font-semibold mt-1">{birthdayContent.podiumMessage}</p>
              <div className="mt-2 pt-2 border-t border-obsidian/30 font-mono text-[11px] text-obsidian/80">
                {birthdayContent.commentatorMessage}
              </div>
            </div>
          </div>
        ) : (
          /* Track in progress */
          <div className="relative w-full h-48 flex flex-col items-center justify-center">
            {/* Asphalt road */}
            <div className="w-full h-28 relative flex items-center justify-center overflow-hidden shadow-pixel"
                 style={{ background: 'linear-gradient(180deg, #1a1a1a 0%, #2a2a2a 50%, #1a1a1a 100%)', borderTop: '4px solid #000', borderBottom: '4px solid #000' }}>
              {/* White edge lines */}
              <div className="absolute top-2 left-0 right-0 h-0.5" style={{ background: '#fff', opacity: 0.3 }} />
              <div className="absolute bottom-2 left-0 right-0 h-0.5" style={{ background: '#fff', opacity: 0.3 }} />

              {/* Dashed centre line */}
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="absolute h-1.5 w-8"
                     style={{ background: '#FFD700', opacity: 0.7, top: '47%', left: `${i * 13 + 1}%` }} />
              ))}

              {/* Finish line */}
              <div className="absolute right-10 top-0 bottom-0 w-10 checkered-pattern opacity-90" />

              {/* Ferrari Car */}
              <img
                src="assets/sprites/ferrari-car.svg"
                alt="Ferrari Racing Car"
                className={`w-52 h-auto pixelated transition-transform duration-1000 ease-in ${carDrivesOff ? 'translate-x-[200vw]' : 'anim-float'}`}
              />
            </div>
            <p className="font-pixel text-[9px] text-gold mt-3 text-center">
              Tap the 3 racing items above to enter the winner's podium!
            </p>
          </div>
        )}
      </div>

      {/* ── Continue button ── */}
      <div className="z-10 w-full max-w-md flex justify-center">
        {isAllCollected && (
          <button onClick={handleContinue} className="pixel-btn pixel-btn-red !text-sm !py-3 !px-6 flex items-center gap-2 shadow-pixel-lg">
            <span>VISIT OUR MINECRAFT WORLD</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Bottom chequered strip */}
      <div className="absolute bottom-0 left-0 right-0 h-5 overflow-hidden" style={{ zIndex: 5 }}>
        <div className="anim-marquee flex" style={{ width: '200%' }}>
          {Array.from({ length: 40 }).map((_, i) => (
            <div key={i} className={`flex-shrink-0 h-5 w-5 ${i % 2 === 0 ? 'bg-white' : 'bg-black'}`} />
          ))}
        </div>
      </div>
    </div>
  );
}
