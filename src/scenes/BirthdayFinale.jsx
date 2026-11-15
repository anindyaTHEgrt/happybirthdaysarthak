import React, { useEffect, useState } from 'react';
import { Sparkles, Trophy, Gift, RotateCcw, Heart, Award, CheckCircle } from 'lucide-react';
import { birthdayContent } from '../data/birthdayContent';
import { useGame } from '../context/GameContext';
import BirthdayCake from '../components/BirthdayCake';
import FireworksOverlay from '../components/FireworksOverlay';
import { audioEngine } from '../utils/audioSystem';

export default function BirthdayFinale() {
  const { 
    state, 
    dispatch, 
    unlockAchievement, 
    setIsAchievementsOpen, 
    setIsCouponsOpen, 
    goToScene,
    resetGame 
  } = useGame();

  const [finaleCelebrationActive, setFinaleCelebrationActive] = useState(false);

  const candlesCount = birthdayContent.candlesCount || 5;
  const extinguished = state.extinguishedCandles || [];
  const allCandlesOut = extinguished.length >= candlesCount;

  // When all candles are out, trigger the grand finale sequence
  useEffect(() => {
    if (allCandlesOut && !state.finaleTriggered) {
      dispatch({ type: 'TRIGGER_FINALE' });
      setFinaleCelebrationActive(true);
      unlockAchievement('birthday-champion');
    }
  }, [allCandlesOut, state.finaleTriggered, dispatch, unlockAchievement]);

  const handleExtinguishCandle = (id) => {
    dispatch({ type: 'EXTINGUISH_CANDLE', payload: id });
  };

  const handleExtinguishAll = () => {
    audioEngine.playSfx('blow');
    const allIds = Array.from({ length: candlesCount }, (_, i) => `candle-${i + 1}`);
    dispatch({ type: 'EXTINGUISH_ALL_CANDLES', payload: allIds });
  };

  return (
    <div className={`min-h-screen w-full relative flex flex-col justify-between items-center overflow-x-hidden select-none px-4 pt-16 pb-8 transition-colors duration-1000 ${
      allCandlesOut ? 'bg-[#0E0B12]' : 'bg-[#18141F]'
    }`}>
      {/* Background Starry Sky */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0812] via-[#141020] to-[#1F1424] -z-10" />

      {/* Confetti & Fireworks Celebration Engine */}
      <FireworksOverlay active={allCandlesOut || finaleCelebrationActive} />

      {/* Header Info */}
      <div className="text-center z-10 max-w-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold text-obsidian border-2 border-black font-pixel text-[10px] sm:text-xs shadow-pixel-sm mb-2 font-bold">
          <Sparkles className="w-3.5 h-3.5 text-ferrari" />
          <span>STAGE 6: THE GRAND FINALE</span>
        </div>
        <h2 className="font-pixel text-lg sm:text-2xl md:text-3xl text-pixelWhite font-bold">
          {allCandlesOut ? birthdayContent.finalHeading : 'Birthday Cake Wishes'}
        </h2>
        <p className="font-sans text-xs sm:text-sm text-sandstone mt-1">
          {allCandlesOut ? 'All wishes released into the stars!' : birthdayContent.cakePrompt}
        </p>
      </div>

      {/* Main Cake Interaction Centerpiece */}
      <div className="w-full max-w-xl my-4 flex flex-col items-center z-10">
        <BirthdayCake
          candlesCount={candlesCount}
          extinguishedCandles={extinguished}
          onExtinguishCandle={handleExtinguishCandle}
          onExtinguishAll={handleExtinguishAll}
        />

        {/* Final Birthday Greeting Reveal Banner */}
        {allCandlesOut && (
          <div className="w-full pixel-box-sandstone p-6 mt-6 text-obsidian text-center shadow-pixel-lg animate-fadeIn border-4 border-black">
            <div className="inline-block p-2 bg-ferrari text-white border-2 border-black mb-3">
              <Trophy className="w-8 h-8 text-gold" />
            </div>

            <h3 className="font-pixel text-base sm:text-xl text-ferrari font-bold">
              {birthdayContent.finalHeading}
            </h3>

            <p className="font-sans text-sm sm:text-base text-obsidian font-semibold mt-2 leading-relaxed">
              {birthdayContent.finalMessage}
            </p>

            <div className="mt-4 pt-3 border-t-2 border-dashed border-obsidian/40 font-pixel text-xs sm:text-sm text-ferrari-dark font-bold">
              "{birthdayContent.finalSignOff}"
            </div>
          </div>
        )}
      </div>

      {/* Post-Finale Revisit & Reward Actions */}
      {allCandlesOut && (
        <div className="z-10 w-full max-w-2xl mt-4">
          <div className="pixel-box p-4 bg-obsidian-card border-2 border-black">
            <span className="font-pixel text-[10px] text-gold uppercase block text-center mb-3">
              🏆 Champion's Post-Game Hall
            </span>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                onClick={() => setIsAchievementsOpen(true)}
                className="pixel-btn pixel-btn-gold !py-2 !px-2 !text-[9px] flex items-center justify-center gap-1.5"
              >
                <Trophy className="w-3.5 h-3.5" />
                <span>ACHIEVEMENTS</span>
              </button>

              <button
                onClick={() => setIsCouponsOpen(true)}
                className="pixel-btn pixel-btn-red !py-2 !px-2 !text-[9px] flex items-center justify-center gap-1.5"
              >
                <Gift className="w-3.5 h-3.5" />
                <span>MY COUPONS</span>
              </button>

              <button
                onClick={() => goToScene('minecraft')}
                className="pixel-btn pixel-btn-green !py-2 !px-2 !text-[9px] flex items-center justify-center gap-1.5"
              >
                <Heart className="w-3.5 h-3.5" />
                <span>REVISIT WORLD</span>
              </button>

              <button
                onClick={() => goToScene('loading')}
                className="pixel-btn pixel-btn-dark !py-2 !px-2 !text-[9px] flex items-center justify-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>PLAY AGAIN</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
