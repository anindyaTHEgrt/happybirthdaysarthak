import React, { useEffect, useState, useRef } from 'react';
import { Sparkles, Trophy, Gift, RotateCcw, Heart } from 'lucide-react';
import { birthdayContent } from '../data/birthdayContent';
import { useGame } from '../context/GameContext';
import BirthdayCake from '../components/BirthdayCake';
import FireworksOverlay from '../components/FireworksOverlay';
import { audioEngine } from '../utils/audioSystem';

/* ─────────────── Injected keyframe styles ─────────────── */
const finaleStyles = `
  @keyframes starShimmer {
    0%, 100% { opacity: 0.1; transform: scale(0.7) rotate(0deg); }
    50%       { opacity: 1;   transform: scale(1.3) rotate(45deg); }
  }
  @keyframes shootingStar {
    0%   { transform: translateX(0) translateY(0) rotate(-30deg); opacity: 0; }
    5%   { opacity: 1; }
    100% { transform: translateX(300px) translateY(150px) rotate(-30deg); opacity: 0; }
  }
  @keyframes aurora {
    0%, 100% { opacity: 0.07; transform: scaleX(1) skewX(0deg); }
    50%       { opacity: 0.18; transform: scaleX(1.05) skewX(3deg); }
  }
  @keyframes horizonGlow {
    0%, 100% { opacity: 0.4; }
    50%       { opacity: 0.8; }
  }
  @keyframes floatText {
    0%, 100% { transform: translateY(0); }
    50%       { transform: translateY(-6px); }
  }
  @keyframes pulseRing {
    0%   { transform: scale(0.8); opacity: 1; }
    100% { transform: scale(2.5); opacity: 0; }
  }
  @keyframes sparkleRain {
    0%   { transform: translateY(-10px) rotate(0deg); opacity: 1; }
    100% { transform: translateY(80px) rotate(360deg); opacity: 0; }
  }
  .anim-star-sh  { animation: starShimmer var(--sd) ease-in-out infinite; }
  .anim-shoot    { animation: shootingStar var(--std) linear infinite; }
  .anim-aurora   { animation: aurora var(--ad) ease-in-out infinite; }
  .anim-horizon  { animation: horizonGlow 3s ease-in-out infinite; }
  .anim-floatT   { animation: floatText 3s ease-in-out infinite; }
  .anim-pulse-r  { animation: pulseRing 2s ease-out infinite; }
  .anim-sparkler { animation: sparkleRain var(--spd) linear infinite; }
`;

/** Pixel star with optional cross-shape */
function PixelStar({ left, top, size = 1, delay = 0, duration = 2.5, cross = false }) {
  return (
    <div className="absolute pointer-events-none anim-star-sh"
         style={{ left, top, '--sd': `${duration}s`, animationDelay: `${delay}s`, zIndex: 1 }}>
      <div style={{ width: size, height: size, background: '#fff', borderRadius: size > 2 ? 1 : 0 }} />
      {cross && size > 2 && (
        <>
          <div style={{ position: 'absolute', top: '50%', left: -size, width: size * 3, height: 1, background: 'rgba(255,255,255,0.4)', transform: 'translateY(-50%)' }} />
          <div style={{ position: 'absolute', left: '50%', top: -size, height: size * 3, width: 1, background: 'rgba(255,255,255,0.4)', transform: 'translateX(-50%)' }} />
        </>
      )}
    </div>
  );
}

/** Shooting star streak */
function ShootingStar({ left, top, delay, duration }) {
  return (
    <div className="absolute pointer-events-none anim-shoot overflow-hidden"
         style={{ left, top, '--std': `${duration}s`, animationDelay: `${delay}s`, zIndex: 2 }}>
      <div style={{ width: 60, height: 2, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.8), rgba(255,255,255,0.3))', borderRadius: 1 }} />
    </div>
  );
}

/** Aurora curtain band */
function Aurora({ color, top, delay, duration }) {
  return (
    <div className="absolute left-0 right-0 pointer-events-none anim-aurora"
         style={{ top, height: 60, background: `linear-gradient(180deg, transparent, ${color}, transparent)`,
                  filter: 'blur(12px)', '--ad': `${duration}s`, animationDelay: `${delay}s`, zIndex: 1 }} />
  );
}

/** Firework horizon glow blob */
function HorizonGlow({ left, color }) {
  return (
    <div className="absolute anim-horizon pointer-events-none"
         style={{ left, bottom: '12%', width: 80, height: 40,
                  background: `radial-gradient(ellipse, ${color} 0%, transparent 70%)`,
                  filter: 'blur(6px)', zIndex: 2 }} />
  );
}

/** Sparkle rain particle */
function SparkleRain({ left, top, delay, duration, color }) {
  return (
    <div className="absolute anim-sparkler pointer-events-none"
         style={{ left, top, '--spd': `${duration}s`, animationDelay: `${delay}s`, zIndex: 3 }}>
      <div style={{ width: 4, height: 4, background: color, borderRadius: 1,
                    boxShadow: `0 0 4px 2px ${color}` }} />
    </div>
  );
}

