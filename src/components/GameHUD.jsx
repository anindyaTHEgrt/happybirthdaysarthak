import React, { useState } from 'react';
import { Trophy, Gift, RotateCcw, ChevronDown, ChevronUp } from 'lucide-react';
import { useGame } from '../context/GameContext';
import { SCENES, getSceneById } from '../data/sceneConfig';
import { birthdayContent } from '../data/birthdayContent';
import MusicControls from './MusicControls';
import ProgressTracker from './ProgressTracker';
import ConfirmationDialog from './ConfirmationDialog';

export default function GameHUD() {
  const { 
    state, 
    setIsAchievementsOpen, 
    setIsCouponsOpen, 
    isResetConfirmOpen, 
    setIsResetConfirmOpen,
    resetGame 
  } = useGame();

  const [isTimelineExpanded, setIsTimelineExpanded] = useState(false);

  // If on loading screen, show minimal HUD
  if (state.currentScene === 'loading') {
    return (
      <header className="fixed top-0 left-0 right-0 z-30 p-3 flex justify-between items-center pointer-events-none">
        <div className="font-pixel text-[10px] sm:text-xs text-gold bg-obsidian/80 px-2.5 py-1 border border-black pointer-events-auto">
          {birthdayContent.versionLabel}
        </div>
        <div className="pointer-events-auto">
          <MusicControls />
        </div>
      </header>
    );
  }

  const currentScene = getSceneById(state.currentScene);
  const unlockedAchCount = state.unlockedAchievements.length;
  const claimedCouponsCount = state.claimedCoupons.length;

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-30 bg-obsidian/90 border-b-2 border-black backdrop-blur-sm px-3 py-2 shadow-pixel">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          {/* Left: Player / Stage Label */}
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1.5 px-2 py-1 bg-ferrari text-white border border-black font-pixel text-[9px] uppercase">
              <span className="w-1.5 h-1.5 bg-gold inline-block animate-pulse"></span>
              {birthdayContent.playerNickname}
            </div>

            <button
              onClick={() => setIsTimelineExpanded(!isTimelineExpanded)}
              className="flex items-center gap-1.5 px-2 py-1 bg-obsidian-card border border-black hover:border-gold font-pixel text-[10px] text-gold"
              title="Toggle timeline map"
            >
              <span>{currentScene?.shortTitle || 'Grand Prix'}</span>
              {isTimelineExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Center: Progress dots */}
          <div className="hidden md:block">
            <ProgressTracker compact />
          </div>

          {/* Right: Actions (Achievements, Coupons, Audio, Reset) */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Achievements Button */}
            <button
              onClick={() => setIsAchievementsOpen(true)}
              aria-label={`View achievements (${unlockedAchCount} unlocked)`}
              className="flex items-center gap-1.5 px-2 py-1 border-2 border-black bg-obsidian-card hover:border-gold transition-colors text-gold"
            >
              <Trophy className="w-3.5 h-3.5" />
              <span className="font-mono text-xs font-bold">{unlockedAchCount}/7</span>
            </button>

            {/* Coupons Button (always visible once passed shop or claimed) */}
            <button
              onClick={() => setIsCouponsOpen(true)}
              aria-label={`View reward passes (${claimedCouponsCount} claimed)`}
              className="flex items-center gap-1.5 px-2 py-1 border-2 border-black bg-obsidian-card hover:border-ferrari-light transition-colors text-ferrari-light"
            >
              <Gift className="w-3.5 h-3.5" />
              <span className="font-mono text-xs font-bold">{claimedCouponsCount}</span>
            </button>

            {/* Audio Controls */}
            <MusicControls />

            {/* Reset Button */}
            <button
              onClick={() => setIsResetConfirmOpen(true)}
              aria-label="Reset adventure"
              title="Reset Adventure"
              className="p-1.5 border-2 border-black bg-obsidian-card text-mutedGrey hover:text-ferrari hover:border-ferrari transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Collapsible Full Timeline Drawer */}
        {isTimelineExpanded && (
          <div className="mt-2 pt-2 border-t border-obsidian-border animate-fadeIn">
            <ProgressTracker />
          </div>
        )}
      </header>

      {/* Confirmation modal for reset */}
      <ConfirmationDialog
        isOpen={isResetConfirmOpen}
        onCancel={() => setIsResetConfirmOpen(false)}
        onConfirm={resetGame}
      />
    </>
  );
}
