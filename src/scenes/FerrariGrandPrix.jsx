import React, { useState } from 'react';
import { Trophy, Flag, Shield, Award, Sparkles, ChevronRight, CheckCircle2 } from 'lucide-react';
import { birthdayContent } from '../data/birthdayContent';
import { useGame } from '../context/GameContext';
import { audioEngine } from '../utils/audioSystem';

export default function FerrariGrandPrix() {
  const { state, dispatch, unlockAchievement, nextScene } = useGame();
  const [carDrivesOff, setCarDrivesOff] = useState(false);

  const collectibles = [
    { id: 'helmet', name: 'Scuderia Racing Helmet', icon: 'assets/sprites/racing-helmet.svg' },
    { id: 'flag', name: 'Chequered Flag', icon: 'assets/sprites/checkered-flag.svg' },
    { id: 'trophy', name: 'Grand Prix Winner Trophy', icon: 'assets/sprites/golden-trophy.svg' }
  ];

  const collectedCount = state.collectedRaceItems.length;
  const isAllCollected = collectedCount >= collectibles.length;

  const handleCollect = (item) => {
    if (state.collectedRaceItems.includes(item.id)) return;

    audioEngine.playSfx('collect');
    dispatch({ type: 'COLLECT_RACE_ITEM', payload: item.id });

    // Check if this was the last item
    if (state.collectedRaceItems.length + 1 >= collectibles.length) {
      setTimeout(() => {
        audioEngine.playSfx('podium');
        unlockAchievement('pole-position');
      }, 500);
    }
  };

  const handleContinue = () => {
    setCarDrivesOff(true);
    audioEngine.playSfx('countdown-go');
    setTimeout(() => {
      nextScene();
    }, 1000);
  };

  return (
    <div className="min-h-screen w-full relative flex flex-col justify-between items-center bg-[#191919] overflow-hidden select-none px-4 pt-16 pb-8">
      {/* Circuit Grandstand Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A24] via-[#241416] to-[#121212] -z-10" />

      {/* Top Checkered Banner */}
      <div className="absolute top-0 left-0 right-0 h-4 checkered-pattern opacity-40" />

      {/* Track Curbs Left and Right */}
      <div className="absolute top-16 left-0 w-4 h-full flex flex-col justify-between -z-5 opacity-40">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className={`h-8 w-full ${i % 2 === 0 ? 'bg-ferrari' : 'bg-white'}`} />
        ))}
      </div>
      <div className="absolute top-16 right-0 w-4 h-full flex flex-col justify-between -z-5 opacity-40">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className={`h-8 w-full ${i % 2 === 0 ? 'bg-white' : 'bg-ferrari'}`} />
        ))}
      </div>

      {/* Header Info */}
      <div className="text-center z-10 max-w-2xl">
        <div className="inline-block px-3 py-1 bg-ferrari text-white border-2 border-black font-pixel text-[10px] sm:text-xs shadow-pixel-sm mb-2">
          🏎️ {birthdayContent.racingTrackTitle}
        </div>
        <h2 className="font-pixel text-lg sm:text-2xl text-pixelWhite font-bold">
          The Grand Prix Challenge
        </h2>
        <p className="font-sans text-xs sm:text-sm text-gold mt-1">
          {birthdayContent.racingInstructions}
        </p>
      </div>

      {/* Collectibles Challenge Bar */}
      <div className="w-full max-w-lg z-10 mt-3">
        <div className="pixel-box p-3 bg-obsidian-card border-2 border-black">
          <div className="flex items-center justify-between mb-2">
            <span className="font-pixel text-[10px] text-mutedGrey uppercase">
              Racing Gear Collected:
            </span>
            <span className="font-mono text-xs text-gold font-bold">
              {collectedCount} / {collectibles.length}
            </span>
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
                  aria-label={`Collectible: ${item.name} (${isCollected ? 'Collected' : 'Click to collect'})`}
                >
                  <img
                    src={item.icon}
                    alt={item.name}
                    className={`w-10 h-10 pixelated ${isCollected ? 'filter-none' : 'anim-float'}`}
                  />
                  <span className="font-pixel text-[8px] mt-1.5 text-center line-clamp-1">
                    {item.name}
                  </span>
                  <span className={`font-mono text-[9px] mt-0.5 font-bold ${isCollected ? 'text-grass' : 'text-gold'}`}>
                    {isCollected ? '✓ COLLECTED' : '+ TAP ME'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Center Area: Podium Reveal when all 3 collected OR Race Track with Car */}
      <div className="w-full max-w-2xl my-4 flex flex-col items-center z-10">
        {isAllCollected ? (
          /* Podium Reveal! */
          <div className="w-full flex flex-col items-center animate-bounce-pixel">
            {/* Podium Graphics */}
            <div className="relative flex items-end justify-center gap-1 sm:gap-2 mb-2">
              {/* P2 Step */}
              <div className="w-20 sm:w-28 h-20 bg-[#254A35] border-2 border-black flex flex-col items-center justify-between p-2">
                <span className="font-pixel text-xs text-mutedGrey">2</span>
                <span className="font-mono text-[9px] text-mutedGrey">OTHERS</span>
              </div>

              {/* P1 Step (Dominant Ferrari Red & Gold) */}
              <div className="w-28 sm:w-40 h-32 bg-ferrari border-4 border-black flex flex-col items-center justify-between p-2 shadow-pixel-gold">
                <div className="flex flex-col items-center -mt-10">
                  <img
                    src="assets/sprites/golden-trophy.svg"
                    alt="P1 Champion Trophy"
                    className="w-16 h-16 pixelated drop-shadow-lg anim-float"
                  />
                  {/* Sarthak Avatar on P1 */}
                  <div className="font-pixel text-[10px] text-obsidian bg-gold px-2 py-0.5 border border-black font-bold">
                    ★ {birthdayContent.playerNickname} ★
                  </div>
                </div>

                <div className="font-pixel text-2xl text-white font-bold drop-shadow">
                  P1
                </div>
                <div className="font-pixel text-[8px] text-gold uppercase">
                  WORLD CHAMPION
                </div>
              </div>

              {/* P3 Step */}
              <div className="w-20 sm:w-28 h-16 bg-[#254A35] border-2 border-black flex flex-col items-center justify-between p-2">
                <span className="font-pixel text-xs text-mutedGrey">3</span>
                <span className="font-mono text-[9px] text-mutedGrey">REST</span>
              </div>
            </div>

            {/* Podium Message Box */}
            <div className="pixel-box-sandstone p-4 w-full text-obsidian text-center shadow-pixel-lg mt-2">
              <h3 className="font-pixel text-sm sm:text-base text-ferrari font-bold">
                "{birthdayContent.podiumHeading}"
              </h3>
              <p className="font-sans text-xs sm:text-sm text-obsidian font-semibold mt-1">
                {birthdayContent.podiumMessage}
              </p>
              <div className="mt-2 pt-2 border-t border-obsidian/30 font-mono text-[11px] text-obsidian/80">
                {birthdayContent.commentatorMessage}
              </div>
            </div>
          </div>
        ) : (
          /* Racing Track In Progress */
          <div className="relative w-full h-44 flex flex-col items-center justify-center">
            {/* Track Asphalt */}
            <div className="w-full h-24 bg-[#2A2A2A] border-y-4 border-black relative flex items-center justify-center overflow-hidden shadow-pixel">
              {/* Checkered Start/Finish line */}
              <div className="absolute right-12 top-0 bottom-0 w-8 checkered-pattern opacity-80" />
              {/* Racing Car waiting or driving */}
              <img
                src="assets/sprites/ferrari-car.svg"
                alt="Ferrari Racing Car"
                className={`w-52 h-auto pixelated ${carDrivesOff ? 'translate-x-[200vw] transition-transform duration-1000 ease-in' : 'anim-float'}`}
              />
            </div>
            <p className="font-pixel text-[9px] text-gold mt-3 text-center">
              Tap the 3 racing items above to enter the winner's podium!
            </p>
          </div>
        )}
      </div>

      {/* Action Navigation */}
      <div className="z-10 w-full max-w-md flex justify-center">
        {isAllCollected && (
          <button
            onClick={handleContinue}
            className="pixel-btn pixel-btn-red !text-sm !py-3 !px-6 flex items-center gap-2 shadow-pixel-lg"
          >
            <span>VISIT OUR MINECRAFT WORLD</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Bottom Asphalt Road Curb */}
      <div className="absolute bottom-0 left-0 right-0 h-4 checkered-pattern opacity-40" />
    </div>
  );
}