export default function BirthdayFinale() {
  const { state, dispatch, unlockAchievement, setIsAchievementsOpen, setIsCouponsOpen, goToScene } = useGame();
  const [finaleCelebrationActive, setFinaleCelebrationActive] = useState(false);

  const candlesCount = birthdayContent.candlesCount || 5;
  const extinguished = state.extinguishedCandles || [];
  const allCandlesOut = extinguished.length >= candlesCount;

  useEffect(() => {
    if (allCandlesOut && !state.finaleTriggered) {
      dispatch({ type: 'TRIGGER_FINALE' });
      setFinaleCelebrationActive(true);
      unlockAchievement('birthday-champion');
    }
  }, [allCandlesOut, state.finaleTriggered, dispatch, unlockAchievement]);

  const handleExtinguishCandle = (id) => dispatch({ type: 'EXTINGUISH_CANDLE', payload: id });
  const handleExtinguishAll = () => {
    audioEngine.playSfx('blow');
    const allIds = Array.from({ length: candlesCount }, (_, i) => `candle-${i + 1}`);
    dispatch({ type: 'EXTINGUISH_ALL_CANDLES', payload: allIds });
  };

  /* Generate star field */
  const stars = Array.from({ length: 80 }).map((_, i) => ({
    left: `${(i * 61) % 100}%`,
    top:  `${(i * 43) % 90}%`,
    size: i % 9 === 0 ? 3 : i % 4 === 0 ? 2 : 1,
    delay: (i * 0.11) % 4,
    duration: 1.5 + (i % 7) * 0.5,
    cross: i % 9 === 0,
  }));

  /* Shooting stars */
  const shootingStars = Array.from({ length: 5 }).map((_, i) => ({
    left: `${5 + i * 18}%`,
    top:  `${5 + i * 8}%`,
    delay: i * 4 + 2,
    duration: 10 + i * 3,
  }));

  /* Sparkle rain (only when all candles out) */
  const sparkles = Array.from({ length: 20 }).map((_, i) => ({
    left: `${(i * 51) % 100}%`,
    top:  `${(i * 7) % 30}%`,
    delay: (i * 0.3) % 4,
    duration: 2 + (i % 5) * 0.5,
    color: ['#FFD700','#ff6b8a','#a3f060','#80d8ff','#ff9f00'][i % 5],
  }));

  return (
    <div className={`min-h-screen w-full relative flex flex-col justify-between items-center overflow-x-hidden select-none px-4 pt-16 pb-8 transition-colors duration-2000 ${
      allCandlesOut ? 'bg-[#040210]' : 'bg-[#07050f]'
    }`}>
      <style>{finaleStyles}</style>

      {/* ── Deep space sky ── */}
      <div className="absolute inset-0 -z-10"
           style={{ background: 'linear-gradient(180deg, #020109 0%, #040214 20%, #060318 40%, #0a0520 60%, #0d0828 80%, #100a30 100%)' }} />

      {/* ── Star field ── */}
      {stars.map((s, i) => <PixelStar key={i} {...s} />)}

      {/* ── Shooting stars ── */}
      {shootingStars.map((s, i) => <ShootingStar key={i} {...s} />)}

      {/* ── Aurora curtains ── */}
      <Aurora color="rgba(80,0,180,0.12)"  top="8%"  delay={0}   duration={6} />
      <Aurora color="rgba(0,80,180,0.1)"   top="18%" delay={1.5} duration={8} />
      <Aurora color="rgba(180,0,80,0.08)"  top="12%" delay={3}   duration={7} />

      {/* ── Firework horizon glows ── */}
      {allCandlesOut && (
        <>
          <HorizonGlow left="8%"  color="rgba(255,80,80,0.5)" />
          <HorizonGlow left="30%" color="rgba(80,200,255,0.4)" />
          <HorizonGlow left="55%" color="rgba(255,200,0,0.5)" />
          <HorizonGlow left="78%" color="rgba(180,80,255,0.4)" />
          {/* Sparkle rain */}
          {sparkles.map((s, i) => <SparkleRain key={i} {...s} />)}
        </>
      )}

      {/* ── Fireworks & Confetti Overlay ── */}
      <FireworksOverlay active={allCandlesOut || finaleCelebrationActive} />

      {/* ── Moon ── */}
      <div className="absolute pointer-events-none"
           style={{ top: 32, right: '8%', width: 40, height: 40,
                    background: 'linear-gradient(135deg, #e8e8e8, #c8d0e0)',
                    border: '2px solid #aaa', borderRadius: 2,
                    boxShadow: '0 0 30px 10px rgba(200,210,255,0.25)',
                    zIndex: 2 }}>
        {/* Craters */}
        {[[6,8,6],[22,16,4],[10,24,5]].map(([x,y,s], i) => (
          <div key={i} style={{ position: 'absolute', left: x, top: y, width: s, height: s,
                                background: '#b0b8c8', borderRadius: 1, border: '0.5px solid #9aa' }} />
        ))}
      </div>

      {/* ── HEADER ── */}
      <div className="text-center z-10 max-w-2xl relative">
        <div className="inline-flex items-center gap-2 px-3 py-1 font-pixel text-[10px] sm:text-xs shadow-pixel-sm mb-2 font-bold"
             style={{ background: '#FFD700', color: '#06040f', border: '2px solid #000' }}>
          <Sparkles className="w-3.5 h-3.5 text-ferrari" />
          <span>STAGE 6: THE GRAND FINALE</span>
        </div>
        <h2 className={`font-pixel text-lg sm:text-2xl md:text-3xl text-pixelWhite font-bold drop-shadow-lg anim-floatT ${allCandlesOut ? 'text-gold' : ''}`}>
          {allCandlesOut ? birthdayContent.finalHeading : 'Birthday Cake Wishes'}
        </h2>
        <p className="font-sans text-xs sm:text-sm text-sandstone mt-1">
          {allCandlesOut ? 'All wishes released into the stars! ✨' : birthdayContent.cakePrompt}
        </p>

        {/* Pulse rings when candles are out */}
        {allCandlesOut && (
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            {[0, 0.6, 1.2].map((delay, i) => (
              <div key={i} className="anim-pulse-r absolute rounded-full"
                   style={{ width: 60, height: 60, border: '2px solid rgba(255,215,0,0.5)',
                            left: -30, top: -30, animationDelay: `${delay}s` }} />
            ))}
          </div>
        )}
      </div>

      {/* ── Cake Interaction ── */}
      <div className="w-full max-w-xl my-4 flex flex-col items-center z-10">
        <BirthdayCake
          candlesCount={candlesCount}
          extinguishedCandles={extinguished}
          onExtinguishCandle={handleExtinguishCandle}
          onExtinguishAll={handleExtinguishAll}
        />

        {/* Final Reveal Banner */}
        {allCandlesOut && (
          <div className="w-full pixel-box-sandstone p-6 mt-6 text-obsidian text-center shadow-pixel-lg animate-fadeIn border-4 border-black relative overflow-hidden">
            {/* Sparkle corners */}
            {['top-2 left-2','top-2 right-2','bottom-2 left-2','bottom-2 right-2'].map((pos, i) => (
              <div key={i} className={`absolute ${pos} font-pixel text-xs text-gold`}>✦</div>
            ))}

            <div className="inline-block p-2 bg-ferrari text-white border-2 border-black mb-3">
              <Trophy className="w-8 h-8 text-gold" />
            </div>
            <h3 className="font-pixel text-base sm:text-xl text-ferrari font-bold">{birthdayContent.finalHeading}</h3>
            <p className="font-sans text-sm sm:text-base text-obsidian font-semibold mt-2 leading-relaxed">{birthdayContent.finalMessage}</p>
            <div className="mt-4 pt-3 border-t-2 border-dashed border-obsidian/40 font-pixel text-xs sm:text-sm text-ferrari-dark font-bold">
              "{birthdayContent.finalSignOff}"
            </div>
          </div>
        )}
      </div>

      {/* ── Post-Finale Hall ── */}
      {allCandlesOut && (
        <div className="z-10 w-full max-w-2xl mt-4">
          <div className="pixel-box p-4 bg-obsidian-card border-2 border-black">
            <span className="font-pixel text-[10px] text-gold uppercase block text-center mb-3">
              🏆 Champion's Post-Game Hall
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button onClick={() => setIsAchievementsOpen(true)}
                      className="pixel-btn pixel-btn-gold !py-2 !px-2 !text-[9px] flex items-center justify-center gap-1.5">
                <Trophy className="w-3.5 h-3.5" /><span>ACHIEVEMENTS</span>
              </button>
              <button onClick={() => setIsCouponsOpen(true)}
                      className="pixel-btn pixel-btn-red !py-2 !px-2 !text-[9px] flex items-center justify-center gap-1.5">
                <Gift className="w-3.5 h-3.5" /><span>MY COUPONS</span>
              </button>
              <button onClick={() => goToScene('minecraft')}
                      className="pixel-btn pixel-btn-green !py-2 !px-2 !text-[9px] flex items-center justify-center gap-1.5">
                <Heart className="w-3.5 h-3.5" /><span>REVISIT WORLD</span>
              </button>
              <button onClick={() => goToScene('loading')}
                      className="pixel-btn pixel-btn-dark !py-2 !px-2 !text-[9px] flex items-center justify-center gap-1.5">
                <RotateCcw className="w-3.5 h-3.5" /><span>PLAY AGAIN</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
