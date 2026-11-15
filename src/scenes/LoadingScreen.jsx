import React, { useState } from 'react';
import { Play } from 'lucide-react';
import { birthdayContent } from '../data/birthdayContent';
import { useGame } from '../context/GameContext';
import { audioEngine } from '../utils/audioSystem';

export default function LoadingScreen() {
  const { dispatch, unlockAchievement } = useGame();
  const [headlightsOn, setHeadlightsOn] = useState(false);
  const [countdown, setCountdown] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleStart = () => {
    audioEngine.init();
    audioEngine.setMusicEnabled(true);
    dispatch({ type: 'TOGGLE_MUSIC', payload: true });
    setCountdown(3);
    audioEngine.playSfx('countdown');
    setTimeout(() => { setCountdown(2); audioEngine.playSfx('countdown'); }, 700);
    setTimeout(() => { setCountdown(1); audioEngine.playSfx('countdown'); }, 1400);
    setTimeout(() => { setCountdown('LIGHTS OUT & AWAY WE GO!'); audioEngine.playSfx('countdown-go'); setIsTransitioning(true); }, 2100);
    setTimeout(() => { unlockAchievement('welcome'); dispatch({ type: 'START_GAME' }); }, 2800);
  };

  return (
    <div className="min-h-screen w-full relative flex flex-col justify-between items-center overflow-hidden select-none px-4 py-8">

      {/* ── RICH GARAGE BACKGROUND ── */}
      {/* Deep multi-layer dark gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0C] via-[#111118] to-[#0D0608]" />

      {/* Garage wall tiles — subtle grid of dark panels */}
      <div className="absolute inset-0 opacity-20"
        style={{ backgroundImage: 'linear-gradient(#1a1a22 1px,transparent 1px),linear-gradient(90deg,#1a1a22 1px,transparent 1px)', backgroundSize: '48px 48px' }} />

      {/* Neon RED ambient glow from bottom (pit lane reflection) */}
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-[#C91D28]/30 via-[#C91D28]/10 to-transparent pointer-events-none" />

      {/* Neon GOLD ambient glow from top corners */}
      <div className="absolute top-0 left-0 w-72 h-64 bg-[#E9C55B]/10 blur-3xl pointer-events-none" />
      <div className="absolute top-0 right-0 w-72 h-64 bg-[#C91D28]/15 blur-3xl pointer-events-none" />

      {/* Headlight cone glow */}
      {headlightsOn && (
        <>
          <div className="absolute left-[42%] top-[42%] w-80 h-56 bg-gradient-to-r from-[#E9C55B]/60 via-[#FFF3A3]/20 to-transparent blur-2xl pointer-events-none" style={{ clipPath: 'polygon(0 20%,100% 0%,100% 100%,0 80%)' }} />
          <div className="absolute left-[50%] top-[42%] w-80 h-56 bg-gradient-to-r from-[#E9C55B]/40 via-[#FFF3A3]/15 to-transparent blur-2xl pointer-events-none" style={{ clipPath: 'polygon(0 20%,100% 0%,100% 100%,0 80%)' }} />
        </>
      )}

      {/* Garage ceiling light tubes */}
      <div className="absolute top-8 left-0 right-0 flex justify-around px-16">
        {[0,1,2,3].map(i => (
          <div key={i} className="flex flex-col items-center">
            <div className="w-1 h-4 bg-[#555]" />
            <div className={`w-32 h-2 ${i===1||i===2 ? 'bg-[#E9C55B] shadow-[0_0_20px_#E9C55B]' : 'bg-[#444]'}`} />
          </div>
        ))}
      </div>

      {/* Checkered racing banner stripe across the top */}
      <div className="absolute top-0 left-0 right-0 h-5 checkered-pattern opacity-60" />

      {/* Pit crew tool silhouettes on sides */}
      <div className="absolute left-4 bottom-28 hidden lg:flex flex-col gap-3 opacity-20">
        {[80,60,100,70].map((h,i) => <div key={i} className="w-6 bg-[#555]" style={{height:`${h}px`}} />)}
      </div>
      <div className="absolute right-4 bottom-28 hidden lg:flex flex-col gap-3 opacity-20">
        {[70,100,60,80].map((h,i) => <div key={i} className="w-6 bg-[#555]" style={{height:`${h}px`}} />)}
      </div>

      {/* Neon pit lane light strip */}
      <div className="absolute top-5 left-0 right-0 flex justify-center gap-8 py-1">
        <div className="w-20 h-1 bg-ferrari shadow-[0_0_16px_6px_#C91D28]" />
        <div className="w-20 h-1 bg-gold   shadow-[0_0_16px_6px_#E9C55B]" />
        <div className="w-20 h-1 bg-ferrari shadow-[0_0_16px_6px_#C91D28]" />
      </div>

      {/* Garage floor reflection grid */}
      <div className="absolute bottom-0 left-0 right-0 h-28 opacity-30"
        style={{ backgroundImage: 'linear-gradient(#C91D28 1px, transparent 1px)', backgroundSize: '100% 14px', transform: 'perspective(100px) rotateX(40deg)', transformOrigin: 'bottom' }} />

      {/* ── HEADER / TITLE ── */}
      <div className="mt-14 text-center max-w-2xl z-10">
        <div className="inline-block px-3 py-1 bg-ferrari/20 border border-ferrari text-ferrari-light font-pixel text-[10px] sm:text-xs mb-3 shadow-pixel-sm">
          ★ {birthdayContent.versionLabel} ★
        </div>
        <h1 className="font-pixel text-xl sm:text-3xl md:text-4xl text-pixelWhite tracking-tight drop-shadow-[0_0_20px_rgba(201,29,40,0.8)] leading-relaxed">
          {birthdayContent.siteTitle.split('Grand Prix')[0]}
          <span className="text-ferrari block sm:inline drop-shadow-[0_0_30px_#C91D28]"> Grand Prix</span>
        </h1>
        <p className="font-pixel text-[11px] sm:text-xs text-gold mt-3 tracking-wide drop-shadow-[0_0_10px_#E9C55B]">
          "{birthdayContent.siteSubtitle}"
        </p>
        <div className="mt-4 flex items-center justify-center gap-2 font-mono text-xs text-mutedGrey">
          <span>PLAYER:</span>
          <span className="font-pixel text-[10px] text-white bg-black/60 px-2 py-0.5 border border-obsidian-border">
            {birthdayContent.playerNickname} (LEVEL {birthdayContent.age})
          </span>
        </div>
      </div>

      {/* ── CAR CENTERPIECE ── */}
      <div className="relative my-4 flex flex-col items-center z-10">
        <div
          className="relative cursor-pointer group"
          onClick={() => setHeadlightsOn(!headlightsOn)}
          aria-label="Click car to toggle headlights"
          role="button"
          tabIndex={0}
          onKeyDown={e => (e.key==='Enter'||e.key===' ') && setHeadlightsOn(v=>!v)}
        >
          {/* Under-car glow pool */}
          <div className={`absolute -bottom-3 left-1/2 -translate-x-1/2 w-72 h-6 blur-xl rounded-full transition-all duration-500 ${headlightsOn ? 'bg-[#E9C55B]/60' : 'bg-[#C91D28]/30'}`} />

          <img
            src="assets/sprites/ferrari-car.svg"
            alt="Ferrari Birthday Grand Prix Car"
            className="w-64 sm:w-96 h-auto pixelated drop-shadow-[0_8px_32px_rgba(201,29,40,0.9)] transition-transform duration-200 group-hover:scale-105 group-hover:drop-shadow-[0_8px_48px_rgba(233,197,91,0.6)]"
          />

          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap">
            <span className="font-pixel text-[8px] bg-black/80 text-mutedGrey border border-obsidian-border px-2 py-0.5 group-hover:text-gold transition-colors">
              {headlightsOn ? '💡 HEADLIGHTS: ON' : '💡 TAP CAR FOR LIGHTS'}
            </span>
          </div>
        </div>

        {/* Reflective floor stripe */}
        <div className="w-80 sm:w-[480px] h-6 mt-6 opacity-20" style={{
          background: 'linear-gradient(90deg, transparent, #C91D28 20%, #C91D28 80%, transparent)',
          filter: 'blur(4px)'
        }} />
      </div>

      {/* ── START BUTTON ── */}
      <div className="mb-8 z-10 flex flex-col items-center">
        {countdown !== null ? (
          <div className="pixel-box-red p-6 text-center shadow-pixel-lg animate-bounce-pixel">
            <div className="font-pixel text-2xl sm:text-4xl text-white font-bold drop-shadow-[0_0_20px_white]">
              {countdown}
            </div>
            <p className="font-pixel text-[10px] text-gold mt-2">INITIATING BIRTHDAY ADVENTURE...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <button
              onClick={handleStart}
              className="pixel-btn pixel-btn-red !text-sm sm:!text-base !py-4 !px-8 flex items-center gap-3 shadow-pixel-red hover:shadow-pixel-lg hover:drop-shadow-[0_0_20px_#C91D28]"
            >
              <Play className="w-5 h-5 fill-current" />
              <span>START ADVENTURE</span>
            </button>
            <span className="font-pixel text-[9px] text-mutedGrey/80 tracking-wider">
              {birthdayContent.bootPrompt}
            </span>
          </div>
        )}
      </div>

      {/* Bottom checkered bar */}
      <div className="absolute bottom-0 left-0 right-0 h-5 checkered-pattern opacity-60" />

      {/* Transition flash */}
      {isTransitioning && (
        <div className="fixed inset-0 z-50 checkered-pattern opacity-90 pointer-events-none" />
      )}
    </div>
  );
}
