import React, { useState } from 'react';
import { Play, Volume2, VolumeX, Sparkles, Flag } from 'lucide-react';
import { birthdayContent } from '../data/birthdayContent';
import { useGame } from '../context/GameContext';
import { audioEngine } from '../utils/audioSystem';

export default function LoadingScreen() {
  const { dispatch, unlockAchievement } = useGame();
  const [headlightsOn, setHeadlightsOn] = useState(false);
  const [countdown, setCountdown] = useState(null); // null | 3 | 2 | 1 | "GO!"
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleStart = () => {
    // Unlock Web Audio context on user gesture
    audioEngine.init();
    audioEngine.setMusicEnabled(true);
    dispatch({ type: 'TOGGLE_MUSIC', payload: true });

    // Begin countdown
    setCountdown(3);
    audioEngine.playSfx('countdown');

    const timer1 = setTimeout(() => {
      setCountdown(2);
      audioEngine.playSfx('countdown');
    }, 700);

    const timer2 = setTimeout(() => {
      setCountdown(1);
      audioEngine.playSfx('countdown');
    }, 1400);

    const timer3 = setTimeout(() => {
      setCountdown('LIGHTS OUT & AWAY WE GO!');
      audioEngine.playSfx('countdown-go');
      setIsTransitioning(true);
    }, 2100);

    const timer4 = setTimeout(() => {
      unlockAchievement('welcome');
      dispatch({ type: 'START_GAME' });
    }, 2800);
  };

  return (
    <div className="min-h-screen w-full relative flex flex-col justify-between items-center bg-obsidian overflow-hidden select-none px-4 py-8">
      {/* Background Racing Garage Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#111111] via-[#1c1c1c] to-[#0d0d0d] -z-10" />

      {/* Checkered top bar */}
      <div className="absolute top-0 left-0 right-0 h-4 checkered-pattern opacity-40" />

      {/* Neon Pit Lane Light Strip */}
      <div className="absolute top-4 left-0 right-0 flex justify-around px-8 opacity-60">
        <div className="w-16 h-1.5 bg-ferrari shadow-[0_0_12px_#C91D28]" />
        <div className="w-16 h-1.5 bg-gold shadow-[0_0_12px_#E9C55B]" />
        <div className="w-16 h-1.5 bg-ferrari shadow-[0_0_12px_#C91D28]" />
      </div>

      {/* Header / Title Area */}
      <div className="mt-8 text-center max-w-2xl z-10">
        <div className="inline-block px-3 py-1 bg-ferrari/20 border border-ferrari text-ferrari-light font-pixel text-[10px] sm:text-xs mb-3 shadow-pixel-sm">
          ★ {birthdayContent.versionLabel} ★
        </div>

        <h1 className="font-pixel text-xl sm:text-3xl md:text-4xl text-pixelWhite tracking-tight drop-shadow-md leading-relaxed sm:leading-relaxed">
          {birthdayContent.siteTitle.split("Grand Prix")[0]}
          <span className="text-ferrari block sm:inline">Grand Prix</span>
        </h1>

        <p className="font-pixel text-[11px] sm:text-xs text-gold mt-3 tracking-wide">
          "{birthdayContent.siteSubtitle}"
        </p>

        <div className="mt-4 flex items-center justify-center gap-2 font-mono text-xs text-mutedGrey">
          <span>PLAYER:</span>
          <span className="font-pixel text-[10px] text-white bg-black/60 px-2 py-0.5 border border-obsidian-border">
            {birthdayContent.playerNickname} (LEVEL {birthdayContent.age})
          </span>
        </div>
      </div>

      {/* Centerpiece: Pixel Car in Garage with Interactive Headlights */}
      <div className="relative my-6 flex flex-col items-center">
        {/* Headlight beam overlay */}
        {headlightsOn && (
          <div className="absolute -right-40 top-4 w-72 h-36 bg-gradient-to-r from-gold/50 via-gold/15 to-transparent clip-path-polygon pointer-events-none -z-1" />
        )}

        {/* Garage Floor Reflection */}
        <div className="relative cursor-pointer group" onClick={() => setHeadlightsOn(!headlightsOn)}>
          <img
            src="assets/sprites/ferrari-car.svg"
            alt="Ferrari Birthday Grand Prix Car"
            className="w-64 sm:w-96 h-auto pixelated drop-shadow-[0_10px_20px_rgba(0,0,0,0.9)] transition-transform duration-200 group-hover:scale-105"
          />

          {/* Tap badge for headlights */}
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2">
            <span className="font-pixel text-[8px] bg-black/80 text-mutedGrey border border-obsidian-border px-2 py-0.5 group-hover:text-gold transition-colors">
              {headlightsOn ? '💡 HEADLIGHTS: ON' : '💡 TAP CAR FOR LIGHTS'}
            </span>
          </div>
        </div>

        {/* Garage Floor Grid */}
        <div className="w-80 sm:w-[480px] h-6 mt-4 border-t-2 border-obsidian-border opacity-40 bg-[linear-gradient(90deg,transparent_49%,#333_50%,transparent_51%)] bg-[length:40px_100%]" />
      </div>

      {/* Start Adventure Action & Countdown Overlay */}
      <div className="mb-8 z-10 flex flex-col items-center">
        {countdown !== null ? (
          <div className="pixel-box-red p-6 text-center shadow-pixel-lg animate-bounce-pixel">
            <div className="font-pixel text-2xl sm:text-4xl text-white font-bold drop-shadow">
              {countdown}
            </div>
            <p className="font-pixel text-[10px] text-gold mt-2">
              INITIATING BIRTHDAY ADVENTURE...
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <button
              onClick={handleStart}
              className="pixel-btn pixel-btn-red !text-sm sm:!text-base !py-4 !px-8 flex items-center gap-3 shadow-pixel-red hover:shadow-pixel-lg"
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

      {/* Bottom Checkered Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-4 checkered-pattern opacity-40" />

      {/* Checkered Flag Transition screen flash */}
      {isTransitioning && (
        <div className="fixed inset-0 z-50 checkered-pattern opacity-90 animate-fadeIn pointer-events-none" />
      )}
    </div>
  );
}
