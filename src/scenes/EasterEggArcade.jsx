import React, { useState } from 'react';
import { Gamepad2, ChevronRight, X, Sparkles, CheckCircle2, Coffee, FlaskConical, Plane, Crosshair, Box } from 'lucide-react';
import { birthdayContent } from '../data/birthdayContent';
import { useGame } from '../context/GameContext';
import { audioEngine } from '../utils/audioSystem';

export default function EasterEggArcade() {
  const { unlockAchievement, nextScene } = useGame();
  const [discoveredEggs, setDiscoveredEggs] = useState([]);
  const [activeEgg, setActiveEgg] = useState(null);

  const eggKeys = Object.keys(birthdayContent.easterEggs);

  const eggPropIcons = {
    office: Coffee,
    breakingBad: FlaskConical,
    manifest: Plane,
    valorant: Crosshair,
    fortnite: Box,
  };

  const handleInspectEgg = (key) => {
    audioEngine.playSfx('click');
    const egg = birthdayContent.easterEggs[key];
    setActiveEgg(egg);

    if (!discoveredEggs.includes(key)) {
      const nextDiscovered = [...discoveredEggs, key];
      setDiscoveredEggs(nextDiscovered);

      if (nextDiscovered.length >= 3) {
        unlockAchievement('pop-culture');
      }
    }
  };

  return (
    <div className="min-h-screen w-full relative flex flex-col justify-between items-center bg-[#14121F] overflow-hidden select-none px-4 pt-16 pb-8">
      {/* Neon Arcade Glow Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1E1838] via-[#14121F] to-[#0A0910] -z-10" />

      {/* Cyber Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(100,50,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(100,50,255,0.06)_1px,transparent_1px)] bg-[size:32px_32px] -z-5 pointer-events-none" />

      {/* Header Info */}
      <div className="text-center z-10 max-w-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-900/60 border-2 border-purple-500 text-purple-200 font-pixel text-[10px] sm:text-xs shadow-pixel-sm mb-2">
          <Gamepad2 className="w-4 h-4 text-gold" />
          <span>STAGE 4 (BONUS): {birthdayContent.arcadeTitle}</span>
        </div>
        <h2 className="font-pixel text-lg sm:text-2xl text-pixelWhite font-bold">
          The Secret Arcade Lounge
        </h2>
        <p className="font-sans text-xs sm:text-sm text-mutedGrey mt-1">
          {birthdayContent.arcadeSubtitle}
        </p>

        {/* Discovery Tracker */}
        <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-0.5 bg-black/60 border border-obsidian-border text-xs font-mono text-gold">
          <span>DISCOVERED:</span>
          <span className="font-bold text-grass">{discoveredEggs.length} / {eggKeys.length}</span>
        </div>
      </div>

      {/* Interactive Arcade Room Props */}
      <div className="w-full max-w-4xl my-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 z-10">
        {eggKeys.map((key) => {
          const egg = birthdayContent.easterEggs[key];
          const isDiscovered = discoveredEggs.includes(key);
          const Icon = eggPropIcons[key] || Gamepad2;

          return (
            <button
              key={key}
              onClick={() => handleInspectEgg(key)}
              className={`p-3 border-2 flex flex-col items-center justify-between min-h-[140px] transition-all duration-150 ${
                isDiscovered
                  ? 'border-purple-400 bg-purple-950/40 shadow-pixel-sm'
                  : 'border-obsidian-border bg-obsidian-card hover:border-gold hover:-translate-y-1 shadow-pixel'
              }`}
              aria-label={`Inspect ${egg.propName}`}
            >
              <div className="w-full flex justify-between items-center">
                <span className="font-pixel text-[8px] text-purple-300">
                  {egg.tag}
                </span>
                {isDiscovered && (
                  <CheckCircle2 className="w-3.5 h-3.5 text-grass" />
                )}
              </div>

              {/* Pixel Prop Icon */}
              <div className="p-3 bg-obsidian border-2 border-black text-gold my-2 anim-float">
                <Icon className="w-8 h-8" />
              </div>

              <div className="w-full text-center">
                <span className="font-pixel text-[9px] text-pixelWhite block truncate">
                  {egg.propName}
                </span>
                <span className="font-mono text-[10px] text-gold mt-0.5 block font-bold">
                  {isDiscovered ? 'READ AGAIN' : '+ INSPECT'}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Easter Egg Popup Modal */}
      {activeEgg && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
        >
          <div className="pixel-box p-6 max-w-md w-full bg-obsidian-card text-pixelWhite border-4 border-purple-500 shadow-pixel-lg animate-bounce-pixel relative">
            <button
              onClick={() => setActiveEgg(null)}
              className="absolute top-3 right-3 p-1 bg-obsidian text-white border border-black hover:bg-black"
              aria-label="Close easter egg"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 bg-purple-900 border border-purple-400 text-purple-200 font-pixel text-[9px] uppercase">
                {activeEgg.tag}
              </span>
            </div>

            <h3 className="font-pixel text-sm sm:text-base text-gold font-bold">
              {activeEgg.title}
            </h3>

            <div className="mt-3 p-3 bg-black/60 border border-obsidian-border text-sm font-sans font-medium leading-relaxed text-sandstone">
              "{activeEgg.message}"
            </div>

            <div className="mt-4 pt-2 border-t border-obsidian-border flex justify-end">
              <button
                onClick={() => setActiveEgg(null)}
                className="pixel-btn pixel-btn-gold !py-1 !px-4"
              >
                GOT IT!
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Continue Action (Always available since arcade is optional!) */}
      <div className="z-10 w-full max-w-md flex justify-center mt-2">
        <button
          onClick={nextScene}
          className="pixel-btn pixel-btn-red !text-sm !py-3 !px-6 flex items-center gap-2 shadow-pixel-lg"
        >
          <span>PROCEED TO BIRTHDAY LETTER</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
